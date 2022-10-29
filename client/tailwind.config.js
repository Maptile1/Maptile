/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'maptile-green': '#7FFF00',
        'maptile-green-highlight' : '#55ab00',
        'maptile-purple': '#6A5ACD',
        'maptile-red': '#FF0000',
        'maptile-background-dark': '#36393F',
        'maptile-background-mid': '#575D69',
        'maptile-background-light': '#7A818E',
        'maptile-background-bright': '#7A818E',
        'maptile-tab-unselected': '#454952'
      },
    }
  },
  plugins: [],
}