"use client";


import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

const PROJECTS = [
  {
    category: 'MOODLE LMS',
    name: 'Al-Noor Academy Platform',
    description: 'Full Moodle deployment with RTL Arabic theme, custom plugins, and 1,200+ enrolled students.',
    tags: ['Moodle', 'Arabic RTL', 'Custom Theme'],
    // TODO: replace with real project photo
    gradient: 'linear-gradient(160deg, #1A1210 0%, #0d0a08 60%, #12100E 100%)',
  },
  {
    category: '3D ANIMATION',
    name: 'Biology Series — Grade 9',
    description: '24-episode 3D animated science series in Urdu, produced for a national curriculum publisher.',
    tags: ['3D Animation', 'Urdu', 'Science'],
    // TODO: replace with real project photo
    gradient: 'linear-gradient(160deg, #0e0f1a 0%, #080810 60%, #12101e 100%)',
  },
  {
    category: 'SCHOOL ERP',
    name: 'Crescent School Management',
    description: 'End-to-end school ERP — admissions, fees, attendance, grading, and parent mobile app.',
    tags: ['ERP', 'Mobile App', 'React Native'],
    // TODO: replace with real project photo
    gradient: 'linear-gradient(160deg, #111810 0%, #0a100a 60%, #141e12 100%)',
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay: i * 0.12 },
  }),
};

export default function PortfolioPreview() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section style={{ backgroundColor: '#080808', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>

        {/* Section label */}
        <div style={{ marginBottom: 60 }}>
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 14,
              color: '#C9A96E',
              letterSpacing: '0.1em',
            }}
          >
            03
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
            RECENT WORK
          </span>
        </div>

        {/* Horizontal scroll on desktop, vertical on mobile */}
        <div
          style={{ overflowX: 'auto', overflowY: 'visible', scrollbarWidth: 'none' }}
          className="md:overflow-x-auto"
        >
          <div
            style={{
              display: 'flex',
              gap: 24,
              paddingBottom: 8,
              minWidth: 'max-content',
            }}
            className="flex-col md:flex-row"
          >
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.name}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  width: 420,
                  height: 520,
                  backgroundColor: '#191919',
                  flexShrink: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  position: 'relative',
                }}
                className="w-full md:w-[420px]"
              >
                {/* Image area — top 65% */}
                <div
                  style={{
                    flex: '0 0 65%',
                    background: project.gradient,
                    position: 'relative',
                    overflow: 'hidden',
                    filter:
                      hovered === i ? 'brightness(1.1)' : 'brightness(1)',
                    transition: 'filter 0.3s ease',
                  }}
                >
                  {/* Dark gradient overlay on image */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.6) 100%)',
                    }}
                  />

                  {/* "View Case" label — appears on hover */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      backgroundColor: '#E8622A',
                      padding: '6px 14px',
                      opacity: hovered === i ? 1 : 0,
                      transform: hovered === i ? 'translateY(0)' : 'translateY(-6px)',
                      transition: 'opacity 0.2s ease, transform 0.2s ease',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 11,
                        fontWeight: 600,
                        color: '#F0EBE3',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}
                    >
                      View Case
                    </span>
                  </div>
                </div>

                {/* Card info — bottom 35% */}
                <div
                  style={{
                    flex: '1 1 35%',
                    padding: '24px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: '#111111',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-accent)',
                        fontSize: 13,
                        color: '#E8622A',
                        letterSpacing: '0.08em',
                        display: 'block',
                        marginBottom: 6,
                      }}
                    >
                      {project.category}
                    </span>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: 20,
                        color: '#F0EBE3',
                        margin: '0 0 8px',
                        lineHeight: 1.2,
                      }}
                    >
                      {project.name}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 13,
                        color: '#7A7268',
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      {project.description}
                    </p>
                  </div>
                  <div
                    style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}
                  >
                    {project.tags.map(tag => (
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
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View all link */}
        <div style={{ marginTop: 40, textAlign: 'right' }}>
          <Link
            href="/portfolio"
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
            View All Work →
          </Link>
        </div>
      </div>
    </section>
  );
}
