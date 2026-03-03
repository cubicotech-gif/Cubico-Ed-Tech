'use client';

import { useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// ── Grain ─────────────────────────────────────────────────────────────────────
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── Component ─────────────────────────────────────────────────────────────────
export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });
  const [btnHovered, setBtnHovered] = useState(false);
  const animRef = useRef<number>(0);
  const targetRef = useRef({ x: 50, y: 50 });

  // Smooth cursor-following gradient with 300ms lag via requestAnimationFrame lerp
  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      targetRef.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
      if (!animRef.current) {
        const lerp = () => {
          setGradientPos((prev) => {
            const nx = prev.x + (targetRef.current.x - prev.x) * 0.08;
            const ny = prev.y + (targetRef.current.y - prev.y) * 0.08;
            if (
              Math.abs(nx - targetRef.current.x) > 0.1 ||
              Math.abs(ny - targetRef.current.y) > 0.1
            ) {
              animRef.current = requestAnimationFrame(lerp);
            } else {
              animRef.current = 0;
            }
            return { x: nx, y: ny };
          });
        };
        animRef.current = requestAnimationFrame(lerp);
      }
    },
    [],
  );

  const headingVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const lineVariant = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      style={{
        backgroundColor: '#020202',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '80px 5%',
      }}
    >
      {/* Section entry line — threshold effect */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.05 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: '#E8622A',
          transformOrigin: 'left',
          zIndex: 10,
        }}
      />

      {/* Mouse-tracking warm radial gradient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(500px circle at ${gradientPos.x}% ${gradientPos.y}%, rgba(232,98,42,0.04) 0%, transparent 70%)`,
          pointerEvents: 'none',
          zIndex: 1,
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
          pointerEvents: 'none',
          mixBlendMode: 'overlay',
          zIndex: 2,
        }}
      />

      {/* Section label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 64,
          position: 'relative',
          zIndex: 5,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 11,
            color: '#E8622A',
            letterSpacing: '0.4em',
          }}
        >
          09
        </span>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 11,
            color: '#555',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          START HERE
        </span>
      </div>

      {/* ── Availability signal ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 48,
          position: 'relative',
          zIndex: 5,
        }}
      >
        {/* Pulsing green dot */}
        <div style={{ position: 'relative', width: 8, height: 8 }}>
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: -3,
              borderRadius: '50%',
              backgroundColor: 'rgba(16,185,129,0.3)',
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: '#10B981',
              position: 'relative',
            }}
          />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 12,
            color: '#555',
            letterSpacing: '0.05em',
          }}
        >
          Currently accepting new projects · Q2 2026
        </span>
      </motion.div>

      {/* ── Three-line headline ── */}
      <motion.h2
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{
          margin: '0 0 24px',
          position: 'relative',
          zIndex: 5,
          lineHeight: 1.05,
        }}
      >
        <motion.span
          variants={lineVariant}
          style={{
            display: 'block',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontStyle: 'normal',
            fontSize: 'clamp(56px, 8vw, 110px)',
            color: '#F0EBE3',
            letterSpacing: '-0.03em',
          }}
        >
          Let&rsquo;s build
        </motion.span>
        <motion.span
          variants={lineVariant}
          style={{
            display: 'block',
            fontFamily: 'var(--font-display)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(56px, 8vw, 110px)',
            color: '#C9A96E',
            letterSpacing: '-0.03em',
          }}
        >
          something
        </motion.span>
        <motion.span
          variants={lineVariant}
          style={{
            display: 'block',
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontStyle: 'normal',
            fontSize: 'clamp(56px, 8vw, 110px)',
            color: '#E8622A',
            letterSpacing: '-0.03em',
          }}
        >
          extraordinary.
        </motion.span>
      </motion.h2>

      {/* ── Sub-headline (objection removal) ── */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          color: '#6a6460',
          lineHeight: 1.7,
          maxWidth: 480,
          margin: '0 auto 40px',
          position: 'relative',
          zIndex: 5,
        }}
      >
        Tell us what you need. We respond within 24 hours with a clear plan
        and a fixed price. No upfront fees. No surprises.
      </motion.p>

      {/* ── Primary button ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.45 }}
        style={{ position: 'relative', zIndex: 5, marginBottom: 20 }}
      >
        <Link
          href="/contact"
          data-cursor="cta"
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 800,
            fontSize: 15,
            letterSpacing: '0.04em',
            color: '#ffffff',
            textDecoration: 'none',
            backgroundColor: '#E8622A',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            width: 280,
            height: 56,
            justifyContent: 'center',
            transition: 'box-shadow 0.2s ease',
            boxShadow: btnHovered
              ? '0 0 40px 0 rgba(232,98,42,0.35)'
              : '0 0 0 0 rgba(232,98,42,0.4)',
          }}
        >
          Start Your Project
          <motion.span
            animate={{ x: btnHovered ? 6 : 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ display: 'inline-block' }}
          >
            →
          </motion.span>
        </Link>
      </motion.div>

      {/* ── Secondary options ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 80,
          position: 'relative',
          zIndex: 5,
        }}
      >
        <SecondaryLink href="/contact">Book a free 30-min call</SecondaryLink>
        <span style={{ color: '#2a2a2a', fontSize: 12 }}>·</span>
        <SecondaryLink
          href="https://wa.me/923000000000"
          style={{ color: '#888' }}
        >
          Message us on WhatsApp
        </SecondaryLink>
      </motion.div>
    </section>
  );
}

// ── Secondary link with draw-underline on hover ────────────────────────────────
function SecondaryLink({
  href,
  children,
  style: extraStyle,
}: {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-ui)',
        fontSize: 13,
        color: '#555',
        textDecoration: 'none',
        position: 'relative',
        ...extraStyle,
      }}
    >
      {children}
      {/* Draw-in underline */}
      <span
        style={{
          position: 'absolute',
          bottom: -2,
          left: 0,
          height: 1,
          width: hovered ? '100%' : '0%',
          backgroundColor: 'currentColor',
          transition: 'width 0.25s ease',
        }}
      />
    </a>
  );
}
