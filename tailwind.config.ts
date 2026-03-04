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
        // ── Single editorial design system ────────────────────────────────────
        void:        '#080808', // site background
        surface:     '#111111',
        card:        '#191919', // card backgrounds
        cream:       '#F5F2ED', // light section backgrounds
        ivory:       '#F0EBE3', // primary text on dark
        'warm-gray': '#7A7268', // secondary text on dark
        ink:         '#1A1714', // text on cream sections
        fire:        '#E8622A', // main accent — burnt orange
        bronze:      '#C9A96E', // secondary accent — aged gold
        rule:        '#2A2520', // divider lines / card borders
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        ui:      ['var(--font-ui)',       'system-ui', 'sans-serif'],
        body:    ['var(--font-body)',     'system-ui', 'sans-serif'],
        accent:  ['var(--font-accent)',   'cursive'],
      },
      animation: {
        marquee:   'marquee 30s linear infinite',
        'fade-in': 'fadeIn 0.5s ease forwards',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
