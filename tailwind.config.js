/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cinema: {
          black: '#050505',
          panel: '#111111',
          panelSoft: '#171717',
          muted: '#a3a3a3',
          red: '#e50914',
          gold: '#f5c542',
        },
      },
      boxShadow: {
        cinematic: '0 24px 80px rgba(0, 0, 0, 0.55)',
        glow: '0 0 36px rgba(229, 9, 20, 0.24)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
