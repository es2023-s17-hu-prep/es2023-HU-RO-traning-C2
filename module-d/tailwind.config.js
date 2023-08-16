/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "purple-dark": "#4c1d95",
        "purple-normal": "#7c3aed",
        "purple-light": "#ede9fe",
      },
    },
  },
  plugins: [],
};
