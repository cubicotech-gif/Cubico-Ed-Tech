"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// ─── Solution data ─────────────────────────────────────────────────────────────
const SOLUTIONS = [
  {
    id: 'manage', num: '01', icon: '🏫',
    name: 'Cubico Manage™',
    tagline: 'Run your institution smarter',
    description: 'Student records, attendance, fees, timetables, parent portals, and staff management — all from one dashboard. Eliminate paperwork. Connect every stakeholder.',
    features: [
      'Student Information System', 'Fee & Finance Management',
      'Parent Communication Portal', 'Automated Attendance Tracking',
      'Staff HR & Payroll', 'Real-time Analytics Dashboard',
    ],
    waText: 'Hi! I want to know more about your school management system.',
    color: '#F97316', rgb: '249,115,22',
    gradient: 'linear-gradient(135deg, #F97316 0%, #FB923C 100%)',
    darkGlow: 'rgba(249,115,22,0.18)',
    appPath: 'manage.cubico.tech',
  },
  {
    id: 'teach', num: '02', icon: '🎬',
    name: 'Cubico Teach™',
    tagline: 'Transform how educators deliver',
    description: 'Your textbooks come alive as 2D/3D animated lessons, visual comic books, and structured digital materials — in English, Arabic, and Urdu. Made with real educators.',
    features: [
      '2D / 3D Animated Lessons', 'Visual Comic Books',
      'Multilingual (EN / AR / UR)', 'Custom Course Design',
      'Structured Lesson Plans', 'Formative Assessments',
    ],
    waText: "Hi! I'm interested in animated lesson content and course digitization.",
    color: '#8B5CF6', rgb: '139,92,246',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
    darkGlow: 'rgba(139,92,246,0.18)',
    appPath: 'teach.cubico.tech',
  },
  {
    id: 'learn', num: '03', icon: '🎮',
    name: 'Cubico Learn™',
    tagline: 'Make students love learning',
    description: 'Game-based modules turn STEM concepts into interactive adventures. Gamified assessments replace boring tests. Real-time progress tracking visible to parents and educators.',
    features: [
      'Game-Based STEM Modules', 'Gamified Assessments',
      'Live Progress Tracking', 'Student Leaderboards',
      'Parent Dashboard Access', 'Adaptive Learning Paths',
    ],
    waText: 'Hi! Tell me about your game-based learning solutions for students.',
    color: '#10B981', rgb: '16,185,129',
    gradient: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
    darkGlow: 'rgba(16,185,129,0.18)',
    appPath: 'learn.cubico.tech',
  },
  {
    id: 'scale', num: '04', icon: '🚀',
    name: 'Cubico Scale™',
    tagline: 'Go from classic to world-class',
    description: 'Moodle LMS deployment, custom platforms, digital infrastructure, staff training, and 24/7 support. Full digital transformation with one trusted partner.',
    features: [
      'Moodle LMS Deployment', 'Custom Platform Development',
      'Digital Infrastructure Setup', 'Staff Onboarding & Training',
      'Strategic EdTech Consulting', '24/7 Ongoing Support',
    ],
    waText: "Hi! We're looking to digitally transform our institution with Moodle/LMS.",
    color: '#3B82F6', rgb: '59,130,246',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
    darkGlow: 'rgba(59,130,246,0.18)',
    appPath: 'scale.cubico.tech',
  },
] as const;

// ─── macOS-style App Window chrome ────────────────────────────────────────────
function AppWindow({
  path, color, children,
}: {
  path: string; color: string; children: React.ReactNode;
}) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: '#0D0D11',
      borderRadius: 14,
      overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: `0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)`,
    }}>
      {/* Chrome bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '9px 14px', flexShrink: 0,
        background: '#18181C',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map(c => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c }} />
          ))}
        </div>
        {/* URL bar */}
        <div style={{
          flex: 1, height: 22, background: 'rgba(255,255,255,0.05)',
          borderRadius: 6, display: 'flex', alignItems: 'center',
          gap: 6, padding: '0 10px',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: color, flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'rgba(255,255,255,0.28)', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {path}
          </span>
        </div>
        {/* Live badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0,
          background: `rgba(${color === '#F97316' ? '249,115,22' : color === '#8B5CF6' ? '139,92,246' : color === '#10B981' ? '16,185,129' : '59,130,246'},0.12)`,
          borderRadius: 100, padding: '3px 8px',
          border: `1px solid ${color}28`,
        }}>
          <motion.div
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: color }}
          />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, color, letterSpacing: '0.1em' }}>
            LIVE
          </span>
        </div>
      </div>
      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', minHeight: 0 }}>
        {children}
      </div>
    </div>
  );
}

// ─── ManagePreview — School Admin Dashboard ───────────────────────────────────
function ManagePreview() {
  const [selected, setSelected] = useState(0);
  const [attendance, setAttendance] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setAttendance(94), 300);
    return () => clearTimeout(t);
  }, []);

  const students = [
    { name: 'Aisha Khan', grade: '5-A', status: 'Present', fee: 'Paid', avatar: 'AK' },
    { name: 'Omar Farooq', grade: '5-A', status: 'Present', fee: 'Paid', avatar: 'OF' },
    { name: 'Sara Ali', grade: '6-B', status: 'Absent', fee: 'Due', avatar: 'SA' },
    { name: 'Zaid Ahmed', grade: '6-B', status: 'Late', fee: 'Paid', avatar: 'ZA' },
    { name: 'Fatima Sheikh', grade: '7-C', status: 'Present', fee: 'Paid', avatar: 'FS' },
  ];

  const statusColor = (s: string) =>
    s === 'Present' ? '#34D399' : s === 'Late' ? '#FBBF24' : '#F87171';
  const statusBg = (s: string) =>
    s === 'Present' ? 'rgba(52,211,153,0.12)' : s === 'Late' ? 'rgba(251,191,36,0.12)' : 'rgba(248,113,113,0.12)';

  // SVG ring chart
  const R = 22, C = 2 * Math.PI * R;
  const dash = (C * attendance) / 100;

  return (
    <AppWindow path="manage.cubico.tech/dashboard" color="#F97316">
      <div style={{ display: 'flex', height: '100%' }}>
        {/* Sidebar icons */}
        <div style={{
          width: 46, background: '#0A0A0E', borderRight: '1px solid rgba(255,255,255,0.04)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          paddingTop: 10, gap: 4, flexShrink: 0,
        }}>
          {[
            { emoji: '⊞', active: true },
            { emoji: '👥', active: false },
            { emoji: '📅', active: false },
            { emoji: '💰', active: false },
            { emoji: '📊', active: false },
          ].map((item, i) => (
            <div key={i} style={{
              width: 32, height: 32, borderRadius: 8,
              background: item.active ? 'rgba(249,115,22,0.15)' : 'transparent',
              border: item.active ? '1px solid rgba(249,115,22,0.3)' : '1px solid transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, cursor: 'pointer',
            }}>
              {item.emoji}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Top bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)',
            flexShrink: 0,
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>Dashboard</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: 'rgba(255,255,255,0.3)', marginTop: 1 }}>Al-Noor Model School • Mon, 7 Mar</div>
            </div>
            {/* Ring chart */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ position: 'relative', width: 52, height: 52 }}>
                <svg width="52" height="52" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="26" cy="26" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                  <motion.circle
                    cx="26" cy="26" r={R} fill="none"
                    stroke="#F97316" strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={C}
                    initial={{ strokeDashoffset: C }}
                    animate={{ strokeDashoffset: C - dash }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                  />
                </svg>
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, color: '#F97316' }}>{attendance}%</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 7, color: 'rgba(255,255,255,0.3)' }}>Today</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, padding: '8px 10px 6px', flexShrink: 0 }}>
            {[
              { label: 'Students', value: '1,247', color: '#F97316' },
              { label: 'Fees Due', value: '₨ 48k', color: '#FBBF24' },
              { label: 'Staff', value: '86/92', color: '#60A5FA' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 8, padding: '7px 10px',
              }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Student table */}
          <div style={{ flex: 1, padding: '0 10px 10px', overflow: 'hidden', minHeight: 0 }}>
            <div style={{
              background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 10, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                display: 'grid', gridTemplateColumns: '28px 1fr 44px 52px 40px',
                padding: '6px 10px', borderBottom: '1px solid rgba(255,255,255,0.04)',
                background: 'rgba(255,255,255,0.02)',
              }}>
                {['', 'Student', 'Grade', 'Status', 'Fee'].map(h => (
                  <span key={h} style={{ fontFamily: 'var(--font-ui)', fontSize: 7.5, fontWeight: 600, color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
                ))}
              </div>
              {students.map((s, i) => (
                <motion.div
                  key={i}
                  onClick={() => setSelected(i)}
                  whileHover={{ backgroundColor: 'rgba(249,115,22,0.04)' }}
                  style={{
                    display: 'grid', gridTemplateColumns: '28px 1fr 44px 52px 40px',
                    padding: '7px 10px', cursor: 'pointer', alignItems: 'center',
                    borderBottom: i < students.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                    borderLeft: selected === i ? '2px solid #F97316' : '2px solid transparent',
                    background: selected === i ? 'rgba(249,115,22,0.06)' : 'transparent',
                    transition: 'background 0.15s, border-color 0.15s',
                  }}
                >
                  {/* Avatar */}
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: selected === i ? 'linear-gradient(135deg, #F97316, #FB923C)' : 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-ui)', fontSize: 7, fontWeight: 700,
                    color: selected === i ? '#fff' : 'rgba(255,255,255,0.4)',
                  }}>
                    {s.avatar}
                  </div>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.78)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{s.name}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: 'rgba(255,255,255,0.35)' }}>{s.grade}</span>
                  <span style={{
                    fontFamily: 'var(--font-ui)', fontSize: 8, fontWeight: 600,
                    color: statusColor(s.status), background: statusBg(s.status),
                    borderRadius: 4, padding: '2px 5px', display: 'inline-block',
                  }}>{s.status}</span>
                  <span style={{
                    fontFamily: 'var(--font-ui)', fontSize: 8, fontWeight: 600,
                    color: s.fee === 'Paid' ? '#34D399' : '#FBBF24',
                  }}>{s.fee}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

// ─── TeachPreview — Content Studio ────────────────────────────────────────────
function TeachPreview() {
  const [activeLang, setActiveLang] = useState<'EN' | 'AR' | 'UR'>('EN');
  const [activeLesson, setActiveLesson] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const t = setTimeout(() => setProgress(68), 400);
    return () => clearTimeout(t);
  }, [activeLesson]);

  const lessons = [
    { title: 'Photosynthesis', subject: 'Biology', type: '3D Anim', done: 100, color: '#34D399' },
    { title: activeLang === 'AR' ? 'الكسور العشرية' : 'Decimal Fractions', subject: 'Maths', type: '2D Anim', done: 75, color: '#A78BFA' },
    { title: 'Forces & Motion', subject: 'Physics', type: 'Comic', done: 60, color: '#60A5FA' },
    { title: activeLang === 'AR' ? 'النظام الشمسي' : 'Solar System', subject: 'Science', type: '3D Anim', done: 40, color: '#FBBF24' },
  ];

  return (
    <AppWindow path="teach.cubico.tech/studio" color="#8B5CF6">
      <div style={{ display: 'flex', height: '100%' }}>
        {/* Sidebar */}
        <div style={{
          width: 46, background: '#0A0A0E', borderRight: '1px solid rgba(255,255,255,0.04)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          paddingTop: 10, gap: 4, flexShrink: 0,
        }}>
          {['⊞', '📚', '🎬', '📝', '📊'].map((icon, i) => (
            <div key={i} style={{
              width: 32, height: 32, borderRadius: 8,
              background: i === 1 ? 'rgba(139,92,246,0.15)' : 'transparent',
              border: i === 1 ? '1px solid rgba(139,92,246,0.3)' : '1px solid transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, cursor: 'pointer',
            }}>{icon}</div>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0,
          }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>Content Library</div>
            {/* Language switcher */}
            <div style={{
              display: 'flex', gap: 3,
              background: 'rgba(255,255,255,0.05)', borderRadius: 8,
              padding: 3, border: '1px solid rgba(255,255,255,0.06)',
            }}>
              {(['EN', 'AR', 'UR'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  style={{
                    fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700,
                    padding: '3px 8px', borderRadius: 5, border: 'none', cursor: 'pointer',
                    background: activeLang === lang ? '#8B5CF6' : 'transparent',
                    color: activeLang === lang ? '#fff' : 'rgba(255,255,255,0.35)',
                    transition: 'all 0.15s',
                  }}
                >{lang}</button>
              ))}
            </div>
          </div>

          {/* Active lesson viewer */}
          <div style={{ padding: '10px 10px 6px', flexShrink: 0 }}>
            <div style={{
              background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)',
              borderRadius: 10, padding: '10px 12px',
              display: 'flex', gap: 10, alignItems: 'center',
            }}>
              {/* Thumbnail */}
              <div style={{
                width: 48, height: 36, borderRadius: 7, flexShrink: 0,
                background: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden',
              }}>
                <span style={{ fontSize: 18 }}>🎬</span>
                {/* Play button overlay */}
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.9)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <div style={{
                      width: 0, height: 0,
                      borderTop: '4px solid transparent', borderBottom: '4px solid transparent',
                      borderLeft: '6px solid #7C3AED', marginLeft: 1,
                    }} />
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: '#E2E8F0', marginBottom: 5, direction: activeLang === 'AR' ? 'rtl' : 'ltr' }}>
                  {lessons[activeLesson].title}
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    initial={{ width: '0%' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ height: '100%', background: 'linear-gradient(90deg, #8B5CF6, #A78BFA)', borderRadius: 2 }}
                  />
                </div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>
                  {progress}% complete · {lessons[activeLesson].type} · {lessons[activeLesson].subject}
                </div>
              </div>
            </div>
          </div>

          {/* Lesson list */}
          <div style={{ flex: 1, padding: '0 10px 10px', overflow: 'hidden', minHeight: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5, height: '100%', overflow: 'hidden' }}>
              {lessons.map((l, i) => (
                <motion.div
                  key={`${i}-${activeLang}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setActiveLesson(i)}
                  style={{
                    background: activeLesson === i ? 'rgba(139,92,246,0.1)' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${activeLesson === i ? 'rgba(139,92,246,0.3)' : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: 8, padding: '8px 10px',
                    display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{
                    width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                    backgroundColor: l.color,
                  }} />
                  <span style={{
                    fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: activeLesson === i ? 600 : 400,
                    color: activeLesson === i ? '#E2E8F0' : 'rgba(255,255,255,0.5)',
                    flex: 1, direction: activeLang === 'AR' ? 'rtl' : 'ltr',
                    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
                  }}>{l.title}</span>
                  <span style={{
                    fontFamily: 'var(--font-ui)', fontSize: 8, color: l.color,
                    background: `${l.color}18`, borderRadius: 4, padding: '1px 5px', flexShrink: 0,
                  }}>{l.type}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>
                    {l.done}%
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

// ─── LearnPreview — Student Game Portal ───────────────────────────────────────
function LearnPreview() {
  const [activeModule, setActiveModule] = useState(1);
  const [xpBars, setXpBars] = useState([0, 0, 0]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const targets = [70, 100, 45];
    const t = setTimeout(() => setXpBars(targets), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let current = 0;
    const target = 2840;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      setScore(current);
      if (current >= target) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const modules = [
    { name: 'Algebra Quest', level: 7, xpFill: xpBars[0], maxXP: 1000, icon: '🔢', color: '#F97316' },
    { name: 'Science Explorer', level: 10, xpFill: xpBars[1], maxXP: 1200, icon: '🔬', color: '#10B981' },
    { name: 'Arabic Adventures', level: 4, xpFill: xpBars[2], maxXP: 800, icon: '🌙', color: '#8B5CF6' },
  ];

  const leaders = [
    { name: 'Zaid A.', pts: score, medal: '🥇', color: '#FBBF24' },
    { name: 'Aisha K.', pts: 2640, medal: '🥈', color: '#94A3B8' },
    { name: 'Omar F.', pts: 2310, medal: '🥉', color: '#CD7F32' },
  ];

  return (
    <AppWindow path="learn.cubico.tech/portal" color="#10B981">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 26, height: 26, borderRadius: '50%',
              background: 'linear-gradient(135deg, #10B981, #34D399)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
            }}>👦</div>
            <div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>Zaid Ahmed</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: 'rgba(255,255,255,0.3)' }}>Grade 6-B · Scholar</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { icon: '🔥', value: '12', label: 'Streak' },
              { icon: '⭐', value: score.toLocaleString(), label: 'Total XP' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 8, padding: '4px 8px', textAlign: 'center',
              }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, color: '#34D399' }}>
                  {s.icon} {s.value}
                </div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 7, color: 'rgba(255,255,255,0.28)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main: modules + leaderboard */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 100px', gap: 0, overflow: 'hidden', minHeight: 0 }}>
          {/* Modules */}
          <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 7, overflow: 'hidden' }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>
              Active Modules
            </div>
            {modules.map((m, i) => (
              <motion.div
                key={i}
                onClick={() => setActiveModule(i)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                style={{
                  background: activeModule === i ? `${m.color}14` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${activeModule === i ? `${m.color}35` : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 10, padding: '9px 11px', cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 7 }}>
                  <span style={{ fontSize: 16 }}>{m.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.85)' }}>{m.name}</div>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: m.color }}>Level {m.level} · {m.xpFill}% Complete</div>
                  </div>
                  {activeModule === i && (
                    <motion.span
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      style={{
                        width: 18, height: 18, borderRadius: '50%',
                        background: m.color, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700,
                      }}
                    >▶</motion.span>
                  )}
                </div>
                {/* XP bar */}
                <div style={{ height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }}>
                  <motion.div
                    animate={{ width: `${m.xpFill}%` }}
                    initial={{ width: '0%' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.1 }}
                    style={{ height: '100%', background: `linear-gradient(90deg, ${m.color}, ${m.color}aa)`, borderRadius: 3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Leaderboard */}
          <div style={{
            borderLeft: '1px solid rgba(255,255,255,0.04)',
            padding: '8px 8px', display: 'flex', flexDirection: 'column', gap: 5, overflow: 'hidden',
          }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>
              Top This Week
            </div>
            {leaders.map((l, i) => (
              <div key={i} style={{
                background: i === 0 ? 'rgba(251,191,36,0.07)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${i === 0 ? 'rgba(251,191,36,0.2)' : 'rgba(255,255,255,0.05)'}`,
                borderRadius: 8, padding: '7px 8px',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                  <span style={{ fontSize: 12 }}>{l.medal}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, color: l.color }}>
                    {i === 0 ? l.pts.toLocaleString() : l.pts.toLocaleString()}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>{l.name}</div>
              </div>
            ))}
            {/* Weekly badge */}
            <div style={{
              background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: 8, padding: '7px 8px', textAlign: 'center', marginTop: 'auto',
            }}>
              <div style={{ fontSize: 16 }}>🏆</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#34D399', fontWeight: 600, marginTop: 3 }}>You're #1!</div>
            </div>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

// ─── ScalePreview — LMS Infrastructure ────────────────────────────────────────
function ScalePreview() {
  const [barHeights, setBarHeights] = useState([0, 0, 0, 0, 0, 0]);
  const [reqCount, setReqCount] = useState(0);
  const [activeCourse, setActiveCourse] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setBarHeights([65, 82, 48, 90, 73, 88]), 400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setReqCount(v => (v < 9999 ? v + Math.floor(Math.random() * 12) + 3 : v));
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const courses = [
    { title: 'Grade 5 Mathematics', enrolled: 48, done: 82, color: '#F97316' },
    { title: 'Arabic Language Yr.2', enrolled: 36, done: 65, color: '#8B5CF6' },
    { title: 'Science & Technology', enrolled: 52, done: 90, color: '#10B981' },
    { title: 'Islamic Studies', enrolled: 64, done: 71, color: '#60A5FA' },
  ];

  const servers = [
    { name: 'App', status: 'healthy' },
    { name: 'DB', status: 'healthy' },
    { name: 'CDN', status: 'healthy' },
    { name: 'Auth', status: 'healthy' },
  ];

  return (
    <AppWindow path="scale.cubico.tech/admin" color="#3B82F6">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Status banner */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0,
          background: 'rgba(16,185,129,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#34D399' }}
            />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 600, color: '#34D399' }}>All Systems Operational</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[{ label: 'Uptime', value: '99.9%' }, { label: 'Req/min', value: reqCount.toLocaleString() }].map(s => (
              <div key={s.label} style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, color: '#60A5FA' }}>{s.value}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 7, color: 'rgba(255,255,255,0.3)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 90px', overflow: 'hidden', minHeight: 0 }}>
          {/* Left: courses + chart */}
          <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 6, overflow: 'hidden' }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Active Courses
            </div>
            {courses.map((c, i) => (
              <motion.div
                key={i}
                onClick={() => setActiveCourse(i)}
                style={{
                  background: activeCourse === i ? `${c.color}10` : 'rgba(255,255,255,0.02)',
                  border: `1px solid ${activeCourse === i ? `${c.color}30` : 'rgba(255,255,255,0.05)'}`,
                  borderRadius: 8, padding: '7px 10px', cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{
                    fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: activeCourse === i ? 600 : 400,
                    color: activeCourse === i ? '#E2E8F0' : 'rgba(255,255,255,0.5)',
                    overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', flex: 1,
                  }}>{c.title}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, color: c.color, marginLeft: 6, flexShrink: 0 }}>{c.done}%</span>
                </div>
                <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                  <motion.div
                    animate={{ width: `${c.done}%` }}
                    initial={{ width: '0%' }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.08 }}
                    style={{ height: '100%', background: `linear-gradient(90deg, ${c.color}, ${c.color}80)`, borderRadius: 2 }}
                  />
                </div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 7.5, color: 'rgba(255,255,255,0.25)', marginTop: 3 }}>
                  {c.enrolled} enrolled
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: server status + mini chart */}
          <div style={{
            borderLeft: '1px solid rgba(255,255,255,0.04)',
            padding: '8px', display: 'flex', flexDirection: 'column', gap: 6, overflow: 'hidden',
          }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Servers
            </div>
            {servers.map(s => (
              <div key={s.name} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: 6, padding: '5px 7px',
              }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: 'rgba(255,255,255,0.55)' }}>{s.name}</span>
                <motion.div
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2 + Math.random(), repeat: Infinity }}
                  style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#34D399' }}
                />
              </div>
            ))}
            {/* Mini bar chart */}
            <div style={{ marginTop: 4 }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: 'rgba(255,255,255,0.22)', marginBottom: 5 }}>Enrollments</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 36 }}>
                {barHeights.map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: `${h}%` }}
                    initial={{ height: '0%' }}
                    transition={{ duration: 0.7, delay: 0.5 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      flex: 1, background: i % 2 === 0 ? '#3B82F6' : 'rgba(59,130,246,0.4)',
                      borderRadius: '2px 2px 0 0', minHeight: 3,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppWindow>
  );
}

const PREVIEWS = [ManagePreview, TeachPreview, LearnPreview, ScalePreview];

// ─── Check icon ────────────────────────────────────────────────────────────────
function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="8" cy="8" r="8" fill={color} fillOpacity="0.1" />
      <path d="M5 8l2.2 2.2L11 5.8" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────
export default function PillarsSection() {
  const [active, setActive] = useState(0);
  const sol = SOLUTIONS[active];
  const PreviewComp = PREVIEWS[active];
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });
  const waLink = `https://wa.me/923001234567?text=${encodeURIComponent(sol.waText)}`;

  const prev = useCallback(() => setActive(i => Math.max(0, i - 1)), []);
  const next = useCallback(() => setActive(i => Math.min(SOLUTIONS.length - 1, i + 1)), []);

  return (
    <section
      id="solutions"
      ref={sectionRef}
      style={{ backgroundColor: '#FAFAF9', padding: '100px 0', overflow: 'hidden', position: 'relative' }}
    >
      {/* ── Ambient gradient blob (shifts color per solution) ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={sol.id + '-blob'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'absolute', top: -100, right: -200,
            width: 700, height: 700, borderRadius: '50%',
            background: `radial-gradient(circle, ${sol.color}0A 0%, transparent 70%)`,
            pointerEvents: 'none', zIndex: 0,
          }}
        />
      </AnimatePresence>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%', position: 'relative', zIndex: 1 }}>

        {/* ── Section header ── */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 56 }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
            color: '#F97316', letterSpacing: '0.12em', textTransform: 'uppercase',
            background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)',
            borderRadius: 100, padding: '5px 16px', marginBottom: 18,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F97316', display: 'inline-block' }} />
            Our Solutions
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px, 4vw, 50px)',
            fontWeight: 700, color: '#18181B',
            margin: '0 0 16px', letterSpacing: '-0.028em', lineHeight: 1.1,
          }}>
            Four pillars.{' '}
            <span style={{ background: 'linear-gradient(135deg, #F97316, #FB923C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              One mission.
            </span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 17,
            color: '#71717A', maxWidth: 500, margin: '0 auto', lineHeight: 1.7,
          }}>
            Management, content, learning, and infrastructure — every layer covered by one partner.
          </p>
        </motion.div>

        {/* ── Segmented tab control ── */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 44 }}>
          <div style={{
            display: 'inline-flex',
            background: '#F0F0EE',
            borderRadius: 16, padding: 5,
            border: '1px solid rgba(0,0,0,0.06)',
            gap: 2,
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.06)',
          }}>
            {SOLUTIONS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                style={{
                  position: 'relative',
                  fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 13,
                  padding: '10px 20px', borderRadius: 11,
                  border: 'none', cursor: 'pointer',
                  background: 'transparent',
                  color: active === i ? s.color : '#71717A',
                  display: 'flex', alignItems: 'center', gap: 7,
                  transition: 'color 0.2s',
                  zIndex: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {/* Sliding background */}
                {active === i && (
                  <motion.div
                    layoutId="seg-bg"
                    style={{
                      position: 'absolute', inset: 0, borderRadius: 11,
                      background: '#FFFFFF',
                      boxShadow: '0 1px 6px rgba(0,0,0,0.10), 0 0 0 1px rgba(0,0,0,0.04)',
                    }}
                    transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1, fontSize: 16 }}>{s.icon}</span>
                <span style={{ position: 'relative', zIndex: 1 }}>{s.name.replace('™', '')}</span>
                <span style={{
                  position: 'relative', zIndex: 1,
                  fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700,
                  color: active === i ? s.color : 'rgba(0,0,0,0.2)',
                  background: active === i ? `rgba(${s.rgb},0.1)` : 'transparent',
                  borderRadius: 4, padding: '1px 5px',
                  transition: 'all 0.2s',
                }}>
                  {s.num}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Main split panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20, scale: 0.995 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -14, scale: 0.995 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: '44% 56%',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 28,
              overflow: 'hidden',
              boxShadow: `0 2px 8px rgba(0,0,0,0.04), 0 12px 60px rgba(0,0,0,0.07), 0 0 0 1px rgba(${sol.rgb},0.06)`,
              minHeight: 520,
            }}
          >
            {/* ── Left panel: text ── */}
            <div style={{
              padding: '48px 44px',
              background: '#FFFFFF',
              borderRight: '1px solid rgba(0,0,0,0.07)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* Decorative background number */}
              <div style={{
                position: 'absolute', bottom: -20, right: -10,
                fontFamily: 'var(--font-display)', fontSize: 160, fontWeight: 900,
                color: `rgba(${sol.rgb},0.04)`,
                lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
                letterSpacing: '-0.05em',
              }}>
                {sol.num}
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Icon + counter row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                    background: `linear-gradient(135deg, rgba(${sol.rgb},0.12), rgba(${sol.rgb},0.06))`,
                    border: `1px solid rgba(${sol.rgb},0.2)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 26,
                    boxShadow: `0 4px 20px rgba(${sol.rgb},0.15)`,
                  }}>
                    {sol.icon}
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: `rgba(${sol.rgb},0.06)`,
                    border: `1px solid rgba(${sol.rgb},0.15)`,
                    borderRadius: 100, padding: '4px 12px',
                  }}>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, color: sol.color }}>
                      {sol.num}
                    </span>
                    <span style={{ color: `rgba(${sol.rgb},0.4)`, fontFamily: 'var(--font-ui)', fontSize: 11 }}>/</span>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: `rgba(${sol.rgb},0.5)` }}>04</span>
                  </div>
                </div>

                {/* Title */}
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 28,
                  fontWeight: 700, color: '#18181B',
                  margin: '0 0 8px', letterSpacing: '-0.022em', lineHeight: 1.2,
                }}>
                  {sol.name}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 500,
                  color: sol.color, margin: '0 0 18px',
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '9px 12px' }}>
                  {sol.features.map((f, i) => (
                    <motion.div
                      key={f}
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.3 }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}
                    >
                      <CheckIcon color={sol.color} />
                      <span style={{
                        fontFamily: 'var(--font-ui)', fontSize: 13,
                        color: '#3F3F46', fontWeight: 500, lineHeight: 1.45,
                      }}>
                        {f}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 10, marginTop: 36, position: 'relative', zIndex: 1, flexWrap: 'wrap' }}>
                <motion.a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03, boxShadow: `0 8px 28px rgba(${sol.rgb},0.4)` }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 14,
                    color: '#fff', textDecoration: 'none',
                    background: sol.gradient,
                    padding: '12px 24px', borderRadius: 10,
                    boxShadow: `0 4px 20px rgba(${sol.rgb},0.3)`,
                    transition: 'box-shadow 0.2s',
                  }}
                >
                  Get a Demo
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.a>
                <motion.a
                  href="#process"
                  whileHover={{ borderColor: sol.color, color: sol.color }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 14,
                    color: '#71717A', textDecoration: 'none',
                    border: '1.5px solid #E4E4E7',
                    padding: '12px 20px', borderRadius: 10,
                    transition: 'border-color 0.2s, color 0.2s',
                  }}
                >
                  See how it works
                </motion.a>
              </div>
            </div>

            {/* ── Right panel: dark app window ── */}
            <div style={{
              background: '#111114',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Subtle dot grid overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `radial-gradient(rgba(${sol.rgb},0.12) 1px, transparent 1px)`,
                backgroundSize: '28px 28px',
                pointerEvents: 'none',
              }} />
              {/* Glow at center */}
              <div style={{
                position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)',
                width: 300, height: 200, borderRadius: '50%',
                background: `radial-gradient(circle, rgba(${sol.rgb},0.08) 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />
              {/* App window */}
              <div style={{ position: 'relative', zIndex: 1, flex: 1, minHeight: 0 }}>
                <PreviewComp />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Bottom navigation ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 14, marginTop: 28,
        }}>
          <motion.button
            onClick={prev}
            disabled={active === 0}
            whileHover={active > 0 ? { scale: 1.05, borderColor: sol.color } : {}}
            whileTap={active > 0 ? { scale: 0.95 } : {}}
            style={{
              width: 38, height: 38, borderRadius: '50%',
              border: '1.5px solid #E4E4E7',
              background: active === 0 ? '#F9FAFB' : '#fff',
              color: active === 0 ? '#D4D4D8' : '#18181B',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: active === 0 ? 'not-allowed' : 'pointer',
              fontSize: 15, transition: 'all 0.15s',
              boxShadow: active === 0 ? 'none' : '0 1px 4px rgba(0,0,0,0.08)',
            }}
          >
            ←
          </motion.button>

          {/* Animated progress dots */}
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {SOLUTIONS.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => setActive(i)}
                animate={{
                  width: active === i ? 28 : 8,
                  backgroundColor: active === i ? s.color : '#D4D4D8',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                style={{
                  height: 8, borderRadius: 100,
                  border: 'none', cursor: 'pointer', padding: 0,
                }}
              />
            ))}
          </div>

          <motion.button
            onClick={next}
            disabled={active === SOLUTIONS.length - 1}
            whileHover={active < SOLUTIONS.length - 1 ? { scale: 1.05, borderColor: sol.color } : {}}
            whileTap={active < SOLUTIONS.length - 1 ? { scale: 0.95 } : {}}
            style={{
              width: 38, height: 38, borderRadius: '50%',
              border: '1.5px solid #E4E4E7',
              background: active === SOLUTIONS.length - 1 ? '#F9FAFB' : '#fff',
              color: active === SOLUTIONS.length - 1 ? '#D4D4D8' : '#18181B',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: active === SOLUTIONS.length - 1 ? 'not-allowed' : 'pointer',
              fontSize: 15, transition: 'all 0.15s',
              boxShadow: active === SOLUTIONS.length - 1 ? 'none' : '0 1px 4px rgba(0,0,0,0.08)',
            }}
          >
            →
          </motion.button>
        </div>

      </div>
    </section>
  );
}
