'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const STEPS = [
  {
    ghost: 'DAY 1',
    title: 'Discover.',
    desc: 'You tell us everything about your institution in one focused 60-minute call. We do the discovery. You just show up.',
    deliverables: ['Full institutional audit documented', 'Scope and architecture confirmed', 'Fixed-price proposal in your inbox'],
  },
  {
    ghost: 'DAY 4',
    title: 'Design.',
    desc: 'You see the full visual direction, architecture, and scope before a single line of code is written. Nothing surprises you.',
    deliverables: ['High-fidelity mockups signed off', 'Arabic / Urdu RTL previewed', 'Development sprint started'],
  },
  {
    ghost: 'DAY 11',
    title: 'Build.',
    desc: 'You get a live preview link every 5 days. You\'re never in the dark. We test in English and Arabic — both.',
    deliverables: ['Live staging link shared every 5 days', 'Bi-weekly feedback loops', 'Full device & browser QA'],
  },
  {
    ghost: 'DAY 27',
    title: 'Yours.',
    desc: 'It goes live. Your staff are trained. The documentation is in your hands. We stay available for 30 days after.',
    deliverables: ['Staff onboarding session included', 'Full documentation handed over', '30-day post-launch support'],
  },
];

const STEP_VARIANTS = {
  enter: { opacity: 0, y: 28 },
  active: { opacity: 1, y: 0 },
  exit:  { opacity: 0, y: -20 },
};

const DELIV_VARIANTS = {
  hidden: { opacity: 0, y: 16 },
  show:   (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 + 0.2, duration: 0.4, ease: 'easeOut' } }),
};

export default function HowWeWork() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);
  const [step, setStep]  = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const max  = el.offsetHeight - window.innerHeight;
      const p    = Math.max(0, Math.min(1, -rect.top / max));
      // 5 segments (steps 0-3 + guarantee)
      const next = Math.min(4, Math.floor(p * 5));
      setStep(s => s === next ? s : next);
      if (lineRef.current) {
        const fill = Math.min(100, Math.floor(p * 5) <= 3 ? ((Math.floor(p * 5)) / 4) * 100 : 100);
        lineRef.current.style.height = `${fill}%`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isGuarantee = step >= 4;
  const current = STEPS[Math.min(3, step)];

  return (
    <>
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: .6, ease: 'easeOut' }}
        style={{ height: 2, background: '#E8622A', transformOrigin: 'left' }}
      />

      {/* 600 vh outer = 100vh sticky + 500vh scrollable = 5 steps × 100vh each */}
      <div ref={wrapRef} style={{ height: '600vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', background: '#020202', overflow: 'hidden' }}>

          {/* Grain */}
          <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='.022'/%3E%3C/svg%3E\")", pointerEvents: 'none', zIndex: 0 }} />

          <AnimatePresence mode="wait">
            {isGuarantee ? (
              /* ── Guarantee panel ── */
              <motion.div
                key="guarantee"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: .5 }}
                style={{ position: 'absolute', inset: 0, background: '#E8622A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 10%', zIndex: 2 }}
              >
                <div style={{ fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '.4em', color: 'rgba(0,0,0,.5)', marginBottom: 40 }}>THE GUARANTEE</div>
                <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 700, fontSize: 'clamp(28px,4vw,56px)', lineHeight: 1.2, letterSpacing: '-.02em', color: '#020202', textAlign: 'center', maxWidth: 900, marginBottom: 28 }}>
                  &ldquo;If we miss the deadline — for any reason that&apos;s our fault — you get one free month of maintenance.&rdquo;
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(0,0,0,.55)', textAlign: 'center' }}>
                  We&apos;ve never triggered this clause. We intend to keep it that way.
                </div>
                <Link href="/contact" data-cursor="cta"
                  style={{ marginTop: 56, display: 'inline-flex', alignItems: 'center', gap: 10, background: '#020202', color: '#E8622A', padding: '14px 32px', fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 14, textDecoration: 'none', letterSpacing: '.04em' }}>
                  Start Your 30-Day Build <span>→</span>
                </Link>
              </motion.div>
            ) : (
              /* ── Step panel ── */
              <motion.div
                key={step}
                variants={STEP_VARIANTS}
                initial="enter" animate="active" exit="exit"
                transition={{ duration: .45, ease: 'easeOut' }}
                style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', zIndex: 2 }}
              >
                {/* Ghost day number */}
                <div aria-hidden style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-accent)', fontSize: 'clamp(160px,22vw,300px)', color: '#0f0f0f', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}>
                  {current.ghost}
                </div>

                <div style={{ width: '100%', maxWidth: 1440, margin: '0 auto', padding: '0 6% 0 calc(6% + 40px)', display: 'grid', gridTemplateColumns: '40% 60%', gap: 80, alignItems: 'center', position: 'relative', zIndex: 1 }}>
                  {/* Left column */}
                  <div>
                    {/* Step node */}
                    <div style={{ width: 56, height: 56, border: '1px solid #E8622A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 36 }}>
                      <span style={{ fontFamily: 'var(--font-accent)', fontSize: 22, color: '#E8622A' }}>0{step + 1}</span>
                    </div>
                    {/* Step title */}
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(44px,6vw,80px)', lineHeight: .96, letterSpacing: '-.03em', color: '#F0EBE3' }}>
                      {current.title}
                    </div>
                    {/* Progress dots */}
                    <div style={{ display: 'flex', gap: 8, marginTop: 40 }}>
                      {STEPS.map((_, i) => (
                        <div key={i} style={{ width: i === step ? 20 : 6, height: 2, background: i === step ? '#E8622A' : '#222', borderRadius: 1, transition: 'width .3s, background .3s' }} />
                      ))}
                    </div>
                  </div>

                  {/* Right column */}
                  <div>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.8, color: '#7a7268', marginBottom: 40, maxWidth: 560 }}>
                      {current.desc}
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {current.deliverables.map((d, i) => (
                        <motion.div
                          key={`${step}-${i}`}
                          custom={i}
                          variants={DELIV_VARIANTS}
                          initial="hidden"
                          animate="show"
                          style={{ display: 'flex', alignItems: 'center', gap: 14 }}
                        >
                          <span style={{ color: '#E8622A', fontSize: 14, flexShrink: 0 }}>✓</span>
                          <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 13, color: '#F0EBE3' }}>{d}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Left orange progress line */}
          <div style={{ position: 'absolute', left: '6%', top: 0, bottom: 0, width: 2, background: '#1a1a1a', zIndex: 3 }}>
            <div ref={lineRef} style={{ width: '100%', height: '0%', background: '#E8622A', transition: 'height .4s ease' }} />
          </div>

          {/* Section label */}
          <div style={{ position: 'absolute', top: 48, right: '6%', fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '.4em', color: '#2a2a2a', zIndex: 4 }}>06 — HOW WE WORK</div>
        </div>
      </div>
    </>
  );
}
