/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        serif: ["Cormorant", "serif"],
        sans: ["Montserrat", "sans-serif"],
      },
      colors: {
        gold: {
          50: "#FAF8F0",
          100: "#F5F0DF",
          200: "#EBE0BE",
          300: "#DBC88C",
          400: "#D4B45C",
          500: "#D4AF37",
          600: "#A8882A",
          700: "#8A6F22",
          800: "#71591B",
          900: "#544214",
          950: "#2A210A",
          DEFAULT: "#D4AF37",
          glow: "rgba(212,175,55,0.15)",
        },
      },
      animation: {
        "fade-in": "fade-in 1.5s ease-out forwards",
        "title-reveal": "title-reveal 2s ease-out forwards",
        "fade-up": "fade-up 0.8s ease-out forwards",
        "slide-left": "slide-left 0.6s ease-out forwards",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "title-reveal": {
          "0%": { opacity: "0", letterSpacing: "0.05em" },
          "100%": { opacity: "1", letterSpacing: "0.15em" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-left": {
          "0%": { opacity: "0", transform: "translateX(-50px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(10px)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
