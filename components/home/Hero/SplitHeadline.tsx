'use client';

// ── SplitHeadline ──────────────────────────────────────────────────────────────
// Three headline lines structured for GSAP SplitText.
// Each line has overflow: hidden so characters entering from y:80 are clipped.
// GSAP targets .act4-headline-line elements one-at-a-time with per-char stagger.

const LINES = [
  {
    text: 'We Build',
    weight: 900,
    style: 'normal' as const,
    color: '#F0EBE3',
  },
  {
    text: 'Education',
    weight: 900,
    style: 'italic' as const,
    color: '#E8622A',
  },
  {
    text: 'Technology.',
    weight: 300,
    style: 'italic' as const,
    color: 'rgba(197,191,183,0.65)',
  },
];

export function SplitHeadline() {
  return (
    <div
      style={{
        letterSpacing: '-0.045em',
        lineHeight: 0.87,
      }}
    >
      {LINES.map((line, i) => (
        /* overflow:hidden clips characters that start at y:80 below the fold */
        <div
          key={i}
          style={{
            overflow: 'hidden',
            display: 'block',
            lineHeight: 0.92,
          }}
        >
          <div
            className="act4-headline-line"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: line.weight,
              fontStyle: line.style,
              fontSize: 'clamp(62px, 9.5vw, 138px)',
              color: line.color,
              display: 'block',
              lineHeight: 0.92,
              willChange: 'transform, opacity',
            }}
          >
            {line.text}
          </div>
        </div>
      ))}
    </div>
  );
}
