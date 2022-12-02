/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'film-img': "url('/public/Images/Background.svg')",
      })
    },
  },
  plugins: [],
};
