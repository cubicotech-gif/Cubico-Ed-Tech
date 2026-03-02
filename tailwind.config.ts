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
        // ── Editorial palette (new design system) ────────────────────────────
        void:        '#080808', // pure warm black — site background
        surface:     '#111111',
        card:        '#191919', // card backgrounds
        cream:       '#F5F2ED', // light section bg
        ivory:       '#F0EBE3', // primary text on dark
        'warm-gray': '#7A7268', // muted text on dark
        ink:         '#1A1714', // text on light sections
        fire:        '#E8622A', // burnt orange — main accent
        bronze:      '#C9A96E', // aged gold — secondary accent
        rule:        '#2A2520', // divider lines
        // ── Legacy palette (used by other pages / components) ─────────────────
        background:      '#0a0a0a',
        'card-bg':       '#161b24',
        border:          '#1f2733',
        accent:          '#3b82f6',
        'accent-green':  '#06d6a0',
        'accent-purple': '#a855f7',
        'accent-orange': '#f97316',
        text:            '#e8eaf0',
        muted:           '#6b7588',
        divider:         '#2A2520',
      },
      fontFamily: {
        // ── CSS-var fonts from next/font/google ───────────────────────────────
        display:   ['var(--font-display)', 'Georgia', 'serif'],
        ui:        ['var(--font-ui)',       'system-ui', 'sans-serif'],
        body:      ['var(--font-body)',     'system-ui', 'sans-serif'],
        accent:    ['var(--font-accent)',   'cursive'],
        // ── Legacy aliases (still work on other pages) ─────────────────────────
        syne:      ['var(--font-syne)',    'sans-serif'],
        dm:        ['var(--font-dm)',      'sans-serif'],
        bebas:     ['var(--font-accent)',  'cursive'],
        fraunces:  ['var(--font-display)', 'serif'],
        instrument:['var(--font-body)',    'sans-serif'],
        epilogue:  ['var(--font-ui)',      'sans-serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #3b82f6, #06d6a0)',
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
