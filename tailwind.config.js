/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        void: {
          950: '#050507',
          900: '#0a0a10',
          800: '#0d0d14',
          700: '#16161f',
        },
        volt: {
          400: '#ff6b81',
          500: '#ff1744',
          600: '#c4102f',
        },
        plasma: {
          400: '#5b9dff',
          500: '#0057ff',
          600: '#0041c4',
        },
        cyanpulse: {
          400: '#22d3ee',
          500: '#06b6d4',
        },
      },
      fontFamily: {
        brand: ['var(--font-brand)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '8%': { opacity: 0.4 },
          '10%': { opacity: 1 },
          '13%': { opacity: 0.6 },
          '15%': { opacity: 1 },
          '60%': { opacity: 1 },
          '62%': { opacity: 0.3 },
          '64%': { opacity: 1 },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        eq: {
          '0%, 100%': { height: '20%' },
          '50%': { height: '100%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        flicker: 'flicker 5s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        marquee: 'marquee 24s linear infinite',
      },
      boxShadow: {
        volt: '0 0 20px rgba(255,23,68,0.5), 0 0 60px rgba(255,23,68,0.15)',
        plasma: '0 0 20px rgba(0,87,255,0.5), 0 0 60px rgba(0,87,255,0.15)',
      },
    },
  },
  plugins: [],
};
