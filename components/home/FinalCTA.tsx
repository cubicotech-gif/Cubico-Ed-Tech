'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const HEADLINE = [
  { text: "Let's build",  weight: 900, style: 'normal', color: '#F0EBE3' },
  { text: 'something',   weight: 300, style: 'italic',  color: '#C9A96E' },
  { text: 'extraordinary.', weight: 900, style: 'normal', color: '#E8622A' },
];

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef    = useRef<HTMLDivElement>(null);
  const [btnHov, setBtnHov] = useState(false);
  const [waBtnHov, setWaBtnHov] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const glow    = glowRef.current;
    if (!section || !glow) return;
    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow.style.background = `radial-gradient(500px circle at ${x}px ${y}px, rgba(232,98,42,0.04), transparent 70%)`;
    };
    section.addEventListener('mousemove', onMove);
    return () => section.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: .6, ease: 'easeOut' }}
        style={{ height: 2, background: '#E8622A', transformOrigin: 'left' }}
      />
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes ctaPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.4);opacity:.6}}
        @keyframes ctaUnderline{from{transform:scaleX(0)}to{transform:scaleX(1)}}
      ` }} />

      <section
        ref={sectionRef}
        style={{ position: 'relative', minHeight: '100vh', background: '#020202', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 6%', overflow: 'hidden' }}
      >
        {/* Mouse-follow radial glow */}
        <div ref={glowRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', transition: 'background .3s ease', zIndex: 0 }} />

        {/* Grain */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='.022'/%3E%3C/svg%3E\")", pointerEvents: 'none', zIndex: 0 }} />

        {/* Content stack */}
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

          {/* Availability signal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .5 }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block', animation: 'ctaPulse 2s ease-in-out infinite' }} />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: '#6a6460' }}>Currently accepting new projects · Q2 2026</span>
          </motion.div>

          {/* Headline — 3 staggered lines */}
          <div style={{ marginBottom: 24 }}>
            {HEADLINE.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: .6, delay: i * .12, ease: 'easeOut' }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: line.weight,
                  fontStyle: line.style as 'normal' | 'italic',
                  fontSize: 'clamp(52px,8vw,110px)',
                  lineHeight: .95,
                  letterSpacing: '-.03em',
                  color: line.color,
                  display: 'block',
                }}
              >
                {line.text}
              </motion.div>
            ))}
          </div>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .5, delay: .4 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#6a6460', lineHeight: 1.75, maxWidth: 480, margin: '0 0 40px' }}
          >
            Tell us what you need. We respond within 24 hours with a clear plan and a fixed price. No upfront fees. No surprises.
          </motion.p>

          {/* Primary CTA button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: .5, delay: .5 }}
            style={{ marginBottom: 20 }}
          >
            <Link href="/contact" data-cursor="cta"
              onMouseEnter={() => setBtnHov(true)}
              onMouseLeave={() => setBtnHov(false)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: '#E8622A', color: '#fff',
                width: 280, height: 56, justifyContent: 'center',
                fontFamily: 'var(--font-ui)', fontWeight: 800, fontSize: 15, letterSpacing: '.04em',
                textDecoration: 'none',
                boxShadow: btnHov ? '0 0 40px 0 rgba(232,98,42,0.35)' : '0 0 0 0 rgba(232,98,42,0.4)',
                transition: 'box-shadow .3s ease, background .2s',
              }}
            >
              Start Your Project
              <span style={{ transform: btnHov ? 'translateX(6px)' : 'translateX(0)', transition: 'transform .2s ease', display: 'inline-block' }}>→</span>
            </Link>
          </motion.div>

          {/* Secondary options */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: .5, delay: .6 }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'var(--font-body)', fontSize: 13, color: '#4a4540' }}
          >
            <a href="/contact" style={{ color: '#4a4540', textDecoration: 'underline', textDecorationColor: 'transparent', textUnderlineOffset: 3, transition: 'color .2s, text-decoration-color .2s', cursor: 'pointer' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#c8c2ba'; (e.currentTarget as HTMLElement).style.textDecorationColor = '#c8c2ba'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#4a4540'; (e.currentTarget as HTMLElement).style.textDecorationColor = 'transparent'; }}>
              Book a free 30-min call
            </a>
            <span style={{ color: '#2a2a2a' }}>·</span>
            <a
              href="https://wa.me/923001234567"
              target="_blank" rel="noopener noreferrer"
              onMouseEnter={() => setWaBtnHov(true)}
              onMouseLeave={() => setWaBtnHov(false)}
              style={{ color: waBtnHov ? '#c8c2ba' : '#5a5450', textDecoration: 'underline', textDecorationColor: waBtnHov ? '#c8c2ba' : 'transparent', textUnderlineOffset: 3, transition: 'all .2s', cursor: 'pointer' }}
            >
              Message us on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
