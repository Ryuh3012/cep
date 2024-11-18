import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'cep-azul': '#0D0AE3', // 'azul-cmyk': 'cmyk(95%, 96%, 11%, 0%)',
        'cep-rojo': '#B30000', // 'rojo-cmyk': 'cmyk(30%, 100%, 100%, 2%)',
        'cep-violeta': '#38039B', // 'violeta-cmyk': 'cmyk(78%, 99%, 38%, 4%)',
        'cep-vino': '#820039', // 'vino-cmyk': 'cmyk(44%, 100%, 71%, 14%)',
        'cep-amarillo': '#ED9F29', // 'amarillo-cmyk': 'cmyk(7%, 44%, 84%, 0%)'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}