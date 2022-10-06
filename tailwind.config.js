/** @type {import('tailwindcss').Config} */
let defaultTheme =  require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: "#FF8D00",
        secondary: "#37A03A",
        background: "#F9F9F9",
        "background-orange": "#FFFCF9",
        white: "#FFFFFF",
        red: "#F26161",
        gray: "#FBFBFF",
        "gray-header": "#F7F8FA",
        black: "#4E4E4E",
        green: "#ECFFEC",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        kanit: ["Kanit", "sans-serif"],
        noto: ["Noto Sans Thai", "serif"],
      },
      fontWeight: {
        title: "600",
      },
      fontSize: {
        title: "18px",
      },
    },
  },
  plugins: [],
};
