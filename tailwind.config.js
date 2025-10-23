/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sky: "#E3F2FD",
        deepBlue: "#0F172A",
        aqua: "#38BDF8",
        ice: "#F8FAFC",
        grayish: "#64748B",
      },
    },
  },
  plugins: [],
};
