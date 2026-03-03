'use client';

// ── GrainOverlay ───────────────────────────────────────────────────────────────
// Fixed SVG fractalNoise grain + a radial vignette, both pointer-events:none.
// Added to layout.tsx so it appears on every page.

export function GrainOverlay() {
  return (
    <>
      {/* Vignette — z:99 */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 35%, rgba(5,5,5,0.68) 100%)',
          pointerEvents: 'none',
          zIndex: 99,
        }}
      />

      {/* Grain — z:100 */}
      <svg
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.022,
          pointerEvents: 'none',
          zIndex: 100,
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="global-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#global-grain)" />
      </svg>
    </>
  );
}
