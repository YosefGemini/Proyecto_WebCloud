/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary_blue: "#172554",
        secondary_blue: "#B3CAFE",
        third_blue: "#1D4ED8",
        fourth_blue: "#407BFE",
        fifth_blue: "linear-gradient(to right, #172554, #1D4ED8);",
      },
    },
  },
  plugins: [],
};
