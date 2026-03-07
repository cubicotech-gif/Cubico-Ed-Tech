"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const STATS = [
  {
    number: '80%',
    label: 'Less Admin Time',
    description: 'Institutions cut manual paperwork by 80% after switching to Cubico\'s unified management platform.',
    icon: '⚡',
  },
  {
    number: '3×',
    label: 'More Engagement',
    description: 'Students engage 3× more when static textbooks become animated, game-based learning experiences.',
    icon: '🎮',
  },
  {
    number: '100%',
    label: 'Parent Visibility',
    description: 'Every parent gets real-time access to attendance, grades, progress, and daily announcements.',
    icon: '👨‍👩‍👧',
  },
  {
    number: '4 wks',
    label: 'Time to Launch',
    description: 'From your first conversation to a fully live, trained system — in four weeks or less.',
    icon: '🚀',
  },
];

function StatCard({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E4E4E7',
        borderRadius: 16,
        padding: '32px 28px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'box-shadow 0.25s, transform 0.25s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(249,115,22,0.1)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      {/* Orange top accent bar */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 3,
          background: 'linear-gradient(90deg, #F97316, #FBBF24)',
          borderRadius: '16px 16px 0 0',
        }}
      />

      {/* Icon */}
      <div
        style={{
          width: 44, height: 44, borderRadius: 12,
          backgroundColor: 'rgba(249,115,22,0.08)',
          border: '1px solid rgba(249,115,22,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, marginBottom: 20,
        }}
      >
        {stat.icon}
      </div>

      {/* Big number */}
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(44px, 5vw, 58px)',
          fontWeight: 700, color: '#18181B',
          lineHeight: 1, marginBottom: 6,
          letterSpacing: '-0.03em',
        }}
      >
        {stat.number}
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
          color: '#F97316', textTransform: 'uppercase', letterSpacing: '0.08em',
          marginBottom: 12,
        }}
      >
        {stat.label}
      </div>

      <p
        style={{
          fontFamily: 'var(--font-body)', fontSize: 14,
          color: '#71717A', lineHeight: 1.7, margin: 0,
        }}
      >
        {stat.description}
      </p>
    </motion.div>
  );
}

export default function ImpactNumbers() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  return (
    <section id="results" style={{ backgroundColor: '#FAFAF8', padding: '96px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>

        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
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
            Real Impact
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(30px, 4vw, 48px)',
              fontWeight: 700, color: '#18181B',
              margin: '0 0 16px', letterSpacing: '-0.025em',
            }}
          >
            Numbers that speak for themselves.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)', fontSize: 17,
              color: '#71717A', maxWidth: 500,
              margin: '0 auto', lineHeight: 1.7,
            }}
          >
            Every metric comes from real institutions that made the switch to Cubico.
          </p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 20,
          }}
        >
          {STATS.map((stat, i) => <StatCard key={stat.label} stat={stat} index={i} />)}
        </div>
      </div>
    </section>
  );
}
