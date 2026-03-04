'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { slides } from './slides/SlideData';

interface PhoneScreenProps {
  activeSlide: number;
}

const ENTER = { x: 30, opacity: 0, scale: 0.96 };
const CENTER = { x: 0, opacity: 1, scale: 1 };
const EXIT   = { x: -30, opacity: 0, scale: 0.96 };

export function PhoneScreen({ activeSlide }: PhoneScreenProps) {
  const SlideComponent = slides[activeSlide].phoneComponent;

  return (
    <div
      style={{
        transform: 'perspective(1200px) rotateY(4deg) rotateX(2deg)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        position: 'relative',
      }}
    >
      {/* Phone body */}
      <div
        style={{
          backgroundColor: '#141414',
          border: '1px solid #2a2a2a',
          borderRadius: 24,
          padding: 7,
          aspectRatio: '9 / 19.5',
          position: 'relative',
          width: '100%',
        }}
      >
        {/* Dynamic Island */}
        <div style={{ position: 'absolute', top: 9, left: '50%', transform: 'translateX(-50%)', width: 60, height: 18, backgroundColor: '#000', borderRadius: 10, zIndex: 20 }} />

        {/* Side button (power) */}
        <div style={{ position: 'absolute', right: -2, top: '30%', width: 2, height: 24, backgroundColor: '#2a2a2a', borderRadius: 1 }} />

        {/* Volume buttons */}
        <div style={{ position: 'absolute', left: -2, top: '24%', width: 2, height: 16, backgroundColor: '#2a2a2a', borderRadius: 1 }} />
        <div style={{ position: 'absolute', left: -2, top: '34%', width: 2, height: 16, backgroundColor: '#2a2a2a', borderRadius: 1 }} />

        {/* Screen */}
        <div
          style={{
            backgroundColor: '#000',
            borderRadius: 18,
            overflow: 'hidden',
            height: '100%',
            position: 'relative',
          }}
        >
          {/* Status bar */}
          <div style={{ height: 18, padding: '0 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', zIndex: 10, backgroundColor: 'rgba(0,0,0,0.85)' }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, color: 'var(--dark-text-primary)' }}>9:41</span>
            {/* Signal / wifi / battery icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              {/* Signal bars */}
              <svg width="10" height="8" viewBox="0 0 10 8">
                <rect x="0" y="5" width="2" height="3" fill="var(--dark-text-primary)" opacity="0.7" rx="0.5" />
                <rect x="3" y="3" width="2" height="5" fill="var(--dark-text-primary)" opacity="0.7" rx="0.5" />
                <rect x="6" y="1" width="2" height="7" fill="var(--dark-text-primary)" opacity="0.7" rx="0.5" />
              </svg>
              {/* WiFi */}
              <svg width="9" height="7" viewBox="0 0 9 7">
                <path d="M4.5 5.5 A0.5 0.5 0 0 1 5 6 A0.5 0.5 0 0 1 4 6 A0.5 0.5 0 0 1 4.5 5.5Z" fill="var(--dark-text-primary)" opacity="0.7" />
                <path d="M2.5 3.5 Q4.5 2 6.5 3.5" stroke="var(--dark-text-primary)" strokeWidth="0.8" fill="none" opacity="0.7" />
                <path d="M1 1.5 Q4.5 -0.5 8 1.5" stroke="var(--dark-text-primary)" strokeWidth="0.8" fill="none" opacity="0.5" />
              </svg>
              {/* Battery */}
              <div style={{ width: 11, height: 6, border: '0.5px solid rgba(240,244,255,0.5)', borderRadius: 1, position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 1, right: 2, backgroundColor: 'var(--dark-text-primary)', borderRadius: 0.5, opacity: 0.7 }} />
                <div style={{ position: 'absolute', right: -2, top: 1.5, width: 1.5, height: 3, backgroundColor: 'rgba(240,244,255,0.5)', borderRadius: '0 1px 1px 0' }} />
              </div>
            </div>
          </div>

          {/* Slide content */}
          <div style={{ position: 'relative', overflow: 'hidden', height: 'calc(100% - 18px)' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={ENTER}
                animate={CENTER}
                exit={EXIT}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <SlideComponent />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
