'use client';

import { memo } from 'react';

const SCENES = [
  { num: '01', title: 'The Call of Ibrahim', active: true },
  { num: '02', title: 'Night of Al-Qadr',    active: false },
  { num: '03', title: 'The Two Gardens',     active: false },
];

// ── Laptop version ─────────────────────────────────────────────────────────────
export const SlideAnimation = memo(function SlideAnimation() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#030308' }}>
      {/* Top bar */}
      <div style={{ height: 28, flexShrink: 0, backgroundColor: '#060610', borderBottom: '1px solid #1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 700, color: 'var(--dark-text-primary)' }}>Cubico Animation Studio</span>
        {/* Playback controls */}
        <div style={{ display: 'flex', gap: 8 }}>
          {['⏮', '▶', '⏭'].map((icon, i) => (
            <span key={i} style={{ fontSize: 8, color: i === 1 ? 'var(--blue)' : '#3a3a3a', cursor: 'pointer' }}>{icon}</span>
          ))}
        </div>
      </div>

      {/* Main split */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Preview window */}
        <div style={{ flex: '0 0 65%', position: 'relative', backgroundColor: '#000', borderRight: '1px solid #1a1a2e', overflow: 'hidden' }}>
          {/* Sky background */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #030318 0%, #050a20 40%, #0a0508 100%)' }}>
            {/* Stars */}
            {[...Array(12)].map((_, i) => (
              <div key={i} style={{ position: 'absolute', width: i % 3 === 0 ? 2 : 1, height: i % 3 === 0 ? 2 : 1, borderRadius: '50%', backgroundColor: '#fff', opacity: 0.3 + (i * 0.05), top: `${8 + (i * 7)}%`, left: `${(i * 13 + 5) % 90}%` }} />
            ))}

            {/* Mosque silhouette (SVG) */}
            <svg style={{ position: 'absolute', bottom: '22%', left: '50%', transform: 'translateX(-50%)', opacity: 0.85 }} width="140" height="80" viewBox="0 0 140 80" fill="none">
              {/* Main dome */}
              <ellipse cx="70" cy="30" rx="20" ry="20" fill="#0a0814" />
              <rect x="50" y="30" width="40" height="40" fill="#0a0814" />
              {/* Side minarets */}
              <rect x="28" y="18" width="8" height="52" rx="1" fill="#0a0814" />
              <ellipse cx="32" cy="18" rx="5" ry="6" fill="#0a0814" />
              <rect x="104" y="18" width="8" height="52" rx="1" fill="#0a0814" />
              <ellipse cx="108" cy="18" rx="5" ry="6" fill="#0a0814" />
              {/* Door arch */}
              <path d="M62 70 Q70 58 78 70" fill="#060610" />
              {/* Ground */}
              <rect x="0" y="70" width="140" height="10" fill="#0a0814" />
            </svg>

            {/* Crescent moon */}
            <svg style={{ position: 'absolute', top: '12%', right: '20%' }} width="18" height="18" viewBox="0 0 18 18">
              <path d="M9 2 A7 7 0 0 1 9 16 A5 5 0 0 0 9 2Z" fill="var(--gold)" opacity="0.7" />
            </svg>

            {/* Caption overlay */}
            <div style={{ position: 'absolute', bottom: 8, left: 10, right: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, color: 'var(--gold)', letterSpacing: '0.15em' }}>PROPHET IBRAHIM SERIES · EP. 3</span>
              {/* Play button */}
              <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: 'rgba(26,107,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '5px 0 5px 8px', borderColor: 'transparent transparent transparent #fff', marginLeft: 2 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Asset panel */}
        <div style={{ flex: '0 0 35%', backgroundColor: '#0a0a0a', padding: '8px 0', overflow: 'hidden' }}>
          <div style={{ fontFamily: 'var(--font-stamp)', fontSize: 7, color: '#333', letterSpacing: '0.25em', padding: '0 8px 6px' }}>ASSETS</div>
          {SCENES.map((scene) => (
            <div key={scene.num} style={{ borderLeft: `2px solid ${scene.active ? 'var(--blue)' : 'transparent'}`, backgroundColor: scene.active ? '#141414' : 'transparent', marginBottom: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px' }}>
                <div style={{ width: 28, height: 18, backgroundColor: scene.active ? '#0a0f1e' : '#0f0f0f', borderRadius: 2, border: `1px solid ${scene.active ? 'rgba(26,107,255,0.2)' : '#1a1a1a'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 7, color: scene.active ? 'var(--blue)' : '#333' }}>{scene.num}</span>
                </div>
                <span style={{ fontFamily: 'var(--font-ui)', fontSize: 7, color: scene.active ? '#aaa' : '#444', lineHeight: 1.3 }}>{scene.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline bar */}
      <div style={{ height: 24, flexShrink: 0, backgroundColor: '#060606', borderTop: '1px solid #1a1a2e', display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px' }}>
        <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 7, color: '#3a3a3a' }}>00:00</span>
        <div style={{ flex: 1, height: 3, backgroundColor: '#1a1a1a', borderRadius: 2, position: 'relative' }}>
          <div style={{ width: '45%', height: '100%', backgroundColor: 'var(--blue)', borderRadius: 2 }} />
          <div style={{ position: 'absolute', left: '45%', top: '50%', transform: 'translate(-50%, -50%)', width: 7, height: 7, borderRadius: '50%', backgroundColor: 'var(--blue)', border: '1px solid var(--bg-dark)' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-stamp)', fontSize: 7, color: '#3a3a3a' }}>02:34</span>
      </div>
    </div>
  );
});

// ── Mobile version ─────────────────────────────────────────────────────────────
export const SlideAnimationMobile = memo(function SlideAnimationMobile() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#030308' }}>
      {/* Full preview */}
      <div style={{ flex: 1, position: 'relative', background: 'linear-gradient(180deg, #030318 0%, #050a20 40%, #0a0508 100%)', overflow: 'hidden' }}>
        {[...Array(8)].map((_, i) => (
          <div key={i} style={{ position: 'absolute', width: 1, height: 1, borderRadius: '50%', backgroundColor: '#fff', opacity: 0.4, top: `${5 + (i * 11)}%`, left: `${(i * 17 + 8) % 88}%` }} />
        ))}
        <svg style={{ position: 'absolute', bottom: '30%', left: '50%', transform: 'translateX(-50%)' }} width="100" height="60" viewBox="0 0 140 80" fill="none">
          <ellipse cx="70" cy="30" rx="20" ry="20" fill="#0a0814" />
          <rect x="50" y="30" width="40" height="40" fill="#0a0814" />
          <rect x="30" y="20" width="7" height="50" rx="1" fill="#0a0814" />
          <rect x="103" y="20" width="7" height="50" rx="1" fill="#0a0814" />
          <rect x="0" y="70" width="140" height="10" fill="#0a0814" />
        </svg>
      </div>

      {/* Episode info + controls */}
      <div style={{ backgroundColor: '#0a0a0a', borderTop: '1px solid #1a1a2e', padding: '8px 10px' }}>
        <div style={{ fontFamily: 'var(--font-stamp)', fontSize: 8, color: 'var(--gold)', letterSpacing: '0.12em', marginBottom: 4 }}>EP. 3 · PROPHET IBRAHIM SERIES</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 10, color: '#3a3a3a' }}>⏮</span>
          <div style={{ width: 22, height: 22, borderRadius: '50%', backgroundColor: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '5px 0 5px 8px', borderColor: 'transparent transparent transparent #fff', marginLeft: 2 }} />
          </div>
          <span style={{ fontSize: 10, color: '#3a3a3a' }}>⏭</span>
          <div style={{ flex: 1, height: 2, backgroundColor: '#1a1a1a', borderRadius: 1, marginLeft: 4 }}>
            <div style={{ width: '45%', height: '100%', backgroundColor: 'var(--blue)', borderRadius: 1 }} />
          </div>
        </div>
      </div>
    </div>
  );
});
