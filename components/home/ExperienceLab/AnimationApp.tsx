'use client';

import { useState, useEffect, useRef } from 'react';

const EPISODES = [
  { title: '01. Cell Structure & Function', duration: '3:12', subject: 'Biology' },
  { title: '02. Cell Division (Mitosis)', duration: '4:45', subject: 'Biology' },
  { title: '03. The Solar System', duration: '5:20', subject: 'Science' },
  { title: '04. DNA & Genetics', duration: '4:08', subject: 'Biology' },
  { title: '05. Water Cycle', duration: '3:44', subject: 'Geography' },
];

// Deterministic stars — stable across renders
const STARS = Array.from({ length: 40 }, (_, i) => ({
  left: ((i * 37 + 11) % 100),
  top: ((i * 53 + 7) % 90),
  size: (i % 3) + 1,
  twinkleClass: `twinkle-${i % 3}`,
}));

// Format seconds to mm:ss
function formatTime(pct: number, totalSecs: number) {
  const s = Math.floor((pct / 100) * totalSecs);
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

export function AnimationApp() {
  const [episode, setEpisode] = useState(2); // 0-indexed, default ep 03
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Progress ticker
  useEffect(() => {
    if (playing) {
      progressRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setPlaying(false);
            return 100;
          }
          return p + 0.3;
        });
      }, 100);
    } else {
      if (progressRef.current) clearInterval(progressRef.current);
    }
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [playing, episode]);

  // Reset progress on episode change
  const handleEpisode = (idx: number) => {
    setEpisode(idx);
    setPlaying(false);
    setProgress(0);
  };

  const handleReset = () => {
    setPlaying(false);
    setProgress(0);
  };

  const totalSecs = 320; // 5:20 for ep 03

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#060606', fontFamily: 'monospace', fontSize: 11 }}>
      {/* CSS Keyframes */}
      <style>{`
        @keyframes orbitSpin { to { transform: rotate(360deg); } }
        @keyframes sunPulse { 0%,100% { transform: translate(-50%,-50%) scale(1); } 50% { transform: translate(-50%,-50%) scale(1.08); } }
        @keyframes twinkle-0 { from { opacity: 0.1; } to { opacity: 0.8; } }
        @keyframes twinkle-1 { from { opacity: 0.3; } to { opacity: 0.9; } }
        @keyframes twinkle-2 { from { opacity: 0.2; } to { opacity: 0.6; } }
      `}</style>

      {/* Top bar */}
      <div style={{ background: '#060606', borderBottom: '1px solid #1d1d1d', padding: '0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 36, flexShrink: 0 }}>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 12, color: '#8B5CF6' }}>Animation Studio</span>
        <span style={{ fontSize: 8, color: '#2A2A2A' }}>Content Library · 5 Episodes</span>
      </div>

      {/* Main: preview + episode list */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '60% 40%', overflow: 'hidden' }}>

        {/* Left: preview */}
        <div style={{ background: '#03030f', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          {/* Starfield */}
          <div style={{ position: 'absolute', inset: 0 }}>
            {STARS.map((s, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${s.left}%`,
                  top: `${s.top}%`,
                  width: s.size,
                  height: s.size,
                  borderRadius: '50%',
                  background: '#fff',
                  opacity: 0.5,
                  animation: `${s.twinkleClass} ${1.5 + (i % 3) * 0.7}s ease-in-out infinite alternate`,
                  animationDelay: `${(i * 0.13) % 2}s`,
                }}
              />
            ))}
          </div>

          {/* Solar system */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <div style={{ position: 'relative', width: 140, height: 140 }}>
              {/* Sun */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%,-50%)',
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #fff9c4, #ffb300)',
                  boxShadow: '0 0 12px rgba(255,200,0,0.7)',
                  animation: playing ? 'sunPulse 2s ease-in-out infinite' : 'none',
                }}
              />
              {/* Orbits */}
              {[
                { size: 60, dur: playing ? '6s' : '0s', planetSize: 5, planetColor: '#aab4be', planet: { top: '50%', left: '100%' } },
                { size: 95, dur: playing ? '10s' : '0s', planetSize: 7, planetColor: '#C9A96E', planet: { top: 0, left: '50%' } },
                { size: 130, dur: playing ? '16s' : '0s', planetSize: 4, planetColor: '#4fc3f7', planet: { top: '50%', left: 0 } },
              ].map((orbit, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: orbit.size,
                    height: orbit.size,
                    marginTop: -orbit.size / 2,
                    marginLeft: -orbit.size / 2,
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '50%',
                    animation: playing ? `orbitSpin ${orbit.dur} linear infinite` : 'none',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      ...orbit.planet,
                      width: orbit.planetSize,
                      height: orbit.planetSize,
                      marginTop: -orbit.planetSize / 2,
                      marginLeft: -orbit.planetSize / 2,
                      borderRadius: '50%',
                      background: orbit.planetColor,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div style={{ background: 'rgba(0,0,0,0.85)', padding: '6px 10px', flexShrink: 0 }}>
            {/* Timeline */}
            <div
              style={{ height: 3, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginBottom: 6, cursor: 'pointer', position: 'relative' }}
              onClick={(e) => {
                const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                const pct = ((e.clientX - rect.left) / rect.width) * 100;
                setProgress(Math.max(0, Math.min(100, pct)));
              }}
            >
              <div style={{ width: `${progress}%`, height: '100%', background: '#8B5CF6', borderRadius: 2, transition: 'width 0.1s linear' }} />
              <div
                style={{
                  position: 'absolute',
                  left: `${progress}%`,
                  top: '50%',
                  transform: 'translate(-50%,-50%)',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#8B5CF6',
                  boxShadow: '0 0 4px rgba(139,92,246,0.6)',
                }}
              />
            </div>
            {/* Buttons + time */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button
                onClick={() => setPlaying((p) => !p)}
                style={{
                  width: 22, height: 22, borderRadius: '50%', background: '#8B5CF6',
                  border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}
              >
                {playing ? (
                  <svg width="7" height="8" viewBox="0 0 7 8">
                    <rect x="0" y="0" width="2.5" height="8" fill="#fff" />
                    <rect x="4.5" y="0" width="2.5" height="8" fill="#fff" />
                  </svg>
                ) : (
                  <svg width="7" height="8" viewBox="0 0 7 8"><polygon points="0,0 7,4 0,8" fill="#fff" /></svg>
                )}
              </button>
              <button
                onClick={handleReset}
                style={{ background: 'none', border: '1px solid #2A2A2A', color: '#6A6460', borderRadius: 3, cursor: 'pointer', fontSize: 8, padding: '2px 6px', fontFamily: 'monospace' }}
              >
                Reset
              </button>
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginLeft: 'auto' }}>
                {formatTime(progress, totalSecs)} / {EPISODES[episode].duration}
              </span>
            </div>
          </div>
        </div>

        {/* Right: episode list */}
        <div style={{ background: '#0a0a0a', borderLeft: '1px solid #1d1d1d', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ padding: '8px 10px', borderBottom: '1px solid #1d1d1d', flexShrink: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: '#F0EBE3', fontFamily: 'var(--font-display)' }}>
              {EPISODES[episode].subject} Series
            </div>
            <div style={{ fontSize: 8, color: '#2A2A2A', marginTop: 2 }}>Grade 9 · 4K · SCORM</div>
          </div>
          <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 1, background: '#1d1d1d' }}>
            {EPISODES.map((ep, i) => (
              <div
                key={i}
                onClick={() => handleEpisode(i)}
                style={{
                  background: i === episode ? 'rgba(139,92,246,0.08)' : '#0a0a0a',
                  borderLeft: i === episode ? '2px solid #8B5CF6' : '2px solid transparent',
                  padding: '7px 10px',
                  cursor: 'pointer',
                  transition: 'background 150ms',
                }}
                onMouseOver={(e) => { if (i !== episode) (e.currentTarget as HTMLDivElement).style.background = '#111'; }}
                onMouseOut={(e) => { if (i !== episode) (e.currentTarget as HTMLDivElement).style.background = '#0a0a0a'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                  <div>
                    <div style={{ fontSize: 9, color: i === episode ? '#F0EBE3' : '#6A6460', marginBottom: 1, lineHeight: 1.3 }}>{ep.title}</div>
                    <div style={{ fontSize: 7, color: '#2A2A2A' }}>{ep.subject}</div>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    {i === episode ? (
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {playing ? (
                          <svg width="5" height="6" viewBox="0 0 5 6">
                            <rect x="0" y="0" width="1.8" height="6" fill="#fff" />
                            <rect x="3.2" y="0" width="1.8" height="6" fill="#fff" />
                          </svg>
                        ) : (
                          <svg width="5" height="6" viewBox="0 0 5 6"><polygon points="0,0 5,3 0,6" fill="#fff" /></svg>
                        )}
                      </div>
                    ) : (
                      <span style={{ fontSize: 7, color: '#2A2A2A' }}>{ep.duration}</span>
                    )}
                  </div>
                </div>
                {i === episode && (
                  <div style={{ marginTop: 4, height: 1.5, background: '#1d1d1d', borderRadius: 1 }}>
                    <div style={{ width: `${progress}%`, height: '100%', background: '#8B5CF6', borderRadius: 1, transition: 'width 0.1s linear' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
