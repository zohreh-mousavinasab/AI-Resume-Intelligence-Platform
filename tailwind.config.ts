import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        canvas: "#ffffff",
        graphite: "#000000",
        "warm-mist": "#fbe1d1",
        terracotta: "#5d2a1a",
        fog: "#f7f7f8",
        "muted-stone": "#4c4c4c",
        "light-steel": "#777b86",
        "hint-of-grey": "#a3a6af",
        "dusk-link": "#8b8c8d",
        primary: {
          50: "#fbe1d1",
          100: "#fbe1d1",
          500: "#5d2a1a",
          700: "#5d2a1a",
          900: "#17191c",
        },
        secondary: {
          100: "#e9eefc",
          500: "#6176b7",
          700: "#40558f",
        },
        success: "#5d2a1a",
        warning: "#8b5a2b",
        error: "#5d2a1a",
        neutral: {
          50: "#f7f9f8",
          100: "#eef1f0",
          200: "#dfe5e3",
          500: "#71807e",
          700: "#3b4a48",
          900: "#172321",
        },
        ink: {
          50: "#f7f7f8",
          100: "#e8e8ea",
          200: "#d5d6d9",
          300: "#a3a6af",
          500: "#777b86",
          700: "#4c4c4c",
          800: "#292b2e",
          900: "#17191c",
        },
        signal: {
          100: "#fbe1d1",
          300: "#d7a98e",
          500: "#8b4b35",
          700: "#5d2a1a",
        },
        focus: {
          100: "#fbf2ec",
          300: "#e6c1ad",
          500: "#8b5a46",
        },
        risk: {
          100: "#f8ebe7",
          400: "#b97863",
          600: "#7b3826",
        },
      },
      boxShadow: {
        subtle: "rgba(4, 23, 43, 0.05) 0 0 0 1px, rgba(0, 0, 0, 0.1) 0 20px 25px -5px, rgba(0, 0, 0, 0.1) 0 8px 10px -6px",
        panel: "rgba(4, 23, 43, 0.05) 0 0 0 1px, rgba(0, 0, 0, 0.1) 0 20px 25px -5px, rgba(0, 0, 0, 0.1) 0 8px 10px -6px",
        soft: "0 8px 18px rgba(4, 23, 43, 0.07)",
        paper: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        sm: "12px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        "2xl": "24px",
        "3xl": "24px",
      },
      fontFamily: {
        sans: ["Sohne", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        display: ["Signifier", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
