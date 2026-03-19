import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: "#f8fafc",
        brand: "#14532d",
        brandLight: "#16a34a",
        textPrimary: "#0f172a",
      },
    },
  },
  plugins: [],
};

export default config;
