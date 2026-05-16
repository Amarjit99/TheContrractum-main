/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007BFF',
          light: '#3395FF',
          dark: '#0056B3',
        },
        background: '#FFFFFF',
        text: '#000000',
      },
      fontFamily: {
        sans: ['Roboto', 'Noto Sans', 'sans-serif'],
      },
      dropShadow: {
        'lg': '0 10px 8px rgb(0 0 0 / 0.04), 0 4px 3px rgb(0 0 0 / 0.1)',
      },
    },
  },
  safelist: [
    'drop-shadow-lg',
    'font-black',
    'bg-gradient-to-r',
    'bg-gradient-to-br',
  ],
  plugins: [],
}
