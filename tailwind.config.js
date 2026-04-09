/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This scans all your React components
  ],
  theme: {
    extend: {
      // Keep your custom animations here as we discussed!
      animation: {
        'slow-zoom': 'slowzoom 10s infinite alternate',
        'pulse-subtle': 'pulseSubtle 1s infinite ease-in-out',
        'bounce-slow': 'bounce 1s infinite',
        shimmer: "shimmer 1.8s linear infinite",
      },
      keyframes: {
        slowzoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(0.99)' },
        }
      }
    },
  },
  plugins: [],
}