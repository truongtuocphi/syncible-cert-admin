import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      screens: { xs: '480px', '2xs': '375px', '3xs': '320px' },
      colors: {
        brand: {
          50: '#E6EEFF',
          100: '#B3C8FF',
          200: '#8AA7FF',
          300: '#6183FF',
          400: '#385DFF',
          500: '#1034FF',
          600: '#021BD9',
          700: '#000FB3',
          800: '#00078C',
          900: '#000266',
        },
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
