'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

// ── Shared animation config ────────────────────────────────────────────────────
const OUT = [0.16, 1, 0.3, 1] as const;

const fadeSlideX = (delay: number) => ({
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: OUT, delay },
});

const fadeSlideY = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: OUT, delay },
});

const clipReveal = (delay: number) => ({
  initial: { y: '110%' },
  animate: { y: '0%' },
  transition: { duration: 0.9, ease: OUT, delay },
});

// ── Stats ──────────────────────────────────────────────────────────────────────
const STATS = [
  { n: '50+',  label: 'Projects Delivered' },
  { n: '3',    label: 'Languages' },
  { n: '30d',  label: 'Avg Delivery' },
  { n: '100%', label: 'Custom Built' },
];

const HEADLINE_LINES = [
  { text: 'We Build',      weight: 400, style: 'normal', color: 'var(--dark-text-primary)', font: 'var(--font-display)' },
  { text: 'Education',     weight: 400, style: 'italic', color: 'var(--blue)',               font: 'var(--font-display)' },
  { text: 'Technology',    weight: 400, style: 'italic', color: 'var(--dark-text-muted)',    font: 'var(--font-editorial)' },
] as const;

// ── Component ──────────────────────────────────────────────────────────────────
export function HeroLeft() {
  const prefersReducedMotion = useReducedMotion();
  const skip = !!prefersReducedMotion;

  const motionProps = skip
    ? (delay: number) => ({}) // no-op
    : (fn: (d: number) => object, delay: number) => fn(delay);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 5% 0 5.5%',
        maxWidth: 640,
        width: '100%',
      }}
    >
      {/* ── Status badge ── */}
      <motion.div
        initial={skip ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}
      >
        <motion.span
          animate={{ boxShadow: ['0 0 0 0 rgba(13,184,122,0.4)', '0 0 0 7px rgba(13,184,122,0)', '0 0 0 0 rgba(13,184,122,0)'] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--green)', display: 'inline-block', flexShrink: 0 }}
        />
        <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, color: 'var(--dark-text-muted)', letterSpacing: '0.28em' }}>
          CURRENTLY ACCEPTING PROJECTS · Q2 2026
        </span>
      </motion.div>

      {/* ── Eyebrow ── */}
      <motion.div
        initial={skip ? false : { opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: OUT, delay: 0.6 }}
        style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}
      >
        <div style={{ width: 28, height: 2, backgroundColor: 'var(--blue)', flexShrink: 0 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          {(['LMS DESIGN', '3D ANIMATIONS', 'SCHOOL ERP'] as const).map((tag, i) => (
            <span key={tag} style={{ fontFamily: 'var(--font-stamp)', fontSize: 10, letterSpacing: '0.3em', color: 'var(--gold)' }}>
              {i > 0 && <span style={{ color: 'var(--dark-text-muted)', marginRight: 8 }}>·</span>}
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Headline ── */}
      <div style={{ letterSpacing: '-0.04em', lineHeight: 0.87, marginBottom: 0 }}>
        {HEADLINE_LINES.map((line, i) => (
          <div key={i} style={{ overflow: 'hidden', display: 'block', lineHeight: 0.9 }}>
            <motion.span
              initial={skip ? false : { y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, ease: OUT, delay: 0.7 + i * 0.15 }}
              style={{
                display: 'block',
                fontFamily: line.font,
                fontWeight: line.weight,
                fontStyle: line.style,
                fontSize: 'clamp(52px, 6.5vw, 96px)',
                color: line.color,
                lineHeight: 0.9,
              }}
            >
              {line.text}
            </motion.span>
          </div>
        ))}
      </div>

      {/* Fire rule beneath headline */}
      <motion.div
        initial={skip ? false : { scaleX: 0, transformOrigin: 'left' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: OUT, delay: 1.2 }}
        style={{ width: 56, height: 1, backgroundColor: 'var(--blue)', marginTop: 20 }}
      />

      {/* ── Body copy ── */}
      <motion.p
        initial={skip ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: OUT, delay: 1.1 }}
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 15,
          color: 'var(--dark-text-muted)',
          lineHeight: 1.85,
          maxWidth: 440,
          marginTop: 24,
          marginBottom: 36,
        }}
      >
        Complete digital infrastructure for educational institutions —{' '}
        <strong style={{ color: 'var(--dark-text-body)', fontWeight: 500 }}>Moodle LMS</strong>,{' '}
        <strong style={{ color: 'var(--dark-text-body)', fontWeight: 500 }}>3D animations</strong>,{' '}
        <strong style={{ color: 'var(--dark-text-body)', fontWeight: 500 }}>school management portals</strong>, and digital
        marketing. Delivered in{' '}
        <strong style={{ color: 'var(--blue)', fontWeight: 600 }}>30 days</strong>, in English, Arabic & Urdu.
      </motion.p>

      {/* ── CTA row ── */}
      <motion.div
        initial={skip ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: OUT, delay: 1.25 }}
        style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 48, flexWrap: 'wrap' }}
      >
        {/* Primary CTA */}
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
          <Link
            href="/contact"
            data-cursor="large"
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: 14,
              color: '#fff',
              backgroundColor: 'var(--blue)',
              borderRadius: 2,
              padding: '15px 32px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 12,
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--blue-dark)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--blue)'; }}
          >
            Start Your Project
            <span style={{ width: 24, height: 24, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>
              →
            </span>
          </Link>
        </motion.div>

        {/* Secondary CTA */}
        <Link
          href="/portfolio"
          data-cursor="large"
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 600,
            fontSize: 14,
            color: 'var(--dark-text-muted)',
            backgroundColor: 'transparent',
            border: '1px solid var(--dark-line2)',
            borderRadius: 2,
            padding: '14px 28px',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'border-color 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'var(--blue)';
            el.style.color = 'var(--dark-text-primary)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = 'var(--dark-line2)';
            el.style.color = 'var(--dark-text-muted)';
          }}
        >
          See Our Work
        </Link>
      </motion.div>

      {/* ── Stats row ── */}
      <div style={{ display: 'flex', borderTop: '1px solid var(--dark-line)', paddingTop: 28 }}>
        {STATS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={skip ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: OUT, delay: 1.4 + i * 0.08 }}
            style={{
              paddingRight: i < STATS.length - 1 ? 28 : 0,
              marginRight: i < STATS.length - 1 ? 28 : 0,
              borderRight: i < STATS.length - 1 ? '1px solid var(--dark-line)' : 'none',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget.querySelector('.stat-number') as HTMLElement | null;
              if (el) el.style.color = 'var(--dark-text-primary)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget.querySelector('.stat-number') as HTMLElement | null;
              if (el) el.style.color = 'var(--blue)';
            }}
          >
            <span
              className="stat-number"
              style={{ fontFamily: 'var(--font-stamp)', fontSize: 36, color: 'var(--blue)', lineHeight: 1, display: 'block', transition: 'color 0.2s ease' }}
            >
              {s.n}
            </span>
            <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 8, color: 'var(--dark-text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginTop: 4 }}>
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
