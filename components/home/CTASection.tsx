'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function CTASection() {
  return (
    <section
      style={{
        backgroundColor: '#F5F2ED',
        padding: '160px 5%',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top gradient bridge — dark languages section bleeds into cream */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: 'linear-gradient(to bottom, #080808 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{
          maxWidth: 720,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
          position: 'relative',
          zIndex: 3,
        }}
      >
        {/* Eyebrow — urgency + scarcity signal */}
        <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Pulsing dot — attention trigger */}
          <span
            style={{
              display: 'inline-block',
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: '#E8622A',
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 500,
              fontSize: 11,
              color: '#8A7A6A',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Now Accepting Q2 2026 Projects — Limited Slots
          </p>
        </motion.div>

        {/* Headline — authority + aspiration */}
        <motion.h2
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(46px, 6vw, 96px)',
            color: '#1A1714',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Let&rsquo;s Build Something{' '}
          <span style={{ fontStyle: 'italic', color: '#E8622A' }}>
            Extraordinary.
          </span>
        </motion.h2>

        {/* Trust-building subtext */}
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            color: '#5A5250',
            lineHeight: 1.75,
            maxWidth: 540,
            margin: 0,
          }}
        >
          Tell us about your institution. We&rsquo;ll reply within{' '}
          <strong style={{ color: '#1A1714', fontWeight: 600 }}>24 hours</strong>{' '}
          with a clear plan and transparent pricing — no surprises, no pressure.
        </motion.p>

        {/* Primary CTA — low-commitment framing */}
        <motion.div variants={fadeUp} style={{ marginTop: 8 }}>
          <Link
            href="/contact"
            data-cursor="cta"
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: 17,
              color: '#F0EBE3',
              textDecoration: 'none',
              backgroundColor: '#E8622A',
              padding: '20px 52px',
              borderRadius: 0,
              display: 'inline-block',
              letterSpacing: '0.02em',
              transition: 'transform 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease',
              boxShadow: '0 6px 28px rgba(232,98,42,0.30)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(-2px)';
              el.style.boxShadow = '0 12px 40px rgba(232,98,42,0.42)';
              el.style.backgroundColor = '#C4531F';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'translateY(0)';
              el.style.boxShadow = '0 6px 28px rgba(232,98,42,0.30)';
              el.style.backgroundColor = '#E8622A';
            }}
          >
            Book a Free Consultation →
          </Link>

          {/* Risk-reversal micro-copy — removes booking anxiety */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: '#9A9090',
              marginTop: 14,
              letterSpacing: '0.03em',
            }}
          >
            No commitment. No contract required.
          </p>
        </motion.div>

        {/* Contact details — trust anchors */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0 32px',
            justifyContent: 'center',
            marginTop: 4,
            paddingTop: 28,
            borderTop: '1px solid #DDD8D0',
            width: '100%',
          }}
        >
          {[
            { label: 'Email', value: 'info@cubico.tech' },
            { label: 'Location', value: 'Karachi, Pakistan' },
            { label: 'Response', value: 'WhatsApp · 24h Reply' },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: 'center', padding: '8px 0' }}>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 500,
                  fontSize: 10,
                  color: '#9A9090',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: '#4A4440',
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
