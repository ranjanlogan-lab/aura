/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lexend: ['Lexend', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        premium: {
          gold: '#D4AF37',
        },
      },
    },
  },
  plugins: [],
};