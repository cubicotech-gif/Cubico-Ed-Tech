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
    a: 'A management system takes 2-4 weeks. Animated content takes 4-8 weeks. Full transformation is 2-3 months. You\'ll get a clear timeline before anything starts.',
  },
  {
    q: 'Do you provide training for teachers and staff?',
    a: 'Always. Every solution includes hands-on training. Our educators work directly with your staff until they\'re confident. Plus one month of free support after launch.',
  },
  {
    q: 'Can we start with just one service?',
    a: 'Absolutely. Most institutions start with one pillar and expand as they see results. No commitment to buy everything at once.',
  },
  {
    q: 'What makes Cubico different from other EdTech companies?',
    a: "We're the only company that provides management, animated content, game-based learning, AND digital transformation under one roof. Plus, we have actual educators and native Arabic content creators on our team.",
  },
];

function FAQItem({ faq, index }: { faq: typeof FAQS[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: 'none', border: 'none', padding: '24px 0',
          textAlign: 'left' as const, gap: 16,
        }}
      >
        <span style={{
          fontFamily: 'var(--font-ui)', fontSize: 17, fontWeight: 600,
          color: open ? '#818CF8' : '#E2E8F0',
          transition: 'color 0.2s',
          lineHeight: 1.4,
        }}>
          {faq.q}
        </span>
        <span style={{
          flexShrink: 0,
          width: 28, height: 28, borderRadius: '50%',
          backgroundColor: open ? 'rgba(79,70,229,0.2)' : 'rgba(255,255,255,0.06)',
          border: `1px solid ${open ? 'rgba(79,70,229,0.4)' : 'rgba(255,255,255,0.1)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: open ? '#818CF8' : '#64748B',
          fontSize: 18, lineHeight: 1,
          transition: 'all 0.2s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>
          +
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 16,
              color: '#64748B', lineHeight: 1.75,
              margin: 0, paddingBottom: 24,
            }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section style={{ backgroundColor: '#060A15', padding: '100px 0' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 5%' }}>
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 700, color: '#E2E8F0',
            margin: '0 0 56px', letterSpacing: '-0.02em',
            textAlign: 'center' as const,
          }}
        >
          Common questions.
        </motion.h2>

        <div>
          {FAQS.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
