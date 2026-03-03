'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom cursor — "the single detail visitors describe when they tell someone
 * about a premium website."
 *
 * Default:   10px fire-orange filled dot
 * On hover:  42px hollow ring (1px fire-orange border)
 * Trailing:  A second ring follows 150ms behind the first
 */
export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Primary cursor — snappy
  const primaryX = useSpring(mouseX, { stiffness: 500, damping: 40 });
  const primaryY = useSpring(mouseY, { stiffness: 500, damping: 40 });

  // Trailing ring — 150ms lag via lower stiffness
  const trailX = useSpring(mouseX, { stiffness: 180, damping: 28 });
  const trailY = useSpring(mouseY, { stiffness: 180, damping: 28 });

  const hoveredRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const isInteractive = target?.closest('a, button, [role="button"], input, select, textarea');
      if (isInteractive !== null && isInteractive !== undefined) {
        if (!hoveredRef.current) {
          hoveredRef.current = true;
          setHovered(true);
        }
      } else {
        if (hoveredRef.current) {
          hoveredRef.current = false;
          setHovered(false);
        }
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

  return (
    <>
      {/* ── Primary cursor ── */}
      <motion.div
        className="hidden md:block"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: primaryX,
          y: primaryY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          animate={{
            width: hovered ? 42 : 10,
            height: hovered ? 42 : 10,
            backgroundColor: hovered ? 'transparent' : '#E8622A',
            borderWidth: hovered ? 1 : 0,
            borderColor: '#E8622A',
            borderStyle: 'solid',
            opacity: visible ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          style={{
            borderRadius: '50%',
          }}
        />
      </motion.div>

      {/* ── Trailing ring — follows 150ms behind ── */}
      <motion.div
        className="hidden md:block"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9998,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          animate={{
            width: hovered ? 56 : 0,
            height: hovered ? 56 : 0,
            opacity: visible && hovered ? 0.3 : 0,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 28 }}
          style={{
            borderRadius: '50%',
            border: '1px solid #E8622A',
          }}
        />
      </motion.div>
    </>
  );
}
