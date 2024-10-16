/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        login_bg: "url('../../assets/login/login_bg.jpg')",
      },
    },
  },
  plugins: [],
};
