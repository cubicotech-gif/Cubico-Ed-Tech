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
        backgroundColor: 'var(--bg-subtle)',
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
            'radial-gradient(ellipse 80% 60% at 50% 50%, var(--blue-lo) 0%, transparent 70%)',
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
                  i < STATS.length - 1 ? '1px solid var(--line)' : 'none',
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: 'easeOut', delay: i * 0.1 }}
                style={{
                  fontFamily: 'var(--font-stamp)',
                  fontSize: 'clamp(72px, 10.8vw, 144px)',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                }}
              >
                <CountUp to={stat.to} suffix={stat.suffix} />
              </motion.div>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 13,
                  color: 'var(--text-body)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  marginTop: 12,
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
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            color: 'var(--gold)',
            textAlign: 'center',
            maxWidth: 680,
            margin: '64px auto 0',
            lineHeight: 1.6,
          }}
        >
          &ldquo;We don&rsquo;t use templates. Every solution is built for your institution.&rdquo;
        </motion.p>
      </div>
    </section>
  );
}
