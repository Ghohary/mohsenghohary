/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'baskerville': ['Baskerville', 'Libre Baskerville', 'Times New Roman', 'serif'],
        'bodoni': ['Bodoni Moda', 'Didot', 'serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.2em',
        'luxury': '0.15em',
      }
    },
  },
  plugins: [],
}