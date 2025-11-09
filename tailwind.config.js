/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de cores infantil - cores vibrantes mas suaves
        primary: {
          50: "#fef2f2",
          100: "#fde8e8",
          200: "#fbd5d5",
          300: "#f8b4b4",
          400: "#f87171",
          500: "#f56565", // Coral suave
          600: "#e53e3e",
          700: "#c53030",
          800: "#9b2c2c",
          900: "#742a2a",
        },
        secondary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9", // Azul céu
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        accent: {
          50: "#fefce8",
          100: "#fef9c3",
          200: "#fef08a",
          300: "#fde047",
          400: "#facc15",
          500: "#eab308", // Amarelo ensolarado
          600: "#ca8a04",
          700: "#a16207",
          800: "#854d0e",
          900: "#713f12",
        },
        success: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e", // Verde natureza
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7", // Roxo mágico
          600: "#9333ea",
          700: "#7c3aed",
          800: "#6b21a8",
          900: "#581c87",
        },
        orange: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316", // Laranja energético
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        // Tons neutros suaves
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      fontFamily: {
        comic: ["Comic Neue", "Comic Sans MS", "cursive"],
        fun: ["Fredoka One", "cursive"],
        kid: ["Nunito", "sans-serif"],
      },
      fontSize: {
        "kid-xs": ["14px", "20px"],
        "kid-sm": ["16px", "24px"],
        "kid-base": ["18px", "28px"],
        "kid-lg": ["22px", "32px"],
        "kid-xl": ["26px", "36px"],
        "kid-2xl": ["32px", "40px"],
        "kid-3xl": ["40px", "48px"],
      },
      borderRadius: {
        kid: "16px",
        "kid-lg": "24px",
        fun: "32px",
      },
      boxShadow: {
        kid: "0 4px 20px -2px rgba(0, 0, 0, 0.1)",
        "kid-lg": "0 8px 30px -4px rgba(0, 0, 0, 0.15)",
        fun: "0 12px 40px -8px rgba(0, 0, 0, 0.2)",
      },
      animation: {
        "bounce-slow": "bounce 2s infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        "pulse-slow": "pulse 3s infinite",
        float: "float 3s ease-in-out infinite",
        shake: "shake 0.5s ease-in-out",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-2px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(2px)" },
        },
      },
    },
  },
  plugins: [],
};
