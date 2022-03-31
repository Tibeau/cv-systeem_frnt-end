module.exports = {
  prefix: "",
  mode: "jit",
  purge: {
    content: ["./src/**/*.{html,ts,css,scss,sass,less,styl}"],
    safelist: [
      'bg-blue-400',
      'hover:bg-blue-800',
      'bg-red-400',
      'hover:bg-red-800',
      'bg-yellow-400',
      'hover:bg-yellow-800',
      'bg-green-400',
      'hover:bg-green-800',
      'hover:bg-red-600'
    ]
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      flexBasis: {
        '1/7': '14.2857143%',
        '6/7': '85.7142857%',
      },
      colors: {
        Jorange: "#DE7A08",
        Jblue: "#2122B0",
        Jwhite: "#F4F8F7",
        JorangeSelect:"#EB912A"
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      Jorange: "#DE7A08",
    }),
    fontFamily: {
      firacode: ["Fira Code", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
