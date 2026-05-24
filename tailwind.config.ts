import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        edch: {
          blue: "#0B5CAD",
          sky: "#E8F4FF",
          green: "#178A52",
          mint: "#EAF8F0",
          ink: "#102033"
        }
      },
      boxShadow: {
        soft: "0 18px 50px rgba(16, 32, 51, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
