/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      // "primary": "#ff416c",
      "primary": "#e31c43",
      "primary-dark": "#ff2153",
      "primary-darker": "#ff1147",
      "primary-darkest": "#e00033",
      "primary-light": "#ff6185",
      "primary-lighter": "#ff7191",
      "primary-lightest": "#ffa1b6",
      "background-color": "#f3f9fb",
      "light-text": "#fff",
      "darkest": "#242222",
      "primary-lightest-dark":" #ffffff",
    },
    extend: {},
    plugins: [],
  },
};
