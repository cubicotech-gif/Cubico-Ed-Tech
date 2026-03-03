'use client';

import { useRef, useCallback, useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useBeforeAfter() {
  const stageRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const hasInteracted = useRef(false);

  // starts at 15% for entrance animation
  const rawPosition = useMotionValue(15);
  const springPosition = useSpring(rawPosition, {
    stiffness: 400,
    damping: 35,
    mass: 0.8,
  });

  // Entrance: 15 → 50 after 600ms
  useEffect(() => {
    const timer = setTimeout(() => {
      rawPosition.set(50);
    }, 600);
    return () => clearTimeout(timer);
  }, [rawPosition]);

  const getPositionFromEvent = useCallback(
    (clientX: number): number => {
      if (!stageRef.current) return 50;
      const rect = stageRef.current.getBoundingClientRect();
      const pos = ((clientX - rect.left) / rect.width) * 100;
      return Math.min(Math.max(pos, 5), 95);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current) return;
      rawPosition.set(getPositionFromEvent(e.clientX));
    },
    [getPositionFromEvent, rawPosition]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      hasInteracted.current = true;
      rawPosition.set(getPositionFromEvent(e.clientX));
    },
    [getPositionFromEvent, rawPosition]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const touch = e.touches[0];
      rawPosition.set(getPositionFromEvent(touch.clientX));
    },
    [getPositionFromEvent, rawPosition]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      hasInteracted.current = true;
      const touch = e.touches[0];
      rawPosition.set(getPositionFromEvent(touch.clientX));
    },
    [getPositionFromEvent, rawPosition]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove]);

  const resetToCenter = useCallback(() => {
    rawPosition.set(50);
  }, [rawPosition]);

  return {
    stageRef,
    springPosition,
    isDragging: isDragging.current,
    hasInteracted: hasInteracted.current,
    handleMouseDown,
    handleTouchStart,
    resetToCenter,
  };
}
