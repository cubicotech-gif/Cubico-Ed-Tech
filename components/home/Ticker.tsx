'use client';

// ── Section 03 — Ticker Strip ─────────────────────────────────────────────────
// Two rows scrolling in opposite directions.
// Row 1 (top):    fire-orange disciplines, scrolls left  22s
// Row 2 (bottom): bronze context,          scrolls right 30s
// Pure CSS animation — no JS scroll dependency.
// Pauses on hover. Respects prefers-reduced-motion.

const DISCIPLINES = [
  'LMS DEVELOPMENT',
  'EDUCATIONAL ANIMATION',
  'SCHOOL MANAGEMENT PORTALS',
  'MULTILINGUAL CONTENT',
  'MOODLE CUSTOMISATION',
  'INTERACTIVE COURSEWARE',
  'ARABIC · URDU · ENGLISH',
  '2D / 3D ANIMATION',
];

const CONTEXT = [
  'KARACHI, PAKISTAN',
  'EST. 2019',
  'ISO-CERTIFIED WORKFLOW',
  '30-DAY DELIVERY',
  'FIXED PRICE · NO SURPRISES',
  'EdTech SPECIALISTS',
  '50+ INSTITUTIONS SERVED',
  'FULL-CYCLE PRODUCTION',
];

const SEP = ' ◆ ';

function buildTrack(items: string[]) {
  return items.join(SEP) + SEP;
}

export default function Ticker() {
  const topTrack    = buildTrack(DISCIPLINES);
  const bottomTrack = buildTrack(CONTEXT);

  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        backgroundColor: '#090909',
        borderTop: '1px solid #161616',
        borderBottom: '1px solid #161616',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      {/* ── Row 1: fire orange, scrolls left ── */}
      <div
        style={{
          height: 34,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid #141414',
          overflow: 'hidden',
        }}
      >
        <div className="ticker-row ticker-left" style={{ color: '#E8622A' }}>
          <span className="ticker-content" style={{ fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '0.25em' }}>
            {topTrack}
          </span>
          {/* duplicate for seamless loop */}
          <span className="ticker-content" aria-hidden="true" style={{ fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '0.25em' }}>
            {topTrack}
          </span>
        </div>
      </div>

      {/* ── Row 2: bronze, scrolls right ── */}
      <div
        style={{
          height: 34,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div className="ticker-row ticker-right" style={{ color: '#C9A96E' }}>
          <span className="ticker-content" style={{ fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '0.25em' }}>
            {bottomTrack}
          </span>
          <span className="ticker-content" aria-hidden="true" style={{ fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '0.25em' }}>
            {bottomTrack}
          </span>
        </div>
      </div>
    </div>
  );
}
