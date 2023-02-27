/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 12s cubic-bezier(0.4, 0, 0.6, 1) infinite;',
        fadeIn: "fadeIn 2s ease-in forwards",
        wiggle: 'wiggle 10s ease-in-out infinite',
      },
      keyframes: {
        'pulse-slow': {
          '0%': {
            opacity: 1
          },
          '100%': {
            opacity: 1
          },
          '50%': {
            opacity: .6
          },
          '40%': {
            opacity: .6
          },
          '30%': {
            opacity: .6
          },
          '80%': {
            opacity: .9
          }
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        wiggle: {
          '0%, 100%': {
            transform: 'rotate(-5deg)'
          },
          '50%': {
            transform: 'rotate(5deg)'
          },
        }
      },
      variants: {
        animation: ["motion-safe"]
      },
      flex: {
        'embla': '0 0 100%'
      },
      colors: {
        'qdark': '#040D16'
      }, minHeight: {
        '90vh': '90vh',
        '50vh': '50vh',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}