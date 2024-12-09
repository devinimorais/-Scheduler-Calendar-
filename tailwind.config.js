/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customGray: '#f2f2f2', 
        customColorGray: '#2c2c2c',
      },
      boxShadow: {
        'custom-card': '0 10px 10px rgba(0, 0, 0, 0.4), 0 7px 1px rgba(0, 0, 0, 0.3)', 
      },
    },
  },
  plugins: [],
};
