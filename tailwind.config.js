module.exports = {
    prefix: '',
    purge: {
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
        },
      },
      backgroundColor: (theme) => ({
        ...theme("colors"),
      }),
      fontFamily: {
        firacode: ["Fira code", "sans-serif"],
      },
    },

    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms'),require('@tailwindcss/typography')],
};
