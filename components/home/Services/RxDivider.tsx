'use client';

import { motion } from 'framer-motion';

export function RxDivider() {
  return (
    <div
      style={{
        height: 36,
        background: '#050505',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* The gradient fire line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 1,
          background:
            'linear-gradient(to right, transparent 0%, rgba(232,98,42,0.3) 10%, #E8622A 30%, #E8622A 70%, rgba(232,98,42,0.3) 90%, transparent 100%)',
          transformOrigin: 'left',
          marginTop: -0.5,
        }}
      />

      {/* Rx symbol — punches through the line */}
      <div
        style={{
          position: 'absolute',
          left: 28,
          top: '50%',
          transform: 'translateY(-50%)',
          background: '#050505',
          padding: '0 10px 0 0',
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: 18,
            color: '#E8622A',
            letterSpacing: '-0.02em',
            lineHeight: 1,
          }}
        >
          Rx
        </span>
      </div>

      {/* "Prescribed by Cubico" — right side */}
      <div
        style={{
          position: 'absolute',
          right: 28,
          background: '#050505',
          paddingLeft: 10,
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-stamp)',
            fontSize: 8,
            letterSpacing: '0.2em',
            color: 'rgba(232,98,42,0.35)',
          }}
        >
          PRESCRIBED BY CUBICO TECHNOLOGIES
        </span>
      </div>
    </div>
  );
}
