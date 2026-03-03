'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const PROJECTS = [
  {
    category: 'MOODLE LMS · ARABIC RTL · KARACHI',
    outcome: ['1,200 students.', 'Online. In 8 weeks.'],
    stats: [{ n: '8 wks', l: 'Delivery' }, { n: '1,200', l: 'Students' }, { n: '100%', l: 'Arabic RTL' }],
    name: 'Al-Noor Academy',
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1400&q=80',
  },
  {
    category: '2D ANIMATION · URDU CONTENT · LAHORE',
    outcome: ['24 animated episodes.', 'One publisher. One semester.'],
    stats: [{ n: '24', l: 'Episodes' }, { n: '2D+3D', l: 'Production' }, { n: '3', l: 'Languages' }],
    name: 'NFPE Curriculum Series',
    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1400&q=80',
  },
  {
    category: 'SCHOOL ERP · iOS + ANDROID · KARACHI',
    outcome: ['2,400 students managed.', 'One system. Zero paper.'],
    stats: [{ n: '2,400', l: 'Students' }, { n: '8', l: 'Modules' }, { n: '30d', l: 'Delivery' }],
    name: 'SchoolOS — Beaconhouse',
    img: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1400&q=80',
  },
];

export default function RecentWork() {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef   = useRef<HTMLDivElement>(null);
  const [active, setActive]     = useState(0);
  const [hovPanel, setHovPanel] = useState(-1);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const max  = el.offsetHeight - window.innerHeight;
      const p    = Math.max(0, Math.min(1, -rect.top / max));
      if (trackRef.current) trackRef.current.style.transform = `translateX(${-p * 66.6667}%)`;
      if (barRef.current)   barRef.current.style.width = `${p * 100}%`;
      const next = Math.min(2, Math.floor(p * 3));
      setActive(a => a === next ? a : next);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Section entry line */}
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: .6, ease: 'easeOut' }}
        style={{ height: 2, background: '#E8622A', transformOrigin: 'left' }}
      />
      <style dangerouslySetInnerHTML={{ __html: `@keyframes rwKB{0%{transform:scale(1)}100%{transform:scale(1.06)}}` }} />

      {/* 400 vh outer — gives 300 vh of scrollable range for 3 panels */}
      <div ref={wrapRef} style={{ height: '400vh', position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#050505' }}>

          {/* Progress bar (top, after left column) */}
          <div style={{ position: 'absolute', top: 0, left: 260, right: 0, height: 2, background: '#111', zIndex: 10 }}>
            <div ref={barRef} style={{ height: '100%', width: '0%', background: '#E8622A', transition: 'width .08s linear' }} />
          </div>

          {/* Left fixed column */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 260, background: '#050505', zIndex: 7, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', padding: '52px 0', borderRight: '1px solid #141414' }}>
            <div style={{ fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '.4em', color: '#3a3530' }}>05</div>
            <div style={{ fontFamily: 'var(--font-accent)', fontSize: 156, lineHeight: 1, color: '#111', writingMode: 'vertical-rl', transform: 'rotate(180deg)', userSelect: 'none', letterSpacing: '.04em' }}>WORK</div>
            <div style={{ fontFamily: 'var(--font-accent)', fontSize: 13, letterSpacing: '.2em', color: '#E8622A' }}>{active + 1} / 3</div>
          </div>

          {/* Horizontal track — 300% wide, each panel = 33.33% = 1 container width */}
          <div style={{ position: 'absolute', top: 0, left: 260, right: 0, bottom: 0, overflow: 'hidden' }}>
            <div ref={trackRef} style={{ display: 'flex', height: '100%', width: '300%', willChange: 'transform' }}>
              {PROJECTS.map((proj, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHovPanel(idx)}
                  onMouseLeave={() => setHovPanel(-1)}
                  style={{ flex: '0 0 33.333%', height: '100%', display: 'flex' }}
                >
                  {/* Left 55% — image with diagonal cut */}
                  <div style={{ flex: '0 0 55%', position: 'relative' }}>
                    {/* Clipped image */}
                    <div style={{ position: 'absolute', inset: 0, clipPath: 'polygon(0 0, 88% 0, 100% 100%, 0 100%)', overflow: 'hidden' }}>
                      <div style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: `url('${proj.img}')`,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        filter: active === idx ? 'saturate(1) brightness(.65)' : 'saturate(.45) brightness(.5)',
                        transition: 'filter .4s ease',
                        animation: 'rwKB 8s ease-in-out infinite alternate',
                      }} />
                    </div>
                    {/* SVG diagonal glow line — matches clip-path edge */}
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3 }}>
                      <defs>
                        <filter id={`glow${idx}`}>
                          <feGaussianBlur stdDeviation=".4" result="b" />
                          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                      </defs>
                      <line x1="88" y1="0" x2="100" y2="100" stroke="#E8622A" strokeWidth=".18" filter={`url(#glow${idx})`} />
                    </svg>
                    {/* Dark feather at right edge (fills triangle gap) */}
                    <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '14%', background: 'linear-gradient(to right, transparent, #050505)', pointerEvents: 'none', zIndex: 2 }} />
                    {/* Grain overlay */}
                    <div style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='.025'/%3E%3C/svg%3E\")", pointerEvents: 'none', zIndex: 1 }} />
                  </div>

                  {/* Right 45% — content */}
                  <div style={{ flex: 1, background: '#050505', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 7% 0 5%' }}>
                    {/* Zone 1 — Category stamp */}
                    <div style={{ fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '.4em', color: '#E8622A', marginBottom: 36 }}>
                      {proj.category}
                    </div>
                    {/* Zone 2 — Outcome headline */}
                    <div style={{ marginBottom: 40 }}>
                      {proj.outcome.map((line, li) => (
                        <div key={li} style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(32px,4vw,64px)', lineHeight: 1.07, letterSpacing: '-.025em', color: '#F0EBE3' }}>{line}</div>
                      ))}
                    </div>
                    {/* Zone 3 — Stats row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', paddingTop: 28, borderTop: '1px solid #1a1a1a', marginBottom: 36 }}>
                      {proj.stats.map((s, si) => (
                        <React.Fragment key={si}>
                          {si > 0 && <div style={{ width: 1, background: '#222', alignSelf: 'stretch', margin: '0 28px' }} />}
                          <div>
                            <div style={{ fontFamily: 'var(--font-accent)', fontSize: 34, lineHeight: 1, color: '#E8622A' }}>{s.n}</div>
                            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: '#4a4540', marginTop: 5 }}>{s.l}</div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                    {/* Zone 4 — Project name + hover link */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 13, color: '#3a3530' }}>{proj.name}</div>
                      <Link href="/portfolio" data-cursor="view" style={{
                        fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 13, color: '#E8622A',
                        textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
                        opacity: hovPanel === idx ? 1 : 0,
                        transform: hovPanel === idx ? 'translateX(0)' : 'translateX(-10px)',
                        transition: 'opacity .25s, transform .25s',
                      }}>View Case <span>→</span></Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Beneath the pinned section */}
      <div style={{ background: '#050505', borderTop: '1px solid #141414', padding: '22px 6%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#3a3530' }}>Showing 3 of 50+ completed projects</span>
        <Link href="/portfolio" data-cursor="view" style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 12, color: '#E8622A', textDecoration: 'none' }}>View All Work →</Link>
      </div>
    </>
  );
}
