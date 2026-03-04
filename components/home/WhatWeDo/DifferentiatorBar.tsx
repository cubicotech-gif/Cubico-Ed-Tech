'use client';

import { motion } from 'framer-motion';

const differentiators = [
  {
    stat: '50+',
    title: 'Deep EdTech Specialisation',
    items: [
      'Moodle-certified LMS architects',
      'Built 50+ courses from scratch',
      'Multilingual: EN · اردو · عربي',
    ],
  },
  {
    stat: '4×',
    title: 'Visual Production Studio',
    items: [
      '2D & 3D animation in-house',
      'Curriculum-aligned storytelling',
      'Avg. 4-min retention (vs 1-min)',
    ],
  },
  {
    stat: '30',
    title: 'End-to-End Digital Build',
    items: [
      'Custom ERP + portal development',
      'Mobile-first, PWA-ready',
      '30-day delivery guarantee',
    ],
  },
  {
    stat: '↗',
    title: 'Karachi-Native Team',
    items: [
      'Urdu & Arabic content writers',
      'Ministry curriculum alignment',
      'On-site training included',
    ],
  },
];

export function DifferentiatorBar() {
  return (
    <div
      style={{
        marginTop: 48,
        borderTop: '1px solid var(--line)',
        paddingTop: 40,
      }}
    >
      {/* Section label */}
      <div
        style={{
          fontSize: 10,
          fontFamily: 'var(--font-stamp)',
          color: 'var(--text-dim)',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: 28,
        }}
      >
        Why Cubico
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
        }}
      >
        {differentiators.map((col, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            style={{
              paddingRight: 28,
              paddingBottom: 4,
              borderRight: i < 3 ? '1px solid var(--line)' : 'none',
              paddingLeft: i > 0 ? 28 : 0,
            }}
          >
            {/* Big stat */}
            <div
              style={{
                fontFamily: 'var(--font-stamp)',
                fontSize: 32,
                fontWeight: 700,
                color: 'var(--blue)',
                lineHeight: 1,
                marginBottom: 8,
                letterSpacing: '-0.01em',
              }}
            >
              {col.stat}
            </div>

            {/* Title */}
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                fontFamily: 'var(--font-ui)',
                color: 'var(--text-primary)',
                marginBottom: 12,
                lineHeight: 1.3,
              }}
            >
              {col.title}
            </div>

            {/* Bullets */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {col.items.map((item, j) => (
                <div
                  key={j}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      color: 'var(--blue)',
                      fontSize: 10,
                      lineHeight: 1.6,
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-ui)',
                      lineHeight: 1.55,
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
