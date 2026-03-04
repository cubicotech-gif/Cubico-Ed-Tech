'use client';

import React, { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CardSymptom } from './CardSymptom';
import { RxDivider } from './RxDivider';
import { CardCure } from './CardCure';
import { CardExpander } from './CardExpander';
import type { ServiceCard } from './data/types';

interface PrescriptionCardProps {
  service: ServiceCard;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  index: number;
}

const PrescriptionCard = React.memo(function PrescriptionCard({
  service,
  isExpanded,
  onToggle,
  index,
}: PrescriptionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Row-by-row, left-to-right stagger
  const delay = Math.floor(index / 3) * 0.1 + (index % 3) * 0.08;

  const handleToggle = useCallback(() => {
    onToggle(service.id);
  }, [onToggle, service.id]);

  return (
    <motion.div
      layout
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        background: 'var(--bg-base)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 420,
        transition: 'background 300ms ease, box-shadow 300ms ease',
        boxShadow: isHovered || isExpanded ? '0 4px 24px rgba(26,107,255,0.08)' : 'none',
        borderLeft: isHovered || isExpanded ? '3px solid var(--blue)' : '3px solid transparent',
      }}
    >
      {/* Top notch — prescription pad tear-off aesthetic */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 40,
          height: 4,
          background: 'var(--bg-subtle)',
          borderRadius: '0 0 4px 4px',
          zIndex: 2,
        }}
      />

      {/* Ghost card number — atmospheric, very dim */}
      <div
        style={{
          position: 'absolute',
          top: 18,
          right: 20,
          fontFamily: 'var(--font-stamp)',
          fontSize: 48,
          color: 'var(--text-dim)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          transition: 'color 300ms ease',
          zIndex: 0,
        }}
      >
        {service.number}
      </div>

      {/* Fire left border — draws scaleY on hover / expand */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isHovered || isExpanded ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 2,
          height: '100%',
          background: 'linear-gradient(to right, var(--blue), var(--gold))',
          transformOrigin: 'top',
          zIndex: 3,
        }}
      />

      {/* Card content — z-index above ghost number */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
        <CardSymptom symptom={service.symptom} isHovered={isHovered} />
        <RxDivider />
        <CardCure
          cure={service.cure}
          tags={service.tags}
          isExpanded={isExpanded}
          isHovered={isHovered}
          onToggle={handleToggle}
        />
        <CardExpander expander={service.expander} isExpanded={isExpanded} />
      </div>
    </motion.div>
  );
});

export { PrescriptionCard };
