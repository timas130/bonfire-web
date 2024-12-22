import {Actions, fail, redirect} from "@sveltejs/kit";
import {graphql} from "$houdini";
import { getTokenExpiry } from "$lib/accessToken";

export const actions: Actions = {
  default: async (event) => {
    const data = await event.request.formData();
    const [flowId] = [data.get("flowId")];

    if (typeof flowId !== "string") {
      return fail(400);
    }

    const oauthAuthorizeMutation = graphql(`
        mutation OAuthAuthorizeMutation($flowId: ID!) {
            oauth2AuthorizeAccept(flowId: $flowId) {
                __typename
                ... on OauthAuthorizationRedirect {
                  redirectUri
                }
                ... on OauthAuthorizationTfaRequired {
                    tfaType
                    tfaWaitToken
                }
            }
        }
    `);

    let result;
    try {
      result = await oauthAuthorizeMutation.mutate({flowId}, {event});
    } catch (e) {
      return fail(400, {error: [{message: e.toString()}]});
    }

    if (result.errors || !result.data) {
      return fail(400, {error: result.errors || [{message: "?!"}]});
    }

    result = result.data.oauth2AuthorizeAccept;
    if (result.__typename === "OauthAuthorizationTfaRequired") {
      event.cookies.set("bf_tfaWait", result.tfaWaitToken, {
        sameSite: "lax",
        secure: true,
        expires: new Date(getTokenExpiry(result.tfaWaitToken) * 1000),
        path: "/",
        httpOnly: true,
      });
      throw redirect(302, `/auth/tfa?type=${result.tfaType}`);
    }

    throw redirect(302, result.redirectUri);
  },
};
