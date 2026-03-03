import React from 'react';
import type { SlideConfig } from './types';

// ── Before: Chaotic Excel gradebook ───────────────────────────────────────────
const LMSBefore = React.memo(function LMSBefore() {
  const rows = [
    { name: 'Ahmed R.', q1: 67, q2: 55, mid: 48, final: '—', status: 'fail' },
    { name: 'Sara K.',  q1: 88, q2: 91, mid: 84, final: '—', status: 'pass' },
    { name: 'Usman T.', q1: 72, q2: 68, mid: 59, final: '—', status: 'warn' },
    { name: 'Hira M.',  q1: 45, q2: 38, mid: 42, final: '—', status: 'fail' },
    { name: 'Bilal N.', q1: 95, q2: 89, mid: 92, final: '—', status: 'pass' },
  ];
  return (
    <div style={{ padding: '20px 18px', height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* App bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
        <div style={{ width: 20, height: 20, background: '#1d6f42', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>X</span>
        </div>
        <span style={{ color: '#3a3a3a', fontSize: 11, fontWeight: 600, fontFamily: 'monospace' }}>Grade_Tracker_FINAL_v3.xlsx</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
          {['#ed7b2a','#e8d530','#3abd5e'].map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />
          ))}
        </div>
      </div>

      {/* Formula bar */}
      <div style={{ background: '#f5f5f5', border: '1px solid #ccc', borderRadius: 3, padding: '3px 8px', fontSize: 10, color: '#555', fontFamily: 'monospace' }}>
        =IF(SUM(D3:F3)/300*100&gt;=50, &quot;PASS&quot;, &quot;FAIL&quot;)
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: 'hidden', border: '1px solid #bbb', borderRadius: 4 }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.7fr 0.7fr 0.7fr 0.7fr 0.9fr', background: '#d4edda', borderBottom: '1px solid #bbb' }}>
          {['Student Name', 'Quiz 1', 'Quiz 2', 'Mid', 'Final', 'Status'].map((h, i) => (
            <div key={i} style={{ padding: '4px 6px', fontSize: 9, fontWeight: 700, color: '#2d6a4f', borderRight: i < 5 ? '1px solid #bbb' : 'none', fontFamily: 'monospace' }}>{h}</div>
          ))}
        </div>
        {/* Rows */}
        {rows.map((row, i) => (
          <div
            key={i}
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 0.7fr 0.7fr 0.7fr 0.7fr 0.9fr',
              background: i % 2 === 0 ? '#fff' : '#f8f8f8',
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <div style={{ padding: '4px 6px', fontSize: 9, color: '#333', borderRight: '1px solid #e0e0e0', fontFamily: 'monospace' }}>{row.name}</div>
            <div style={{ padding: '4px 6px', fontSize: 9, color: '#333', borderRight: '1px solid #e0e0e0', textAlign: 'center', fontFamily: 'monospace' }}>{row.q1}</div>
            <div style={{ padding: '4px 6px', fontSize: 9, color: '#333', borderRight: '1px solid #e0e0e0', textAlign: 'center', fontFamily: 'monospace' }}>{row.q2}</div>
            <div style={{ padding: '4px 6px', fontSize: 9, color: row.mid < 50 ? '#c0392b' : '#333', borderRight: '1px solid #e0e0e0', textAlign: 'center', fontFamily: 'monospace' }}>{row.mid}</div>
            <div style={{ padding: '4px 6px', fontSize: 9, color: '#aaa', borderRight: '1px solid #e0e0e0', textAlign: 'center', fontFamily: 'monospace' }}>{row.final}</div>
            <div style={{
              padding: '4px 6px', fontSize: 9, textAlign: 'center', fontFamily: 'monospace',
              color: row.status === 'fail' ? '#c0392b' : row.status === 'warn' ? '#e67e22' : '#27ae60',
              background: row.status === 'fail' ? '#fdecea' : row.status === 'warn' ? '#fef9ec' : '#e8f8f0',
            }}>
              {row.status === 'fail' ? '#REF!' : row.status === 'warn' ? 'RISK' : 'PASS'}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom warning */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 4, padding: '5px 8px' }}>
        <span style={{ fontSize: 10, color: '#856404' }}>⚠</span>
        <span style={{ fontSize: 9, color: '#856404', fontFamily: 'monospace' }}>Circular reference detected in cell F7. Results may be incorrect.</span>
      </div>
    </div>
  );
});

// ── After: Moodle LMS dashboard ────────────────────────────────────────────────
const LMSAfter = React.memo(function LMSAfter() {
  const courses = [
    { name: 'Islamic Studies', students: 142, progress: 78, color: '#E8622A' },
    { name: 'Mathematics',     students: 98,  progress: 61, color: '#C9A96E' },
    { name: 'English Language',students: 175, progress: 90, color: '#4ade80' },
  ];
  return (
    <div style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column', gap: 10, background: '#0f1117' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
          <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>CUBICO LMS</span>
        </div>
        <span style={{ fontSize: 9, color: '#666', fontFamily: 'var(--font-ui)' }}>Live Dashboard</span>
      </div>

      {/* Stat chips */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 6 }}>
        {[
          { label: 'Students', val: '415', delta: '+12' },
          { label: 'Avg Score', val: '76%', delta: '+8%' },
          { label: 'Completion', val: '84%', delta: '+5%' },
        ].map((s, i) => (
          <div key={i} style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 6, padding: '8px 10px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>{s.val}</div>
            <div style={{ fontSize: 8, color: '#555', marginTop: 2 }}>{s.label}</div>
            <div style={{ fontSize: 8, color: '#4ade80', marginTop: 1 }}>{s.delta} this month</div>
          </div>
        ))}
      </div>

      {/* Courses */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
        {courses.map((c, i) => (
          <div key={i} style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 6, padding: '8px 10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: '#ccc', fontWeight: 600 }}>{c.name}</span>
              <span style={{ fontSize: 9, color: '#555' }}>{c.students} students</span>
            </div>
            <div style={{ height: 4, background: '#2a2a2a', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{ width: `${c.progress}%`, height: '100%', background: c.color, borderRadius: 2 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span style={{ fontSize: 8, color: '#555' }}>Completion rate</span>
              <span style={{ fontSize: 8, color: c.color, fontWeight: 700 }}>{c.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export const lmsSlide: SlideConfig = {
  id: 'lms',
  label: 'LMS',
  tag: 'Learning Management',
  beforeTitle: 'Scattered spreadsheets, broken formulas',
  afterTitle: 'Live LMS — every student tracked',
  beforeContent: <LMSBefore />,
  afterContent: <LMSAfter />,
  proofStat: '3× faster',
  proofLabel: 'report generation',
};
