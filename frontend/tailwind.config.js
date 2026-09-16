/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#111C44',      
        darkSurface: '#1B254B', 
        medicalBlue: '#2B6CB0', 
        mintGreen: '#48BB78',   
        textLight: '#F4F7FE',   
        textMuted: '#A3AED0'    
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}