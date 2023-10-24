/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'], // Add your custom font name here
      },
      boxShadow: {
        'custom': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',
      },
      screens:{
        "md-custom":"1023px",
        "sm-custom":"328px",
      }
    },
  },
  plugins: [],
}