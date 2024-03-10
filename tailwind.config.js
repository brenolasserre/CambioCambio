/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      textColor: "rgb(215,255,243, 1)",
      textColorSecondary: "rgb(229, 236, 255, .5)",
      textColorBackground: "rgb(215,255,243, .15)",

      successColor: "rgb(19, 235, 170, 1)",
      successBackground: "rgb(19, 235, 170, .15)",
      warningColor: "rgb(217, 48, 79, 1)",
      warningBackground: "rgb(217, 48, 79, .15)",
    },
    extend: {},
  },
  plugins: [],
};
