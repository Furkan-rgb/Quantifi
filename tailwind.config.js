/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-5deg)'
          },
          '50%': {
            transform: 'rotate(5deg)'
          },
        }
      },
      animation: {
        wiggle: 'wiggle 10s ease-in-out infinite',
      },
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
  plugins: [
    require('@tailwindcss/forms'),
  ],
}