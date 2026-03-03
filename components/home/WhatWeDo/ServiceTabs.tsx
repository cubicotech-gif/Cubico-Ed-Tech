'use client';

import { motion } from 'framer-motion';
import type { SlideConfig } from './slides/types';

interface ServiceTabsProps {
  slides: SlideConfig[];
  activeId: string;
  onChange: (id: string) => void;
}

export function ServiceTabs({ slides, activeId, onChange }: ServiceTabsProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 0,
        borderBottom: '1px solid #1d1d1d',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
      role="tablist"
    >
      {slides.map((slide) => {
        const isActive = slide.id === activeId;
        return (
          <button
            key={slide.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(slide.id)}
            style={{
              position: 'relative',
              padding: '10px 18px',
              border: 'none',
              borderBottom: '2px solid transparent',
              background: 'transparent',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              flexShrink: 0,
              outline: 'none',
              transition: 'background 0.2s',
            }}
          >
            {/* Active top border indicator */}
            {isActive && (
              <motion.div
                layoutId="tab-indicator"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: '#E8622A',
                  borderRadius: '0 0 2px 2px',
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            )}

            {/* Label */}
            <span
              style={{
                fontSize: 11,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#fff' : '#555',
                fontFamily: 'var(--font-ui)',
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
              }}
            >
              {slide.label}
            </span>

            {/* Tag */}
            <span
              style={{
                fontSize: 8,
                color: isActive ? '#E8622A' : '#333',
                fontFamily: 'var(--font-ui)',
                transition: 'color 0.2s',
              }}
            >
              {slide.tag}
            </span>
          </button>
        );
      })}
    </div>
  );
}
