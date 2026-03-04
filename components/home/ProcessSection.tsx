'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    number: '01',
    title: 'Discovery & Brief',
    description:
      'We start by deeply understanding your institution — your goals, your students, and your technical constraints. No assumptions, just honest discovery.',
  },
  {
    number: '02',
    title: 'Design & Architecture',
    description:
      'We map the solution architecture and design the experience — wireframes, visual language, and a clear technical blueprint before a single line of code.',
  },
  {
    number: '03',
    title: 'Build & Test',
    description:
      'Development in focused sprints with weekly check-ins. Full QA across devices and browsers. Multilingual testing for Arabic, Urdu, and English content.',
  },
  {
    number: '04',
    title: 'Launch & Support',
    description:
      'Smooth handover with staff training, documentation, and ongoing support. We stay with you after go-live — not just until delivery.',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const stepVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function ProcessSection() {
  return (
    <section
      style={{
        backgroundColor: '#F5F2ED',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top gradient bridge — dark void bleeds into cream */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 72,
          background: 'linear-gradient(to bottom, #080808 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />
      {/* Bottom gradient bridge — cream bleeds back into dark void */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 72,
          background: 'linear-gradient(to top, #080808 0%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 5%',
          position: 'relative',
          zIndex: 3,
        }}
      >
        {/* Section label */}
        <div style={{ marginBottom: 52 }}>
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 500,
              fontSize: 11,
              color: '#C9A96E',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            04 — HOW WE WORK
          </span>
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(34px, 4.5vw, 56px)',
            color: '#1A1714',
            letterSpacing: '-0.025em',
            marginBottom: 64,
            lineHeight: 1.08,
          }}
        >
          From Brief to Launch.
        </motion.h2>

        {/* 2×2 step grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '0',
          }}
        >
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              variants={stepVariant}
              style={{
                padding: '44px 36px',
                borderBottom: '1px solid #D0C9C1',
                borderRight: i % 2 === 0 ? '1px solid #D0C9C1' : 'none',
              }}
            >
              {/* Decorative number */}
              <div
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: 76,
                  color: '#C9A96E',
                  opacity: 0.5,
                  lineHeight: 1,
                  marginBottom: 14,
                }}
              >
                {step.number}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 23,
                  color: '#1A1714',
                  margin: '0 0 14px',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  color: '#4A4440',
                  margin: 0,
                  lineHeight: 1.8,
                }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
