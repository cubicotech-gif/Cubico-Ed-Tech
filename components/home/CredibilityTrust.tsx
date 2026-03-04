'use client';

import { useEffect, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
} from 'framer-motion';

// ── CountUp ───────────────────────────────────────────────────────────────────
function CountUp({
  to,
  suffix = '',
  duration = 1.8,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${Math.round(v)}${suffix}`);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration, ease: 'easeOut' });
    return () => controls.stop();
  }, [inView, to, duration, count]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

// ── Stats data ─────────────────────────────────────────────────────────────────
const STATS = [
  {
    to: 50,
    suffix: '+',
    label: 'Projects',
    sublabel: 'Delivered',
  },
  {
    to: 3,
    suffix: '',
    label: 'Languages',
    sublabel: 'Supported',
  },
  {
    to: 30,
    suffix: '',
    label: 'Day Delivery',
    sublabel: 'Guaranteed',
  },
  {
    to: 100,
    suffix: '%',
    label: 'Custom Built',
    sublabel: 'No Templates',
  },
];

// ── Institution names for marquee ─────────────────────────────────────────────
const INSTITUTIONS = [
  'Al-Noor Academy',
  'Crescent School',
  'National Grammar School',
  'Beacon House',
  'City School',
  'Roots IVY International',
  'DHA College',
  'Punjab Group',
  'Kips Academy',
  'Learning Alliance',
  'Nizami Institute',
  'Scholars School',
];

// ── Grain ─────────────────────────────────────────────────────────────────────
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ── Component ─────────────────────────────────────────────────────────────────
export default function CredibilityTrust() {
  return (
    <section style={{ backgroundColor: 'var(--bg-subtle)', position: 'relative' }}>
      {/* Section entry line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: 'var(--blue)',
          transformOrigin: 'left',
          zIndex: 10,
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
        }}
      />

      {/* ── A: The Numbers ── */}
      <div
        style={{
          backgroundColor: 'var(--bg-base)',
          padding: '120px 5%',
          position: 'relative',
        }}
      >
        {/* Section label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 80,
            maxWidth: 1200,
            margin: '0 auto 80px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-stamp)',
              fontSize: 11,
              color: 'var(--blue)',
              letterSpacing: '0.4em',
            }}
          >
            08
          </span>
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              color: 'var(--text-muted)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            CREDIBILITY & TRUST
          </span>
        </div>

        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
          }}
          className="grid-cols-2 md:grid-cols-4"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.7,
                ease: 'easeOut',
                delay: i * 0.1,
              }}
              style={{
                textAlign: 'center',
                padding: '40px 20px',
                borderRight:
                  i < STATS.length - 1 ? '1px solid var(--line)' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-stamp)',
                  fontSize: 'clamp(72px, 9vw, 108px)',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                }}
              >
                <CountUp to={stat.to} suffix={stat.suffix} />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 10,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginTop: 12,
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  marginTop: 4,
                  letterSpacing: '0.06em',
                }}
              >
                {stat.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── B: The Testimonial ── */}
      <div
        style={{
          backgroundColor: 'var(--bg-subtle)',
          padding: '100px 5%',
          position: 'relative',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            maxWidth: 1000,
            margin: '0 auto',
            borderLeft: '3px solid var(--blue)',
            paddingLeft: 64,
            position: 'relative',
          }}
        >
          {/* Quote mark */}
          <div
            aria-hidden="true"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 120,
              color: 'var(--line2)',
              lineHeight: 1,
              position: 'absolute',
              top: -32,
              left: 48,
              userSelect: 'none',
            }}
          >
            &ldquo;
          </div>

          <blockquote
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 400,
              fontSize: 'clamp(18px, 2.2vw, 26px)',
              color: 'var(--text-primary)',
              lineHeight: 1.6,
              margin: '0 0 48px',
              maxWidth: 820,
              position: 'relative',
              zIndex: 1,
            }}
          >
            Cubico delivered our complete Moodle platform with full Arabic RTL
            in 6 weeks — with 1,200 students onboarded and every staff member
            trained.{' '}
            <em
              style={{
                fontStyle: 'normal',
                color: 'var(--gold)',
              }}
            >
              Every other agency we approached quoted 4 to 6 months.
            </em>{' '}
            These people simply build.
          </blockquote>

          {/* Attribution */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, var(--gold) 0%, var(--blue) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#fff',
                  letterSpacing: '0.05em',
                }}
              >
                NA
              </span>
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 12,
                  color: 'var(--text-primary)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}
              >
                Principal, Al-Noor Academy
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.1em',
                  marginTop: 4,
                }}
              >
                Karachi, Pakistan
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── C: Institution Name Marquee ── */}
      <div
        style={{
          backgroundColor: 'var(--bg-base)',
          borderTop: '1px solid var(--line)',
          padding: '28px 0',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Fade edges */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background:
              'linear-gradient(to right, var(--bg-base), transparent)',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 120,
            background:
              'linear-gradient(to left, var(--bg-base), transparent)',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'flex',
            animation: 'marquee-scroll 28s linear infinite',
            width: 'max-content',
          }}
        >
          {[...INSTITUTIONS, ...INSTITUTIONS, ...INSTITUTIONS].map(
            (name, idx) => (
              <span key={idx} style={{ display: 'flex', alignItems: 'center' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-stamp)',
                    fontSize: 13,
                    color: 'var(--line2)',
                    letterSpacing: '0.2em',
                    whiteSpace: 'nowrap',
                    padding: '0 24px',
                    textTransform: 'uppercase',
                  }}
                >
                  {name}
                </span>
                {/* Diamond separator */}
                <span
                  style={{
                    color: 'var(--blue)',
                    fontSize: 8,
                    opacity: 0.5,
                    flexShrink: 0,
                  }}
                >
                  ◆
                </span>
              </span>
            ),
          )}
        </div>

        <style>{`
          @keyframes marquee-scroll {
            from { transform: translateX(0); }
            to { transform: translateX(-33.333%); }
          }
        `}</style>
      </div>
    </section>
  );
}
