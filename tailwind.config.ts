import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Pantone 2955 — deep navy blue (primary)
        navy: {
          50: "#e6eef5",
          100: "#c2d5e6",
          200: "#9bbad6",
          300: "#739fc5",
          400: "#558bb8",
          500: "#3778ab",
          600: "#2d6a9a",
          700: "#1f5783",
          800: "#13446c",
          900: "#003865", // Pantone 2955 C
          950: "#002244",
        },
        // Pantone 355 — vibrant green (secondary/accent)
        accent: {
          50: "#e6f7ec",
          100: "#c0ebd0",
          200: "#96deb1",
          300: "#6ad191",
          400: "#47c77a",
          500: "#009B3A", // Pantone 355 C
          600: "#008c34",
          700: "#007a2d",
          800: "#006826",
          900: "#004a1b",
        },
        // Keep energy as an alias for the green
        energy: {
          50: "#e6f7ec",
          100: "#c0ebd0",
          200: "#96deb1",
          300: "#6ad191",
          400: "#47c77a",
          500: "#009B3A",
          600: "#008c34",
          700: "#007a2d",
          800: "#006826",
          900: "#004a1b",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
