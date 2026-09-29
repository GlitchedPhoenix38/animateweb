/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        atlas: {
          black: '#03040A',
          panel: '#0A0D16',
          surface: '#080B14',
          text: '#EDEEF4',
          muted: '#9399AB',
          dim: '#5D6378',
          blue: '#5B9DF5',
          violet: '#9575E8',
          cyan: '#5CD6E8',
          gold: '#E5B85C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.2)',
        elevated: '0 4px 12px rgba(0,0,0,0.35), 0 1px 4px rgba(0,0,0,0.25)',
      },
    },
  },
  plugins: [],
};
