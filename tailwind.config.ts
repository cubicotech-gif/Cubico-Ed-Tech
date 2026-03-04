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
        // ── Precision White design system ─────────────────────────────────────
        'bg-base':   '#FFFFFF',
        'bg-subtle': '#F7F8FC',
        'bg-muted':  '#EFF1F8',
        'bg-dark':   '#0A0F1E',
        blue:        '#1A6BFF',
        'blue-dark': '#0052E0',
        gold:        '#E8A020',
        'text-primary': '#0A0F1E',
        'text-body':    '#3D4461',
        'text-muted':   '#8A91A8',
        'text-dim':     '#C2C6D8',
        line:        '#E4E8F0',
        line2:       '#D0D5E8',
        green:       '#0DB87A',
        // ── Legacy palette (used by other pages) ──────────────────────────────
        background:      '#0a0a0a',
        'card-bg':       '#161b24',
        border:          '#1f2733',
        accent:          '#3b82f6',
        'accent-green':  '#06d6a0',
        'accent-purple': '#a855f7',
        'accent-orange': '#f97316',
        text:            '#e8eaf0',
        muted:           '#6b7588',
      },
      fontFamily: {
        // ── CSS-var fonts from next/font/google ───────────────────────────────
        display:   ['var(--font-dm-serif)',        'Georgia', 'serif'],
        ui:        ['var(--font-dm-sans)',          'system-ui', 'sans-serif'],
        body:      ['var(--font-dm-sans)',          'system-ui', 'sans-serif'],
        stamp:     ['var(--font-space-grotesk)',    'monospace'],
        editorial: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
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
