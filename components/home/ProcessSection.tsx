'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    num: '01',
    title: 'Discovery & Brief',
    desc: 'We learn your institution\'s goals, audience, language requirements, and technical constraints in a focused 30-minute session.',
  },
  {
    num: '02',
    title: 'Design & Architecture',
    desc: 'You receive wireframes, content structure, and a fixed-price proposal within 48 hours — no guesswork, no surprise invoices.',
  },
  {
    num: '03',
    title: 'Build & Test',
    desc: 'We develop in milestones, sharing previews at each stage so you stay in control. Full testing across devices and languages.',
  },
  {
    num: '04',
    title: 'Launch & Support',
    desc: 'Smooth handover, staff training, and 30-day post-launch support so your team is confident from day one.',
  },
];

const stepVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.12, ease: 'easeOut' },
  }),
};

export default function ProcessSection() {
  return (
    <section className="bg-cream py-28 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">

        {/* Section counter + label */}
        <div className="flex items-center gap-4 mb-12">
          <span className="font-accent text-[14px] text-bronze tracking-[0.1em]">04</span>
          <span className="font-ui text-[11px] text-ink/50 tracking-[0.22em] uppercase">
            How We Work
          </span>
        </div>

        {/* Heading */}
        <div className="mb-16">
          <h2 className="font-display font-bold text-[clamp(40px,5vw,60px)] text-ink leading-[1.0]">
            From Brief
            <br />
            to Launch.
          </h2>
        </div>

        {/* 2×2 grid on desktop, vertical stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              custom={i}
              variants={stepVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className={[
                'py-10 border-b border-[#D5CFC8]',
                i % 2 === 0 ? 'md:border-r md:border-[#D5CFC8] md:pr-14' : 'md:pl-14',
                i >= 2 ? 'md:border-b-0' : '',
              ].join(' ')}
            >
              {/* Decorative step number */}
              <div
                className="font-accent text-[72px] leading-none mb-5 select-none"
                style={{ color: '#C9A96E', opacity: 0.4 }}
              >
                {step.num}
              </div>

              <h3 className="font-display font-semibold text-[22px] text-ink mb-3 leading-snug">
                {step.title}
              </h3>

              <p className="font-body text-[15px] leading-[1.72]" style={{ color: '#5A5550' }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
