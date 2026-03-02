'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

const SERVICES = [
  {
    number: '01',
    name: 'Moodle LMS & E-Learning',
    description:
      'Full-stack Moodle deployments with custom themes, plugins, SCORM support, and complete RTL localization for Arabic and Urdu institutions.',
    tags: ['Moodle', 'LMS', 'RTL', 'SCORM'],
    // TODO: replace with real photo
    gradient: 'linear-gradient(135deg, #0f1c2e 0%, #0a1520 100%)',
  },
  {
    number: '02',
    name: 'Educational Animations',
    description:
      'Cinematic 2D and 3D animations, explainer videos, and motion graphics tailored for any subject, age group, or curriculum standard.',
    tags: ['2D Animation', '3D Animation', 'Motion Graphics'],
    // TODO: replace with real photo
    gradient: 'linear-gradient(135deg, #1f1008 0%, #2d1a08 100%)',
  },
  {
    number: '03',
    name: 'Digital Apps & Systems',
    description:
      'Custom school ERPs, student portals, mobile apps for iOS and Android, and integration with existing institutional software.',
    tags: ['ERP', 'Mobile App', 'Portal', 'API'],
    // TODO: replace with real photo
    gradient: 'linear-gradient(135deg, #10101e 0%, #1a1530 100%)',
  },
  {
    number: '04',
    name: 'Content & Curriculum',
    description:
      'E-books, SCORM modules, interactive assessments, and full curriculum design in English, Urdu, and Arabic for every board.',
    tags: ['Curriculum', 'e-Books', 'SCORM', 'Assessment'],
    // TODO: replace with real photo
    gradient: 'linear-gradient(135deg, #121a12 0%, #1a2218 100%)',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function ServicesCards() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section style={{ backgroundColor: '#080808', padding: '100px 0' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 5%',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 60,
        }}
      >
        {/* Section label */}
        <div>
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 14,
              color: '#C9A96E',
              letterSpacing: '0.1em',
            }}
          >
            02
          </span>
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              color: '#7A7268',
              letterSpacing: '0.2em',
              marginLeft: 16,
              textTransform: 'uppercase',
            }}
          >
            WHAT WE BUILD
          </span>
        </div>

        {/* Two-column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 60,
            alignItems: 'start',
          }}
          className="lg:grid-cols-2"
        >
          {/* Left — sticky heading */}
          <div className="lg:sticky lg:top-24">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(32px, 4vw, 52px)',
                color: '#F0EBE3',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                margin: 0,
              }}
            >
              Complete Solutions.{' '}
              <span style={{ fontStyle: 'italic', color: '#C9A96E' }}>Any Institution.</span>{' '}
              Any Language.
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                color: '#7A7268',
                marginTop: 20,
                lineHeight: 1.7,
                maxWidth: 400,
              }}
            >
              From single-school setups to multi-campus enterprise platforms — we
              build what your institution actually needs.
            </p>
          </div>

          {/* Right — card stack */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
          >
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.number}
                variants={cardVariant}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  backgroundColor: '#191919',
                  borderTop: `1px solid ${hoveredCard === i ? '#E8622A' : '#2A2520'}`,
                  marginBottom: 2,
                  display: 'flex',
                  transition: 'border-color 0.3s ease',
                  overflow: 'hidden',
                }}
              >
                {/* Content — 60% */}
                <div style={{ flex: '1 1 60%', padding: '36px 32px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-accent)',
                      fontSize: 80,
                      color: '#2A2520',
                      lineHeight: 1,
                      display: 'block',
                      marginBottom: 4,
                    }}
                  >
                    {svc.number}
                  </span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: 22,
                      color: '#F0EBE3',
                      margin: '0 0 12px',
                      lineHeight: 1.2,
                    }}
                  >
                    {svc.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 15,
                      color: '#7A7268',
                      lineHeight: 1.7,
                      margin: '0 0 20px',
                    }}
                  >
                    {svc.description}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 6,
                      marginBottom: 20,
                    }}
                  >
                    {svc.tags.map(tag => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: 11,
                          color: '#7A7268',
                          border: '1px solid #2A2520',
                          padding: '3px 10px',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/services"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 500,
                      fontSize: 14,
                      color: '#E8622A',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={e =>
                      ((e.currentTarget as HTMLElement).style.textDecoration = 'underline')
                    }
                    onMouseLeave={e =>
                      ((e.currentTarget as HTMLElement).style.textDecoration = 'none')
                    }
                  >
                    Learn More →
                  </Link>
                </div>

                {/* Image panel — 40% */}
                <div
                  style={{
                    flex: '0 0 40%',
                    background: svc.gradient,
                    minHeight: 220,
                    filter: hoveredCard === i ? 'brightness(1.2)' : 'brightness(1)',
                    transition: 'filter 0.3s ease',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
