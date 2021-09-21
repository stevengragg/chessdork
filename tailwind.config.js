const colors = require('tailwindcss/colors');

module.exports = {
  purge: [
    './imports/ui/**/*.jsx',
    './imports/ui/**/*.js',
    './client/**/*.html',
  ],
  variants: {
    extend: {
      // ...
     animation: ['hover', 'focus'],
     height: ['responsive', 'hover', 'focus'],
     ringColor: ['hover', 'active'],

    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
        transitionProperty: {
          'height': 'height'
        },
      
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
       },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
       },
      colors: {
        white:colors.white,
        blueGray: colors.blueGray,
        amber: colors.amber,
        teal: colors.teal
      },
    },
  },
  plugins: [
  ],
};