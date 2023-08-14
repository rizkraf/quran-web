/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        arabic: ["Amiri", "serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
