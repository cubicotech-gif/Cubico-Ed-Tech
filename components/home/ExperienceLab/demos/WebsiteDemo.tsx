'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PANEL_DELAYS } from '../transformUtils';

interface WebsiteDemoProps {
  displayName: string;
  schoolSlug: string;
  isComplete: boolean;
}

// Standard blur/fade name span
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

// Hero name — clip-path wipe from left on change
function HeroName({ name, delay }: { name: string; delay: number }) {
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
        initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
        animate={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'inline-block', willChange: 'clip-path' }}
      >
        {local}
      </motion.span>
    </AnimatePresence>
  );
}

const FEATURE_CARDS = [
  { icon: '📋', tag: 'ADMISSIONS', title: 'Apply for 2026' },
  { icon: '📅', tag: 'ACADEMICS', title: 'Term calendar' },
  { icon: '💳', tag: 'PAY FEES', title: 'JazzCash · EasyPaisa' },
];

const WebsiteDemo = React.memo(function WebsiteDemo({
  displayName,
  schoolSlug,
  isComplete,
}: WebsiteDemoProps) {
  const [localSlug, setLocalSlug] = useState(schoolSlug);

  useEffect(() => {
    const t = setTimeout(() => setLocalSlug(schoolSlug), PANEL_DELAYS.website);
    return () => clearTimeout(t);
  }, [schoolSlug]);

  const urlDisplay = localSlug || 'your-school';

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#060606' }}
    >
      {/* Browser chrome */}
      <div
        style={{
          height: 26,
          background: '#060606',
          borderBottom: '1px solid #1d1d1d',
          padding: '0 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: 4 }}>
          {['#ff5f57', '#ffbd2e', '#28ca41'].map((c, i) => (
            <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: c }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            background: '#050505',
            border: '1px solid #1d1d1d',
            height: 14,
            padding: '0 6px',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#3a3a3a' }}>
            🔒 {urlDisplay}.edu.pk
          </span>
        </div>
      </div>

      {/* Website nav */}
      <div
        style={{
          height: 32,
          background: '#0a0a0a',
          borderBottom: '1px solid #1d1d1d',
          padding: '0 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          flexShrink: 0,
        }}
      >
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 10, color: '#F0EBE3', flexShrink: 0 }}>
          <NameSpan name={displayName} delay={PANEL_DELAYS.website} />
        </span>
        <div style={{ display: 'flex', gap: 10, overflow: 'hidden' }}>
          {['Home', 'About', 'Admissions', 'Academics', 'Fees'].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 500,
                fontSize: 8,
                color: item === 'Home' ? '#E8622A' : '#6A6460',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Hero area */}
      <div
        style={{
          height: 120,
          background: 'linear-gradient(135deg, #0a0810 0%, #050508 100%)',
          position: 'relative',
          overflow: 'hidden',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Grid texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 60px)',
            pointerEvents: 'none',
          }}
        />

        {/* Admission badge */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 12,
            fontFamily: 'var(--font-stamp)',
            fontSize: 9,
            letterSpacing: '0.15em',
            color: '#E8622A',
            background: 'rgba(232,98,42,0.08)',
            border: '1px solid rgba(232,98,42,0.2)',
            padding: '3px 8px',
          }}
        >
          Applications Open · 2026
        </div>

        {/* School name — clip-path wipe */}
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 20,
            color: '#fff',
            textAlign: 'center',
            letterSpacing: '-0.02em',
            overflow: 'hidden',
          }}
        >
          <HeroName name={displayName} delay={PANEL_DELAYS.website} />
        </div>
        <div
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 500,
            fontSize: 8,
            color: 'rgba(255,255,255,0.4)',
            marginTop: 4,
          }}
        >
          Excellence in Education · Est. 1995
        </div>
        {isComplete && (
          <div
            style={{
              position: 'absolute',
              bottom: 8,
              right: 12,
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
          </div>
        )}
      </div>

      {/* Three feature cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: 1,
          background: '#1d1d1d',
          flex: 1,
        }}
      >
        {FEATURE_CARDS.map((card) => (
          <div
            key={card.tag}
            style={{
              background: '#0a0a0a',
              padding: '10px 12px',
              borderLeft: '2px solid #E8622A',
            }}
          >
            <div style={{ fontSize: 10, marginBottom: 4 }}>{card.icon}</div>
            <div
              style={{
                fontFamily: 'var(--font-stamp)',
                fontSize: 8,
                letterSpacing: '0.2em',
                color: '#C9A96E',
                marginBottom: 2,
              }}
            >
              {card.tag}
            </div>
            <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 9, color: '#F0EBE3' }}>
              {card.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export { WebsiteDemo };
