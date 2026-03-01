'use client';

import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type CursorState = 'default' | 'view' | 'cta';

export default function CustomCursor() {
  const [state, setState] = useState<CursorState>('default');
  const [mounted, setMounted] = useState(false);

  // Raw mouse position
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  // Spring-smoothed position — simulates lerp
  const x = useSpring(rawX, { stiffness: 520, damping: 32, mass: 0.25 });
  const y = useSpring(rawY, { stiffness: 520, damping: 32, mass: 0.25 });

  useEffect(() => {
    // Skip on touch / coarse-pointer devices (mobile/tablet)
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    setMounted(true);

    // Hide native cursor globally
    document.documentElement.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('[data-cursor="cta"]')) {
        setState('cta');
      } else if (target.closest('a, button, [role="button"], [data-cursor="view"]')) {
        setState('view');
      } else {
        setState('default');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, [rawX, rawY]);

  if (!mounted) return null;

  const size = state === 'cta' ? 64 : state === 'view' ? 56 : 8;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[99999] pointer-events-none select-none"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        className="rounded-full flex items-center justify-center overflow-hidden"
        animate={{
          width: size,
          height: size,
          backgroundColor: '#E8622A',
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence mode="wait">
          {state === 'view' && (
            <motion.span
              key="view"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="text-[9px] font-bold text-white tracking-[0.18em] uppercase"
              style={{ fontFamily: 'var(--font-ui)' }}
            >
              VIEW
            </motion.span>
          )}
          {state === 'cta' && (
            <motion.span
              key="cta"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="text-lg font-bold text-white"
            >
              →
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
