'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TESTIMONIALS = [
  {
    flag: '🇵🇰',
    name: 'Ahmad R.',
    role: 'Principal',
    location: 'Karachi, Pakistan',
    stars: 5,
    quote: "Cubico didn't just give us software — they sat with our teachers, understood our challenges, and built a system that actually fits how we work. Admin time dropped by 70%.",
  },
  {
    flag: '🇸🇦',
    name: 'Fatima Al-M.',
    role: 'Academic Director',
    location: 'Riyadh, Saudi Arabia',
    stars: 5,
    quote: "Finding a team that truly understands Arabic educational content was our biggest challenge. Cubico's animations brought our curriculum to life like nothing else could.",
  },
  {
    flag: '🇨🇦',
    name: 'Omar S.',
    role: 'Foundation Director',
    location: 'Toronto, Canada',
    stars: 5,
    quote: "From Moodle to animations to comic creation — everything under one roof. Our platform launched in weeks. We didn't need five vendors. Just one partner who delivered.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: '#F97316', fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
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
            What Institutions Say
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 700, color: '#18181B', margin: '0 0 16px', letterSpacing: '-0.025em' }}>
            Trusted across three continents.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: '#71717A', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            Real feedback from principals, directors, and educators who made the switch.
          </p>
        </motion.div>

        <div
          ref={ref}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E4E4E7',
                borderRadius: 16,
                padding: '32px 28px',
                display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'hidden',
                transition: 'box-shadow 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(249,115,22,0.08)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Decorative quote mark */}
              <div
                style={{
                  position: 'absolute', top: 20, right: 24,
                  fontSize: 64, lineHeight: 1, color: '#F97316',
                  opacity: 0.08, fontFamily: 'Georgia, serif', userSelect: 'none',
                }}
              >
                &ldquo;
              </div>

              <Stars count={t.stars} />

              <p
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 15,
                  color: '#3F3F46', lineHeight: 1.8,
                  margin: '0 0 24px', flex: 1,
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 42, height: 42, borderRadius: '50%',
                    backgroundColor: 'rgba(249,115,22,0.08)',
                    border: '2px solid rgba(249,115,22,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20,
                  }}
                >
                  {t.flag}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600, color: '#18181B' }}>
                    {t.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: '#71717A' }}>
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
