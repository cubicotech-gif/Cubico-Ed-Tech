'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Grain } from '@/components/ui/Grain';
import { SectionLine } from '@/components/ui/SectionLine';

// ── Service data ──────────────────────────────────────────────────────────────
const SERVICES = [
  {
    num: '01',
    name: 'LMS Development',
    outcome: 'Your Moodle goes live, branded and staffed-trained, in 30 days.',
    tags: ['Moodle', 'SCORM', 'xAPI'],
    color: '#E8622A',
    image: 'lms',
  },
  {
    num: '02',
    name: 'Educational Animation',
    outcome: '2-minute explainer that turns a 40-page PDF into student attention.',
    tags: ['2D', '3D', 'Motion Graphics'],
    color: '#C9A96E',
    image: 'animation',
  },
  {
    num: '03',
    name: 'School Management Portals',
    outcome: 'One login. Every teacher, parent, and admin on the same page.',
    tags: ['React', 'Multi-role', 'Payments'],
    color: '#F0EBE3',
    image: 'portal',
  },
  {
    num: '04',
    name: 'Multilingual Content',
    outcome: 'English, Arabic, and Urdu — culturally accurate, not just translated.',
    tags: ['Arabic RTL', 'Urdu', 'English'],
    color: '#E8622A',
    image: 'multilingual',
  },
  {
    num: '05',
    name: 'Interactive Courseware',
    outcome: 'H5P and custom interactions that make passive watching impossible.',
    tags: ['H5P', 'Interactive Video', 'Gamification'],
    color: '#C9A96E',
    image: 'courseware',
  },
  {
    num: '06',
    name: 'Digital Strategy',
    outcome: 'A 90-day plan that tells you exactly what to build, and why.',
    tags: ['Audit', 'Roadmap', 'ROI Analysis'],
    color: '#F0EBE3',
    image: 'strategy',
  },
];

// ── Floating image placeholder (colour swatch per service) ────────────────────
const IMAGE_COLORS: Record<string, string> = {
  lms:         '#1a1a2e',
  animation:   '#1a2e1a',
  portal:      '#2e1a1a',
  multilingual:'#1a2a2e',
  courseware:  '#2e2a1a',
  strategy:    '#1e1a2e',
};

const IMAGE_LABELS: Record<string, string> = {
  lms:         'MOODLE LMS',
  animation:   '2D / 3D',
  portal:      'SCHOOL PORTAL',
  multilingual:'3 LANGUAGES',
  courseware:  'INTERACTIVE',
  strategy:    'STRATEGY',
};

// ── Differentiator bar ─────────────────────────────────────────────────────────
const DIFFS = [
  { label: '30-Day Delivery',    sub: 'fixed contract, no scope creep' },
  { label: 'Fixed Price',        sub: 'quoted upfront, invoiced same' },
  { label: '3 Languages',        sub: 'Arabic, Urdu, English — built-in' },
  { label: 'In-house Team',      sub: 'no offshore handoffs' },
];

export default function WhatWeDo() {
  const [activeRow, setActiveRow]         = useState<number | null>(null);
  const [isDesktop, setIsDesktop]         = useState(false);

  // Floating image position — document-level mouse tracking
  const rawX = useMotionValue(-400);
  const rawY = useMotionValue(-400);
  const imgX = useSpring(rawX, { stiffness: 150, damping: 20 });
  const imgY = useSpring(rawY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1100px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    document.addEventListener('mousemove', onMove, { passive: true });
    return () => document.removeEventListener('mousemove', onMove);
  }, [isDesktop, rawX, rawY]);

  const activeService = activeRow !== null ? SERVICES[activeRow] : null;

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#050505',
        paddingBottom: 80,
        overflow: 'hidden',
      }}
    >
      <SectionLine />
      <Grain />

      {/* ── Header ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '96px 5% 64px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: 40,
            flexWrap: 'wrap',
          }}
        >
          {/* Section number */}
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 11,
              color: '#E8622A',
              letterSpacing: '0.4em',
              paddingTop: 8,
              flexShrink: 0,
            }}
          >
            02
          </span>

          {/* Three-line headline */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginBottom: 32,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  color: '#444',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                What we do
              </span>
            </div>

            <h2
              style={{
                margin: 0,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
              }}
            >
              <motion.span
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(40px, 5.5vw, 80px)',
                  color: '#F0EBE3',
                }}
              >
                Six things
              </motion.span>
              <motion.span
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  fontSize: 'clamp(40px, 5.5vw, 80px)',
                  color: '#C9A96E',
                }}
              >
                we&apos;re obsessive about.
              </motion.span>
            </h2>
          </div>
        </div>
      </div>

      {/* ── Desktop: magnetic hover list ── */}
      {isDesktop && (
        <>
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              padding: '0 5%',
            }}
          >
            {SERVICES.map((svc, i) => (
              <ServiceRow
                key={svc.num}
                svc={svc}
                index={i}
                isActive={activeRow === i}
                anyActive={activeRow !== null}
                onEnter={() => setActiveRow(i)}
                onLeave={() => setActiveRow(null)}
              />
            ))}
          </div>

          {/* Floating image — fixed position, follows cursor */}
          <AnimatePresence>
            {activeService && (
              <motion.div
                key={activeService.image}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  x: imgX,
                  y: imgY,
                  translateX: '-50%',
                  translateY: '-110%',
                  width: 200,
                  height: 140,
                  borderRadius: 4,
                  overflow: 'hidden',
                  pointerEvents: 'none',
                  zIndex: 50,
                  border: `1px solid ${activeService.color}33`,
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: IMAGE_COLORS[activeService.image],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-accent)',
                      fontSize: 14,
                      letterSpacing: '0.25em',
                      color: activeService.color,
                      opacity: 0.7,
                    }}
                  >
                    {IMAGE_LABELS[activeService.image]}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* ── Mobile: card grid ── */}
      {!isDesktop && (
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 5%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}
        >
          {SERVICES.map((svc) => (
            <MobileCard key={svc.num} svc={svc} />
          ))}
        </div>
      )}

      {/* ── Differentiator bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          maxWidth: 1200,
          margin: '80px auto 0',
          padding: '0 5%',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 1,
            backgroundColor: '#1a1a1a',
            border: '1px solid #1a1a1a',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {DIFFS.map((d) => (
            <div
              key={d.label}
              style={{
                backgroundColor: '#0a0a0a',
                padding: '24px 28px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#F0EBE3',
                  marginBottom: 6,
                }}
              >
                {d.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: '#444',
                  lineHeight: 1.5,
                }}
              >
                {d.sub}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── View all services link ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          textAlign: 'center',
          marginTop: 48,
        }}
      >
        <Link
          href="/services"
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 500,
            fontSize: 13,
            color: '#555',
            textDecoration: 'none',
            letterSpacing: '0.1em',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#E8622A')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#555')}
        >
          Full services breakdown →
        </Link>
      </motion.div>
    </section>
  );
}

// ── Desktop service row ────────────────────────────────────────────────────────
function ServiceRow({
  svc,
  index,
  isActive,
  anyActive,
  onEnter,
  onLeave,
}: {
  svc: (typeof SERVICES)[0];
  index: number;
  isActive: boolean;
  anyActive: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <motion.div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      animate={{
        opacity: anyActive && !isActive ? 0.3 : 1,
      }}
      transition={{ duration: 0.2 }}
      style={{
        borderBottom: '1px solid #161616',
        padding: '28px 0',
        display: 'grid',
        gridTemplateColumns: '56px 1fr auto auto',
        alignItems: 'center',
        gap: 32,
        cursor: 'default',
      }}
    >
      {/* Ghost number */}
      <span
        style={{
          fontFamily: 'var(--font-accent)',
          fontSize: 12,
          color: isActive ? svc.color : '#2a2a2a',
          letterSpacing: '0.1em',
          transition: 'color 0.2s ease',
        }}
      >
        {svc.num}
      </span>

      {/* Service name + outcome */}
      <div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(22px, 2.5vw, 36px)',
            color: '#F0EBE3',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 6,
          }}
        >
          {svc.name}
        </div>
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 13,
                color: '#6a6460',
                lineHeight: 1.6,
                overflow: 'hidden',
              }}
            >
              {svc.outcome}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tags */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
        }}
      >
        {svc.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 10,
              color: '#444',
              letterSpacing: '0.12em',
              padding: '3px 8px',
              border: '1px solid #222',
              borderRadius: 2,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <motion.span
        animate={{ x: isActive ? 6 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          color: isActive ? svc.color : '#2a2a2a',
          transition: 'color 0.2s ease',
          flexShrink: 0,
        }}
      >
        →
      </motion.span>
    </motion.div>
  );
}

// ── Mobile service card ────────────────────────────────────────────────────────
function MobileCard({ svc }: { svc: (typeof SERVICES)[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        backgroundColor: '#0e0e0e',
        border: '1px solid #1a1a1a',
        borderRadius: 4,
        padding: '28px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent top line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: svc.color,
          opacity: 0.4,
        }}
      />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 11,
            color: svc.color,
            letterSpacing: '0.2em',
          }}
        >
          {svc.num}
        </span>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {svc.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 9,
                color: '#444',
                letterSpacing: '0.1em',
                padding: '2px 7px',
                border: '1px solid #222',
                borderRadius: 2,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 22,
          color: '#F0EBE3',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          marginBottom: 10,
        }}
      >
        {svc.name}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: '#5a5a5a',
          lineHeight: 1.6,
        }}
      >
        {svc.outcome}
      </div>
    </motion.div>
  );
}
