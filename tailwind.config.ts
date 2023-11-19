import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-black": "#040404",
        "dark-slate-blue": " #3B486D",
        "light-gray": "#F1F1F1",
        "battleship-grey" : '#858688',
        "jet-black" : '#0C0C0C'
      },
    },
  },
  plugins: [],
};
export default config;
