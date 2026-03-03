import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';

// ── useMouseParallax ──────────────────────────────────────────────────────────
// Tracks normalised mouse position [0,1] and returns spring-smoothed
// x/y offsets clamped to ±maxOffset px.
// Uses a 16ms (1-frame) throttle for performance.

export function useMouseParallax(maxOffset = 12) {
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  const smoothX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(rawY, { stiffness: 60, damping: 20 });

  const x = useTransform(smoothX, [0, 1], [-maxOffset, maxOffset]);
  const y = useTransform(smoothY, [0, 1], [-maxOffset * 0.7, maxOffset * 0.7]);

  useEffect(() => {
    let lastFrame = 0;
    const handler = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastFrame < 16) return; // ~60fps throttle
      lastFrame = now;
      rawX.set(e.clientX / window.innerWidth);
      rawY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [rawX, rawY]);

  return { x, y };
}
