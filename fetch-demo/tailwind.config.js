/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./routes/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],  
  theme: {
    extend: {
      backgroundSize: {
        '10%': '10%',
      }
    },
  },
  plugins: [],
}

