'use client';

import { memo } from 'react';

const KPI = [
  { n: '1,247', label: 'Total Students',    color: '#E8622A' },
  { n: '89',    label: 'Teaching Staff',    color: '#C9A96E' },
  { n: '2.4M',  label: 'Fee Collected PKR', color: '#F0EBE3' },
  { n: '94%',   label: 'Attendance Today',  color: '#10B981' },
];

const EVENTS = [
  { text: 'New student enrolled',    time: '2m ago' },
  { text: 'Fee payment received',    time: '11m ago' },
  { text: 'Exam schedule updated',   time: '1h ago' },
];

const CHART_POINTS = '10,55 40,48 75,35 110,28 145,20 180,15 215,22';

// ── Laptop version ─────────────────────────────────────────────────────────────
export const SlideERP = memo(function SlideERP() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#070707' }}>
      {/* Top bar */}
      <div style={{ height: 28, flexShrink: 0, backgroundColor: '#0a0a0a', borderBottom: '1px solid #1d1d1d', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, color: '#F0EBE3' }}>Cubico ERP</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 7, color: '#3a3a3a' }}>·</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 8, color: '#4a4a4a' }}>North Karachi School</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 7, color: '#4a4a4a' }}>Mar 4, 2026</span>
          <div style={{ backgroundColor: '#1a0a05', border: '1px solid #E8622A33', borderRadius: 2, padding: '2px 5px' }}>
            <span style={{ fontFamily: 'var(--font-accent)', fontSize: 7, color: '#E8622A', letterSpacing: '0.12em' }}>PRINCIPAL</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Icon-only sidebar */}
        <div style={{ width: 32, flexShrink: 0, backgroundColor: '#0d0d0d', borderRight: '1px solid #1d1d1d', padding: '8px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          {[
            { icon: '⊞', active: true },
            { icon: '👥', active: false },
            { icon: '👨‍🏫', active: false },
            { icon: '💰', active: false },
            { icon: '📊', active: false },
            { icon: '⚙', active: false },
          ].map((item, i) => (
            <div key={i} style={{ width: 24, height: 24, borderRadius: 3, backgroundColor: item.active ? '#E8622A' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
              <span style={{ fontSize: 9 }}>{item.icon}</span>
            </div>
          ))}
        </div>

        {/* Main */}
        <div style={{ flex: 1, padding: '9px', overflow: 'hidden' }}>
          <div style={{ fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 700, color: '#F0EBE3', marginBottom: 2 }}>Dashboard Overview</div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 7, color: '#6A6460', marginBottom: 8 }}>Academic Year 2025–26 · Term 2</div>

          {/* KPI cards */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
            {KPI.map((k) => (
              <div key={k.label} style={{ flex: 1, backgroundColor: '#111', border: '1px solid #1d1d1d', borderRadius: 3, padding: '5px 6px' }}>
                <div style={{ fontFamily: 'var(--font-accent)', fontSize: 14, color: k.color, lineHeight: 1, marginBottom: 2 }}>{k.n}</div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 6, color: '#4a4a4a', lineHeight: 1.3 }}>{k.label}</div>
              </div>
            ))}
          </div>

          {/* Two column */}
          <div style={{ display: 'flex', gap: 6, overflow: 'hidden' }}>
            {/* Chart */}
            <div style={{ flex: '0 0 55%', backgroundColor: '#0e0e0e', border: '1px solid #1d1d1d', borderRadius: 3, padding: '6px 8px' }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 7, color: '#4a4a4a', marginBottom: 4 }}>Monthly Fee Collection</div>
              <svg width="100%" height="40" viewBox="0 0 220 60" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E8622A" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#E8622A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polyline points={CHART_POINTS} stroke="#E8622A" strokeWidth="1.5" fill="none" />
                <polygon points={`10,55 ${CHART_POINTS} 215,55`} fill="url(#chart-grad)" />
              </svg>
            </div>

            {/* Events */}
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontFamily: 'var(--font-accent)', fontSize: 7, color: '#333', letterSpacing: '0.15em', marginBottom: 5 }}>RECENT EVENTS</div>
              {EVENTS.map((e, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, marginBottom: 6 }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#E8622A', flexShrink: 0, marginTop: 2 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 8, color: '#888', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.text}</div>
                    <div style={{ fontFamily: 'var(--font-accent)', fontSize: 7, color: '#333' }}>{e.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// ── Mobile version ─────────────────────────────────────────────────────────────
export const SlideERPMobile = memo(function SlideERPMobile() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#070707', padding: '10px 8px' }}>
      <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, fontWeight: 700, color: '#F0EBE3', marginBottom: 3 }}>Dashboard</div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 7, color: '#4a4a4a', marginBottom: 10 }}>Academic Year 2025–26</div>

      {/* 2×2 KPI grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, marginBottom: 10 }}>
        {KPI.map((k) => (
          <div key={k.label} style={{ backgroundColor: '#111', border: '1px solid #1d1d1d', borderRadius: 3, padding: '8px 8px' }}>
            <div style={{ fontFamily: 'var(--font-accent)', fontSize: 18, color: k.color, lineHeight: 1 }}>{k.n}</div>
            <div style={{ fontFamily: 'var(--font-ui)', fontSize: 7, color: '#4a4a4a', marginTop: 2 }}>{k.label}</div>
          </div>
        ))}
      </div>

      {/* 2 events */}
      {EVENTS.slice(0, 2).map((e, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, backgroundColor: '#111', borderRadius: 3, padding: '6px 8px', marginBottom: 4 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#E8622A', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 8, color: '#888', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.text}</span>
          <span style={{ fontFamily: 'var(--font-accent)', fontSize: 7, color: '#333', flexShrink: 0 }}>{e.time}</span>
        </div>
      ))}
    </div>
  );
});
