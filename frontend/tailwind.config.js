/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#37BEF0',
        grey: '#454545',
        'primary-light': '#D7F2FC',
        secondary: '#366bf97',
        tertiary: '#7D7D7D',
        danger: '#B01212',
        success: '#00C853',
        warning: '#FFC400',
        'yellow-home': '#FFEFD9',
        indigo: {
          900: '#F6AD54',
          800: '#F6AD54',
        },
      },
      keyframes: {
        swing: {
          '0%,100%': { transform: 'rotate(15deg)' },
          '50%': { transform: 'rotate(-15deg)' },
        },
      },
      animation: {
        swing: 'swing 1s infinite',
      },
    },
  },
  plugins: [],
};
// extend: {
// colors: {
//   primary: '#E01010',
//   secondary: '#D10058',
//   tertiary: '#A22E83',
//   quaternary: '#df5598',
//   violet: '#ffff',
// },
// },
