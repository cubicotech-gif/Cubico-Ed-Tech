'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, animate, useInView } from 'framer-motion';
import { Grain } from '@/components/ui/Grain';
import { SectionLine } from '@/components/ui/SectionLine';

// ── Tabs ──────────────────────────────────────────────────────────────────────
const TABS = [
  { id: 'lms',       label: 'LMS Dashboard',    tag: 'Moodle Platform' },
  { id: 'animation', label: 'Animation Studio', tag: 'Motion Design' },
  { id: 'portal',    label: 'School Portal',    tag: 'Management System' },
] as const;
type TabId = typeof TABS[number]['id'];

// ── Stats strip ───────────────────────────────────────────────────────────────
const STATS = [
  { to: 50,  suffix: '+', label: 'Projects Delivered' },
  { to: 30,  suffix: '',  label: 'Day Average Delivery' },
  { to: 10,  suffix: '+', label: 'Institutions Served' },
  { to: 100, suffix: '%', label: 'Fixed-Price Contracts' },
];

export default function ExperienceLab() {
  const [activeTab, setActiveTab] = useState<TabId>('lms');

  return (
    <section
      style={{
        position: 'relative',
        backgroundColor: '#080808',
        overflow: 'hidden',
        paddingBottom: 80,
      }}
    >
      <SectionLine />
      <Grain />

      {/* ── Header ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '96px 5% 56px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 40,
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 11,
            color: '#E8622A',
            letterSpacing: '0.4em',
            paddingTop: 8,
            flexShrink: 0,
          }}
        >
          03
        </span>
        <div style={{ flex: 1, minWidth: 280 }}>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              color: '#444',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            Experience Lab
          </div>
          <h2
            style={{
              margin: 0,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            <motion.span
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(38px, 5vw, 72px)',
                color: '#F0EBE3',
              }}
            >
              See it before
            </motion.span>
            <motion.span
              initial={{ clipPath: 'inset(0 100% 0 0)' }}
              whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(38px, 5vw, 72px)',
                color: '#C9A96E',
              }}
            >
              you commission it.
            </motion.span>
          </h2>
        </div>
      </div>

      {/* ── Tab nav ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 5%',
          display: 'flex',
          gap: 4,
          marginBottom: 4,
          flexWrap: 'wrap',
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '0.08em',
              color: activeTab === tab.id ? '#F0EBE3' : '#444',
              backgroundColor: activeTab === tab.id ? '#161616' : 'transparent',
              border: `1px solid ${activeTab === tab.id ? '#2a2a2a' : '#161616'}`,
              borderRadius: 3,
              padding: '10px 20px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            {tab.label}
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 9,
                letterSpacing: '0.15em',
                color: activeTab === tab.id ? '#E8622A' : '#333',
              }}
            >
              {tab.tag}
            </span>
          </button>
        ))}
      </div>

      {/* ── Demo stage ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 5%',
        }}
      >
        <div
          style={{
            border: '1px solid #1a1a1a',
            borderRadius: 4,
            overflow: 'hidden',
            backgroundColor: '#0c0c0c',
            minHeight: 480,
            display: 'flex',
          }}
        >
          {/* Sidebar */}
          <div
            style={{
              width: 220,
              flexShrink: 0,
              borderRight: '1px solid #161616',
              padding: '28px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <div
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 9,
                letterSpacing: '0.25em',
                color: '#333',
                marginBottom: 12,
              }}
            >
              NAVIGATION
            </div>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: activeTab === tab.id ? 600 : 400,
                  fontSize: 12,
                  color: activeTab === tab.id ? '#F0EBE3' : '#3a3a3a',
                  backgroundColor: activeTab === tab.id ? '#1a1a1a' : 'transparent',
                  border: 'none',
                  borderRadius: 3,
                  padding: '9px 12px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    backgroundColor: activeTab === tab.id ? '#E8622A' : '#222',
                    flexShrink: 0,
                    transition: 'background 0.15s',
                  }}
                />
                {tab.label}
              </button>
            ))}

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: '#161616', margin: '12px 0' }} />
            <div
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 9,
                letterSpacing: '0.25em',
                color: '#333',
                marginBottom: 8,
              }}
            >
              QUICK STATS
            </div>
            {[
              { label: 'Active courses', val: '12' },
              { label: 'Students online', val: '247' },
              { label: 'Completion rate', val: '74%' },
            ].map((s) => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#444' }}>{s.label}</span>
                <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 11, color: '#888' }}>{s.val}</span>
              </div>
            ))}
          </div>

          {/* Demo panel */}
          <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: '100%', padding: 28 }}
              >
                {activeTab === 'lms'       && <LMSDemo />}
                {activeTab === 'animation' && <AnimationDemo />}
                {activeTab === 'portal'    && <PortalDemo />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div
        style={{
          maxWidth: 1200,
          margin: '64px auto 0',
          padding: '0 5%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 1,
          backgroundColor: '#1a1a1a',
          border: '1px solid #1a1a1a',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {STATS.map((s) => (
          <StatCell key={s.label} to={s.to} suffix={s.suffix} label={s.label} />
        ))}
      </div>

      {/* ── Endowment CTA ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          maxWidth: 1200,
          margin: '48px auto 0',
          padding: '0 5%',
        }}
      >
        <div
          style={{
            backgroundColor: '#0c0c0c',
            border: '1px solid #1a1a1a',
            borderRadius: 4,
            padding: '36px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontStyle: 'italic',
                fontSize: 22,
                color: '#C9A96E',
                marginBottom: 8,
              }}
            >
              Ready to see a live demo on your own content?
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: '#4a4a4a',
                maxWidth: 480,
              }}
            >
              Share one module or lesson plan. We&apos;ll prototype it in 48 hours — free, no commitment.
            </div>
          </div>
          <a
            href="/contact"
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.05em',
              color: '#E8622A',
              textDecoration: 'none',
              border: '1px solid rgba(232,98,42,0.3)',
              borderRadius: 3,
              padding: '14px 28px',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(232,98,42,0.08)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
            }}
          >
            Request a free prototype →
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ── LMS Demo ──────────────────────────────────────────────────────────────────
const COURSES = [
  { name: 'Mathematics Grade 9',    teacher: 'Mr Hassan Ali',    students: 34, pct: 68, status: 'Active' },
  { name: 'Islamic Studies',        teacher: 'Maulana Ibrahim',  students: 52, pct: 45, status: 'Active' },
  { name: 'Computer Science',       teacher: 'Ms Fatima Khan',   students: 28, pct: 82, status: 'Active' },
  { name: 'English Language Arts',  teacher: 'Ms Sara Siddiqui', students: 41, pct: 61, status: 'Draft' },
];

function LMSDemo() {
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div
          style={{
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: 16,
            color: '#F0EBE3',
          }}
        >
          My Courses
        </div>
        <div
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 10,
            letterSpacing: '0.2em',
            color: '#E8622A',
            backgroundColor: 'rgba(232,98,42,0.08)',
            border: '1px solid rgba(232,98,42,0.2)',
            borderRadius: 3,
            padding: '4px 10px',
          }}
        >
          LIVE PLATFORM
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {COURSES.map((course, i) => (
          <div key={i}>
            <div
              onClick={() => setExpanded(expanded === i ? null : i)}
              style={{
                backgroundColor: expanded === i ? '#161616' : '#111',
                border: `1px solid ${expanded === i ? '#2a2a2a' : '#1a1a1a'}`,
                borderRadius: 4,
                padding: '12px 16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                transition: 'all 0.15s ease',
              }}
            >
              {/* Progress circle (simplified as coloured dot) */}
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: course.pct > 75 ? '#10B981' : course.pct > 50 ? '#E8622A' : '#C9A96E',
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 13, color: '#ddd' }}>
                  {course.name}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#444', marginTop: 2 }}>
                  {course.teacher}
                </div>
              </div>
              {/* Progress bar */}
              <div style={{ width: 80, flexShrink: 0 }}>
                <div style={{ height: 3, backgroundColor: '#222', borderRadius: 2, overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${course.pct}%`,
                      backgroundColor: '#E8622A',
                      borderRadius: 2,
                    }}
                  />
                </div>
                <div style={{ fontFamily: 'var(--font-accent)', fontSize: 10, color: '#555', marginTop: 3, textAlign: 'right' }}>
                  {course.pct}%
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: 9,
                  letterSpacing: '0.15em',
                  color: course.status === 'Active' ? '#10B981' : '#444',
                  padding: '2px 8px',
                  border: `1px solid ${course.status === 'Active' ? 'rgba(16,185,129,0.25)' : '#222'}`,
                  borderRadius: 2,
                  flexShrink: 0,
                }}
              >
                {course.status}
              </div>
              <span style={{ color: '#333', fontSize: 10 }}>{expanded === i ? '▲' : '▼'}</span>
            </div>

            <AnimatePresence>
              {expanded === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    style={{
                      backgroundColor: '#0e0e0e',
                      border: '1px solid #1a1a1a',
                      borderTop: 'none',
                      borderRadius: '0 0 4px 4px',
                      padding: '14px 16px',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: 12,
                    }}
                  >
                    {[
                      { label: 'Students enrolled', val: course.students },
                      { label: 'Avg. completion',   val: `${course.pct}%` },
                      { label: 'Module units',      val: Math.floor(course.pct / 10) + 2 },
                    ].map((s) => (
                      <div key={s.label}>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: '#444', marginBottom: 4 }}>{s.label}</div>
                        <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 15, color: '#aaa' }}>{s.val}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Animation Demo — CSS solar system ─────────────────────────────────────────
const EPISODES = [
  { num: '01', title: 'Solar System Motion', dur: '2:14', type: '3D Animation' },
  { num: '02', title: 'Cell Division Cycle', dur: '1:48', type: '2D Explainer' },
  { num: '03', title: 'Water Cycle Diagram', dur: '3:02', type: 'Motion Graphic' },
];

function AnimationDemo() {
  const [playing, setPlaying] = useState(false);
  const [activeEp, setActiveEp] = useState(0);

  return (
    <div style={{ display: 'flex', gap: 20, height: '100%' }}>
      {/* Solar system preview */}
      <div
        style={{
          flex: 1,
          minHeight: 300,
          backgroundColor: '#06060e',
          borderRadius: 4,
          border: '1px solid #1a1a1a',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Star field */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(1px 1px at 15% 25%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1px 1px at 65% 10%, rgba(255,255,255,0.3) 0%, transparent 100%),
              radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,0.4) 0%, transparent 100%),
              radial-gradient(1px 1px at 40% 80%, rgba(255,255,255,0.2) 0%, transparent 100%),
              radial-gradient(1px 1px at 90% 40%, rgba(255,255,255,0.3) 0%, transparent 100%)`,
          }}
        />

        {/* Solar system */}
        <div style={{ position: 'relative', width: 200, height: 200 }}>
          {/* Sun */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 28,
              height: 28,
              borderRadius: '50%',
              backgroundColor: '#FDB847',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 20px rgba(253,184,71,0.6), 0 0 40px rgba(253,184,71,0.3)',
            }}
          />

          {/* Orbit 1 */}
          <div
            className={playing ? 'orbit-ring orbit-1' : 'orbit-ring'}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 80,
              height: 80,
              marginTop: -40,
              marginLeft: -40,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.08)',
              animation: playing ? 'orbit-spin 4s linear infinite' : 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -5,
                left: '50%',
                marginLeft: -5,
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: '#4A90D9',
                boxShadow: '0 0 8px rgba(74,144,217,0.6)',
              }}
            />
          </div>

          {/* Orbit 2 */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 130,
              height: 130,
              marginTop: -65,
              marginLeft: -65,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.06)',
              animation: playing ? 'orbit-spin 8s linear infinite' : 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -7,
                left: '50%',
                marginLeft: -7,
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: '#E8622A',
                boxShadow: '0 0 10px rgba(232,98,42,0.6)',
              }}
            />
          </div>

          {/* Orbit 3 */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 180,
              height: 180,
              marginTop: -90,
              marginLeft: -90,
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.04)',
              animation: playing ? 'orbit-spin 14s linear infinite reverse' : 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -5,
                left: '50%',
                marginLeft: -5,
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: '#C9A96E',
                boxShadow: '0 0 8px rgba(201,169,110,0.6)',
              }}
            />
          </div>
        </div>

        {/* Play/pause */}
        <button
          onClick={() => setPlaying(!playing)}
          style={{
            position: 'absolute',
            bottom: 14,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'var(--font-ui)',
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: '0.1em',
            color: playing ? '#F0EBE3' : '#E8622A',
            backgroundColor: playing ? 'rgba(232,98,42,0.15)' : 'rgba(232,98,42,0.08)',
            border: '1px solid rgba(232,98,42,0.3)',
            borderRadius: 3,
            padding: '7px 16px',
            cursor: 'pointer',
          }}
        >
          {playing ? '⏸ PAUSE' : '▶ PLAY ANIMATION'}
        </button>
      </div>

      {/* Episode list */}
      <div style={{ width: 180, flexShrink: 0 }}>
        <div
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 9,
            letterSpacing: '0.2em',
            color: '#333',
            marginBottom: 10,
          }}
        >
          SAMPLE REEL
        </div>
        {EPISODES.map((ep, i) => (
          <div
            key={ep.num}
            onClick={() => setActiveEp(i)}
            style={{
              padding: '10px 12px',
              marginBottom: 4,
              borderRadius: 3,
              border: `1px solid ${activeEp === i ? '#2a2a2a' : '#161616'}`,
              backgroundColor: activeEp === i ? '#161616' : 'transparent',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--font-accent)', fontSize: 9, color: '#E8622A', letterSpacing: '0.15em' }}>{ep.num}</span>
              <span style={{ fontFamily: 'var(--font-accent)', fontSize: 9, color: '#333', letterSpacing: '0.1em' }}>{ep.dur}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 11, color: activeEp === i ? '#ddd' : '#555', lineHeight: 1.3 }}>
              {ep.title}
            </div>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 10, color: '#333', marginTop: 3 }}>{ep.type}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Portal Demo ────────────────────────────────────────────────────────────────
const STUDENTS = [
  { name: 'Aisha Mahmoud',   grade: '9-A', fee: 'Paid',    avatar: 'AM' },
  { name: 'Omar Khalid',     grade: '9-B', fee: 'Due',     avatar: 'OK' },
  { name: 'Fatima Hassan',   grade: '10-A', fee: 'Paid',   avatar: 'FH' },
  { name: 'Ibrahim Yusuf',   grade: '10-B', fee: 'Overdue', avatar: 'IY' },
];

function PortalDemo() {
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof STUDENTS[0] | null>(null);

  const openPayment = (student: typeof STUDENTS[0]) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 16, color: '#F0EBE3' }}>
          Student Fee Management
        </div>
        <div
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 10,
            letterSpacing: '0.2em',
            color: '#10B981',
            backgroundColor: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.2)',
            borderRadius: 3,
            padding: '4px 10px',
          }}
        >
          LIVE PORTAL
        </div>
      </div>

      {/* Students table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {STUDENTS.map((student) => (
          <div
            key={student.name}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '11px 14px',
              backgroundColor: '#111',
              border: '1px solid #1a1a1a',
              borderRadius: 4,
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                backgroundColor: '#1a1a2e',
                border: '1px solid #2a2a3e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <span style={{ fontFamily: 'var(--font-accent)', fontSize: 10, color: '#C9A96E', letterSpacing: '0.05em' }}>
                {student.avatar}
              </span>
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 13, color: '#ddd' }}>
                {student.name}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#444', marginTop: 1 }}>
                Grade {student.grade}
              </div>
            </div>

            {/* Fee badge */}
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 9,
                letterSpacing: '0.15em',
                padding: '3px 9px',
                borderRadius: 2,
                border: `1px solid ${
                  student.fee === 'Paid'    ? 'rgba(16,185,129,0.3)'  :
                  student.fee === 'Due'     ? 'rgba(232,98,42,0.3)'   :
                  'rgba(239,68,68,0.3)'
                }`,
                color:
                  student.fee === 'Paid'    ? '#10B981' :
                  student.fee === 'Due'     ? '#E8622A' :
                  '#EF4444',
                backgroundColor:
                  student.fee === 'Paid'    ? 'rgba(16,185,129,0.06)'  :
                  student.fee === 'Due'     ? 'rgba(232,98,42,0.06)'   :
                  'rgba(239,68,68,0.06)',
              }}
            >
              {student.fee.toUpperCase()}
            </span>

            {student.fee !== 'Paid' && (
              <button
                onClick={() => openPayment(student)}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 600,
                  fontSize: 11,
                  color: '#E8622A',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(232,98,42,0.25)',
                  borderRadius: 3,
                  padding: '5px 12px',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                  flexShrink: 0,
                }}
              >
                Collect
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Payment modal */}
      <AnimatePresence>
        {showModal && selectedStudent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0,0,0,0.7)',
                borderRadius: 4,
                zIndex: 10,
              }}
            />
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: '#141414',
                border: '1px solid #2a2a2a',
                borderBottom: 'none',
                borderRadius: '8px 8px 0 0',
                padding: '24px 20px',
                zIndex: 11,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 15, color: '#F0EBE3' }}>
                  Collect Fee Payment
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  style={{ background: 'none', border: 'none', color: '#555', fontSize: 18, cursor: 'pointer', lineHeight: 1 }}
                >
                  ×
                </button>
              </div>

              <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#555', marginBottom: 16 }}>
                Student: <span style={{ color: '#aaa' }}>{selectedStudent.name}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 16 }}>
                {[
                  { label: 'Tuition Fee', amount: 'PKR 12,000' },
                  { label: 'Lab Fee',     amount: 'PKR 1,500' },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      backgroundColor: '#0e0e0e',
                      border: '1px solid #222',
                      borderRadius: 4,
                      padding: '12px 14px',
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#444', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 14, color: '#ddd' }}>{item.amount}</div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowModal(false)}
                style={{
                  width: '100%',
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 13,
                  color: '#fff',
                  backgroundColor: '#E8622A',
                  border: 'none',
                  borderRadius: 4,
                  padding: '13px',
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                }}
              >
                Confirm Payment — PKR 13,500
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── CountUp stat cell ─────────────────────────────────────────────────────────
function StatCell({ to, suffix, label }: { to: number; suffix: string; label: string }) {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
    });
    return () => controls.stop();
  }, [inView, count, to]);

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: '#0a0a0a',
        padding: '28px 32px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-accent)',
          fontSize: 'clamp(36px, 4vw, 56px)',
          color: '#F0EBE3',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        {display}
        <span style={{ color: '#E8622A' }}>{suffix}</span>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 11,
          color: '#444',
          letterSpacing: '0.15em',
          marginTop: 8,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
    </div>
  );
}
