'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ServiceTabs } from './ServiceTabs';
import { BeforeAfterStage } from './BeforeAfterStage';
import { DifferentiatorBar } from './DifferentiatorBar';
import {
  lmsSlide,
  animationsSlide,
  websiteSlide,
  erpSlide,
  contentSlide,
  marketingSlide,
} from './slides';
import type { SlideConfig } from './slides/types';

const SLIDES: SlideConfig[] = [
  lmsSlide,
  animationsSlide,
  websiteSlide,
  erpSlide,
  contentSlide,
  marketingSlide,
];

export default function WhatWeDo() {
  const [activeId, setActiveId] = useState<string>(SLIDES[0].id);
  const activeSlide = SLIDES.find((s) => s.id === activeId) ?? SLIDES[0];

  return (
    <section
      style={{
        position: 'relative',
        background: '#050505',
        padding: '80px 0',
        overflow: 'hidden',
      }}
    >
      {/* Subtle grain overlay */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          opacity: 0.015, pointerEvents: 'none', zIndex: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="what-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#what-grain)" />
      </svg>

      {/* Fire ambient glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '30%', left: '50%',
          transform: 'translateX(-50%)',
          width: 600, height: 300,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(232,98,42,0.06) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }}
      />

      {/* Section line */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 1, background: '#1d1d1d',
        }}
      />

      <div
        style={{
          position: 'relative', zIndex: 1,
          maxWidth: 1100, margin: '0 auto',
          padding: '0 32px',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: '#E8622A',
              fontFamily: 'var(--font-ui)',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: 10,
            }}
          >
            What We Do
          </div>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            See the transformation.
            <br />
            <span style={{ color: '#555', fontStyle: 'italic', fontWeight: 300 }}>
              Drag to reveal.
            </span>
          </h2>
          <p
            style={{
              marginTop: 12,
              fontSize: 14,
              color: '#555',
              fontFamily: 'var(--font-body)',
              maxWidth: 500,
            }}
          >
            Every institution we work with had a&nbsp;&ldquo;before.&rdquo; Drag the divider to see exactly what changed.
          </p>
        </div>

        {/* Tabs + Stage container */}
        <div
          style={{
            background: '#0a0a0a',
            border: '1px solid #1d1d1d',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          {/* Service tabs */}
          <ServiceTabs
            slides={SLIDES}
            activeId={activeId}
            onChange={(id) => setActiveId(id)}
          />

          {/* Stage — AnimatePresence for slide transitions */}
          <div style={{ padding: '20px 20px 20px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <BeforeAfterStage slide={activeSlide} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Differentiator bar */}
        <DifferentiatorBar />
      </div>
    </section>
  );
}
