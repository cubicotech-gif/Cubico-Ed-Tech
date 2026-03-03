'use client';

import { useReducedMotion } from 'framer-motion';
import type { ServiceCard } from './data/types';

interface CardSymptomProps {
  symptom: ServiceCard['symptom'];
  isHovered: boolean;
}

export function CardSymptom({ symptom, isHovered }: CardSymptomProps) {
  const prefersReducedMotion = useReducedMotion();

  const pulseDuration = isHovered && !prefersReducedMotion ? '0.8s' : '1.2s';

  return (
    <div
      style={{
        background: 'rgba(239,68,68,0.04)',
        padding: '28px 28px 20px 28px',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      {/* Symptom header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 16,
        }}
      >
        {/* SYMPTOM stamp */}
        <div
          style={{
            fontFamily: 'var(--font-stamp)',
            fontSize: 9,
            letterSpacing: '0.35em',
            color: 'rgba(239,68,68,0.55)',
            background: 'rgba(239,68,68,0.07)',
            border: '1px solid rgba(239,68,68,0.15)',
            padding: '3px 8px',
            borderRadius: 2,
            lineHeight: 1,
          }}
        >
          SYMPTOM
        </div>

        {/* Pulsing red dots */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          {[0, 0.3, 0.6].map((delay, i) => (
            <div
              key={i}
              className="symptom-pulse"
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: '#EF4444',
                animationDuration: prefersReducedMotion ? '0s' : pulseDuration,
                animationDelay: prefersReducedMotion ? '0s' : `${delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Symptom headline */}
      <p
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontStyle: 'italic',
          fontSize: 'clamp(16px, 1.8vw, 22px)',
          color: 'rgba(240,235,227,0.85)',
          lineHeight: 1.3,
          letterSpacing: '-0.02em',
          margin: '0 0 12px 0',
        }}
      >
        {symptom.headline}
      </p>

      {/* Symptom detail — 2-line clamp */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          fontSize: 13,
          color: '#6A6460',
          lineHeight: 1.7,
          margin: '0 0 14px 0',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {symptom.detail}
      </p>

      {/* Symptom footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* "Sounds familiar?" */}
        <span
          style={{
            fontFamily: 'var(--font-stamp)',
            fontSize: 10,
            letterSpacing: '0.25em',
            color: 'rgba(239,68,68,0.5)',
          }}
        >
          SOUNDS FAMILIAR?
        </span>

        {/* Pain severity — 3 filled squares (max severity) */}
        <div style={{ display: 'flex', gap: 4 }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 1,
                background: 'rgba(239,68,68,0.7)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
