/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1535px'}, // => @media (max-width: 1535px) { ... }
      'xl': {'max': '1279px'}, // => @media (max-width: 1279px) { ... }
      'lg': {'max': '1023px'}, // => @media (max-width: 1023px) { ... }
      'md': {'max': '767px'}, // => @media (max-width: 767px) { ... }
      'sm': {'max': '639px'}, // => @media (max-width: 639px) { ... }
    },
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
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }
  ],
}

