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
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
