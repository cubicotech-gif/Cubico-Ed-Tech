'use client';

import { motion } from 'framer-motion';

/**
 * SectionLine — 2px fire-orange horizontal rule that draws left→right
 * when the section enters the viewport. Creates a cinematic chapter-break
 * feel between every section.
 */
export function SectionLine() {
  return (
    <motion.div
      className="absolute top-0 left-0 h-[2px] w-full origin-left bg-[#E8622A]"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    />
  );
}
