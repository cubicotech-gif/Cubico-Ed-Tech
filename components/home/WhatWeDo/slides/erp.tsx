import React from 'react';
import type { SlideConfig } from './types';

// ── Before: Physical register notebooks chaos ──────────────────────────────────
const ERPBefore = React.memo(function ERPBefore() {
  return (
    <div style={{ padding: '16px 18px', height: '100%', display: 'flex', flexDirection: 'column', gap: 10, background: '#faf8f5' }}>
      {/* Desk top header */}
      <div style={{ fontSize: 10, color: '#666', fontFamily: 'serif', borderBottom: '1px solid #d0c8b0', paddingBottom: 6 }}>
        📋 Admin Office — Manual Records
      </div>

      {/* Stack of registers */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {[
          { color: '#8b0000', label: 'Fee Register 2024-25', pages: '847 pages' },
          { color: '#1a3a6b', label: 'Attendance Roll A-Z', pages: '1,200 pages' },
          { color: '#2d6a2d', label: 'Exam Result Book', pages: '432 pages' },
          { color: '#6b4e1a', label: 'Staff Leave Record', pages: '218 pages' },
        ].map((reg, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#fff', border: `2px solid ${reg.color}`,
            borderLeft: `6px solid ${reg.color}`,
            borderRadius: 2, padding: '6px 8px',
            boxShadow: '1px 1px 3px rgba(0,0,0,0.1)',
            transform: `rotate(${(i % 2 === 0 ? 0.3 : -0.4)}deg)`,
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#333', fontFamily: 'serif' }}>{reg.label}</div>
              <div style={{ fontSize: 7, color: '#888', marginTop: 1 }}>{reg.pages} · Manual entry</div>
            </div>
            <div style={{ fontSize: 14 }}>📖</div>
          </div>
        ))}
      </div>

      {/* Problems */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 'auto' }}>
        {[
          { icon: '❌', text: 'Cannot find Ahmed\'s fee receipt from March' },
          { icon: '❌', text: 'Register damaged — 3 months of data unreadable' },
        ].map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, background: '#fff5f5', border: '1px solid #ffcccc', borderRadius: 3, padding: '4px 6px' }}>
            <span style={{ fontSize: 9 }}>{p.icon}</span>
            <span style={{ fontSize: 8, color: '#c0392b', lineHeight: 1.4 }}>{p.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

// ── After: School ERP dashboard ────────────────────────────────────────────────
const ERPAfter = React.memo(function ERPAfter() {
  // SVG sparkline data for fee collection
  const points = [20, 35, 25, 45, 38, 55, 48, 62, 57, 70, 65, 75];
  const maxVal = Math.max(...points);
  const svgPoints = points.map((v, i) => `${(i / (points.length - 1)) * 100},${100 - (v / maxVal) * 85}`).join(' ');

  return (
    <div style={{ height: '100%', display: 'flex', background: 'var(--bg-dark)' }}>
      {/* Icon sidebar */}
      <div style={{ width: 36, background: 'var(--dark-panel)', borderRight: '1px solid var(--dark-line)', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 12, gap: 14 }}>
        {[
          { icon: '⊞', active: false },
          { icon: '💰', active: true },
          { icon: '👥', active: false },
          { icon: '📊', active: false },
          { icon: '⚙', active: false },
        ].map((item, i) => (
          <div key={i} style={{
            width: 24, height: 24, borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: item.active ? 'rgba(26,107,255,0.2)' : 'transparent',
            border: item.active ? '1px solid rgba(26,107,255,0.4)' : 'none',
            fontSize: 10,
          }}>
            <span style={{ color: item.active ? 'var(--blue)' : '#444' }}>{item.icon}</span>
          </div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 8, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>Fee Collection</span>
          <div style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-line2)', borderRadius: 3, padding: '2px 6px', fontSize: 7, color: '#666' }}>
            March 2025
          </div>
        </div>

        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 6 }}>
          {[
            { label: 'Collected', val: '₨ 2.4M', pct: 84, color: '#4ade80' },
            { label: 'Pending', val: '₨ 0.45M', pct: 16, color: '#f87171' },
          ].map((kpi, i) => (
            <div key={i} style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-line2)', borderRadius: 5, padding: '7px 8px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>{kpi.val}</div>
              <div style={{ fontSize: 7, color: '#555', marginTop: 1, marginBottom: 5 }}>{kpi.label}</div>
              <div style={{ height: 3, background: 'var(--dark-line2)', borderRadius: 2 }}>
                <div style={{ width: `${kpi.pct}%`, height: '100%', background: kpi.color, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Sparkline chart */}
        <div style={{ background: 'var(--dark-card)', border: '1px solid var(--dark-line)', borderRadius: 5, padding: '8px' }}>
          <div style={{ fontSize: 8, color: '#555', marginBottom: 5 }}>Monthly trend</div>
          <svg viewBox="0 0 100 60" width="100%" height="40" preserveAspectRatio="none">
            <defs>
              <linearGradient id="fee-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--blue)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--blue)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline points={svgPoints} fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points={`0,100 ${svgPoints} 100,100`} fill="url(#fee-grad)" />
          </svg>
        </div>

        {/* Recent payments */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontSize: 8, color: '#444', marginBottom: 4 }}>Recent Payments</div>
          {[
            { name: 'Ahmed R.', class: '9-A', amount: '₨ 4,500', status: 'paid' },
            { name: 'Sara K.', class: '10-B', amount: '₨ 5,200', status: 'paid' },
            { name: 'Usman T.', class: '8-C', amount: '₨ 4,500', status: 'late' },
          ].map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 0', borderBottom: '1px solid var(--dark-line)' }}>
              <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--dark-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 7, color: '#666' }}>{p.name[0]}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 8, color: '#bbb' }}>{p.name}</div>
                <div style={{ fontSize: 7, color: '#444' }}>Class {p.class}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 8, color: '#fff' }}>{p.amount}</div>
                <div style={{ fontSize: 7, color: p.status === 'paid' ? '#4ade80' : '#f87171' }}>
                  {p.status === 'paid' ? '✓ Paid' : '⏱ Late'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export const erpSlide: SlideConfig = {
  id: 'erp',
  label: 'ERP',
  tag: 'School Management',
  beforeTitle: 'Registers, manual errors, lost data',
  afterTitle: 'Unified ERP — instant oversight',
  beforeContent: <ERPBefore />,
  afterContent: <ERPAfter />,
  proofStat: '90% less',
  proofLabel: 'admin time on fee tracking',
};
