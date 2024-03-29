/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            primary: {
                DEFAULT: "#09335E",
                light: "#DBE1E6",
            },
            secondary: "#FCAF3B",
            gray: "#EAE3E3",
            white: {
                DEFAULT: "#FFFFFF",
                light: "#FAFAFA",
                lighter: "#FAFAFF",
            },
            error: "#F04C4C",
            success: "#6ED73E",
            black: "#000000",
            blue: {
                light: "#91B4F2",
                lighter: "#95AAC3",
            },
        },
        fontSize: {
            xs: "0.688rem",
            sm: "0.875rem",
            base: "1rem",
            lg: "1.2rem",
            xl: "2rem",
            "2xl": "2.5rem",
            "3xl": "3.5rem",
            "4xl": "4rem",
        },
        container: {
            center: true,
        },
        extend: {},
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("tailwind-scrollbar-hide"),
    ],
};
