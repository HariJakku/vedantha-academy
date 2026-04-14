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
        academy: {
          navy:  "#0f1b4c",
          deep:  "#16245c",
          blue:  "#1e3a8a",
          gold:  "#c9962c",
          cream: "#fdfaf4",
          warm:  "#f5f0e8",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body:    ["var(--font-nunito)",   "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in-up":  "fadeInUp 0.6s ease-out forwards",
        "fade-in-left":"fadeInLeft 0.6s ease-out forwards",
        "scale-in":    "scaleIn 0.4s ease-out forwards",
        "float":       "float 6s ease-in-out infinite",
        "marquee":     "marquee 35s linear infinite",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          from: { opacity: "0", transform: "translateX(-24px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.92)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  
  plugins: [],
  
};

export default config;