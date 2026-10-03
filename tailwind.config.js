/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          DEFAULT: '#E8E2D6',
          light: '#F5F2EB',
          dark: '#DDD6C7',
          deep: '#C9BEAA',
        },
        obsidian: {
          DEFAULT: '#0E1219',
          surface: '#131822',
          card: '#161C26',
          border: '#232B3A',
          subtle: '#2E384D',
        },
        copper: {
          DEFAULT: '#C86D51',
          hover: '#D97E62',
          light: '#F3E5E0',
        },
        sage: {
          DEFAULT: '#5B7065',
          light: '#889C92',
        },
        slate: {
          DEFAULT: '#70757E',
          muted: '#8E94A0',
        },
      },
      fontFamily: {
        harmond: ['Harmond', 'Georgia', 'serif'],
        nohemi: ['Nohemi', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
