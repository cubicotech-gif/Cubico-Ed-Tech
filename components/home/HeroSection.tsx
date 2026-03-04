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
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
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
      {/* Cinematic background gradient */}
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
          opacity: 0.04,
          backgroundImage: GRAIN_SVG,
          backgroundSize: '200px 200px',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Warm orange radial glow — shifted slightly lower for warmth */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 55% at 25% 65%, rgba(232,98,42,0.14) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Secondary soft glow — top right for depth */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 50% 40% at 80% 20%, rgba(201,169,110,0.05) 0%, transparent 70%)',
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
          padding: '160px 5% 140px',
          width: '100%',
        }}
      >
        {/* Agency label */}
        <motion.div
          variants={fadeIn(0.2)}
          initial="hidden"
          animate="visible"
          style={{ marginBottom: 36 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Accent line */}
            <div style={{ width: 24, height: 1, backgroundColor: '#E8622A', flexShrink: 0 }} />
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 500,
                fontSize: 11,
                color: '#E8622A',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
              }}
            >
              EdTech Agency · Est. 2019 · Karachi
            </span>
          </div>
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
                  fontWeight: italic ? 700 : 600,
                  fontStyle: italic ? 'italic' : 'normal',
                  fontSize: 'clamp(56px, 8vw, 118px)',
                  lineHeight: 1.03,
                  color: italic ? '#E8622A' : '#F0EBE3',
                  margin: 0,
                  letterSpacing: '-0.025em',
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
            color: '#9A9490',
            maxWidth: 460,
            marginTop: 36,
            lineHeight: 1.75,
            letterSpacing: '0.01em',
          }}
        >
          From Moodle LMS to 3D animations — complete digital solutions for
          institutions in English, Urdu &amp; Arabic.
        </motion.p>

        {/* CTA row */}
        <motion.div
          variants={fadeUp(1.2)}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            gap: 24,
            marginTop: 52,
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
              fontSize: 14,
              color: '#F0EBE3',
              textDecoration: 'none',
              backgroundColor: '#E8622A',
              padding: '17px 38px',
              borderRadius: 0,
              display: 'inline-block',
              letterSpacing: '0.02em',
              transition: 'background-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease',
              boxShadow: '0 4px 24px rgba(232,98,42,0.25)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = '#C4531F';
              el.style.boxShadow = '0 8px 36px rgba(232,98,42,0.38)';
              el.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = '#E8622A';
              el.style.boxShadow = '0 4px 24px rgba(232,98,42,0.25)';
              el.style.transform = 'translateY(0)';
            }}
          >
            Explore Our Work
          </Link>
          <Link
            href="/contact"
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 500,
              fontSize: 14,
              color: '#9A9490',
              textDecoration: 'none',
              padding: '17px 0',
              letterSpacing: '0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'color 0.22s ease',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#E8622A')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#9A9490')}
          >
            Book a Free Demo
            <span style={{ fontSize: 16 }}>→</span>
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp(1.4)}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            gap: '56px',
            marginTop: 80,
            flexWrap: 'wrap',
            borderTop: '1px solid #2A2520',
            paddingTop: 44,
          }}
        >
          {[
            { num: '50+', label: 'Projects Delivered' },
            { num: '3',   label: 'Languages' },
            { num: '10+', label: 'Institutions' },
            { num: '5+',  label: 'Years' },
          ].map(({ num, label }) => (
            <div key={label}>
              <div
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: 52,
                  color: '#F0EBE3',
                  lineHeight: 1,
                  letterSpacing: '0.01em',
                }}
              >
                {num}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 400,
                  fontSize: 11,
                  color: '#6A6460',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  marginTop: 6,
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade — smooth connection to MarqueeStrip */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          background: 'linear-gradient(to top, rgba(8,8,8,0.6) 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: 44,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          color: '#E8622A',
          fontSize: 20,
          pointerEvents: 'none',
          opacity: 0.7,
        }}
      >
        ↓
      </motion.div>
    </section>
  );
}
