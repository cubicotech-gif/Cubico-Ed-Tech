"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// ─── Solution data ────────────────────────────────────────────────────────────
const SOLUTIONS = [
  {
    id: 'manage',
    num: '01',
    icon: '🏫',
    name: 'Cubico Manage™',
    tagline: 'Run your institution smarter',
    description:
      'Student records, attendance, fees, timetables, parent portals, and staff management — all from one dashboard. Eliminate paperwork. Connect every stakeholder.',
    features: [
      'Student Information System',
      'Fee & Finance Management',
      'Parent Communication Portal',
      'Automated Attendance Tracking',
      'Staff HR & Payroll',
      'Real-time Analytics Dashboard',
    ],
    waText: 'Hi! I want to know more about your school management system.',
    color: '#F97316',
    light: 'rgba(249,115,22,0.08)',
    border: 'rgba(249,115,22,0.2)',
  },
  {
    id: 'teach',
    num: '02',
    icon: '🎬',
    name: 'Cubico Teach™',
    tagline: 'Transform how educators deliver',
    description:
      'Your textbooks come alive as 2D/3D animated lessons, visual comic books, and structured digital materials — in English, Arabic, and Urdu. Made with real educators.',
    features: [
      '2D / 3D Animated Lessons',
      'Visual Comic Books',
      'Multilingual (EN / AR / UR)',
      'Custom Course Design',
      'Structured Lesson Plans',
      'Formative Assessments',
    ],
    waText: "Hi! I'm interested in animated lesson content and course digitization.",
    color: '#8B5CF6',
    light: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
  },
  {
    id: 'learn',
    num: '03',
    icon: '🎮',
    name: 'Cubico Learn™',
    tagline: 'Make students love learning',
    description:
      'Game-based modules turn STEM concepts into interactive adventures. Gamified assessments replace boring tests. Real-time progress tracking visible to parents and educators.',
    features: [
      'Game-Based STEM Modules',
      'Gamified Assessments',
      'Live Progress Tracking',
      'Student Leaderboards',
      'Parent Dashboard Access',
      'Adaptive Learning Paths',
    ],
    waText: 'Hi! Tell me about your game-based learning solutions for students.',
    color: '#10B981',
    light: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.2)',
  },
  {
    id: 'scale',
    num: '04',
    icon: '🚀',
    name: 'Cubico Scale™',
    tagline: 'Go from classic to world-class',
    description:
      'Moodle LMS deployment, custom platforms, digital infrastructure, staff training, and 24/7 support. Full digital transformation with one trusted partner.',
    features: [
      'Moodle LMS Deployment',
      'Custom Platform Development',
      'Digital Infrastructure Setup',
      'Staff Onboarding & Training',
      'Strategic EdTech Consulting',
      '24/7 Ongoing Support',
    ],
    waText: "Hi! We're looking to digitally transform our institution with Moodle/LMS.",
    color: '#3B82F6',
    light: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.2)',
  },
] as const;

// ─── Inline product preview: Manage ──────────────────────────────────────────
function ManagePreview() {
  const students = [
    { name: 'Aisha Khan',    grade: '5-A', status: 'Present', fee: 'Paid'    },
    { name: 'Omar Farooq',   grade: '5-A', status: 'Present', fee: 'Paid'    },
    { name: 'Sara Ali',      grade: '6-B', status: 'Absent',  fee: 'Pending' },
    { name: 'Zaid Ahmed',    grade: '6-B', status: 'Present', fee: 'Paid'    },
    { name: 'Fatima Sheikh', grade: '7-C', status: 'Present', fee: 'Paid'    },
  ];

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 16, overflow: 'hidden' }}>
      {/* Top stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 14 }}>
        {[
          { label: 'Students', value: '1,247', icon: '👥', color: '#F97316' },
          { label: 'Present',  value: '94%',   icon: '✅', color: '#10B981' },
          { label: 'Fees Due', value: '₨ 48k', icon: '💰', color: '#F59E0B' },
          { label: 'Staff',    value: '86',     icon: '👩‍🏫', color: '#3B82F6' },
        ].map(s => (
          <div key={s.label} style={{ backgroundColor: '#fff', border: '1px solid #E4E4E7', borderRadius: 8, padding: '10px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: 14, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 700, color: '#18181B' }}>{s.value}</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: '#71717A', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Student table */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #E4E4E7', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 60px 70px 60px', padding: '8px 14px', backgroundColor: '#F9FAFB', borderBottom: '1px solid #E4E4E7' }}>
          {['Student', 'Grade', 'Status', 'Fee'].map(h => (
            <div key={h} style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 600, color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</div>
          ))}
        </div>
        {students.map((s, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 60px 70px 60px', padding: '9px 14px', borderBottom: i < students.length - 1 ? '1px solid #F4F4F5' : 'none', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: '#18181B' }}>{s.name}</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: '#71717A' }}>{s.grade}</div>
            <div>
              <span style={{
                fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 600,
                color: s.status === 'Present' ? '#10B981' : '#EF4444',
                backgroundColor: s.status === 'Present' ? '#D1FAE5' : '#FEE2E2',
                borderRadius: 100, padding: '2px 7px',
              }}>
                {s.status}
              </span>
            </div>
            <div>
              <span style={{
                fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 600,
                color: s.fee === 'Paid' ? '#10B981' : '#F59E0B',
              }}>
                {s.fee}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Inline product preview: Teach ───────────────────────────────────────────
function TeachPreview() {
  const lessons = [
    { title: 'Photosynthesis', subject: 'Biology', lang: 'EN', progress: 100, type: '3D Anim' },
    { title: 'الكسور العشرية', subject: 'Maths',    lang: 'AR', progress: 75,  type: '2D Anim' },
    { title: 'Forces & Motion', subject: 'Physics',  lang: 'EN', progress: 60,  type: 'Comic'   },
    { title: 'سيرة النبي ﷺ',   subject: 'Islamic',  lang: 'AR', progress: 90,  type: '2D Anim' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 16, overflow: 'hidden' }}>
      {/* Now creating header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700, color: '#18181B' }}>Content Library</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 5,
          backgroundColor: '#8B5CF6', borderRadius: 100,
          padding: '4px 10px',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#fff', opacity: 0.9, display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>LIVE</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {lessons.map((l, i) => (
          <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #E4E4E7', borderRadius: 10, padding: '11px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Thumbnail */}
            <div style={{
              width: 40, height: 40, borderRadius: 8, flexShrink: 0,
              background: 'linear-gradient(135deg, #8B5CF6, #C4B5FD)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16,
            }}>
              🎬
            </div>
            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: '#18181B', direction: l.lang === 'AR' ? 'rtl' : 'ltr' }}>{l.title}</span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#8B5CF6', backgroundColor: 'rgba(139,92,246,0.1)', borderRadius: 4, padding: '1px 5px' }}>{l.lang}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ flex: 1, height: 3, backgroundColor: '#F4F4F5', borderRadius: 2 }}>
                  <div style={{ width: `${l.progress}%`, height: '100%', backgroundColor: l.progress === 100 ? '#10B981' : '#8B5CF6', borderRadius: 2 }} />
                </div>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: '#71717A', flexShrink: 0 }}>{l.progress}%</span>
              </div>
            </div>
            {/* Type badge */}
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 600, color: '#8B5CF6', backgroundColor: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)', borderRadius: 6, padding: '3px 8px', flexShrink: 0 }}>
              {l.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Inline product preview: Learn ───────────────────────────────────────────
function LearnPreview() {
  const modules = [
    { name: 'Algebra Quest',    xp: 840,  level: 7,  icon: '🔢', done: 18, total: 24 },
    { name: 'Science Explorer', xp: 1200, level: 10, icon: '🔬', done: 24, total: 24 },
    { name: 'Arabic Adventures', xp: 440, level: 4,  icon: '🌙', done: 9,  total: 20 },
  ];
  const leaders = [
    { name: 'Zaid A.',   pts: 2840, pos: 1 },
    { name: 'Aisha K.',  pts: 2640, pos: 2 },
    { name: 'Omar F.',   pts: 2310, pos: 3 },
  ];

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 16, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 110px', gap: 10 }}>
      {/* Game modules */}
      <div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, color: '#18181B', marginBottom: 8 }}>Active Modules</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {modules.map((m, i) => (
            <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #E4E4E7', borderRadius: 10, padding: '10px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 16 }}>{m.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: '#18181B' }}>{m.name}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: '#10B981', fontWeight: 600 }}>⭐ {m.xp} XP</span>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: '#71717A' }}>Lv.{m.level}</span>
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: '#71717A' }}>{m.done}/{m.total}</span>
              </div>
              <div style={{ height: 4, backgroundColor: '#F4F4F5', borderRadius: 2 }}>
                <div style={{ width: `${(m.done / m.total) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #10B981, #34D399)', borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, color: '#18181B', marginBottom: 8 }}>Top This Week</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {leaders.map((l, i) => (
            <div key={i} style={{ backgroundColor: i === 0 ? 'rgba(16,185,129,0.07)' : '#fff', border: `1px solid ${i === 0 ? 'rgba(16,185,129,0.2)' : '#E4E4E7'}`, borderRadius: 8, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11 }}>{['🥇', '🥈', '🥉'][i]}</span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, color: '#10B981' }}>{l.pts}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 600, color: '#3F3F46' }}>{l.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Inline product preview: Scale ───────────────────────────────────────────
function ScalePreview() {
  const courses = [
    { title: 'Grade 5 Mathematics',   enrolled: 48,  done: 82, instructor: 'Mr. Ali'    },
    { title: 'Arabic Language Yr. 2', enrolled: 36,  done: 65, instructor: 'Ustaz Omar' },
    { title: 'Science & Technology',  enrolled: 52,  done: 90, instructor: 'Ms. Sarah'  },
    { title: 'Islamic Studies',        enrolled: 64,  done: 71, instructor: 'Ustaza F.'  },
  ];

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: '#F8FAFC', borderRadius: 12, padding: 16, overflow: 'hidden' }}>
      {/* Infra stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 12 }}>
        {[
          { label: 'Uptime',   value: '99.9%', color: '#10B981' },
          { label: 'Learners', value: '1,247', color: '#3B82F6' },
          { label: 'Courses',  value: '38',    color: '#F97316' },
        ].map(s => (
          <div key={s.label} style={{ backgroundColor: '#fff', border: '1px solid #E4E4E7', borderRadius: 8, padding: '10px 10px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#71717A', marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Course list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {courses.map((c, i) => (
          <div key={i} style={{ backgroundColor: '#fff', border: '1px solid #E4E4E7', borderRadius: 9, padding: '10px 12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: '#18181B' }}>{c.title}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: '#71717A', marginTop: 1 }}>{c.instructor} · {c.enrolled} enrolled</div>
              </div>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, color: c.done >= 80 ? '#10B981' : '#3B82F6' }}>{c.done}%</span>
            </div>
            <div style={{ height: 3, backgroundColor: '#F4F4F5', borderRadius: 2 }}>
              <div style={{ width: `${c.done}%`, height: '100%', background: c.done >= 80 ? 'linear-gradient(90deg, #10B981, #34D399)' : 'linear-gradient(90deg, #3B82F6, #60A5FA)', borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PREVIEWS = [ManagePreview, TeachPreview, LearnPreview, ScalePreview];

// ─── Check icon ───────────────────────────────────────────────────────────────
function Check({ color }: { color: string }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="7.5" cy="7.5" r="7.5" fill={color} fillOpacity="0.1" />
      <path d="M4.5 7.5l2.25 2.25 3.75-3.75" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function PillarsSection() {
  const [active, setActive] = useState(0);
  const sol = SOLUTIONS[active];
  const PreviewComp = PREVIEWS[active];
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });
  const waLink = `https://wa.me/923001234567?text=${encodeURIComponent(sol.waText)}`;

  return (
    <section id="solutions" style={{ backgroundColor: '#FFFFFF', padding: '96px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>

        {/* ── Section header ── */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: 52 }}
        >
          <span style={{
            display: 'inline-block',
            fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
            color: '#F97316', letterSpacing: '0.12em', textTransform: 'uppercase',
            backgroundColor: 'rgba(249,115,22,0.07)',
            border: '1px solid rgba(249,115,22,0.18)',
            borderRadius: 100, padding: '4px 14px', marginBottom: 16,
          }}>
            Solutions
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 700, color: '#18181B',
            margin: '0 0 14px', letterSpacing: '-0.025em',
          }}>
            Four pillars. One mission.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 17,
            color: '#71717A', maxWidth: 480, margin: '0 auto', lineHeight: 1.7,
          }}>
            Management, content, learning, and infrastructure — one partner, every layer.
          </p>
        </motion.div>

        {/* ── Tab switcher ── */}
        <div style={{
          display: 'flex', gap: 6, justifyContent: 'center',
          flexWrap: 'wrap', marginBottom: 40,
          position: 'relative',
        }}>
          {SOLUTIONS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              style={{
                position: 'relative',
                fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 14,
                padding: '10px 22px', borderRadius: 100,
                border: active === i ? `1.5px solid ${s.color}` : '1.5px solid #E4E4E7',
                background: active === i ? s.light : 'transparent',
                color: active === i ? s.color : '#71717A',
                cursor: 'pointer',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', gap: 7,
              }}
            >
              <span style={{ fontSize: 16 }}>{s.icon}</span>
              {s.name}
              {active === i && (
                <motion.span
                  layoutId="tab-dot"
                  style={{
                    display: 'inline-block', width: 6, height: 6,
                    borderRadius: '50%', backgroundColor: s.color,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Split content panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 0,
              border: '1px solid #E4E4E7',
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 4px 40px rgba(0,0,0,0.06)',
              minHeight: 440,
            }}
          >
            {/* ── Left panel: text ── */}
            <div
              style={{
                padding: '44px 40px',
                borderRight: '1px solid #E4E4E7',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF',
              }}
            >
              {/* Top content */}
              <div>
                {/* Number + icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <div
                    style={{
                      width: 52, height: 52, borderRadius: 14,
                      backgroundColor: sol.light,
                      border: `1px solid ${sol.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 24,
                    }}
                  >
                    {sol.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700,
                      color: sol.color, letterSpacing: '0.1em',
                    }}
                  >
                    {sol.num} / 04
                  </div>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 26,
                  fontWeight: 700, color: '#18181B',
                  margin: '0 0 6px', letterSpacing: '-0.02em',
                }}>
                  {sol.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-ui)', fontSize: 14,
                  color: sol.color, fontWeight: 500, margin: '0 0 20px',
                }}>
                  {sol.tagline}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 15,
                  color: '#52525B', lineHeight: 1.75, margin: '0 0 28px',
                }}>
                  {sol.description}
                </p>

                {/* Features */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                  {sol.features.map(f => (
                    <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <Check color={sol.color} />
                      <span style={{
                        fontFamily: 'var(--font-ui)', fontSize: 13,
                        color: '#3F3F46', fontWeight: 500, lineHeight: 1.4,
                      }}>
                        {f}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ display: 'flex', gap: 10, marginTop: 36, flexWrap: 'wrap' }}>
                <motion.a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 14,
                    color: '#fff', textDecoration: 'none',
                    backgroundColor: sol.color,
                    padding: '11px 22px', borderRadius: 8,
                    boxShadow: `0 4px 18px ${sol.color}35`,
                  }}
                >
                  Get a Demo →
                </motion.a>
                <a
                  href="#process"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 14,
                    color: '#71717A', textDecoration: 'none',
                    border: '1.5px solid #E4E4E7',
                    padding: '11px 18px', borderRadius: 8,
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = sol.color;
                    (e.currentTarget as HTMLElement).style.color = sol.color;
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#E4E4E7';
                    (e.currentTarget as HTMLElement).style.color = '#71717A';
                  }}
                >
                  See how it works
                </a>
              </div>
            </div>

            {/* ── Right panel: live product preview ── */}
            <div
              style={{
                backgroundColor: sol.light.replace('0.08', '0.04'),
                padding: 20,
                display: 'flex',
                alignItems: 'stretch',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle grid dot background */}
              <div
                style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `radial-gradient(${sol.color}20 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                  pointerEvents: 'none',
                }}
              />
              {/* Corner badge */}
              <div
                style={{
                  position: 'absolute', top: 16, right: 16, zIndex: 2,
                  display: 'flex', alignItems: 'center', gap: 5,
                  backgroundColor: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(8px)',
                  border: `1px solid ${sol.border}`,
                  borderRadius: 100, padding: '4px 10px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: sol.color, display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 600, color: sol.color }}>
                  Live Preview
                </span>
              </div>

              {/* Actual preview */}
              <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
                <PreviewComp />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom nav arrows ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 12, marginTop: 24,
        }}>
          <button
            onClick={() => setActive(i => Math.max(0, i - 1))}
            disabled={active === 0}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '1.5px solid #E4E4E7',
              background: active === 0 ? '#F9FAFB' : '#fff',
              color: active === 0 ? '#D4D4D8' : '#18181B',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: active === 0 ? 'default' : 'pointer',
              fontSize: 16, transition: 'all 0.15s',
            }}
          >
            ←
          </button>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 6 }}>
            {SOLUTIONS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                style={{
                  width: active === i ? 24 : 8,
                  height: 8, borderRadius: 100,
                  backgroundColor: active === i ? sol.color : '#E4E4E7',
                  border: 'none', cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setActive(i => Math.min(SOLUTIONS.length - 1, i + 1))}
            disabled={active === SOLUTIONS.length - 1}
            style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '1.5px solid #E4E4E7',
              background: active === SOLUTIONS.length - 1 ? '#F9FAFB' : '#fff',
              color: active === SOLUTIONS.length - 1 ? '#D4D4D8' : '#18181B',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: active === SOLUTIONS.length - 1 ? 'default' : 'pointer',
              fontSize: 16, transition: 'all 0.15s',
            }}
          >
            →
          </button>
        </div>

      </div>
    </section>
  );
}
