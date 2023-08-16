/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          800: "#4C1D95",
          500: "#7C3AED",
          600: "#732eea",
          700: "#5d14dc",
          200: "#EDE9FE",
          300: "#d8cfff",
          400: "#bfb2ff",
        },
        yellow: {
          500: "#F9B501"
        }
      }
    },
  },
  plugins: [],
}