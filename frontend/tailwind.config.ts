import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#0f0f1a",
          secondary: "#16162a",
          tertiary: "#1d1d35",
        },
        surface: {
          primary: "#1a1a2e",
          secondary: "#25253f",
          tertiary: "#2f2f4a",
        },
        accent: {
          primary: "#6366f1",
          secondary: "#8b5cf6",
          light: "#a78bfa",
          success: "#10b981",
        },
        text: {
          primary: "#e0e7ff",
          secondary: "#c7d2fe",
          tertiary: "#a5b4fc",
          muted: "#818cf8",
        },
        border: {
          primary: "#312e81",
          secondary: "#4c1d95",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
