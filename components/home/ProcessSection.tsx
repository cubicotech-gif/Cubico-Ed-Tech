'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    icon: '📞',
    title: 'Discovery Call',
    description: 'Free 30-minute consultation — no pitch, just listening. We learn your challenges, goals, and vision before suggesting anything.',
    time: '30 min',
  },
  {
    num: '02',
    icon: '📋',
    title: 'Custom Roadmap',
    description: 'A clear plan with scope, timelines, and deliverables you can share with your board. Every step defined before we start.',
    time: '3–5 days',
  },
  {
    num: '03',
    icon: '⚡',
    title: 'Build & Train',
    description: "Our dedicated team develops, deploys, and trains your staff on-site or remotely. We don't leave until everyone is confident.",
    time: '2–8 weeks',
  },
  {
    num: '04',
    icon: '🛡️',
    title: 'Ongoing Growth',
    description: '24/7 support, one month free after launch, continuous content updates. We grow with your institution long-term.',
    time: 'Ongoing',
  },
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  return (
    <section id="process" style={{ backgroundColor: '#FFF8F0', padding: '96px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>

        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
              color: '#F97316', letterSpacing: '0.12em', textTransform: 'uppercase',
              backgroundColor: 'rgba(249,115,22,0.07)',
              border: '1px solid rgba(249,115,22,0.18)',
              borderRadius: 100, padding: '4px 14px', marginBottom: 16,
            }}
          >
            How It Works
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 700, color: '#18181B', margin: '0 0 16px', letterSpacing: '-0.025em' }}>
            From conversation to transformation.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: '#71717A', maxWidth: 460, margin: '0 auto', lineHeight: 1.7 }}>
            Simple, clear, and built around your institution's real timeline and readiness.
          </p>
        </motion.div>

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 0,
            position: 'relative',
          }}
        >
          {/* Connecting line (desktop, hidden on small screens) */}
          <div
            style={{
              position: 'absolute', top: 27, left: '12%', right: '12%', height: 1,
              background: 'linear-gradient(90deg, #F97316 0%, rgba(249,115,22,0.15) 100%)',
              zIndex: 0,
            }}
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                textAlign: 'center', padding: '0 20px', position: 'relative', zIndex: 1,
              }}
            >
              {/* Circle */}
              <div
                style={{
                  width: 54, height: 54, borderRadius: '50%',
                  backgroundColor: i === 0 ? '#F97316' : '#FFFFFF',
                  border: `2px solid ${i === 0 ? '#F97316' : '#E4E4E7'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, marginBottom: 24,
                  boxShadow: i === 0 ? '0 8px 24px rgba(249,115,22,0.35)' : '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                {step.icon}
              </div>

              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, color: '#F97316', letterSpacing: '0.1em', marginBottom: 8 }}>
                STEP {step.num}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 19, fontWeight: 700, color: '#18181B', margin: '0 0 10px', letterSpacing: '-0.01em' }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#71717A', lineHeight: 1.7, margin: '0 0 12px' }}>
                {step.description}
              </p>
              <span
                style={{
                  fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600,
                  color: '#F97316', backgroundColor: 'rgba(249,115,22,0.07)',
                  border: '1px solid rgba(249,115,22,0.2)',
                  borderRadius: 100, padding: '3px 10px',
                }}
              >
                {step.time}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
