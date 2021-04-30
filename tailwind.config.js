const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      black: "#000000",
      red: "#de1f26",
      darkGray: "#2f2f37",
      white: "#f9fafb",
      charcoal: "#1e1e24",
      green: "#45de1f",
      transparent: "transparent",
    },
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
