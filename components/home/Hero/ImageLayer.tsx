'use client';

// ── ImageLayer ─────────────────────────────────────────────────────────────────
// ACT 3 background. clipPath animates from inset(48% 0 48% 0) → inset(0% 0 0% 0).
// Inner div starts at scale(1.15) and eases to scale(1.0) — Ken Burns reverse.
// Replace the CSS gradient with a real next/image for production.

export function ImageLayer() {
  return (
    <div
      className="act3-image"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Ken Burns layer — slightly oversized so scale-down never shows edges */}
      <div
        className="act3-image-inner"
        style={{
          position: 'absolute',
          inset: '-8%',
        }}
      >
        {/* ── Cinematic atmosphere gradient ── */}
        {/* Swap this div for a <Image fill priority sizes="100vw" /> in production */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse 70% 55% at 38% 58%, rgba(18,12,8,0.96) 0%, transparent 65%),
              radial-gradient(ellipse 55% 70% at 68% 42%, rgba(8,8,16,0.92) 0%, transparent 65%),
              linear-gradient(
                152deg,
                #0d0908 0%,
                #0c0a07 12%,
                #080912 28%,
                #0b0605 44%,
                #060b0d 60%,
                #090709 76%,
                #050505 100%
              )
            `,
          }}
        />

        {/* Faint architectural grid — evokes a classroom / blueprint */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.028,
          }}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="hero-grid"
              width="72"
              height="72"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 72 0 L 0 0 0 72"
                fill="none"
                stroke="#E8622A"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {/* Ambient fire pool — top-left */}
        <div
          style={{
            position: 'absolute',
            top: '18%',
            left: '28%',
            width: 480,
            height: 480,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(232,98,42,0.055) 0%, transparent 68%)',
            pointerEvents: 'none',
          }}
        />

        {/* Ambient bronze pool — bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: '18%',
            right: '22%',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(201,169,110,0.04) 0%, transparent 68%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}
