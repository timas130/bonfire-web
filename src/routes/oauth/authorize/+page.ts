import {graphql} from "$houdini";
import {error, redirect} from "@sveltejs/kit";

/** @type {import('./$types').PageLoad} */
export async function load(event) {
  const query = Object.fromEntries(event.url.searchParams);

  const oauthAuthoriseInfoQuery = graphql(`
    query OAuthAuthoriseInfoQuery($query: JSONObject!) {
        oauthAuthorizeInfo(query: $query) {
            __typename
            ... on OauthAlreadyAuthorized {
                redirectUri
            }
            ... on OauthAuthorizationPrompt {
                flowId
                scopes
                client {
                    displayName
                    official
                    privacyPolicyUrl
                    tosUrl
                }
            }
        }
    }
  `);

  let result;
  try {
    result = await oauthAuthoriseInfoQuery.fetch({event, variables: {query}, blocking: true});
  } catch (e) {
    return error(500, {message: e.toString()});
  }

  if (result.errors || !result.data) {
    return error(500, {message: result?.errors?.[0]?.message || "?!"});
  }

  const authInfo = result.data.oauthAuthorizeInfo;

  if (authInfo.__typename === "OauthAlreadyAuthorized") {
    throw redirect(302, authInfo.redirectUri);
  }

  if (!authInfo.flowId) {
    throw redirect(302, `/auth/login?redirectUrl=${encodeURIComponent(event.url.toString())}` +
      `&oauthName=${encodeURIComponent(authInfo.client.displayName)}`);
  }

  return authInfo;
}
