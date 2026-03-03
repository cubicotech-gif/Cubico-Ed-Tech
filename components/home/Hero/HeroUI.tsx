'use client';

import Link from 'next/link';

// ── HeroUI ─────────────────────────────────────────────────────────────────────
// The right-column content: value prop, CTAs, availability indicator.
// Slides in from x:60 during Act 5. Designed for right 38% of viewport.

export function HeroUI() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>

      {/* Value proposition */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(14px, 1.3vw, 16px)',
          lineHeight: 1.75,
          color: 'rgba(197,191,183,0.58)',
          margin: 0,
          maxWidth: 380,
        }}
      >
        Karachi&apos;s EdTech specialists. We deliver Moodle LMS platforms,
        educational animations, and school portals — in English, Arabic, and Urdu
        — within 30 days, fixed price.
      </p>

      {/* CTA row */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link
          href="/contact"
          data-cursor="large"
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: '0.05em',
            color: '#fff',
            backgroundColor: '#E8622A',
            borderRadius: 3,
            padding: '14px 28px',
            textDecoration: 'none',
            display: 'inline-block',
            boxShadow: '0 0 28px rgba(232,98,42,0.28)',
            transition: 'box-shadow 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.backgroundColor = '#cf5020';
            el.style.boxShadow = '0 0 48px rgba(232,98,42,0.5)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.backgroundColor = '#E8622A';
            el.style.boxShadow = '0 0 28px rgba(232,98,42,0.28)';
          }}
        >
          Start a Project →
        </Link>

        <Link
          href="/portfolio"
          data-cursor="large"
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 500,
            fontSize: 13,
            letterSpacing: '0.05em',
            color: '#666',
            backgroundColor: 'transparent',
            border: '1px solid #282828',
            borderRadius: 3,
            padding: '14px 28px',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'color 0.2s ease, border-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = '#F0EBE3';
            el.style.borderColor = '#444';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = '#666';
            el.style.borderColor = '#282828';
          }}
        >
          View Our Work
        </Link>
      </div>

      {/* Availability dot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            backgroundColor: '#10B981',
            display: 'inline-block',
            boxShadow: '0 0 8px rgba(16,185,129,0.55)',
            animation: 'pulse-green 2.2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 12,
            color: '#3a3a3a',
            letterSpacing: '0.04em',
          }}
        >
          Available for Q2 2026 projects
        </span>
      </div>
    </div>
  );
}
