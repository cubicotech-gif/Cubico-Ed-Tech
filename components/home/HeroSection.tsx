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

/* Trust chips that float in the background */
const TRUST_CHIPS = [
  { label: "Active in 3 Countries", x: "8%", y: "18%", delay: 0 },
  { label: "5+ Institutions", x: "75%", y: "12%", delay: 0.8 },
  { label: "99.9% Uptime", x: "82%", y: "72%", delay: 1.6 },
];

/* Global reach nodes (background layer) */
const NODES = [
  { cx: "15%", cy: "30%", label: "PK", flag: "\u{1F1F5}\u{1F1F0}" },
  { cx: "45%", cy: "20%", label: "SA", flag: "\u{1F1F8}\u{1F1E6}" },
  { cx: "78%", cy: "35%", label: "CA", flag: "\u{1F1E8}\u{1F1E6}" },
];

/* Dashboard stat cards */
const STATS = [
  { label: "Students", value: "1,247", change: "+12%", color: "#4F46E5" },
  { label: "Attendance", value: "94.2%", change: "+3.1%", color: "#06D6A0" },
  { label: "Parents Online", value: "89%", change: "+18%", color: "#7C3AED" },
];

const CHART_BARS = [65, 80, 55, 90, 75, 45, 85];
const CHART_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

/* Pillar card data with hover copy */
interface PillarCard {
  id: string;
  icon: string;
  title: string;
  defaultCopy: string;
  hoverCopy: string;
  gradient: string;
  borderColor: string;
}

const PILLAR_CARDS: PillarCard[] = [
  {
    id: "manage",
    icon: "\u{1F3EB}",
    title: "Manage",
    defaultCopy: "Smart Institution Management.",
    hoverCopy:
      "Stop chasing paperwork. From fee collection to parent portals, gain 80% more efficiency with a unified system that actually works.",
    gradient: "linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)",
    borderColor: "rgba(79,70,229,0.4)",
  },
  {
    id: "teach",
    icon: "\u{1F3AC}",
    title: "Teach",
    defaultCopy: "Bring Lessons to Life.",
    hoverCopy:
      "Turn static textbooks into Pixar-style 3D animated adventures. Increase student focus by 3x with native Arabic, Urdu, and English content.",
    gradient: "linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)",
    borderColor: "rgba(124,58,237,0.4)",
  },
  {
    id: "learn",
    icon: "\u{1F3AE}",
    title: "Learn",
    defaultCopy: "Game-Based Learning.",
    hoverCopy:
      "Make students love the challenge. Replace boring tests with gamified STEM modules and real-time progress tracking that parents can see.",
    gradient: "linear-gradient(135deg, #06D6A0 0%, #34D399 100%)",
    borderColor: "rgba(6,214,160,0.4)",
  },
];

/* ─── Stylized Character SVGs ────────────────────────────────────────────── */

function TeacherCharacter() {
  return (
    <svg viewBox="0 0 120 160" fill="none" style={{ width: "100%", height: "100%" }}>
      {/* Body */}
      <ellipse cx="60" cy="145" rx="28" ry="8" fill="rgba(79,70,229,0.15)" />
      <rect x="40" y="70" width="40" height="60" rx="8" fill="url(#teacherBody)" />
      {/* Head */}
      <circle cx="60" cy="50" r="22" fill="url(#teacherSkin)" />
      {/* Hair */}
      <path d="M38 45 Q40 25 60 22 Q80 25 82 45 Q82 38 75 32 Q65 26 55 28 Q42 32 38 45Z" fill="#2D1B69" />
      {/* Glasses */}
      <circle cx="52" cy="48" r="6" stroke="#818CF8" strokeWidth="1.5" fill="none" />
      <circle cx="68" cy="48" r="6" stroke="#818CF8" strokeWidth="1.5" fill="none" />
      <line x1="58" y1="48" x2="62" y2="48" stroke="#818CF8" strokeWidth="1.5" />
      {/* Eyes */}
      <circle cx="52" cy="48" r="2" fill="#1E1B4B" />
      <circle cx="68" cy="48" r="2" fill="#1E1B4B" />
      <circle cx="53" cy="47" r="0.8" fill="white" />
      <circle cx="69" cy="47" r="0.8" fill="white" />
      {/* Smile */}
      <path d="M54 56 Q60 62 66 56" stroke="#C084FC" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Arms */}
      <path d="M40 80 Q25 85 22 100" stroke="url(#teacherBody)" strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M80 80 Q95 78 100 70" stroke="url(#teacherBody)" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* Book in hand */}
      <rect x="94" y="62" width="16" height="12" rx="2" fill="#818CF8" />
      <rect x="96" y="65" width="12" height="1" rx="0.5" fill="white" opacity="0.6" />
      <rect x="96" y="68" width="8" height="1" rx="0.5" fill="white" opacity="0.4" />
      {/* Legs */}
      <rect x="46" y="128" width="10" height="18" rx="4" fill="#1E1B4B" />
      <rect x="64" y="128" width="10" height="18" rx="4" fill="#1E1B4B" />
      {/* Gradients */}
      <defs>
        <linearGradient id="teacherBody" x1="40" y1="70" x2="80" y2="130">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <radialGradient id="teacherSkin">
          <stop offset="0%" stopColor="#FBBF90" />
          <stop offset="100%" stopColor="#E8A06E" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function StudentCharacter() {
  return (
    <svg viewBox="0 0 100 140" fill="none" style={{ width: "100%", height: "100%" }}>
      {/* Shadow */}
      <ellipse cx="50" cy="130" rx="22" ry="6" fill="rgba(6,214,160,0.12)" />
      {/* Body */}
      <rect x="32" y="62" width="36" height="52" rx="8" fill="url(#studentBody)" />
      {/* Head */}
      <circle cx="50" cy="42" r="20" fill="url(#studentSkin)" />
      {/* Hair */}
      <path d="M30 38 Q32 20 50 16 Q68 20 70 38 Q68 28 58 24 Q48 22 38 28 Q32 32 30 38Z" fill="#1E1B4B" />
      {/* Eyes */}
      <circle cx="43" cy="40" r="2.5" fill="#1E1B4B" />
      <circle cx="57" cy="40" r="2.5" fill="#1E1B4B" />
      <circle cx="44" cy="39" r="1" fill="white" />
      <circle cx="58" cy="39" r="1" fill="white" />
      {/* Happy mouth */}
      <path d="M44 49 Q50 56 56 49" stroke="#F472B6" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Arms */}
      <path d="M32 72 Q18 78 15 90" stroke="url(#studentBody)" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M68 72 Q80 70 85 62" stroke="url(#studentBody)" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* Tablet in hand */}
      <rect x="80" y="55" width="14" height="18" rx="2" fill="#0F172A" stroke="#06D6A0" strokeWidth="1" />
      <rect x="82" y="58" width="10" height="8" rx="1" fill="#06D6A0" opacity="0.3" />
      {/* Legs */}
      <rect x="38" y="112" width="9" height="16" rx="4" fill="#0F172A" />
      <rect x="53" y="112" width="9" height="16" rx="4" fill="#0F172A" />
      {/* Backpack strap */}
      <path d="M36 62 Q34 55 36 48" stroke="#06D6A0" strokeWidth="2" strokeLinecap="round" fill="none" />
      <defs>
        <linearGradient id="studentBody" x1="32" y1="62" x2="68" y2="114">
          <stop offset="0%" stopColor="#06D6A0" />
          <stop offset="100%" stopColor="#34D399" />
        </linearGradient>
        <radialGradient id="studentSkin">
          <stop offset="0%" stopColor="#D4A87C" />
          <stop offset="100%" stopColor="#B8865A" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ─── Pillar Card Component ──────────────────────────────────────────────── */

function PillarCardUI({ card }: { card: PillarCard }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: 1,
        minWidth: 0,
        background: "rgba(12,21,40,0.9)",
        backdropFilter: "blur(16px)",
        border: `1px solid ${hovered ? card.borderColor : "rgba(255,255,255,0.06)"}`,
        borderRadius: 14,
        padding: "18px 16px",
        transition: "border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        boxShadow: hovered ? `0 0 30px ${card.borderColor}` : "none",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: card.gradient,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 20 }}>{card.icon}</span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 700,
            color: "#E2E8F0",
          }}
        >
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
            fontFamily: "var(--font-body)",
            fontSize: 13,
            lineHeight: 1.6,
            color: hovered ? "#CBD5E1" : "#64748B",
            margin: 0,
            minHeight: 62,
          }}
        >
          {hovered ? card.hoverCopy : card.defaultCopy}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Hero Section ──────────────────────────────────────────────────── */

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  /* Mouse tracking */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, SPRING_CFG);
  const springY = useSpring(mouseY, SPRING_CFG);

  /* Scroll-based parallax */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Layer transforms — background moves slowest, foreground fastest */
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const fgY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  /* Character rotation from mouse */
  const charRotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const charRotateY = useTransform(springX, [-0.5, 0.5], [-6, 6]);

  /* Dashboard tilt from mouse */
  const dashRotateX = useTransform(springY, [-0.5, 0.5], [3, -3]);
  const dashRotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      className="hero-parallax-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        paddingTop: 72,
      }}
    >
      {/* ═══════════ LAYER 3 — Background ═══════════ */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: bgY,
          zIndex: 0,
        }}
      >
        {/* Deep emerald gradient */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 120% 100% at 50% 0%, #0A2E1F 0%, #061A14 35%, #060A15 70%)",
          }}
        />

        {/* Geometric grid */}
        <div className="hero-geo-grid" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />

        {/* Glowing nodes — global reach */}
        {NODES.map((node) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            style={{
              position: "absolute",
              left: node.cx,
              top: node.cy,
              transform: "translate(-50%, -50%)",
            }}
          >
            {/* Pulse ring */}
            <div className="hero-node-pulse" />
            {/* Core */}
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "radial-gradient(circle, #06D6A0, #059669)",
                boxShadow: "0 0 20px rgba(6,214,160,0.5)",
                position: "relative",
                zIndex: 1,
              }}
            />
            <span
              style={{
                position: "absolute",
                top: 18,
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "var(--font-ui)",
                fontSize: 10,
                color: "rgba(6,214,160,0.7)",
                whiteSpace: "nowrap",
                letterSpacing: "0.08em",
              }}
            >
              {node.flag} {node.label}
            </span>
          </motion.div>
        ))}

        {/* Connection lines between nodes */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }}
        >
          <motion.line
            x1="15%" y1="30%" x2="45%" y2="20%"
            stroke="#06D6A0" strokeWidth="1" strokeDasharray="4 4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          />
          <motion.line
            x1="45%" y1="20%" x2="78%" y2="35%"
            stroke="#06D6A0" strokeWidth="1" strokeDasharray="4 4"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ delay: 1.8, duration: 1 }}
          />
        </svg>

        {/* Ambient glow orbs */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "-5%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,214,160,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "0%",
            right: "-8%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(79,70,229,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </motion.div>

      {/* ═══════════ Trust Chips (floating glass) ═══════════ */}
      {TRUST_CHIPS.map((chip) => (
        <motion.div
          key={chip.label}
          className="hero-trust-chip"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 + chip.delay, duration: 0.7 }}
          style={{
            position: "absolute",
            left: chip.x,
            top: chip.y,
            zIndex: 1,
          }}
        >
          {chip.label}
        </motion.div>
      ))}

      {/* ═══════════ Main Content ═══════════ */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "80px 5%",
          width: "100%",
        }}
      >
        <div className="hero-parallax-grid">
          {/* ── Left Column: Copy + Cards ────────────────────────── */}
          <div style={{ position: "relative", zIndex: 3 }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                backgroundColor: "rgba(6,214,160,0.08)",
                border: "1px solid rgba(6,214,160,0.25)",
                borderRadius: 100,
                padding: "6px 16px",
                marginBottom: 32,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#06D6A0",
                  display: "inline-block",
                  boxShadow: "0 0 8px rgba(6,214,160,0.6)",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#34D399",
                  letterSpacing: "0.04em",
                }}
              >
                EdTech Solutions for Institutions
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{
                fontSize: "clamp(38px, 5vw, 68px)",
                fontWeight: 700,
                lineHeight: 1.06,
                color: "#E2E8F0",
                margin: 0,
                marginBottom: 24,
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
              <span className="hero-highlight-text">ready for anything.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 18,
                color: "#64748B",
                lineHeight: 1.75,
                margin: 0,
                marginBottom: 40,
                maxWidth: 500,
              }}
            >
              Management systems, animated lessons, game-based learning, and
              digital transformation — one partner, every solution.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              style={{
                display: "flex",
                gap: 16,
                flexWrap: "wrap",
                alignItems: "center",
                marginBottom: 48,
              }}
            >
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="hero-cta-glow">
                Get a Free Consultation
              </a>
              <a href="#results" className="hero-cta-ghost">
                Learn more <span style={{ fontSize: 14 }}>&#8595;</span>
              </a>
            </motion.div>

            {/* Pillar Cards Row */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="hero-pillar-row"
            >
              {PILLAR_CARDS.map((card) => (
                <PillarCardUI key={card.id} card={card} />
              ))}
            </motion.div>
          </div>

          {/* ── Right Column: Parallax Scene ────────────────────── */}
          <div
            className="hero-scene hidden md:block"
            style={{ position: "relative", perspective: 1000 }}
          >
            {/* LAYER 1 — Foreground Characters */}
            <motion.div
              style={{
                position: "absolute",
                zIndex: 3,
                y: fgY,
                rotateX: charRotateX,
                rotateY: charRotateY,
              }}
              className="hero-characters-layer"
            >
              {/* Teacher */}
              <motion.div
                className="hero-character hero-teacher"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <TeacherCharacter />
              </motion.div>

              {/* Student */}
              <motion.div
                className="hero-character hero-student"
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
              >
                <StudentCharacter />
              </motion.div>
            </motion.div>

            {/* LAYER 2 — Floating Dashboard */}
            <motion.div
              style={{
                position: "relative",
                zIndex: 2,
                y: midY,
                rotateX: dashRotateX,
                rotateY: dashRotateY,
                transformStyle: "preserve-3d",
              }}
            >
              <div className="hero-dashboard">
                {/* Window bar */}
                <div className="hero-dash-bar">
                  <div style={{ display: "flex", gap: 6 }}>
                    {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
                      <div
                        key={i}
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: c,
                        }}
                      />
                    ))}
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: 12,
                      color: "#4B5563",
                    }}
                  >
                    Cubico Dashboard
                  </span>
                  <div style={{ width: 48 }} />
                </div>

                {/* Stat row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 8,
                    padding: 14,
                  }}
                >
                  {STATS.map((s) => (
                    <div
                      key={s.label}
                      style={{
                        backgroundColor: "rgba(16,30,50,0.8)",
                        borderRadius: 10,
                        padding: "12px 10px",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontSize: 9,
                          color: "#64748B",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          marginBottom: 4,
                        }}
                      >
                        {s.label}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontSize: 20,
                          fontWeight: 700,
                          color: "#E2E8F0",
                          lineHeight: 1,
                        }}
                      >
                        {s.value}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-ui)",
                          fontSize: 10,
                          color: s.color,
                          marginTop: 3,
                        }}
                      >
                        {s.change}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div style={{ padding: "0 14px 14px" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: 10,
                      color: "#64748B",
                      marginBottom: 10,
                      fontWeight: 500,
                    }}
                  >
                    Weekly Engagement
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 4,
                      height: 60,
                    }}
                  >
                    {CHART_BARS.map((h, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: Math.round((h / 100) * 48) }}
                          transition={{ delay: 0.8 + i * 0.08, duration: 0.5 }}
                          style={{
                            width: "100%",
                            borderRadius: "3px 3px 0 0",
                            background:
                              i === 3
                                ? "linear-gradient(180deg, #06D6A0, #059669)"
                                : "rgba(6,214,160,0.2)",
                          }}
                        />
                        <div
                          style={{
                            fontFamily: "var(--font-ui)",
                            fontSize: 8,
                            color: "#4B5563",
                          }}
                        >
                          {CHART_DAYS[i]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notifications */}
                <div style={{ padding: "0 14px 14px", display: "flex", gap: 6 }}>
                  {[
                    {
                      icon: "\u2705",
                      title: "Attendance Synced",
                      sub: "Grade 5-B \u00B7 Just now",
                    },
                    {
                      icon: "\u{1F3AC}",
                      title: "New Lesson Ready",
                      sub: "Arabic Grammar Ch.4",
                    },
                  ].map((n) => (
                    <div
                      key={n.title}
                      style={{
                        flex: 1,
                        backgroundColor: "rgba(10,16,32,0.8)",
                        border: "1px solid rgba(255,255,255,0.05)",
                        borderRadius: 8,
                        padding: "8px 10px",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <span style={{ fontSize: 14 }}>{n.icon}</span>
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-ui)",
                            fontSize: 9,
                            fontWeight: 600,
                            color: "#E2E8F0",
                          }}
                        >
                          {n.title}
                        </div>
                        <div
                          style={{
                            fontFamily: "var(--font-ui)",
                            fontSize: 8,
                            color: "#64748B",
                            marginTop: 1,
                          }}
                        >
                          {n.sub}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dashboard ambient glow */}
              <div
                style={{
                  position: "absolute",
                  inset: -20,
                  borderRadius: 32,
                  zIndex: -1,
                  background:
                    "radial-gradient(ellipse at center, rgba(6,214,160,0.15) 0%, rgba(79,70,229,0.08) 50%, transparent 70%)",
                  filter: "blur(30px)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
