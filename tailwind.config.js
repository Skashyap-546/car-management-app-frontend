// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A73E8",  // Your chosen primary color
        secondary: "#FF5722", // Your chosen secondary color
      },
    },
  },
  plugins: [],
}
