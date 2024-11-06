/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#2D132C',
        primary: '#801336',
        secondary: '#C72C41',
        accent: '#EE4540',
      },
      fontFamily: {
        openSans: ['Open Sans', 'sans-serif'],
      },
      maxHeight: {
        '3xl': '48rem',
      },
      maxWidth: {
        '8xl': '90rem',
      },
    },
  },
  plugins: [],
}

