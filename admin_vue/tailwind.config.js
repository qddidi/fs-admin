/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        "calc-100vh-100": "calc(100vh - 100px)",
      },
    },
  },
  plugins: [],
};
