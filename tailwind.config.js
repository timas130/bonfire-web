/** @type {import("tailwindcss").Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "text": {
          "DEFAULT": "#eeeeee",
          "secondary": "#8c8c8c",
          "secondary-light": "#a0a0a0",
        },
        "background": {
          "page": "#171717",
          "surface": "#212121",
          "surface-lighter": "#303030",
          "surface-darker": "#1f1f1f",
          "button": "#333333",
          "button-hover": "#404040",
        },
        "border": {
          "DEFAULT": "#333333",
        },
        "outline": {
          "DEFAULT": "#626262",
          "darker": "#444444",
        },
        "accent": {
          "DEFAULT": "#f97215",
          "alt": "#22bab0",
          "success": "#34d399",
          "error": "#f87171",
          "link": "#3b82f6",
        },
      },
      typography: ({ theme }) => ({
        bonfire: {
          css: {
            '--tw-prose-body': theme('colors.text.DEFAULT'),
            '--tw-prose-headings': theme('colors.text.DEFAULT'),
            '--tw-prose-lead': theme('colors.text.secondary-light'),
            '--tw-prose-links': theme('colors.text.DEFAULT'),
            '--tw-prose-bold': theme('colors.text.DEFAULT'),
            '--tw-prose-counters': theme('colors.text.secondary-light'),
            '--tw-prose-bullets': theme('colors.text.secondary'),
            '--tw-prose-hr': theme('colors.outline.DEFAULT'),
            '--tw-prose-quotes': theme('colors.text.DEFAULT'),
            '--tw-prose-quote-borders': theme('colors.outline.DEFAULT'),
            '--tw-prose-captions': theme('colors.text.secondary-light'),
            '--tw-prose-kbd': theme('colors.text.DEFAULT'),
            '--tw-prose-kbd-shadows': theme('colors.text.DEFAULT'),
            '--tw-prose-code': theme('colors.text.DEFAULT'),
            '--tw-prose-pre-code': theme('colors.text.DEFAULT'),
            '--tw-prose-pre-bg': theme('colors.background.surface-darker'),
            '--tw-prose-th-borders': theme('colors.outline.DEFAULT'),
            '--tw-prose-td-borders': theme('colors.outline.darker'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
