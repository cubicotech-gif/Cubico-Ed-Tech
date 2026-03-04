'use client';

import { memo } from 'react';

// ── Shared data ───────────────────────────────────────────────────────────────
const SIDEBAR = [
  { label: 'Dashboard', active: true },
  { label: 'Courses',   active: false },
  { label: 'Students',  active: false },
  { label: 'Grades',    active: false },
  { label: 'Settings',  active: false },
];

const STATS = [
  { n: '248', label: 'Total Enrolled', color: 'var(--blue)' },
  { n: '87%', label: 'This Month',     color: 'var(--gold)' },
  { n: '12',  label: 'Active',         color: 'var(--dark-text-primary)' },
];

const COURSES = [
  { name: 'Islamic Studies Gr 4', pct: 72 },
  { name: 'Arabic Language B2',   pct: 45 },
  { name: 'Math Grade 7',         pct: 88 },
];

// ── Laptop version ────────────────────────────────────────────────────────────
export const SlideLMS = memo(function SlideLMS() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#070707' }}>
      {/* Top bar */}
      <div style={{ height: 28, flexShrink: 0, backgroundColor: '#0a0a0a', borderBottom: '1px solid var(--dark-line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, color: 'var(--dark-text-primary)' }}>Cubico LMS</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', backgroundColor: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, color: '#fff', fontWeight: 700 }}>A</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <div style={{ width: '22%', flexShrink: 0, backgroundColor: '#0d0d0d', borderRight: '1px solid var(--dark-line)', padding: '10px 0' }}>
          {SIDEBAR.map((item) => (
            <div key={item.label} style={{ padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 5, borderLeft: `2px solid ${item.active ? 'var(--blue)' : 'transparent'}`, marginBottom: 2 }}>
              <div style={{ width: 6, height: 6, borderRadius: 1, backgroundColor: item.active ? 'var(--blue)' : '#2a2a2a', flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: item.active ? 'var(--blue)' : '#3a3a3a', fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, backgroundColor: '#070707', padding: '10px', overflow: 'hidden' }}>
          {/* Welcome */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 10, color: 'var(--dark-text-primary)', fontStyle: 'italic', marginBottom: 2 }}>Good morning, Ahmad! 👋</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: 'var(--dark-text-muted)' }}>You have 3 assignments due today</div>
          </div>

          {/* Stats cards */}
          <div style={{ display: 'flex', gap: 5, marginBottom: 8 }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ flex: 1, backgroundColor: '#111', border: '1px solid var(--dark-line)', borderRadius: 3, padding: '6px 7px' }}>
                <div style={{ fontFamily: 'var(--font-stamp)', fontSize: 18, color: s.color, lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 7, color: '#4a4a4a', marginTop: 2, lineHeight: 1.2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Activity label */}
          <div style={{ fontFamily: 'var(--font-stamp)', fontSize: 7, color: '#333', letterSpacing: '0.18em', marginBottom: 5 }}>RECENT ACTIVITY</div>

          {/* Course rows */}
          {COURSES.map((c, i) => (
            <div key={i} style={{ backgroundColor: '#111', borderRadius: 3, padding: '5px 7px', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'linear-gradient(135deg, #1a1a2e, #2a1a1a)', border: '1px solid #2a2a2a', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#aaa', marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
                <div style={{ height: 3, backgroundColor: '#1a1a1a', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${c.pct}%`, height: '100%', backgroundColor: 'var(--blue)', borderRadius: 2 }} />
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, color: 'var(--blue)', flexShrink: 0 }}>{c.pct}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// ── Mobile version ─────────────────────────────────────────────────────────────
export const SlideLMSMobile = memo(function SlideLMSMobile() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#070707', padding: '10px 8px' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, color: 'var(--dark-text-primary)', fontStyle: 'italic', marginBottom: 10 }}>Good morning! 👋</div>

      {STATS.map((s) => (
        <div key={s.label} style={{ backgroundColor: '#111', border: '1px solid var(--dark-line)', borderRadius: 3, padding: '8px 10px', marginBottom: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: 'var(--dark-text-muted)' }}>{s.label}</span>
          <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 20, color: s.color }}>{s.n}</span>
        </div>
      ))}

      {COURSES.slice(0, 2).map((c, i) => (
        <div key={i} style={{ backgroundColor: '#111', borderRadius: 3, padding: '6px 8px', marginBottom: 4 }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#999', marginBottom: 4 }}>{c.name}</div>
          <div style={{ height: 3, backgroundColor: '#1a1a1a', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: `${c.pct}%`, height: '100%', backgroundColor: 'var(--blue)', borderRadius: 2 }} />
          </div>
        </div>
      ))}
    </div>
  );
});
