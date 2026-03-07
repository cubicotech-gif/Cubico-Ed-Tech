'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    q: 'Is Cubico only for schools in Pakistan?',
    a: 'Not at all. We serve institutions across Pakistan, Saudi Arabia, Canada, and the wider Middle East. Our solutions support English, Arabic, and Urdu with full RTL support.',
  },
  {
    q: 'How long does implementation take?',
    a: 'A management system typically takes 2–4 weeks. Animated content takes 4–8 weeks. A full institutional transformation runs 2–3 months. You get a clear, agreed timeline before anything starts.',
  },
  {
    q: 'Do you provide training for teachers and staff?',
    a: 'Always. Every solution includes hands-on training — not a PDF manual. Our educators work directly with your staff until they\'re genuinely confident. Plus one free support month after launch.',
  },
  {
    q: 'Can we start with just one service?',
    a: 'Absolutely. Most institutions start with a single pillar and expand as they see results. No lock-in, no forced bundles.',
  },
  {
    q: 'What makes Cubico different from other EdTech companies?',
    a: "We're the only company providing management, animated content, game-based learning, AND digital transformation under one roof — with actual educators and native Arabic creators on the team.",
  },
  {
    q: 'What does pricing look like?',
    a: 'Every project is scoped and priced based on your institution\'s size and needs. We offer transparent proposals — no surprise costs. Book a free consultation and we\'ll give you a clear picture within 48 hours.',
  },
];

function FAQItem({ faq }: { faq: typeof FAQS[0] }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: '1px solid #F4F4F5',
        backgroundColor: open ? '#FAFAF8' : 'transparent',
        borderRadius: open ? 12 : 0,
        transition: 'background-color 0.2s',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'none', border: 'none', padding: '22px 20px',
          textAlign: 'left', gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-ui)', fontSize: 16, fontWeight: 600,
            color: open ? '#F97316' : '#18181B',
            transition: 'color 0.18s', lineHeight: 1.4,
          }}
        >
          {faq.q}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: 28, height: 28, borderRadius: '50%',
            backgroundColor: open ? 'rgba(249,115,22,0.1)' : '#F4F4F5',
            border: `1px solid ${open ? 'rgba(249,115,22,0.3)' : '#E4E4E7'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: open ? '#F97316' : '#71717A',
            fontSize: 18, lineHeight: 1,
            transition: 'all 0.2s',
            transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
            fontFamily: 'monospace',
          }}
        >
          +
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)', fontSize: 15,
                color: '#52525B', lineHeight: 1.75,
                margin: 0, padding: '0 20px 22px',
              }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  return (
    <section style={{ backgroundColor: '#FFFFFF', padding: '96px 0' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 5%' }}>

        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
              color: '#F97316', letterSpacing: '0.12em', textTransform: 'uppercase',
              backgroundColor: 'rgba(249,115,22,0.07)',
              border: '1px solid rgba(249,115,22,0.18)',
              borderRadius: 100, padding: '4px 14px', marginBottom: 16,
            }}
          >
            FAQ
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#18181B', margin: '0 0 16px', letterSpacing: '-0.025em' }}>
            Common questions.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#71717A', lineHeight: 1.7, margin: 0 }}>
            If you don&apos;t see your question here, just ask us directly on WhatsApp.
          </p>
        </motion.div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E4E4E7',
            borderRadius: 16,
            overflow: 'hidden',
          }}
        >
          {FAQS.map((faq, i) => <FAQItem key={i} faq={faq} />)}
        </div>
      </div>
    </section>
  );
}
