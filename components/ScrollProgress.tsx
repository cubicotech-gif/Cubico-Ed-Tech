'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Fixed 2px fire-orange vertical bar on the right edge of the viewport.
 * Fills from top to bottom as the user scrolls the page.
 * Creates unconscious momentum — the visitor always knows where they are.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="hidden md:block"
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: 2,
        height: '100vh',
        backgroundColor: 'var(--line)',
        zIndex: 9000,
        pointerEvents: 'none',
        transformOrigin: 'top',
      }}
      aria-hidden="true"
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'var(--blue)',
          transformOrigin: 'top',
          scaleY,
          opacity: 0.7,
        }}
      />
    </motion.div>
  );
}
