/**
 * Cubico Design Tokens
 * Single source of truth for colors, easing, and durations.
 * Import this everywhere instead of hardcoding values.
 */
export const tokens = {
  colors: {
    void:      'var(--bg-base)',      // white base background
    ink:       'var(--bg-subtle)',    // off-white section backgrounds
    panel:     'var(--bg-base)',      // card panels
    card:      'var(--bg-muted)',     // elevated cards
    line:      'var(--line)',         // primary borders
    line2:     'var(--line2)',        // secondary borders
    fire:      'var(--blue)',         // primary accent (electric blue)
    fireLo:    'var(--blue-lo)',
    fireMid:   'var(--blue-mid)',
    fireGlow:  'rgba(26,107,255,0.38)',
    bronze:    'var(--gold)',         // secondary accent
    bronzeLo:  'var(--gold-lo)',
    ivory:     'var(--text-primary)', // primary text
    soft:      'var(--text-body)',    // secondary text
    muted:     'var(--text-muted)',   // tertiary text
    dim:       'var(--text-dim)',     // ghost elements
    green:     'var(--green)',        // online/active signal
  },
  ease: {
    out:      [0.16, 1, 0.3, 1] as const,
    standard: [0.4, 0, 0.2, 1] as const,
    spring:   { type: 'spring', stiffness: 300, damping: 30 } as const,
  },
  duration: {
    instant:   0.15,
    fast:      0.25,
    standard:  0.45,
    slow:      0.65,
    cinematic: 1.0,
  },
} as const;
