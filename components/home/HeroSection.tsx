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

const SPRING_CFG  = { stiffness: 80,  damping: 20, mass: 0.8 };
const SPRING_SLOW = { stiffness: 50,  damping: 22, mass: 1.2 };

/* ── Glassmorphism 2.0 trust chips — each has unique blur/opacity for Z-depth */
const TRUST_CHIPS = [
  {
    label: "Active in 3 Countries",
    x: "5%",  y: "17%",  delay: 0,
    blur: 25, bgAlpha: 0.78, borderAlpha: 0.30, /* closest  — sharpest glass */
    scale: 1.05, floatDur: 5.2, floatAmp: 7,
  },
  {
    label: "5+ Institutions",
    x: "72%", y: "10%",  delay: 0.8,
    blur: 17, bgAlpha: 0.60, borderAlpha: 0.18, /* mid-depth */
    scale: 1.0,  floatDur: 6.8, floatAmp: 10,
  },
  {
    label: "99.9% Uptime",
    x: "80%", y: "70%",  delay: 1.6,
    blur: 10, bgAlpha: 0.42, borderAlpha: 0.10, /* farthest — most transparent */
    scale: 0.93, floatDur: 8.0, floatAmp: 13,
  },
] as const;

/* ── Dashboard stats ────────────────────────────────────────────────────── */
const STATS = [
  {
    label: "Students",       value: "1,247", change: "+12%",  color: "#4F46E5",
    target: 1247,  fmt: (v: number) => Math.round(v).toLocaleString(),
  },
  {
    label: "Attendance",     value: "94.2%", change: "+3.1%", color: "#06D6A0",
    target: 94.2,  fmt: (v: number) => v.toFixed(1) + "%",
  },
  {
    label: "Parents Online", value: "89%",   change: "+18%",  color: "#7C3AED",
    target: 89,    fmt: (v: number) => Math.round(v) + "%",
  },
];
const CHART_BARS = [65, 80, 55, 90, 75, 45, 85];
const CHART_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

/* ── Pillar cards ────────────────────────────────────────────────────────── */
interface PillarCard {
  id: string; icon: string; title: string;
  defaultCopy: string; hoverCopy: string;
  gradient: string; borderColor: string; glowColor: string;
}
const PILLAR_CARDS: PillarCard[] = [
  {
    id: "manage", icon: "🏫", title: "Manage",
    defaultCopy: "Smart Institution Management.",
    hoverCopy: "Stop chasing paperwork. From fee collection to parent portals, gain 80% more efficiency with a unified system that actually works.",
    gradient: "linear-gradient(135deg,#4F46E5 0%,#6366F1 100%)",
    borderColor: "rgba(79,70,229,0.45)",
    glowColor:  "rgba(79,70,229,0.22)",
  },
  {
    id: "teach", icon: "🎬", title: "Teach",
    defaultCopy: "Bring Lessons to Life.",
    hoverCopy: "Turn static textbooks into Pixar-style 3D animated adventures. Increase student focus by 3× with native Arabic, Urdu, and English content.",
    gradient: "linear-gradient(135deg,#7C3AED 0%,#A78BFA 100%)",
    borderColor: "rgba(124,58,237,0.45)",
    glowColor:  "rgba(124,58,237,0.22)",
  },
  {
    id: "learn", icon: "🎮", title: "Learn",
    defaultCopy: "Game-Based Learning.",
    hoverCopy: "Make students love the challenge. Replace boring tests with gamified STEM modules and real-time progress tracking that parents can see.",
    gradient: "linear-gradient(135deg,#06D6A0 0%,#34D399 100%)",
    borderColor: "rgba(6,214,160,0.45)",
    glowColor:  "rgba(6,214,160,0.22)",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  PIXAR-STYLE CUBICO MASCOT — "Future Explorer"                             */
/* ═══════════════════════════════════════════════════════════════════════════ */

function CubicoMascot() {
  return (
    <svg viewBox="0 0 220 380" fill="none" style={{ width: "100%", height: "100%" }}>
      <defs>
        {/* Skin — warm, lit from the right (dashboard glow) */}
        <radialGradient id="mSkin" cx="55%" cy="38%" r="65%">
          <stop offset="0%"   stopColor="#F8D0A0" />
          <stop offset="55%"  stopColor="#E8A87C" />
          <stop offset="100%" stopColor="#C47848" />
        </radialGradient>
        {/* Hair */}
        <linearGradient id="mHair" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#1A0F40" />
          <stop offset="100%" stopColor="#2D1B69" />
        </linearGradient>
        {/* Emerald hoodie */}
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
        {/* Gold sling bag */}
        <linearGradient id="mGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#C49A14" />
          <stop offset="50%"  stopColor="#E5B925" />
          <stop offset="100%" stopColor="#A07810" />
        </linearGradient>
        {/* Pants */}
        <linearGradient id="mPants" x1="0%" y1="0%" x2="20%" y2="100%">
          <stop offset="0%"   stopColor="#111827" />
          <stop offset="100%" stopColor="#1F2937" />
        </linearGradient>
        {/* Shoes */}
        <linearGradient id="mShoes" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        {/* Tablet glassmorphism */}
        <linearGradient id="mTablet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="rgba(6,214,160,0.18)" />
          <stop offset="100%" stopColor="rgba(79,70,229,0.12)" />
        </linearGradient>
        {/* Holographic bracelet */}
        <linearGradient id="mHolo" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#06D6A0" />
          <stop offset="33%"  stopColor="#818CF8" />
          <stop offset="66%"  stopColor="#F472B6" />
          <stop offset="100%" stopColor="#06D6A0" />
        </linearGradient>
        {/* Brown eye */}
        <radialGradient id="mEye" cx="35%" cy="30%" r="70%">
          <stop offset="0%"   stopColor="#5C3010" />
          <stop offset="60%"  stopColor="#7A4218" />
          <stop offset="100%" stopColor="#3A1E08" />
        </radialGradient>
        {/* Dashboard emerald glow on right face/body */}
        <radialGradient id="mDashGlow" cx="90%" cy="40%" r="75%">
          <stop offset="0%"   stopColor="rgba(6,214,160,0.28)" />
          <stop offset="100%" stopColor="rgba(6,214,160,0)" />
        </radialGradient>
        {/* Cool ambient from left */}
        <radialGradient id="mCoolGlow" cx="10%" cy="45%" r="65%">
          <stop offset="0%"   stopColor="rgba(99,102,241,0.14)" />
          <stop offset="100%" stopColor="rgba(99,102,241,0)" />
        </radialGradient>
        {/* Floor shadow */}
        <radialGradient id="mFloor" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(6,214,160,0.18)" />
          <stop offset="100%" stopColor="rgba(6,214,160,0)" />
        </radialGradient>
        {/* Code-node glow filter */}
        <filter id="mNodeGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        {/* AR lens shimmer filter */}
        <filter id="mLensGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="b" />
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* ── Floor shadow ── */}
      <ellipse cx="110" cy="372" rx="60" ry="8" fill="url(#mFloor)" />

      {/* ── Shoes ── */}
      <ellipse cx="88"  cy="362" rx="22" ry="10" fill="url(#mShoes)" />
      <ellipse cx="132" cy="362" rx="22" ry="10" fill="url(#mShoes)" />
      <rect x="70" y="350" width="36" height="14" rx="7"  fill="url(#mShoes)" />
      <rect x="114" y="350" width="36" height="14" rx="7" fill="url(#mShoes)" />
      {/* Shoe stripes */}
      <rect x="73" y="352" width="14" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />
      <rect x="117" y="352" width="14" height="3" rx="1.5" fill="rgba(255,255,255,0.12)" />

      {/* ── Pants / Legs ── */}
      <rect x="78"  cy="272" x2="78"  y="272" width="26" height="84" rx="12" fill="url(#mPants)" />
      <rect x="116" cy="272" x2="116" y="272" width="26" height="84" rx="12" fill="url(#mPants)" />
      {/* Pant highlight */}
      <rect x="82"  y="275" width="7" height="44" rx="3" fill="rgba(255,255,255,0.05)" />
      <rect x="120" y="275" width="7" height="44" rx="3" fill="rgba(255,255,255,0.05)" />

      {/* ── Hoodie body ── */}
      <path d="M75 175 Q70 182 68 220 L68 284 Q68 294 78 294 L142 294 Q152 294 152 284 L152 220 Q150 182 145 175 L110 170 Z"
            fill="url(#mHoodie)" />
      <path d="M75 175 Q70 182 68 220 L68 284 Q68 294 78 294 L110 294 L110 170 Z"
            fill="url(#mHoodieShadow)" />
      {/* Ribbed waistband */}
      <rect x="68" y="282" width="84" height="12" rx="5" fill="#053D2E" />
      {/* Centre seam */}
      <line x1="110" y1="180" x2="110" y2="282" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
      {/* Kangaroo pocket */}
      <rect x="88" y="252" width="44" height="26" rx="6" fill="#053D2E" />
      <rect x="90" y="254" width="40" height="22" rx="5" fill="rgba(0,0,0,0.18)" />
      {/* Fabric texture lines */}
      {[188, 200, 212, 224, 236].map((y, i) => (
        <line key={i} x1="72" y1={y} x2="148" y2={y}
              stroke="rgba(0,0,0,0.08)" strokeWidth="0.6" />
      ))}
      {/* Shoulder stitching */}
      <path d="M76 176 Q92 170 110 168 Q128 170 144 176"
            stroke="rgba(0,0,0,0.18)" strokeWidth="1"
            fill="none" strokeDasharray="3 3" />

      {/* ── Cubico "C" logo on chest ── */}
      <circle cx="128" cy="205" r="9" stroke="rgba(6,214,160,0.35)" strokeWidth="0.8" fill="none" />
      <path d="M134 198 A9 9 0 1 0 134 212"
            stroke="rgba(6,214,160,0.75)" strokeWidth="1.8"
            strokeLinecap="round" fill="none" />

      {/* ── Sling-bag strap ── */}
      <path d="M142 182 Q160 214 152 254 Q148 270 136 274"
            stroke="#9A6A0A" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M142 182 Q160 214 152 254 Q148 270 136 274"
            stroke="#E5B925" strokeWidth="2.5" strokeLinecap="round"
            fill="none" opacity="0.55" />

      {/* ── Sling-bag body ── */}
      <rect x="136" y="226" width="42" height="50" rx="7" fill="url(#mGold)" />
      {/* Geometric Pakistani/Islamic pattern */}
      <g opacity="0.45" stroke="#FDE68A" strokeWidth="0.7" fill="none">
        <polygon points="157,234 162,239 157,244 152,239" />
        <polygon points="157,246 162,251 157,256 152,251" />
        <polygon points="169,239 174,244 169,249 164,244" />
        <polygon points="145,239 150,244 145,249 140,244" />
        <line x1="157" y1="234" x2="157" y2="262" />
        <line x1="139" y1="244" x2="175" y2="244" />
        <circle cx="157" cy="244" r="3" />
      </g>
      {/* Bag clasp */}
      <rect x="150" y="273" width="14" height="5" rx="2.5" fill="#A07810" />
      <circle cx="157" cy="275" r="2.5" fill="#FDE68A" />

      {/* ── Right arm (relaxed) ── */}
      <path d="M143 180 Q160 196 165 236 Q166 246 157 252"
            stroke="#065F46" strokeWidth="22" strokeLinecap="round" fill="none" />
      <path d="M143 180 Q160 196 165 236 Q166 246 157 252"
            stroke="rgba(0,0,0,0.14)" strokeWidth="22" strokeLinecap="round" fill="none" />
      <path d="M143 180 Q160 196 165 236 Q166 246 157 252"
            stroke="url(#mHoodie)" strokeWidth="20" strokeLinecap="round" fill="none" />
      {/* Right hand */}
      <ellipse cx="155" cy="254" rx="12" ry="9" fill="url(#mSkin)"
               transform="rotate(-20 155 254)" />
      <path d="M148 247 Q143 240 146 234" stroke="url(#mSkin)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
      <path d="M150 244 Q145 236 149 231" stroke="url(#mSkin)" strokeWidth="5.5" strokeLinecap="round" fill="none" />
      <path d="M152 242 Q150 233 155 230" stroke="url(#mSkin)" strokeWidth="5.5" strokeLinecap="round" fill="none" />

      {/* ── Holographic wrist bracelet (right wrist) ── */}
      <rect x="150" y="246" width="20" height="7" rx="3.5" fill="url(#mHolo)" opacity="0.92" />
      <rect x="150" y="246" width="20" height="7" rx="3.5"
            stroke="rgba(255,255,255,0.28)" strokeWidth="0.5" fill="none" />
      {/* Bracelet halo */}
      <rect x="148" y="244" width="24" height="11" rx="5"
            fill="rgba(6,214,160,0.1)" />
      {/* Floating hologram panel */}
      <rect x="154" y="230" width="22" height="14" rx="3"
            fill="rgba(6,214,160,0.07)" stroke="rgba(6,214,160,0.45)" strokeWidth="0.6" />
      <rect x="156" y="233" width="18" height="1.5" rx="0.75" fill="rgba(6,214,160,0.65)" />
      <rect x="156" y="237" width="11" height="1.5" rx="0.75" fill="rgba(99,102,241,0.55)" />
      <rect x="156" y="241" width="14" height="1.5" rx="0.75" fill="rgba(244,114,182,0.55)" />
      {/* Connecting filament bracelet → panel */}
      <line x1="162" y1="246" x2="162" y2="244"
            stroke="rgba(6,214,160,0.4)" strokeWidth="0.6" strokeDasharray="1.5 1.5" />

      {/* ── Left arm (holding tablet) ── */}
      <path d="M77 180 Q58 204 50 236 Q46 254 54 268"
            stroke="#065F46" strokeWidth="22" strokeLinecap="round" fill="none" />
      <path d="M77 180 Q58 204 50 236 Q46 254 54 268"
            stroke="rgba(0,0,0,0.14)" strokeWidth="22" strokeLinecap="round" fill="none" />
      <path d="M77 180 Q58 204 50 236 Q46 254 54 268"
            stroke="url(#mHoodie)" strokeWidth="20" strokeLinecap="round" fill="none" />
      {/* Left hand */}
      <ellipse cx="54" cy="270" rx="11" ry="8" fill="url(#mSkin)"
               transform="rotate(10 54 270)" />

      {/* ── Glassmorphism tablet ── */}
      <rect x="18" y="256" width="62" height="84" rx="7"
            fill="url(#mTablet)" />
      <rect x="18" y="256" width="62" height="84" rx="7"
            stroke="rgba(6,214,160,0.40)" strokeWidth="1" />
      {/* Tablet inner bezel */}
      <rect x="21" y="259" width="56" height="78" rx="5"
            fill="rgba(6,214,160,0.04)" />
      {/* Top shimmer */}
      <path d="M18 264 L56 256" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      {/* Code lines on screen */}
      <rect x="24" y="263" width="50" height="2.5" rx="1.25" fill="rgba(6,214,160,0.55)" />
      <rect x="24" y="270" width="36" height="1.5" rx="0.75" fill="rgba(255,255,255,0.22)" />
      <rect x="24" y="275" width="44" height="1.5" rx="0.75" fill="rgba(255,255,255,0.16)" />
      <rect x="24" y="280" width="28" height="1.5" rx="0.75" fill="rgba(255,255,255,0.16)" />
      {/* Code syntax coloring */}
      <rect x="24" y="288" width="16" height="1.5" rx="0.75" fill="rgba(6,214,160,0.65)" />
      <rect x="42" y="288" width="24" height="1.5" rx="0.75" fill="rgba(99,102,241,0.55)" />
      <rect x="24" y="294" width="10" height="1.5" rx="0.75" fill="rgba(244,114,182,0.55)" />
      <rect x="36" y="294" width="26" height="1.5" rx="0.75" fill="rgba(255,255,255,0.22)" />
      <rect x="24" y="300" width="22" height="1.5" rx="0.75" fill="rgba(6,214,160,0.45)" />
      <rect x="24" y="306" width="40" height="1.5" rx="0.75" fill="rgba(255,255,255,0.16)" />
      <rect x="24" y="312" width="30" height="1.5" rx="0.75" fill="rgba(99,102,241,0.45)" />
      {/* Corner glow */}
      <circle cx="80" cy="256" r="5" fill="rgba(6,214,160,0.35)" />
      {/* Bottom bar */}
      <rect x="40" y="332" width="18" height="3" rx="1.5"
            fill="rgba(255,255,255,0.18)" />

      {/* ── Floating code-nodes above tablet ── */}
      {/* Node 1 — emerald */}
      <g filter="url(#mNodeGlow)">
        <polygon points="26,242 32,234 38,242 32,250"
                 fill="rgba(6,214,160,0.14)" stroke="rgba(6,214,160,0.75)" strokeWidth="1.2" />
        <text x="32" y="244" textAnchor="middle" fontSize="5"
              fill="rgba(6,214,160,0.95)" fontFamily="monospace" fontWeight="bold">C</text>
      </g>
      {/* Node 2 — indigo */}
      <g filter="url(#mNodeGlow)">
        <polygon points="48,232 54,224 60,232 54,240"
                 fill="rgba(99,102,241,0.14)" stroke="rgba(99,102,241,0.75)" strokeWidth="1.2" />
        <text x="54" y="234" textAnchor="middle" fontSize="4.5"
              fill="rgba(99,102,241,0.95)" fontFamily="monospace" fontWeight="bold">JS</text>
      </g>
      {/* Node 3 — pink */}
      <g filter="url(#mNodeGlow)">
        <circle cx="72" cy="244" r="8"
                fill="rgba(244,114,182,0.12)" stroke="rgba(244,114,182,0.68)" strokeWidth="1" />
        <text x="72" y="246" textAnchor="middle" fontSize="4.5"
              fill="rgba(244,114,182,0.95)" fontFamily="monospace" fontWeight="bold">AI</text>
      </g>
      {/* Node connection filaments */}
      <line x1="38" y1="244" x2="46" y2="236" stroke="rgba(6,214,160,0.28)"   strokeWidth="0.6" strokeDasharray="2 2" />
      <line x1="60" y1="236" x2="64" y2="240" stroke="rgba(99,102,241,0.28)"  strokeWidth="0.6" strokeDasharray="2 2" />

      {/* ── Neck ── */}
      <rect x="100" y="128" width="20" height="22" rx="5" fill="url(#mSkin)" />
      {/* Collar shadow */}
      <path d="M80 170 Q94 160 110 162 Q126 160 140 170 L148 178 L72 178 Z"
            fill="#053D2E" />

      {/* ── Head (Pixar proportions — large) ── */}
      <ellipse cx="110" cy="88" rx="54" ry="58" fill="url(#mSkin)" />

      {/* ── Hair ── */}
      {/* Back/volume */}
      <path d="M56 82 Q54 52 70 34 Q86 18 110 14 Q134 18 150 34 Q166 52 164 82 Q162 64 148 46 Q130 30 110 26 Q90 30 72 46 Q58 64 56 82 Z"
            fill="url(#mHair)" />
      {/* Top cap */}
      <path d="M60 76 Q64 44 80 30 Q94 18 110 16 Q126 18 140 30 Q156 44 160 76"
            stroke="url(#mHair)" strokeWidth="14" strokeLinecap="round" fill="none" />
      {/* Hair shine */}
      <path d="M86 20 Q100 14 118 18"
            stroke="rgba(130,100,220,0.30)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Strand detail */}
      <path d="M62 74 Q68 48 84 34" stroke="rgba(30,20,80,0.4)" strokeWidth="1" fill="none" />
      <path d="M158 74 Q152 48 136 34" stroke="rgba(30,20,80,0.4)" strokeWidth="1" fill="none" />

      {/* ── Ears ── */}
      <ellipse cx="56"  cy="92" rx="8"  ry="10" fill="url(#mSkin)" />
      <ellipse cx="164" cy="92" rx="8"  ry="10" fill="url(#mSkin)" />
      <ellipse cx="55"  cy="92" rx="4.5" ry="6.5" fill="rgba(180,100,60,0.38)" />
      <ellipse cx="165" cy="92" rx="4.5" ry="6.5" fill="rgba(180,100,60,0.38)" />

      {/* ── AR Glasses ── */}
      {/* Left frame */}
      <rect x="68" y="82" width="30" height="20" rx="7"
            fill="rgba(6,214,160,0.07)" stroke="rgba(6,214,160,0.65)" strokeWidth="1.3"
            filter="url(#mLensGlow)" />
      {/* Right frame */}
      <rect x="122" y="82" width="30" height="20" rx="7"
            fill="rgba(6,214,160,0.07)" stroke="rgba(6,214,160,0.65)" strokeWidth="1.3"
            filter="url(#mLensGlow)" />
      {/* Bridge */}
      <path d="M98 90 L122 90"
            stroke="rgba(6,214,160,0.55)" strokeWidth="1.8" />
      {/* Temples */}
      <line x1="68" y1="90" x2="56" y2="88" stroke="rgba(6,214,160,0.42)" strokeWidth="1.3" />
      <line x1="152" y1="90" x2="164" y2="88" stroke="rgba(6,214,160,0.42)" strokeWidth="1.3" />
      {/* Lens HUD lines */}
      <rect x="72" y="86" width="10" height="1.5" rx="0.75" fill="rgba(6,214,160,0.55)" />
      <rect x="72" y="90" width="6"  height="1.5" rx="0.75" fill="rgba(6,214,160,0.35)" />
      <rect x="126" y="86" width="10" height="1.5" rx="0.75" fill="rgba(6,214,160,0.55)" />
      <rect x="126" y="90" width="6"  height="1.5" rx="0.75" fill="rgba(6,214,160,0.35)" />
      {/* Lens reflections */}
      <path d="M70 84 L80 82" stroke="rgba(255,255,255,0.30)" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M124 84 L134 82" stroke="rgba(255,255,255,0.30)" strokeWidth="0.9" strokeLinecap="round" />

      {/* ── Eyes (large, expressive, looking up-right) ── */}
      {/* Whites */}
      <ellipse cx="83"  cy="96" rx="13" ry="12" fill="white" />
      <ellipse cx="137" cy="96" rx="13" ry="12" fill="white" />
      {/* Iris */}
      <circle cx="86"  cy="94" r="8.5" fill="url(#mEye)" />
      <circle cx="134" cy="94" r="8.5" fill="url(#mEye)" />
      {/* Pupil */}
      <circle cx="87"  cy="94" r="5" fill="#180A02" />
      <circle cx="135" cy="94" r="5" fill="#180A02" />
      {/* Main sparkle (Pixar big white dot) */}
      <circle cx="90"  cy="91" r="3"   fill="rgba(255,255,255,0.95)" />
      <circle cx="138" cy="91" r="3"   fill="rgba(255,255,255,0.95)" />
      {/* Secondary sparkle */}
      <circle cx="83"  cy="97" r="1.2" fill="rgba(255,255,255,0.55)" />
      <circle cx="131" cy="97" r="1.2" fill="rgba(255,255,255,0.55)" />
      {/* Top eyelashes */}
      <path d="M70 88 Q76 80 83 83" stroke="#1A0F40" strokeWidth="2"   fill="none" strokeLinecap="round" />
      <path d="M124 83 Q131 80 140 88" stroke="#1A0F40" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Lower lash */}
      <path d="M71 103 Q80 109 93 105" stroke="rgba(30,15,64,0.38)" strokeWidth="1" fill="none" />
      <path d="M127 105 Q140 109 149 103" stroke="rgba(30,15,64,0.38)" strokeWidth="1" fill="none" />

      {/* ── Eyebrows (arched, confident) ── */}
      <path d="M67 77 Q78 69 94 73"  stroke="#1A0F40" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M126 73 Q142 69 153 77" stroke="#1A0F40" strokeWidth="3.5" strokeLinecap="round" fill="none" />

      {/* ── Nose ── */}
      <path d="M106 106 Q104 114 110 117 Q116 114 114 106"
            fill="rgba(190,110,65,0.12)" />
      <path d="M104 117 Q110 122 116 117"
            stroke="rgba(160,80,45,0.40)" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* ── Mouth — warm, confident smile ── */}
      <path d="M94 128 Q110 140 126 128"
            stroke="#C2805A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Upper lip */}
      <path d="M96 127 Q103 123 110 125 Q117 123 124 127"
            stroke="#B87070" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Teeth */}
      <path d="M97 130 Q110 136 123 130"
            fill="rgba(255,255,255,0.72)" />
      {/* Cheek dimples */}
      <circle cx="92"  cy="126" r="5" fill="rgba(235,135,95,0.14)" />
      <circle cx="128" cy="126" r="5" fill="rgba(235,135,95,0.14)" />

      {/* ── Lighting overlays ── */}
      {/* Emerald glow from dashboard (right side) */}
      <ellipse cx="165" cy="90"  rx="65" ry="72" fill="url(#mDashGlow)" />
      {/* Cool ambient left */}
      <ellipse cx="55"  cy="100" rx="58" ry="64" fill="url(#mCoolGlow)" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Pillar Card with color-coded ambient glow                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */

function PillarCardUI({ card }: { card: PillarCard }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1, minWidth: 0, position: "relative",
      }}
    >
      {/* ── Color-coded ambient glow (always on, amplifies on hover) ── */}
      <div
        style={{
          position: "absolute",
          inset: -10,
          borderRadius: 22,
          background: `radial-gradient(ellipse at 50% 80%, ${card.glowColor} 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0.55,
          transition: "opacity 0.35s ease-in-out",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          background: "rgba(10,18,36,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1px solid ${hovered ? card.borderColor : "rgba(255,255,255,0.06)"}`,
          borderRadius: 14,
          padding: "18px 15px",
          overflow: "hidden",
          transition: "border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          boxShadow: hovered ? `0 0 28px ${card.glowColor}` : "none",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 3,
            background: card.gradient,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 20 }}>{card.icon}</span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "#E2E8F0" }}>
            {card.title}
          </span>
        </div>
        <AnimatePresence mode="wait">
          <motion.p
            key={hovered ? "hover" : "default"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              fontFamily: "var(--font-body)", fontSize: 12.5, lineHeight: 1.65,
              color: hovered ? "#CBD5E1" : "#64748B",
              margin: 0, minHeight: 60,
            }}
          >
            {hovered ? card.hoverCopy : card.defaultCopy}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Rolling counter hook                                                       */
/* ═══════════════════════════════════════════════════════════════════════════ */

function useCountUp(target: number, duration = 1500, delay = 0) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let tid: ReturnType<typeof setTimeout>;
    let rid: number;
    tid = setTimeout(() => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // ease-out-cubic
        setVal(eased * target);
        if (p < 1) rid = requestAnimationFrame(tick);
        else setVal(target);
      };
      rid = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(tid); cancelAnimationFrame(rid); };
  }, [target, duration, delay]);
  return val;
}

/* Animated stat card with rolling counter */
function StatCard({ s, delay }: { s: typeof STATS[0]; delay: number }) {
  const count = useCountUp(s.target, 1500, delay);
  return (
    <div style={{
      backgroundColor: "rgba(16,30,50,0.8)", borderRadius: 10,
      padding: "12px 10px", border: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{
        fontFamily: "var(--font-ui)", fontSize: 9, color: "#64748B",
        textTransform: "uppercase" as const, letterSpacing: "0.06em", marginBottom: 4,
      }}>{s.label}</div>
      <div style={{
        fontFamily: "var(--font-ui)", fontSize: 20, fontWeight: 700,
        color: "#E2E8F0", lineHeight: 1,
      }}>{s.fmt(count)}</div>
      <div style={{
        fontFamily: "var(--font-ui)", fontSize: 10, color: s.color, marginTop: 3,
      }}>{s.change}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Parent Portal Phone Mockup                                                 */
/* ═══════════════════════════════════════════════════════════════════════════ */

function ParentPortalPhone() {
  return (
    <div className="hero-phone">
      {/* Dynamic island */}
      <div className="hero-phone-island" />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 10 }}>
        <div style={{
          width: 22, height: 22, borderRadius: 6,
          background: "linear-gradient(135deg,#06D6A0,#059669)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 11,
        }}>🏫</div>
        <div>
          <div style={{
            fontFamily: "var(--font-ui)", fontSize: 8.5, fontWeight: 700, color: "#E2E8F0",
          }}>Parent Portal</div>
          <div style={{ fontFamily: "var(--font-ui)", fontSize: 7, color: "#34D399" }}>
            Live updates
          </div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 3 }}>
          <div style={{
            width: 5, height: 5, borderRadius: "50%",
            background: "#06D6A0",
            boxShadow: "0 0 6px rgba(6,214,160,0.8)",
          }} />
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 8 }} />

      {/* Notification 1 */}
      <div style={{
        background: "rgba(6,214,160,0.08)",
        border: "1px solid rgba(6,214,160,0.18)",
        borderRadius: 8, padding: "7px 8px", marginBottom: 6,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
          <span style={{ fontSize: 10 }}>✅</span>
          <div style={{
            fontFamily: "var(--font-ui)", fontSize: 8, fontWeight: 700, color: "#E2E8F0",
          }}>Grade 5-B · Attendance</div>
        </div>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 7, color: "#94A3B8" }}>
          All 28 students marked · Just now
        </div>
      </div>

      {/* Notification 2 */}
      <div style={{
        background: "rgba(124,58,237,0.08)",
        border: "1px solid rgba(124,58,237,0.18)",
        borderRadius: 8, padding: "7px 8px", marginBottom: 8,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
          <span style={{ fontSize: 10 }}>🎬</span>
          <div style={{
            fontFamily: "var(--font-ui)", fontSize: 8, fontWeight: 700, color: "#E2E8F0",
          }}>Arabic Grammar · Ch. 4</div>
        </div>
        <div style={{ fontFamily: "var(--font-ui)", fontSize: 7, color: "#94A3B8" }}>
          New animated lesson ready
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 8 }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          fontFamily: "var(--font-ui)", fontSize: 7, color: "#64748B", marginBottom: 4,
        }}>
          <span>Weekly Progress</span><span style={{ color: "#34D399" }}>78%</span>
        </div>
        <div style={{
          height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2,
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "78%" }}
            transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
            style={{
              height: "100%", borderRadius: 2,
              background: "linear-gradient(90deg,#06D6A0,#059669)",
            }}
          />
        </div>
      </div>

      {/* Bottom tab bar */}
      <div style={{
        display: "flex", justifyContent: "space-around",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: 6,
      }}>
        {["🏠", "📊", "💬"].map((icon, i) => (
          <div key={i} style={{
            fontSize: 10, opacity: i === 0 ? 1 : 0.4,
          }}>{icon}</div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  Main Hero Section                                                          */
/* ═══════════════════════════════════════════════════════════════════════════ */

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Mouse tracking */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, SPRING_CFG);
  const springY = useSpring(mouseY, SPRING_CFG);
  const slowX   = useSpring(mouseX, SPRING_SLOW);
  const slowY   = useSpring(mouseY, SPRING_SLOW);

  /* Scroll parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* ── Layer speeds ── */
  const bgY   = useTransform(scrollYProgress, [0, 1], [0,  55]);   /* background */
  const dashY = useTransform(scrollYProgress, [0, 1], [0,  95]);   /* 2.5D stage */
  const fgY   = useTransform(scrollYProgress, [0, 1], [0, 160]);   /* mascot + CTA */

  /* ── 2.5D dashboard tilt — base 22°X / -8°Y + mouse ±4° ── */
  const dashRotX2D = useTransform(slowY, [-0.5, 0.5], [18, 26]); /* centred at 22 */
  const dashRotY2D = useTransform(slowX, [-0.5, 0.5], [-5, -11]); /* centred at -8 */

  /* Mascot mouse-follow */
  const mascotRotX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const mascotRotY = useTransform(springX, [-0.5, 0.5], [-8,  8]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth  - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative", minHeight: "100vh", overflow: "hidden",
        display: "flex", alignItems: "center", paddingTop: 72,
      }}
    >
      {/* ══════════ LAYER 3 — Background (slowest) ══════════ */}
      <motion.div style={{ position: "absolute", inset: 0, y: bgY, zIndex: 0 }}>

        {/* Deep emerald gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 120% 100% at 50% 0%, #0A2E1F 0%, #061A14 35%, #060A15 70%)",
        }} />

        {/* Geometric grid */}
        <div className="hero-geo-grid" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />

        {/* Ambient orbs */}
        <div style={{
          position: "absolute", top: "10%", left: "-5%",
          width: 520, height: 520, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,214,160,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "0%", right: "-8%",
          width: 620, height: 620, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,70,229,0.09) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* ── Global-reach nodes + PULSING connection lines ── */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}
        >
          <defs>
            <filter id="pulseGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" result="b" />
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Static dashed base lines */}
          <line x1="15" y1="30" x2="45" y2="20"
                stroke="rgba(6,214,160,0.18)" strokeWidth="0.18" strokeDasharray="0.8 0.8" />
          <line x1="45" y1="20" x2="78" y2="35"
                stroke="rgba(6,214,160,0.18)" strokeWidth="0.18" strokeDasharray="0.8 0.8" />

          {/* Traveling pulse — PK → SA */}
          <circle r="0.55" fill="#06D6A0" filter="url(#pulseGlow)">
            <animateMotion dur="2.8s" repeatCount="indefinite" begin="2s"
              path="M15,30 L45,20" />
          </circle>
          {/* Second pulse offset */}
          <circle r="0.35" fill="rgba(6,214,160,0.6)" filter="url(#pulseGlow)">
            <animateMotion dur="2.8s" repeatCount="indefinite" begin="3.4s"
              path="M15,30 L45,20" />
          </circle>

          {/* Traveling pulse — SA → CA */}
          <circle r="0.55" fill="#06D6A0" filter="url(#pulseGlow)">
            <animateMotion dur="3.2s" repeatCount="indefinite" begin="2.5s"
              path="M45,20 L78,35" />
          </circle>
          <circle r="0.35" fill="rgba(6,214,160,0.6)" filter="url(#pulseGlow)">
            <animateMotion dur="3.2s" repeatCount="indefinite" begin="4.0s"
              path="M45,20 L78,35" />
          </circle>
        </svg>

        {/* Node markers */}
        {[
          { cx: "15%", cy: "30%", label: "PK", flag: "🇵🇰", delay: 1.2 },
          { cx: "45%", cy: "20%", label: "SA", flag: "🇸🇦", delay: 1.4 },
          { cx: "78%", cy: "35%", label: "CA", flag: "🇨🇦", delay: 1.6 },
        ].map((node) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: node.delay, duration: 0.7 }}
            style={{
              position: "absolute", left: node.cx, top: node.cy,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="hero-node-pulse" />
            <div style={{
              width: 11, height: 11, borderRadius: "50%",
              background: "radial-gradient(circle, #06D6A0, #059669)",
              boxShadow: "0 0 20px rgba(6,214,160,0.55)",
              position: "relative", zIndex: 1,
            }} />
            <span style={{
              position: "absolute", top: 20, left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "var(--font-ui)", fontSize: 10,
              color: "rgba(6,214,160,0.72)", whiteSpace: "nowrap",
              letterSpacing: "0.08em",
            }}>
              {node.flag} {node.label}
            </span>
          </motion.div>
        ))}
      </motion.div>

      {/* ══════════ Glassmorphism 2.0 Trust Chips (varying Z-depth) ══════════ */}
      {TRUST_CHIPS.map((chip) => (
        <motion.div
          key={chip.label}
          className="hero-trust-chip"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: [0, -chip.floatAmp, 0],
          }}
          transition={{
            opacity: { delay: 1.5 + chip.delay, duration: 0.7 },
            y: { delay: 1.5 + chip.delay, duration: chip.floatDur, repeat: Infinity, ease: "easeInOut" },
          }}
          style={{
            position: "absolute",
            left: chip.x, top: chip.y,
            zIndex: 1,
            /* Glassmorphism 2.0 — each chip has unique blur for Z-axis depth */
            background: `rgba(12,21,40,${chip.bgAlpha})`,
            backdropFilter: `blur(${chip.blur}px)`,
            WebkitBackdropFilter: `blur(${chip.blur}px)`,
            border: `1px solid rgba(6,214,160,${chip.borderAlpha})`,
            borderRadius: 100,
            padding: "7px 17px",
            fontFamily: "var(--font-ui)",
            fontSize: `${12 * chip.scale}px`,
            fontWeight: 500,
            color: `rgba(6,214,160,${0.5 + chip.bgAlpha * 0.4})`,
            letterSpacing: "0.03em",
            pointerEvents: "none",
            /* Subtle box-shadow scales with depth (closer = sharper shadow) */
            boxShadow: `0 4px ${chip.blur * 0.8}px rgba(0,0,0,${0.1 + (25 - chip.blur) * 0.01})`,
          }}
        >
          {chip.label}
        </motion.div>
      ))}

      {/* ══════════ Main Content ══════════ */}
      <div
        style={{
          position: "relative", zIndex: 2,
          maxWidth: 1280, margin: "0 auto",
          padding: "80px 5%", width: "100%",
        }}
      >
        <div className="hero-parallax-grid">

          {/* ── Left Column: Text + CTA + Pillar Cards ── */}
          <div style={{ position: "relative", zIndex: 3 }}>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                backgroundColor: "rgba(6,214,160,0.08)",
                border: "1px solid rgba(6,214,160,0.25)",
                borderRadius: 100, padding: "6px 16px", marginBottom: 32,
              }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                backgroundColor: "#06D6A0", display: "inline-block",
                boxShadow: "0 0 8px rgba(6,214,160,0.65)",
              }} />
              <span style={{
                fontFamily: "var(--font-ui)", fontSize: 13, fontWeight: 500,
                color: "#34D399", letterSpacing: "0.04em",
              }}>
                EdTech Solutions for Institutions
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontSize: "clamp(38px,5vw,68px)", fontWeight: 700,
                lineHeight: 1.06, color: "#E2E8F0",
                margin: 0, marginBottom: 24, letterSpacing: "-0.025em",
              }}
            >
              Build an{" "}
              <span style={{
                fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 700,
              }}>
                institution
              </span>
              <br />
              <span className="hero-highlight-text">ready for anything.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                fontFamily: "var(--font-body)", fontSize: 18, color: "#64748B",
                lineHeight: 1.75, margin: 0, marginBottom: 40, maxWidth: 500,
              }}
            >
              Management systems, animated lessons, game-based learning, and
              digital transformation — one partner, every solution.
            </motion.p>

            {/* CTA row — foreground parallax (fastest scroll) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{ y: fgY }}   /* ← fast parallax like the mascot */
            >
              <div style={{
                display: "flex", gap: 16, flexWrap: "wrap",
                alignItems: "center", marginBottom: 48,
              }}>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                   className="hero-cta-glow">
                  💬 Get a Free Consultation
                </a>
                <a href="#results" className="hero-cta-ghost">
                  Learn more <span style={{ fontSize: 14 }}>↓</span>
                </a>
              </div>

              {/* Pillar Cards */}
              <div className="hero-pillar-row">
                {PILLAR_CARDS.map((card) => (
                  <PillarCardUI key={card.id} card={card} />
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── Right Column: 2.5D Command Center ── */}
          <div
            className="hero-scene hidden md:block"
            style={{ position: "relative", perspective: "1500px" }}
          >
            {/* FOREGROUND: Mascot — outside preserve-3d so it pops crisp */}
            <motion.div
              className="hero-mascot-layer"
              style={{
                position: "absolute", zIndex: 10,
                y: fgY, rotateX: mascotRotX, rotateY: mascotRotY,
              }}
            >
              <motion.div
                className="hero-mascot"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <CubicoMascot />
              </motion.div>
            </motion.div>

            {/* 2.5D STAGE — tilted command center with preserve-3d */}
            <motion.div
              style={{
                position: "relative", zIndex: 2,
                y: dashY,
                rotateX: dashRotX2D,
                rotateY: dashRotY2D,
                transformStyle: "preserve-3d" as const,
              }}
            >
              {/* Dashboard surface — base Z: 0 (no overflow:hidden so children can pop) */}
              <div className="hero-dash-surface">

                {/* Window bar — Z: 8px */}
                <div className="hero-dash-bar"
                     style={{ transform: "translateZ(8px)", position: "relative" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
                      <div key={i} style={{
                        width: 10, height: 10, borderRadius: "50%", backgroundColor: c,
                      }} />
                    ))}
                  </div>
                  <span style={{ fontFamily: "var(--font-ui)", fontSize: 12, color: "#4B5563" }}>
                    Cubico Campus
                  </span>
                  {/* Data-current endpoint: LMS Live badge */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.8, duration: 0.5 }}
                    style={{
                      display: "flex", alignItems: "center", gap: 4,
                      background: "rgba(6,214,160,0.08)",
                      border: "1px solid rgba(6,214,160,0.2)",
                      borderRadius: 20, padding: "2px 8px",
                    }}
                  >
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1], scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      style={{
                        width: 5, height: 5, borderRadius: "50%",
                        background: "#06D6A0",
                        boxShadow: "0 0 6px rgba(6,214,160,0.8)",
                      }}
                    />
                    <span style={{
                      fontFamily: "var(--font-ui)", fontSize: 9,
                      color: "rgba(6,214,160,0.8)", whiteSpace: "nowrap" as const,
                    }}>LMS · PK · SA · CA</span>
                  </motion.div>
                </div>

                {/* Stat cards — Z: 50px (float above surface) */}
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 8, padding: "14px 14px 6px",
                  transform: "translateZ(50px)", position: "relative",
                }}>
                  {STATS.map((s, i) => (
                    <StatCard key={s.label} s={s} delay={800 + i * 120} />
                  ))}
                </div>

                {/* Chart — Z: 25px */}
                <div style={{ padding: "6px 14px 10px",
                              transform: "translateZ(25px)", position: "relative" }}>
                  <div style={{
                    fontFamily: "var(--font-ui)", fontSize: 10, color: "#64748B",
                    marginBottom: 8, fontWeight: 500,
                  }}>Weekly Engagement</div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 52 }}>
                    {CHART_BARS.map((h, i) => (
                      <div key={i} style={{
                        flex: 1, display: "flex", flexDirection: "column",
                        alignItems: "center", gap: 3,
                      }}>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: Math.round((h / 100) * 42) }}
                          transition={{ delay: 0.9 + i * 0.08, duration: 0.5 }}
                          style={{
                            width: "100%", borderRadius: "3px 3px 0 0",
                            background: i === 3
                              ? "linear-gradient(180deg,#06D6A0,#059669)"
                              : "rgba(6,214,160,0.2)",
                          }}
                        />
                        <div style={{ fontFamily: "var(--font-ui)", fontSize: 7, color: "#4B5563" }}>
                          {CHART_DAYS[i]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notification chips — Z: 90px (highest chip layer) */}
                <div style={{
                  padding: "0 14px 14px", display: "flex", gap: 6,
                  transform: "translateZ(90px)", position: "relative",
                }}>
                  {[
                    { icon: "✅", title: "Attendance Synced", sub: "Grade 5-B · Just now",
                      accent: "rgba(6,214,160,0.10)", border: "rgba(6,214,160,0.20)" },
                    { icon: "🎬", title: "New Lesson Ready",  sub: "Arabic Ch.4",
                      accent: "rgba(124,58,237,0.10)", border: "rgba(124,58,237,0.20)" },
                  ].map((n) => (
                    <div key={n.title} style={{
                      flex: 1,
                      background: n.accent,
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: `1px solid ${n.border}`,
                      borderRadius: 8, padding: "8px 10px",
                      display: "flex", alignItems: "center", gap: 6,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                    }}>
                      <span style={{ fontSize: 14 }}>{n.icon}</span>
                      <div>
                        <div style={{
                          fontFamily: "var(--font-ui)", fontSize: 9,
                          fontWeight: 600, color: "#E2E8F0",
                        }}>{n.title}</div>
                        <div style={{
                          fontFamily: "var(--font-ui)", fontSize: 8,
                          color: "#64748B", marginTop: 1,
                        }}>{n.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Floating Parent Portal Phone — Z: 130px ── */}
              <motion.div
                style={{
                  position: "absolute",
                  top: -30, right: -22,
                  transform: "translateZ(130px)",
                  zIndex: 5,
                }}
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
              >
                <ParentPortalPhone />
                {/* Phone glow */}
                <div style={{
                  position: "absolute", inset: -12, borderRadius: 32, zIndex: -1,
                  background: "radial-gradient(ellipse at center, rgba(6,214,160,0.2) 0%, transparent 70%)",
                  filter: "blur(16px)",
                }} />
              </motion.div>

              {/* Ambient glow under stage */}
              <div style={{
                position: "absolute", inset: -24, borderRadius: 32, zIndex: -1,
                background: "radial-gradient(ellipse at center, rgba(6,214,160,0.14) 0%, rgba(79,70,229,0.07) 50%, transparent 70%)",
                filter: "blur(30px)",
              }} />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
