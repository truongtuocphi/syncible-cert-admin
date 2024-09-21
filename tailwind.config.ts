import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx,md,mdx}'],
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
      screens: {
        '3xs': '320px', // Custom smallest size
        '2xs': '375px', // Custom
        xs: '480px', // Custom extra small screen size
        sm: '640px', // Small screens (default Tailwind)
        md: '768px', // Medium screens (default Tailwind)
        lg: '1024px', // Large screens (default Tailwind)
        xl: '1280px', // Extra-large screens (default Tailwind)
        '2xl': '1536px', // 2XL screens (default Tailwind)
        '3xl': '1920px', // Full HD screens
        '4xl': '2560px', // 2K screens (Quad HD)
        '5xl': '3840px', // 4K screens },
      },
      backgroundImage: {
        'custom-radial-gradient':
          'radial-gradient(circle at center, rgba(107, 228, 222, 0.65) 0%, rgba(255, 235, 226, 0.0) 70%)',
      },
      blur: {
        '4xl': '5px',
        '250px': '250px',
      },
      boxShadow: {
        combinedShadow1:
          '0px -2px 4px 0px rgba(0, 0, 0, 0.2) inset, 0px 2px 4px 0px rgba(0, 0, 0, 0.15)',
        combinedShadow2:
          '0px 0px 10px 0px rgba(0, 0, 0, 0.07), 0px 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        bgPageAdmin: '#FAFAFA',
        blueCustom: '#b3e6f7',
        firstWhiteCustom: '#dff5fb',
        whiteCustom: '#f4faf7',
        customTeal: '#31CBBA',
        brand: {
          '10': 'rgba(246, 255, 247, 1)',
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
        primary: {
          '40': '#B1A5F9',
          '50': '#836EF9',
        },
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'swipe-up-fadein': {
          '0%': { opacity: '0', transform: 'translateY(25%)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        'swipe-down-fadein': {
          '0%': { opacity: '0', transform: 'translateY(-25%)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        'arrow-slide': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'button-expand': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
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
        'fade-in': 'fade-in 1s ease-in-out',
        'fade-out': 'fade-out 1s ease-in-out',
        'swipe-up-fadein': 'swipe-up-fadein 1s ease-in-out',
        'swipe-down-fadein': 'swipe-down-fadein 1s ease-in-out',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'arrow-slide': 'arrowSlide 0.5s ease-out',
        'button-expand': 'buttonExpand 0.5s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
