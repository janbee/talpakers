/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-light': '#8d4ffc',

        'green-light': '#467300',
        'red-light': '#c30000',
        'yellow-light': '#9d7d2b',
        'blue-light': '#1c50ff',

        'green-dark': '#acff2e',
        'red-dark': '#ff5f5f',
        'yellow-dark': '#fbbd08',
        'blue-dark': '#1c50ff',
      },
    },
  },
  plugins: [],
}

