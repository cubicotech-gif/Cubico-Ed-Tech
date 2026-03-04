'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useSchoolName } from './useSchoolName';
import { SchoolNameInput } from './SchoolNameInput';
import { TransformationStage } from './TransformationStage';
import { CompletionState } from './CompletionState';

// Stats strip data
const STATS = [
  {
    number: '50+',
    label: 'PROJECTS DELIVERED',
    sub: 'Every one custom-built from scratch',
  },
  {
    number: '3',
    label: 'LANGUAGES',
    sub: 'English · اردو · العربية — RTL native',
  },
  {
    number: '30',
    label: 'DAY DELIVERY',
    sub: 'From brief to live deployment, with training',
  },
  {
    number: '∞',
    label: 'YOUR NAME',
    sub: 'Every demo above is already customised for you',
  },
];

export default function ExperienceLab() {
  const {
    schoolName,
    displayName,
    schoolSlug,
    hasStartedTyping,
    isComplete,
    handleChange,
    reset,
    inputRef,
  } = useSchoolName();

  const prefersReducedMotion = useReducedMotion();

  // Escape key handler — resets when completion state is showing
  useEffect(() => {
    if (!isComplete) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') reset();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isComplete, reset]);

  return (
    <section
      style={{
        background: '#050505',
        padding: '130px 0 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #1d1d1d',
      }}
    >
      {/* Grain overlay */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.022,
          pointerEvents: 'none',
          zIndex: 0,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="exp-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#exp-grain)" />
      </svg>

      {/* Ambient glows */}
      <div aria-hidden="true" style={{ position: 'absolute', top: -150, right: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(232,98,42,0.06) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: -100, left: -80, width: 400, height: 400, background: 'radial-gradient(circle, rgba(201,169,110,0.03) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Section entry line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: '#E8622A', transformOrigin: 'left', zIndex: 1 }}
      />

      {/* Max-width container */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1440, margin: '0 auto', padding: '0 6%' }}>

        {/* ── Section Header ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'end',
            gap: 60,
            marginBottom: 64,
          }}
        >
          {/* Left: eyebrow + headline */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}
            >
              <div style={{ width: 28, height: 1, background: '#E8622A', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 11, color: '#C9A96E', letterSpacing: '0.4em' }}>
                04 — EXPERIENCE OUR WORK
              </span>
            </motion.div>

            {/* 3-line clip-reveal headline */}
            <h2 style={{ margin: 0, fontSize: 'clamp(44px, 5.5vw, 80px)', lineHeight: 0.92 }}>
              {[
                { text: 'Type your', weight: 300, style: 'italic' as const, color: '#6A6460', delay: 0 },
                { text: "school\u2019s name.", weight: 900, style: 'normal' as const, color: '#F0EBE3', delay: 0.12, letterSpacing: '-0.03em' },
                { text: 'Watch it become real.', weight: 300, style: 'italic' as const, color: '#E8622A', delay: 0.24 },
              ].map((line, i) => (
                <div key={i} style={{ overflow: 'hidden', display: 'block' }}>
                  <motion.span
                    initial={prefersReducedMotion ? {} : { y: '110%' }}
                    whileInView={prefersReducedMotion ? {} : { y: '0%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: line.delay }}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: line.weight,
                      fontStyle: line.style,
                      color: line.color,
                      letterSpacing: (line as { letterSpacing?: string }).letterSpacing,
                    }}
                  >
                    {line.text}
                  </motion.span>
                </div>
              ))}
            </h2>
          </div>

          {/* Right: description + live badge */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ maxWidth: 340, textAlign: 'right' }}
          >
            <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 14, color: '#6A6460', lineHeight: 1.8, margin: '0 0 16px 0' }}>
              No demo. No slides. Just your institution&apos;s name — and the complete digital infrastructure it deserves, assembled in real time.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
              <div
                className="symptom-pulse"
                style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.5)' }}
              />
              <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.25em', color: '#10B981' }}>
                LIVE PERSONALISATION
              </span>
            </div>
          </motion.div>
        </div>

        {/* ── School Name Input ── */}
        <SchoolNameInput
          schoolName={schoolName}
          hasStartedTyping={hasStartedTyping}
          isComplete={isComplete}
          inputRef={inputRef}
          onChange={handleChange}
        />

        {/* ── Transformation Stage ── */}
        <TransformationStage
          displayName={displayName}
          schoolSlug={schoolSlug}
          hasStartedTyping={hasStartedTyping}
          isComplete={isComplete}
        />

        {/* ── Completion State ── */}
        <CompletionState schoolName={schoolName} isComplete={isComplete} onReset={reset} />

      </div>

      {/* ── Stats Strip ── */}
      <div
        style={{
          marginTop: 80,
          borderTop: '1px solid #1d1d1d',
          background: '#050505',
          padding: '40px 0',
        }}
      >
        <div
          style={{
            maxWidth: 1440,
            margin: '0 auto',
            padding: '0 6%',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: '#1d1d1d',
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              style={{ background: '#050505', padding: '28px 32px' }}
            >
              <div style={{ fontFamily: 'var(--font-stamp)', fontSize: 48, color: '#E8622A', lineHeight: 1 }}>
                {stat.number}
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.15em', color: '#6A6460', marginTop: 6, textTransform: 'uppercase' }}>
                {stat.label}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 11, color: '#2A2A2A', lineHeight: 1.6, marginTop: 6 }}>
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
