'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

const ICONS = ['◈', '◉', '◐', '◑', '◒', '◓'];

export default function WhatWeDo() {
  const [activeId, setActiveId] = useState<string>(SLIDES[0].id);
  const activeSlide = SLIDES.find((s) => s.id === activeId) ?? SLIDES[0];
  const activeIndex = SLIDES.findIndex((s) => s.id === activeId);

  return (
    <section
      style={{
        position: 'relative',
        background: 'var(--bg-base)',
        padding: '100px 0 80px',
        overflow: 'hidden',
      }}
    >
      {/* Top accent line */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'var(--line)' }} />

      {/* Ambient blue glow — centre */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '20%', left: '55%',
          width: 700, height: 500,
          background: 'radial-gradient(ellipse at 50% 40%, rgba(26,107,255,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative', zIndex: 1,
          maxWidth: 1200, margin: '0 auto',
          padding: '0 40px',
        }}
      >
        {/* ── Section header ── */}
        <div style={{ marginBottom: 56 }}>
          <div
            style={{
              fontSize: 10,
              fontFamily: 'var(--font-stamp)',
              fontWeight: 700,
              color: 'var(--gold)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            What We Do
          </div>
          <h2
            style={{
              fontSize: 'clamp(30px, 4vw, 50px)',
              fontFamily: 'var(--font-display)',
              fontWeight: 400,
              color: 'var(--text-primary)',
              lineHeight: 1.08,
              margin: '0 0 14px',
            }}
          >
            See the transformation.
            <br />
            <span
              style={{
                color: 'var(--text-muted)',
                fontStyle: 'italic',
                fontFamily: 'var(--font-editorial)',
              }}
            >
              Every institution had a&nbsp;before.
            </span>
          </h2>
          <p
            style={{
              fontSize: 14,
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-ui)',
              lineHeight: 1.65,
              maxWidth: 480,
              margin: 0,
            }}
          >
            Drag the divider left or right to reveal exactly what changed when
            Cubico stepped in.
          </p>
        </div>

        {/* ── Main two-column layout ── */}
        <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start' }}>

          {/* LEFT — vertical nav */}
          <div
            style={{
              width: 260,
              flexShrink: 0,
              position: 'sticky',
              top: 100,
            }}
          >
            {/* Nav list */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {SLIDES.map((slide, i) => {
                const isActive = slide.id === activeId;
                return (
                  <button
                    key={slide.id}
                    onClick={() => setActiveId(slide.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 14px',
                      border: 'none',
                      borderRadius: 8,
                      borderLeft: `3px solid ${isActive ? 'var(--blue)' : 'transparent'}`,
                      background: isActive ? 'var(--blue-lo)' : 'transparent',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.18s ease',
                      outline: 'none',
                    }}
                  >
                    {/* Number badge */}
                    <span
                      style={{
                        fontFamily: 'var(--font-stamp)',
                        fontSize: 10,
                        color: isActive ? 'var(--blue)' : 'var(--text-dim)',
                        letterSpacing: '0.08em',
                        flexShrink: 0,
                        width: 20,
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* Label + tag */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontFamily: 'var(--font-ui)',
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                          transition: 'color 0.18s',
                          lineHeight: 1.3,
                        }}
                      >
                        {slide.label}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          fontFamily: 'var(--font-ui)',
                          color: isActive ? 'var(--blue)' : 'var(--text-dim)',
                          marginTop: 1,
                          transition: 'color 0.18s',
                        }}
                      >
                        {slide.tag}
                      </div>
                    </div>

                    {/* Active arrow */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ color: 'var(--blue)', fontSize: 10, flexShrink: 0 }}
                      >
                        →
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Proof stat — updates per slide */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId + '-stat'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  marginTop: 32,
                  padding: '20px 16px',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--line)',
                  borderLeft: '3px solid var(--blue)',
                  borderRadius: 8,
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontFamily: 'var(--font-stamp)',
                    color: 'var(--text-dim)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    marginBottom: 6,
                  }}
                >
                  Result
                </div>
                <div
                  style={{
                    fontSize: 30,
                    fontFamily: 'var(--font-stamp)',
                    fontWeight: 700,
                    color: 'var(--blue)',
                    lineHeight: 1,
                    marginBottom: 4,
                  }}
                >
                  {activeSlide.proofStat}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontFamily: 'var(--font-ui)',
                    color: 'var(--text-muted)',
                    lineHeight: 1.5,
                  }}
                >
                  {activeSlide.proofLabel}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT — stage + outcome strip */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Stage */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <BeforeAfterStage slide={activeSlide} />
              </motion.div>
            </AnimatePresence>

            {/* Outcome strip — before → after titles */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId + '-strip'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto 1fr',
                  alignItems: 'stretch',
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--line)',
                  borderTop: 'none',
                  borderRadius: '0 0 10px 10px',
                  overflow: 'hidden',
                }}
              >
                {/* Before */}
                <div style={{ padding: '12px 18px' }}>
                  <div
                    style={{
                      fontSize: 8,
                      fontFamily: 'var(--font-stamp)',
                      letterSpacing: '0.14em',
                      color: '#ef4444',
                      marginBottom: 4,
                    }}
                  >
                    BEFORE
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontFamily: 'var(--font-ui)',
                      color: 'var(--text-muted)',
                      fontStyle: 'italic',
                      lineHeight: 1.4,
                    }}
                  >
                    {activeSlide.beforeTitle}
                  </div>
                </div>

                {/* Arrow divider */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 16px',
                    borderLeft: '1px solid var(--line)',
                    borderRight: '1px solid var(--line)',
                    color: 'var(--blue)',
                    fontSize: 14,
                  }}
                >
                  →
                </div>

                {/* After */}
                <div style={{ padding: '12px 18px' }}>
                  <div
                    style={{
                      fontSize: 8,
                      fontFamily: 'var(--font-stamp)',
                      letterSpacing: '0.14em',
                      color: '#4ade80',
                      marginBottom: 4,
                    }}
                  >
                    WITH CUBICO
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontFamily: 'var(--font-ui)',
                      color: 'var(--text-primary)',
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                  >
                    {activeSlide.afterTitle}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Hint text */}
            <div
              style={{
                marginTop: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  border: '1.5px solid var(--text-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M2 4H6M2 4L3.5 2.5M2 4L3.5 5.5M6 4L4.5 2.5M6 4L4.5 5.5" stroke="var(--text-dim)" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
              <span
                style={{
                  fontSize: 11,
                  fontFamily: 'var(--font-ui)',
                  color: 'var(--text-dim)',
                  fontStyle: 'italic',
                }}
              >
                Drag the divider to reveal the transformation
              </span>
            </div>
          </div>
        </div>

        {/* ── Differentiator bar ── */}
        <DifferentiatorBar />
      </div>
    </section>
  );
}
