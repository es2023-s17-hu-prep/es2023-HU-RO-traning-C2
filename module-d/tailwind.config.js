/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          500: "#7C3AED",
          600: "#4C1D95"
        }
      }
    },
  },
  plugins: [],
}