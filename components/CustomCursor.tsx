'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type CursorType = 'default' | 'view' | 'cta';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cursorType, setCursorType] = useState<CursorType>('default');

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  // Inner dot — snappy, precise follower
  const dotX = useSpring(mouseX, { stiffness: 650, damping: 30, mass: 0.08 });
  const dotY = useSpring(mouseY, { stiffness: 650, damping: 30, mass: 0.08 });

  // Outer ring — lazy, magnetic trailing feel
  const ringX = useSpring(mouseX, { stiffness: 85, damping: 15, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 85, damping: 15, mass: 0.6 });

  const typeRef = useRef<CursorType>('default');

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
      if (!target) return;
      if (target.closest('[data-cursor="cta"]')) {
        typeRef.current = 'cta';
        setCursorType('cta');
      } else if (target.closest('a, button, [data-cursor="view"]')) {
        typeRef.current = 'view';
        setCursorType('view');
      } else {
        typeRef.current = 'default';
        setCursorType('default');
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

  // Ring dimensions per state
  const ringSize = cursorType === 'cta' ? 64 : cursorType === 'view' ? 50 : 32;
  // Dot only visible in default state
  const dotVisible = visible && cursorType === 'default';

  const ringBg = cursorType === 'cta' ? '#E8622A' : 'transparent';
  const ringBorder =
    cursorType === 'default'
      ? 'rgba(232,98,42,0.32)'
      : '#E8622A';

  const label = cursorType === 'cta' ? '→' : cursorType === 'view' ? 'VIEW' : '';

  return (
    <div className="hidden md:block">

      {/* ── Outer ring — lags behind (magnetic trailing effect) ── */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9998,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: visible ? 1 : 0,
            backgroundColor: ringBg,
            borderColor: ringBorder,
          }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          style={{
            borderStyle: 'solid',
            borderWidth: 1.5,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatePresence mode="wait">
            {label !== '' && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.14 }}
                style={{
                  color: '#F0EBE3',
                  fontSize: cursorType === 'cta' ? 22 : 8,
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  userSelect: 'none',
                }}
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* ── Inner dot — precise, fast, always on-cursor ── */}
      <motion.div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          zIndex: 9999,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          animate={{
            width: dotVisible ? 5 : 0,
            height: dotVisible ? 5 : 0,
            opacity: dotVisible ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          style={{
            backgroundColor: '#E8622A',
            borderRadius: '50%',
          }}
        />
      </motion.div>

    </div>
  );
}
