/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    colors: {
      grey: "#303030",
      lightgrey: "#979797",
      black: "#000000",
      whiteopacity75: "hsl(0, 0%, 100%, 75%)",
      blackopcity75: "hsl(0, 0%, 0%, 75%)",
      white: "#ffffff",
    },
    extend: {
      backgroundImage: {
        "day-bg-desktop": "url('/assets/desktop/bg-image-daytime.jpg')",
        "night-bg-desktop": "url('/assets/desktop/bg-image-nighttime.jpg')",
        "day-bg-tablet": "url('/assets/tablet/bg-image-daytime.jpg')",
        "night-bg-tablet": "url('/assets/tablet/bg-image-nighttime.jpg')",
        "day-bg-mobile": "url('/assets/mobile/bg-image-daytime.jpg')",
        "night-bg-mobile": "url('/assets/mobile/bg-image-nighttime.jpg')",
      },
    },
  },
  plugins: [],
};
