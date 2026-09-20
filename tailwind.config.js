/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        primary: "#fca311",
        secondary: "#14213d",
        danger: "#dc2626",
        success: "#16a34a",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        dancing: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
