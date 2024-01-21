import adapter from '@sveltejs/adapter-auto';
import {mdsvex} from "mdsvex";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$houdini: './$houdini',
		}
	},

	extensions: [".svelte", ".svx"],

	preprocess: [
		mdsvex({
			layout: "./src/routes/page/Layout.svelte",
		}),
	]
};

export default config;
