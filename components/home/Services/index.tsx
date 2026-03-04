'use client';

import { useState, useCallback } from 'react';
import { motion, LayoutGroup, useReducedMotion } from 'framer-motion';
import { PrescriptionCard } from './PrescriptionCard';
import { SERVICES } from './data/services';

export default function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showRxTooltip, setShowRxTooltip] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleToggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      style={{
        background: 'var(--bg-base)',
        padding: '130px 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--line)',
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
        <filter id="services-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#services-grain)" />
      </svg>

      {/* Ambient fire glow — top right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -200,
          right: -100,
          width: 500,
          height: 500,
          background:
            'radial-gradient(circle, rgba(26,107,255,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Ambient bronze glow — bottom left */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: -150,
          left: -80,
          width: 400,
          height: 400,
          background:
            'radial-gradient(circle, rgba(201,169,110,0.03) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Section entry line — scaleX 0→1 */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'var(--blue)',
          transformOrigin: 'left',
          zIndex: 1,
        }}
      />

      {/* Max-width container */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1440,
          margin: '0 auto',
          padding: '0 6%',
        }}
      >
        {/* ── Section Header ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'end',
            gap: 60,
            marginBottom: 72,
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
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div style={{ width: 28, height: 1, background: 'var(--blue)', flexShrink: 0 }} />
              <span
                style={{
                  fontFamily: 'var(--font-stamp)',
                  fontSize: 11,
                  color: 'var(--gold)',
                  letterSpacing: '0.4em',
                }}
              >
                03 — OUR SERVICES
              </span>
            </motion.div>

            {/* Three-line headline with clip-reveal */}
            <h2
              style={{
                margin: 0,
                fontSize: 'clamp(42px, 5.5vw, 80px)',
                lineHeight: 0.9,
              }}
            >
              {[
                {
                  text: 'We know what\u2019s',
                  weight: 400,
                  style: 'italic' as const,
                  fontFamily: 'var(--font-editorial)',
                  color: 'var(--text-muted)',
                  delay: 0,
                },
                {
                  text: 'broken.',
                  weight: 400,
                  style: 'normal' as const,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--blue)',
                  delay: 0.12,
                  letterSpacing: '-0.04em',
                },
                {
                  text: 'Here\u2019s the fix.',
                  weight: 400,
                  style: 'italic' as const,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text-primary)',
                  delay: 0.24,
                },
              ].map((line, i) => (
                <div key={i} style={{ overflow: 'hidden', display: 'block' }}>
                  <motion.span
                    initial={prefersReducedMotion ? {} : { y: '110%' }}
                    whileInView={prefersReducedMotion ? {} : { y: '0%' }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                      delay: line.delay,
                    }}
                    style={{
                      display: 'block',
                      fontFamily: line.fontFamily,
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

          {/* Right: description + Rx symbol */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ maxWidth: 340, textAlign: 'right' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 400,
                fontSize: 14,
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                margin: '0 0 16px 0',
              }}
            >
              Each card below starts with the exact problem you&apos;re facing.
              Click &ldquo;Read Full Brief&rdquo; when you want the complete solution.
            </p>

            {/* Rx symbol with tooltip */}
            <div
              style={{ position: 'relative', display: 'inline-block' }}
              onMouseEnter={() => setShowRxTooltip(true)}
              onMouseLeave={() => setShowRxTooltip(false)}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  fontSize: 32,
                  color: 'var(--blue-mid)',
                  letterSpacing: '-0.04em',
                  cursor: 'default',
                  userSelect: 'none',
                  lineHeight: 1,
                  display: 'block',
                }}
              >
                Rx
              </span>
              {showRxTooltip && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 'calc(100% + 8px)',
                    right: 0,
                    background: 'var(--bg-subtle)',
                    border: '1px solid var(--line)',
                    borderRadius: 2,
                    padding: '4px 10px',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    zIndex: 10,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 400,
                      fontSize: 11,
                      color: 'var(--text-muted)',
                    }}
                  >
                    Rx — Latin for &ldquo;take this remedy&rdquo;
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── Card Grid ── */}
        <LayoutGroup>
          <div
            className="services-grid"
            style={{
              display: 'grid',
              gap: 1,
              background: 'var(--line)',
              border: '1px solid var(--line)',
            }}
          >
            {SERVICES.map((service, i) => (
              <PrescriptionCard
                key={service.id}
                service={service}
                isExpanded={expandedId === service.id}
                onToggle={handleToggle}
                index={i}
              />
            ))}
          </div>
        </LayoutGroup>
      </div>
    </section>
  );
}
