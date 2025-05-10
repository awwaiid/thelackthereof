/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  // theme: {
  //   extend: {},
  // },
  // plugins: [],
  theme: {
    // backgroundColor: theme => ({
    //   ...theme('colors'),
    //   // link: "#285a9c",
    //   // red: "#b50000",
    //   // brown: "#644934",
    // }),
    fontFamily: {
      serif: ["Atkinson Hyperlegible", "Nunito"]
    },
    extend: {
      typography: {
        slate: {
          css: {
            '--tw-prose-bullets': '#000000',
          },
        },
        DEFAULT: {
          css: {
            'blockquote p:first-of-type::before': false,
            'blockquote p:first-of-type::after': false,
            '--tw-prose-bullets': '#000000',
            '--tw-prose-slate-bullets': '#000000',
            '--tw-prose-hr': '#000000',
            '--tw-prose-slate-hr': '#000000',
            'strong a': { fontWeight: 600 },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
