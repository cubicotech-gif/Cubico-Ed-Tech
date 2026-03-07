"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const WA_LINK =
  "https://wa.me/923001234567?text=Hi%20Cubico!%20I'd%20like%20to%20discuss%20how%20you%20can%20help%20transform%20our%20educational%20institution.";

const TRUST_ITEMS = [
  { icon: '⚡', text: 'Respond within 2 hours' },
  { icon: '🔒', text: 'No commitment required' },
  { icon: '🎓', text: 'Free first consultation' },
];

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      style={{
        backgroundColor: '#18181B',
        padding: '112px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture — warm orange glow */}
      <div
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -60%)',
          width: 700, height: 500, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(249,115,22,0.18) 0%, transparent 65%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute', bottom: '-10%', right: '-5%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none',
        }}
      />

      <div
        ref={ref}
        style={{ maxWidth: 720, margin: '0 auto', padding: '0 5%', textAlign: 'center', position: 'relative' }}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
              color: '#F97316', letterSpacing: '0.12em', textTransform: 'uppercase',
              backgroundColor: 'rgba(249,115,22,0.1)',
              border: '1px solid rgba(249,115,22,0.25)',
              borderRadius: 100, padding: '4px 14px', marginBottom: 28,
            }}
          >
            Get Started
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5vw, 60px)',
            fontWeight: 700, color: '#FAFAFA',
            margin: '0 0 20px', lineHeight: 1.1,
            letterSpacing: '-0.028em',
          }}
        >
          Ready to build an institution
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #F97316 0%, #FBBF24 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}
          >
            ready for anything?
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          style={{
            fontFamily: 'var(--font-body)', fontSize: 18,
            color: 'rgba(255,255,255,0.5)', lineHeight: 1.7,
            margin: '0 0 44px',
          }}
        >
          No pitch. No sales pressure. Just a conversation about where you are and where you want to be.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}
        >
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(249,115,22,0.55)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: '#F97316',
              color: '#FFFFFF',
              fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 16,
              padding: '16px 36px', borderRadius: 10, textDecoration: 'none',
              boxShadow: '0 8px 32px rgba(249,115,22,0.4)',
              letterSpacing: '0.01em',
            }}
          >
            💬 Book a Free Consultation
          </motion.a>

          {/* Trust items */}
          <div
            style={{
              display: 'flex', gap: 28, flexWrap: 'wrap', justifyContent: 'center',
            }}
          >
            {TRUST_ITEMS.map(item => (
              <span
                key={item.text}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontFamily: 'var(--font-ui)', fontSize: 13,
                  color: 'rgba(255,255,255,0.38)',
                }}
              >
                <span>{item.icon}</span>
                {item.text}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
