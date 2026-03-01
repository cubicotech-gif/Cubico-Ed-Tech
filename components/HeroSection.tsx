'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const heading = 'Building the Future of Education Technology';
const words = heading.split(' ');

const stats = [
  { value: '50+', label: 'Projects' },
  { value: '3', label: 'Languages' },
  { value: '100%', label: 'Custom' },
  { value: '5+', label: 'Years' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.2,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-5 md:px-8 pt-24 pb-16 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 65%),
              radial-gradient(ellipse 50% 40% at 80% 80%, rgba(6,214,160,0.08) 0%, transparent 60%)
            `,
          }}
        />
        <div className="absolute inset-0 hero-grid-bg" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-card-bg border border-border text-muted text-xs font-syne font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
          Karachi-based EdTech Agency
        </motion.div>

        {/* Animated heading */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-syne font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] tracking-tight"
        >
          {words.map((word, i) => {
            // Apply gradient to "Future" and "Education"
            const isAccent = word === 'Future' || word === 'Education';
            return (
              <motion.span
                key={i}
                variants={wordVariants}
                className={`inline-block mr-[0.25em] ${isAccent ? 'gradient-text' : ''}`}
              >
                {word}
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted text-base md:text-lg leading-relaxed max-w-2xl font-dm"
        >
          From Moodle LMS setups to 2D/3D animations, custom management systems to educational
          content — we help institutions deliver better learning experiences.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href="/services"
            className="bg-accent hover:bg-accent/90 text-white font-syne font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5"
          >
            Explore Services →
          </Link>
          <Link
            href="/portfolio"
            className="bg-card-bg hover:bg-border border border-border text-text font-syne font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          >
            View Portfolio
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-6 md:gap-10 flex-wrap justify-center mt-4"
        >
          {stats.map(({ value, label }, i) => (
            <div key={i} className="text-center">
              <div className="font-syne font-extrabold text-2xl md:text-3xl gradient-text">
                {value}
              </div>
              <div className="text-muted text-xs font-dm mt-0.5 uppercase tracking-wider">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-muted text-[0.65rem] font-dm uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-0.5 h-6 bg-gradient-to-b from-muted to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
