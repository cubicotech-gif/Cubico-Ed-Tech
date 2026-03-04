import React from 'react';
import type { SlideConfig } from './types';

// ── Before: Old Blogspot / basic static site ───────────────────────────────────
const WebsiteBefore = React.memo(function WebsiteBefore() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#f0f0f0', fontFamily: 'Georgia, serif', overflow: 'hidden' }}>
      {/* Browser bar */}
      <div style={{ background: '#d9d9d9', borderBottom: '1px solid #bbb', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ display: 'flex', gap: 3 }}>
          {['#ff5f57','#ffbd2e','#28c840'].map((c,i) => <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />)}
        </div>
        <div style={{ flex: 1, background: '#fff', borderRadius: 2, padding: '2px 6px', fontSize: 8, color: '#555', border: '1px solid #bbb', fontFamily: 'monospace' }}>
          http://alnoorsecondaryschool.blogspot.com
        </div>
      </div>

      {/* Site body */}
      <div style={{ flex: 1, overflow: 'hidden', background: '#fff' }}>
        {/* Header banner */}
        <div style={{ background: 'linear-gradient(to right, #003087, #0055b3)', padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#gold', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: 14 }}>🏫</span>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', fontFamily: 'impact, serif' }}>AL NOOR SECONDARY SCHOOL</div>
            <div style={{ fontSize: 8, color: '#aac8ff', fontFamily: 'serif' }}>Established 1987 — Karachi, Pakistan</div>
          </div>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', gap: 0, borderBottom: '2px solid #003087', background: '#f5f5f5' }}>
          {['Home', 'About', 'Admissions', 'Contact', 'Notice Board'].map((item, i) => (
            <div key={i} style={{ padding: '4px 8px', fontSize: 8, color: i === 0 ? '#fff' : '#003087', background: i === 0 ? '#003087' : 'transparent', borderRight: '1px solid #ccc', cursor: 'pointer' }}>{item}</div>
          ))}
        </div>

        {/* Content */}
        <div style={{ display: 'flex', gap: 0 }}>
          {/* Main */}
          <div style={{ flex: 1, padding: '8px 10px' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#003087', borderBottom: '1px dotted #ccc', paddingBottom: 4, marginBottom: 6 }}>
              Welcome to Al Noor Secondary School
            </div>
            <div style={{ fontSize: 8, color: '#555', lineHeight: 1.6, marginBottom: 6 }}>
              Al Noor Secondary School is committed to providing quality education to the students of Karachi. Our school was established in 1987 and we have been serving the community for over 35 years...
            </div>
            {/* Broken image */}
            <div style={{ width: '100%', height: 45, background: '#eee', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: 8, color: '#999' }}>🖼️ Image not found (photo_school2019.jpg)</span>
            </div>
            <div style={{ fontSize: 8, color: '#555', lineHeight: 1.6 }}>
              We offer Matriculation and Intermediate programs. Admissions are open for the new academic year 2024-25. Please contact the office for more details.
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ width: 70, borderLeft: '1px solid #ddd', padding: '6px', background: '#fafafa' }}>
            <div style={{ fontSize: 7, fontWeight: 700, color: '#003087', marginBottom: 4, borderBottom: '1px solid #ddd' }}>NOTICE</div>
            {['Exam schedule posted', 'Fee due: 15th', 'PTM: Fri 9am'].map((n, i) => (
              <div key={i} style={{ fontSize: 7, color: '#555', borderBottom: '1px dotted #eee', padding: '3px 0', lineHeight: 1.4 }}>
                📌 {n}
              </div>
            ))}
            {/* Visitor counter */}
            <div style={{ marginTop: 8, fontSize: 7, color: '#999', textAlign: 'center' }}>
              Visitors: 00847
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// ── After: Premium school website ─────────────────────────────────────────────
const WebsiteAfter = React.memo(function WebsiteAfter() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)', overflow: 'hidden' }}>
      {/* Browser chrome */}
      <div style={{ background: 'var(--dark-card)', borderBottom: '1px solid var(--dark-line2)', padding: '5px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ display: 'flex', gap: 3 }}>
          {['#ff5f57','#ffbd2e','#28c840'].map((c,i) => <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />)}
        </div>
        <div style={{ flex: 1, background: 'var(--dark-panel)', borderRadius: 10, padding: '2px 8px', fontSize: 8, color: '#666', border: '1px solid var(--dark-line2)', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: '#4ade80', fontSize: 7 }}>🔒</span>
          alnoor.edu.pk
        </div>
      </div>

      {/* Hero section */}
      <div style={{ position: 'relative', background: 'linear-gradient(135deg, var(--bg-dark) 0%, var(--dark-card) 100%)', padding: '14px 12px', borderBottom: '1px solid var(--dark-line)', overflow: 'hidden' }}>
        {/* Geometric shapes */}
        {[
          { w: 60, h: 60, top: -10, right: -10, rot: 15, op: 0.08 },
          { w: 35, h: 35, top: 20, right: 40, rot: 30, op: 0.06 },
        ].map((s, i) => (
          <div key={i} style={{
            position: 'absolute', top: s.top, right: s.right,
            width: s.w, height: s.h,
            border: '1px solid var(--blue)', borderRadius: 4,
            transform: `rotate(${s.rot}deg)`, opacity: s.op,
          }} />
        ))}

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <div style={{ width: 20, height: 20, background: 'var(--blue)', borderRadius: 3 }} />
            <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)', letterSpacing: 1 }}>AL NOOR</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            {['Academics', 'Admissions', 'Portal'].map((item, i) => (
              <span key={i} style={{ fontSize: 8, color: i === 2 ? 'var(--blue)' : '#888' }}>{item}</span>
            ))}
          </div>
        </div>

        {/* Headline */}
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: 6 }}>
          Shaping Tomorrow&apos;s<br />
          <span style={{ color: 'var(--blue)' }}>Leaders</span> Today
        </div>
        <div style={{ fontSize: 8, color: '#555', marginBottom: 10 }}>Excellence in education since 1987</div>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 6 }}>
          <div style={{ background: 'var(--blue)', borderRadius: 4, padding: '4px 10px', fontSize: 8, color: '#fff', fontWeight: 600 }}>
            Apply Now
          </div>
          <div style={{ border: '1px solid var(--dark-line2)', borderRadius: 4, padding: '4px 10px', fontSize: 8, color: '#888' }}>
            Learn More →
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderBottom: '1px solid var(--dark-line)' }}>
        {[
          { n: '1,400+', label: 'Students' },
          { n: '97%',    label: 'Pass Rate' },
          { n: '35 yrs', label: 'Excellence' },
        ].map((s, i) => (
          <div key={i} style={{
            padding: '8px 6px', textAlign: 'center',
            borderRight: i < 2 ? '1px solid var(--dark-line)' : 'none',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', fontFamily: 'var(--font-display)' }}>{s.n}</div>
            <div style={{ fontSize: 7, color: '#555', marginTop: 1 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick links */}
      <div style={{ padding: '8px 12px', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 5 }}>
        {[
          { icon: '📚', label: 'Curriculum' },
          { icon: '🏆', label: 'Results' },
          { icon: '📅', label: 'Events' },
        ].map((item, i) => (
          <div key={i} style={{
            background: 'var(--dark-card)', border: '1px solid var(--dark-line)', borderRadius: 5,
            padding: '8px 6px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 14, marginBottom: 3 }}>{item.icon}</div>
            <div style={{ fontSize: 8, color: '#666' }}>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
});

export const websiteSlide: SlideConfig = {
  id: 'website',
  label: 'Website',
  tag: 'Digital Presence',
  beforeTitle: 'A Blogspot no parent trusts',
  afterTitle: 'Premium school website that converts',
  beforeContent: <WebsiteBefore />,
  afterContent: <WebsiteAfter />,
  proofStat: '60% more',
  proofLabel: 'admission inquiries',
};
