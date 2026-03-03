/**
 * Cubico Design Tokens
 * Single source of truth for colors, easing, and durations.
 * Import this everywhere instead of hardcoding values.
 */
export const tokens = {
  colors: {
    void:      '#050505',   // deepest background
    ink:       '#090909',   // section backgrounds
    panel:     '#111111',   // card panels
    card:      '#161616',   // elevated cards
    line:      '#1d1d1d',   // primary borders
    line2:     '#272727',   // secondary borders
    fire:      '#E8622A',   // primary accent
    fireLo:    'rgba(232,98,42,0.10)',
    fireMid:   'rgba(232,98,42,0.22)',
    fireGlow:  'rgba(232,98,42,0.38)',
    bronze:    '#C9A96E',   // secondary accent
    bronzeLo:  'rgba(201,169,110,0.10)',
    ivory:     '#F0EBE3',   // primary text
    soft:      '#C5BFB7',   // secondary text
    muted:     '#6A6460',   // tertiary text
    dim:       '#2A2A2A',   // ghost elements
    green:     '#10B981',   // online/active signal
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
