'use client';

import { motion } from 'framer-motion';
import { DeviceMockup } from './DeviceMockup';
import { CarouselProgress, useCarousel } from './CarouselEngine';
import { useMouseParallax } from './useMouseParallax';

// ── HeroRight ─────────────────────────────────────────────────────────────────
// Contains: fire underglow, mouse-parallax + breathing wrapper, DeviceMockup,
// progress bars, and slide label.

export function HeroRight() {
  const { activeSlide, setActiveSlide, isPaused, setIsPaused, progressPct } = useCarousel();
  const { x, y } = useMouseParallax(12);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'visible',
        padding: '40px 5% 40px 0',
      }}
    >
      {/* Fire underglow */}
      <motion.div
        animate={{ opacity: [0.7, 1.0, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          zIndex: 0,
          width: 580,
          height: 380,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(232,98,42,0.18) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      {/* Mouse parallax + breathing wrapper */}
      <motion.div
        style={{
          x,
          y,
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: 640,
        }}
      >
        {/* Slow breathing */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <DeviceMockup
            activeSlide={activeSlide}
            onPauseChange={setIsPaused}
          />
        </motion.div>
      </motion.div>

      {/* Progress bars + slide label — below devices */}
      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 580, marginTop: 8 }}>
        <CarouselProgress
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
          progressPct={progressPct}
        />
      </div>
    </div>
  );
}
