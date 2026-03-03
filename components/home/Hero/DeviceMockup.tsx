'use client';

import { motion } from 'framer-motion';
import { LaptopScreen } from './LaptopScreen';
import { PhoneScreen } from './PhoneScreen';

interface DeviceMockupProps {
  activeSlide: number;
  onPauseChange: (paused: boolean) => void;
}

// ── DeviceMockup ───────────────────────────────────────────────────────────────
// Positions laptop + phone together in a layered 3D composition.
// Phone overlaps laptop slightly on the right for depth.

export function DeviceMockup({ activeSlide, onPauseChange }: DeviceMockupProps) {
  return (
    <motion.div
      data-cursor="device"
      onMouseEnter={() => onPauseChange(true)}
      onMouseLeave={() => onPauseChange(false)}
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
      style={{
        position: 'relative',
        display: 'inline-block',
        width: '100%',
        maxWidth: 580,
      }}
    >
      {/* Laptop */}
      <div style={{ width: '100%' }}>
        <LaptopScreen activeSlide={activeSlide} />
      </div>

      {/* Phone — absolutely positioned, overlapping bottom-right */}
      <div
        style={{
          position: 'absolute',
          right: -52,
          bottom: 20,
          width: 'clamp(100px, 12vw, 150px)',
          zIndex: 10,
        }}
      >
        <PhoneScreen activeSlide={activeSlide} />
      </div>
    </motion.div>
  );
}
