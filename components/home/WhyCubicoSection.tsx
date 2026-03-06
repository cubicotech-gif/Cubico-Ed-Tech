"use client";


import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const DIFFERENTIATORS = [
  {
    icon: '👩‍🏫',
    title: 'Educators on the Team',
    description: 'Real teachers review every product. Your tools work in actual classrooms — not just in demos.',
  },
  {
    icon: '🌍',
    title: 'Native Arabic Content',
    description: 'Created by native speakers from the Middle East. Not translated. Not AI-generated. Culturally accurate.',
  },
  {
    icon: '🏠',
    title: 'Everything Under One Roof',
    description: 'Management + Content + Learning + Infrastructure. One partner instead of five vendors who don\'t talk to each other.',
  },
  {
    icon: '👥',
    title: 'Dedicated Teams',
    description: 'Every project gets its own team that knows your institution deeply. No shared resources, no rotating staff.',
  },
  {
    icon: '🎓',
    title: 'Training Included',
    description: 'We train your staff until they\'re confident. Free consultation before. One month free support after launch.',
  },
  {
    icon: '🕐',
    title: '24/7 Support',
    description: 'Pakistan-GCC time zones are close. We\'re there when you need us.',
  },
];

export default function WhyCubicoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ backgroundColor: '#060A15', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>
        {/* Header */}
        <div style={{ marginBottom: 64, maxWidth: 600 }}>
          <p style={{
            fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
            color: '#818CF8', letterSpacing: '0.12em', textTransform: 'uppercase' as const,
            margin: '0 0 16px',
          }}>
            WHY CUBICO
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700, color: '#E2E8F0',
            margin: '0 0 16px', letterSpacing: '-0.02em',
          }}>
            What makes us different.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: '#64748B', lineHeight: 1.7, margin: 0 }}>
            No other EdTech company provides everything under one roof.
          </p>
        </div>

        {/* Bento grid */}
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 20,
          }}
        >
          {DIFFERENTIATORS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              style={{
                backgroundColor: '#0C1528',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16,
                padding: '28px 28px',
                display: 'flex',
                gap: 18,
                transition: 'border-color 0.25s, transform 0.25s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(79,70,229,0.35)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Icon */}
              <div style={{
                flexShrink: 0,
                width: 48, height: 48, borderRadius: 12,
                backgroundColor: 'rgba(79,70,229,0.15)',
                border: '1px solid rgba(79,70,229,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>
                {item.icon}
              </div>

              {/* Text */}
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-ui)', fontSize: 16, fontWeight: 600,
                  color: '#E2E8F0', margin: '0 0 8px',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 14,
                  color: '#64748B', lineHeight: 1.65, margin: 0,
                }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
