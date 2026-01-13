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
    themes: false,
  },
}

