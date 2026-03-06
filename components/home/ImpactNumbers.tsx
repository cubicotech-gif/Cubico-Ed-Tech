"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';

/* ── useCountUp ──────────────────────────────────────────────────────────── */
function useCountUp(target: number, active: boolean, duration = 1400, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let tid: ReturnType<typeof setTimeout>;
    let rid: number;
    tid = setTimeout(() => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(eased * target);
        if (p < 1) rid = requestAnimationFrame(tick);
        else setVal(target);
      };
      rid = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(tid); cancelAnimationFrame(rid); };
  }, [active, target, duration, delay]);
  return val;
}

/* ── BentoCard — 2.5D tilt wrapper ─────────────────────────────────────── */
function BentoCard({
  children, accentColor, className, style,
}: {
  children: React.ReactNode;
  accentColor: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.6 });
  const rotX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-10, 10]);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top)  / rect.height - 0.5);
  }, [mx, my]);

  const handleLeave = useCallback(() => {
    mx.set(0); my.set(0);
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformStyle: 'preserve-3d' as const,
        position: 'relative',
        borderRadius: 20,
        background: 'rgba(12,21,40,0.82)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: `1px solid rgba(255,255,255,0.08)`,
        boxShadow: `0 0 0 0 transparent, 0 24px 48px rgba(0,0,0,0.45)`,
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        ...style,
      }}
      whileHover={{
        borderColor: `${accentColor}44`,
        boxShadow: `0 0 32px ${accentColor}22, 0 24px 48px rgba(0,0,0,0.45)`,
      }}
    >
      {/* Top gradient bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
        opacity: 0.8,
      }} />
      {/* Corner node */}
      <div style={{
        position: 'absolute', top: 14, right: 14,
        width: 7, height: 7, borderRadius: '50%',
        background: accentColor, opacity: 0.5,
        boxShadow: `0 0 8px ${accentColor}`,
      }} />
      {children}
    </motion.div>
  );
}

/* ── MiniPhone ──────────────────────────────────────────────────────────── */
function MiniPhone() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        position: 'absolute', bottom: 24, right: 20,
        width: 88, height: 152,
        background: 'rgba(6,10,20,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 18,
        padding: '8px 6px 6px',
        boxShadow: '0 16px 40px rgba(0,0,0,0.55), 0 0 24px rgba(6,214,160,0.12), inset 0 1px 0 rgba(255,255,255,0.08)',
        transform: 'translateZ(40px)',
        zIndex: 4,
      }}
    >
      {/* Island */}
      <div style={{ width: 22, height: 5, background: '#050810', borderRadius: 4, margin: '0 auto 6px' }} />
      {/* Header */}
      <div style={{
        fontFamily: 'var(--font-ui)', fontSize: 7, fontWeight: 700,
        color: '#06D6A0', textAlign: 'center', marginBottom: 6,
        letterSpacing: '0.05em',
      }}>Parent Portal</div>
      {/* Notification 1 */}
      <div style={{
        background: 'rgba(6,214,160,0.1)', border: '1px solid rgba(6,214,160,0.2)',
        borderRadius: 6, padding: '4px 5px', marginBottom: 4,
      }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 6, fontWeight: 600, color: '#06D6A0', marginBottom: 2 }}>
          ✓ Attendance Synced
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 5.5, color: '#64748B' }}>
          Grade 5-B • Today
        </div>
      </div>
      {/* Notification 2 */}
      <div style={{
        background: 'rgba(79,70,229,0.1)', border: '1px solid rgba(79,70,229,0.2)',
        borderRadius: 6, padding: '4px 5px', marginBottom: 6,
      }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 6, fontWeight: 600, color: '#818CF8', marginBottom: 2 }}>
          Arabic Grammar Ch.4
        </div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 5.5, color: '#64748B' }}>
          New lesson available
        </div>
      </div>
      {/* Progress bar */}
      <div style={{ padding: '0 3px' }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 5, color: '#64748B', marginBottom: 3 }}>
          Weekly Progress
        </div>
        <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '78%' }}
            transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            style={{ height: '100%', background: 'linear-gradient(90deg, #06D6A0, #818CF8)', borderRadius: 2 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ── CircularProgress ───────────────────────────────────────────────────── */
function CircularProgress({ active }: { active: boolean }) {
  const r = 38;
  const circ = 2 * Math.PI * r;
  return (
    <motion.svg width={96} height={96} viewBox="0 0 96 96" style={{ position: 'absolute', bottom: 24, right: 24, transform: 'translateZ(20px)' }}>
      <defs>
        <linearGradient id="cpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
        <filter id="cpGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Track */}
      <circle cx="48" cy="48" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
      {/* Progress arc */}
      <motion.circle
        cx="48" cy="48" r={r} fill="none"
        stroke="url(#cpGrad)" strokeWidth="6"
        strokeLinecap="round" filter="url(#cpGlow)"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={active ? { strokeDashoffset: circ * 0.0 } : { strokeDashoffset: circ }}
        transition={{ duration: 1.6, delay: 0.4, ease: 'easeOut' }}
        style={{ transformOrigin: '48px 48px', rotate: '-90deg' }}
      />
      {/* Center label */}
      <text x="48" y="44" textAnchor="middle" fontSize="11" fontWeight="700" fill="#E2E8F0" fontFamily="var(--font-ui)">4 wk</text>
      <text x="48" y="58" textAnchor="middle" fontSize="7" fill="#64748B" fontFamily="var(--font-body)">to launch</text>
    </motion.svg>
  );
}

/* ── Card 1 — Admin Efficiency ──────────────────────────────────────────── */
function Card1({ active }: { active: boolean }) {
  const pct = useCountUp(80, active, 1400, 100);
  const items = ['Timetable', 'Attendance', 'Fee Reports', 'Staff Mgmt'];
  return (
    <BentoCard accentColor="#4F46E5" className="impact-wide" style={{ padding: '36px 32px', minHeight: 240 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: '#4F46E5', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>
            Admin Efficiency
          </div>
          <div style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(56px, 7vw, 80px)',
            fontWeight: 700, lineHeight: 1,
            background: 'linear-gradient(135deg, #E2E8F0, #4F46E5)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            {Math.round(pct)}%
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#64748B', margin: '10px 0 0', lineHeight: 1.6, maxWidth: 220 }}>
            less time on manual processes with unified management.
          </p>
        </div>
        {/* System Online badge + mini grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 140 }}>
          {/* Status badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            background: 'rgba(6,214,160,0.1)', border: '1px solid rgba(6,214,160,0.25)',
            borderRadius: 20, padding: '6px 12px', alignSelf: 'flex-start',
            transform: 'translateZ(20px)',
          }}>
            <motion.div
              animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#06D6A0', boxShadow: '0 0 8px #06D6A0' }}
            />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: '#06D6A0' }}>System Online</span>
          </div>
          {/* Mini management items */}
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 6, transform: 'translateZ(20px)' }}>
            {items.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={active ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                style={{
                  fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500,
                  color: '#94A3B8',
                  background: 'rgba(79,70,229,0.1)', border: '1px solid rgba(79,70,229,0.2)',
                  borderRadius: 6, padding: '4px 8px',
                }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

/* ── Card 2 — Student Engagement ────────────────────────────────────────── */
function Card2({ active }: { active: boolean }) {
  return (
    <BentoCard accentColor="#7C3AED" className="impact-narrow" style={{ padding: '36px 28px', minHeight: 240, overflow: 'hidden' }}>
      {/* Blurred play button background */}
      <div style={{
        position: 'absolute', bottom: -20, right: -20,
        width: 120, height: 120,
        background: 'rgba(124,58,237,0.18)',
        borderRadius: '50%',
        filter: 'blur(24px)',
        pointerEvents: 'none',
      }} />
      <motion.div
        style={{
          position: 'absolute', bottom: 24, right: 24,
          width: 56, height: 56, borderRadius: '50%',
          background: 'rgba(124,58,237,0.2)',
          border: '1px solid rgba(124,58,237,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: 'translateZ(20px)',
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="22" height="22" viewBox="0 0 22 22">
          <polygon points="7,4 19,11 7,18" fill="#7C3AED" />
        </svg>
      </motion.div>

      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: '#7C3AED', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>
        Student Engagement
      </div>
      <motion.div
        animate={active ? { scale: [1, 1.04, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(60px, 7vw, 84px)',
          fontWeight: 700, lineHeight: 1,
          background: 'linear-gradient(135deg, #E2E8F0, #7C3AED)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          display: 'inline-block',
        }}
      >
        3×
      </motion.div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#64748B', margin: '10px 0 0', lineHeight: 1.6 }}>
        more engagement with animated, game-based learning.
      </p>
    </BentoCard>
  );
}

/* ── Card 3 — Parent Connection ─────────────────────────────────────────── */
function Card3({ active }: { active: boolean }) {
  const pct = useCountUp(100, active, 1200, 200);
  return (
    <BentoCard accentColor="#06D6A0" className="impact-narrow" style={{ padding: '36px 28px', minHeight: 240 }}>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: '#06D6A0', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>
        Parent Connection
      </div>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(56px, 6vw, 76px)',
        fontWeight: 700, lineHeight: 1,
        background: 'linear-gradient(135deg, #E2E8F0, #06D6A0)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>
        {Math.round(pct)}%
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#64748B', margin: '10px 0 0', lineHeight: 1.6, maxWidth: 180 }}>
        real-time visibility into attendance, grades &amp; progress.
      </p>
      <MiniPhone />
    </BentoCard>
  );
}

/* ── Card 4 — Time to Launch ─────────────────────────────────────────────── */
function Card4({ active }: { active: boolean }) {
  const steps = ['Discovery', 'Setup', 'Training', 'Launch'];
  return (
    <BentoCard accentColor="#818CF8" className="impact-narrow" style={{ padding: '36px 28px', minHeight: 240 }}>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: '#818CF8', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>
        Time to Launch
      </div>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(56px, 6vw, 76px)',
        fontWeight: 700, lineHeight: 1,
        background: 'linear-gradient(135deg, #E2E8F0, #818CF8)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>
        4 wk
      </div>
      {/* Timeline steps */}
      <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 6, marginTop: 14 }}>
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -12 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.15, duration: 0.4 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <div style={{
              width: 6, height: 6, borderRadius: '50%',
              background: '#818CF8', opacity: 1 - i * 0.18,
              flexShrink: 0,
            }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#64748B' }}>{step}</span>
          </motion.div>
        ))}
      </div>
      <CircularProgress active={active} />
    </BentoCard>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export default function ImpactNumbers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const active = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="results" ref={sectionRef} style={{ backgroundColor: '#060A15', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 56, maxWidth: 560 }}
        >
          <p style={{
            fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
            color: '#818CF8', letterSpacing: '0.12em', textTransform: 'uppercase' as const,
            margin: '0 0 16px',
          }}>
            Impact
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700, color: '#E2E8F0',
            margin: 0, letterSpacing: '-0.02em', lineHeight: 1.15,
          }}>
            Real numbers.<br />
            <span style={{
              background: 'linear-gradient(135deg, #06D6A0, #818CF8)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontStyle: 'normal',
            }}>
              Real transformation.
            </span>
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="impact-bento-grid">
          <Card1 active={active} />
          <Card2 active={active} />
          <Card3 active={active} />
          <Card4 active={active} />
        </div>
      </div>
    </section>
  );
}
