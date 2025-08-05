// tailwind.config.js (ESM version)
import defaultTheme from 'tailwindcss/defaultTheme';
import flowbitePlugin from 'flowbite/plugin';
import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
module.exports= {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
        lucky: ["Luckiest Guy", "cursive"],
        pressStart: ["Press Start 2P", "system-ui"],
        sacramento: ["Sacramento", "cursive"],
        vt323: [ "VT323", "monospac"],
        Boulder: ["Boulder","sans-serif" ],
        brigada: ["Brigada","sans-serif" ],
        beyond: ["beyond","sans-serif" ],
        Durango: ["Durango","sans-serif" ],
        gyoza: ["gyoza","sans-serif" ],
        kerod: ["kerod","sans-serif" ],
        midorima: ["midorima","sans-serif" ],
        mike: ["mike","sans-serif" ],
        noctaOutline: ["noctaOutline","sans-serif" ],
        noctaSolid: ["noctaSolid","sans-serif" ],
        pcme: ["pcme","sans-serif" ],
        rengkox: ["rengkox","sans-serif" ],
        newton: ["newton","sans-serif" ],


      },
       dropShadow: {
        glow: '0 0 6px rgba(34,211,238,0.8)',
      },
      animation: {
        flicker: 'flicker 1.5s infinite alternate',
        'jello-horizontal': 'jello-horizontal 0.9s both',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'jello-horizontal': {
          '0%': { transform: 'scale3d(1, 1, 1)' },
          '30%': { transform: 'scale3d(1.25, 0.75, 1)' },
          '40%': { transform: 'scale3d(0.75, 1.25, 1)' },
          '50%': { transform: 'scale3d(1.15, 0.85, 1)' },
          '65%': { transform: 'scale3d(0.95, 1.05, 1)' },
          '75%': { transform: 'scale3d(1.05, 0.95, 1)' },
          '100%': { transform: 'scale3d(1, 1, 1)' },
        },
      },




    },
  },
  plugins: [flowbitePlugin, scrollbarHide, require("@designbycode/tailwindcss-text-stroke")], 
};
