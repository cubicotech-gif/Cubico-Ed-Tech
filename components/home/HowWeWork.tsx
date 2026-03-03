'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// ── Data ──────────────────────────────────────────────────────────────────────
const STEPS = [
  {
    ghost: 'DAY 1',
    title: 'Discover.',
    description:
      'You tell us everything about your institution in one focused 60-minute call. We do the discovery. You just show up.',
    deliverables: [
      'Comprehensive institution brief',
      'Technical requirements document',
      'Scope and timeline proposal',
    ],
  },
  {
    ghost: 'DAY 4',
    title: 'Design.',
    description:
      'You see the full visual direction, architecture, and scope before a single line of code is written. Nothing surprises you.',
    deliverables: [
      'Full design system and visual mockups',
      'Information architecture map',
      'Written sign-off before build begins',
    ],
  },
  {
    ghost: 'DAY 11',
    title: 'Build.',
    description:
      "You get a live preview link every 5 days. You're never in the dark. We test in English and Arabic — both.",
    deliverables: [
      'Live preview link every 5 days',
      'Bilingual QA — English and Arabic',
      'Weekly check-in call with your team',
    ],
  },
  {
    ghost: 'DAY 27',
    title: 'Yours.',
    description:
      'It goes live. Your staff are trained. The documentation is in your hands. We stay available for 30 days after.',
    deliverables: [
      'Full staff training session included',
      'Complete documentation handover',
      '30-day post-launch support window',
    ],
  },
];

// ── Deliverables animation ─────────────────────────────────────────────────────
const deliverableVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: i * 0.1 + 0.2 },
  }),
};

// ── Grain ─────────────────────────────────────────────────────────────────────
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── Component ─────────────────────────────────────────────────────────────────
export default function HowWeWork() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [showGuarantee, setShowGuarantee] = useState(false);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start start', 'end end'],
  });

  // Progress line height (fills as user scrolls through steps)
  const lineHeight = useTransform(
    scrollYProgress,
    [0.05, 0.82],
    ['0%', '100%'],
  );

  // Entry line scaleX
  const entryScaleX = useTransform(scrollYProgress, [0, 0.03], [0, 1]);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v >= 0.82) {
        setShowGuarantee(true);
      } else {
        setShowGuarantee(false);
        const norm = Math.max(0, Math.min(1, (v - 0.05) / 0.77));
        setActiveStep(Math.min(3, Math.floor(norm * 4)));
      }
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <div ref={outerRef} style={{ height: '600vh', position: 'relative' }}>
      <section
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#000000',
        }}
      >
        {/* Section entry line */}
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
            zIndex: 15,
            pointerEvents: 'none',
            mixBlendMode: 'overlay',
          }}
        />

        {/* ── Vertical orange progress line on left ── */}
        <div
          style={{
            position: 'absolute',
            left: 52,
            top: 0,
            bottom: 0,
            width: 2,
            backgroundColor: '#111',
            zIndex: 20,
          }}
        >
          <motion.div
            style={{
              width: '100%',
              height: lineHeight,
              backgroundColor: '#E8622A',
              transformOrigin: 'top',
            }}
          />
        </div>

        {/* ── Steps content (cycles based on scroll) ── */}
        <AnimatePresence mode="wait">
          {!showGuarantee && (
            <motion.div
              key={activeStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                padding: '0 10%',
              }}
            >
              {/* Ghost background number */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  right: '-5%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontFamily: 'var(--font-accent)',
                  fontSize: 'clamp(160px, 22vw, 320px)',
                  color: '#0f0f0f',
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                {STEPS[activeStep].ghost}
              </div>

              {/* Left column (40%) — step node + title */}
              <div
                style={{
                  width: '40%',
                  paddingRight: 80,
                  paddingLeft: 48,
                  flexShrink: 0,
                }}
              >
                {/* Step node */}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    border: '1px solid #E8622A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 40,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-accent)',
                      fontSize: 22,
                      color: '#E8622A',
                      lineHeight: 1,
                    }}
                  >
                    0{activeStep + 1}
                  </span>
                </div>

                {/* One-word title */}
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontStyle: 'normal',
                    fontSize: 'clamp(44px, 5.5vw, 72px)',
                    color: '#F0EBE3',
                    margin: 0,
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {STEPS[activeStep].title}
                </h2>
              </div>

              {/* Right column (60%) — description + deliverables */}
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: '#7A7268',
                    margin: '0 0 40px',
                    maxWidth: 520,
                  }}
                >
                  {STEPS[activeStep].description}
                </p>

                {/* Three deliverables with stagger */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                  }}
                >
                  {STEPS[activeStep].deliverables.map((item, di) => (
                    <motion.div
                      key={`${activeStep}-${di}`}
                      custom={di}
                      variants={deliverableVariants}
                      initial="hidden"
                      animate="visible"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                      }}
                    >
                      <span
                        style={{
                          color: '#E8622A',
                          fontSize: 14,
                          lineHeight: 1,
                          flexShrink: 0,
                        }}
                      >
                        ✓
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 600,
                          fontSize: 13,
                          color: '#F0EBE3',
                          letterSpacing: '0.02em',
                        }}
                      >
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Step dots indicator */}
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    marginTop: 48,
                  }}
                >
                  {STEPS.map((_, si) => (
                    <div
                      key={si}
                      style={{
                        width: si === activeStep ? 24 : 6,
                        height: 2,
                        backgroundColor:
                          si === activeStep ? '#E8622A' : '#2a2a2a',
                        transition: 'width 0.3s ease, background-color 0.3s ease',
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Guarantee panel — full-bleed fire orange ── */}
          {showGuarantee && (
            <motion.div
              key="guarantee"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#E8622A',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 10%',
                textAlign: 'center',
              }}
            >
              {/* Grain on orange panel */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: GRAIN,
                  backgroundRepeat: 'repeat',
                  backgroundSize: '200px 200px',
                  opacity: 0.04,
                  pointerEvents: 'none',
                }}
              />

              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 11,
                  color: 'rgba(0,0,0,0.5)',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  margin: '0 0 32px',
                }}
              >
                Our Guarantee
              </p>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  fontSize: 'clamp(28px, 4.5vw, 56px)',
                  color: '#000000',
                  lineHeight: 1.3,
                  margin: '0 0 28px',
                  maxWidth: 820,
                  letterSpacing: '-0.02em',
                }}
              >
                &ldquo;If we miss the deadline — for any reason that&rsquo;s
                our fault — you get one free month of maintenance.&rdquo;
              </h2>

              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 13,
                  color: 'rgba(0,0,0,0.6)',
                  margin: 0,
                }}
              >
                We&rsquo;ve never triggered this clause. We intend to keep it
                that way.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
