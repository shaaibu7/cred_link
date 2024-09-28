/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-svg': "url('/src/assets/svg/backgroundImage.svg')",
      },
      colors:{
        primary:{
          100: "",
          200: "",
          300: "",
          400: "",
          500: "",
          600: "",
          700: "",
          800: "",
          900: "",
          950: ""
        }

      },
      fontFamily:{
        100: "Helvetica"
      }
    },
  },
  plugins: [],
}