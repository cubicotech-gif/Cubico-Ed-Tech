'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

// ── Deterministic particle positions (no Math.random — avoids hydration mismatch) ──
const PARTICLES = Array.from({ length: 70 }, (_, i) => ({
  id: i,
  top: ((i * 17 + 7) % 97) + 1.5,
  left: ((i * 23 + 11) % 97) + 1.5,
  opacity: 0.06 + ((i * 7) % 28) / 200,
  size: 1 + (i % 2),
}));

const HEADING_WORDS = 'We Build Technology That Makes Education Extraordinary'.split(' ');

const ACCENT_WORDS = new Set(['Technology', 'Education', 'Extraordinary']);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const wordVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// ── CountUp ──────────────────────────────────────────────────────────────────
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1400;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const STATS = [
  { target: 50, suffix: '+', label: 'Projects' },
  { target: 3, suffix: '', label: 'Languages' },
  { target: 10, suffix: '+', label: 'Institutions' },
  { target: 5, suffix: '+', label: 'Years' },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-5 md:px-8 pt-28 pb-16 overflow-hidden">

      {/* Blue radial glow — top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[560px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 65% at 50% 0%, rgba(59,130,246,0.20) 0%, transparent 68%)',
          filter: 'blur(2px)',
        }}
      />

      {/* Subtle grid */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center gap-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-card-bg/80 border border-border text-muted text-xs font-syne font-semibold tracking-widest uppercase px-4 py-2 rounded-full backdrop-blur"
        >
          <span className="text-accent-green text-sm leading-none">✦</span>
          Pakistan&apos;s Premier EdTech Agency
        </motion.div>

        {/* Headline — staggered words */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-syne font-extrabold text-[2.6rem] sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.08] tracking-tight"
        >
          {HEADING_WORDS.map((word, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              className={`inline-block mr-[0.22em] last:mr-0 ${ACCENT_WORDS.has(word) ? 'gradient-text' : ''}`}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted text-base md:text-lg leading-relaxed max-w-xl font-dm"
        >
          Moodle LMS &middot; 2D/3D Animations &middot; School Apps &middot; Digital Content
          <br className="hidden sm:block" />
          <span className="block mt-1.5 text-text/50 text-sm">
            For every institution. In English, Urdu &amp; Arabic.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <Link
            href="/portfolio"
            className="relative bg-accent hover:bg-accent/90 text-white font-syne font-bold text-sm px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            style={{
              boxShadow: '0 0 32px rgba(59,130,246,0.38), 0 4px 18px rgba(59,130,246,0.22)',
            }}
          >
            Explore Our Work →
          </Link>
          <button className="flex items-center gap-2.5 bg-card-bg/70 border border-border hover:border-muted/40 text-text font-syne font-semibold text-sm px-8 py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 backdrop-blur">
            <span className="w-7 h-7 rounded-full bg-white/8 border border-border flex items-center justify-center text-[10px] text-muted">
              ▶
            </span>
            Watch a Demo
          </button>
        </motion.div>

        {/* Stats row — CountUp */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-8 md:gap-14 flex-wrap justify-center mt-2"
        >
          {STATS.map(({ target, suffix, label }, i) => (
            <div key={label} className="text-center">
              <div className="font-syne font-extrabold text-3xl md:text-4xl gradient-text">
                <CountUp target={target} suffix={suffix} />
              </div>
              <div className="text-muted text-[0.68rem] font-dm mt-1 uppercase tracking-widest">
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── Floating UI preview cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl h-56 mt-4 hidden md:block"
        >
          {/* Card 1 — LMS Dashboard (left, tilted -3°) */}
          <div
            className="hero-float-a absolute left-0 top-4 w-52 bg-card-bg border border-border rounded-2xl p-4 z-10"
            style={{
              transform: 'rotate(-3deg)',
              boxShadow: '0 0 48px rgba(59,130,246,0.22), 0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-accent/20 flex items-center justify-center text-[11px]">
                🎓
              </div>
              <span className="text-white text-[11px] font-syne font-bold">LMS Dashboard</span>
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 bg-accent/25 rounded-full w-full" />
              <div className="h-1.5 bg-border rounded-full w-4/5" />
              <div className="h-1.5 bg-border rounded-full w-3/5" />
            </div>
            <div className="flex gap-1.5 mt-3">
              <div className="h-10 flex-1 rounded-lg bg-accent/12 border border-accent/20" />
              <div className="h-10 flex-1 rounded-lg bg-border/50" />
              <div className="h-10 flex-1 rounded-lg bg-border/30" />
            </div>
          </div>

          {/* Card 2 — Animation Studio (center, no tilt, highest z) */}
          <div
            className="hero-float-b absolute left-1/2 -translate-x-1/2 top-0 w-56 bg-card-bg border border-accent-green/20 rounded-2xl p-4 z-20"
            style={{
              boxShadow: '0 0 48px rgba(6,214,160,0.20), 0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-accent-green/20 flex items-center justify-center text-[11px]">
                🎬
              </div>
              <span className="text-white text-[11px] font-syne font-bold">Animation Studio</span>
            </div>
            {/* Fake video player */}
            <div className="aspect-video rounded-lg bg-black/50 border border-border/60 flex items-center justify-center mb-2">
              <div className="w-9 h-9 rounded-full bg-accent-green/20 border border-accent-green/30 flex items-center justify-center text-accent-green text-xs">
                ▶
              </div>
            </div>
            {/* Timeline scrubber */}
            <div className="flex items-center gap-1 mt-2">
              {Array.from({ length: 14 }).map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-full ${i < 6 ? 'bg-accent-green/70' : 'bg-border'}`}
                  style={{ height: '3px' }}
                />
              ))}
            </div>
          </div>

          {/* Card 3 — Mobile App (right, tilted +3°) */}
          <div
            className="hero-float-c absolute right-0 top-6 w-44 bg-card-bg border border-accent-purple/20 rounded-2xl p-3 z-10"
            style={{
              transform: 'rotate(3deg)',
              boxShadow: '0 0 48px rgba(168,85,247,0.18), 0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-5 h-5 rounded bg-accent-purple/20 flex items-center justify-center text-[9px]">
                💻
              </div>
              <span className="text-white text-[10px] font-syne font-bold">Mobile App</span>
            </div>
            {/* Phone frame */}
            <div className="w-full rounded-xl border-2 border-accent-purple/25 bg-black/30 p-2">
              <div className="space-y-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full bg-border/80 flex-shrink-0" />
                    <div className="flex-1 space-y-0.5">
                      <div className="h-1.5 bg-border/80 rounded-full w-full" />
                      <div className="h-1 bg-border/40 rounded-full w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 h-5 rounded-md bg-accent-purple/12 border border-accent-purple/20" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="text-muted/60 text-[0.6rem] font-dm uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-0.5 h-6 bg-gradient-to-b from-muted/50 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
