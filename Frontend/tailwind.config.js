/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], //src folder lo files like js,ts,jsx,tsx can work wwith tailwind
  theme: {
    extend: { // Add custom colors here for Tailwind classes
      colors: {
        'custom-primary': '#1F7A5A',
        'custom-secondary': '#F4F7F5',
        'custom-accent': '#F59E0B',
        'custom-border': '#D1D5DB',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      light: {
        "primary": "#1F7A5A",
        "secondary": "#F4F7F5",
        "accent": "#F59E0B",
        "base - 100": "#ffffff",
        "base - 200": "#F4F7F5",
        "base - 300": "#D1D5DB",
        "neutral": "#1f2937",
        "neutral - content": "#6b7280",
        "success": " #10b981",
        "warning": "#F59E0B",
        "error": "#ef4444",
        "info": "#3b82f6",
      },
      dark: {
        /* ========== DARK THEME ========== */
        "primary": "#2dd4bf",
        "secondary": "#1e293b",
        "accent": "#fbbf24",
        "base - 100": "#0f172a",
        "base - 200": "#1e293b",
        "base - 300": "#334155",
        "neutral": "#f8fafc",
        "neutral - content": "#cbd5e1",
        "success": "#10b981",
        "warning": "#fbbf24",
        "error": "#f87171",
        "info": "#60a5fa",
      }
    }],
  },
}

//version 3 