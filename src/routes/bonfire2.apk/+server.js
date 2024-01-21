import {redirect} from "@sveltejs/kit";

export async function GET() {
  throw redirect(302, "https://github.com/timas130/bonfire/releases/latest/download/bonfire.apk");
}
