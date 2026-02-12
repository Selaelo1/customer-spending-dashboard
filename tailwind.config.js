/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        capitec: {
          navy: '#0B2A4A',
          teal: '#00A3AD',
          orange: '#FF6B4A',
          gray: '#F5F7FA',
          darkgray: '#4A5568'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}