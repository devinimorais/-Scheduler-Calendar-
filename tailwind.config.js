/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Poppins', "sans-serif"],
      },
      colors: {
        customGray: '#f2f2f2', 
        customColorGray: '#2c2c2c',
      },
      boxShadow: {
        'custom-card': '8px 8px 0 #000;', 
        
      },
    },
  },
  plugins: [],
};
