import React from 'react';
import type { SlideConfig } from './types';

// ── Before: WhatsApp broadcast chaos ──────────────────────────────────────────
const MarketingBefore = React.memo(function MarketingBefore() {
  const messages = [
    { time: '09:12', sender: 'Principal Shahid', text: 'Please share admission notice to all parents group URGENT!!!', read: true },
    { time: '09:15', sender: 'Admin Office', text: 'Done. Also fees reminder sent in 3 different groups by mistake 😅', read: true },
    { time: '09:18', sender: 'Class 9-A Parent', text: 'I got same message 5 times. Please stop spamming.', read: false },
    { time: '09:22', sender: 'Parent (unknown)', text: 'Which school is this even? Wrong number remove me', read: false },
    { time: '09:31', sender: 'Admin Office', text: 'Oops sorry wrong group. Fee reminder is for Al Noor not Al Falah 🙏', read: false },
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#e5ddd5', overflow: 'hidden' }}>
      {/* WhatsApp header */}
      <div style={{ background: '#075e54', padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#128c7e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 12 }}>👥</span>
        </div>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: '#fff' }}>School Marketing Group 📢</div>
          <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.7)' }}>247 participants</div>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)' }}>🔍</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)' }}>⋮</span>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, padding: '8px', display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            display: 'flex',
            justifyContent: msg.sender.includes('Admin') || msg.sender.includes('Principal') ? 'flex-end' : 'flex-start',
          }}>
            <div style={{
              maxWidth: '75%',
              background: msg.sender.includes('Admin') || msg.sender.includes('Principal') ? '#dcf8c6' : '#fff',
              borderRadius: msg.sender.includes('Admin') || msg.sender.includes('Principal') ? '8px 2px 8px 8px' : '2px 8px 8px 8px',
              padding: '5px 8px',
              boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
            }}>
              <div style={{ fontSize: 7, color: '#075e54', fontWeight: 700, marginBottom: 2 }}>{msg.sender}</div>
              <div style={{ fontSize: 8, color: '#333', lineHeight: 1.4 }}>{msg.text}</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2, marginTop: 2 }}>
                <span style={{ fontSize: 6, color: '#999' }}>{msg.time}</span>
                {(msg.sender.includes('Admin') || msg.sender.includes('Principal')) && (
                  <span style={{ fontSize: 7, color: msg.read ? '#53bdeb' : '#999' }}>✓✓</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <div style={{ background: '#f0f0f0', borderTop: '1px solid #ddd', padding: '5px 8px', display: 'flex', gap: 6, alignItems: 'center' }}>
        <div style={{ flex: 1, background: '#fff', borderRadius: 20, padding: '4px 10px', fontSize: 8, color: '#999' }}>
          Type a message...
        </div>
        <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#128c7e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 10, color: '#fff' }}>🎤</span>
        </div>
      </div>
    </div>
  );
});

// ── After: Marketing analytics dashboard ──────────────────────────────────────
const MarketingAfter = React.memo(function MarketingAfter() {
  const barData = [40, 55, 48, 70, 62, 85, 78];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '10px 12px', borderBottom: '1px solid var(--dark-line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>Admissions Campaign</div>
          <div style={{ fontSize: 7, color: '#555', marginTop: 1 }}>2024–25 Intake · Live</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 5px #4ade80' }} />
          <span style={{ fontSize: 7, color: '#4ade80' }}>Live</span>
        </div>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderBottom: '1px solid var(--dark-line)' }}>
        {[
          { label: 'Inquiries', val: '312', delta: '+28%', color: 'var(--blue)' },
          { label: 'Open Rate', val: '68%', delta: '+14%', color: '#4ade80' },
          { label: 'Enrolled', val: '94', delta: '+41%', color: 'var(--gold)' },
        ].map((kpi, i) => (
          <div key={i} style={{
            padding: '8px 6px',
            borderRight: i < 2 ? '1px solid var(--dark-line)' : 'none',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: kpi.color, fontFamily: 'var(--font-display)' }}>{kpi.val}</div>
            <div style={{ fontSize: 7, color: '#555', marginTop: 1 }}>{kpi.label}</div>
            <div style={{ fontSize: 7, color: '#4ade80', marginTop: 2 }}>{kpi.delta}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div style={{ padding: '10px 12px', flex: 1 }}>
        <div style={{ fontSize: 8, color: '#444', marginBottom: 6 }}>Daily reach (this week)</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 55 }}>
          {barData.map((val, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{
                width: '100%', borderRadius: '2px 2px 0 0',
                height: `${(val / 100) * 50}px`,
                background: i === 5 ? 'var(--blue)' : 'rgba(26,107,255,0.25)',
                transition: 'height 0.3s ease',
              }} />
              <span style={{ fontSize: 6, color: '#444' }}>{days[i]}</span>
            </div>
          ))}
        </div>

        {/* Channel breakdown */}
        <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {[
            { channel: 'Email Newsletter', reach: 180, pct: 58, color: 'var(--blue)' },
            { channel: 'SMS Alerts', reach: 94, pct: 30, color: 'var(--gold)' },
            { channel: 'Website Form', reach: 38, pct: 12, color: '#4ade80' },
          ].map((ch, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', flexShrink: 0, background: ch.color }} />
              <span style={{ fontSize: 7, color: '#666', flex: 1 }}>{ch.channel}</span>
              <div style={{ width: 50, height: 3, background: 'var(--dark-line)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${ch.pct}%`, height: '100%', background: ch.color, borderRadius: 2 }} />
              </div>
              <span style={{ fontSize: 7, color: '#444', width: 20, textAlign: 'right' }}>{ch.reach}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export const marketingSlide: SlideConfig = {
  id: 'marketing',
  label: 'Marketing',
  tag: 'Digital Marketing',
  beforeTitle: 'WhatsApp blasts to the wrong groups',
  afterTitle: 'Targeted campaigns, measurable ROI',
  beforeContent: <MarketingBefore />,
  afterContent: <MarketingAfter />,
  proofStat: '41% more',
  proofLabel: 'enrollments per campaign',
};
