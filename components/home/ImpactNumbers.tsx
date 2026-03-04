'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

// ── CountUp ───────────────────────────────────────────────────────────────────
function CountUp({
  to,
  suffix = '',
  prefix = '',
  duration = 2.5,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${Math.round(v)}${suffix}`);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration, ease: 'easeOut' });
    return () => controls.stop();
  }, [inView, to, duration, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

// ── Stats data ────────────────────────────────────────────────────────────────
const STATS = [
  { to: 50, suffix: '+', label: 'Projects Delivered' },
  { to: 3,  suffix: '',  label: 'Languages Supported' },
  { to: 100,suffix: '%', label: 'Custom Built' },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function ImpactNumbers() {
  return (
    <section
      style={{
        backgroundColor: '#080808',
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(232,98,42,0.09) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 5%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 0,
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: '1 1 200px',
                textAlign: 'center',
                padding: '32px 40px',
                borderRight:
                  i < STATS.length - 1 ? '1px solid #2A2520' : 'none',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.1 }}
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: 'clamp(80px, 12vw, 160px)',
                  color: '#F0EBE3',
                  lineHeight: 1,
                }}
              >
                <CountUp to={stat.to} suffix={stat.suffix} />
              </motion.div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: '#7A7268',
                  textTransform: 'uppercase',
                  letterSpacing: '0.16em',
                  marginTop: 14,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(19px, 2.5vw, 26px)',
            color: '#C9A96E',
            textAlign: 'center',
            maxWidth: 700,
            margin: '72px auto 0',
            lineHeight: 1.65,
            letterSpacing: '-0.005em',
          }}
        >
          &ldquo;We don&rsquo;t use templates. Every solution is built for your institution.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
