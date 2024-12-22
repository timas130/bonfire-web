import {graphql, setSession} from "$houdini";
import type {Handle, HandleFetch} from "@sveltejs/kit";
import {env as envPublic} from "$env/dynamic/public";
import {env as envPrivate} from "$env/dynamic/private";
import {getTokenExpiry, isAccessTokenExpiring} from "$lib/accessToken";

export const handle: Handle = async ({ event, resolve }) => {
  let accessToken = event.cookies.get("bf_accessToken");
  const refreshToken = event.cookies.get("bf_refreshToken");
  const tfaToken = event.cookies.get("bf_tfaWait");

  if (refreshToken && (!accessToken || isAccessTokenExpiring(accessToken))) {
    // refresh logic

    const refreshMutation = graphql(`
        #graphql
        mutation LoginRefresh($refreshToken: String!) {
            loginRefresh(refreshToken: $refreshToken) {
                accessToken
            }
        }
    `);

    try {
      const result = await refreshMutation.mutate({refreshToken}, {event});
      if (result.errors) {
        // noinspection ExceptionCaughtLocallyJS
        throw result.errors;
      }

      accessToken = result.data?.loginRefresh?.accessToken;
      if (!accessToken) {
        // noinspection ExceptionCaughtLocallyJS
        throw "is null";
      }
      event.cookies.set("bf_accessToken", accessToken, {
        sameSite: "lax",
        secure: true,
        expires: new Date(getTokenExpiry(accessToken) * 1000),
        path: "/",
      });
    } catch (e) {
      console.warn("failed to refresh token:", e);
    }
  }

  setSession(event, { accessToken, tfaToken });

  return resolve(event);
};

export const handleFetch: HandleFetch = ({ request, fetch, event }) => {
  const gqlUrl = envPublic.PUBLIC_GQL_URL || "http://127.0.0.1:8000/";
  if (request.url.startsWith(gqlUrl)) {
    const token = event.cookies.get("bf_accessToken");
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
  }

  if (request.url.startsWith(gqlUrl)) {
    request = new Request(
      request.url.replace(
        gqlUrl,
        envPrivate.PRIVATE_GQL_URL || "http://127.0.0.1:8000/",
      ),
      request,
    );
  }

  const userAgent = event.request.headers.get("user-agent");
  if (userAgent) request.headers.set("user-agent", userAgent);

  const xForwardedFor = event.request.headers.get("x-forwarded-for") || event.getClientAddress();
  if (xForwardedFor) request.headers.set("x-forwarded-for", xForwardedFor);

  return fetch(request);
};
