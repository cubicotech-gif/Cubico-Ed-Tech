'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Link from 'next/link';
import { Grain } from '@/components/ui/Grain';
import { tokens } from '@/lib/tokens';

const { colors: C } = tokens;

// ── Scramble characters ────────────────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$@%&!*';
const TARGET = 'CUBICO';

// ── Stats ──────────────────────────────────────────────────────────────────────
const STATS = [
  { n: '50+', label: 'PROJECTS' },
  { n: '3',   label: 'LANGUAGES' },
  { n: '10+', label: 'INSTITUTIONS' },
  { n: '30',  label: 'DAY DELIVERY' },
];

// ── Dashboard data ─────────────────────────────────────────────────────────────
const COURSES = [
  { name: 'Mathematics Grade 9', teacher: 'Mr Hassan Ali', students: 34, pct: 68 },
  { name: 'Islamic Studies',     teacher: 'Maulana Ibrahim', students: 52, pct: 45 },
  { name: 'Computer Science',    teacher: 'Ms Fatima Khan', students: 28, pct: 82 },
];

// ── Dashboard card ────────────────────────────────────────────────────────────
function DashboardCard() {
  const [expandedCourse, setExpandedCourse] = useState<number | null>(null);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 520,
        backgroundColor: C.panel,
        border: `1px solid ${C.line2}`,
        borderRadius: 6,
        overflow: 'hidden',
        boxShadow:
          '0 60px 140px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03), 0 0 80px rgba(232,98,42,0.06)',
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          height: 30,
          backgroundColor: '#060606',
          borderBottom: `1px solid ${C.line}`,
          padding: '0 12px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {['#ff5f57','#ffbd2e','#28ca41'].map((c) => (
          <div key={c} style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: c }} />
        ))}
        <div
          style={{
            flex: 1,
            backgroundColor: '#0a0a0a',
            border: `1px solid ${C.line}`,
            height: 16,
            padding: '0 8px',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: '#3a3a3a' }}>
            🔒 lms.al-noor.edu.pk
          </span>
          <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 9, color: C.fire }}>
            EduConnect
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', height: 'calc(100% - 30px)' }}>
        {/* Sidebar */}
        <div
          style={{
            width: 44,
            backgroundColor: '#060606',
            borderRight: `1px solid ${C.line}`,
            padding: '14px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}
        >
          {['⊞','📚','👥','📊','📅'].map((icon, i) => (
            <div
              key={i}
              style={{
                width: 22, height: 22,
                backgroundColor: i === 0 ? 'rgba(232,98,42,0.12)' : C.panel,
                border: i === 0 ? '1px solid rgba(232,98,42,0.25)' : 'none',
                borderRadius: 3,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11,
              }}
            >
              {icon}
            </div>
          ))}
        </div>

        {/* Dashboard */}
        <div style={{ flex: 1, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Greeting */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'linear-gradient(135deg, #E8622A, #C9A96E)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, color: '#fff' }}>A</span>
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: C.ivory }}>
                Good morning, Principal Ahmed
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: C.muted, marginTop: 2 }}>
                47 students online · Tuesday
              </div>
            </div>
          </div>

          {/* Stat grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
            {[
              { n: '847', label: 'STUDENTS',  color: C.fire },
              { n: '24',  label: 'COURSES',   color: C.bronze },
              { n: '94%', label: 'ATTEND.',   color: C.green },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  backgroundColor: '#0a0a0a',
                  border: `1px solid ${C.line}`,
                  padding: '8px 10px',
                  borderRadius: 2,
                }}
              >
                <div style={{ fontFamily: 'var(--font-accent)', fontSize: 20, color: stat.color, lineHeight: 1 }}>
                  {stat.n}
                </div>
                <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 8, letterSpacing: '0.1em', color: C.muted, marginTop: 3 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Course header */}
          <div style={{ fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '0.25em', color: C.bronze }}>
            ACTIVE COURSES
          </div>

          {/* Courses */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {COURSES.map((c, i) => (
              <div key={i}>
                <div
                  onClick={() => setExpandedCourse(expandedCourse === i ? null : i)}
                  style={{
                    backgroundColor: '#0a0a0a',
                    border: `1px solid ${expandedCourse === i ? C.line2 : C.line}`,
                    padding: '11px 14px',
                    borderRadius: 2,
                    display: 'grid',
                    gridTemplateColumns: '1fr 130px 44px',
                    alignItems: 'center',
                    gap: 14,
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: C.ivory }}>
                      {c.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: C.muted }}>
                      {c.teacher} · {c.students} students
                    </div>
                  </div>
                  <div style={{ height: 3, backgroundColor: C.line, borderRadius: 2, position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute', top: 0, left: 0, bottom: 0,
                        width: `${c.pct}%`,
                        background: 'linear-gradient(to right, #E8622A, #C9A96E)',
                        borderRadius: 2,
                      }}
                    />
                  </div>
                  <div style={{ fontFamily: 'var(--font-accent)', fontSize: 20, color: C.fire, textAlign: 'right' }}>
                    {c.pct}%
                  </div>
                </div>

                {/* Expandable pills */}
                {expandedCourse === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ display: 'flex', gap: 5, padding: '6px 0 2px' }}>
                      {['📝 Assignments: 3 due','✅ Quiz: Friday','💬 Discussion: 12 new'].map((pill) => (
                        <div
                          key={pill}
                          style={{
                            backgroundColor: C.panel,
                            border: `1px solid ${C.line}`,
                            borderRadius: 4,
                            padding: '4px 10px',
                            fontFamily: 'var(--font-ui)',
                            fontSize: 9,
                            color: C.soft,
                            whiteSpace: 'nowrap' as const,
                          }}
                        >
                          {pill}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Status bar */}
          <div
            style={{
              borderTop: `1px solid ${C.line}`,
              paddingTop: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: C.green }} />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: C.muted }}>
                System online · All services operational
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: C.dim }}>
              Last sync: just now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Hero() {
  // Preloader state: 0=init 1=black 2=scramble 3=fadeout 4=hero
  const [phase, setPhase] = useState(0);
  const [letters, setLetters] = useState<string[]>(Array(6).fill(''));
  const [mounted, setMounted] = useState(false);

  // Card 3D parallax
  const leftColRef = useRef<HTMLDivElement>(null);
  const mouseNormX = useMotionValue(0);
  const mouseNormY = useMotionValue(0);
  const rotateY = useSpring(mouseNormX, { stiffness: 200, damping: 25 });
  const rotateX = useSpring(mouseNormY, { stiffness: 200, damping: 25 });

  const isActive = phase >= 4;

  // ── Preloader sequence ──────────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    const hasSeen = sessionStorage.getItem('cubicoPreloaderSeen');

    if (hasSeen) {
      setPhase(4);
      return;
    }

    setPhase(1);

    // Phase 2: scramble start at 400ms
    const t2 = setTimeout(() => {
      setPhase(2);
      // Scramble each letter
      TARGET.split('').forEach((letter, i) => {
        setTimeout(() => {
          let elapsed = 0;
          const interval = setInterval(() => {
            elapsed += 30;
            if (elapsed >= 80) {
              clearInterval(interval);
              setLetters((prev) => { const n = [...prev]; n[i] = letter; return n; });
            } else {
              setLetters((prev) => {
                const n = [...prev];
                n[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
                return n;
              });
            }
          }, 30);
        }, i * 80);
      });
    }, 400);

    const t3 = setTimeout(() => setPhase(3), 900);
    const t4 = setTimeout(() => {
      setPhase(4);
      sessionStorage.setItem('cubicoPreloaderSeen', '1');
    }, 1400);

    return () => { clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  // ── Card parallax ──────────────────────────────────────────────────────────
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = leftColRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseNormX.set(x * 8);
    mouseNormY.set(-y * 6);
  };

  const handleMouseLeave = () => {
    mouseNormX.set(0);
    mouseNormY.set(0);
  };

  if (!mounted) {
    return <div style={{ minHeight: '100dvh', backgroundColor: C.void }} />;
  }

  return (
    <>
      {/* ── Preloader overlay ── */}
      {phase < 4 && (
        <div
          style={{
            position: 'fixed', inset: 0, backgroundColor: C.void,
            zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {phase >= 2 && (
            <motion.div
              animate={{
                scale: phase === 3 ? 1.5 : 1,
                opacity: phase === 3 ? 0 : 1,
              }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 120,
                color: C.ivory,
                letterSpacing: '0.15em',
                lineHeight: 1,
                display: 'flex',
                userSelect: 'none',
              }}
            >
              {letters.map((l, i) => (
                <span key={i}>{l}</span>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {/* ── Hero section ── */}
      <section
        style={{
          minHeight: '100dvh',
          backgroundColor: C.void,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Grain />

        {/* Atmospheric glows */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: '-30%', right: '-15%',
            width: '65vw', height: '65vw',
            background: 'radial-gradient(circle, rgba(232,98,42,0.06) 0%, transparent 60%)',
            pointerEvents: 'none', zIndex: 0,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', bottom: '-20%', left: '-10%',
            width: '45vw', height: '45vw',
            background: 'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 60%)',
            pointerEvents: 'none', zIndex: 0,
          }}
        />

        {/* Grid texture */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)',
            backgroundSize: '88px 88px',
          }}
        />

        {/* Content grid */}
        <div
          style={{
            paddingTop: 68,
            minHeight: 'calc(100dvh - 68px)',
            maxWidth: 1440,
            margin: '0 auto',
            padding: '68px 6% 0',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
            position: 'relative',
            zIndex: 1,
          }}
          className="grid-cols-1 xl:grid-cols-2"
        >
          {/* ── LEFT COLUMN ── */}
          <div
            ref={leftColRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingRight: '5%',
              paddingTop: 40,
              paddingBottom: 80,
            }}
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -24 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32,
              }}
            >
              <div style={{ width: 28, height: 1, backgroundColor: C.fire }} />
              <span
                style={{
                  fontFamily: 'var(--font-accent)', fontSize: 11,
                  letterSpacing: '0.38em', color: C.bronze,
                }}
              >
                EDTECH AGENCY · EST. 2019 · KARACHI, PAKISTAN
              </span>
            </motion.div>

            {/* Headline — 3 lines, clip reveal */}
            <div style={{ marginBottom: 28 }}>
              {[
                { text: 'We Build',    weight: 900, style: 'normal' as const,  color: C.ivory  },
                { text: 'Education',  weight: 900, style: 'italic' as const,  color: C.bronze },
                { text: 'Technology', weight: 300, style: 'italic' as const,  color: C.ivory  },
              ].map((line, i) => (
                <div key={i} style={{ overflow: 'hidden', lineHeight: 0.92 }}>
                  <motion.div
                    initial={{ y: '105%' }}
                    animate={{ y: isActive ? '0%' : '105%' }}
                    transition={{ delay: 0.15 + i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(60px, 9.5vw, 136px)',
                        fontWeight: line.weight,
                        fontStyle: line.style,
                        color: line.color,
                        letterSpacing: '-0.04em',
                        display: 'block',
                      }}
                    >
                      {line.text}
                    </span>
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Value proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                lineHeight: 1.85,
                color: C.muted,
                maxWidth: 440,
                marginBottom: 36,
              }}
            >
              Complete digital infrastructure for educational institutions.{' '}
              <span style={{ color: '#8A8480' }}>Moodle LMS · 3D Animations · School ERP</span>
              {' '}· Digital Marketing.{' '}
              In English. In Arabic. Delivered in 30 days.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 52 }}
            >
              <Link
                href="/contact"
                data-cursor="large"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  backgroundColor: C.fire, color: '#fff',
                  fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 14,
                  letterSpacing: '0.04em', borderRadius: 2,
                  padding: '15px 34px', textDecoration: 'none',
                  transition: 'background-color 0.2s, gap 0.2s',
                  boxShadow: '0 0 0 0 rgba(232,98,42,0.3)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = '#cf5020';
                  el.style.boxShadow = '0 0 32px rgba(232,98,42,0.3)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = C.fire;
                  el.style.boxShadow = '0 0 0 0 rgba(232,98,42,0.3)';
                }}
              >
                Start Your Project
                <span style={{ display: 'inline-block', transition: 'transform 0.2s' }}>→</span>
              </Link>

              <Link
                href="/portfolio"
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  backgroundColor: 'transparent',
                  border: `1px solid ${C.line}`,
                  color: C.muted,
                  fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 14,
                  borderRadius: 2, padding: '15px 28px', textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = C.fire;
                  el.style.color = C.ivory;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = C.line;
                  el.style.color = C.muted;
                }}
              >
                Explore Our Work
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
              transition={{ delay: 0.95, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {STATS.map((stat, i) => (
                <div key={stat.label} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ padding: i === 0 ? '0 28px 0 0' : '0 28px' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-accent)', fontSize: 40,
                        color: C.fire, lineHeight: 1,
                      }}
                    >
                      {stat.n}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 9,
                        letterSpacing: '0.18em', color: C.muted, marginTop: 2,
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                  {i < STATS.length - 1 && (
                    <div style={{ width: 1, height: 32, backgroundColor: C.line2 }} />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — card ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              paddingTop: 40,
              paddingBottom: 80,
            }}
            className="hidden xl:flex"
          >
            {/* Ambient glow */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                width: 340, height: 340, zIndex: 0,
                background: 'radial-gradient(circle, rgba(232,98,42,0.09) 0%, transparent 65%)',
                borderRadius: '50%',
                animation: 'float-glow 6s ease-in-out infinite',
              }}
            />

            {/* Card wrapper with 3D parallax */}
            <motion.div
              initial={{ opacity: 0, x: 80, rotate: -6 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 80, rotate: isActive ? -1.5 : -6 }}
              transition={{ delay: 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              style={{
                perspective: 1200,
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: 520,
              }}
            >
              <motion.div style={{ rotateY, rotateX }}>
                <DashboardCard />
              </motion.div>

              {/* Chip 1: LMS LIVE (top-right) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', top: -14, right: -18, zIndex: 10,
                  backgroundColor: C.panel,
                  border: `1px solid ${C.line2}`,
                  borderRadius: 40, padding: '7px 13px',
                  display: 'flex', alignItems: 'center', gap: 7,
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.6, 1], opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: C.green }}
                />
                <span style={{ fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '0.2em', color: C.ivory }}>
                  LMS LIVE
                </span>
              </motion.div>

              {/* Chip 2: 30-DAY DELIVERY (bottom-left) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                style={{
                  position: 'absolute', bottom: -12, left: -16, zIndex: 10,
                  backgroundColor: C.fireLo,
                  border: `1px solid ${C.fireMid}`,
                  borderRadius: 40, padding: '7px 13px',
                }}
              >
                <span style={{ fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '0.15em', color: C.fire }}>
                  30-DAY DELIVERY
                </span>
              </motion.div>

              {/* Chip 3: Language chip (left-side) */}
              <motion.div
                animate={{ x: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                style={{
                  position: 'absolute', left: -22, top: '40%', zIndex: 10,
                  backgroundColor: C.bronzeLo,
                  border: `1px solid rgba(201,169,110,0.2)`,
                  borderRadius: 40, padding: '7px 13px',
                }}
              >
                <span style={{ fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '0.12em', color: C.bronze }}>
                  ARABIC · اردو · EN
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          style={{
            position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 2,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-accent)', fontSize: 9,
              letterSpacing: '0.4em', color: C.dim,
            }}
          >
            SCROLL
          </span>
          <div style={{ width: 1, height: 20, overflow: 'hidden', position: 'relative' }}>
            <div className="scroll-line-anim" />
          </div>
        </motion.div>
      </section>
    </>
  );
}
