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
      serif: ["Nunito"]
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'blockquote p:first-of-type::before': false,
            'blockquote p:first-of-type::after': false,
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
