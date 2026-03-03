'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Data ──────────────────────────────────────────────────────────────────────
const ROWS = [
  {
    num: '01',
    title: 'Conventional Schools & Academies',
    pain: 'You have a great school. Parents just can\u2019t see it online.',
    deliverables: [
      'Website with admissions system',
      'Moodle LMS for blended learning',
      'Digital marketing for intake season',
    ],
  },
  {
    num: '02',
    title: 'Islamic Schools & Madrassas',
    pain: 'You need a digital presence that respects your values, not one that ignores them.',
    deliverables: [
      'Full Arabic RTL website',
      'Islamic curriculum content reviewed by scholars',
      'Zakat and donation portal',
      'Urdu and Arabic Moodle LMS',
    ],
  },
  {
    num: '03',
    title: 'Universities & Colleges',
    pain: 'Your institution has the reputation. The digital experience hasn\u2019t caught up.',
    deliverables: [
      'Programme catalogues and faculty directories',
      'Student application portals',
      'LMS for 1,000+ concurrent users',
      'Analytics dashboards for administration',
    ],
  },
  {
    num: '04',
    title: 'Coaching Centers & EdTech Startups',
    pain: 'You move fast. You need tech that keeps up \u2014 and doesn\u2019t break when your students double.',
    deliverables: [
      'Custom LMS from scratch',
      'SCORM course authoring',
      'Subscription and payment gateway integration',
      'Mobile app with push notifications',
    ],
  },
];

// ── Grain ─────────────────────────────────────────────────────────────────────
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── Component ─────────────────────────────────────────────────────────────────
export default function WhoWeServe() {
  const [open, setOpen] = useState<number>(1); // Row 1 (Islamic) open by default

  return (
    <section
      style={{
        backgroundColor: '#080808',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Section entry line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: '#E8622A',
          transformOrigin: 'left',
          zIndex: 10,
        }}
      />

      {/* Grain texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: GRAIN,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.025,
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Section label */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '80px 5% 0',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 11,
            color: '#E8622A',
            letterSpacing: '0.4em',
          }}
        >
          07
        </span>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 11,
            color: '#555',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          WHO WE SERVE
        </span>
      </div>

      {/* Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(28px, 4vw, 52px)',
          color: '#F0EBE3',
          letterSpacing: '-0.02em',
          margin: '24px 5% 56px',
          maxWidth: 700,
          lineHeight: 1.1,
        }}
      >
        Your Institution, By Name.
      </motion.h2>

      {/* ── Accordion rows ── */}
      <div style={{ borderTop: '1px solid #1d1d1d' }}>
        {ROWS.map((row, i) => {
          const isOpen = open === i;
          return (
            <div
              key={row.num}
              style={{ borderBottom: '1px solid #1d1d1d' }}
            >
              {/* Collapsed row header */}
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 5%',
                  height: isOpen ? 'auto' : 100,
                  minHeight: 100,
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'none',
                  textAlign: 'left',
                  paddingTop: isOpen ? 32 : 0,
                  paddingBottom: isOpen ? 0 : 0,
                  transition: 'background-color 0.2s ease',
                }}
                aria-expanded={isOpen}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 32,
                    flex: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-accent)',
                      fontSize: 14,
                      color: '#333',
                      letterSpacing: '0.1em',
                      flexShrink: 0,
                    }}
                  >
                    {row.num}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 'clamp(20px, 3vw, 32px)',
                      color: isOpen ? '#F0EBE3' : '#888',
                      margin: 0,
                      lineHeight: 1.2,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {row.title}
                  </h3>
                </div>

                {/* Arrow */}
                <motion.span
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 20,
                    color: isOpen ? '#E8622A' : '#444',
                    flexShrink: 0,
                    display: 'inline-block',
                    marginLeft: 24,
                  }}
                >
                  →
                </motion.span>
              </button>

              {/* Expanded content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="expanded"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: 'auto',
                      opacity: 1,
                      transition: {
                        height: {
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                        },
                        opacity: { duration: 0.2, delay: 0.1 },
                      },
                    }}
                    exit={{
                      height: 0,
                      opacity: 0,
                      transition: {
                        height: { duration: 0.25, ease: 'easeIn' },
                        opacity: { duration: 0.15 },
                      },
                    }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div
                      style={{
                        padding: '32px 5% 48px',
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 48,
                        alignItems: 'start',
                      }}
                      className="grid-cols-1 md:grid-cols-2"
                    >
                      {/* Left: pain point */}
                      <div>
                        <p
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontStyle: 'italic',
                            fontWeight: 600,
                            fontSize: 'clamp(18px, 2vw, 24px)',
                            color: '#C9A96E',
                            margin: '0 0 8px',
                            lineHeight: 1.5,
                          }}
                        >
                          &ldquo;{row.pain}&rdquo;
                        </p>
                      </div>

                      {/* Right: deliverables */}
                      <div>
                        <p
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: 11,
                            color: '#555',
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            margin: '0 0 20px',
                          }}
                        >
                          What we deliver
                        </p>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 12,
                          }}
                        >
                          {row.deliverables.map((d, di) => (
                            <motion.div
                              key={d}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.4,
                                delay: di * 0.08 + 0.1,
                                ease: 'easeOut',
                              }}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 12,
                              }}
                            >
                              <span
                                style={{
                                  color: '#E8622A',
                                  fontSize: 12,
                                  flexShrink: 0,
                                  marginTop: 2,
                                }}
                              >
                                ◆
                              </span>
                              <span
                                style={{
                                  fontFamily: 'var(--font-ui)',
                                  fontWeight: 500,
                                  fontSize: 14,
                                  color: '#F0EBE3',
                                  lineHeight: 1.5,
                                }}
                              >
                                {d}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          borderTop: '1px solid #1d1d1d',
          backgroundColor: '#060606',
          padding: '40px 5%',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 20,
            color: '#444',
            margin: 0,
          }}
        >
          If your institution teaches people, we build for you.
        </p>
      </div>
    </section>
  );
}
