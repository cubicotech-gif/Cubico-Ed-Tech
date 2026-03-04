'use client';

import { memo } from 'react';

const GRID_ITEMS = [
  { icon: '📋', label: 'Attendance' },
  { icon: '💳', label: 'Fee Payment' },
  { icon: '📊', label: 'Results' },
  { icon: '🕐', label: 'Timetable' },
  { icon: '📚', label: 'Library' },
  { icon: '📌', label: 'Notices' },
];

const NOTICES = [
  'Exams begin March 15th',
  'Parent meeting Friday 3PM',
  'Sports day postponed',
];

// ── Laptop version ─────────────────────────────────────────────────────────────
export const SlideSchoolPortal = memo(function SlideSchoolPortal() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#070707' }}>
      {/* Top bar */}
      <div style={{ height: 28, flexShrink: 0, backgroundColor: 'var(--dark-card)', borderBottom: '1px solid var(--dark-line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 16, height: 16, borderRadius: 2, backgroundColor: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, color: 'var(--bg-dark)' }}>AN</span>
          </div>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: 'var(--dark-text-primary)', fontWeight: 600 }}>Al-Noor Academy Portal</span>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {['🔔', '⚙'].map((icon, i) => (
            <span key={i} style={{ fontSize: 8, color: '#3a3a3a' }}>{icon}</span>
          ))}
        </div>
      </div>

      {/* Hero banner */}
      <div style={{ height: '26%', flexShrink: 0, background: 'linear-gradient(135deg, #07091a 0%, #0d1128 50%, #0a0a14 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 14px', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative geometric shape */}
        <svg style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', opacity: 0.07 }} width="60" height="60" viewBox="0 0 60 60">
          <polygon points="30,0 60,52 0,52" stroke="var(--gold)" strokeWidth="1" fill="none" />
          <polygon points="30,10 52,46 8,46" stroke="var(--gold)" strokeWidth="0.5" fill="none" />
        </svg>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--dark-text-primary)', marginBottom: 3 }}>Welcome Back, Students</div>
        <div style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--gold)', letterSpacing: '0.2em' }}>SEMESTER 2, 2025–26</div>
      </div>

      {/* Quick access grid */}
      <div style={{ flex: 1, padding: '8px', overflow: 'hidden' }}>
        <div style={{ fontFamily: 'var(--font-stamp)', fontSize: 7, color: '#333', letterSpacing: '0.2em', marginBottom: 6 }}>QUICK ACCESS</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
          {GRID_ITEMS.map((item) => (
            <div key={item.label} style={{ backgroundColor: '#111', border: '1px solid var(--dark-line)', borderRadius: 3, padding: '6px 4px', textAlign: 'center' }}>
              <div style={{ fontSize: 12, marginBottom: 3 }}>{item.icon}</div>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 7, color: 'var(--dark-text-muted)' }}>{item.label}</div>
            </div>
          ))}
        </div>

        {/* Notices */}
        <div style={{ fontFamily: 'var(--font-stamp)', fontSize: 7, color: '#333', letterSpacing: '0.2em', marginTop: 8, marginBottom: 5 }}>RECENT NOTICES</div>
        <div style={{ display: 'flex', gap: 5, overflow: 'hidden' }}>
          {NOTICES.map((n, i) => (
            <div key={i} style={{ flexShrink: 0, backgroundColor: '#111', border: '1px solid var(--dark-line)', borderRadius: 3, padding: '4px 7px' }}>
              <span style={{ fontFamily: 'var(--font-ui)', fontSize: 7, color: 'var(--dark-text-muted)', whiteSpace: 'nowrap' }}>📌 {n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

// ── Mobile version ─────────────────────────────────────────────────────────────
export const SlideSchoolPortalMobile = memo(function SlideSchoolPortalMobile() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#070707', padding: '10px 8px' }}>
      {/* Logo + welcome */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
        <div style={{ width: 20, height: 20, borderRadius: 2, backgroundColor: 'var(--gold)' }} />
        <div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: 'var(--dark-text-primary)', fontWeight: 600 }}>Al-Noor Academy</div>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 7, color: 'var(--dark-text-muted)' }}>Semester 2, 2025–26</div>
        </div>
      </div>

      {/* Big action buttons */}
      {[
        { label: 'Attendance', icon: '📋', color: 'var(--blue)' },
        { label: 'Results',    icon: '📊', color: 'var(--gold)' },
        { label: 'Fee Status', icon: '💳', color: 'var(--green)' },
      ].map((b) => (
        <div key={b.label} style={{ backgroundColor: '#111', border: `1px solid rgba(26,107,255,0.13)`, borderRadius: 4, padding: '10px 12px', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 14 }}>{b.icon}</span>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: '#aaa', fontWeight: 600 }}>{b.label}</span>
          <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-stamp)', fontSize: 9, color: b.color }}>→</span>
        </div>
      ))}

      {/* Notice ticker */}
      <div style={{ marginTop: 'auto', backgroundColor: 'var(--dark-panel)', borderTop: '1px solid var(--dark-line)', padding: '5px 0' }}>
        <div style={{ fontFamily: 'var(--font-ui)', fontSize: 8, color: '#4a4a4a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>📌 Exams begin March 15th · Parent meeting Friday</div>
      </div>
    </div>
  );
});
