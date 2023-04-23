/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        rale: ["Raleway"],
        pop: ["Poppins"],
        mont: ["Montserrat"],
        lob: ["Lobster"],
      },
      colors: {
        crimson: {
          100: "#be185d",
          200: "#831843",
        },
        leaf: {
          100: "#0f766e",
          200: "#134e4a",
        },
        saffron: {
          100: "#fbbf24",
          200: "#d97706",
        },
        aubergine: {
          100: "#6d28d9",
          200: "#4c1d95",
        },
      },
    },
  },
  plugins: [],
};
