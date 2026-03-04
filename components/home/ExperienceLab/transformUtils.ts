// Controls the cascade delay (ms) for each demo panel's name update
// LMS first (0ms) → ERP → Website → Animations last (150ms)
// Creates a wave of transformation, not a jarring simultaneous update

export const PANEL_DELAYS = {
  lms: 0,
  erp: 50,
  website: 100,
  animation: 150,
} as const;

// Progress bar width from character count
// Formula: Math.min((length / 7) * 100, 100)
export function getProgressWidth(length: number): number {
  return Math.min((length / 7) * 100, 100);
}

// Chip activation threshold per panel
// Each chip activates as the character count reaches its threshold
export const CHIP_THRESHOLDS = {
  lms: 1,
  erp: 2,
  website: 3,
  animation: 4,
} as const;
