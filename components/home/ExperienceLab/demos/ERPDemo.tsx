'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PANEL_DELAYS } from '../transformUtils';

interface ERPDemoProps {
  displayName: string;
  isComplete: boolean;
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

const BAR_HEIGHTS = [40, 55, 35, 70, 60, 85];
const BAR_MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

const ACTIVITY = [
  { dot: '#10B981', text: 'Fee received — Ahmed Khan — ₨15,000' },
  { dot: '#C9A96E', text: 'Absent alert — 12 students notified' },
  { dot: '#E8622A', text: 'New enrollment — Sarah Malik' },
];

const ERPDemo = React.memo(function ERPDemo({ displayName, isComplete }: ERPDemoProps) {
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
          SchoolOS ERP
        </span>
        <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 10, color: '#F0EBE3' }}>
          <NameSpan name={displayName} delay={PANEL_DELAYS.erp} />
        </span>
        <div
          style={{
            fontFamily: 'var(--font-stamp)',
            fontSize: 9,
            letterSpacing: '0.2em',
            color: '#E8622A',
            background: 'rgba(232,98,42,0.08)',
            border: '1px solid rgba(232,98,42,0.2)',
            padding: '2px 8px',
          }}
        >
          PRINCIPAL
        </div>
      </div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          padding: '14px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, color: '#F0EBE3' }}>
            Dashboard Overview
          </div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: '#6A6460', marginTop: 2 }}>
            <NameSpan name={displayName} delay={PANEL_DELAYS.erp} /> · Term 2, 2025–26
          </div>
        </div>

        {/* KPI grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
          {[
            { n: '1,247', label: 'STUDENTS', color: '#E8622A' },
            { n: '94%', label: 'ATTENDANCE', color: '#10B981' },
            { n: '₨2.4M', label: 'FEES COLLECTED', color: '#C9A96E' },
            { n: '89', label: 'STAFF', color: '#6A6460' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: '#050505',
                border: '1px solid #1d1d1d',
                padding: '10px 12px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-stamp)', fontSize: 20, color: s.color, lineHeight: 1 }}>
                {s.n}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 7,
                  letterSpacing: '0.1em',
                  color: '#6A6460',
                  marginTop: 2,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, flex: 1 }}>
          {/* Left: bar chart */}
          <div
            style={{
              background: '#050505',
              border: '1px solid #1d1d1d',
              padding: 10,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.2em', color: '#C9A96E', marginBottom: 8 }}>
              MONTHLY COLLECTION
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, flex: 1 }}>
              {BAR_HEIGHTS.map((h, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div
                    style={{
                      width: '100%',
                      height: `${Math.round(h * 0.55)}px`,
                      background: '#E8622A',
                      borderRadius: '2px 2px 0 0',
                      opacity: i === 5 ? 1 : 0.45,
                    }}
                  />
                  <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 7, color: '#2A2A2A' }}>
                    {BAR_MONTHS[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: activity feed */}
          <div style={{ background: '#050505', border: '1px solid #1d1d1d', padding: 10 }}>
            <div style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, letterSpacing: '0.2em', color: '#C9A96E', marginBottom: 6 }}>
              RECENT ACTIVITY
            </div>
            {ACTIVITY.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '5px 0',
                  borderBottom: i < ACTIVITY.length - 1 ? '1px solid #1d1d1d' : 'none',
                }}
              >
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: item.dot, flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#C5BFB7', lineHeight: 1.4 }}>
                  {item.text}
                </span>
              </div>
            ))}
            {isComplete && (
              <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-stamp)',
                    fontSize: 8,
                    letterSpacing: '0.2em',
                    color: '#E8622A',
                    background: 'rgba(232,98,42,0.08)',
                    border: '1px solid rgba(232,98,42,0.2)',
                    padding: '1px 6px',
                  }}
                >
                  READY
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export { ERPDemo };
