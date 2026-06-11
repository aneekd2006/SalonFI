/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          DEFAULT: '#3B6E61',
          dark: '#2C5247',
          light: '#E6F2EF',
          muted: '#6E9E93',
        },
        accent: {
          DEFAULT: '#CB9A6E',
          light: '#F5EDE4',
        },
        status: {
          empty: '#30A46C',
          'empty-bg': '#E8F8F0',
          light: '#E5A218',
          'light-bg': '#FFF4DC',
          busy: '#E54D2E',
          'busy-bg': '#FFECEB',
          full: '#B91C1C',
          'full-bg': '#FEE2E2',
        },
        surface: {
          base: '#F9F9F7',
          card: '#FFFFFF',
          elevated: '#F2F2EF',
        },
        text: {
          primary: '#1A1A1A',
          secondary: '#5C5C5C',
          tertiary: '#9E9E9E',
          inverse: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E5E5E5',
          strong: '#CCCCCC',
        },
      },
      fontSize: {
        '2xs': ['11px', { lineHeight: '1.4', fontWeight: '500' }],
      },
      borderRadius: {
        '2xl': '28px',
      },
      maxWidth: {
        'phone': '390px',
      },
      boxShadow: {
        'phone': '0 0 40px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};