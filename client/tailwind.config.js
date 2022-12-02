/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'movie-backdrop': "url('/public/backdrop.jpg')",
      }
    }
  },
  plugins: [],
};
