import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./client/index.html", "./client/src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["dark"],
  },
  theme: {
    extend: {},
  },

  plugins: [daisyui],
};
