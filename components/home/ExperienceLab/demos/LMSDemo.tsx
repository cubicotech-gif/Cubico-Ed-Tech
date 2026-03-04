'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { PANEL_DELAYS } from '../transformUtils';

interface LMSDemoProps {
  displayName: string;
  isComplete: boolean;
}

// Animated name span — blur/fade dissolve on change
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

const COURSES = [
  { name: 'Mathematics Grade 9', teacher: 'Mr Hassan', students: 34, pct: 68 },
  { name: 'Islamic Studies', teacher: 'Maulana Ibrahim', students: 52, pct: 45 },
  { name: 'Computer Science', teacher: 'Ms Fatima', students: 28, pct: 82 },
];

const LMSDemo = React.memo(function LMSDemo({ displayName, isComplete }: LMSDemoProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#060606',
        overflow: 'hidden',
      }}
    >
      {/* Top app bar */}
      <div
        style={{
          height: 38,
          background: '#060606',
          borderBottom: '1px solid #1d1d1d',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 12,
            color: '#E8622A',
            whiteSpace: 'nowrap',
          }}
        >
          <NameSpan name={displayName} delay={PANEL_DELAYS.lms} />
          <span style={{ color: 'rgba(232,98,42,0.5)' }}> LMS</span>
        </span>

        {/* Nav */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
          }}
        >
          {['Dashboard', 'Courses', 'Students', 'Grades'].map((item) => (
            <span
              key={item}
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 500,
                fontSize: 9,
                color: item === 'Dashboard' ? '#F0EBE3' : '#6A6460',
              }}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Right: bell + avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 10, color: '#6A6460' }}>🔔</span>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #E8622A, #C9A96E)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontSize: 9, color: '#fff', fontWeight: 700 }}>P</span>
          </div>
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
        {/* Welcome header */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 14,
              color: '#F0EBE3',
            }}
          >
            Good morning, Principal
          </div>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 400,
              fontSize: 9,
              color: '#6A6460',
              marginTop: 2,
            }}
          >
            <NameSpan name={displayName} delay={PANEL_DELAYS.lms} /> · 47 students online
          </div>
        </div>

        {/* Stat grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
          {[
            { n: '847', label: 'STUDENTS', color: '#E8622A' },
            { n: '24', label: 'COURSES', color: '#C9A96E' },
            { n: '94%', label: 'ATTENDANCE', color: '#10B981' },
            { n: '12', label: 'DUE TODAY', color: '#E05C8A' },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: '#050505',
                border: '1px solid #1d1d1d',
                padding: '10px 12px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-stamp)',
                  fontSize: 22,
                  color: s.color,
                  lineHeight: 1,
                }}
              >
                {s.n}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 8,
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

        {/* Course list */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-stamp)',
              fontSize: 9,
              letterSpacing: '0.2em',
              color: '#C9A96E',
              marginBottom: 5,
            }}
          >
            ACTIVE COURSES
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {COURSES.map((course) => (
              <div
                key={course.name}
                style={{
                  background: '#050505',
                  border: '1px solid #1d1d1d',
                  padding: '8px 12px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 100px 36px',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 10,
                      color: '#F0EBE3',
                    }}
                  >
                    {course.name}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 400,
                      fontSize: 8,
                      color: '#6A6460',
                    }}
                  >
                    {course.teacher} · {course.students} students
                  </div>
                </div>
                <div
                  style={{ height: 2, background: '#1d1d1d', borderRadius: 1, overflow: 'hidden' }}
                >
                  <div
                    style={{
                      width: `${course.pct}%`,
                      height: '100%',
                      background: 'linear-gradient(to right, #E8622A, #C9A96E)',
                    }}
                  />
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-stamp)',
                    fontSize: 16,
                    color: '#E8622A',
                    textAlign: 'right',
                  }}
                >
                  {course.pct}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid #1d1d1d',
            paddingTop: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 'auto',
          }}
        >
          <div
            className="symptom-pulse"
            style={{ width: 4, height: 4, borderRadius: '50%', background: '#10B981' }}
          />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#6A6460', flex: 1 }}>
            System live · All services operational
          </span>
          <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 8, color: '#2A2A2A' }}>
            <NameSpan name={displayName} delay={PANEL_DELAYS.lms} />
          </span>
          {isComplete && (
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
          )}
        </div>
      </div>
    </div>
  );
});

export { LMSDemo };
