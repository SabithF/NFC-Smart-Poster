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

    },
  },
  plugins: [flowbitePlugin, scrollbarHide, require("@designbycode/tailwindcss-text-stroke")], 
};
