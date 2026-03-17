/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        secondary: "#121826",
        card: "#1A2236",
        border: "#2A3447",
        profit: "#22C55E",
        loss: "#EF4444",
        'primary-blue': "#3B82F6",
        'accent-purple': "#8B5CF6",
        'main': "#F9FAFB",
        'muted': "#9CA3AF",
      },
      backgroundImage: {
        'hero': "url('./assets/login.jpg')",
      },
    },
  },
  plugins: [],
}