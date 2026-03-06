"use client";


import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TYPES = [
  { icon: '🏫', title: 'Conventional Schools',  subtitle: 'K-12'               },
  { icon: '🕌', title: 'Islamic Schools',        subtitle: '& Madrassas'        },
  { icon: '🌍', title: 'International Schools',  subtitle: 'IB & Cambridge'     },
  { icon: '🎓', title: 'Higher Education',       subtitle: 'Colleges & Universities' },
];

export default function InstitutionTypes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ backgroundColor: '#0C1528', padding: '80px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 3.5vw, 44px)',
          fontWeight: 700, color: '#E2E8F0',
          margin: '0 0 48px', letterSpacing: '-0.02em',
          textAlign: 'center' as const,
        }}>
          Built for every institution.
        </h2>

        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 16,
          }}
        >
          {TYPES.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                backgroundColor: '#101E32',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16,
                padding: '32px 24px',
                textAlign: 'center' as const,
                transition: 'border-color 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,70,229,0.4)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 16 }}>{t.icon}</div>
              <h3 style={{
                fontFamily: 'var(--font-ui)', fontSize: 16, fontWeight: 600,
                color: '#E2E8F0', margin: '0 0 4px',
              }}>
                {t.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#64748B', margin: 0 }}>
                {t.subtitle}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
