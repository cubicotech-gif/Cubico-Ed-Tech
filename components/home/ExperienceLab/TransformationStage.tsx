'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LMSDemo } from './demos/LMSDemo';
import { ERPDemo } from './demos/ERPDemo';
import { WebsiteDemo } from './demos/WebsiteDemo';
import { AnimationDemo } from './demos/AnimationDemo';

interface TransformationStageProps {
  displayName: string;
  schoolSlug: string;
  hasStartedTyping: boolean;
  isComplete: boolean;
}

export function TransformationStage({
  displayName,
  schoolSlug,
  hasStartedTyping,
  isComplete,
}: TransformationStageProps) {
  const [showMobileAll, setShowMobileAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  const panelMinHeight = 'clamp(280px, 35vh, 400px)';
  const gridBorderColor = isComplete ? 'rgba(232,98,42,0.3)' : '#1d1d1d';

  return (
    <div
      style={{
        background: '#090909',
        border: `1px solid ${gridBorderColor}`,
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'border-color 600ms ease',
        position: 'relative',
      }}
    >
      {/* Mobile: single column with toggle */}
      {isMobile ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            background: '#1d1d1d',
          }}
        >
          {/* Always show LMS */}
          <div style={{ background: '#060606', minHeight: panelMinHeight, position: 'relative' }}>
            <Veil hasStartedTyping={hasStartedTyping} />
            <LMSDemo displayName={displayName} isComplete={isComplete} />
          </div>

          {/* Mobile drawer: remaining 3 demos */}
          {showMobileAll && (
            <>
              <div style={{ background: '#060606', minHeight: panelMinHeight }}>
                <ERPDemo displayName={displayName} isComplete={isComplete} />
              </div>
              <div style={{ background: '#060606', minHeight: panelMinHeight }}>
                <WebsiteDemo displayName={displayName} schoolSlug={schoolSlug} isComplete={isComplete} />
              </div>
              <div style={{ background: '#060606', minHeight: panelMinHeight }}>
                <AnimationDemo displayName={displayName} isComplete={isComplete} />
              </div>
            </>
          )}

          {!showMobileAll && (
            <button
              onClick={() => setShowMobileAll(true)}
              style={{
                background: '#0a0a0a',
                border: 'none',
                padding: '14px',
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                fontSize: 11,
                color: '#E8622A',
                cursor: 'pointer',
                letterSpacing: '0.05em',
              }}
            >
              Tap to see ERP, Website &amp; Animation demos ↓
            </button>
          )}
        </div>
      ) : (
        /* Desktop: 2×2 grid */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 1,
            background: '#1d1d1d',
          }}
        >
          {/* Row 1 */}
          <div style={{ background: '#060606', minHeight: panelMinHeight, position: 'relative', overflow: 'hidden' }}>
            <Veil hasStartedTyping={hasStartedTyping} />
            <LMSDemo displayName={displayName} isComplete={isComplete} />
          </div>
          <div style={{ background: '#060606', minHeight: panelMinHeight, position: 'relative', overflow: 'hidden' }}>
            <Veil hasStartedTyping={hasStartedTyping} />
            <ERPDemo displayName={displayName} isComplete={isComplete} />
          </div>
          {/* Row 2 */}
          <div style={{ background: '#060606', minHeight: panelMinHeight, position: 'relative', overflow: 'hidden' }}>
            <Veil hasStartedTyping={hasStartedTyping} />
            <WebsiteDemo displayName={displayName} schoolSlug={schoolSlug} isComplete={isComplete} />
          </div>
          <div style={{ background: '#060606', minHeight: panelMinHeight, position: 'relative', overflow: 'hidden' }}>
            <Veil hasStartedTyping={hasStartedTyping} />
            <AnimationDemo displayName={displayName} isComplete={isComplete} />
          </div>
        </div>
      )}
    </div>
  );
}

// Dark veil overlay shown when idle — fades out on first typing
function Veil({ hasStartedTyping }: { hasStartedTyping: boolean }) {
  return (
    <motion.div
      animate={{ opacity: hasStartedTyping ? 0 : 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 10,
        background: 'rgba(5,5,5,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: hasStartedTyping ? 'none' : 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.12em',
          color: '#2A2A2A',
          textTransform: 'uppercase',
        }}
      >
        ↑ Type above to personalise
      </span>
    </motion.div>
  );
}
