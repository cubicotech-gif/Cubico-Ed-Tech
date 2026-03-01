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
        // ── New editorial brand palette ─────────────────────────────────────
        void: '#080808',
        surface: '#111111',
        card: '#191919',
        cream: '#F5F2ED',
        ivory: '#F0EBE3',
        'warm-gray': '#7A7268',
        ink: '#1A1714',
        fire: '#E8622A',
        bronze: '#C9A96E',
        rule: '#2A2520',
        // ── Legacy tokens (unchanged — other pages rely on these) ────────────
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
        // ── New brand fonts (CSS variables set by next/font/google) ─────────
        display: ['var(--font-display)', 'Georgia', 'serif'],
        ui: ['var(--font-ui)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-accent)', '"Arial Narrow"', 'sans-serif'],
        // ── Legacy (still loaded via <link> for other pages) ─────────────────
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
