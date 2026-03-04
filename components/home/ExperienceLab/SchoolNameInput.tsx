'use client';

import { useEffect, useCallback, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { getProgressWidth, CHIP_THRESHOLDS } from './transformUtils';

interface SchoolNameInputProps {
  schoolName: string;
  hasStartedTyping: boolean;
  isComplete: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onChange: (value: string) => void;
}

const CHIPS = [
  { key: 'lms', label: 'LMS', threshold: CHIP_THRESHOLDS.lms },
  { key: 'erp', label: 'ERP', threshold: CHIP_THRESHOLDS.erp },
  { key: 'website', label: 'WEBSITE', threshold: CHIP_THRESHOLDS.website },
  { key: 'animation', label: 'ANIMATIONS', threshold: CHIP_THRESHOLDS.animation },
] as const;

export function SchoolNameInput({
  schoolName,
  hasStartedTyping,
  isComplete,
  inputRef,
  onChange,
}: SchoolNameInputProps) {
  const prefersReducedMotion = useReducedMotion();
  const progressWidth = getProgressWidth(schoolName.length);
  const charsLeft = Math.max(6 - schoolName.length, 0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Auto-focus when section scrolls into view (desktop only)
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    const target = sectionRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStartedTyping) {
          inputRef.current?.focus();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [hasStartedTyping, inputRef]);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <div ref={sectionRef} style={{ position: 'relative', padding: '48px 0 40px' }}>
      {/* The dramatic input field */}
      <style>{`
        #school-name-input::placeholder { color: #2A2A2A; font-style: italic; }
        #school-name-input:focus { border-bottom-color: rgba(232,98,42,0.4); outline: none; }
      `}</style>
      <input
        id="school-name-input"
        ref={inputRef}
        type="text"
        value={schoolName}
        onChange={handleInput}
        maxLength={40}
        placeholder="Type your school's name..."
        autoComplete="off"
        spellCheck={false}
        style={{
          display: 'block',
          width: '100%',
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontStyle: 'italic',
          fontSize: 'clamp(40px, 6vw, 88px)',
          color: '#F0EBE3',
          letterSpacing: '-0.03em',
          background: 'transparent',
          border: 'none',
          borderBottom: '1px solid #272727',
          padding: '0 0 20px 0',
          caretColor: '#E8622A',
          transition: 'border-bottom-color 300ms ease',
          boxSizing: 'border-box',
        }}
      />

      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          right: 0,
          height: 2,
          background: '#111',
        }}
      >
        <motion.div
          animate={{ width: `${progressWidth}%` }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '100%',
            background: 'linear-gradient(to right, #E8622A, #C9A96E)',
            boxShadow: isComplete ? '0 0 8px rgba(232,98,42,0.6)' : 'none',
          }}
        />
      </div>

      {/* Progress label */}
      <div
        style={{
          position: 'absolute',
          bottom: 44,
          right: 0,
        }}
      >
        <AnimatePresence mode="wait">
          {isComplete ? (
            <motion.span
              key="complete"
              initial={prefersReducedMotion ? {} : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: '0.2em',
                color: '#E8622A',
                textTransform: 'uppercase',
              }}
            >
              ✓ TRANSFORMATION COMPLETE
            </motion.span>
          ) : schoolName.length === 0 ? (
            <motion.span
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                fontSize: 10,
                color: '#2A2A2A',
              }}
            >
              6 characters to activate
            </motion.span>
          ) : (
            <motion.span
              key={`count-${charsLeft}`}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                fontSize: 10,
                color: '#C9A96E',
              }}
            >
              {charsLeft} more to activate
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Service indicator chips */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          marginTop: 16,
          flexWrap: 'wrap',
        }}
      >
        {CHIPS.map((chip) => {
          const isActive = schoolName.length >= chip.threshold;
          const chipComplete = isComplete;

          return (
            <motion.div
              key={chip.key}
              animate={
                chipComplete
                  ? { scale: 1, opacity: 1 }
                  : isActive
                  ? { scale: 1, opacity: 1 }
                  : { scale: 1, opacity: 1 }
              }
              initial={
                isActive && !chipComplete
                  ? { scale: 0.95, opacity: 0 }
                  : {}
              }
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 12px',
                border: `1px solid ${
                  chipComplete
                    ? 'rgba(16,185,129,0.2)'
                    : isActive
                    ? 'rgba(232,98,42,0.2)'
                    : '#1d1d1d'
                }`,
                borderRadius: 2,
                background: chipComplete
                  ? 'rgba(16,185,129,0.10)'
                  : isActive
                  ? 'rgba(232,98,42,0.08)'
                  : '#0a0a0a',
                transition: 'background 300ms ease, border-color 300ms ease',
              }}
            >
              <div
                className={isActive && !prefersReducedMotion ? 'symptom-pulse' : undefined}
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: chipComplete ? '#10B981' : isActive ? '#E8622A' : '#2A2A2A',
                  transition: 'background 300ms ease',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-stamp)',
                  fontSize: 9,
                  letterSpacing: '0.25em',
                  color: chipComplete ? '#10B981' : isActive ? '#E8622A' : '#2A2A2A',
                  transition: 'color 300ms ease',
                }}
              >
                {chip.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
