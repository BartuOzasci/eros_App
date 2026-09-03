/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Eros'un kayısı rengi tüylerinden esinlenen ana palet */
        brand: {
          50: "#FEF6ED",
          100: "#FDEBD6",
          200: "#FAD4AD",
          300: "#F6B87C",
          400: "#F19B51",
          500: "#E9822F",
          600: "#D66A1F",
          700: "#B2521B",
          800: "#8E421D",
          900: "#73381B",
        },
        blush: {
          50: "#FFF4F6",
          100: "#FFE6EB",
          200: "#FFCCD6",
          300: "#FFA6B8",
          400: "#FB7A95",
          500: "#F05377",
          600: "#DA3560",
        },
        mint: {
          50: "#EFFAF4",
          100: "#D7F4E5",
          200: "#B0E8CD",
          300: "#7DD6AE",
          400: "#4BBE8D",
          500: "#2BA372",
          600: "#1F835C",
        },
        sky: {
          50: "#EFF7FF",
          100: "#DAEDFF",
          200: "#B6DBFF",
          300: "#84C2FB",
          400: "#4FA4F0",
          500: "#2C86DA",
        },
        ink: {
          50: "#F7F6F4",
          100: "#EDEBE7",
          200: "#DDD9D2",
          300: "#C2BCB2",
          400: "#8E877C",
          500: "#6B645A",
          600: "#524C44",
          700: "#3E3932",
          800: "#2B2721",
          900: "#1C1915",
        },
        /* Koyu tema: mavi-siyah değil, sıcak kömür tonları */
        night: {
          900: "#14110F",
          800: "#1B1714",
          700: "#241F1B",
          600: "#2F2823",
          500: "#3D342D",
        },
        /* Eski isimlerle geriye dönük uyumluluk */
        primary: "#F19B51",
        secondary: "#FFE6EB",
        background: "#FFFBF5",
        textMain: "#3E3932",
      },
      fontFamily: {
        display: ['"Quicksand"', "system-ui", "-apple-system", "sans-serif"],
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(114, 72, 33, 0.18), 0 4px 10px -6px rgba(114, 72, 33, 0.08)",
        lift: "0 22px 45px -20px rgba(114, 72, 33, 0.35), 0 8px 18px -12px rgba(114, 72, 33, 0.15)",
        glow: "0 0 0 1px rgba(241, 155, 81, 0.25), 0 12px 32px -12px rgba(233, 130, 47, 0.45)",
        inset: "inset 0 1px 0 0 rgba(255, 255, 255, 0.6)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #F6B87C 0%, #E9822F 100%)",
        "blush-gradient": "linear-gradient(135deg, #FFCCD6 0%, #FB7A95 100%)",
        "mint-gradient": "linear-gradient(135deg, #B0E8CD 0%, #2BA372 100%)",
        "sky-gradient": "linear-gradient(135deg, #B6DBFF 0%, #2C86DA 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pop: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "70%": { transform: "scale(1.02)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.25)", opacity: "0" },
          "100%": { transform: "scale(1.25)", opacity: "0" },
        },
        wag: {
          "0%, 100%": { transform: "rotate(-8deg)" },
          "50%": { transform: "rotate(8deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.4s ease both",
        pop: "pop 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 6s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        wag: "wag 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
