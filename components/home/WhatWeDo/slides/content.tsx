import React from 'react';
import type { SlideConfig } from './types';

// ── Before: Photocopied textbooks chaos ────────────────────────────────────────
const ContentBefore = React.memo(function ContentBefore() {
  return (
    <div style={{ padding: '16px 18px', height: '100%', display: 'flex', flexDirection: 'column', gap: 10, background: '#f8f6f0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid #d0c8b0', paddingBottom: 6 }}>
        <span style={{ fontSize: 14 }}>📄</span>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: '#333', fontFamily: 'serif' }}>Chapter 7 — The Human Digestive System</div>
          <div style={{ fontSize: 8, color: '#888' }}>Photocopy quality: poor · Generation 4 of 4</div>
        </div>
      </div>

      {/* Photocopied page simulation */}
      <div style={{
        flex: 1, background: '#fff',
        border: '1px solid #ccc', borderRadius: 3, padding: '8px',
        position: 'relative', overflow: 'hidden',
        boxShadow: '2px 2px 6px rgba(0,0,0,0.15)',
        transform: 'rotate(-0.5deg)',
      }}>
        {/* Gray smudges / artifacts */}
        <div style={{ position: 'absolute', top: 30, left: 20, width: 60, height: 8, background: 'rgba(0,0,0,0.04)', borderRadius: 2 }} />
        <div style={{ position: 'absolute', top: 70, right: 15, width: 40, height: 6, background: 'rgba(0,0,0,0.06)', borderRadius: 2 }} />

        {/* Blurry diagram */}
        <div style={{ float: 'right', width: 60, height: 70, background: '#e8e8e8', border: '1px solid #bbb', margin: '0 0 6px 8px', display: 'flex', alignItems: 'center', justifyContent: 'center', filter: 'blur(0.5px)' }}>
          <span style={{ fontSize: 8, color: '#999', textAlign: 'center', lineHeight: 1.3 }}>Fig. 7.1<br />Human Body<br />(blurry)</span>
        </div>

        {/* Text content */}
        {[
          'The human digestive system consists of the mouth, oesophagus, stomach, small intestine,',
          'large intestine, and anus. The process of digestion involves mechanical and',
          'chemical breakdown of food into smaller molecules that can be absorbed...',
          '',
          'Q1: Name the organs of the digestive system. (5 marks)',
          'Q2: What is the role of the liver? (3 marks)',
          '[Answer space — cross out and rewrite as photocopy cut off]',
        ].map((line, i) => (
          <div key={i} style={{
            fontSize: 7.5,
            color: i === 6 ? '#c0392b' : '#333',
            fontFamily: 'serif',
            lineHeight: 1.6,
            textDecoration: i === 6 ? 'line-through' : 'none',
            filter: i > 3 ? 'blur(0.3px)' : 'none',
            opacity: i > 3 ? 0.8 : 1,
          }}>
            {line || <br />}
          </div>
        ))}
      </div>

      {/* Problem tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 4, padding: '4px 8px' }}>
        <span style={{ fontSize: 9 }}>⚠️</span>
        <span style={{ fontSize: 8, color: '#856404' }}>No visuals, no interaction, no retention. Students memorize, not understand.</span>
      </div>
    </div>
  );
});

// ── After: Interactive content platform ────────────────────────────────────────
const ContentAfter = React.memo(function ContentAfter() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#080808', overflow: 'hidden' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #1a1a1a', background: '#0d0d0d' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 14, height: 14, background: 'var(--blue)', borderRadius: 2 }} />
          <span style={{ fontSize: 9, fontWeight: 700, color: '#fff' }}>Biology · Grade 9</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <div style={{ background: '#161616', border: '1px solid #2a2a2a', borderRadius: 3, padding: '2px 6px', fontSize: 7, color: '#666' }}>EN · اردو</div>
          <div style={{ background: 'rgba(26,107,255,0.2)', border: '1px solid rgba(26,107,255,0.4)', borderRadius: 3, padding: '2px 6px', fontSize: 7, color: 'var(--blue)' }}>▶ Play</div>
        </div>
      </div>

      {/* Main content area */}
      <div style={{ flex: 1, display: 'flex', gap: 0, overflow: 'hidden' }}>
        {/* Left: Chapter nav */}
        <div style={{ width: 55, borderRight: '1px solid #1a1a1a', padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {[
            { n: '01', title: 'Intro', done: true },
            { n: '02', title: 'Organs', done: true },
            { n: '03', title: 'Process', done: false, active: true },
            { n: '04', title: 'Quiz', done: false },
          ].map((ch, i) => (
            <div key={i} style={{
              padding: '5px 4px', borderRadius: 4, display: 'flex', alignItems: 'center', gap: 3,
              background: ch.active ? 'rgba(26,107,255,0.15)' : 'transparent',
              border: ch.active ? '1px solid rgba(26,107,255,0.3)' : '1px solid transparent',
            }}>
              <div style={{
                width: 12, height: 12, borderRadius: '50%', flexShrink: 0,
                background: ch.done ? '#4ade80' : ch.active ? 'var(--blue)' : '#2a2a2a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {ch.done && <span style={{ fontSize: 6, color: '#000' }}>✓</span>}
                {!ch.done && <span style={{ fontSize: 6, color: ch.active ? '#fff' : '#555' }}>{ch.n}</span>}
              </div>
              <span style={{ fontSize: 7, color: ch.active ? '#fff' : ch.done ? '#555' : '#444', lineHeight: 1.2 }}>{ch.title}</span>
            </div>
          ))}
        </div>

        {/* Right: Content */}
        <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Animated diagram placeholder */}
          <div style={{ background: '#111', border: '1px solid #1d1d1d', borderRadius: 6, padding: '10px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ fontSize: 8, color: '#555', marginBottom: 6 }}>Interactive Diagram</div>
            {/* Body outline */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <svg viewBox="0 0 80 80" width="80" height="80">
                {/* Stomach */}
                <ellipse cx="40" cy="38" rx="14" ry="12" fill="none" stroke="var(--blue)" strokeWidth="1" />
                <ellipse cx="40" cy="38" rx="14" ry="12" fill="rgba(26,107,255,0.1)" />
                {/* Intestines */}
                <path d="M 35 50 Q 25 55 28 62 Q 31 69 40 68 Q 49 69 52 62 Q 55 55 45 50" fill="none" stroke="var(--gold)" strokeWidth="1" />
                {/* Esophagus */}
                <line x1="40" y1="20" x2="40" y2="26" stroke="#4ade80" strokeWidth="1.5" />
                {/* Labels */}
                <text x="46" y="32" fontSize="5" fill="var(--blue)">Stomach</text>
                <text x="10" y="62" fontSize="5" fill="var(--gold)">Intestine</text>
                {/* Pulsing dot */}
                <circle cx="40" cy="38" r="3" fill="var(--blue)" opacity="0.8" />
              </svg>
            </div>
            <div style={{ fontSize: 7, color: '#666', textAlign: 'center', marginTop: 4 }}>
              Tap organ to explore · Available in 3D
            </div>
          </div>

          {/* Progress */}
          <div style={{ background: '#111', border: '1px solid #1d1d1d', borderRadius: 5, padding: '6px 8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 7, color: '#555' }}>Chapter Progress</span>
              <span style={{ fontSize: 7, color: 'var(--blue)' }}>67%</span>
            </div>
            <div style={{ height: 3, background: '#1d1d1d', borderRadius: 2 }}>
              <div style={{ width: '67%', height: '100%', background: 'linear-gradient(to right, var(--blue), var(--gold))', borderRadius: 2 }} />
            </div>
          </div>

          {/* Language toggle */}
          <div style={{ display: 'flex', gap: 4 }}>
            <div style={{ flex: 1, background: 'rgba(26,107,255,0.15)', border: '1px solid rgba(26,107,255,0.3)', borderRadius: 4, padding: '4px', textAlign: 'center', fontSize: 7, color: 'var(--blue)' }}>
              English
            </div>
            <div style={{ flex: 1, background: '#111', border: '1px solid #1d1d1d', borderRadius: 4, padding: '4px', textAlign: 'center', fontSize: 7, color: '#555' }}>
              اردو
            </div>
            <div style={{ flex: 1, background: '#111', border: '1px solid #1d1d1d', borderRadius: 4, padding: '4px', textAlign: 'center', fontSize: 7, color: '#555' }}>
              عربي
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const contentSlide: SlideConfig = {
  id: 'content',
  label: 'Content',
  tag: 'Educational Content',
  beforeTitle: 'Blurry photocopies, zero engagement',
  afterTitle: 'Interactive multilingual content',
  beforeContent: <ContentBefore />,
  afterContent: <ContentAfter />,
  proofStat: '2.8× higher',
  proofLabel: 'concept retention scores',
};
