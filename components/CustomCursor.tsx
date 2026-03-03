'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorMode = 'default' | 'large' | 'text';

/**
 * Custom cursor — "the single detail visitors describe when they tell
 * someone about a premium website."
 *
 * Default:         10px filled fire dot — no lag, instant
 * data-cursor="large":  52px hollow ring + fireLo fill
 * data-cursor="text":   elongated pill, rotated — for text links
 * On any interactive: 38px hollow ring (1px fire border)
 * Trailing:         second ring, 150ms lag
 */
export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>('default');
  const modeRef = useRef<CursorMode>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const primaryX = useSpring(mouseX, { stiffness: 600, damping: 42 });
  const primaryY = useSpring(mouseY, { stiffness: 600, damping: 42 });

  const trailX = useSpring(mouseX, { stiffness: 160, damping: 24 });
  const trailY = useSpring(mouseY, { stiffness: 160, damping: 24 });

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia('(hover: none)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const large = target?.closest('[data-cursor="large"]');
      const text  = target?.closest('[data-cursor="text"]');
      const interactive = target?.closest('a, button, [role="button"]');

      let next: CursorMode = 'default';
      if (large) next = 'large';
      else if (text) next = 'text';
      else if (interactive) next = 'large'; // default expand on interactive

      if (next !== modeRef.current) {
        modeRef.current = next;
        setMode(next);
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover', onOver, { passive: true });
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover', onOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null;

  const dotSize   = mode === 'default' ? 10 : 0;
  const ringSize  = mode === 'large' ? 52 : mode === 'text' ? 0 : mode === 'default' ? 0 : 38;
  const trailSize = mode !== 'default' ? 56 : 0;

  return (
    <>
      {/* ── Primary dot (always snappy) ── */}
      <motion.div
        className="hidden md:block"
        style={{
          position: 'fixed', left: 0, top: 0,
          x: primaryX, y: primaryY,
          translateX: '-50%', translateY: '-50%',
          zIndex: 9999, pointerEvents: 'none',
        }}
      >
        {/* Filled dot */}
        <motion.div
          animate={{
            width: dotSize,
            height: dotSize,
            opacity: visible && mode === 'default' ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{ backgroundColor: '#E8622A', borderRadius: '50%' }}
        />
      </motion.div>

      {/* ── Ring (large / hover mode) ── */}
      <motion.div
        className="hidden md:block"
        style={{
          position: 'fixed', left: 0, top: 0,
          x: primaryX, y: primaryY,
          translateX: '-50%', translateY: '-50%',
          zIndex: 9998, pointerEvents: 'none',
        }}
      >
        <motion.div
          animate={{
            width: ringSize,
            height: mode === 'text' ? 28 : ringSize,
            opacity: visible && mode !== 'default' ? 1 : 0,
            rotate: mode === 'text' ? -15 : 0,
            borderRadius: mode === 'text' ? '20px' : '50%',
            backgroundColor: mode === 'large' ? 'rgba(232,98,42,0.10)' : 'transparent',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          style={{
            border: '1px solid #E8622A',
            borderRadius: '50%',
          }}
        />
      </motion.div>

      {/* ── Trailing ring ── */}
      <motion.div
        className="hidden md:block"
        style={{
          position: 'fixed', left: 0, top: 0,
          x: trailX, y: trailY,
          translateX: '-50%', translateY: '-50%',
          zIndex: 9997, pointerEvents: 'none',
        }}
      >
        <motion.div
          animate={{
            width: trailSize,
            height: trailSize,
            opacity: visible && mode !== 'default' ? 0.25 : 0,
          }}
          transition={{ type: 'spring', stiffness: 180, damping: 28 }}
          style={{ border: '1px solid #E8622A', borderRadius: '50%' }}
        />
      </motion.div>
    </>
  );
}
