'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

type CursorType = 'default' | 'view' | 'cta';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [cursorType, setCursorType] = useState<CursorType>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 400, damping: 35 });
  const springY = useSpring(mouseY, { stiffness: 400, damping: 35 });

  // Lazy ref for previous scroll to detect target on move
  const typeRef = useRef<CursorType>('default');

  useEffect(() => {
    setMounted(true);
    // Don't show on touch devices
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

  // Don't render on server or touch
  if (!mounted) return null;
  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) return null;

  const size = cursorType === 'cta' ? 64 : cursorType === 'view' ? 56 : 8;
  const label = cursorType === 'cta' ? '→' : cursorType === 'view' ? 'VIEW' : '';

  return (
    <motion.div
      className="hidden md:block"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        style={{
          backgroundColor: '#E8622A',
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
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.12 }}
              style={{
                color: '#F0EBE3',
                fontSize: cursorType === 'cta' ? 22 : 9,
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                letterSpacing: '0.06em',
                userSelect: 'none',
              }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
