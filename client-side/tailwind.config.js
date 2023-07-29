/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // "primary": "#ff416c",
      "primary": "rgb(171, 0, 60)",
      "primary-dark": "rgb(171, 0, 60)",
      "primary-darker": "rgb(171, 0, 60)",
      "primary-darkest": "rgb(171, 0, 60)",
      "primary-light": "rgb(171, 0, 60)",
      "primary-lighter": "rgb(171, 0, 60)",
      "primary-lightest": "rgb(171, 0, 60)",
      "background-color": "#f3f9fb",
      "light-text": "#fff",
      "darkest": "#242222",
      "primary-lightest-dark":" #ffffff",
    },
    extend: {},
    plugins: [],
  },
};
