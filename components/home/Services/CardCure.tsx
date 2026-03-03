'use client';

import { motion } from 'framer-motion';
import type { ServiceCard } from './data/types';

interface CardCureProps {
  cure: ServiceCard['cure'];
  tags: ServiceCard['tags'];
  isExpanded: boolean;
  isHovered: boolean;
  onToggle: () => void;
}

export function CardCure({ cure, tags, isExpanded, isHovered, onToggle }: CardCureProps) {
  return (
    <div
      style={{
        background: '#0a0a0a',
        padding: '20px 28px 24px 28px',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Cure header — service info left, proof stat right */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 12,
          marginBottom: 16,
        }}
      >
        {/* Left: category, name, outcome */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: 'var(--font-stamp)',
              fontSize: 9,
              letterSpacing: '0.3em',
              color: '#C9A96E',
              background: 'rgba(201,169,110,0.10)',
              border: '1px solid rgba(201,169,110,0.15)',
              padding: '3px 8px',
              borderRadius: 2,
              display: 'inline-block',
              marginBottom: 6,
              lineHeight: 1,
            }}
          >
            {cure.name.split(' ')[0].toUpperCase()} SERVICE
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(18px, 2vw, 26px)',
              color: '#F0EBE3',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              margin: '0 0 4px 0',
            }}
          >
            {cure.name}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: 13,
              color: '#C5BFB7',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {cure.outcome}
          </p>
        </div>

        {/* Right: proof stat */}
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <span
            style={{
              fontFamily: 'var(--font-stamp)',
              fontSize: 'clamp(36px, 4vw, 52px)',
              color: '#E8622A',
              lineHeight: 1,
              display: 'block',
            }}
          >
            {cure.proofStat}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: 8,
              letterSpacing: '0.15em',
              color: '#6A6460',
              textTransform: 'uppercase',
              display: 'block',
              marginTop: 2,
            }}
          >
            {cure.proofLabel}
          </span>
        </div>
      </div>

      {/* Default deliverables — 3 bullets */}
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: '0 0 20px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 7,
          flex: 1,
        }}
      >
        {cure.defaultBullets.map((bullet, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
            }}
          >
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: '#E8622A',
                flexShrink: 0,
                marginTop: 6,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: 12.5,
                color: '#C5BFB7',
                lineHeight: 1.5,
              }}
            >
              {bullet}
            </span>
          </li>
        ))}
      </ul>

      {/* Card footer — tags + expander toggle */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 16,
          borderTop: '1px solid #1d1d1d',
          marginTop: 'auto',
          gap: 12,
          flexWrap: 'wrap',
        }}
      >
        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: 9,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                padding: '3px 8px',
                border: `1px solid ${isHovered ? '#2a2a2a' : '#272727'}`,
                color: isHovered ? '#6A6460' : '#2A2A2A',
                borderRadius: 2,
                transition: 'color 0.3s, border-color 0.3s',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* "Read Full Brief" toggle */}
        <button
          onClick={onToggle}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: 11,
              color: '#E8622A',
              transition: 'color 0.2s',
            }}
          >
            {isExpanded ? 'Close Brief' : 'Read Full Brief'}
          </span>
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ flexShrink: 0 }}
          >
            <path
              d="M2 4 L6 8 L10 4"
              stroke="#E8622A"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </motion.svg>
        </button>
      </div>
    </div>
  );
}
