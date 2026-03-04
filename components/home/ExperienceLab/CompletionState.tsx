'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface CompletionStateProps {
  schoolName: string;
  isComplete: boolean;
  onReset: () => void;
}

const DELIVERY_CHIPS = [
  { label: 'LMS IN 14 DAYS', delay: 0.7 },
  { label: 'ERP IN 45 DAYS', delay: 0.75 },
  { label: 'WEBSITE IN 30 DAYS', delay: 0.8 },
  { label: 'ANIMATIONS IN 21 DAYS', delay: 0.85 },
];

export function CompletionState({ schoolName, isComplete, onReset }: CompletionStateProps) {
  const prefersReducedMotion = useReducedMotion();
  const displayName = schoolName.trim() || 'Your School';

  return (
    <AnimatePresence mode="sync">
      {isComplete && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ overflow: 'hidden', marginTop: 2 }}
        >
          <div
            style={{
              background: '#090909',
              border: '1px solid rgba(232,98,42,0.25)',
              borderTop: '2px solid #E8622A',
              padding: '40px 48px',
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              alignItems: 'center',
              gap: 60,
            }}
          >
            {/* ── Left column ── */}
            <div>
              {/* Eyebrow */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 6px rgba(232,98,42,0.4)',
                      '0 0 14px rgba(232,98,42,0.8)',
                      '0 0 6px rgba(232,98,42,0.4)',
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#E8622A',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-stamp)',
                    fontSize: 11,
                    letterSpacing: '0.35em',
                    color: '#E8622A',
                  }}
                >
                  TRANSFORMATION COMPLETE
                </span>
              </motion.div>

              {/* Headline — 2-line clip-reveal */}
              <h3 style={{ margin: '0 0 16px 0', fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '-0.03em', lineHeight: 0.9 }}>
                <div style={{ overflow: 'hidden' }}>
                  <motion.span
                    initial={prefersReducedMotion ? {} : { y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      color: '#F0EBE3',
                    }}
                  >
                    {displayName}&apos;s
                  </motion.span>
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <motion.span
                    initial={prefersReducedMotion ? {} : { y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      color: '#C9A96E',
                    }}
                  >
                    digital future is ready.
                  </motion.span>
                </div>
              </h3>

              {/* Sub-copy */}
              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65, duration: 0.5 }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: 14,
                  color: '#6A6460',
                  lineHeight: 1.8,
                  maxWidth: 480,
                  margin: '0 0 20px 0',
                }}
              >
                We&apos;ve shown you the LMS, the ERP, the website, and the animation studio.
                Every system above is real, deployable, and yours — in 30 days.
              </motion.p>

              {/* Delivery chips */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {DELIVERY_CHIPS.map((chip) => (
                  <motion.div
                    key={chip.label}
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: chip.delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: 'rgba(232,98,42,0.08)',
                      border: '1px solid rgba(232,98,42,0.2)',
                      padding: '6px 14px',
                      borderRadius: 2,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-stamp)',
                        fontSize: 10,
                        letterSpacing: '0.2em',
                        color: '#E8622A',
                      }}
                    >
                      {chip.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Right column — CTAs ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
              {/* Primary CTA */}
              <motion.a
                href="#contact"
                initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                whileHover={{ backgroundColor: '#cf5020' }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: '#E8622A',
                  color: '#fff',
                  padding: '16px 36px',
                  borderRadius: 2,
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 800,
                  fontSize: 14,
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
              >
                Start {displayName}&apos;s Project
                <motion.span
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'inline-block' }}
                >
                  →
                </motion.span>
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href="#contact"
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 600,
                  fontSize: 12,
                  color: '#6A6460',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(201,169,110,0.3)',
                  paddingBottom: 1,
                  cursor: 'pointer',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseOver={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#C9A96E';
                  (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = '#C9A96E';
                }}
                onMouseOut={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#6A6460';
                  (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(201,169,110,0.3)';
                }}
              >
                Talk to us first
              </motion.a>

              {/* Reset link */}
              <motion.span
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                onClick={onReset}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 400,
                  fontSize: 10,
                  color: '#2A2A2A',
                  cursor: 'pointer',
                  marginTop: 8,
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => { (e.currentTarget as HTMLSpanElement).style.color = '#6A6460'; }}
                onMouseOut={(e) => { (e.currentTarget as HTMLSpanElement).style.color = '#2A2A2A'; }}
              >
                Or press Escape to try another name →
              </motion.span>

              {/* Urgency badge */}
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(239,68,68,0.07)',
                  border: '1px solid rgba(239,68,68,0.15)',
                  padding: '8px 16px',
                  borderRadius: 2,
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: '#EF4444',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    fontSize: 11,
                    color: 'rgba(239,68,68,0.8)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  2 project slots remaining · March 2026
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
