/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      keyframes: {
        expand: {
          '0%': { width: '0%' },
          '100%': { width: '50%' },
        },
      },
      animation: {
        expand: 'expand 1s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
