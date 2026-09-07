// tailwind.config.js
import { heroui } from "@heroui/react"; // O require("@nextui-org/react")

/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  // Ruta para HeroUI:
  "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  // Ruta si usas NextUI:
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {},
};
export const darkMode = "class";
export const plugins = [heroui()];