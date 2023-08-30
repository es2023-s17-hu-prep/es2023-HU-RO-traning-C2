/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-darker": "#4c1d95",
        "primary-dark": "#7c3aed",
        "primary-light": "#b8a6ff",
        "primary-lighter": "#ede9fe",
        input: "#f5f5f5",
      },
      boxShadow: {
        primary: "1px 2px 5px #7c3aed88",
      },
    },
  },
  plugins: [],
};
