'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { LMSApp } from './LMSApp';
import { ERPApp } from './ERPApp';
import { WebsiteApp } from './WebsiteApp';
import { AnimationApp } from './AnimationApp';

const APPS = [
  { id: 'lms', label: 'LMS Platform', icon: '🎓', tag: 'E-Learning' },
  { id: 'erp', label: 'School ERP', icon: '⚙️', tag: 'Management' },
  { id: 'website', label: 'School Website', icon: '🌐', tag: 'Web Portal' },
  { id: 'animation', label: 'Animation Studio', icon: '🎬', tag: 'Content' },
] as const;

type AppId = typeof APPS[number]['id'];

const APP_DESCRIPTIONS: Record<AppId, { headline: string; body: string; stat: string; statLabel: string; hints: string[] }> = {
  lms: {
    headline: 'Full Learning Management System',
    body: 'Navigate courses, view student rosters, check grades and mark daily attendance — all from one dashboard. This is a live, working system.',
    stat: '155',
    statLabel: 'Students enrolled',
    hints: ['Click a course row', 'Switch to Attendance', 'Mark students P/A'],
  },
  erp: {
    headline: 'School ERP — All Operations',
    body: 'Record fee payments with validation, enrol new students with auto-generated IDs, manage staff records and generate reports.',
    stat: 'PKR 1.2L',
    statLabel: 'Monthly fee managed',
    hints: ['Fill the fee form', 'Enrol a student', 'Toggle report types'],
  },
  website: {
    headline: 'Public-Facing School Website',
    body: 'A fully navigable school website with hero, about, academics, admissions form and an online fee payment modal with multiple methods.',
    stat: '5',
    statLabel: 'Pages, all interactive',
    hints: ['Submit the admissions form', 'Click Pay Online', 'Switch payment methods'],
  },
  animation: {
    headline: 'Animated Content Studio',
    body: 'A CSS-animated solar system player with scrubable timeline, play/pause, episode switching and real-time progress tracking.',
    stat: '4K',
    statLabel: 'SCORM-ready content',
    hints: ['Press Play', 'Click the timeline to scrub', 'Switch episodes'],
  },
};

const STATS = [
  { number: '4', label: 'LIVE SYSTEMS', sub: 'LMS · ERP · Website · Studio' },
  { number: '30', label: 'DAY DELIVERY', sub: 'From brief to live deployment' },
  { number: '3', label: 'LANGUAGES', sub: 'English · اردو · العربية' },
  { number: '50+', label: 'PROJECTS', sub: 'Every one custom-built' },
];

export default function ExperienceLab() {
  const [activeApp, setActiveApp] = useState<AppId>('lms');
  const prefersReducedMotion = useReducedMotion();
  const desc = APP_DESCRIPTIONS[activeApp];

  return (
    <section
      style={{
        background: 'var(--bg-subtle)',
        padding: '130px 0 0',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--line)',
      }}
    >
      {/* Grain overlay */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.015, pointerEvents: 'none', zIndex: 0 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="exp-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#exp-grain)" />
      </svg>

      {/* Ambient glows */}
      <div aria-hidden="true" style={{ position: 'absolute', top: -150, right: -100, width: 500, height: 500, background: 'radial-gradient(circle, rgba(26,107,255,0.12) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div aria-hidden="true" style={{ position: 'absolute', bottom: -100, left: -80, width: 400, height: 400, background: 'radial-gradient(circle, rgba(201,169,110,0.03) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

      {/* Section entry line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--blue)', transformOrigin: 'left', zIndex: 1 }}
      />

      {/* Max-width container */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1440, margin: '0 auto', padding: '0 6%' }}>

        {/* ── Section Header ── */}
        <div style={{ marginBottom: 56 }}>
          {/* Eyebrow */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}
          >
            <div style={{ width: 28, height: 1, background: 'var(--blue)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 11, color: 'var(--gold)', letterSpacing: '0.4em' }}>
              04 — EXPERIENCE OUR WORK
            </span>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'end', gap: 60 }}>
            <h2 style={{ margin: 0, fontSize: 'clamp(44px, 5.5vw, 80px)', lineHeight: 0.92 }}>
              {[
                { text: 'Not a demo.', weight: 400, style: 'italic' as const, fontFamily: 'var(--font-editorial)', color: 'var(--text-muted)', delay: 0 },
                { text: 'The real thing.', weight: 400, style: 'normal' as const, fontFamily: 'var(--font-display)', color: 'var(--text-primary)', delay: 0.12, letterSpacing: '-0.03em' },
                { text: 'Working. Right now.', weight: 400, style: 'italic' as const, fontFamily: 'var(--font-display)', color: 'var(--blue)', delay: 0.24 },
              ].map((line, i) => (
                <div key={i} style={{ overflow: 'hidden', display: 'block' }}>
                  <motion.span
                    initial={prefersReducedMotion ? {} : { y: '110%' }}
                    whileInView={prefersReducedMotion ? {} : { y: '0%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: line.delay }}
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

            <motion.div
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              style={{ maxWidth: 340, textAlign: 'right' }}
            >
              <p style={{ fontFamily: 'var(--font-ui)', fontWeight: 400, fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8, margin: '0 0 16px 0' }}>
                Four complete systems — LMS, ERP, Website, Animation Studio — fully interactive, running live below.
                Click through. Use the forms. This is what we build for your school.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
                <div
                  className="symptom-pulse"
                  style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 6px rgba(13,184,122,0.5)' }}
                />
                <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.25em', color: 'var(--green)' }}>
                  LIVE SYSTEMS
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── App Tabs ── */}
        <div style={{ display: 'flex', gap: 1, background: 'var(--line)', marginBottom: 1 }}>
          {APPS.map((app) => (
            <button
              key={app.id}
              onClick={() => setActiveApp(app.id)}
              style={{
                flex: 1,
                background: 'var(--bg-base)',
                border: 'none',
                borderTop: activeApp === app.id ? '2px solid var(--blue)' : '2px solid transparent',
                padding: '10px 8px',
                cursor: 'pointer',
                transition: 'background 200ms, border-color 200ms',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <span style={{ fontSize: 14 }}>{app.icon}</span>
              <span style={{
                fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 9, letterSpacing: '0.06em',
                color: activeApp === app.id ? 'var(--blue)' : 'var(--text-muted)',
                whiteSpace: 'nowrap',
              }}>{app.label}</span>
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 7, letterSpacing: '0.15em', color: 'var(--text-dim)' }}>{app.tag}</span>
            </button>
          ))}
        </div>

        {/* ── Main Stage: sidebar + app ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            height: 520,
            background: 'var(--bg-subtle)',
            border: '1px solid var(--line2)',
            overflow: 'hidden',
          }}
        >
          {/* Left sidebar */}
          <div
            style={{
              background: 'var(--bg-base)',
              borderRight: '1px solid var(--line)',
              padding: '24px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              overflow: 'auto',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 18, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 10 }}>
                {desc.headline}
              </div>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: 'var(--text-body)', lineHeight: 1.7, margin: 0 }}>
                {desc.body}
              </p>
            </div>

            {/* Hints */}
            <div>
              <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 8, letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: 8 }}>
                Try These
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {desc.hints.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ color: 'var(--blue)', fontSize: 10, flexShrink: 0, marginTop: 1 }}>→</span>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'var(--text-body)', lineHeight: 1.5 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stat */}
            <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--line)' }}>
              <div style={{ fontFamily: 'var(--font-stamp)', fontSize: 36, color: 'var(--blue)', lineHeight: 1 }}>
                {desc.stat}
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4 }}>
                {desc.statLabel}
              </div>
            </div>
          </div>

          {/* Right: app panel */}
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            {activeApp === 'lms' && <LMSApp />}
            {activeApp === 'erp' && <ERPApp />}
            {activeApp === 'website' && <WebsiteApp />}
            {activeApp === 'animation' && <AnimationApp />}
          </div>
        </div>

        {/* ── CTA Bar ── */}
        <div
          style={{
            marginTop: 24,
            background: 'var(--bg-dark)',
            border: '1px solid var(--dark-line2)',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
          }}
        >
          <div>
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--dark-text-body)', margin: 0, lineHeight: 1.6 }}>
              Everything above, live on your domain — in 30 days.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <a
              href="#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--blue)', color: '#fff', padding: '12px 28px',
                borderRadius: 2, fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 13,
                letterSpacing: '0.04em', textDecoration: 'none', whiteSpace: 'nowrap',
              }}
            >
              Start Your Project →
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 11,
                color: 'var(--dark-text-muted)', textDecoration: 'none',
                borderBottom: '1px solid rgba(201,169,110,0.3)', paddingBottom: 1,
                whiteSpace: 'nowrap',
              }}
            >
              Talk to us first
            </a>
          </div>
        </div>

      </div>

      {/* ── Stats Strip ── */}
      <div style={{ marginTop: 80, borderTop: '1px solid var(--line)', background: 'var(--bg-subtle)', padding: '40px 0' }}>
        <div
          style={{
            maxWidth: 1440, margin: '0 auto', padding: '0 6%',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1, background: 'var(--line)',
          }}
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              style={{ background: 'var(--bg-base)', padding: '28px 32px' }}
            >
              <div style={{ fontFamily: 'var(--font-stamp)', fontSize: 48, color: 'var(--blue)', lineHeight: 1 }}>{stat.number}</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '0.15em', color: 'var(--text-muted)', marginTop: 6, textTransform: 'uppercase' }}>{stat.label}</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 400, fontSize: 11, color: 'var(--text-dim)', lineHeight: 1.6, marginTop: 6 }}>{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
