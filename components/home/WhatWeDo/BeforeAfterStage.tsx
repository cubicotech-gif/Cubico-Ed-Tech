'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useBeforeAfter } from './useBeforeAfter';
import { BeforePanel } from './BeforePanel';
import { AfterPanel } from './AfterPanel';
import { DragHandle } from './DragHandle';
import type { SlideConfig } from './slides/types';

interface BeforeAfterStageProps {
  slide: SlideConfig;
}

// Inner component can use hooks without conditional call issues
function DesktopStage({ slide }: BeforeAfterStageProps) {
  const { stageRef, springPosition, handleMouseDown, handleTouchStart } = useBeforeAfter();
  const handleLeft = useTransform(springPosition, (pct) => `${pct}%`);

  return (
    <div
      ref={stageRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        position: 'relative',
        width: '100%',
        height: 440,
        borderRadius: '10px 10px 0 0',
        overflow: 'hidden',
        border: '1px solid var(--line)',
        borderBottom: 'none',
        cursor: 'col-resize',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        boxShadow: '0 4px 40px rgba(26,107,255,0.06), 0 1px 0 var(--line)',
      }}
    >
      {/* Before layer */}
      <BeforePanel title={slide.beforeTitle}>
        {slide.beforeContent}
      </BeforePanel>

      {/* After layer (clips over before via springPosition) */}
      <AfterPanel
        title={slide.afterTitle}
        proofStat={slide.proofStat}
        proofLabel={slide.proofLabel}
        springPosition={springPosition as MotionValue<number>}
      >
        {slide.afterContent}
      </AfterPanel>

      {/* Drag handle pinned to divider line */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: handleLeft,
          width: 0,
        }}
      >
        <DragHandle onMouseDown={handleMouseDown} onTouchStart={handleTouchStart} />
      </motion.div>
    </div>
  );
}

function MobileStage({ slide }: BeforeAfterStageProps) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4/3',
        borderRadius: '8px 8px 0 0',
        overflow: 'hidden',
        border: '1px solid var(--line)',
        borderBottom: 'none',
      }}
    >
      {/* Toggle */}
      <div
        style={{
          position: 'absolute',
          top: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          background: 'rgba(0,0,0,0.75)',
          borderRadius: 20,
          padding: 2,
          gap: 2,
        }}
      >
        {(['before', 'after'] as const).map((side) => (
          <button
            key={side}
            onClick={() => setShowAfter(side === 'after')}
            style={{
              padding: '3px 10px',
              borderRadius: 16,
              border: 'none',
              fontSize: 8,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-ui)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: (side === 'after') === showAfter ? 'var(--blue)' : 'transparent',
              color: (side === 'after') === showAfter ? '#fff' : '#666',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            {side}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={showAfter ? 'after' : 'before'}
          initial={{ opacity: 0, x: showAfter ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: showAfter ? -20 : 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
        >
          {showAfter ? (
            <div style={{ position: 'absolute', inset: 0, background: 'var(--bg-dark)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', background: 'var(--dark-card)', borderBottom: '1px solid var(--dark-line)', flexShrink: 0 }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 4px #4ade80' }} />
                <span style={{ fontSize: 8, color: '#4ade80', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 }}>With Cubico</span>
                <span style={{ marginLeft: 'auto', fontSize: 10, color: 'var(--blue)', fontWeight: 700, fontFamily: 'var(--font-display)' }}>{slide.proofStat}</span>
                <span style={{ fontSize: 7, color: 'var(--dark-text-muted)' }}>{slide.proofLabel}</span>
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>{slide.afterContent}</div>
            </div>
          ) : (
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              {slide.beforeContent}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function BeforeAfterStage({ slide }: BeforeAfterStageProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) return <MobileStage slide={slide} />;
  return <DesktopStage slide={slide} />;
}
