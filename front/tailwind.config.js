/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "custom-lg": "1100px",
      },
      colors: {
        background: "#14151E",
        primary: {
          DEFAULT: "#5F71D4",
          hover: "#505885",
          selected: "#202647",
          disabled: {
            DEFAULT: "#5C5D66",
            text: "#D1D1D1",
          },
          component: {
            fill: "#26283C",
          },
        },
        secondary: {
          DEFAULT: "#CBD0F1",
          hover: "#B3BDFC",
          selected: "#333243",
          disabled: {
            DEFAULT: "#6F6F6F",
            text: "#C7C7C780",
          },
        },
        ghost: {
          selected: {
            fill: "#727EE433",
            stroke: "#141F59",
          },
          disabled: {
            DEFAULT: "#6F6F6F",
            text: "#9D9FAA",
          },
        },
        list: {
          fill: "#424B7C",
          item: {
            hover: "#383B57",
            stroke: "#2E3456",
          },
        },
        error: {
          DEFAULT: "#FF3C3C",
          hover: "#F88484",
        },
        info: "#6596FF",
        warning: "#FEFE2C",
        success: {
          DEFAULT: "#56EE48",
          hover: "#7ACA73",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
