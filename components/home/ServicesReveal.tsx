'use client';

import { useState, Fragment, type MouseEvent } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  type MotionValue,
} from 'framer-motion';

// ── Design tokens ─────────────────────────────────────────────────────────────

const C = {
  void: '#080808',
  bronze: '#C9A96E',
  warmGray: '#8A8278',
  rule: '#2A2520',
  ivory: '#F0EBE3',
  fire: '#E8622A',
} as const;

// ── Data ──────────────────────────────────────────────────────────────────────

interface Service {
  name: string;
  number: string;
  gradient: string;
}

const SERVICES: Service[] = [
  {
    name: 'Moodle LMS & E-Learning',
    number: '01',
    // TODO: replace with photo
    gradient: 'linear-gradient(135deg, #1a2535, #0d1520)',
  },
  {
    name: 'Educational Animations',
    number: '02',
    // TODO: replace with photo
    gradient: 'linear-gradient(135deg, #1f1510, #2d1a08)',
  },
  {
    name: 'Digital Apps & Systems',
    number: '03',
    // TODO: replace with photo
    gradient: 'linear-gradient(135deg, #151520, #1a1530)',
  },
  {
    name: 'Content & Curriculum',
    number: '04',
    // TODO: replace with photo
    gradient: 'linear-gradient(135deg, #141a14, #1a2218)',
  },
];

// ── Framer Motion variants ────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const ruleVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// ── FloatingImage ─────────────────────────────────────────────────────────────

interface FloatingImageProps {
  activeRow: number | null;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}

function FloatingImage({ activeRow, mouseX, mouseY }: FloatingImageProps) {
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const service = activeRow !== null ? SERVICES[activeRow] : null;

  return (
    <AnimatePresence mode="wait">
      {activeRow !== null && service && (
        <motion.div
          key={activeRow}
          // Hidden on mobile — no hover/cursor on touch devices
          className="hidden md:block"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            x: springX,
            y: springY,
            translateX: '-50%',
            translateY: '-50%',
            rotate: -6,
            zIndex: 50,
            pointerEvents: 'none',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div
            style={{
              width: 280,
              height: 200,
              borderRadius: 0,
              overflow: 'hidden',
              boxShadow:
                '0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,98,42,0.2)',
            }}
          >
            {/* TODO: replace with next/image photo when assets are ready */}
            <div
              style={{
                width: '100%',
                height: '100%',
                background: service.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  color: C.warmGray,
                  fontSize: 14,
                  letterSpacing: '0.1em',
                  textAlign: 'center',
                  padding: '0 16px',
                }}
              >
                {service.name}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── ServicesReveal ────────────────────────────────────────────────────────────

export default function ServicesReveal() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(
    e: MouseEvent<HTMLDivElement>,
    index: number,
  ) {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    setHoveredRow(index);
  }

  function handleMouseLeave() {
    setHoveredRow(null);
  }

  return (
    // Background continues directly from hero — no bg color break
    <section
      style={{
        backgroundColor: C.void,
        padding: '80px 5%',
        width: '100%',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* ── Top label row ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 500,
              fontSize: 11,
              color: C.fire,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            01 — WHAT WE DO
          </span>
          <span
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: 13,
              color: C.warmGray,
            }}
          >
            Full-service EdTech solutions for every institution
          </span>
        </div>

        {/* Static thin rule below label */}
        <div
          style={{
            height: 1,
            backgroundColor: C.rule,
            marginBottom: 0,
          }}
        />

        {/* ── Service rows — staggered whileInView ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {SERVICES.map((service, i) => (
            <Fragment key={service.number}>

              {/* Row */}
              <motion.div variants={rowVariants}>
                {/* Hover-opacity + background-wash wrapper */}
                <div
                  style={{
                    opacity:
                      hoveredRow !== null
                        ? hoveredRow === i
                          ? 1
                          : 0.35
                        : 1,
                    backgroundColor:
                      hoveredRow === i
                        ? 'rgba(232,98,42,0.03)'
                        : 'transparent',
                    transition:
                      'opacity 0.3s ease, background-color 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      position: 'relative',
                      padding: '28px 0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'none',
                      overflow: 'visible',
                    }}
                    onMouseMove={(e) => handleMouseMove(e, i)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* Left: service name */}
                    <span
                      className="service-name-size"
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontWeight: 700,
                        color: hoveredRow === i ? C.fire : C.ivory,
                        transition: 'color 0.3s ease',
                        lineHeight: 1.05,
                      }}
                    >
                      {service.name}
                    </span>

                    {/* Right — desktop: number + arrow */}
                    <div
                      className="hidden md:flex"
                      style={{ alignItems: 'center', gap: 6 }}
                    >
                      <span
                        style={{
                          fontFamily: "'Bebas Neue', cursive",
                          fontSize: 18,
                          color:
                            hoveredRow === i ? C.ivory : C.warmGray,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {service.number}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Bebas Neue', cursive",
                          fontSize: 18,
                          color:
                            hoveredRow === i ? C.ivory : C.warmGray,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        →
                      </span>
                    </div>

                    {/* Right — mobile: static 80×60 thumbnail */}
                    <div
                      className="md:hidden flex-shrink-0"
                      style={{
                        width: 80,
                        height: 60,
                        overflow: 'hidden',
                        borderRadius: 2,
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          background: service.gradient,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0 6px',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'Bebas Neue', cursive",
                            color: C.warmGray,
                            fontSize: 9,
                            textAlign: 'center',
                            lineHeight: 1.3,
                          }}
                        >
                          {service.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Animated rule — draws left-to-right */}
              <motion.div
                variants={ruleVariants}
                style={{
                  height: 1,
                  backgroundColor: C.rule,
                  transformOrigin: 'left center',
                }}
              />

            </Fragment>
          ))}
        </motion.div>

        {/* ── Bottom meta row ── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            marginTop: 48,
          }}
        >
          <span
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: 13,
              color: C.warmGray,
            }}
          >
            Trusted by schools, madrassas, universities &amp; coaching centers
          </span>
          <Link
            href="/services"
            className="hover:underline"
            style={{
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 500,
              fontSize: 14,
              color: C.fire,
              textDecoration: 'none',
            }}
          >
            See All Services →
          </Link>
        </div>
      </div>

      {/* Floating image — fixed, follows cursor — desktop only */}
      <FloatingImage
        activeRow={hoveredRow}
        mouseX={mouseX}
        mouseY={mouseY}
      />
    </section>
  );
}
