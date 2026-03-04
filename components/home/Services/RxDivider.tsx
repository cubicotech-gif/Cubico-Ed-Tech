'use client';

import { motion } from 'framer-motion';

export function RxDivider() {
  return (
    <div
      style={{
        height: 36,
        background: 'var(--bg-subtle)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* The gradient line */}
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
            'linear-gradient(to right, transparent 0%, var(--blue-lo) 10%, var(--blue) 30%, var(--blue) 70%, var(--blue-lo) 90%, transparent 100%)',
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
          background: 'var(--bg-subtle)',
          padding: '0 10px 0 0',
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: 18,
            color: 'var(--blue)',
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
          background: 'var(--bg-subtle)',
          paddingLeft: 10,
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-stamp)',
            fontSize: 8,
            letterSpacing: '0.2em',
            color: 'var(--blue-mid)',
          }}
        >
          PRESCRIBED BY CUBICO TECHNOLOGIES
        </span>
      </div>
    </div>
  );
}
