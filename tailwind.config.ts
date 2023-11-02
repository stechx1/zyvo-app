import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./collections/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xxs: "375px",
      xs: "500px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          "emerald-300": "#4AEAB1",
        },
        secondary: {
          "gray-700": "#3A4B4C",
          "neutral-200": "#E5E5E5",
          "neutral-400": "#A4A4A4",
          "gray-100": "#F3F4F6",
        },
        custom: {
          "amber-500": "#FCA800",
        },
        "green-light": "#4AEAB1",
      },
    },
  },
  plugins: [],
};
export default config;
