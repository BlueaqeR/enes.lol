/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '370px',
        'xs': '600px',
        'sm': '700px',
        'nt': '769px',
      },
    },
  },
  plugins: [],
}