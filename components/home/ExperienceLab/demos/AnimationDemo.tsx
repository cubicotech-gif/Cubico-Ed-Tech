'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PANEL_DELAYS } from '../transformUtils';

interface AnimationDemoProps {
  displayName: string;
  isComplete: boolean;
}

// Watermark name — opacity fade through 0
function WatermarkName({ name, delay }: { name: string; delay: number }) {
  const [local, setLocal] = useState(name);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setLocal(name), delay);
    return () => clearTimeout(t);
  }, [name, delay]);

  if (prefersReducedMotion) {
    return (
      <span style={{ color: 'rgba(232,98,42,0.35)', fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.3em' }}>
        {local.toUpperCase()}
      </span>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={local}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{
          fontFamily: 'var(--font-stamp)',
          fontSize: 9,
          letterSpacing: '0.3em',
          color: '#E8622A',
          willChange: 'opacity',
        }}
      >
        {local.toUpperCase()}
      </motion.span>
    </AnimatePresence>
  );
}

function NameSpan({ name, delay }: { name: string; delay: number }) {
  const [local, setLocal] = useState(name);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setLocal(name), delay);
    return () => clearTimeout(t);
  }, [name, delay]);

  if (prefersReducedMotion) return <>{local}</>;

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={local}
        initial={{ opacity: 0, filter: 'blur(4px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, filter: 'blur(4px)' }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{ display: 'inline', willChange: 'opacity, filter' }}
      >
        {local}
      </motion.span>
    </AnimatePresence>
  );
}

const EPISODES = [
  { num: '01', title: 'Introduction to Cells', dur: '04:12' },
  { num: '02', title: 'Cell Division', dur: '06:35' },
  { num: '03', title: 'Photosynthesis', dur: '05:48', active: true },
  { num: '04', title: 'The Water Cycle', dur: '03:59' },
];

// Random stable star positions
const STARS = Array.from({ length: 28 }, (_, i) => ({
  left: ((i * 37 + 11) % 100),
  top: ((i * 53 + 7) % 80),
  size: (i % 3) + 1,
}));

const AnimationDemo = React.memo(function AnimationDemo({
  displayName,
  isComplete,
}: AnimationDemoProps) {
  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#060606' }}
    >
      {/* Top bar */}
      <div
        style={{
          height: 38,
          background: '#060606',
          borderBottom: '1px solid #1d1d1d',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: '#E8622A' }}>
          Animation Studio
        </span>
        <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 9, color: '#6A6460' }}>
          <NameSpan name={displayName} delay={PANEL_DELAYS.animation} /> · Content Library
        </span>
      </div>

      {/* Two-column layout */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '60% 40%', overflow: 'hidden' }}>

        {/* Left: preview screen */}
        <div
          style={{
            background: '#03030f',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Stars */}
          {STARS.map((s, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: s.size,
                height: s.size,
                borderRadius: '50%',
                background: '#fff',
                opacity: 0.6,
              }}
            />
          ))}

          {/* CSS Solar system */}
          <div style={{ position: 'relative', width: 140, height: 140 }}>
            {/* Sun */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: 'radial-gradient(circle, #fff9c4, #ffb300)',
                boxShadow: '0 0 10px rgba(255,200,0,0.6)',
              }}
            />
            {/* Orbits & planets */}
            {[
              { size: 60, dur: '6s', planetSize: 5, planetColor: '#aab4be', planet: { top: '50%', left: '100%' } },
              { size: 95, dur: '10s', planetSize: 7, planetColor: '#C9A96E', planet: { top: 0, left: '50%' } },
              { size: 130, dur: '16s', planetSize: 4, planetColor: '#4fc3f7', planet: { top: '50%', left: 0 } },
            ].map((orbit, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: orbit.size,
                  height: orbit.size,
                  marginTop: -orbit.size / 2,
                  marginLeft: -orbit.size / 2,
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '50%',
                  animation: `orbit-spin ${orbit.dur} linear infinite`,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    ...orbit.planet,
                    width: orbit.planetSize,
                    height: orbit.planetSize,
                    marginTop: -orbit.planetSize / 2,
                    marginLeft: -orbit.planetSize / 2,
                    borderRadius: '50%',
                    background: orbit.planetColor,
                  }}
                />
              </div>
            ))}
          </div>

          {/* Watermark — school name baked into preview */}
          <div style={{ position: 'absolute', bottom: 32, left: 10 }}>
            <WatermarkName name={displayName} delay={PANEL_DELAYS.animation} />
          </div>

          {/* Video controls */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 30,
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
              display: 'flex',
              alignItems: 'center',
              padding: '0 8px',
              gap: 6,
            }}
          >
            {/* Play */}
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#E8622A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="5" height="6" viewBox="0 0 5 6">
                <polygon points="0,0 5,3 0,6" fill="#fff" />
              </svg>
            </div>
            {/* Timeline */}
            <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,0.15)', borderRadius: 1, overflow: 'hidden' }}>
              <div style={{ width: '42%', height: '100%', background: '#E8622A' }} />
            </div>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 7, color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>
              01:24/03:12
            </span>
            {isComplete && (
              <span
                style={{
                  fontFamily: 'var(--font-stamp)',
                  fontSize: 7,
                  letterSpacing: '0.15em',
                  color: '#E8622A',
                }}
              >
                READY
              </span>
            )}
          </div>
        </div>

        {/* Right: episode list */}
        <div
          style={{
            padding: 12,
            background: '#0a0a0a',
            borderLeft: '1px solid #1d1d1d',
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            overflow: 'hidden',
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 11, color: '#F0EBE3' }}>
              Biology Series — Grade 9
            </div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#6A6460', marginTop: 2 }}>
              <NameSpan name={displayName} delay={PANEL_DELAYS.animation} />
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {['4K', 'Urdu', 'SCORM'].map((t) => (
              <span
                key={t}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 8,
                  letterSpacing: '0.06em',
                  color: '#2A2A2A',
                  border: '1px solid #272727',
                  padding: '2px 5px',
                  borderRadius: 2,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Episode rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#1d1d1d' }}>
            {EPISODES.map((ep) => (
              <div
                key={ep.num}
                style={{
                  background: ep.active ? 'rgba(232,98,42,0.08)' : '#0a0a0a',
                  borderLeft: ep.active ? '2px solid #E8622A' : '2px solid transparent',
                  padding: '7px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-stamp)',
                    fontSize: 12,
                    color: ep.active ? '#E8622A' : '#2A2A2A',
                    flexShrink: 0,
                  }}
                >
                  {ep.num}
                </span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: ep.active ? '#F0EBE3' : '#6A6460', flex: 1 }}>
                  {ep.title}
                </span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#2A2A2A', flexShrink: 0 }}>
                  {ep.dur}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

export { AnimationDemo };
