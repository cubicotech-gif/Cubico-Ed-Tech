'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    icon: '📞',
    title: 'Discovery',
    description: 'Free consultation. We learn your challenges, goals, and vision. No pitch — just listening.',
  },
  {
    num: '02',
    icon: '📋',
    title: 'Roadmap',
    description: 'Custom plan with clear scope, timelines, and deliverables you can share with your team.',
  },
  {
    num: '03',
    icon: '⚡',
    title: 'Build & Train',
    description: 'Dedicated team develops, deploys, and trains your staff until everyone is confident.',
  },
  {
    num: '04',
    icon: '🛡️',
    title: 'Grow',
    description: '24/7 support. One month free. Content updates. We grow with your institution.',
  },
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="process" style={{ backgroundColor: '#0C1528', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>
        <div style={{ marginBottom: 64 }}>
          <p style={{
            fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
            color: '#818CF8', letterSpacing: '0.12em', textTransform: 'uppercase',
            margin: '0 0 16px',
          }}>
            PROCESS
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700, color: '#E2E8F0',
            margin: 0, letterSpacing: '-0.02em',
          }}>
            From conversation to transformation.
          </h2>
        </div>

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 40,
          }}
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                backgroundColor: '#101E32',
                border: '2px solid rgba(79,70,229,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 26, marginBottom: 24,
                boxShadow: '0 0 20px rgba(79,70,229,0.2)',
              }}>
                {step.icon}
              </div>

              <div style={{
                fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700,
                color: '#4F46E5', letterSpacing: '0.12em', marginBottom: 10,
              }}>
                STEP {step.num}
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700,
                color: '#E2E8F0', margin: '0 0 12px',
              }}>
                {step.title}
              </h3>

              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 15,
                color: '#64748B', lineHeight: 1.7, margin: 0,
              }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
