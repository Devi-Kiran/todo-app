/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#7C3AED',
        darkPrimary: "#111827",
        darkSecondary: "#1F2937"
      },
    },
  },
  plugins: [],
}

