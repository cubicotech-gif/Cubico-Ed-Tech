import React from 'react';
import type { SlideConfig } from './types';

// ── Before: Static whiteboard / PowerPoint slide ───────────────────────────────
const AnimationsBefore = React.memo(function AnimationsBefore() {
  return (
    <div style={{ padding: '20px 18px', height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Slide header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid #e0e0e0', paddingBottom: 8 }}>
        <div style={{ width: 18, height: 18, background: '#c0392b', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ color: '#fff', fontSize: 9, fontWeight: 700 }}>P</span>
        </div>
        <span style={{ fontSize: 10, color: '#444', fontWeight: 600 }}>Chapter_3_Photosynthesis.pptx</span>
        <span style={{ marginLeft: 'auto', fontSize: 9, color: '#999' }}>Slide 4 of 47</span>
      </div>

      {/* Slide canvas */}
      <div style={{
        flex: 1,
        background: '#fffde7',
        border: '2px solid #f9a825',
        borderRadius: 4,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px',
      }}>
        {/* Clip art sun */}
        <div style={{ fontSize: 28, marginBottom: 4 }}>☀️</div>

        {/* Title in Comic Sans-ish style */}
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1565c0', textAlign: 'center', fontFamily: 'serif', marginBottom: 6 }}>
          HOW DO PLANTS MAKE FOOD?
        </div>

        {/* Bullet points */}
        <div style={{ textAlign: 'left', width: '100%' }}>
          {[
            'Sun gives energy (yellow)',
            'Leaves absorb CO2 (see above)',
            'Roots take water (H2O)',
            'Chlorophyll makes glucose!!!',
          ].map((text, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 4, marginBottom: 3 }}>
              <span style={{ color: '#e53935', fontSize: 8, marginTop: 1 }}>▶</span>
              <span style={{ fontSize: 9, color: '#333', fontFamily: 'serif' }}>{text}</span>
            </div>
          ))}
        </div>

        {/* Word Art style */}
        <div style={{
          position: 'absolute', bottom: 8, right: 8,
          fontSize: 8, color: '#999', fontStyle: 'italic',
        }}>
          Clip art from Office 2003
        </div>

        {/* Hand drawn arrow */}
        <div style={{
          position: 'absolute', top: 16, right: 16,
          width: 40, height: 20, border: '1.5px dashed #e53935',
          borderRadius: 2,
        }} />
      </div>

      {/* Student reaction */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#ffebee', borderRadius: 4, padding: '5px 8px' }}>
        <span style={{ fontSize: 12 }}>😴</span>
        <span style={{ fontSize: 9, color: '#c62828' }}>Average attention span: 4 minutes. 87% students disengaged.</span>
      </div>
    </div>
  );
});

// ── After: Animation Studio preview ───────────────────────────────────────────
const AnimationsAfter = React.memo(function AnimationsAfter() {
  return (
    <div style={{ padding: '0', height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-dark)' }}>
      {/* Preview window */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg, #0d1b2a 0%, #1a0a2e 100%)' }}>
        {/* Sky gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #001122 0%, #0a1628 50%, #1a0a2e 100%)' }} />

        {/* Stars */}
        {[{ x: 15, y: 12 }, { x: 35, y: 8 }, { x: 62, y: 18 }, { x: 78, y: 10 }, { x: 88, y: 22 }, { x: 50, y: 5 }].map((s, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${s.x}%`, top: `${s.y}%`,
            width: 2, height: 2, borderRadius: '50%',
            background: '#fff', opacity: 0.8,
          }} />
        ))}

        {/* Crescent moon */}
        <div style={{
          position: 'absolute', top: '8%', right: '10%',
          width: 28, height: 28,
        }}>
          <svg width="28" height="28" viewBox="0 0 28 28">
            <circle cx="14" cy="14" r="12" fill="var(--gold)" />
            <circle cx="19" cy="10" r="10" fill="#0d1b2a" />
          </svg>
        </div>

        {/* Mosque silhouette */}
        <div style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '90%' }}>
          <svg viewBox="0 0 240 80" width="100%" style={{ display: 'block' }}>
            {/* Main dome */}
            <ellipse cx="120" cy="45" rx="28" ry="22" fill="var(--gold)" opacity="0.9" />
            <rect x="92" y="45" width="56" height="35" fill="var(--gold)" opacity="0.9" />
            {/* Minaret left */}
            <rect x="55" y="30" width="10" height="50" fill="#8b7355" />
            <ellipse cx="60" cy="30" rx="6" ry="8" fill="#A0845C" />
            <line x1="60" y1="20" x2="60" y2="14" stroke="var(--gold)" strokeWidth="1.5" />
            {/* Minaret right */}
            <rect x="175" y="30" width="10" height="50" fill="#8b7355" />
            <ellipse cx="180" cy="30" rx="6" ry="8" fill="#A0845C" />
            <line x1="180" y1="20" x2="180" y2="14" stroke="var(--gold)" strokeWidth="1.5" />
            {/* Side wings */}
            <rect x="30" y="48" width="62" height="32" fill="#7a6340" />
            <rect x="148" y="48" width="62" height="32" fill="#7a6340" />
            {/* Windows */}
            <ellipse cx="120" cy="52" rx="6" ry="8" fill="#1a0a2e" />
            <ellipse cx="60" cy="62" rx="4" ry="5" fill="#1a0a2e" />
            <ellipse cx="180" cy="62" rx="4" ry="5" fill="#1a0a2e" />
          </svg>
        </div>

        {/* Glow under mosque */}
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '60%', height: '30%',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(201,169,110,0.25) 0%, transparent 70%)',
        }} />

        {/* Play button overlay */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 32, height: 32, borderRadius: '50%',
          background: 'rgba(26,107,255,0.85)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 20px rgba(26,107,255,0.5)',
        }}>
          <svg width="12" height="12" viewBox="0 0 12 12">
            <polygon points="3,1 11,6 3,11" fill="#fff" />
          </svg>
        </div>

        {/* Scene label */}
        <div style={{
          position: 'absolute', top: 8, left: 8,
          background: 'rgba(0,0,0,0.6)', borderRadius: 3, padding: '2px 6px',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--blue)', boxShadow: '0 0 5px var(--blue)' }} />
          <span style={{ fontSize: 8, color: '#fff', fontFamily: 'var(--font-ui)' }}>Islamic History • Scene 03</span>
        </div>
      </div>

      {/* Timeline strip */}
      <div style={{ background: 'var(--dark-card)', borderTop: '1px solid var(--dark-line2)', padding: '8px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
          <span style={{ fontSize: 8, color: '#666' }}>00:24</span>
          <div style={{ flex: 1, height: 3, background: 'var(--dark-line)', borderRadius: 2, position: 'relative' }}>
            <div style={{ width: '40%', height: '100%', background: 'var(--blue)', borderRadius: 2 }} />
            <div style={{
              position: 'absolute', top: '50%', left: '40%',
              transform: 'translate(-50%,-50%)',
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--blue)', border: '1.5px solid #fff',
            }} />
          </div>
          <span style={{ fontSize: 8, color: '#666' }}>01:02</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['Intro', 'Scene 1', 'Scene 2', '★ Scene 3', 'Scene 4', 'Outro'].map((t, i) => (
            <div key={i} style={{
              flex: 1, height: 18, borderRadius: 2,
              background: i === 3 ? 'rgba(26,107,255,0.3)' : '#1a1a1a',
              border: `1px solid ${i === 3 ? 'var(--blue)' : '#2a2a2a'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: 7, color: i === 3 ? 'var(--blue)' : '#555' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export const animationsSlide: SlideConfig = {
  id: 'animations',
  label: 'Animations',
  tag: 'Educational Media',
  beforeTitle: 'Static slides students ignore',
  afterTitle: 'Cinematic 2D/3D that captivates',
  beforeContent: <AnimationsBefore />,
  afterContent: <AnimationsAfter />,
  proofStat: '4× longer',
  proofLabel: 'student attention span',
};
