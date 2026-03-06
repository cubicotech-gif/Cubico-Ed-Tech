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
        // ── New Cubico palette (dark navy enterprise) ─────────────────────────
        void:        '#060A15', // deep space navy — site background
        surface:     '#0C1528', // surface backgrounds
        card:        '#101E32', // card backgrounds
        navy:        '#060A15',
        'navy-surface': '#0C1528',
        'navy-card': '#101E32',
        'navy-border': '#1A2E4A',
        indigo:      '#4F46E5', // primary accent
        'indigo-light': '#818CF8', // soft indigo labels
        'indigo-dark':  '#3730A3',
        purple:      '#7C3AED', // secondary accent
        teal:        '#06D6A0', // emerald teal
        'main-text': '#E2E8F0', // primary text
        muted:       '#64748B', // muted text
        // ── Legacy palette (kept for other pages) ─────────────────────────────
        cream:       '#F5F2ED',
        ivory:       '#F0EBE3',
        'warm-gray': '#7A7268',
        ink:         '#1A1714',
        fire:        '#E8622A',
        bronze:      '#C9A96E',
        rule:        '#2A2520',
        background:      '#0a0a0a',
        'card-bg':       '#161b24',
        border:          '#1f2733',
        accent:          '#3b82f6',
        'accent-green':  '#06d6a0',
        'accent-purple': '#a855f7',
        'accent-orange': '#f97316',
        text:            '#e8eaf0',
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
        marquee:        'marquee 30s linear infinite',
        'marquee-slow': 'marquee 50s linear infinite',
        'fade-in':      'fadeIn 0.5s ease forwards',
        'pulse-glow':   'pulseGlow 3s ease-in-out infinite',
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
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79,70,229,0.3)' },
          '50%':      { boxShadow: '0 0 40px rgba(79,70,229,0.6)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
