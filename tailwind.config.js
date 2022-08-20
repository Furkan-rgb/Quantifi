/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      flex: {
        'embla': '0 0 100%'
      },
      colors: {
        'qdark': '#040D16'
      }, minHeight: {
        '90vh': '90vh',
      }
    },
  },
  plugins: [],
}
