/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundGrey: `#F1F3F4`,
        cardWhite: `#FFFFFF`,
        dodgerBlue: '#307BFF',
        completedGreen: '#43C0C7',
        undoOrange: '#F46401',
        completedBackground: '#f4f4f4',
        inputBlue: 'rgba(48, 123, 255, 0.25)',
        deleteRed: '#f9002d'
      },
      textColor: {
        themeWhite: `#ecf2f8`
      },
    },
  },
  plugins: [],
}
