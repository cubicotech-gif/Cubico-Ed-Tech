'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';

// ─────────────────────────────────────────────────────────────────────────────
// Inline SVG icons (no external dependency needed)
// ─────────────────────────────────────────────────────────────────────────────
const IconBuilding = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
  </svg>
);

const IconMonitor = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

const IconGamepad = ({ size = 24, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 12h4M8 10v4" />
    <circle cx="16" cy="11" r="1" fill={color} />
    <circle cx="18" cy="13" r="1" fill={color} />
  </svg>
);

const IconTablet = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <circle cx="12" cy="18" r="1" fill={color} />
  </svg>
);

const IconGradCap = ({ size = 28, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 22,8.5 12,15 2,8.5" />
    <path d="M6 11.5v5c0 1.5 2.5 4 6 4s6-2.5 6-4v-5" />
    <line x1="22" y1="8.5" x2="22" y2="14" />
  </svg>
);

const IconPlay = ({ size = 22, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
    <polygon points="10,8 17,12 10,16" fill={color} />
  </svg>
);

const IconGlobe = ({ size = 13, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconStar = ({ size = 13 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#D4AF37">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
  </svg>
);

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Deterministic window-light pattern for buildings
// ─────────────────────────────────────────────────────────────────────────────
const WINDOW_PATTERN = [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────
export default function InfiniteCanvasHero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse tracking
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const smoothX = useSpring(rawX, { stiffness: 45, damping: 22 });
  const smoothY = useSpring(rawY, { stiffness: 45, damping: 22 });

  // Campus tilt transforms
  const campusRX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const campusRY = useTransform(smoothX, [-0.5, 0.5], [-9, 9]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#020B07',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '108px 5% 80px',
      }}
    >
      {/* ── Ambient backgrounds ─────────────────────────────────────────────── */}

      {/* Deep emerald glow — top-center */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 90% 55% at 50% -5%, rgba(16,185,129,0.13) 0%, transparent 72%)',
      }} />

      {/* Gold accent glow — bottom-right */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 55% at 95% 95%, rgba(212,175,55,0.09) 0%, transparent 65%)',
      }} />

      {/* Slate ambient — left edge */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 40% 60% at -5% 50%, rgba(30,41,59,0.5) 0%, transparent 60%)',
      }} />

      {/* Dot-grid texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(16,185,129,0.07) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 0%, transparent 80%)',
      }} />

      {/* ── Content grid ────────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1300, width: '100%', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.1fr)',
        gap: 64,
        alignItems: 'center',
      }}
        className="hero-canvas-grid"
      >

        {/* ── LEFT: Text copy ─────────────────────────────────────────────── */}
        <div>

          {/* Agency label chip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(16,185,129,0.07)',
              border: '1px solid rgba(16,185,129,0.22)',
              borderRadius: 100,
              padding: '6px 16px',
              marginBottom: 30,
            }}
          >
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'block', boxShadow: '0 0 8px #10B981' }}
            />
            <span style={{
              fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700,
              color: '#10B981', letterSpacing: '0.18em', textTransform: 'uppercase',
            }}>
              EdTech Agency · Karachi · Est. 2019
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 22 }}
          >
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(44px, 5.5vw, 76px)',
              fontWeight: 700,
              lineHeight: 1.07,
              color: '#F0EBE3',
              letterSpacing: '-0.03em',
              margin: 0,
            }}>
              Build an institution{' '}
              <em style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #10B981 0%, #34D399 60%, #6EE7B7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                ready for
              </em>
              <br />anything
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease: 'easeOut' }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              color: '#7A7268',
              lineHeight: 1.72,
              maxWidth: 440,
              margin: '0 0 44px',
            }}
          >
            From Moodle LMS setups to 3D animations — we deliver complete
            digital ecosystems that help institutions thrive worldwide.
          </motion.p>

          {/* Trust badges (floating cloud style) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.52 }}
            style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}
          >
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: 'rgba(10,12,18,0.85)',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(212,175,55,0.28)',
                borderRadius: 100,
                padding: '8px 16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
              }}
            >
              <IconStar />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: '#D4AF37' }}>
                5+ Institutions
              </span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                background: 'rgba(10,12,18,0.85)',
                backdropFilter: 'blur(14px)',
                border: '1px solid rgba(16,185,129,0.28)',
                borderRadius: 100,
                padding: '8px 16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
              }}
            >
              <IconGlobe color="#10B981" />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: '#10B981' }}>
                Active in 3 Countries
              </span>
            </motion.div>
          </motion.div>

          {/* Glassmorphism CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}
          >
            {/* Primary — glassmorphism with glow pulse */}
            <Link
              href="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                position: 'relative',
                background: 'rgba(16,185,129,0.10)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(16,185,129,0.38)',
                borderRadius: 14,
                padding: '15px 30px',
                fontFamily: 'var(--font-ui)',
                fontSize: 15,
                fontWeight: 600,
                color: '#F0EBE3',
                textDecoration: 'none',
                boxShadow: '0 0 36px rgba(16,185,129,0.14), inset 0 1px 0 rgba(255,255,255,0.06)',
                overflow: 'hidden',
              }}
              className="hero-cta-primary"
            >
              {/* Glow pulse ring */}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: -5,
                  borderRadius: 19,
                  border: '1px solid rgba(16,185,129,0.22)',
                  animation: 'infiniteCanvasPulse 2.6s ease-out infinite',
                  pointerEvents: 'none',
                }}
              />
              {/* Shimmer overlay */}
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)',
                  borderRadius: 14,
                  pointerEvents: 'none',
                }}
              />
              Get a Free Consultation
              <IconArrow />
            </Link>

            {/* Secondary */}
            <Link
              href="/portfolio"
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 14,
                fontWeight: 500,
                color: '#7A7268',
                textDecoration: 'none',
                letterSpacing: '0.01em',
                transition: 'color 0.2s ease',
                paddingBottom: 1,
                borderBottom: '1px solid rgba(122,114,104,0.3)',
              }}
            >
              View Portfolio
            </Link>
          </motion.div>
        </div>

        {/* ── RIGHT: 3D Isometric Campus Canvas ───────────────────────────── */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* ── Floating cloud badge: Institutions (orbits top-right) ── */}
          <motion.div
            animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute', top: 8, right: -16, zIndex: 12,
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(5, 8, 14, 0.92)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(212,175,55,0.35)',
              borderRadius: 100,
              padding: '9px 18px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.06)',
            }}
          >
            <IconStar size={14} />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: '#D4AF37', whiteSpace: 'nowrap' }}>
              5+ Institutions
            </span>
          </motion.div>

          {/* ── Floating cloud badge: Countries (orbits bottom-left) ── */}
          <motion.div
            animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            style={{
              position: 'absolute', bottom: 12, left: -16, zIndex: 12,
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(5, 8, 14, 0.92)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
              border: '1px solid rgba(16,185,129,0.35)',
              borderRadius: 100,
              padding: '9px 18px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(16,185,129,0.06)',
            }}
          >
            <IconGlobe color="#10B981" size={14} />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: '#10B981', whiteSpace: 'nowrap' }}>
              Active in 3 Countries
            </span>
          </motion.div>

          {/* ── Floating 3D asset: Digital Tablet (top-right) ── */}
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            style={{
              position: 'absolute', top: -26, right: 40, zIndex: 11,
              background: 'linear-gradient(145deg, #1B2A38, #0F1A23)',
              border: '1px solid rgba(56,189,248,0.30)',
              borderRadius: 14,
              padding: '13px 15px 11px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
              boxShadow: '0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(56,189,248,0.08), 0 0 20px rgba(56,189,248,0.07)',
            }}
          >
            <IconTablet size={26} color="#38BDF8" />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, color: 'rgba(56,189,248,0.75)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              LMS Portal
            </span>
            {/* Mini screen lines */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
              {[100, 70, 85].map((w, i) => (
                <div key={i} style={{ height: 2, width: `${w}%`, background: 'rgba(56,189,248,0.25)', borderRadius: 2 }} />
              ))}
            </div>
          </motion.div>

          {/* ── Floating 3D asset: Graduation Cap (top-left) ── */}
          <motion.div
            animate={{ y: [0, -12, 0], rotate: [-4, 4, -4] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }}
            style={{
              position: 'absolute', top: -18, left: 28, zIndex: 11,
              background: 'linear-gradient(145deg, #1C1608, #110F06)',
              border: '1px solid rgba(212,175,55,0.30)',
              borderRadius: 14,
              padding: '13px 15px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
              boxShadow: '0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,175,55,0.06), 0 0 20px rgba(212,175,55,0.06)',
            }}
          >
            <IconGradCap size={28} color="#D4AF37" />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, color: 'rgba(212,175,55,0.75)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Certified
            </span>
          </motion.div>

          {/* ── Floating 3D asset: Play icon (bottom-right) ── */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], y: [0, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
            style={{
              position: 'absolute', bottom: -14, right: 50, zIndex: 11,
              background: 'rgba(16,185,129,0.09)',
              backdropFilter: 'blur(14px)',
              border: '1px solid rgba(16,185,129,0.28)',
              borderRadius: '50%',
              width: 54, height: 54,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 28px rgba(16,185,129,0.18), 0 8px 32px rgba(0,0,0,0.4)',
            }}
          >
            <IconPlay size={26} color="#10B981" />
          </motion.div>

          {/* ── THE CAMPUS PANEL — tilts with mouse ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              rotateX: campusRX,
              rotateY: campusRY,
              transformPerspective: 1500,
              position: 'relative',
              width: '100%',
              maxWidth: 560,
            }}
          >
            {/* Glow halo behind panel */}
            <div aria-hidden="true" style={{
              position: 'absolute', inset: -24, borderRadius: 36, pointerEvents: 'none',
              background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(16,185,129,0.08) 0%, transparent 70%)',
              filter: 'blur(16px)',
            }} />

            {/* Panel */}
            <div style={{
              position: 'relative',
              background: 'linear-gradient(148deg, #0C1E14 0%, #0B1912 50%, #081009 100%)',
              border: '1px solid rgba(16,185,129,0.14)',
              borderRadius: 26,
              padding: 26,
              boxShadow: '0 48px 96px rgba(0,0,0,0.65), 0 0 0 1px rgba(16,185,129,0.04), inset 0 1px 0 rgba(255,255,255,0.04)',
              overflow: 'hidden',
            }}>

              {/* Panel — inner radial glow */}
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0, borderRadius: 26, pointerEvents: 'none',
                background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(16,185,129,0.07) 0%, transparent 65%)',
              }} />

              {/* Subtle grid lines */}
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0, borderRadius: 26, pointerEvents: 'none', opacity: 0.45,
                backgroundImage: `
                  linear-gradient(rgba(16,185,129,0.07) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(16,185,129,0.07) 1px, transparent 1px)
                `,
                backgroundSize: '28px 28px',
              }} />

              {/* Panel header bar */}
              <div style={{
                position: 'relative', zIndex: 2,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: 20, paddingBottom: 14,
                borderBottom: '1px solid rgba(16,185,129,0.1)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: 'rgba(16,185,129,0.12)',
                    border: '1px solid rgba(16,185,129,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9,22 9,12 15,12 15,22" />
                    </svg>
                  </div>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700, color: '#10B981', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                    Cubico Campus
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
                  {[
                    { c: '#10B981', label: 'Manage' },
                    { c: '#D4AF37', label: 'Teach' },
                    { c: '#38BDF8', label: 'Learn' },
                  ].map(({ c, label }) => (
                    <div key={label} title={label} style={{ width: 8, height: 8, borderRadius: '50%', background: c, boxShadow: `0 0 6px ${c}88` }} />
                  ))}
                </div>
              </div>

              {/* Three zones grid */}
              <div style={{
                position: 'relative', zIndex: 2,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gridTemplateRows: 'auto auto',
                gap: 12,
              }}>

                {/* ─── Zone 1: MANAGE — School Building (tall, spans 2 rows) ─── */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  style={{ gridRow: 'span 2' }}
                >
                  <div style={{
                    height: '100%', minHeight: 226,
                    background: 'linear-gradient(160deg, #0D2B1E 0%, #0A201A 100%)',
                    border: '1px solid rgba(16,185,129,0.18)',
                    borderRadius: 18,
                    padding: 18,
                    position: 'relative', overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(16,185,129,0.06)',
                  }}>
                    {/* Facade lines */}
                    <div aria-hidden="true" style={{
                      position: 'absolute', inset: 0, borderRadius: 18, pointerEvents: 'none',
                      backgroundImage: `
                        repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(16,185,129,0.04) 20px, rgba(16,185,129,0.04) 21px),
                        repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(16,185,129,0.04) 20px, rgba(16,185,129,0.04) 21px)
                      `,
                    }} />

                    {/* Bottom glow */}
                    <div aria-hidden="true" style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0, height: 70,
                      background: 'linear-gradient(to top, rgba(16,185,129,0.08), transparent)',
                      borderRadius: '0 0 18px 18px',
                    }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: 12,
                        background: 'rgba(16,185,129,0.10)',
                        border: '1px solid rgba(16,185,129,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: 14,
                      }}>
                        <IconBuilding size={22} color="#10B981" />
                      </div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800, color: '#10B981', letterSpacing: '0.2em', marginBottom: 6, textTransform: 'uppercase' }}>
                        Manage
                      </div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'rgba(240,235,227,0.38)', lineHeight: 1.55 }}>
                        Smart institution management system
                      </div>
                    </div>

                    {/* Window dot grid — building facade detail */}
                    <div style={{
                      position: 'absolute', bottom: 18, right: 14,
                      display: 'grid', gridTemplateColumns: 'repeat(4, 9px)', gap: 4,
                    }}>
                      {WINDOW_PATTERN.map((lit, i) => (
                        <motion.div
                          key={i}
                          animate={lit ? { opacity: [0.4, 0.8, 0.4] } : {}}
                          transition={lit ? { duration: 2.5 + i * 0.3, repeat: Infinity, delay: i * 0.15 } : {}}
                          style={{
                            width: 9, height: 9, borderRadius: 2,
                            background: lit ? 'rgba(16,185,129,0.55)' : 'rgba(16,185,129,0.08)',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* ─── Zone 2: TEACH — Cinema Screen ─── */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.95 }}
                >
                  <div style={{
                    background: 'linear-gradient(160deg, #1C1608 0%, #130F06 100%)',
                    border: '1px solid rgba(212,175,55,0.18)',
                    borderRadius: 18,
                    padding: 18,
                    position: 'relative', overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(212,175,55,0.05)',
                  }}>
                    <div aria-hidden="true" style={{
                      position: 'absolute', top: 0, right: 0, width: 70, height: 70,
                      background: 'radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 70%)',
                    }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: 'rgba(212,175,55,0.09)',
                        border: '1px solid rgba(212,175,55,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: 10,
                      }}>
                        <IconMonitor size={20} color="#D4AF37" />
                      </div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800, color: '#D4AF37', letterSpacing: '0.2em', marginBottom: 10, textTransform: 'uppercase' }}>
                        Teach
                      </div>
                      {/* Mini cinema screen */}
                      <div style={{
                        background: '#08080A',
                        borderRadius: 8, padding: '10px 8px',
                        border: '1px solid rgba(212,175,55,0.1)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8,
                      }}>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2.2, repeat: Infinity }}
                        >
                          <IconPlay size={18} color="#D4AF37" />
                        </motion.div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
                          {[90, 55].map((w, i) => (
                            <div key={i} style={{ height: 2, width: `${w}%`, background: 'rgba(212,175,55,0.25)', borderRadius: 2 }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* ─── Zone 3: LEARN — Gaming Lab ─── */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.1 }}
                >
                  <div style={{
                    background: 'linear-gradient(160deg, #091419 0%, #060D11 100%)',
                    border: '1px solid rgba(56,189,248,0.18)',
                    borderRadius: 18,
                    padding: 18,
                    position: 'relative', overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(56,189,248,0.05)',
                  }}>
                    <div aria-hidden="true" style={{
                      position: 'absolute', bottom: 0, left: 0, width: 70, height: 70,
                      background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)',
                    }} />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: 'rgba(56,189,248,0.09)',
                        border: '1px solid rgba(56,189,248,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: 10,
                      }}>
                        <IconGamepad size={20} color="#38BDF8" />
                      </div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 800, color: '#38BDF8', letterSpacing: '0.2em', marginBottom: 10, textTransform: 'uppercase' }}>
                        Learn
                      </div>
                      {/* Progress bars — gamified learning */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                        {[
                          { w: 85, c: '#38BDF8' },
                          { w: 62, c: '#10B981' },
                          { w: 91, c: '#D4AF37' },
                        ].map(({ w, c }, i) => (
                          <div key={i} style={{ position: 'relative', height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 4 }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${w}%` }}
                              transition={{ duration: 1, delay: 1.3 + i * 0.18, ease: 'easeOut' }}
                              style={{ position: 'absolute', inset: 0, background: c, borderRadius: 4, opacity: 0.65 }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Status bar */}
              <div style={{
                position: 'relative', zIndex: 2,
                marginTop: 14,
                padding: '10px 16px',
                background: 'rgba(16,185,129,0.04)',
                border: '1px solid rgba(16,185,129,0.1)',
                borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2.2, repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', flexShrink: 0 }}
                  />
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'rgba(240,235,227,0.35)' }}>
                    All systems online
                  </span>
                </div>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 600, color: 'rgba(16,185,129,0.6)', letterSpacing: '0.06em' }}>
                  99.9% uptime
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.5 }}
        style={{
          position: 'absolute', bottom: 32, left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
        }}
      >
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: '#7A7268', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 26, background: 'linear-gradient(to bottom, #7A7268, transparent)', borderRadius: 1 }}
        />
      </motion.div>

      {/* ── Global keyframes ────────────────────────────────────────────────── */}
      <style>{`
        @keyframes infiniteCanvasPulse {
          0%   { transform: scale(1);    opacity: 0.6; }
          60%  { transform: scale(1.06); opacity: 0;   }
          100% { transform: scale(1.06); opacity: 0;   }
        }

        /* Hover state for primary CTA */
        .hero-cta-primary:hover {
          background: rgba(16,185,129,0.17) !important;
          border-color: rgba(16,185,129,0.55) !important;
          box-shadow: 0 0 48px rgba(16,185,129,0.22), inset 0 1px 0 rgba(255,255,255,0.08) !important;
          transform: translateY(-1px);
        }

        /* Responsive: stack on mobile */
        @media (max-width: 840px) {
          .hero-canvas-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  );
}
