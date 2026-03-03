'use client';

import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import type { ReactNode } from 'react';

interface AfterPanelProps {
  title: string;
  proofStat: string;
  proofLabel: string;
  springPosition: MotionValue<number>;
  children: ReactNode;
}

export function AfterPanel({ title, proofStat, proofLabel, springPosition, children }: AfterPanelProps) {
  const clipPath = useTransform(
    springPosition,
    (pos) => `inset(0 ${100 - pos}% 0 0)`
  );

  return (
    <motion.div
      style={{
        clipPath,
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: '#050505',
        willChange: 'clip-path',
      }}
    >
      {/* Status bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 12px',
          background: '#0a0a0a',
          borderBottom: '1px solid #1d1d1d',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#4ade80',
            boxShadow: '0 0 6px rgba(74,222,128,0.6)',
          }}
        />
        <span
          style={{
            fontSize: 9,
            fontWeight: 600,
            color: '#4ade80',
            fontFamily: 'var(--font-ui)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          With Cubico
        </span>
        <div
          style={{
            marginLeft: 'auto',
            background: 'rgba(74,222,128,0.1)',
            border: '1px solid rgba(74,222,128,0.25)',
            borderRadius: 3,
            padding: '1px 5px',
            fontSize: 7,
            color: '#4ade80',
            fontFamily: 'var(--font-ui)',
          }}
        >
          TRANSFORMED
        </div>
      </div>

      {/* Slide content */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {children}
      </div>

      {/* Outcome label + proof stat */}
      <div
        style={{
          padding: '6px 12px',
          background: '#0a0a0a',
          borderTop: '1px solid #1d1d1d',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontSize: 9,
            color: '#555',
            fontFamily: 'var(--font-ui)',
            fontStyle: 'italic',
          }}
        >
          {title}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#E8622A', fontFamily: 'var(--font-display)' }}>
            {proofStat}
          </span>
          <span style={{ fontSize: 8, color: '#555', fontFamily: 'var(--font-ui)' }}>
            {proofLabel}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
