import {graphql} from "$houdini";

/** @type {import("./$types").PageServerLoad} */
export async function load(event) {
  const token = event.url.searchParams.get("t");
  if (!token) {
    return {
      error: [{message: "Anyhow"}],
    };
  }

  const cancelEmailChange = graphql(`
    mutation CancelEmailChangeMutation($token: String!) {
      cancelEmailChange(token: $token)
    }
  `);

  let result;
  try {
    result = await cancelEmailChange.mutate({token}, {event});
  } catch (error) {
    return {error: [{message: "Anyhow"}]};
  }

  if (result.errors) {
    return {error: result.errors};
  }

  return {success: true};
}
