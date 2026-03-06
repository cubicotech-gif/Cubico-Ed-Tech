"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";

/* ─── Constants ──────────────────────────────────────────────────────────── */
const WA_LINK =
  "https://wa.me/923001234567?text=Hi%20Cubico!%20I'm%20interested%20in%20learning%20about%20your%20EdTech%20solutions%20for%20our%20institution.";

const SPRING_CFG = { stiffness: 80, damping: 20, mass: 0.8 };

/* ─── Fracture geometry ─────────────────────────────────────────────────── */
// Jagged diagonal: ~62% at top → ~47% at bottom
const FRACTURE_PTS: [number, number][] = [
  [62, 0],   [63, 5],  [59, 12], [62, 18], [58, 24],
  [61, 30],  [58, 36], [61, 42], [58, 48], [61, 54],
  [58, 60],  [62, 67], [58, 73], [61, 80], [57, 87],
  [60, 93],  [47, 100],
];

const fStr     = FRACTURE_PTS.map(([x, y]) => `${x}% ${y}%`).join(", ");
const RIGHT_CLIP = `polygon(${fStr}, 100% 100%, 100% 0%)`;
const SVG_PTS    = FRACTURE_PTS.map(([x, y]) => `${x},${y}`).join(" ");

function getFractureX(y: number): number {
  for (let i = 0; i < FRACTURE_PTS.length - 1; i++) {
    const [x1, y1] = FRACTURE_PTS[i];
    const [x2, y2] = FRACTURE_PTS[i + 1];
    if (y >= y1 && y <= y2) return x1 + ((y - y1) / (y2 - y1)) * (x2 - x1);
  }
  return 58;
}

/* ─── Shard fragments (12 mini stat cards along fracture) ─────────────────── */
interface Shard {
  id: number; y: number; xOff: number; label: string;
  value: string; color: string; rot: number; scale: number; dur: number;
}
const SHARDS: Shard[] = [
  { id: 1,  y: 8,  xOff: -7, label: "Students",   value: "1,247", color: "#4F46E5", rot: -8,  scale: 0.65, dur: 4.2 },
  { id: 2,  y: 16, xOff:  6, label: "Engagement",  value: "3×",    color: "#7C3AED", rot: -11, scale: 0.72, dur: 5.8 },
  { id: 3,  y: 25, xOff: -6, label: "Attendance",  value: "94.2%", color: "#06D6A0", rot:  5,  scale: 0.80, dur: 6.0 },
  { id: 4,  y: 33, xOff:  7, label: "Schools",     value: "5+",    color: "#06D6A0", rot:  4,  scale: 0.85, dur: 4.5 },
  { id: 5,  y: 42, xOff: -7, label: "Efficiency",  value: "80%",   color: "#7C3AED", rot: -6,  scale: 0.70, dur: 5.5 },
  { id: 6,  y: 50, xOff:  6, label: "Weeks",       value: "4wk",   color: "#818CF8", rot: -7,  scale: 0.75, dur: 6.2 },
  { id: 7,  y: 58, xOff: -7, label: "Countries",   value: "3",     color: "#818CF8", rot:  9,  scale: 0.90, dur: 4.8 },
  { id: 8,  y: 66, xOff:  7, label: "Grades",      value: "A+",    color: "#4F46E5", rot:  5,  scale: 0.60, dur: 5.0 },
  { id: 9,  y: 74, xOff: -6, label: "Uptime",      value: "99.9%", color: "#06D6A0", rot: -4,  scale: 0.75, dur: 5.2 },
  { id: 10, y: 81, xOff:  6, label: "Reports",     value: "Auto",  color: "#7C3AED", rot: -9,  scale: 0.80, dur: 4.3 },
  { id: 11, y: 88, xOff: -6, label: "Parents",     value: "89%",   color: "#4F46E5", rot:  7,  scale: 0.65, dur: 6.5 },
  { id: 12, y: 94, xOff:  5, label: "Live",        value: "●",     color: "#00ff88", rot:  3,  scale: 0.65, dur: 5.7 },
];

/* ─── Data-stream lines shooting left from crack ─────────────────────────── */
const DATA_STREAMS = [10, 20, 30, 40, 50, 60, 72, 84].map((y, i) => {
  const fx = getFractureX(y);
  const w  = 28 + (i % 3) * 12;
  return { y, fx, w };
});

/* ─── Particle dots along crack ─────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => {
  const y = (i / 17) * 98;
  return {
    id: i,
    y,
    x: getFractureX(y) + Math.sin(i * 2.3) * 1.5,
    size: 5 + Math.abs(Math.sin(i * 1.1)) * 9,
    dur: 2.5 + Math.abs(Math.sin(i * 0.8)) * 2.5,
    delay: i * 0.14,
  };
});

/* ─── Floating badge data ─────────────────────────────────────────────────── */
const BADGES = [
  { label: "Active in 3 Countries", icon: "🌍", top: "16%", left: "3.5%", delay: 1.0, floatDur: 7.0 },
  { label: "99.9% Uptime",          icon: "⚡", top: "50%", left: "2.5%", delay: 1.6, floatDur: 8.5 },
  { label: "5+ Institutions",       icon: "🏫", top: "76%", left: "5%",   delay: 2.2, floatDur: 6.5 },
] as const;

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  PIXAR-STYLE CUBICO MASCOT — "Future Explorer" (gaze-tracked pupils)        */
/* ═══════════════════════════════════════════════════════════════════════════ */
function CubicoMascot({ gx = 0, gy = 0 }: { gx?: number; gy?: number }) {
  return (
    <svg viewBox="0 0 220 380" fill="none" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="mSkin" cx="55%" cy="38%" r="65%">
          <stop offset="0%"   stopColor="#F8D0A0" />
          <stop offset="55%"  stopColor="#E8A87C" />
          <stop offset="100%" stopColor="#C47848" />
        </radialGradient>
        <linearGradient id="mHair" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#1A0F40" />
          <stop offset="100%" stopColor="#2D1B69" />
        </linearGradient>
        <linearGradient id="mHoodie" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#064E3B" />
          <stop offset="50%"  stopColor="#065F46" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="mHoodieShadow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="rgba(0,0,0,0.28)" />
          <stop offset="40%"  stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.08)" />
        </linearGradient>
        <linearGradient id="mGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#C49A14" />
          <stop offset="50%"  stopColor="#E5B925" />
          <stop offset="100%" stopColor="#A07810" />
        </linearGradient>
        <linearGradient id="mPants" x1="0%" y1="0%" x2="20%" y2="100%">
          <stop offset="0%"   stopColor="#111827" />
          <stop offset="100%" stopColor="#1F2937" />
        </linearGradient>
        <linearGradient id="mShoes" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id="mTablet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="rgba(6,214,160,0.18)" />
          <stop offset="100%" stopColor="rgba(79,70,229,0.12)" />
        </linearGradient>
        <linearGradient id="mHolo" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#06D6A0" />
          <stop offset="33%"  stopColor="#818CF8" />
          <stop offset="66%"  stopColor="#F472B6" />
          <stop offset="100%" stopColor="#06D6A0" />
        </linearGradient>
        <radialGradient id="mEye" cx="35%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#5C3010" />
          <stop offset="60%"  stopColor="#7A4218" />
          <stop offset="100%" stopColor="#3A1E08" />
        </radialGradient>
        <radialGradient id="mDashGlow" cx="90%" cy="40%" r="75%">
          <stop offset="0%"   stopColor="rgba(0,255,136,0.30)" />
          <stop offset="100%" stopColor="rgba(0,255,136,0)" />
        </radialGradient>
        <radialGradient id="mCoolGlow" cx="10%" cy="45%" r="65%">
          <stop offset="0%"   stopColor="rgba(99,102,241,0.14)" />
          <stop offset="100%" stopColor="rgba(99,102,241,0)" />
        </radialGradient>
        <radialGradient id="mFloor" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(0,255,136,0.22)" />
          <stop offset="100%" stopColor="rgba(0,255,136,0)" />
        </radialGradient>
        <filter id="mNodeGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="mLensGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <ellipse cx="110" cy="372" rx="60" ry="8" fill="url(#mFloor)" />
      <ellipse cx="88"  cy="362" rx="22" ry="10" fill="url(#mShoes)" />
      <ellipse cx="132" cy="362" rx="22" ry="10" fill="url(#mShoes)" />
      <rect x="70"  y="350" width="36" height="14" rx="7" fill="url(#mShoes)" />
      <rect x="114" y="350" width="36" height="14" rx="7" fill="url(#mShoes)" />
      <rect x="73"  y="352" width="14" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
      <rect x="117" y="352" width="14" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
      <rect x="78"  y="272" width="26" height="84" rx="12" fill="url(#mPants)" />
      <rect x="116" y="272" width="26" height="84" rx="12" fill="url(#mPants)" />
      <rect x="82"  y="275" width="7" height="44" rx="3" fill="rgba(255,255,255,0.05)" />
      <rect x="120" y="275" width="7" height="44" rx="3" fill="rgba(255,255,255,0.05)" />
      <path d="M75 175 Q70 182 68 220 L68 284 Q68 294 78 294 L142 294 Q152 294 152 284 L152 220 Q150 182 145 175 L110 170 Z"
            fill="url(#mHoodie)" />
      <path d="M75 175 Q70 182 68 220 L68 284 Q68 294 78 294 L110 294 L110 170 Z"
            fill="url(#mHoodieShadow)" />
      <rect x="68" y="282" width="84" height="12" rx="5" fill="#053D2E" />
      <line x1="110" y1="180" x2="110" y2="282" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      <rect x="88" y="252" width="44" height="26" rx="6" fill="#053D2E" />
      <rect x="90" y="254" width="40" height="22" rx="5" fill="rgba(0,0,0,0.18)" />
      {[188, 200, 212, 224, 236].map((y, i) => (
        <line key={i} x1="72" y1={y} x2="148" y2={y} stroke="rgba(0,0,0,0.08)" strokeWidth="0.6" />
      ))}
      <path d="M76 176 Q92 170 110 168 Q128 170 144 176"
            stroke="rgba(0,0,0,0.18)" strokeWidth="1" fill="none" strokeDasharray="3 3" />
      <circle cx="128" cy="205" r="9" stroke="rgba(0,255,136,0.35)" strokeWidth="0.8" fill="none" />
      <path d="M134 198 A9 9 0 1 0 134 212"
            stroke="rgba(0,255,136,0.75)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M142 182 Q160 214 152 254 Q148 270 136 274"
            stroke="#9A6A0A" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M142 182 Q160 214 152 254 Q148 270 136 274"
            stroke="#E5B925" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.55" />
      <rect x="136" y="226" width="42" height="50" rx="7" fill="url(#mGold)" />
      <g opacity="0.45" stroke="#FDE68A" strokeWidth="0.7" fill="none">
        <polygon points="157,234 162,239 157,244 152,239" />
        <polygon points="157,246 162,251 157,256 152,251" />
        <polygon points="169,239 174,244 169,249 164,244" />
        <polygon points="145,239 150,244 145,249 140,244" />
        <line x1="157" y1="234" x2="157" y2="262" />
        <line x1="139" y1="244" x2="175" y2="244" />
        <circle cx="157" cy="244" r="3" />
      </g>
      <rect x="150" y="273" width="14" height="5" rx="2.5" fill="#A07810" />
      <circle cx="157" cy="275" r="2.5" fill="#FDE68A" />
      <path d="M143 180 Q160 196 165 236 Q166 246 157 252"
            stroke="#065F46" strokeWidth="22" strokeLinecap="round" fill="none" />
      <path d="M143 180 Q160 196 165 236 Q166 246 157 252"
            stroke="url(#mHoodie)" strokeWidth="20" strokeLinecap="round" fill="none" />
      <ellipse cx="155" cy="254" rx="12" ry="9" fill="url(#mSkin)" transform="rotate(-20 155 254)" />
      <rect x="150" y="246" width="20" height="7" rx="3.5" fill="url(#mHolo)" opacity="0.92" />
      <rect x="154" y="230" width="22" height="14" rx="3"
            fill="rgba(0,255,136,0.07)" stroke="rgba(0,255,136,0.45)" strokeWidth="0.6" />
      <rect x="156" y="233" width="18" height="1.5" rx="0.75" fill="rgba(0,255,136,0.65)" />
      <rect x="156" y="237" width="11" height="1.5" rx="0.75" fill="rgba(99,102,241,0.55)" />
      <rect x="156" y="241" width="14" height="1.5" rx="0.75" fill="rgba(244,114,182,0.55)" />
      <path d="M77 180 Q58 204 50 236 Q46 254 54 268"
            stroke="#065F46" strokeWidth="22" strokeLinecap="round" fill="none" />
      <path d="M77 180 Q58 204 50 236 Q46 254 54 268"
            stroke="url(#mHoodie)" strokeWidth="20" strokeLinecap="round" fill="none" />
      <ellipse cx="54" cy="270" rx="11" ry="8" fill="url(#mSkin)" transform="rotate(10 54 270)" />
      <rect x="18" y="256" width="62" height="84" rx="7" fill="url(#mTablet)" />
      <rect x="18" y="256" width="62" height="84" rx="7" stroke="rgba(0,255,136,0.40)" strokeWidth="1" />
      <rect x="21" y="259" width="56" height="78" rx="5" fill="rgba(0,255,136,0.04)" />
      <rect x="24" y="263" width="50" height="2.5" rx="1.25" fill="rgba(0,255,136,0.55)" />
      <rect x="24" y="270" width="36" height="1.5" rx="0.75" fill="rgba(255,255,255,0.22)" />
      <rect x="24" y="275" width="44" height="1.5" rx="0.75" fill="rgba(255,255,255,0.16)" />
      <rect x="24" y="288" width="16" height="1.5" rx="0.75" fill="rgba(0,255,136,0.65)" />
      <rect x="42" y="288" width="24" height="1.5" rx="0.75" fill="rgba(99,102,241,0.55)" />
      <rect x="24" y="294" width="10" height="1.5" rx="0.75" fill="rgba(244,114,182,0.55)" />
      <rect x="36" y="294" width="26" height="1.5" rx="0.75" fill="rgba(255,255,255,0.22)" />
      <g filter="url(#mNodeGlow)">
        <polygon points="26,242 32,234 38,242 32,250"
                 fill="rgba(0,255,136,0.14)" stroke="rgba(0,255,136,0.75)" strokeWidth="1.2" />
        <text x="32" y="244" textAnchor="middle" fontSize="5"
              fill="rgba(0,255,136,0.95)" fontFamily="monospace" fontWeight="bold">C</text>
      </g>
      <g filter="url(#mNodeGlow)">
        <polygon points="48,232 54,224 60,232 54,240"
                 fill="rgba(99,102,241,0.14)" stroke="rgba(99,102,241,0.75)" strokeWidth="1.2" />
        <text x="54" y="234" textAnchor="middle" fontSize="4.5"
              fill="rgba(99,102,241,0.95)" fontFamily="monospace" fontWeight="bold">JS</text>
      </g>
      <g filter="url(#mNodeGlow)">
        <circle cx="72" cy="244" r="8"
                fill="rgba(244,114,182,0.12)" stroke="rgba(244,114,182,0.68)" strokeWidth="1" />
        <text x="72" y="246" textAnchor="middle" fontSize="4.5"
              fill="rgba(244,114,182,0.95)" fontFamily="monospace" fontWeight="bold">AI</text>
      </g>
      <rect x="100" y="128" width="20" height="22" rx="5" fill="url(#mSkin)" />
      <path d="M80 170 Q94 160 110 162 Q126 160 140 170 L148 178 L72 178 Z" fill="#053D2E" />
      <ellipse cx="110" cy="88" rx="54" ry="58" fill="url(#mSkin)" />
      <path d="M56 82 Q54 52 70 34 Q86 18 110 14 Q134 18 150 34 Q166 52 164 82 Q162 64 148 46 Q130 30 110 26 Q90 30 72 46 Q58 64 56 82 Z"
            fill="url(#mHair)" />
      <path d="M60 76 Q64 44 80 30 Q94 18 110 16 Q126 18 140 30 Q156 44 160 76"
            stroke="url(#mHair)" strokeWidth="14" strokeLinecap="round" fill="none" />
      <ellipse cx="56"  cy="92" rx="8"  ry="10" fill="url(#mSkin)" />
      <ellipse cx="164" cy="92" rx="8"  ry="10" fill="url(#mSkin)" />
      <ellipse cx="55"  cy="92" rx="4.5" ry="6.5" fill="rgba(180,100,60,0.38)" />
      <ellipse cx="165" cy="92" rx="4.5" ry="6.5" fill="rgba(180,100,60,0.38)" />
      <rect x="68"  y="82" width="30" height="20" rx="7"
            fill="rgba(0,255,136,0.07)" stroke="rgba(0,255,136,0.65)" strokeWidth="1.3" filter="url(#mLensGlow)" />
      <rect x="122" y="82" width="30" height="20" rx="7"
            fill="rgba(0,255,136,0.07)" stroke="rgba(0,255,136,0.65)" strokeWidth="1.3" filter="url(#mLensGlow)" />
      <path d="M98 90 L122 90" stroke="rgba(0,255,136,0.55)" strokeWidth="1.8" />
      <line x1="68"  y1="90" x2="56"  y2="88" stroke="rgba(0,255,136,0.42)" strokeWidth="1.3" />
      <line x1="152" y1="90" x2="164" y2="88" stroke="rgba(0,255,136,0.42)" strokeWidth="1.3" />
      <rect x="72"  y="86" width="10" height="1.5" rx="0.75" fill="rgba(0,255,136,0.55)" />
      <rect x="72"  y="90" width="6"  height="1.5" rx="0.75" fill="rgba(0,255,136,0.35)" />
      <rect x="126" y="86" width="10" height="1.5" rx="0.75" fill="rgba(0,255,136,0.55)" />
      <rect x="126" y="90" width="6"  height="1.5" rx="0.75" fill="rgba(0,255,136,0.35)" />
      <ellipse cx="83"  cy="96" rx="13" ry="12" fill="white" />
      <ellipse cx="137" cy="96" rx="13" ry="12" fill="white" />
      {/* Iris — follows cursor gx/gy */}
      <circle cx={86  + gx} cy={94 + gy} r="8.5" fill="url(#mEye)" />
      <circle cx={134 + gx} cy={94 + gy} r="8.5" fill="url(#mEye)" />
      <circle cx={87  + gx} cy={94 + gy} r="5"   fill="#180A02" />
      <circle cx={135 + gx} cy={94 + gy} r="5"   fill="#180A02" />
      <circle cx={90  + gx} cy={91 + gy} r="3"   fill="rgba(255,255,255,0.95)" />
      <circle cx={138 + gx} cy={91 + gy} r="3"   fill="rgba(255,255,255,0.95)" />
      <circle cx={83  + gx} cy={97 + gy} r="1.2" fill="rgba(255,255,255,0.55)" />
      <circle cx={131 + gx} cy={97 + gy} r="1.2" fill="rgba(255,255,255,0.55)" />
      <path d="M70 88 Q76 80 83 83"  stroke="#1A0F40" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M124 83 Q131 80 140 88" stroke="#1A0F40" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M67 77 Q78 69 94 73"   stroke="#1A0F40" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M126 73 Q142 69 153 77" stroke="#1A0F40" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M94 128 Q110 140 126 128" stroke="#C2805A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M97 130 Q110 136 123 130" fill="rgba(255,255,255,0.72)" />
      <circle cx="92"  cy="126" r="5" fill="rgba(235,135,95,0.14)" />
      <circle cx="128" cy="126" r="5" fill="rgba(235,135,95,0.14)" />
      {/* 3-point lighting — emerald glow from fracture (right) */}
      <ellipse cx="165" cy="90"  rx="65" ry="72" fill="url(#mDashGlow)" />
      <ellipse cx="55"  cy="100" rx="58" ry="64" fill="url(#mCoolGlow)" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Main Hero Section                                                           */
/* ═══════════════════════════════════════════════════════════════════════════ */

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Mouse / gaze tracking */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [gaze, setGaze] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth  - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      mouseX.set(nx);
      mouseY.set(ny);
      setGaze({ x: Math.max(-3, Math.min(3, nx * 6)), y: Math.max(-2, Math.min(2, ny * 4)) });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  /* Scroll parallax for photo layers */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const py0 = useTransform(scrollYProgress, [0, 1], ["0%",  "10%"]);  // back  (0.1×)
  const py1 = useTransform(scrollYProgress, [0, 1], ["0%",  "20%"]);  // mid   (0.2×)
  const py2 = useTransform(scrollYProgress, [0, 1], ["0%",  "35%"]);  // front (0.35×)

  /* Mascot subtle float */
  const mascotSpringX = useSpring(mouseX, SPRING_CFG);
  const mascotSpringY = useSpring(mouseY, SPRING_CFG);
  const mascotRotX = useTransform(mascotSpringY, [-0.5, 0.5], [4, -4]);
  const mascotRotY = useTransform(mascotSpringX, [-0.5, 0.5], [-6,  6]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        background: "radial-gradient(ellipse at 30% 50%, #0a1f14 0%, #050e0a 40%, #071a10 100%)",
      }}
    >

      {/* ── Circuit / topographic pattern overlay (left side, 4% opacity) ── */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          opacity: 0.04, pointerEvents: "none", zIndex: 0,
        }}
      >
        <defs>
          <pattern id="circuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <path
              d="M0 40 L60 40 L60 80 L140 80 L140 40 L200 40
                 M0 80 L40 80 L40 120 L160 120 L160 80 L200 80
                 M0 120 L80 120 L80 160 L120 160 L120 120 L200 120
                 M0 160 L40 160 L40 200
                 M160 160 L160 200
                 M40 0 L40 40  M80 0 L80 40
                 M120 0 L120 40  M160 0 L160 40"
              fill="none" stroke="#00ff88" strokeWidth="0.8"
            />
            <circle cx="40"  cy="40"  r="2.2" fill="#00ff88" />
            <circle cx="140" cy="40"  r="2.2" fill="#00ff88" />
            <circle cx="60"  cy="80"  r="2.2" fill="#00ff88" />
            <circle cx="140" cy="80"  r="2.2" fill="#00ff88" />
            <circle cx="40"  cy="120" r="2.2" fill="#00ff88" />
            <circle cx="160" cy="120" r="2.2" fill="#00ff88" />
            <circle cx="80"  cy="160" r="2.2" fill="#00ff88" />
            <circle cx="120" cy="160" r="2.2" fill="#00ff88" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>

      {/* ── Right side — 3 layered Unsplash photos with duotone + parallax ── */}
      <div
        style={{
          position: "absolute", inset: 0,
          clipPath: RIGHT_CLIP,
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {/* Back layer — most blurred, slowest parallax */}
        <motion.img
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=60"
          alt=""
          style={{
            position: "absolute", inset: "-10% 0", width: "100%", height: "120%",
            objectFit: "cover",
            filter: "sepia(100%) saturate(280%) hue-rotate(100deg) brightness(0.5) contrast(1.1)",
            mixBlendMode: "luminosity",
            opacity: 0.50,
            y: py0,
          }}
        />
        {/* Mid layer */}
        <motion.img
          src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=65"
          alt=""
          style={{
            position: "absolute", inset: "-10% 0", width: "100%", height: "120%",
            objectFit: "cover",
            filter: "sepia(100%) saturate(280%) hue-rotate(105deg) brightness(0.55) contrast(1.05)",
            mixBlendMode: "luminosity",
            opacity: 0.70,
            y: py1,
          }}
        />
        {/* Front layer — sharpest, fastest parallax */}
        <motion.img
          src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&q=75"
          alt=""
          style={{
            position: "absolute", inset: "-10% 0", width: "100%", height: "120%",
            objectFit: "cover",
            objectPosition: "left center",
            filter: "sepia(100%) saturate(320%) hue-rotate(100deg) brightness(0.60)",
            mixBlendMode: "luminosity",
            opacity: 0.90,
            y: py2,
          }}
        />
        {/* Emerald colour wash to unify duotone */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(0,255,136,0.12) 0%, rgba(5,14,10,0.35) 100%)",
        }} />
      </div>

      {/* ── Data-stream lines (thin horizontal rays shooting left from crack) ── */}
      {DATA_STREAMS.map((s, i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: [0, 0.6, 0.3] }}
          transition={{ delay: 0.8 + i * 0.12, duration: 1.0, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: `${s.y}%`,
            right: `${100 - s.fx}%`,
            width: `${s.w}%`,
            height: 1,
            transformOrigin: "right center",
            background: "linear-gradient(to left, rgba(0,255,136,0.45), rgba(0,255,136,0.12) 60%, transparent)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── Fracture SVG overlay — glow line + breathing animation ── */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          overflow: "visible", pointerEvents: "none",
          zIndex: 3,
        }}
      >
        <defs>
          {/* Light-leak gradient along fracture direction */}
          <linearGradient id="fracGrad" x1="62%" y1="0%" x2="47%" y2="100%" gradientUnits="objectBoundingBox">
            <stop offset="0%"   stopColor="transparent" />
            <stop offset="15%"  stopColor="#00ff88" />
            <stop offset="35%"  stopColor="#ffffff" />
            <stop offset="55%"  stopColor="#00ff88" />
            <stop offset="75%"  stopColor="#ffffff" />
            <stop offset="100%" stopColor="#00ff88" />
          </linearGradient>
          <filter id="fracGlow" x="-200%" y="-10%" width="500%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="fracWideGlow" x="-300%" y="-10%" width="700%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" />
          </filter>
        </defs>

        {/* Wide ambient glow (outermost halo) */}
        <motion.polyline
          points={SVG_PTS}
          stroke="#00ff88"
          strokeWidth="3"
          fill="none"
          filter="url(#fracWideGlow)"
          animate={{ opacity: [0.18, 0.35, 0.18] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Medium glow */}
        <motion.polyline
          points={SVG_PTS}
          stroke="#00ff88"
          strokeWidth="1.2"
          fill="none"
          filter="url(#fracGlow)"
          animate={{ opacity: [0.45, 0.85, 0.45] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
        />
        {/* Crisp light-leak core line */}
        <motion.polyline
          points={SVG_PTS}
          stroke="url(#fracGrad)"
          strokeWidth="0.35"
          fill="none"
          animate={{ opacity: [0.6, 1.0, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
      </svg>

      {/* ── Particle dots scattered along fracture ── */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.15, 0.08, 0.15, 0],
            scale: [0.6, 1, 0.8, 1, 0.6],
          }}
          transition={{
            duration: p.dur, repeat: Infinity, delay: p.delay, ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "#00ff88",
            boxShadow: `0 0 ${p.size * 2}px #00ff88`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 3,
          }}
        />
      ))}

      {/* ── Floating UI shard fragments along fracture ── */}
      {SHARDS.map((s, i) => {
        const xPct = getFractureX(s.y) + s.xOff;
        return (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              y: [0, -8, 0],
            }}
            transition={{
              opacity: { delay: 0.4 + i * 0.08, duration: 0.5 },
              y: { delay: 0.4 + i * 0.08, duration: s.dur, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              position: "absolute",
              left: `${xPct}%`,
              top: `${s.y}%`,
              transform: `translate(-50%, -50%) scale(${s.scale}) rotate(${s.rot}deg)`,
              zIndex: 4,
              pointerEvents: "none",
            }}
          >
            <div style={{
              background: "rgba(5,14,10,0.72)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: `1px solid ${s.color}44`,
              borderRadius: 8,
              padding: "6px 10px",
              minWidth: 72,
              boxShadow: `0 0 14px ${s.color}22, 0 4px 16px rgba(0,0,0,0.55)`,
            }}>
              <div style={{
                fontFamily: "var(--font-ui)", fontSize: 8, color: `${s.color}cc`,
                letterSpacing: "0.07em", textTransform: "uppercase" as const, marginBottom: 2,
              }}>{s.label}</div>
              <div style={{
                fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700,
                color: "#E2E8F0", lineHeight: 1,
                background: `linear-gradient(135deg, #E2E8F0, ${s.color})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>{s.value}</div>
              {/* Micro accent bar */}
              <div style={{
                marginTop: 4, height: 2, borderRadius: 1,
                background: `linear-gradient(90deg, ${s.color}, transparent)`,
                width: "60%",
              }} />
            </div>
          </motion.div>
        );
      })}

      {/* ── Mascot — straddles the fracture line at vertical center ── */}
      <motion.div
        style={{
          position: "absolute",
          left: `${getFractureX(50) - 8}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "clamp(140px, 14vw, 200px)",
          zIndex: 6,
          rotateX: mascotRotX,
          rotateY: mascotRotY,
          filter: "drop-shadow(0 0 20px #00ff88) drop-shadow(0 0 40px rgba(0,255,136,0.35))",
        }}
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <CubicoMascot gx={gaze.x} gy={gaze.y} />
      </motion.div>

      {/* ── Floating glassmorphism badges (left side) ── */}
      {BADGES.map((b) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0, y: [0, -7, 0] }}
          transition={{
            opacity: { delay: b.delay, duration: 0.6 },
            x:       { delay: b.delay, duration: 0.6 },
            y:       { delay: b.delay, duration: b.floatDur, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            position: "absolute",
            top: b.top,
            left: b.left,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(0,255,136,0.06)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(0,255,136,0.20)",
            borderRadius: 50,
            padding: "7px 16px 7px 10px",
            zIndex: 5,
            boxShadow: "0 4px 20px rgba(0,0,0,0.35)",
          }}
        >
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ fontSize: 16, display: "inline-block" }}
          >
            {b.icon}
          </motion.span>
          <span style={{
            fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500,
            color: "rgba(0,255,136,0.82)", letterSpacing: "0.03em",
            whiteSpace: "nowrap" as const,
          }}>{b.label}</span>
        </motion.div>
      ))}

      {/* ── Left side content (text, subtext card, CTA) ── */}
      <div style={{
        position: "relative", zIndex: 7,
        maxWidth: 1280, margin: "0 auto",
        padding: "80px 5%", width: "100%",
        paddingTop: 96,
      }}>
        <div style={{ maxWidth: "46%", minWidth: 320 }} className="hero-left-content">

          {/* Live badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(0,255,136,0.07)",
              border: "1px solid rgba(0,255,136,0.22)",
              borderRadius: 100, padding: "5px 14px", marginBottom: 28,
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.2, 1], scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#00ff88", display: "inline-block",
                boxShadow: "0 0 8px #00ff88",
              }}
            />
            <span style={{
              fontFamily: "var(--font-ui)", fontSize: 12, fontWeight: 500,
              color: "rgba(0,255,136,0.8)", letterSpacing: "0.05em",
            }}>EdTech Solutions for Institutions</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "clamp(36px, 4.8vw, 66px)",
              fontWeight: 800, lineHeight: 1.05,
              color: "#ffffff",
              margin: 0, marginBottom: 28,
              letterSpacing: "-0.025em",
            }}
          >
            Build an{" "}
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 700,
              }}
            >
              institution
            </span>
            <br />
            ready for{" "}
            <span style={{
              color: "#00ff88",
              textShadow: "0 0 18px rgba(0,255,136,0.70), 0 0 40px rgba(0,255,136,0.35)",
            }}>
              anything.
            </span>
          </motion.h1>

          {/* Glassmorphism subtext card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(0,255,136,0.15)",
              borderRadius: 14,
              padding: "18px 22px",
              marginBottom: 36,
            }}
          >
            <p style={{
              fontFamily: "var(--font-body)", fontSize: 17, color: "rgba(210,240,220,0.75)",
              lineHeight: 1.75, margin: 0,
            }}>
              Management systems, animated lessons, game-based learning, and
              digital transformation — one partner, every solution.
            </p>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: "flex", gap: 14, flexWrap: "wrap" as const, alignItems: "center" }}
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg, #00c96a, #00ff88)",
                color: "#050e0a",
                fontFamily: "var(--font-ui)", fontSize: 15, fontWeight: 700,
                borderRadius: 50, padding: "13px 28px",
                textDecoration: "none",
                boxShadow: "0 0 24px rgba(0,255,136,0.45), 0 0 48px rgba(0,255,136,0.18)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 36px rgba(0,255,136,0.6), 0 0 72px rgba(0,255,136,0.25)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(0,255,136,0.45), 0 0 48px rgba(0,255,136,0.18)";
              }}
            >
              💬 Get a Free Consultation
            </a>
            <a
              href="#results"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "rgba(0,255,136,0.06)",
                border: "1px solid rgba(0,255,136,0.28)",
                color: "rgba(0,255,136,0.85)",
                fontFamily: "var(--font-ui)", fontSize: 14, fontWeight: 500,
                borderRadius: 50, padding: "13px 24px",
                textDecoration: "none",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                transition: "background 0.2s ease",
                letterSpacing: "0.02em",
              }}
            >
              See results <span style={{ fontSize: 13 }}>↓</span>
            </a>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
