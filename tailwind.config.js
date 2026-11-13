/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#00f0ff",
          cyanGlow: "#00d8e6",
          magenta: "#ff007f",
          magentaGlow: "#e60073",
          yellow: "#ffe66d",
          green: "#00ff88",
          purple: "#9d4edd",
          darkBg: "#0a0f24",
          cardDark: "rgba(16, 23, 53, 0.75)",
          borderDark: "rgba(255, 255, 255, 0.12)",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "Poppins", "sans-serif"],
      },
      animation: {
        "gradient-shift": "gradientShift 15s ease infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "win-pulse": "winPulse 0.8s infinite alternate",
        "fade-in": "fadeIn 0.25s ease-out forwards",
        "zoom-in": "zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        float: "float 4s ease-in-out infinite",
      },
      keyframes: {
        gradientShift: {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        },
        winPulse: {
          "0%": {
            boxShadow: "0 0 12px #ff4d4d, 0 0 24px #ff0000",
            transform: "scale(1.04)",
          },
          "100%": {
            boxShadow: "0 0 20px #ff0000, 0 0 35px #ff0000",
            transform: "scale(1.07)",
          },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        zoomIn: {
          "0%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      boxShadow: {
        neonCyan: "0 0 20px rgba(0, 240, 255, 0.5)",
        neonMagenta: "0 0 20px rgba(255, 0, 127, 0.5)",
        neonYellow: "0 0 20px rgba(255, 230, 109, 0.5)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        glassLight: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
      },
    },
  },
  plugins: [],
};
