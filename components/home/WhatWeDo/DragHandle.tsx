'use client';

import { motion } from 'framer-motion';

interface DragHandleProps {
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}

export function DragHandle({ onMouseDown, onTouchStart }: DragHandleProps) {
  return (
    <div
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: 44,
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'col-resize',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
      data-cursor="device"
    >
      {/* Vertical fire line */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 1.5, background: 'linear-gradient(to bottom, transparent 0%, #E8622A 15%, #E8622A 85%, transparent 100%)', pointerEvents: 'none' }} />

      {/* Top arrow */}
      <div style={{
        position: 'absolute', top: '50%', transform: 'translateY(calc(-50% - 26px))',
        color: '#E8622A', fontSize: 9, fontWeight: 700, lineHeight: 1, pointerEvents: 'none',
      }}>
        ▲
      </div>

      {/* Grip circle */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: '#E8622A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 24px rgba(232,98,42,0.6), 0 0 8px rgba(232,98,42,0.4)',
          zIndex: 11,
        }}
        animate={{
          boxShadow: [
            '0 0 18px rgba(232,98,42,0.5), 0 0 6px rgba(232,98,42,0.3)',
            '0 0 32px rgba(232,98,42,0.85), 0 0 12px rgba(232,98,42,0.55)',
            '0 0 18px rgba(232,98,42,0.5), 0 0 6px rgba(232,98,42,0.3)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Double chevron icon */}
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4 L3 8 L6 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10 4 L13 8 L10 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>

      {/* Bottom arrow */}
      <div style={{
        position: 'absolute', top: '50%', transform: 'translateY(calc(-50% + 26px))',
        color: '#E8622A', fontSize: 9, fontWeight: 700, lineHeight: 1, pointerEvents: 'none',
      }}>
        ▼
      </div>
    </div>
  );
}
