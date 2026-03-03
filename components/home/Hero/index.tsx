'use client';

import { HeroLeft } from './HeroLeft';
import { HeroRight } from './HeroRight';

// ── Hero ───────────────────────────────────────────────────────────────────────
// Full-viewport section. Background: #050505 (void).
// Two-column grid: left = copy/CTAs, right = device mockup carousel.
// Background grid overlay + left-side dark vignette gradient.
// Nav is rendered globally in layout.tsx — not here.

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#050505',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        alignItems: 'center',
        paddingTop: 72, // nav height offset
      }}
    >
      {/* Background grid */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern id="hero-bg-grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.018)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-bg-grid)" />
      </svg>

      {/* Left dark gradient (keeps text readable against the grid + right side glow) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.5) 50%, transparent 80%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Left column — headlines, CTAs, stats */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <HeroLeft />
      </div>

      {/* Right column — device mockup carousel */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <HeroRight />
      </div>

      {/* Mobile: stack layout override — controlled via className + global CSS */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
