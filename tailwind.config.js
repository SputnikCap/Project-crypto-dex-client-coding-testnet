/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Добавьте jsx, ts, и tsx
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      slate: colors.slate,
      green: colors.green,
      blue: colors.blue,
      red: colors.red,
      zinc: colors.zinc,
      neutral: colors.neutral,
      lime: colors.lime,
      okxslate: '#e3e3e3',
      okxbg:'#121212',
    },
    extend: {
  
    },
  },
  plugins: [],
}
