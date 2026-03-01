'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const STEPS = [
  {
    num: '01',
    title: 'Discovery Call',
    desc: 'We learn about your institution, goals, audience, and language requirements in a focused 30-minute session.',
  },
  {
    num: '02',
    title: 'Proposal & Plan',
    desc: 'You receive a detailed scope, timeline, and fixed-price quote within 48 hours — no surprise invoices.',
  },
  {
    num: '03',
    title: 'Build & Review',
    desc: 'We develop iteratively with milestone check-ins, sharing previews so you stay in control throughout.',
  },
  {
    num: '04',
    title: 'Launch & Support',
    desc: 'Smooth handover, staff training, and ongoing support so your team is confident from day one.',
  },
];

const stepVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HowItWorks() {
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, margin: '-80px' });

  return (
    <section className="py-24 px-5 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-card-bg border border-border text-muted text-xs font-syne font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
          Our Process
        </div>
        <h2 className="font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
          From Brief to{' '}
          <span className="gradient-text">Launch</span>
        </h2>
        <p className="text-muted font-dm mt-4 max-w-lg mx-auto leading-relaxed">
          A proven 4-step process that keeps every project on track, on budget, and on time.
        </p>
      </div>

      {/* Steps */}
      <div className="relative">
        {/* Animated connecting line — desktop only */}
        <div
          ref={lineRef}
          className="absolute top-[2.6rem] left-[12.5%] right-[12.5%] hidden md:block"
          aria-hidden
        >
          {/* Track */}
          <div className="h-px w-full bg-border/60" />
          {/* Animated fill */}
          <motion.div
            className="absolute inset-0 h-px bg-gradient-to-r from-accent via-accent-green to-accent origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: lineInView ? 1 : 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          />
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              custom={i}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="relative flex flex-col items-center md:items-start text-center md:text-left"
            >
              {/* Number circle */}
              <div className="relative z-10 w-[4.2rem] h-[4.2rem] rounded-full bg-card-bg border border-border flex items-center justify-center mb-6 flex-shrink-0">
                <span className="font-syne font-extrabold text-xl gradient-text">{step.num}</span>
              </div>

              {/* Content */}
              <h3 className="font-syne font-bold text-white text-lg mb-2">{step.title}</h3>
              <p className="text-muted font-dm text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
