/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        sider: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
        tab: '0 1px 2px rgb(0 21 41 / 8%)'
      },
      colors: {
        windows: '#0178d4'
      }
    }
  },
  plugins: []
};
