'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TESTIMONIALS = [
  {
    flag: '🇵🇰',
    name: '[Client Name]',
    role: 'Principal',
    location: 'Pakistan',
    quote: 'Cubico didn\'t just give us software — they sat with our teachers, understood our challenges, and built a system that actually fits how we work.',
    accentColor: '#4F46E5',
  },
  {
    flag: '🇸🇦',
    name: '[Client Name]',
    role: 'Academic Director',
    location: 'Saudi Arabia',
    quote: 'Finding a team that truly understands Arabic educational content was our biggest challenge. Cubico\'s animations brought our curriculum to life like nothing else.',
    accentColor: '#7C3AED',
  },
  {
    flag: '🇨🇦',
    name: '[Client Name]',
    role: 'Foundation Director',
    location: 'Canada',
    quote: 'From Moodle to animations to comic creation — everything under one roof. Our platform launched in weeks. We didn\'t need five vendors. Just one partner.',
    accentColor: '#06D6A0',
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ backgroundColor: '#060A15', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>
        {/* Header */}
        <div style={{ marginBottom: 64, textAlign: 'center' as const }}>
          <p style={{
            fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
            color: '#818CF8', letterSpacing: '0.12em', textTransform: 'uppercase' as const,
            margin: '0 0 16px',
          }}>
            WHAT INSTITUTIONS SAY
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 700, color: '#E2E8F0',
            margin: 0, letterSpacing: '-0.02em',
          }}>
            Trusted across three continents.
          </h2>
        </div>

        {/* Cards */}
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                backgroundColor: '#0C1528',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16,
                padding: '32px 28px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
              }}
            >
              {/* Quote mark */}
              <div style={{
                fontSize: 48, lineHeight: 1, color: t.accentColor,
                opacity: 0.3, fontFamily: 'Georgia, serif',
                position: 'absolute', top: 20, right: 28,
              }}>
                "
              </div>

              {/* Quote text */}
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 16,
                color: '#94A3B8', lineHeight: 1.75, margin: 0,
                fontStyle: 'italic',
              }}>
                "{t.quote}"
              </p>

              {/* Attribution */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  backgroundColor: '#101E32',
                  border: `2px solid ${t.accentColor}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                }}>
                  {t.flag}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, color: '#E2E8F0' }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: '#64748B' }}>
                    {t.role} · {t.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
