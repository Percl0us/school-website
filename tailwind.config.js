/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        henny: ['"Henny Penny"', "cursive"],
        dyna: ["DynaPuff", "sans-serif"],
        swanky: ['"Fontdiner Swanky"', "cursive"],
        indie: ['"Indie Flower"', "cursive"],
        glory: ['"Give You Glory"', "cursive"],
        matemasie: ["Matemasie", "cursive"],
        unifraktur: ["UnifrakturMaguntia", "cursive"], // 👈 new
      },
      animation: {
        "slow-zoom": "slowzoom 10s infinite alternate",
        "pulse-subtle": "pulseSubtle 1s infinite ease-in-out",
        "bounce-slow": "bounce 1s infinite",
        shimmer: "shimmer 1.8s linear infinite",
        float: "float 6s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
      },
      keyframes: {
        slowzoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(0.99)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
