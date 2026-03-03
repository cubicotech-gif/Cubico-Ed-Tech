'use client';

import { useRef } from 'react';
import { Grain } from '@/components/ui/Grain';
import { ImageLayer } from './ImageLayer';
import { SplitHeadline } from './SplitHeadline';
import { StatsCounter } from './StatsCounter';
import { HeroUI } from './HeroUI';
import { useScrollSequence } from './useScrollSequence';

// ── HeroScene ──────────────────────────────────────────────────────────────────
// 400vh outer container (the scroll distance).
// 100vh inner pinned section (GSAP sets position:fixed when active).
//
// Layer stack (z-index):
//  0  ImageLayer          — atmospheric background, clip-path animated (Act 3)
//  1  hero-overlay        — dark veil that settles in Act 5
//  2  act1-line           — fire orange horizontal line (Act 1)
//  3  act2-word wrapper   — centered ghost CUBICO wordmark (Act 2)
//  4  act4 headline       — three-line headline, bottom-left (Act 4)
//  4  hero-eyebrow        — eyebrow stamp, top-left (Act 5)
//  4  act5-right          — right-column UI panel (Act 5)
//  5  act5-stats wrapper  — bottom stats bar (Act 5)
//  10 Grain               — SVG noise overlay (always)

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useScrollSequence(containerRef as React.RefObject<HTMLElement>);

  return (
    // Outer container — defines total scroll distance (400vh)
    <div
      ref={containerRef}
      className="hero-outer"
      style={{
        position: 'relative',
        height: '400vh',
        backgroundColor: '#050505',
      }}
    >
      {/* ── Pinned viewport — GSAP sets position:fixed during scroll ── */}
      <div
        className="hero-pin"
        style={{
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: '#050505',
          position: 'relative',
        }}
      >
        {/* z:0 — Atmospheric image layer */}
        <ImageLayer />

        {/* z:1 — Act 5 dim overlay */}
        <div
          className="hero-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(5,5,5,0.42)',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* z:2 — Act 1: fire horizontal line */}
        <div
          className="act1-line"
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: '#E8622A',
            zIndex: 2,
            boxShadow: '0 0 14px rgba(232,98,42,0.5)',
            pointerEvents: 'none',
          }}
        />

        {/* z:3 — Act 2: ghost CUBICO wordmark */}
        {/* Centering is handled by flex on this wrapper, not by transform,
            so GSAP can animate scaleY on .act2-word without fighting CSS translate. */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <div
            className="act2-word"
            style={{
              mixBlendMode: 'overlay',
              transformOrigin: 'center center',
              userSelect: 'none',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 'clamp(120px, 18vw, 260px)',
                fontWeight: 400,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(240,235,227,0.22)',
                letterSpacing: '0.05em',
                lineHeight: 1,
                display: 'block',
              }}
            >
              CUBICO
            </span>
          </div>
        </div>

        {/* z:4 — Act 4 headline: bottom-left */}
        <div
          style={{
            position: 'absolute',
            bottom: '18%',
            left: '5%',
            right: '48%',
            zIndex: 4,
          }}
        >
          <SplitHeadline />
        </div>

        {/* z:4 — Act 5 eyebrow: top-left */}
        <div
          className="hero-eyebrow"
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            zIndex: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 11,
              letterSpacing: '0.35em',
              color: '#E8622A',
            }}
          >
            CUBICO TECHNOLOGIES
          </span>
          {/* Rule */}
          <span
            style={{
              width: 32,
              height: 1,
              backgroundColor: '#E8622A',
              display: 'inline-block',
              opacity: 0.5,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 11,
              letterSpacing: '0.25em',
              color: '#2e2e2e',
            }}
          >
            EDTECH AGENCY · KARACHI
          </span>
        </div>

        {/* z:4 — Act 5 right panel: top-center / right */}
        <div
          className="act5-right"
          style={{
            position: 'absolute',
            top: '50%',
            right: '5%',
            transform: 'translateY(-50%)',
            width: 'min(38%, 440px)',
            zIndex: 4,
          }}
        >
          <HeroUI />
        </div>

        {/* z:5 — Act 5 stats bar: fixed bottom */}
        {/* Outer div clips the translateY(100%) overflow */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 5,
            overflow: 'hidden',
          }}
        >
          <div className="act5-stats">
            <StatsCounter />
          </div>
        </div>

        {/* z:10 — Grain overlay (top of all) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
          <Grain />
        </div>
      </div>
    </div>
  );
}
