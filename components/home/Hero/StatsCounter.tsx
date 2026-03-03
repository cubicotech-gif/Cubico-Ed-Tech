'use client';

// ── StatsCounter ───────────────────────────────────────────────────────────────
// Fixed bottom bar that slides up in Act 5.
// GSAP animates each .stat-count's textContent from 0 → data-target via
// a proxy object + onUpdate (scrub-safe, no innerText mutation conflicts).

const STATS = [
  { n: 50,  suffix: '+', label: 'Projects' },
  { n: 3,   suffix: '',  label: 'Languages' },
  { n: 10,  suffix: '+', label: 'Institutions' },
  { n: 30,  suffix: '',  label: 'Day Delivery' },
  { n: 100, suffix: '%', label: 'Custom-Built' },
];

export function StatsCounter() {
  return (
    <div
      style={{
        display: 'flex',
        borderTop: '1px solid #1d1d1d',
        backgroundColor: 'rgba(5,5,5,0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {STATS.map((s, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            padding: '18px 0 18px 20px',
            borderRight: i < STATS.length - 1 ? '1px solid #1a1a1a' : 'none',
          }}
        >
          {/* Number — GSAP writes directly to textContent via proxy */}
          <div
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 'clamp(22px, 2.8vw, 38px)',
              lineHeight: 1,
              color: '#F0EBE3',
            }}
          >
            <span
              className="stat-count"
              data-target={s.n}
            >
              0
            </span>
            <span style={{ color: '#E8622A' }}>{s.suffix}</span>
          </div>

          {/* Label */}
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 10,
              color: '#3a3a3a',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginTop: 5,
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
