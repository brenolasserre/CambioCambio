/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      textColor: "rgb(240, 255, 251, 1)",
      textColorBackground: "rgb(240, 255, 251, .15)",
      textColorSecondary: "rgb(240, 255, 251, .9)",
      textColorTerciary: "rgb(229, 236, 255, .4)",

      successColor: "rgb(19, 235, 170, 1)",
      successBackground: "rgb(19, 235, 170, .15)",
      warningColor: "rgb(217, 48, 79, 1)",
      warningBackground: "rgb(217, 48, 79, .15)",
    },
    extend: {},
  },
  plugins: [],
};
