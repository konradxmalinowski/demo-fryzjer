/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        salon: {
          cream: '#FAF8F5',
          warm: '#F5F0EA',
          taupe: '#C4B5A0',
          brown: '#8B6F5E',
          espresso: '#3D2B1F',
          gold: '#C9A96E',
          charcoal: '#2C2C2C',
        },
      },
    },
  },
  plugins: [],
}
