const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1200px" },
    },
    extend: {
      colors: {
        primary: {
          50: "#fff8e8",
          100: "#feedc3",
          200: "#fdd98a",
          DEFAULT: "#fca311",
          600: "#e08e00",
          700: "#a86400",
        },
        secondary: {
          50: "#eef1f7",
          600: "#22355f",
          DEFAULT: "#14213d",
          900: "#0b1324",
        },
        canvas: "#faf8f4",
        line: "#e9e4da",
        muted: "#5f6b7d",
        success: "#15803d",
        warning: "#b45309",
        danger: "#dc2626",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-display)", ...defaultTheme.fontFamily.serif],
      },
      boxShadow: {
        card: "0 1px 2px rgba(20, 33, 61, 0.04), 0 12px 32px -16px rgba(20, 33, 61, 0.18)",
      },
    },
  },
  plugins: [],
};
