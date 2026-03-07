"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// ─── Data ──────────────────────────────────────────────────────────────────────
const SOLUTIONS = [
  {
    id: 'manage' as const, num: '01', icon: '🏫',
    name: 'Cubico Manage™',
    tagline: 'Run your institution smarter',
    pitch: 'Student records, attendance, fees, timetables, parent portals, and staff management — from one dashboard.',
    features: ['Student SIS', 'Fee & Finance', 'Parent Portal', 'Staff HR & Payroll'],
    waText: 'Hi! I want to know more about your school management system.',
    color: '#F97316', rgb: '249,115,22', schools: 240,
  },
  {
    id: 'teach' as const, num: '02', icon: '🎬',
    name: 'Cubico Teach™',
    tagline: 'Transform how educators deliver',
    pitch: 'Textbooks become 2D/3D animated lessons, visual comic books, and structured digital materials in EN, AR, and UR.',
    features: ['3D / 2D Animation', 'Visual Comic Books', 'Multilingual', 'Formative Assessments'],
    waText: "Hi! I'm interested in animated lesson content and course digitization.",
    color: '#8B5CF6', rgb: '139,92,246', schools: 180,
  },
  {
    id: 'learn' as const, num: '03', icon: '🎮',
    name: 'Cubico Learn™',
    tagline: 'Make students love learning',
    pitch: 'Game-based STEM modules, gamified assessments, real-time progress tracking visible to parents and educators.',
    features: ['Game STEM Modules', 'Gamified Assessments', 'Live Leaderboards', 'Adaptive Paths'],
    waText: 'Hi! Tell me about your game-based learning solutions for students.',
    color: '#10B981', rgb: '16,185,129', schools: 156,
  },
  {
    id: 'scale' as const, num: '04', icon: '🚀',
    name: 'Cubico Scale™',
    tagline: 'Go from classic to world-class',
    pitch: 'Moodle LMS deployment, custom platforms, digital infrastructure, staff training, and 24/7 support.',
    features: ['Moodle LMS Deploy', 'Custom Dev', 'Staff Training', '24/7 Support'],
    waText: "Hi! We're looking to digitally transform our institution with Moodle/LMS.",
    color: '#3B82F6', rgb: '59,130,246', schools: 92,
  },
] as const;

type SolId = typeof SOLUTIONS[number]['id'];

const ACTIVITIES: Record<SolId, string[]> = {
  manage: [
    '✅ Aisha Khan marked Present — 5-A',
    '💰 Fee receipt sent to Omar Family',
    '🔔 Sara Ali parent notified — absent',
    '📋 Monthly report auto-generated',
    '📅 Timetable updated for Grade 6',
    '👩‍🏫 Staff meeting set — Tue 9 AM',
  ],
  teach: [
    '🎬 3D lesson published — Photosynthesis',
    '📝 Quiz added to Forces & Motion',
    '🌙 Arabic lesson reviewed by Ustaz Omar',
    '🎨 Comic strip approved — Newton\'s Laws',
    '📱 Lesson shared to 48 students',
    '✅ Grade 5 lesson plan completed',
  ],
  learn: [
    '⭐ Zaid earned 150 XP — Algebra Quest',
    '🏆 Aisha just reached Level 8!',
    '🔥 Class streak: 12 days running!',
    '🎮 Physics Lab challenge unlocked',
    '📈 Grade 6 avg score up 23%',
    '🥇 Weekly leaderboard updated',
  ],
  scale: [
    '🚀 LMS deployed — Oxford School, LHR',
    '✅ 24 teachers completed onboarding',
    '🔧 Server upgraded — 2× faster',
    '📊 Analytics report ready',
    '🌐 CDN enabled for 3 new cities',
    '🔒 Security audit passed',
  ],
};

const SIDEBAR_STATS: Record<SolId, { label: string; value: string; sub: string }[]> = {
  manage: [
    { label: 'Total Students', value: '1,247', sub: '+12 this week' },
    { label: 'Attendance Rate', value: '94.2%', sub: 'Above target ↑' },
    { label: 'Staff Active', value: '86 / 92', sub: '4 on leave' },
  ],
  teach: [
    { label: 'Lessons Published', value: '342', sub: '+18 this month' },
    { label: 'Avg. Completion', value: '87%', sub: '+5% vs last month' },
    { label: 'Languages', value: '3', sub: 'EN · AR · UR' },
  ],
  learn: [
    { label: 'Active Learners', value: '1,247', sub: 'Right now' },
    { label: 'Avg XP Today', value: '420', sub: '+15% vs avg' },
    { label: 'Active Modules', value: '24', sub: '3 new this week' },
  ],
  scale: [
    { label: 'Platform Uptime', value: '99.9%', sub: 'Last 30 days' },
    { label: 'Live Courses', value: '38', sub: '4 added today' },
    { label: 'Active Learners', value: '1,247', sub: 'Across all sites' },
  ],
};

const JOINED = [
  '🏫 Al-Noor School, Karachi',
  '🏫 Future Stars Academy, Dubai',
  '🏫 Oxford English Medium, LHR',
  '🏫 Al-Falah School, Riyadh',
  '🏫 Bright Futures Academy, AUH',
];

// ─── ManagePreview ─────────────────────────────────────────────────────────────
function ManagePreview() {
  const [selected, setSelected] = useState(0);
  const [ringPct, setRingPct] = useState(0);
  const [actIdx, setActIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setRingPct(94), 250);
    const iv = setInterval(() => setActIdx(i => (i + 1) % ACTIVITIES.manage.length), 2600);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, []);

  const R = 30; const C = 2 * Math.PI * R;
  const students = [
    { name: 'Aisha Khan',    init: 'AK', grade: '5-A', status: 'Present', fee: 'Paid',    time: '08:12 AM' },
    { name: 'Omar Farooq',   init: 'OF', grade: '5-A', status: 'Present', fee: 'Paid',    time: '08:15 AM' },
    { name: 'Sara Ali',      init: 'SA', grade: '6-B', status: 'Absent',  fee: 'Due',     time: '—' },
    { name: 'Zaid Ahmed',    init: 'ZA', grade: '6-B', status: 'Late',    fee: 'Paid',    time: '09:02 AM' },
    { name: 'Fatima Sheikh', init: 'FS', grade: '7-C', status: 'Present', fee: 'Paid',    time: '08:08 AM' },
    { name: 'Hassan Mir',    init: 'HM', grade: '7-C', status: 'Present', fee: 'Due',     time: '08:22 AM' },
  ];
  const grades = [{ g: 'Grade 5', p: 96 }, { g: 'Grade 6', p: 88 }, { g: 'Grade 7', p: 95 }, { g: 'Grade 8', p: 97 }];
  const sCol = { Present: { t: '#10B981', b: '#D1FAE5' }, Absent: { t: '#EF4444', b: '#FEE2E2' }, Late: { t: '#F59E0B', b: '#FEF3C7' } } as const;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '188px 1fr 170px', height: '100%', overflow: 'hidden' }}>
      {/* Col 1 */}
      <div style={{ borderRight: '1px solid #F0F0EE', padding: '14px 12px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 4 }}>
          <div style={{ position: 'relative', width: 76, height: 76 }}>
            <svg width="76" height="76" viewBox="0 0 76 76" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="38" cy="38" r={R} fill="none" stroke="#FEE2E2" strokeWidth="7" />
              <motion.circle cx="38" cy="38" r={R} fill="none" stroke="#F97316" strokeWidth="7" strokeLinecap="round"
                strokeDasharray={C}
                initial={{ strokeDashoffset: C }}
                animate={{ strokeDashoffset: C - (C * ringPct / 100) }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 17, fontWeight: 800, color: '#18181B', lineHeight: 1 }}>{ringPct}%</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#A1A1AA', marginTop: 1 }}>Present</span>
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>By Grade</div>
          {grades.map((g, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: '#71717A' }}>{g.g}</span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 600, color: '#F97316' }}>{g.p}%</span>
              </div>
              <div style={{ height: 4, background: '#F4F4F5', borderRadius: 2 }}>
                <motion.div animate={{ width: `${g.p}%` }} initial={{ width: '0%' }}
                  transition={{ duration: 0.9, delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: '100%', background: 'linear-gradient(90deg,#F97316,#FB923C)', borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 'auto' }}>
          {[{ l: 'Fee Collected', v: '₨ 2.4M', e: '💰' }, { l: 'Staff Present', v: '86/92', e: '👩‍🏫' }].map(s => (
            <div key={s.l} style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.14)', borderRadius: 8, padding: '8px 10px', display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 14 }}>{s.e}</span>
              <div><div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700, color: '#18181B' }}>{s.v}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#71717A' }}>{s.l}</div></div>
            </div>
          ))}
        </div>
      </div>
      {/* Col 2 */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700, color: '#18181B' }}>Today's Attendance</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: '#A1A1AA' }}>Mon, 7 Mar · 5-A to 7-C</span>
        </div>
        <div style={{ flex: 1, border: '1px solid #F0F0EE', borderRadius: 10, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '28px 1fr 50px 64px 48px 82px', padding: '7px 12px', background: '#FAFAFA', borderBottom: '1px solid #F0F0EE', flexShrink: 0 }}>
            {['', 'Name', 'Grade', 'Status', 'Fee', 'Check-in'].map(h => (
              <span key={h} style={{ fontFamily: 'var(--font-ui)', fontSize: 7.5, fontWeight: 600, color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{h}</span>
            ))}
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            {students.map((s, i) => {
              const c = sCol[s.status as keyof typeof sCol];
              return (
                <motion.div key={i} onClick={() => setSelected(i)} whileHover={{ backgroundColor: 'rgba(249,115,22,0.03)' }}
                  style={{ display: 'grid', gridTemplateColumns: '28px 1fr 50px 64px 48px 82px', padding: '8px 12px', cursor: 'pointer', alignItems: 'center', borderBottom: i < students.length - 1 ? '1px solid #F9F9F9' : 'none', borderLeft: selected === i ? '2px solid #F97316' : '2px solid transparent', background: selected === i ? 'rgba(249,115,22,0.04)' : 'transparent', transition: 'all 0.15s' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: selected === i ? 'linear-gradient(135deg,#F97316,#FB923C)' : '#F4F4F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-ui)', fontSize: 6.5, fontWeight: 700, color: selected === i ? '#fff' : '#71717A' }}>{s.init}</div>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 500, color: '#18181B', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{s.name}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: '#71717A' }}>{s.grade}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 8, fontWeight: 600, color: c.t, background: c.b, borderRadius: 4, padding: '2px 6px', display: 'inline-block' }}>{s.status}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 600, color: s.fee === 'Paid' ? '#10B981' : '#F59E0B' }}>{s.fee}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: '#A1A1AA' }}>{s.time}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Col 3 */}
      <div style={{ borderLeft: '1px solid #F0F0EE', padding: '12px 10px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8, flexShrink: 0 }}>
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#F97316', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, color: '#18181B' }}>Live Activity</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5, overflow: 'hidden' }}>
          {[0, 1, 2, 3, 4].map(off => {
            const idx = (actIdx + off) % ACTIVITIES.manage.length;
            const isNew = off === 0;
            return (
              <motion.div key={`${actIdx}-${off}`} initial={isNew ? { opacity: 0, y: -8 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                style={{ background: isNew ? 'rgba(249,115,22,0.07)' : '#FAFAFA', border: `1px solid ${isNew ? 'rgba(249,115,22,0.2)' : '#F0F0EE'}`, borderRadius: 8, padding: '8px 10px', flexShrink: 0 }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9.5, color: isNew ? '#18181B' : '#71717A', lineHeight: 1.4 }}>{ACTIVITIES.manage[idx]}</div>
                {isNew && <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#F97316', fontWeight: 600, marginTop: 3 }}>Just now</div>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── TeachPreview ──────────────────────────────────────────────────────────────
function TeachPreview() {
  const [activeLang, setActiveLang] = useState<'EN' | 'AR' | 'UR'>('EN');
  const [activeLesson, setActiveLesson] = useState(0);
  const [progress, setProgress] = useState(0);
  const [actIdx, setActIdx] = useState(0);

  const lessons = [
    { en: 'Photosynthesis', ar: 'عملية التمثيل الضوئي', ur: 'فتوسنتھیسز', subject: 'Biology', type: '3D Anim', pct: 100, color: '#34D399' },
    { en: 'Decimal Fractions', ar: 'الكسور العشرية', ur: 'اعشاری کسور', subject: 'Maths', type: '2D Anim', pct: 75, color: '#A78BFA' },
    { en: 'Forces & Motion', ar: 'القوى والحركة', ur: 'طاقت اور حرکت', subject: 'Physics', type: 'Comic', pct: 60, color: '#60A5FA' },
    { en: 'Solar System', ar: 'المجموعة الشمسية', ur: 'نظام شمسی', subject: 'Science', type: '3D Anim', pct: 40, color: '#FBBF24' },
    { en: 'Islamic Studies', ar: 'التربية الإسلامية', ur: 'اسلامیات', subject: 'Islamic', type: '2D Anim', pct: 88, color: '#F97316' },
  ];

  const getTitle = (l: typeof lessons[0]) =>
    activeLang === 'AR' ? l.ar : activeLang === 'UR' ? l.ur : l.en;

  useEffect(() => {
    setProgress(0);
    const t = setTimeout(() => setProgress(lessons[activeLesson].pct), 350);
    return () => clearTimeout(t);
  }, [activeLesson, activeLang]);

  useEffect(() => {
    const iv = setInterval(() => setActIdx(i => (i + 1) % ACTIVITIES.teach.length), 2700);
    return () => clearInterval(iv);
  }, []);

  const active = lessons[activeLesson];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '256px 1fr', height: '100%', overflow: 'hidden' }}>
      {/* Lesson list */}
      <div style={{ borderRight: '1px solid #F0F0EE', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '12px 14px 8px', borderBottom: '1px solid #F0F0EE', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, color: '#18181B' }}>Content Library</span>
          <div style={{ display: 'flex', gap: 3, background: '#F4F4F5', borderRadius: 7, padding: 3 }}>
            {(['EN', 'AR', 'UR'] as const).map(l => (
              <button key={l} onClick={() => setActiveLang(l)} style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 4, border: 'none', cursor: 'pointer', background: activeLang === l ? '#8B5CF6' : 'transparent', color: activeLang === l ? '#fff' : '#71717A', transition: 'all 0.15s' }}>{l}</button>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, overflow: 'hidden', padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 5 }}>
          {lessons.map((l, i) => (
            <motion.div key={i} onClick={() => setActiveLesson(i)} whileHover={{ x: 2 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px', borderRadius: 9, cursor: 'pointer', background: activeLesson === i ? 'rgba(139,92,246,0.08)' : 'rgba(0,0,0,0.01)', border: `1px solid ${activeLesson === i ? 'rgba(139,92,246,0.25)' : '#F0F0EE'}`, transition: 'all 0.15s' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `linear-gradient(135deg,${l.color}30,${l.color}15)`, border: `1px solid ${l.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>🎬</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: activeLesson === i ? 600 : 400, color: activeLesson === i ? '#18181B' : '#52525B', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', direction: activeLang === 'AR' ? 'rtl' : 'ltr' }}>{getTitle(l)}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: l.color, background: `${l.color}15`, borderRadius: 4, padding: '1px 5px' }}>{l.type}</span>
                  <span style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#A1A1AA' }}>{l.subject}</span>
                </div>
              </div>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 600, color: l.pct === 100 ? '#10B981' : l.color, flexShrink: 0 }}>{l.pct}%</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lesson viewer */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '14px 16px', gap: 10, overflow: 'hidden' }}>
        {/* Video thumb */}
        <div style={{ position: 'relative', height: 148, borderRadius: 12, background: `linear-gradient(135deg,${active.color}30,${active.color}15)`, border: `1px solid ${active.color}25`, overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div whileHover={{ scale: 1.08 }} style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}>
              <div style={{ width: 0, height: 0, borderTop: '9px solid transparent', borderBottom: '9px solid transparent', borderLeft: `15px solid ${active.color}`, marginLeft: 3 }} />
            </motion.div>
          </div>
          <div style={{ position: 'absolute', top: 10, left: 12, display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(8px)', borderRadius: 100, padding: '4px 10px' }}>
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: '50%', background: active.color }} />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, color: active.color }}>PREVIEW</span>
          </div>
          <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 600, color: '#18181B', direction: activeLang === 'AR' ? 'rtl' : 'ltr' }}>{getTitle(active)}</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 600, color: active.color }}>{progress}%</span>
            </div>
            <div style={{ height: 4, background: 'rgba(0,0,0,0.08)', borderRadius: 2 }}>
              <motion.div animate={{ width: `${progress}%` }} initial={{ width: '0%' }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: '100%', background: `linear-gradient(90deg,${active.color},${active.color}aa)`, borderRadius: 2 }} />
            </div>
          </div>
        </div>

        {/* Metadata row */}
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          {[{ l: 'Type', v: active.type }, { l: 'Subject', v: active.subject }, { l: 'Language', v: activeLang }, { l: 'Completion', v: `${active.pct}%` }].map(m => (
            <div key={m.l} style={{ flex: 1, background: '#FAFAFA', border: '1px solid #F0F0EE', borderRadius: 8, padding: '8px 10px' }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{m.l}</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700, color: '#18181B', marginTop: 2 }}>{m.v}</div>
            </div>
          ))}
        </div>

        {/* Live activity strip */}
        <div style={{ flex: 1, overflow: 'hidden', border: '1px solid #F0F0EE', borderRadius: 10, padding: '10px 12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8 }}>
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#8B5CF6' }} />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, color: '#18181B' }}>Content Activity</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={actIdx} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: '#52525B', lineHeight: 1.5 }}>{ACTIVITIES.teach[actIdx]}</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#8B5CF6', fontWeight: 600, marginTop: 4 }}>Just now</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── LearnPreview ──────────────────────────────────────────────────────────────
function LearnPreview() {
  const [activeModule, setActiveModule] = useState(1);
  const [xp, setXp] = useState([0, 0, 0, 0]);
  const [score, setScore] = useState(0);
  const [actIdx, setActIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setXp([70, 100, 45, 82]), 300);
    const iv = setInterval(() => setActIdx(i => (i + 1) % ACTIVITIES.learn.length), 2500);
    let s = 0;
    const si = setInterval(() => { s = Math.min(s + 71, 2840); setScore(s); if (s >= 2840) clearInterval(si); }, 28);
    return () => { clearTimeout(t); clearInterval(iv); clearInterval(si); };
  }, []);

  const modules = [
    { name: 'Algebra Quest', icon: '🔢', level: 7, fill: xp[0], max: 24, done: 18, color: '#F97316' },
    { name: 'Science Explorer', icon: '🔬', level: 10, fill: xp[1], max: 24, done: 24, color: '#10B981' },
    { name: 'Arabic Adventures', icon: '🌙', level: 4, fill: xp[2], max: 20, done: 9, color: '#8B5CF6' },
    { name: 'Physics Lab', icon: '⚡', level: 6, fill: xp[3], max: 18, done: 15, color: '#3B82F6' },
  ];

  const leaders = [
    { name: 'Zaid A.',  pts: score,  medal: '🥇', c: '#FBBF24' },
    { name: 'Aisha K.', pts: 2640,   medal: '🥈', c: '#94A3B8' },
    { name: 'Omar F.',  pts: 2310,   medal: '🥉', c: '#CD7F32' },
    { name: 'Sara A.',  pts: 1980,   medal: '4',   c: '#A1A1AA' },
    { name: 'Fatima S.', pts: 1750,  medal: '5',   c: '#A1A1AA' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 178px', height: '100%', overflow: 'hidden' }}>
      {/* Modules */}
      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexShrink: 0 }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700, color: '#18181B' }}>Game Modules</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 100, padding: '3px 10px' }}>
            <span style={{ fontSize: 11 }}>🔥</span>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, color: '#10B981' }}>12 Day Streak</span>
          </div>
        </div>

        {/* Student bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 10, marginBottom: 10, flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#10B981,#34D399)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>👦</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: '#18181B' }}>Zaid Ahmed — Grade 6-B</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: '#71717A' }}>Scholar · Level 7</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 800, color: '#10B981' }}>⭐ {score.toLocaleString()}</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#71717A' }}>Total XP</div>
          </div>
        </div>

        {/* Module cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, flex: 1, overflow: 'hidden' }}>
          {modules.map((m, i) => (
            <motion.div key={i} onClick={() => setActiveModule(i)} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
              style={{ background: activeModule === i ? `${m.color}0E` : '#FAFAFA', border: `1px solid ${activeModule === i ? `${m.color}35` : '#F0F0EE'}`, borderRadius: 10, padding: '10px 12px', cursor: 'pointer', transition: 'all 0.15s', display: 'flex', flexDirection: 'column', gap: 7 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>{m.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 600, color: '#18181B', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{m.name}</div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: m.color, fontWeight: 700 }}>Lv.{m.level}</span>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#A1A1AA' }}>{m.done}/{m.max} done</span>
                  </div>
                </div>
                {activeModule === i && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ width: 18, height: 18, borderRadius: '50%', background: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#fff', fontWeight: 700, flexShrink: 0 }}>▶</motion.div>
                )}
              </div>
              <div>
                <div style={{ height: 5, background: '#F0F0EE', borderRadius: 3 }}>
                  <motion.div animate={{ width: `${m.fill}%` }} initial={{ width: '0%' }} transition={{ duration: 1, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ height: '100%', background: `linear-gradient(90deg,${m.color},${m.color}aa)`, borderRadius: 3 }} />
                </div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#A1A1AA', marginTop: 3 }}>{m.fill}% complete</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div style={{ borderLeft: '1px solid #F0F0EE', padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 6, overflow: 'hidden' }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, color: '#18181B', marginBottom: 4, flexShrink: 0 }}>🏆 This Week</div>
        {leaders.map((l, i) => (
          <div key={i} style={{ background: i === 0 ? 'rgba(251,191,36,0.08)' : '#FAFAFA', border: `1px solid ${i === 0 ? 'rgba(251,191,36,0.25)' : '#F0F0EE'}`, borderRadius: 8, padding: '8px 10px', flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
              <span style={{ fontSize: i < 3 ? 14 : 10, color: i >= 3 ? '#A1A1AA' : undefined }}>{l.medal}</span>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, color: l.c }}>{typeof l.pts === 'number' ? l.pts.toLocaleString() : l.pts}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 500, color: '#52525B' }}>{l.name}</div>
          </div>
        ))}
        {/* Live ticker */}
        <div style={{ marginTop: 'auto', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 8, padding: '8px 10px', flexShrink: 0 }}>
          <AnimatePresence mode="wait">
            <motion.div key={actIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: '#52525B', lineHeight: 1.4 }}>{ACTIVITIES.learn[actIdx]}</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#10B981', fontWeight: 600, marginTop: 3 }}>Just now</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── ScalePreview ──────────────────────────────────────────────────────────────
function ScalePreview() {
  const [bars, setBars] = useState([0, 0, 0, 0, 0, 0]);
  const [req, setReq] = useState(0);
  const [activeCourse, setActiveCourse] = useState(0);
  const [actIdx, setActIdx] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setBars([65, 82, 48, 90, 73, 88]), 350);
    const ri = setInterval(() => setReq(v => v < 9998 ? v + Math.floor(Math.random() * 9) + 4 : v), 55);
    const ai = setInterval(() => setActIdx(i => (i + 1) % ACTIVITIES.scale.length), 2700);
    return () => { clearTimeout(t); clearInterval(ri); clearInterval(ai); };
  }, []);

  const courses = [
    { title: 'Grade 5 Mathematics', instructor: 'Mr. Ali Hassan', enrolled: 48, done: 82, c: '#F97316' },
    { title: 'Arabic Language Yr.2', instructor: 'Ustaz Omar Farooqi', enrolled: 36, done: 65, c: '#8B5CF6' },
    { title: 'Science & Technology', instructor: 'Ms. Sarah Khan', enrolled: 52, done: 90, c: '#10B981' },
    { title: 'Islamic Studies I', instructor: 'Ustaza Fatima', enrolled: 64, done: 71, c: '#3B82F6' },
  ];

  const servers = [{ n: 'App Server', s: 'healthy' }, { n: 'Database', s: 'healthy' }, { n: 'CDN', s: 'healthy' }, { n: 'Auth', s: 'healthy' }];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Status banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', borderBottom: '1px solid #F0F0EE', background: 'rgba(16,185,129,0.04)', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 8px rgba(16,185,129,0.5)' }} />
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: '#10B981' }}>All Systems Operational</span>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          {[{ l: 'Uptime', v: '99.9%', c: '#10B981' }, { l: 'Req/min', v: req.toLocaleString(), c: '#3B82F6' }, { l: 'Latency', v: '42ms', c: '#F97316' }].map(s => (
            <div key={s.l} style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 800, color: s.c, lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#A1A1AA', marginTop: 1 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 180px', overflow: 'hidden', minHeight: 0 }}>
        {/* Courses */}
        <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 7, overflow: 'hidden' }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.08em', flexShrink: 0 }}>Active Courses</div>
          {courses.map((c, i) => (
            <motion.div key={i} onClick={() => setActiveCourse(i)}
              style={{ background: activeCourse === i ? `${c.c}08` : '#FAFAFA', border: `1px solid ${activeCourse === i ? `${c.c}28` : '#F0F0EE'}`, borderRadius: 9, padding: '9px 12px', cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: activeCourse === i ? 600 : 400, color: activeCourse === i ? '#18181B' : '#52525B' }}>{c.title}</div>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: '#A1A1AA', marginTop: 1 }}>{c.instructor} · {c.enrolled} enrolled</div>
                </div>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 700, color: c.c, flexShrink: 0, marginLeft: 8 }}>{c.done}%</span>
              </div>
              <div style={{ height: 4, background: '#F0F0EE', borderRadius: 2 }}>
                <motion.div animate={{ width: `${c.done}%` }} initial={{ width: '0%' }} transition={{ duration: 0.9, delay: 0.35 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{ height: '100%', background: `linear-gradient(90deg,${c.c},${c.c}80)`, borderRadius: 2 }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Server health + chart */}
        <div style={{ borderLeft: '1px solid #F0F0EE', padding: '10px 10px', display: 'flex', flexDirection: 'column', gap: 6, overflow: 'hidden' }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.08em', flexShrink: 0 }}>Infrastructure</div>
          {servers.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FAFAFA', border: '1px solid #F0F0EE', borderRadius: 7, padding: '7px 9px', flexShrink: 0 }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: '#52525B' }}>{s.n}</span>
              <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2 + i * 0.4, repeat: Infinity }} style={{ width: 7, height: 7, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px rgba(16,185,129,0.5)' }} />
            </div>
          ))}
          {/* Mini bar chart */}
          <div style={{ marginTop: 6, flexShrink: 0 }}>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#A1A1AA', marginBottom: 6 }}>Enrollment Trend</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 44 }}>
              {bars.map((h, i) => (
                <motion.div key={i} animate={{ height: `${h}%` }} initial={{ height: '0%' }} transition={{ duration: 0.8, delay: 0.5 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  style={{ flex: 1, background: i % 2 === 0 ? '#3B82F6' : 'rgba(59,130,246,0.35)', borderRadius: '2px 2px 0 0', minHeight: 3 }} />
              ))}
            </div>
          </div>
          {/* Activity */}
          <div style={{ marginTop: 'auto', background: 'rgba(59,130,246,0.05)', border: '1px solid rgba(59,130,246,0.14)', borderRadius: 8, padding: '8px 9px', flexShrink: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div key={actIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: '#52525B', lineHeight: 1.4 }}>{ACTIVITIES.scale[actIdx]}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#3B82F6', fontWeight: 600, marginTop: 3 }}>Just now</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

const PREVIEWS = [ManagePreview, TeachPreview, LearnPreview, ScalePreview];

// ─── Main Section ──────────────────────────────────────────────────────────────
export default function PillarsSection() {
  const [active, setActive] = useState(0);
  const [joinedIdx, setJoinedIdx] = useState(0);
  const [showJoined, setShowJoined] = useState(false);

  const sol = SOLUTIONS[active];
  const PreviewComp = PREVIEWS[active];

  const sectionRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });
  const frameInView = useInView(frameRef, { once: true, margin: '-80px' });

  const waLink = `https://wa.me/923001234567?text=${encodeURIComponent(sol.waText)}`;

  // Cycle "recently joined" toast in the sidebar
  useEffect(() => {
    const show = setInterval(() => {
      setJoinedIdx(i => (i + 1) % JOINED.length);
      setShowJoined(true);
      setTimeout(() => setShowJoined(false), 3200);
    }, 6000);
    const initial = setTimeout(() => setShowJoined(true), 2000);
    setTimeout(() => setShowJoined(false), 5200);
    return () => { clearInterval(show); clearTimeout(initial); };
  }, []);

  const STATS_ROW = [
    { value: '200+', label: 'Schools Worldwide', icon: '🏫' },
    { value: '50K+', label: 'Students Served', icon: '👥' },
    { value: '4', label: 'Integrated Products', icon: '⚡' },
    { value: '99.9%', label: 'Platform Uptime', icon: '🛡️' },
  ];

  return (
    <section id="solutions" ref={sectionRef} style={{ background: '#F7F7F5', padding: '88px 0 96px', overflow: 'hidden', position: 'relative' }}>

      {/* Ambient blob */}
      <AnimatePresence mode="sync">
        <motion.div key={sol.id + 'blob'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}
          style={{ position: 'absolute', top: 0, right: -100, width: 600, height: 500, borderRadius: '50%', background: `radial-gradient(circle,rgba(${sol.rgb},0.07) 0%,transparent 70%)`, pointerEvents: 'none' }} />
      </AnimatePresence>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%', position: 'relative', zIndex: 1 }}>

        {/* Section header */}
        <motion.div ref={headRef} initial={{ opacity: 0, y: 24 }} animate={headInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, color: '#F97316', letterSpacing: '0.14em', textTransform: 'uppercase', background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.2)', borderRadius: 100, padding: '5px 16px', marginBottom: 20 }}>
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#F97316', display: 'inline-block' }} />
            Platform Overview
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px,4vw,52px)', fontWeight: 800, color: '#18181B', margin: '0 0 16px', letterSpacing: '-0.03em', lineHeight: 1.08 }}>
            One platform.{' '}
            <span style={{ background: 'linear-gradient(135deg,#F97316,#FB923C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Four superpowers.</span>
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: '#71717A', maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.7 }}>
            Management, content, learning, and infrastructure — every layer covered, one trusted partner.
          </p>

          {/* Trust metrics */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
            {STATS_ROW.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={headInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: '1px solid #EBEBEA', borderRadius: 100, padding: '8px 16px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: 14 }}>{s.icon}</span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 800, color: '#18181B' }}>{s.value}</span>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 12, color: '#71717A' }}>{s.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── PLATFORM FRAME ── */}
        <motion.div ref={frameRef} initial={{ opacity: 0, y: 44 }} animate={frameInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: '#0C0C10', borderRadius: 22, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 0 0 1px rgba(0,0,0,0.12),0 8px 24px rgba(0,0,0,0.08),0 24px 64px rgba(0,0,0,0.1),0 48px 96px rgba(0,0,0,0.07)' }}>

          {/* Chrome bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 18px', background: '#161618', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              {['#FF5F57', '#FEBC2E', '#28C840'].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />)}
            </div>
            <div style={{ flex: 1, height: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 7, display: 'flex', alignItems: 'center', padding: '0 12px', gap: 7, border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: sol.color }} />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'rgba(255,255,255,0.28)' }}>cubico.tech / platform / {sol.id}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399' }} />
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>847 active now</span>
              </div>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: 'rgba(255,255,255,0.18)', letterSpacing: '0.04em' }}>← → explore</span>
            </div>
          </div>

          {/* Body */}
          <div style={{ display: 'flex', height: 500 }}>

            {/* ── Sidebar ── */}
            <div style={{ width: 196, background: '#0F0F13', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>

              {/* Nav */}
              <div style={{ padding: '16px 0 8px' }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '0 16px', marginBottom: 8 }}>Platform</div>
                {SOLUTIONS.map((s, i) => (
                  <button key={s.id} onClick={() => setActive(i)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px 11px 16px', border: 'none', cursor: 'pointer', background: active === i ? `rgba(${s.rgb},0.1)` : 'transparent', borderLeft: active === i ? `2px solid ${s.color}` : '2px solid transparent', transition: 'all 0.2s', position: 'relative' }}>
                    <span style={{ fontSize: 16, flexShrink: 0 }}>{s.icon}</span>
                    <div style={{ textAlign: 'left', flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: active === i ? 600 : 400, color: active === i ? '#fff' : 'rgba(255,255,255,0.42)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{s.name}</div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: 'rgba(255,255,255,0.22)', marginTop: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{s.tagline}</div>
                    </div>
                    {active === i && <motion.div layoutId="nav-dot" style={{ width: 5, height: 5, borderRadius: '50%', background: s.color, flexShrink: 0 }} transition={{ type: 'spring', stiffness: 500, damping: 36 }} />}
                  </button>
                ))}
              </div>

              <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '0 16px' }} />

              {/* Quick stats */}
              <div style={{ padding: '14px 12px', flex: 1, overflow: 'hidden' }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 10 }}>Live Stats</div>
                <AnimatePresence mode="wait">
                  <motion.div key={active} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 6 }} transition={{ duration: 0.25 }} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {SIDEBAR_STATS[sol.id].map((s, i) => (
                      <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 9, padding: '9px 11px' }}>
                        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 16, fontWeight: 800, color: sol.color, lineHeight: 1 }}>{s.value}</div>
                        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>{s.label}</div>
                        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: 'rgba(255,255,255,0.2)', marginTop: 1 }}>{s.sub}</div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* "Just joined" toast */}
              <div style={{ padding: '0 12px 14px' }}>
                <AnimatePresence>
                  {showJoined && (
                    <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.97 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 9, padding: '9px 11px' }}>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Just Joined</div>
                      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{JOINED[joinedIdx]}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1, repeat: Infinity }} style={{ width: 5, height: 5, borderRadius: '50%', background: '#34D399' }} />
                        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#34D399', fontWeight: 600 }}>Now onboarding</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* ── Right Panel ── */}
            <div style={{ flex: 1, background: '#FFFFFF', display: 'flex', flexDirection: 'column', minWidth: 0 }}>

              {/* Breadcrumb bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 42, borderBottom: '1px solid #F0F0EE', flexShrink: 0, background: '#FAFAFA' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-ui)', fontSize: 11, color: '#A1A1AA' }}>
                  <span>Platform</span>
                  <span style={{ color: '#D4D4D8' }}>/</span>
                  <span style={{ color: sol.color, fontWeight: 600 }}>{sol.name}</span>
                  <span style={{ color: '#D4D4D8' }}>/</span>
                  <span>Dashboard</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: `rgba(${sol.rgb},0.08)`, border: `1px solid rgba(${sol.rgb},0.2)`, borderRadius: 100, padding: '3px 10px' }}>
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, color: sol.color }}>{sol.schools}+ schools</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                    <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: '#A1A1AA' }}>Live</span>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} style={{ flex: 1, overflow: 'hidden', minHeight: 0 }}>
                  <PreviewComp />
                </motion.div>
              </AnimatePresence>

              {/* Action bar */}
              <div style={{ flexShrink: 0, borderTop: '1px solid #F0F0EE', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 16, background: '#FAFAFA' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 700, color: '#18181B', marginBottom: 2 }}>{sol.name} — {sol.tagline}</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {sol.features.map(f => (
                      <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-ui)', fontSize: 10, color: '#52525B' }}>
                        <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5" fill={sol.color} fillOpacity="0.15"/><path d="M3 5l1.4 1.4L7 3.8" stroke={sol.color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <motion.a href={waLink} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 13, color: '#fff', textDecoration: 'none', background: `linear-gradient(135deg,${sol.color},${sol.color}cc)`, padding: '10px 20px', borderRadius: 9, boxShadow: `0 4px 16px rgba(${sol.rgb},0.3)`, whiteSpace: 'nowrap' }}>
                    Get a Demo
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5h9M8 3l3.5 3.5L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </motion.a>
                  <motion.a href="#process" whileHover={{ borderColor: sol.color, color: sol.color }}
                    style={{ display: 'inline-flex', alignItems: 'center', fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 13, color: '#71717A', textDecoration: 'none', border: '1.5px solid #E4E4E7', padding: '10px 16px', borderRadius: 9, transition: 'all 0.2s', whiteSpace: 'nowrap' }}>
                    How it works
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom: solution selector tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
          {SOLUTIONS.map((s, i) => (
            <motion.button key={s.id} onClick={() => setActive(i)} whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
              style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: 'var(--font-ui)', fontWeight: active === i ? 600 : 400, fontSize: 13, padding: '9px 18px', borderRadius: 100, border: active === i ? `1.5px solid ${s.color}` : '1.5px solid #E4E4E7', background: active === i ? `rgba(${s.rgb},0.06)` : '#fff', color: active === i ? s.color : '#71717A', cursor: 'pointer', transition: 'all 0.2s', boxShadow: active === i ? `0 2px 12px rgba(${s.rgb},0.15)` : '0 1px 3px rgba(0,0,0,0.04)' }}>
              <span style={{ fontSize: 15 }}>{s.icon}</span>
              {s.name}
            </motion.button>
          ))}
        </div>

      </div>
    </section>
  );
}
