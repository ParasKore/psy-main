/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#bae032',
        'primary-400': '#c9e85a',
      },
    },
    screens: {
      'xs': '640px',
      'sm': '975px',
      'md': '950px',
      'lg': '1280px',
    },
    aspectRatio: {
      '4/3': '4 / 3',
      '9/3': '9 / 3',
      '12/3': '12 / 3',
    },
  },
  plugins: [],
  
};
