/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#1A1A2E",
        grass: "#4CAF50",
        amber: "#F5A623",
        problem: "#E74C3C",
        quest: "#3498DB",
        paper: "#F0EAD6",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        mono: ['"Space Mono"', "Courier New", "monospace"],
        ui: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
