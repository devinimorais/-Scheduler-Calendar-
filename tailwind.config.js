/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#f2f2f2', // Nome personalizado para a cor
        customColorGray: '#2c2c2c',
      },
    },
  },
  plugins: [],
}
