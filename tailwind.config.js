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
        'slow-zoom': 'slowzoom 20s infinite alternate',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        slowzoom: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(0.98)' },
        }
      }
    },
  },
  plugins: [],
}