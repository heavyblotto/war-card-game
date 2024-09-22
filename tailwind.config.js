module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lumber-brown': '#8B4513',
        'forest-green': '#228B22',
        'sky-blue': '#87CEEB',
        'bark-brown': '#5D4037',
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
      },
    },
  },
  plugins: [],
}