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
    <section style={{ backgroundColor: '#F5F2ED', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>

        {/* Section label */}
        <div style={{ marginBottom: 60 }}>
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 14,
              color: '#C9A96E',
              letterSpacing: '0.1em',
            }}
          >
            04
          </span>
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              color: '#1A1714',
              letterSpacing: '0.2em',
              marginLeft: 16,
              textTransform: 'uppercase',
            }}
          >
            HOW WE WORK
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
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            color: '#1A1714',
            letterSpacing: '-0.02em',
            marginBottom: 64,
            lineHeight: 1.1,
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
                padding: '40px 36px',
                borderBottom: '1px solid #D5CFC8',
                borderRight: i % 2 === 0 ? '1px solid #D5CFC8' : 'none',
              }}
              className={i % 2 === 0 ? 'border-r-rule' : ''}
            >
              {/* Decorative number */}
              <div
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: 72,
                  color: '#C9A96E',
                  opacity: 0.4,
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                {step.number}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 22,
                  color: '#1A1714',
                  margin: '0 0 12px',
                  lineHeight: 1.2,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  color: '#5A5550',
                  margin: 0,
                  lineHeight: 1.75,
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
