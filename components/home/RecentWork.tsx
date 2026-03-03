'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// ── Data ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    category: 'MOODLE LMS · ARABIC RTL · KARACHI',
    headline: '1,200 students.\nOnline. In 8 weeks.',
    stats: [
      { number: '1,200', label: 'Students' },
      { number: '8wk', label: 'Delivery' },
      { number: '100%', label: 'Trained' },
    ],
    name: 'Al-Noor Academy Platform',
    gradient:
      'linear-gradient(135deg, #1c1008 0%, #0d0a08 50%, #1a0f07 100%)',
  },
  {
    category: '3D ANIMATION · URDU · NATIONAL CURRICULUM',
    headline: '24 animated episodes.\nOne national publisher.\nOne semester.',
    stats: [
      { number: '24', label: 'Episodes' },
      { number: '3D+2D', label: 'Animation' },
      { number: '1M+', label: 'Reach' },
    ],
    name: 'Biology Series — Grade 9',
    gradient:
      'linear-gradient(135deg, #0a0d1c 0%, #080810 50%, #101218 100%)',
  },
  {
    category: 'SCHOOL ERP · MOBILE APP · FULL STACK',
    headline: '2,400 students managed.\nOne system. Zero paper.',
    stats: [
      { number: '2.4K', label: 'Students' },
      { number: '1', label: 'Platform' },
      { number: '0', label: 'Paper' },
    ],
    name: 'Crescent School ERP',
    gradient:
      'linear-gradient(135deg, #0a1008 0%, #0a100a 50%, #0f180c 100%)',
  },
];

// ── Grain overlay ─────────────────────────────────────────────────────────────
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── Component ─────────────────────────────────────────────────────────────────
export default function RecentWork() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState(0);
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  // Horizontal translation: panels slide left as user scrolls down
  const x = useTransform(scrollYProgress, [0.05, 0.95], ['0vw', '-200vw']);
  // Top progress bar fills as sections are revealed
  const progressWidth = useTransform(
    scrollYProgress,
    [0.05, 0.95],
    ['0%', '100%'],
  );
  // Entry line draws on scroll-in
  const entryScaleX = useTransform(scrollYProgress, [0, 0.04], [0, 1]);

  // Track active panel for the counter
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const norm = Math.max(0, Math.min(1, (v - 0.05) / 0.9));
      setActivePanel(Math.min(2, Math.floor(norm * 3)));
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <>
      {/* ── Outer scroll container (gives scroll room) ── */}
      <div ref={outerRef} style={{ height: '400vh', position: 'relative' }}>
        <section
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: '#080808',
          }}
        >
          {/* Section entry line — draws left→right on scroll-in */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              backgroundColor: '#E8622A',
              scaleX: entryScaleX,
              transformOrigin: 'left',
              zIndex: 30,
            }}
          />

          {/* Progress bar — fills as panels are revealed */}
          <motion.div
            style={{
              position: 'absolute',
              top: 2,
              left: 0,
              height: 2,
              width: progressWidth,
              background:
                'linear-gradient(to right, rgba(232,98,42,0.3), rgba(232,98,42,0.7))',
              zIndex: 29,
            }}
          />

          {/* Grain texture */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: GRAIN,
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 200px',
              opacity: 0.025,
              zIndex: 20,
              pointerEvents: 'none',
              mixBlendMode: 'overlay',
            }}
          />

          {/* ── Left sidebar — permanently fixed ── */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: 68,
              height: '100%',
              backgroundColor: '#080808',
              zIndex: 25,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '52px 0',
              borderRight: '1px solid #1d1d1d',
            }}
          >
            {/* Section number */}
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 11,
                color: '#E8622A',
                letterSpacing: '0.4em',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
            >
              05
            </span>

            {/* Vertical WORK texture */}
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 68,
                color: '#181818',
                letterSpacing: '0.06em',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              WORK
            </span>

            {/* Panel counter */}
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 11,
                color: '#555',
                letterSpacing: '0.12em',
              }}
            >
              {activePanel + 1}&nbsp;/&nbsp;3
            </span>
          </div>

          {/* ── Horizontal scroll track ── */}
          <motion.div
            style={{
              display: 'flex',
              width: '300vw',
              height: '100%',
              x,
            }}
          >
            {PROJECTS.map((project, i) => (
              <div
                key={project.name}
                style={{
                  width: '100vw',
                  height: '100%',
                  display: 'flex',
                  flexShrink: 0,
                }}
                onMouseEnter={() => setHoveredPanel(i)}
                onMouseLeave={() => setHoveredPanel(null)}
              >
                {/* Left 55% — image area (first 68px hidden under sidebar) */}
                <div
                  style={{
                    width: '55%',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                    flexShrink: 0,
                  }}
                >
                  {/* Ken Burns background */}
                  <motion.div
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{
                      position: 'absolute',
                      inset: '-10%',
                      background: project.gradient,
                      filter:
                        hoveredPanel === i
                          ? 'saturate(1) brightness(1.1)'
                          : 'saturate(0.6)',
                      transition: 'filter 0.4s ease',
                    }}
                  />

                  {/* Right-side gradient bleed into black panel */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to right, transparent 55%, rgba(0,0,0,0.9) 100%)',
                      pointerEvents: 'none',
                    }}
                  />

                  {/* Diagonal SVG glow line — the signature element */}
                  <svg
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      height: '100%',
                      width: 100,
                      overflow: 'visible',
                    }}
                    viewBox="0 0 100 800"
                    preserveAspectRatio="none"
                  >
                    <line
                      x1="100"
                      y1="0"
                      x2="0"
                      y2="800"
                      stroke="#E8622A"
                      strokeWidth="1.5"
                      style={{
                        filter:
                          'drop-shadow(0 0 6px rgba(232,98,42,0.9)) drop-shadow(0 0 2px #E8622A)',
                      }}
                    />
                  </svg>
                </div>

                {/* Right 45% — pure void black */}
                <div
                  style={{
                    flex: 1,
                    height: '100%',
                    backgroundColor: '#000000',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 72px',
                  }}
                >
                  {/* Zone 1: Category stamp */}
                  <p
                    style={{
                      fontFamily: 'var(--font-accent)',
                      fontSize: 11,
                      letterSpacing: '0.4em',
                      color: '#E8622A',
                      margin: '0 0 44px',
                    }}
                  >
                    {project.category}
                  </p>

                  {/* Zone 2: Outcome headline — the psychological core */}
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: 'clamp(36px, 3.8vw, 64px)',
                      color: '#F0EBE3',
                      lineHeight: 1.1,
                      margin: '0 0 44px',
                      whiteSpace: 'pre-line',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {project.headline}
                  </h2>

                  {/* Zone 3: Micro stats */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      margin: '0 0 44px',
                    }}
                  >
                    {project.stats.map((stat, j) => (
                      <div
                        key={stat.label}
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <div
                          style={{ textAlign: 'center', padding: '0 28px' }}
                        >
                          <div
                            style={{
                              fontFamily: 'var(--font-accent)',
                              fontSize: 36,
                              color: '#E8622A',
                              lineHeight: 1,
                            }}
                          >
                            {stat.number}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--font-ui)',
                              fontSize: 10,
                              color: '#555',
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              marginTop: 6,
                            }}
                          >
                            {stat.label}
                          </div>
                        </div>
                        {j < project.stats.length - 1 && (
                          <div
                            style={{
                              width: 1,
                              height: 28,
                              backgroundColor: '#2a2a2a',
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Zone 4: Project name (small) + View Case (hover) */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      maxWidth: 400,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 500,
                        fontSize: 13,
                        color: '#444',
                      }}
                    >
                      {project.name}
                    </span>
                    <Link
                      href="/portfolio"
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 600,
                        fontSize: 13,
                        color: '#E8622A',
                        textDecoration: 'none',
                        opacity: hoveredPanel === i ? 1 : 0,
                        transform:
                          hoveredPanel === i
                            ? 'translateX(0)'
                            : 'translateX(-10px)',
                        transition:
                          'opacity 0.2s ease, transform 0.2s ease',
                        display: 'inline-block',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      View Case →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </section>
      </div>

      {/* ── After the pinned track ── */}
      <div
        style={{
          backgroundColor: '#080808',
          padding: '28px 0',
          textAlign: 'center',
          borderTop: '1px solid #1d1d1d',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 12,
            color: '#444',
          }}
        >
          Showing 3 of 50+ completed projects
        </span>
        <Link
          href="/portfolio"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 12,
            color: '#E8622A',
            textDecoration: 'none',
            marginLeft: 16,
          }}
        >
          View All Work →
        </Link>
      </div>
    </>
  );
}
