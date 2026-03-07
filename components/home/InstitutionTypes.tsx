"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TYPES = [
  {
    icon: '🏫',
    title: 'Conventional Schools',
    subtitle: 'K-12 Education',
    description: 'Full management, animated curriculum, and parent portals tailored for mainstream schooling.',
    color: '#F97316',
    bg: 'rgba(249,115,22,0.06)',
    border: 'rgba(249,115,22,0.18)',
  },
  {
    icon: '🕌',
    title: 'Islamic Schools',
    subtitle: '& Madrassas',
    description: 'Native Arabic content, Islamic Studies modules, and Qur\'an curriculum with cultural accuracy.',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.06)',
    border: 'rgba(16,185,129,0.18)',
  },
  {
    icon: '🌍',
    title: 'International Schools',
    subtitle: 'IB & Cambridge',
    description: 'Multilingual platforms (English, Arabic, Urdu) with IB-aligned digital content and LMS.',
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.06)',
    border: 'rgba(59,130,246,0.18)',
  },
  {
    icon: '🎓',
    title: 'Higher Education',
    subtitle: 'Colleges & Universities',
    description: 'Moodle deployment, custom e-learning portals, and faculty management for tertiary institutions.',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.06)',
    border: 'rgba(139,92,246,0.18)',
  },
];

export default function InstitutionTypes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  return (
    <section style={{ backgroundColor: '#FAFAF8', padding: '96px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>

        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
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
            Who We Serve
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#18181B', margin: '0 0 16px', letterSpacing: '-0.025em' }}>
            Built for every institution.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#71717A', maxWidth: 440, margin: '0 auto', lineHeight: 1.7 }}>
            Whether you serve 200 students or 20,000, Cubico scales to your needs.
          </p>
        </motion.div>

        <div
          ref={ref}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 20 }}
        >
          {TYPES.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E4E4E7',
                borderRadius: 16,
                padding: '32px 24px',
                textAlign: 'center',
                transition: 'box-shadow 0.25s, transform 0.25s, border-color 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 36px ${t.color}12`;
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLElement).style.borderColor = t.border;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLElement).style.borderColor = '#E4E4E7';
              }}
            >
              <div
                style={{
                  width: 60, height: 60, borderRadius: '50%',
                  backgroundColor: t.bg, border: `1px solid ${t.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, margin: '0 auto 18px',
                }}
              >
                {t.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 16, fontWeight: 700, color: '#18181B', margin: '0 0 4px' }}>
                {t.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: t.color, fontWeight: 600, margin: '0 0 12px', letterSpacing: '0.02em' }}>
                {t.subtitle}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#71717A', lineHeight: 1.65, margin: 0 }}>
                {t.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
