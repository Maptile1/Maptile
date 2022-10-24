/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'maptile-green': '#7FFF00',
        'maptile-green-highlight' : '#55ab00',
        'maptile-purple': '#6A5ACD',
      },
    }
  },
  plugins: [],
}