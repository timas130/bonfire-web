import {graphql, type OauthLoginInput, OauthProvider, type ValueOf} from "$houdini";
import { getTokenExpiry } from "$lib/accessToken";
import {error, redirect} from "@sveltejs/kit";

export async function load(event) {
  const providerId = event.params.provider;
  const provider = providerId.toUpperCase() as ValueOf<typeof OauthProvider>;

  const [code, state] = [event.url.searchParams.get("code"), event.url.searchParams.get("state")];

  if (!code || !state) {
    throw error(400);
  }

  const loginOauthMutation = graphql(`
    mutation LoginOAuthMutation($input: OauthLoginInput!) {
        loginOauth(input: $input) {
            emailAlreadyBound
            tokens {
                accessToken
                refreshToken
            }
        }
    }
  `);

  const input: OauthLoginInput = {
    code,
    nonce: state,
    provider,
  };

  let result;
  try {
    result = await loginOauthMutation.mutate({input}, {event});
  } catch (e) {
    throw error(400, {message: e.toString()});
  }

  if (result.errors || !result.data) {
    throw error(400, {message: result.errors?.[0]?.message || "?!"});
  }

  const tokens = result.data.loginOauth.tokens;

  if (result.data.loginOauth.emailAlreadyBound || !tokens) {
    return {
      emailAlreadyBound: true,
    };
  }

  event.cookies.set("bf_accessToken", tokens.accessToken, {
    sameSite: "lax",
    secure: true,
    expires: new Date(getTokenExpiry(tokens.accessToken) * 1000),
    path: "/",
    httpOnly: true,
  });
  event.cookies.set("bf_refreshToken", tokens.refreshToken, {
    sameSite: "lax",
    secure: true,
    expires: new Date(Date.now() + 1000 * 3600 * 24 * 365),
    path: "/",
    httpOnly: true,
  });

  throw redirect(302, decodeURIComponent(event.cookies.get("bf_authRedirectUrl")) || "/");
}
