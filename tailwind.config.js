/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: "#09335E",
      secondary: "#FCAF3B",
      gray: "#EAE3E3",
      white: {
        DEFAULT: "#FFFFFF",
        light: "#FAFAFA",
        lighter: "#FAFAFF",
      },
      error: "#F04C4C",
      success: "#6ED73E",
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
