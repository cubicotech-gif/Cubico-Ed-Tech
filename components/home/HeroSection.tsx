'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// ── Headline lines ─────────────────────────────────────────────────────────────
const LINES = [
  { text: 'We Build', italic: false },
  { text: 'Education', italic: false },
  { text: 'Technology', italic: true, fire: true },
];

// ── Stagger container — each line wipes upward ─────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
};

const lineVariants = {
  hidden: { y: 80, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.88, ease: [0.22, 1, 0.36, 1] } },
};

const fadeUp = (delay: number) => ({
  hidden: { y: 28, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] } },
});

const STATS = [
  { num: '50+', label: 'Projects' },
  { num: '3', label: 'Languages' },
  { num: '10+', label: 'Institutions' },
  { num: '5+', label: 'Years' },
];

export default function HeroSection() {
  return (
    <section className="grain relative min-h-screen flex flex-col overflow-hidden">

      {/* Cinematic dark background — TODO: Replace with real photography via next/image priority */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #1A1210 0%, #080808 50%, #12100E 100%)' }}
        aria-hidden
      />

      {/* Warm orange radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 30% 60%, rgba(232,98,42,0.13) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      {/* Bronze ambient top-left */}
      <div
        className="absolute top-0 left-0 w-[60vw] h-[50vh] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 80% at 10% 0%, rgba(201,169,110,0.055) 0%, transparent 65%)',
        }}
        aria-hidden
      />

      {/* Content wrapper */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-10 max-w-[1200px] mx-auto w-full pt-[120px] pb-10">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-accent text-[13px] text-fire tracking-[0.28em] mb-10"
        >
          EDTECH AGENCY&nbsp;&nbsp;·&nbsp;&nbsp;EST. 2019&nbsp;&nbsp;·&nbsp;&nbsp;KARACHI
        </motion.p>

        {/* Three-line headline — overflow-hidden wipe-up per line */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          {LINES.map((line) => (
            <div key={line.text} className="overflow-hidden leading-none pb-2">
              <motion.h1
                variants={lineVariants}
                className={[
                  'font-display font-bold leading-[0.92] tracking-tight block',
                  'text-[clamp(52px,8.5vw,118px)]',
                  line.fire ? 'text-fire' : 'text-ivory',
                  line.italic ? 'italic' : '',
                ].join(' ')}
              >
                {line.text}
              </motion.h1>
            </div>
          ))}
        </motion.div>

        {/* Subtext */}
        <motion.p
          variants={fadeUp(1.05)}
          initial="hidden"
          animate="visible"
          className="font-body text-[17px] md:text-[18px] text-warm-gray leading-[1.65] max-w-[440px] mb-14"
        >
          From Moodle LMS to 3D animations — complete digital solutions for
          institutions worldwide.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp(1.25)}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <Link
            href="/portfolio"
            data-cursor="cta"
            className="font-ui font-semibold text-[14px] text-ivory bg-fire px-9 py-[18px] tracking-wide transition-colors duration-200 hover:bg-[#C4531F]"
          >
            Explore Our Work
          </Link>
          <button className="font-ui font-medium text-[14px] text-ivory/80 hover:text-fire flex items-center gap-3 transition-colors duration-200">
            <span className="w-9 h-9 rounded-full border border-ivory/20 flex items-center justify-center text-[11px] text-ivory/60 flex-shrink-0">
              ▶
            </span>
            Watch Demo
          </button>
        </motion.div>
      </div>

      {/* Bottom stats row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 1.5 }}
        className="relative z-10 border-t border-rule/50 max-w-[1200px] mx-auto w-full px-6 md:px-10"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-rule/50">
          {STATS.map(({ num, label }) => (
            <div key={label} className="py-7 px-6 first:pl-0 last:pr-0">
              <div className="font-accent text-[clamp(34px,4vw,54px)] text-ivory leading-none mb-1.5">
                {num}
              </div>
              <div className="font-body text-[11px] text-warm-gray uppercase tracking-[0.2em]">
                {label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
          className="text-fire/50 text-lg leading-none"
          aria-hidden
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
