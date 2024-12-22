import type {Actions} from "@sveltejs/kit";
import {fail, redirect} from "@sveltejs/kit";
import {graphql} from "$houdini";
import {getTokenExpiry} from "$lib/accessToken";

export const actions: Actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const [email, password, redirectUrl] = [data.get("email"), data.get("password"), data.get("redirectUrl")];

    if (typeof email !== "string" || typeof password !== "string" || (redirectUrl && typeof redirectUrl !== "string")) {
      return fail(400);
    }

    const loginMutation = graphql(`
        #graphql
        mutation LoginMutation($input: LoginEmailInput!) {
            loginEmail(input: $input) {
                __typename
                ... on LoginResultSuccess {
                    accessToken
                    refreshToken
                }
                ... on LoginResultTfaRequired {
                    tfaType
                    tfaWaitToken
                }
            }
        }
    `);

    let result;
    try {
      result = await loginMutation.mutate({input: {email, password}}, {event});
    } catch (error) {
      return fail(400, {error: [{message: error.toString()}], email});
    }

    if (result.errors) {
      return fail(400, {error: result.errors, email});
    }

    result = result.data;
    if (!result) {
      return fail(500);
    }

    if (result.loginEmail.__typename === "LoginResultTfaRequired") {
      event.cookies.set("bf_tfaWait", result.loginEmail.tfaWaitToken, {
        sameSite: "lax",
        secure: true,
        expires: new Date(getTokenExpiry(result.loginEmail.tfaWaitToken) * 1000),
        path: "/",
        httpOnly: true,
      });
      throw redirect(302, `/auth/tfa?type=${result.loginEmail.tfaType}`);
    }

    event.cookies.set("bf_accessToken", result.loginEmail.accessToken, {
      sameSite: "lax",
      secure: true,
      expires: new Date(getTokenExpiry(result.loginEmail.accessToken) * 1000),
      path: "/",
      httpOnly: true,
    });
    event.cookies.set("bf_refreshToken", result.loginEmail.refreshToken, {
      sameSite: "lax",
      secure: true,
      expires: new Date(Date.now() + 1000 * 3600 * 24 * 365),
      path: "/",
      httpOnly: true,
    });

    throw redirect(302, redirectUrl || "/");
  },
};
