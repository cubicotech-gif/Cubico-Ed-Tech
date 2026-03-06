"use client";


import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const WA_LINK =
  "https://wa.me/923001234567?text=Hi%20Cubico!%20I'd%20like%20to%20discuss%20how%20you%20can%20help%20transform%20our%20educational%20institution.";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      style={{
        backgroundColor: '#0C1528',
        padding: '120px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div
        ref={ref}
        style={{ maxWidth: 720, margin: '0 auto', padding: '0 5%', textAlign: 'center' as const, position: 'relative' }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 700, color: '#E2E8F0',
            margin: '0 0 20px', lineHeight: 1.1,
            letterSpacing: '-0.025em',
          }}
        >
          Ready to build an institution<br />
          <span style={{
            background: 'linear-gradient(135deg, #818CF8, #7C3AED)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            ready for anything?
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-body)', fontSize: 18,
            color: '#64748B', lineHeight: 1.7,
            margin: '0 0 48px',
          }}
        >
          No sales pitch — just a conversation about where you are and where you want to be.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: 16 }}
        >
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              color: '#fff', fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 17,
              padding: '18px 40px', borderRadius: 10, textDecoration: 'none',
              boxShadow: '0 0 50px rgba(79,70,229,0.5)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 70px rgba(79,70,229,0.7)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 50px rgba(79,70,229,0.5)';
            }}
          >
            💬 Start a Conversation on WhatsApp
          </a>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 13,
            color: '#4B5563', margin: 0,
          }}>
            Typically respond within 2 hours
          </p>
        </motion.div>
      </div>
    </section>
  );
}
