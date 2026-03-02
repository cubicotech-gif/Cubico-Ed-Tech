'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

// ── Grain data-URI ────────────────────────────────────────────────────────────
const GRAIN_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── Animation variants ────────────────────────────────────────────────────────
const lineContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
};

const lineUp = {
  hidden: { y: 64, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: 'easeOut', delay } },
});

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut', delay } },
});

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#080808',
        overflow: 'hidden',
      }}
    >
      {/* Cinematic background gradient — TODO: replace with real photography */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg, #1A1210 0%, #080808 50%, #12100E 100%)',
        }}
      />

      {/* Film grain texture overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.045,
          backgroundImage: GRAIN_SVG,
          backgroundSize: '200px 200px',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Warm orange radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 60% 50% at 30% 60%, rgba(232,98,42,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 1100,
          margin: '0 auto',
          padding: '160px 5% 120px',
          width: '100%',
        }}
      >
        {/* Agency label */}
        <motion.div
          variants={fadeIn(0.2)}
          initial="hidden"
          animate="visible"
          style={{ marginBottom: 28 }}
        >
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 13,
              color: '#E8622A',
              letterSpacing: '0.25em',
            }}
          >
            EDTECH AGENCY · EST. 2019 · KARACHI
          </span>
        </motion.div>

        {/* Headline — staggered line reveal */}
        <motion.div
          variants={lineContainer}
          initial="hidden"
          animate="visible"
          style={{ overflow: 'hidden' }}
        >
          {[
            { text: 'We Build',    italic: false },
            { text: 'Education',   italic: false },
            { text: 'Technology',  italic: true  },
          ].map(({ text, italic }) => (
            <div key={text} style={{ overflow: 'hidden' }}>
              <motion.h1
                variants={lineUp}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontStyle: italic ? 'italic' : 'normal',
                  fontSize: 'clamp(56px, 8vw, 120px)',
                  lineHeight: 1.05,
                  color: italic ? '#E8622A' : '#F0EBE3',
                  margin: 0,
                  letterSpacing: '-0.02em',
                }}
              >
                {text}
              </motion.h1>
            </div>
          ))}
        </motion.div>

        {/* Subtext */}
        <motion.p
          variants={fadeUp(1.0)}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            color: '#7A7268',
            maxWidth: 480,
            marginTop: 32,
            lineHeight: 1.7,
          }}
        >
          From Moodle LMS to 3D animations — complete digital solutions for
          institutions worldwide.
        </motion.p>

        {/* CTA row */}
        <motion.div
          variants={fadeUp(1.2)}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            gap: 20,
            marginTop: 48,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <Link
            href="/portfolio"
            data-cursor="cta"
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: 15,
              color: '#F0EBE3',
              textDecoration: 'none',
              backgroundColor: '#E8622A',
              padding: '16px 36px',
              borderRadius: 0,
              display: 'inline-block',
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = '#C4531F')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = '#E8622A')}
          >
            Explore Our Work
          </Link>
          <button
            onClick={() =>
              document.getElementById('experience-lab')?.scrollIntoView({ behavior: 'smooth' })
            }
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 500,
              fontSize: 15,
              color: '#F0EBE3',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '16px 0',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#E8622A')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#F0EBE3')}
          >
            Watch Demo ▶
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp(1.4)}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            gap: '48px',
            marginTop: 80,
            flexWrap: 'wrap',
            borderTop: '1px solid #2A2520',
            paddingTop: 40,
          }}
        >
          {[
            { num: '50+', label: 'Projects' },
            { num: '3',   label: 'Languages' },
            { num: '10+', label: 'Institutions' },
            { num: '5+',  label: 'Years' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: 56,
                  color: '#F0EBE3',
                  lineHeight: 1,
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 11,
                  color: '#7A7268',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  marginTop: 4,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          color: '#E8622A',
          fontSize: 22,
          pointerEvents: 'none',
        }}
      >
        ↓
      </motion.div>
    </section>
  );
}
