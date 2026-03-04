'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// ── CursorMode ────────────────────────────────────────────────────────────────
// default — 8px blue dot + 40px ring (1px blue border)
// large   — ring expands to 52px
// device  — ring becomes gold, 60px (crosshair variant for device mockup)

type CursorMode = 'default' | 'large' | 'device';

export function CursorDot() {
  const [mode, setMode]       = useState<CursorMode>('default');
  const [mounted, setMounted] = useState(false);

  // Dot — instant
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const sDotX = useSpring(dotX, { stiffness: 1000, damping: 50 });
  const sDotY = useSpring(dotY, { stiffness: 1000, damping: 50 });

  // Ring — laggy
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const sRingX = useSpring(ringX, { stiffness: 150, damping: 20 });
  const sRingY = useSpring(ringY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    setMounted(true);

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
    };

    const onEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor="device"]')) { setMode('device'); return; }
      if (target.closest('[data-cursor="large"]') || target.closest('a') || target.closest('button')) {
        setMode('large');
        return;
      }
    };

    const onLeave = () => setMode('default');

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, [dotX, dotY, ringX, ringY]);

  if (!mounted) return null;

  const ringSize = mode === 'device' ? 60 : mode === 'large' ? 52 : 40;
  const ringColor = mode === 'device' ? 'var(--gold)' : 'var(--blue)';

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{
          x: sDotX,
          y: sDotY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--blue)',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      />

      {/* Ring */}
      <motion.div
        animate={{ width: ringSize, height: ringSize }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          x: sRingX,
          y: sRingY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          border: `1px solid ${ringColor}`,
          zIndex: 9998,
          pointerEvents: 'none',
          transition: 'border-color 0.2s ease',
        }}
      />
    </>
  );
}
