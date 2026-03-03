'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { slides } from './slides/SlideData';

// ── Laptop shell + screen with AnimatePresence slide transitions ───────────────

interface LaptopScreenProps {
  activeSlide: number;
}

const ENTER = { x: 30, opacity: 0, scale: 0.96 };
const CENTER = { x: 0, opacity: 1, scale: 1 };
const EXIT   = { x: -30, opacity: 0, scale: 0.96 };

export function LaptopScreen({ activeSlide }: LaptopScreenProps) {
  const SlideComponent = slides[activeSlide].laptopComponent;

  return (
    <div
      style={{
        width: '100%',
        perspective: '1200px',
      }}
    >
      {/* 3D-tilted laptop */}
      <div
        style={{
          transform: 'perspective(1200px) rotateY(-8deg) rotateX(4deg)',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Lid / screen area */}
        <div
          style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid #2a2a2a',
            borderRadius: '10px 10px 0 0',
            padding: '8px 8px 0',
          }}
        >
          {/* Notch */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 4 }}>
            <div style={{ width: 60, height: 7, backgroundColor: '#0f0f0f', borderRadius: '0 0 3px 3px' }} />
          </div>

          {/* Screen bezel */}
          <div
            style={{
              backgroundColor: '#000',
              borderRadius: '5px 5px 0 0',
              overflow: 'hidden',
              aspectRatio: '16 / 10',
              position: 'relative',
            }}
          >
            {/* Browser status bar */}
            <div style={{ height: 20, backgroundColor: 'rgba(0,0,0,0.9)', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 8px', flexShrink: 0, zIndex: 10, position: 'relative' }}>
              {/* Traffic lights */}
              <div style={{ display: 'flex', gap: 4 }}>
                {['#FF5F57', '#FFBD2E', '#28C840'].map((color) => (
                  <div key={color} style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: color }} />
                ))}
              </div>
              {/* URL bar */}
              <div style={{ width: '38%', height: 10, backgroundColor: '#1a1a1a', borderRadius: 3 }} />
              {/* Icons */}
              <div style={{ display: 'flex', gap: 4 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: 12, height: 4, backgroundColor: '#2a2a2a', borderRadius: 1 }} />
                ))}
              </div>
            </div>

            {/* Slide content with AnimatePresence */}
            <div style={{ position: 'relative', flex: 1, overflow: 'hidden', height: 'calc(100% - 20px)' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={ENTER}
                  animate={CENTER}
                  exit={EXIT}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <SlideComponent />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Hinge */}
        <div style={{ height: 5, backgroundColor: '#222', borderRadius: '0 0 3px 3px' }} />

        {/* Keyboard base */}
        <div style={{ height: 16, backgroundColor: '#1c1c1c', borderRadius: '0 0 7px 7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '30%', height: 3, backgroundColor: '#161616', borderRadius: 2 }} />
        </div>

        {/* Reflection */}
        <div
          style={{
            position: 'absolute',
            bottom: -28,
            left: '10%',
            right: '10%',
            height: 28,
            background: 'linear-gradient(to bottom, rgba(232,98,42,0.06), transparent)',
            filter: 'blur(6px)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}
