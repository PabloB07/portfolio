/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Discord "Blurple" — primary brand color (#5865F2)
        primary: {
          50: '#eef0fe',
          100: '#e0e3fd',
          200: '#c4cafb',
          300: '#a3acf8',
          400: '#818df5',
          500: '#5865f2',
          600: '#4752e0',
          700: '#3a44c0',
          800: '#2f378f',
          900: '#282d63',
        },
        // Discord fuchsia (#EB459E) — secondary accent for gradients
        secondary: {
          50: '#fdeaf5',
          100: '#fbd5ec',
          200: '#f7abd8',
          300: '#f380c5',
          400: '#ef5fb2',
          500: '#eb459e',
          600: '#d62f87',
          700: '#b51f6e',
          800: '#8f1857',
          900: '#6d1343',
        },
        // Discord green (#23A559 / bright #57F287) — status & success
        accent: {
          50: '#e7f9ee',
          100: '#c6f1d6',
          200: '#94e6b3',
          300: '#57f287',
          400: '#3ed673',
          500: '#23a559',
          600: '#1f9450',
          700: '#1a7a42',
          800: '#155f34',
          900: '#114d2a',
        },
        // Discord surface neutrals
        discord: {
          blurple: '#5865f2',
          'dark-blurple': '#404eed',
          bg: '#f2f3f5',       // light app background
          'bg-dark': '#313338', // dark app background
          'bg-darker': '#2b2d31',
          'bg-darkest': '#1e1f22',
          card: '#ffffff',
          'card-dark': '#383a40',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'gradient-x': 'gradientX 6s ease infinite',
        'aurora': 'aurora 18s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        gradientX: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        aurora: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 30px) scale(0.95)' },
        },
        shimmer: {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      boxShadow: {
        glow: '0 0 24px rgba(88, 101, 242, 0.35)',
        'glow-lg': '0 0 48px rgba(88, 101, 242, 0.45)',
        'glow-fuchsia': '0 0 28px rgba(235, 69, 158, 0.4)',
        card: '0 8px 30px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 20px 50px -12px rgba(88, 101, 242, 0.35)',
      },
      backgroundImage: {
        'grid-light':
          'linear-gradient(to right, rgba(88,101,242,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(88,101,242,0.06) 1px, transparent 1px)',
        'grid-dark':
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'blurple-gradient': 'linear-gradient(135deg, #5865f2 0%, #eb459e 100%)',
      },
      backgroundSize: {
        grid: '40px 40px',
      },
    },
  },
  plugins: [],
};