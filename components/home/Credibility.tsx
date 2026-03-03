'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { target: 50, suffix: '+', label: 'Projects Delivered',  sub: 'Pakistan · GCC · UK' },
  { target: 3,  suffix: '',  label: 'Languages Supported', sub: 'English · اردو · العربية' },
  { target: 30, suffix: '',  label: 'Day Delivery',        sub: 'Standard projects, guaranteed' },
  { target: 100,suffix: '%', label: 'Custom Built',        sub: 'No templates. Ever.' },
];

const INSTITUTIONS = [
  'Al-Noor Academy', 'Beaconhouse Network', 'NFPE Pakistan', 'Roots Millennium',
  'City School', 'The Educators', 'Foundation University', 'Punjab Group',
  'Cedar College', 'Lahore Grammar School', 'Aga Khan School', 'Karachi Grammar',
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [val, setVal] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (!active || ran.current) return;
    ran.current = true;
    const dur  = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const ease = t < .5 ? 2*t*t : -1 + (4 - 2*t)*t;
      setVal(Math.round(ease * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target]);

  return <>{val}{suffix}</>;
}

export default function Credibility() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsActive(true); },
      { threshold: .3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: .6, ease: 'easeOut' }}
        style={{ height: 2, background: '#E8622A', transformOrigin: 'left' }}
      />
      <section style={{ background: '#050505', position: 'relative', overflow: 'hidden' }}>
        {/* Grain */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='.022'/%3E%3C/svg%3E\")", pointerEvents: 'none', zIndex: 0 }} />

        {/* ── A: The Numbers ── */}
        <div ref={statsRef} style={{ maxWidth: 1200, margin: '0 auto', padding: '120px 6%', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: .55, delay: i * .08 }}
                style={{ textAlign: 'center', padding: '0 24px' }}
              >
                <div style={{ fontFamily: 'var(--font-accent)', fontSize: 'clamp(72px,9vw,120px)', lineHeight: 1, color: '#F0EBE3', letterSpacing: '-.02em' }}>
                  <CountUp target={s.target} suffix={s.suffix} active={statsActive} />
                </div>
                <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', color: '#555', marginTop: 12 }}>{s.label}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#333', marginTop: 4, lineHeight: 1.5 }}>{s.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── B: The Testimonial ── */}
        <div style={{ background: '#080808', borderTop: '1px solid #141414', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: .6 }}
            style={{ maxWidth: 1200, margin: '0 auto', padding: '96px 6%', display: 'flex', gap: 0 }}
          >
            {/* 3px fire left border */}
            <div style={{ width: 3, background: '#E8622A', flexShrink: 0, borderRadius: 2, marginRight: 64, alignSelf: 'stretch' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(18px,2.2vw,26px)', lineHeight: 1.65, color: '#F0EBE3', maxWidth: 820, marginBottom: 40 }}>
                &ldquo;Cubico delivered our complete Moodle platform with full Arabic RTL in 6 weeks — with 1,200 students onboarded and every staff member trained. Every other agency we approached quoted 4 to 6 months. These people simply build.&rdquo;
              </div>
              {/* Attribution */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #C9A96E, #E8622A)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 14, color: '#fff' }}>AN</span>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 12, letterSpacing: '.15em', color: '#F0EBE3' }}>PRINCIPAL, AL-NOOR ACADEMY</div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, letterSpacing: '.1em', color: '#6a6460', marginTop: 2 }}>KARACHI, PAKISTAN</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── C: Institution name marquee ── */}
        <div style={{ background: '#060606', borderTop: '1px solid #1a1a1a', padding: '28px 0', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
          <style dangerouslySetInnerHTML={{ __html: `@keyframes credMarquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}` }} />
          <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'credMarquee 28s linear infinite', width: 'max-content' }}>
            {[...INSTITUTIONS, ...INSTITUTIONS].map((name, i) => (
              <React.Fragment key={i}>
                <span style={{ fontFamily: 'var(--font-accent)', fontSize: 13, letterSpacing: '.18em', color: '#2a2a2a', padding: '0 4px', userSelect: 'none' }}>{name}</span>
                <span style={{ color: '#E8622A', fontSize: 8, margin: '0 20px', alignSelf: 'center' }}>◆</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
