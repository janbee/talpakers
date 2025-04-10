const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    screens: {
      '2xl': { 'max': '1535px' }, // => @media (max-width: 1535px) { ... }
      'xl': { 'max': '1279px' }, // => @media (max-width: 1279px) { ... }
      'lg': { 'max': '1023px' }, // => @media (max-width: 1023px) { ... }
      'md': { 'max': '767px' }, // => @media (max-width: 767px) { ... }
      'sm': { 'max': '639px' }, // => @media (max-width: 639px) { ... }
    },
    extend: {
      colors: {
        'purple-light': '#8d4ffc',

        'green-light': '#467300',
        'red-light': '#c30000',
        'yellow-light': '#9d7d2b',
        'blue-light': '#1c50ff',

        'purple-dark': '#ac7dff',
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
};
