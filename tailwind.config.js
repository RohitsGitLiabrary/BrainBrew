/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'custom-leaderboard': '35%', // Define custom width
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}