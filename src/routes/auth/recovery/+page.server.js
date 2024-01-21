import {graphql} from "$houdini";
import {fail, redirect} from "@sveltejs/kit";

/** @type {import("./$types").PageServerLoad} */
export async function load(event) {
  const token = event.url.searchParams.get("t");
  if (!token) {
    return {loadError: [{message: "Anyhow"}]};
  }

  const getRecoveryTokenQuery = graphql(`
    query GetRecoveryTokenQuery($token: String!) {
      checkRecoveryToken(token: $token) {
        username
      }
    }
  `);

  let result;
  try {
    result = await getRecoveryTokenQuery.fetch({event, variables: {token}, blocking: true});
  } catch (error) {
    return {loadError: [{message: "Anyhow"}]};
  }

  if (result.errors || !result.data) {
    return {loadError: result.errors};
  }

  return {username: result.data.checkRecoveryToken.username};
}

/** @type {import("./$types").Actions} */
export const actions ={
  default: async event => {
    const data = await event.request.formData();
    const password = data.get("password");

    const token = event.url.searchParams.get("t");

    if (typeof password !== "string" || !token) {
      return fail(400, {error: [{message: "Anyhow"}]});
    }

    const recoverPasswordMutation = graphql(`
      mutation RecoverPasswordMutation($token: String!, $password: String!) {
        recoverPassword(token: $token, newPassword: $password)
      }
    `);

    let result;
    try {
      result = await recoverPasswordMutation.mutate({token, password}, {event});
    } catch (error) {
      return fail(500, {error});
    }

    if (result.errors) {
      return fail(400, {error: result.errors});
    }

    throw redirect(302, "/auth/recovery/done");
  },
};
