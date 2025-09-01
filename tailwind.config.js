/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
  "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  "node_modules/flowbite/**/*.js",
];
export const theme = {
  extend: {},
};
export const plugins = [
  require("flowbite/plugin"),
  require("daisyui"),
];
