import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        'card-bg': '#161b24',
        border: '#1f2733',
        accent: '#3b82f6',
        'accent-green': '#06d6a0',
        'accent-purple': '#a855f7',
        'accent-orange': '#f97316',
        text: '#e8eaf0',
        muted: '#6b7588',
      },
      fontFamily: {
        // Loaded via Google Fonts <link> at runtime in app/layout.tsx
        syne: ['Syne', 'sans-serif'],
        dm: ['"DM Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #3b82f6, #06d6a0)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
