'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { slides } from './slides/SlideData';

// ── useCarousel hook ───────────────────────────────────────────────────────────
// Manages active slide, timer, progress percent, and pause state.
// Exported so HeroRight can share the state with DeviceMockup + progress bar.

export function useCarousel() {
  const prefersReducedMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused]       = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const rafRef = useRef<number>(0);

  const advance = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
    setProgressPct(0);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const DURATION = 4000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgressPct(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        advance();
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [activeSlide, isPaused, prefersReducedMotion, advance]);

  return { activeSlide, setActiveSlide, isPaused, setIsPaused, progressPct };
}

// ── CarouselProgress component ─────────────────────────────────────────────────
// Renders the 4 progress bars + slide label below the device group.

interface CarouselProgressProps {
  activeSlide: number;
  setActiveSlide: (i: number) => void;
  progressPct: number;
}

export function CarouselProgress({ activeSlide, setActiveSlide, progressPct }: CarouselProgressProps) {
  return (
    <div style={{ textAlign: 'center', marginTop: 20 }}>
      {/* Progress bars */}
      <div style={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
        {slides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => setActiveSlide(i)}
            aria-label={`Go to slide ${i + 1}: ${slide.label}`}
            style={{
              width: 56,
              height: 2,
              borderRadius: 1,
              backgroundColor: '#2a2a2a',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {i === activeSlide && (
              <motion.div
                key={activeSlide}
                initial={{ width: `${progressPct}%` }}
                animate={{ width: '100%' }}
                transition={{ duration: (4 * (100 - progressPct)) / 100, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  backgroundColor: slides[activeSlide].color,
                  borderRadius: 1,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Slide label */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[activeSlide].label}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 9,
            letterSpacing: '0.3em',
            color: '#3a3a3a',
            marginTop: 10,
          }}
        >
          {slides[activeSlide].label}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
