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
        backgroundColor: 'var(--bg-subtle)',
        padding: '160px 5%',
        textAlign: 'center',
      }}
    >
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        style={{
          maxWidth: 700,
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
        }}
      >
        {/* Eyebrow */}
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 500,
            fontSize: 12,
            color: 'var(--text-muted)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          LIMITED PROJECT SLOTS · Q2 2026
        </motion.p>

        {/* Headline */}
        <motion.h2
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontSize: 'clamp(48px, 6vw, 96px)',
            color: 'var(--text-primary)',
            lineHeight: 1,
            letterSpacing: '-0.03em',
            margin: 0,
          }}
        >
          Let&rsquo;s Build Something Extraordinary.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: 17,
            color: 'var(--text-body)',
            lineHeight: 1.7,
            maxWidth: 560,
            margin: 0,
          }}
        >
          Tell us about your institution. We&rsquo;ll respond within 24 hours with a
          clear plan and honest pricing.
        </motion.p>

        {/* CTA button */}
        <motion.div variants={fadeUp} style={{ marginTop: 8 }}>
          <Link
            href="/contact"
            data-cursor="cta"
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: 18,
              color: '#ffffff',
              textDecoration: 'none',
              backgroundColor: 'var(--blue)',
              padding: '20px 48px',
              borderRadius: 0,
              display: 'inline-block',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'scale(1.03)';
              el.style.boxShadow = '0 8px 32px rgba(26,107,255,0.3)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.transform = 'scale(1)';
              el.style.boxShadow = 'none';
            }}
          >
            Start Your Project →
          </Link>
        </motion.div>

        {/* Contact details */}
        <motion.div
          variants={fadeUp}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px 28px',
            justifyContent: 'center',
            marginTop: 8,
          }}
        >
          {[
            '📧 info@cubico.tech',
            '📍 Karachi, Pakistan',
            '💬 WhatsApp Available',
          ].map(item => (
            <span
              key={item}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 14,
                color: 'var(--text-muted)',
              }}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
