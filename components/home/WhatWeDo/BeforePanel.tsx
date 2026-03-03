'use client';

import type { ReactNode } from 'react';

interface BeforePanelProps {
  title: string;
  children: ReactNode;
}

export function BeforePanel({ title, children }: BeforePanelProps) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: '#f5f2ed',
      }}
    >
      {/* Status bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          padding: '6px 12px',
          background: '#fff',
          borderBottom: '1px solid #e0e0e0',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#ef4444',
            boxShadow: '0 0 6px rgba(239,68,68,0.6)',
          }}
        />
        <span
          style={{
            fontSize: 9,
            fontWeight: 600,
            color: '#ef4444',
            fontFamily: 'var(--font-ui)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          Before Cubico
        </span>
        <div
          style={{
            marginLeft: 'auto',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 3,
            padding: '1px 5px',
            fontSize: 7,
            color: '#ef4444',
            fontFamily: 'var(--font-ui)',
          }}
        >
          PROBLEM
        </div>
      </div>

      {/* Slide content */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {children}
      </div>

      {/* Problem label strip */}
      <div
        style={{
          padding: '6px 12px',
          background: '#fff',
          borderTop: '1px solid #f0e0e0',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 9,
            color: '#888',
            fontFamily: 'var(--font-ui)',
            fontStyle: 'italic',
          }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}
