'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// ── CountUp hook ───────────────────────────────────────────────────────────────
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const STATS = [
  { target: 50, suffix: '+', label: 'Projects Delivered' },
  { target: 3, suffix: '', label: 'Languages Supported' },
  { target: 100, suffix: '%', label: 'Custom Built' },
];

export default function ImpactNumbers() {
  return (
    <section className="relative py-28 px-6 md:px-10 bg-void overflow-hidden">

      {/* Cinematic background — TODO: Replace with real photography via next/image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(26,18,16,0.95) 0%, #080808 70%)',
        }}
        aria-hidden
      />

      {/* Warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 70% 40%, rgba(201,169,110,0.06) 0%, transparent 65%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-[1200px] mx-auto">

        {/* Section counter + label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-accent text-[14px] text-bronze tracking-[0.1em]">05</span>
          <span className="font-ui text-[11px] text-warm-gray tracking-[0.22em] uppercase">
            The Numbers
          </span>
        </div>

        {/* Three stats with vertical rule dividers */}
        <div className="flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-rule/50">
          {STATS.map(({ target, suffix, label }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="flex-1 text-center py-12 md:py-0 md:px-12 first:pl-0 last:pr-0"
            >
              <div className="font-accent text-[clamp(80px,12vw,148px)] text-ivory leading-none mb-4">
                <CountUp target={target} suffix={suffix} />
              </div>
              <div className="font-body text-[13px] text-warm-gray uppercase tracking-[0.22em]">
                {label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="mt-20 border-t border-rule/40 pt-10 text-center"
        >
          <blockquote className="font-display italic text-[clamp(18px,2.5vw,26px)] text-bronze leading-[1.5] max-w-[640px] mx-auto">
            &ldquo;We don&apos;t use templates. Every solution is built for your institution.&rdquo;
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
