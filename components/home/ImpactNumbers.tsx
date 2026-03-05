'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  {
    label: 'Admin Efficiency',
    number: '80%',
    description: 'less time on manual processes when institutions switch to Cubico\'s unified management platform.',
    color: '#4F46E5',
  },
  {
    label: 'Student Engagement',
    number: '3×',
    description: 'more engagement when static textbooks become animated, gamified learning experiences.',
    color: '#7C3AED',
  },
  {
    label: 'Parent Connection',
    number: '100%',
    description: 'real-time visibility into attendance, grades, and progress.',
    color: '#06D6A0',
  },
  {
    label: 'Time to Launch',
    number: '4wk',
    description: 'from kickoff to fully operational system.',
    color: '#818CF8',
  },
];

function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        backgroundColor: '#0C1528',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 16,
        padding: '36px 32px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = `${stat.color}55`)}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)')}
    >
      {/* Top glow line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
        opacity: 0.6,
      }} />

      <div style={{
        fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600,
        color: stat.color, textTransform: 'uppercase' as const, letterSpacing: '0.1em',
        marginBottom: 12,
      }}>
        {stat.label}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)', fontSize: 'clamp(52px, 6vw, 72px)',
        fontWeight: 700, color: '#E2E8F0', lineHeight: 1, marginBottom: 16,
        background: `linear-gradient(135deg, #E2E8F0, ${stat.color})`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
      }}>
        {stat.number}
      </div>
      <p style={{
        fontFamily: 'var(--font-body)', fontSize: 15, color: '#64748B',
        lineHeight: 1.65, margin: 0,
      }}>
        {stat.description}
      </p>
    </motion.div>
  );
}

export default function ImpactNumbers() {
  return (
    <section id="results" style={{ backgroundColor: '#060A15', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <p style={{
            fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
            color: '#818CF8', letterSpacing: '0.12em', textTransform: 'uppercase' as const,
            margin: '0 0 16px',
          }}>
            IMPACT
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700, color: '#E2E8F0',
            margin: 0, letterSpacing: '-0.02em',
          }}>
            Real numbers. Real transformation.
          </h2>
        </div>

        {/* Stats grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 24,
        }}>
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
