'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

type Tab = 'lms' | 'animation' | 'app';

const TABS: { id: Tab; label: string }[] = [
  { id: 'lms', label: 'LMS Preview' },
  { id: 'animation', label: 'Animation Preview' },
  { id: 'app', label: 'App Preview' },
];

// ── Fake UI panels ────────────────────────────────────────────────────────────

function LMSPanel() {
  return (
    <div className="flex h-full text-xs font-dm overflow-hidden rounded-xl border border-border bg-[#0d1117]">
      {/* Sidebar */}
      <div className="w-40 border-r border-border/60 flex-shrink-0 p-3 space-y-1">
        <div className="flex items-center gap-2 mb-4 px-1">
          <div className="w-5 h-5 rounded bg-accent/30 flex items-center justify-center text-[9px]">🎓</div>
          <span className="font-syne font-bold text-white text-[10px]">Cubico LMS</span>
        </div>
        {['Dashboard', 'My Courses', 'Grades', 'Calendar', 'Messages'].map((item, i) => (
          <div
            key={item}
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[10px] ${i === 1 ? 'bg-accent/15 text-accent' : 'text-muted/70'}`}
          >
            <div className={`w-1 h-1 rounded-full ${i === 1 ? 'bg-accent' : 'bg-border'}`} />
            {item}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 space-y-3 overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="font-syne font-bold text-white text-[11px]">My Courses</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500/60" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
            <div className="w-2 h-2 rounded-full bg-green-500/60" />
          </div>
        </div>
        {[
          { name: 'Grade 9 Physics', prog: 78, color: '#3b82f6' },
          { name: 'O-Level Chemistry', prog: 45, color: '#06d6a0' },
          { name: 'English Literature', prog: 92, color: '#a855f7' },
        ].map((course) => (
          <div key={course.name} className="bg-card-bg/80 border border-border/60 rounded-lg p-2.5">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-text/80 text-[10px]">{course.name}</span>
              <span className="text-[9px]" style={{ color: course.color }}>
                {course.prog}%
              </span>
            </div>
            <div className="h-1 bg-border/50 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${course.prog}%`, background: course.color }}
              />
            </div>
          </div>
        ))}

        {/* Recent activity */}
        <div className="mt-2">
          <span className="text-muted/60 text-[9px] uppercase tracking-wider">Recent Activity</span>
          {['Quiz submitted — Physics Ch4', 'Assignment due in 2 days'].map((act) => (
            <div key={act} className="flex items-center gap-2 mt-1.5">
              <div className="w-1 h-1 rounded-full bg-accent-green/60 flex-shrink-0" />
              <span className="text-muted/70 text-[9px]">{act}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AnimationPanel() {
  return (
    <div className="flex flex-col h-full rounded-xl border border-border bg-[#0d1117] overflow-hidden font-dm text-xs">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/60">
        <span className="font-syne font-bold text-white text-[11px]">
          Grade 5 Science — Solar System
        </span>
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
        </div>
      </div>

      {/* Video area */}
      <div className="flex-1 bg-black/70 flex items-center justify-center relative">
        <div className="w-14 h-14 rounded-full bg-accent-green/15 border border-accent-green/30 flex items-center justify-center text-accent-green text-xl cursor-pointer hover:bg-accent-green/25 transition-colors">
          ▶
        </div>
        {/* Episode badges */}
        <div className="absolute top-3 left-3 flex gap-1">
          <span className="text-[9px] bg-accent-green/20 border border-accent-green/30 text-accent-green px-1.5 py-0.5 rounded font-syne font-bold">
            EP 03
          </span>
          <span className="text-[9px] bg-card-bg/80 border border-border text-muted px-1.5 py-0.5 rounded">
            Urdu VO
          </span>
        </div>
        <span className="absolute bottom-3 right-3 text-muted/60 text-[9px]">04:32 / 08:15</span>
      </div>

      {/* Timeline */}
      <div className="px-4 py-3 border-t border-border/60">
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 rounded-full ${i < 11 ? 'bg-accent-green/70' : 'bg-border/50'}`}
              style={{ height: '4px' }}
            />
          ))}
        </div>
        {/* Chapter markers */}
        <div className="flex justify-between text-[8px] text-muted/50 font-syne">
          <span>Intro</span>
          <span>Planets</span>
          <span>Orbits</span>
          <span>Quiz</span>
        </div>
      </div>
    </div>
  );
}

function AppPanel() {
  return (
    <div className="flex items-center justify-center h-full">
      {/* Phone frame */}
      <div className="w-48 h-[22rem] rounded-[2rem] border-2 border-accent-purple/30 bg-[#0d1117] overflow-hidden flex flex-col shadow-[0_0_60px_rgba(168,85,247,0.15)]">
        {/* Status bar */}
        <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-border/40">
          <span className="text-[8px] text-muted/60 font-syne">9:41</span>
          <span className="text-[7px] text-white/80 font-syne font-bold">CampusCore</span>
          <span className="text-[8px] text-muted/60">●●●</span>
        </div>

        {/* Header */}
        <div className="px-3 pt-2 pb-1">
          <span className="text-[9px] text-muted/60 font-syne uppercase tracking-wider">Students</span>
        </div>

        {/* Student list */}
        <div className="flex-1 overflow-hidden px-2 space-y-1.5">
          {[
            { name: 'Ahmed K.', grade: 'A+', score: 97 },
            { name: 'Fatima S.', grade: 'A', score: 91 },
            { name: 'Usman R.', grade: 'B+', score: 84 },
            { name: 'Zara M.', grade: 'A', score: 88 },
            { name: 'Bilal T.', grade: 'B', score: 76 },
          ].map((student, i) => (
            <div
              key={student.name}
              className="flex items-center gap-2 bg-card-bg/60 border border-border/40 rounded-xl px-2 py-1.5"
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] text-white font-syne font-bold flex-shrink-0"
                style={{ background: `hsl(${i * 50 + 220}, 70%, 40%)` }}
              >
                {student.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-text/90 text-[9px] font-syne font-semibold truncate">
                  {student.name}
                </div>
                <div className="text-muted/60 text-[8px]">Score: {student.score}%</div>
              </div>
              <span
                className="text-[8px] font-syne font-bold px-1.5 py-0.5 rounded"
                style={{
                  background:
                    student.grade === 'A+' || student.grade === 'A'
                      ? 'rgba(6,214,160,0.15)'
                      : 'rgba(59,130,246,0.15)',
                  color:
                    student.grade === 'A+' || student.grade === 'A' ? '#06d6a0' : '#3b82f6',
                }}
              >
                {student.grade}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div className="flex justify-around px-2 py-2 border-t border-border/40 mt-1">
          {['🏠', '📊', '💬', '👤'].map((icon, i) => (
            <div
              key={i}
              className={`text-base ${i === 0 ? 'opacity-100' : 'opacity-30'}`}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const PANELS: Record<Tab, React.ReactNode> = {
  lms: <LMSPanel />,
  animation: <AnimationPanel />,
  app: <AppPanel />,
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function DemoPreview() {
  const [activeTab, setActiveTab] = useState<Tab>('lms');

  return (
    <section className="py-24 px-5 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-card-bg border border-border text-muted text-xs font-syne font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
          Interactive Preview
        </div>
        <h2 className="font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
          See It Before You{' '}
          <span className="gradient-text">Commit</span>
        </h2>
        <p className="text-muted font-dm mt-4 max-w-md mx-auto leading-relaxed">
          Explore previews of the products we build — before a single rupee is spent.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 items-start max-w-5xl mx-auto">
        {/* Tab buttons */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-shrink-0 text-left px-5 py-3 rounded-xl font-syne font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-accent text-white shadow-lg shadow-accent/25'
                  : 'bg-card-bg border border-border text-muted hover:text-text hover:border-border/60'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 rounded-xl bg-accent -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Preview panel */}
        <div
          className="relative h-80 md:h-96 rounded-2xl border border-border overflow-hidden bg-[#0d1117]"
          style={{ boxShadow: '0 0 60px rgba(59,130,246,0.08), 0 16px 48px rgba(0,0,0,0.5)' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="h-full p-4"
            >
              {PANELS[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 text-accent font-syne font-semibold text-sm hover:text-accent/80 transition-colors"
        >
          Request a Live Demo →
        </Link>
      </div>
    </section>
  );
}
