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
        primary: '#836EF9',
        blueCustom: '#b3e6f7',
        firstWhiteCustom: '#dff5fb',
        whiteCustom: '#f4faf7',
        customTeal: '#31CBBA',
        brand: {
          '50': '#eefbf3',
          '100': '#d6f5e1',
          '200': '#b0eac8',
          '300': '#7cd9a9',
          '400': '#46c185',
          '500': '#27b776',
          '600': '#168556',
          '700': '#116b46',
          '800': '#10553a',
          '900': '#0e4630',
          '950': '#07271b',
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
