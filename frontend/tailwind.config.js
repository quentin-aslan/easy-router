/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: ["light", "dark", "cupcake", "forest", "nord", "retro"],
    darkTheme: "dark", // name of one of the included themes for dark mode
  },
};
