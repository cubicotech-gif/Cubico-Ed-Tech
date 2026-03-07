"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────── */
/*  CONSTANTS                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */
const WA_LINK =
  "https://wa.me/923001234567?text=Hi%20Cubico!%20I'm%20interested%20in%20learning%20about%20your%20EdTech%20solutions%20for%20our%20institution.";

/* ─────────────────────────────────────────────────────────────────────────── */
/*  PARTICLE SYSTEM                                                             */
/* ─────────────────────────────────────────────────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
}

function ParticleField() {
  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 48 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 2.5,
      opacity: 0.15 + Math.random() * 0.35,
      duration: 8 + Math.random() * 16,
      delay: -Math.random() * 20,
      driftX: (Math.random() - 0.5) * 60,
      driftY: -(20 + Math.random() * 60),
    }));
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 3 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(191,168,255,${p.opacity}) 0%, rgba(255,43,122,${p.opacity * 0.5}) 100%)`,
            boxShadow: `0 0 ${p.size * 2}px rgba(191,168,255,${p.opacity * 0.8})`,
          }}
          animate={{
            x: [0, p.driftX, 0],
            y: [0, p.driftY, 0],
            opacity: [0, p.opacity, p.opacity * 0.5, 0],
            scale: [0.8, 1.2, 0.9],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  ANALYTICS MINI CHART (SVG line chart)                                      */
/* ─────────────────────────────────────────────────────────────────────────── */
function MiniLineChart({ color, data }: { color: string; data: number[] }) {
  const w = 80, h = 32;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`)
    .join(" ");
  const area = `${pts} ${w},${h} 0,${h}`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id={`lineGrad-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#lineGrad-${color.replace("#","")})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  BAR CHART                                                                  */
/* ─────────────────────────────────────────────────────────────────────────── */
function BarChart({ active }: { active: boolean }) {
  const bars = [
    { label: "Mon", value: 65, color: "#7B3EFF" },
    { label: "Tue", value: 80, color: "#FF2B7A" },
    { label: "Wed", value: 55, color: "#7B3EFF" },
    { label: "Thu", value: 92, color: "#FF2B7A" },
    { label: "Fri", value: 78, color: "#7B3EFF" },
    { label: "Sat", value: 45, color: "#3EC7FF" },
    { label: "Sun", value: 60, color: "#3EC7FF" },
  ];

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 48 }}>
      {bars.map(({ label, value, color }, i) => (
        <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
          <motion.div
            style={{
              width: "100%",
              background: `linear-gradient(to top, ${color}80, ${color})`,
              borderRadius: "3px 3px 0 0",
              maxHeight: 40,
            }}
            initial={{ height: 0 }}
            animate={{ height: active ? `${value * 0.4}%` : 0 }}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.06, ease: "easeOut" }}
          />
          <div style={{ fontSize: 5.5, color: "rgba(191,168,255,0.4)", marginTop: 2 }}>{label}</div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MACBOOK DASHBOARD SCREEN                                                   */
/* ─────────────────────────────────────────────────────────────────────────── */
function MacBookDashboard({ active }: { active: boolean }) {
  const [, forceUpdate] = useState(0);
  const liveData = useRef([82, 75, 88, 65, 90, 78, 85, 92, 70, 88]);

  useEffect(() => {
    if (!active) return;
    const iv = setInterval(() => {
      liveData.current = liveData.current.map(v =>
        Math.min(100, Math.max(40, v + (Math.random() - 0.5) * 8))
      );
      forceUpdate(x => x + 1);
    }, 2200);
    return () => clearInterval(iv);
  }, [active]);

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "#0D0019",
      display: "flex",
      overflow: "hidden",
      fontFamily: "'Inter', var(--font-ui), sans-serif",
    }}>
      {/* Sidebar */}
      <div style={{
        width: 48,
        background: "rgba(255,255,255,0.02)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "12px 0",
        gap: 12,
        flexShrink: 0,
      }}>
        {/* Logo */}
        <div style={{
          width: 24,
          height: 24,
          borderRadius: 6,
          background: "linear-gradient(135deg, #FF2B7A, #7B3EFF)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 10, fontWeight: 900, color: "#fff",
        }}>C</div>
        <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.04)" }} />
        {/* Nav icons */}
        {["⊞", "📊", "👥", "🎓", "📅", "⚙️"].map((icon, i) => (
          <div key={i} style={{
            width: 28, height: 28, borderRadius: 6,
            background: i === 0 ? "rgba(123,62,255,0.2)" : "transparent",
            border: i === 0 ? "1px solid rgba(123,62,255,0.3)" : "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10,
          }}>{icon}</div>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{
          height: 28,
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 8,
          flexShrink: 0,
        }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ fontSize: 7.5, fontWeight: 600, color: "rgba(191,168,255,0.7)" }}>Cubico Dashboard</div>
            <div style={{ fontSize: 6, color: "rgba(255,255,255,0.2)" }}>/ Analytics</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              fontSize: 6, padding: "2px 6px", borderRadius: 4,
              background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)", color: "#22c55e",
            }}>● Live</div>
            <div style={{ display: "flex" }}>
              {["#FF2B7A","#7B3EFF","#3EC7FF"].map((c, i) => (
                <div key={i} style={{
                  width: 14, height: 14, borderRadius: "50%", background: c,
                  border: "1.5px solid #0D0019", marginLeft: i > 0 ? -4 : 0,
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div style={{ flex: 1, padding: "8px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "auto 1fr", gap: 6, overflow: "hidden" }}>
          {/* Stat cards */}
          {[
            { label: "Performance Score", value: "82%", delta: "+12%", color: "#7B3EFF", data: [60,65,70,68,75,78,82] },
            { label: "Student Engagement", value: "+23%", delta: "↑ from last week", color: "#FF2B7A", data: [40,50,55,60,65,70,78] },
            { label: "Lesson Completion", value: "94%", delta: "+41% MoM", color: "#3EC7FF", data: [70,72,75,80,85,90,94] },
          ].map(({ label, value, delta, color, data }) => (
            <div key={label} style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(12px)",
              border: `1px solid ${color}20`,
              borderRadius: 10,
              padding: "8px 10px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              position: "relative",
              overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: -15, right: -15, width: 50, height: 50, borderRadius: "50%", background: `${color}15`, filter: "blur(12px)" }} />
              <div style={{ fontSize: 6, color: "rgba(191,168,255,0.5)", letterSpacing: "0.05em" }}>{label.toUpperCase()}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: 6, color: "rgba(191,168,255,0.4)" }}>{delta}</div>
              <MiniLineChart color={color} data={data} />
            </div>
          ))}

          {/* Bar chart card */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(191,168,255,0.08)",
            borderRadius: 10,
            padding: "8px 10px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontSize: 6, color: "rgba(191,168,255,0.5)", letterSpacing: "0.05em" }}>WEEKLY ACTIVITY</div>
              <div style={{ fontSize: 6, color: "#7B3EFF" }}>This Week</div>
            </div>
            <BarChart active={active} />
          </div>

          {/* Activity feed */}
          <div style={{
            gridColumn: "2 / span 2",
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(191,168,255,0.06)",
            borderRadius: 10,
            padding: "8px 10px",
            overflow: "hidden",
          }}>
            <div style={{ fontSize: 6, color: "rgba(191,168,255,0.5)", letterSpacing: "0.05em", marginBottom: 6 }}>RECENT ACTIVITY</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {[
                { user: "Aisha K.", action: "Completed Algebra Quest", time: "2m ago", color: "#FF2B7A" },
                { user: "Omar S.", action: "Unlocked Science Badge", time: "8m ago", color: "#7B3EFF" },
                { user: "Fatima R.", action: "Parent report viewed", time: "14m ago", color: "#3EC7FF" },
                { user: "Zaid M.", action: "Joined Live Lesson", time: "21m ago", color: "#22c55e" },
              ].map(({ user, action, time, color }, i) => (
                <motion.div
                  key={user}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: active ? 1 : 0, x: 0 }}
                  transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                >
                  <div style={{
                    width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                    background: `linear-gradient(135deg, ${color}60, ${color}20)`,
                    border: `1px solid ${color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 7, color,
                  }}>
                    {user[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 7, fontWeight: 600, color: "rgba(240,236,255,0.8)" }}>{user} </span>
                    <span style={{ fontSize: 7, color: "rgba(168,157,196,0.6)" }}>{action}</span>
                  </div>
                  <div style={{ fontSize: 6, color: "rgba(107,94,133,0.6)", flexShrink: 0 }}>{time}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  MACBOOK PRO MOCKUP                                                         */
/* ─────────────────────────────────────────────────────────────────────────── */
function MacBookPro({ active, floatY }: { active: boolean; floatY: number }) {
  const W = 520, H = 320;
  const bezelH = 24;
  const screenW = W - 24, screenH = H - bezelH - 30;

  return (
    <div style={{ position: "relative", width: W, flexShrink: 0 }}>
      {/* Glow beneath device */}
      <div style={{
        position: "absolute",
        bottom: -30,
        left: "15%",
        right: "15%",
        height: 60,
        background: "radial-gradient(ellipse, rgba(123,62,255,0.5) 0%, rgba(255,43,122,0.3) 50%, transparent 80%)",
        filter: "blur(20px)",
        zIndex: 0,
      }} />

      <motion.div
        animate={{ y: floatY }}
        transition={{ duration: 0, ease: "linear" }}
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Lid (screen area) */}
        <div style={{
          background: "linear-gradient(180deg, #2A2A2E 0%, #1C1C1F 100%)",
          borderRadius: "14px 14px 0 0",
          padding: "10px 12px 0",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.06) inset, " +
            "0 1px 0 rgba(255,255,255,0.12) inset, " +
            "0 80px 120px rgba(0,0,0,0.7), " +
            "0 40px 60px rgba(123,62,255,0.2)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Subtle lid shine */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "40%",
            background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
            borderRadius: "14px 14px 0 0",
            pointerEvents: "none",
          }} />

          {/* Camera notch */}
          <div style={{
            position: "absolute", top: 4, left: "50%", transform: "translateX(-50%)",
            width: 6, height: 6, borderRadius: "50%",
            background: "#111", border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 0 0 1.5px rgba(0,0,0,0.5)",
          }} />

          {/* Screen bezel */}
          <div style={{
            background: "#000",
            borderRadius: "6px 6px 0 0",
            overflow: "hidden",
            position: "relative",
            height: screenH,
          }}>
            {/* Screen inner shadow */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none",
              boxShadow: "inset 0 0 20px rgba(0,0,0,0.6), inset 0 0 2px rgba(0,0,0,0.8)",
              borderRadius: "6px 6px 0 0",
            }} />
            {/* Glass reflection */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "30%", zIndex: 9,
              background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)",
              pointerEvents: "none",
            }} />
            <MacBookDashboard active={active} />
          </div>
        </div>

        {/* Base / palm rest */}
        <div style={{
          background: "linear-gradient(180deg, #323234 0%, #252527 60%, #1A1A1C 100%)",
          height: 22,
          borderRadius: "0 0 4px 4px",
          boxShadow: "0 1px 0 rgba(255,255,255,0.08) inset",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Hinge line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "rgba(0,0,0,0.5)",
          }} />
          {/* Trackpad hint */}
          <div style={{
            position: "absolute", bottom: 4, left: "50%", transform: "translateX(-50%)",
            width: 60, height: 8, borderRadius: 3,
            background: "rgba(255,255,255,0.04)",
            border: "0.5px solid rgba(255,255,255,0.06)",
          }} />
        </div>

        {/* Stand / foot */}
        <div style={{
          background: "linear-gradient(180deg, #1C1C1F 0%, #141416 100%)",
          height: 8,
          borderRadius: "0 0 8px 8px",
          clipPath: "polygon(3% 0%, 97% 0%, 100% 100%, 0% 100%)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
        }} />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  IPHONE SCREEN                                                              */
/* ─────────────────────────────────────────────────────────────────────────── */
function IPhoneContent() {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: "linear-gradient(160deg, #0D0019 0%, #1A0032 100%)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      fontFamily: "'Inter', var(--font-ui), sans-serif",
    }}>
      {/* Status bar */}
      <div style={{
        padding: "10px 12px 6px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexShrink: 0,
      }}>
        <div style={{ fontSize: 8, fontWeight: 700, color: "rgba(240,236,255,0.9)" }}>9:41</div>
        <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
          <div style={{ width: 10, height: 6, border: "1px solid rgba(255,255,255,0.4)", borderRadius: 2, position: "relative" }}>
            <div style={{ position: "absolute", inset: 1, right: 2, background: "rgba(255,255,255,0.7)", borderRadius: 1 }} />
          </div>
          <div style={{ fontSize: 6 }}>📶</div>
        </div>
      </div>

      {/* App header */}
      <div style={{ padding: "0 14px 8px", flexShrink: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#F0ECFF" }}>Parent Portal</div>
        <div style={{ fontSize: 7.5, color: "rgba(168,157,196,0.6)" }}>Term 2 · Week 18</div>
      </div>

      {/* Child card */}
      <div style={{ padding: "0 12px", flexShrink: 0 }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(123,62,255,0.25), rgba(255,43,122,0.15))",
          border: "1px solid rgba(123,62,255,0.3)",
          borderRadius: 14,
          padding: "12px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #FF2B7A, #7B3EFF)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 16, border: "2px solid rgba(255,255,255,0.2)",
            flexShrink: 0,
          }}>👧</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 9, fontWeight: 700, color: "#F0ECFF" }}>Aisha K.</div>
            <div style={{ fontSize: 7, color: "rgba(168,157,196,0.7)" }}>Grade 7 · Section A</div>
            <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
              <span style={{ fontSize: 6.5, color: "#22c55e", background: "rgba(34,197,94,0.12)", padding: "1px 5px", borderRadius: 3 }}>97% Attend.</span>
              <span style={{ fontSize: 6.5, color: "#3EC7FF", background: "rgba(62,199,255,0.12)", padding: "1px 5px", borderRadius: 3 }}>A+ Avg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subject progress */}
      <div style={{ padding: "8px 12px", flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ fontSize: 7.5, fontWeight: 600, color: "rgba(191,168,255,0.6)", letterSpacing: "0.06em", marginBottom: 2 }}>
          SUBJECT PROGRESS
        </div>
        {[
          { subject: "Mathematics", pct: 91, color: "#7B3EFF", icon: "📐" },
          { subject: "Science", pct: 84, color: "#3EC7FF", icon: "🔬" },
          { subject: "Arabic", pct: 96, color: "#FF2B7A", icon: "📖" },
          { subject: "English", pct: 79, color: "#22c55e", icon: "✏️" },
        ].map(({ subject, pct, color, icon }) => (
          <div key={subject}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ fontSize: 8 }}>{icon}</span>
                <span style={{ fontSize: 7.5, color: "rgba(240,236,255,0.75)" }}>{subject}</span>
              </div>
              <span style={{ fontSize: 7.5, fontWeight: 700, color }}>{pct}%</span>
            </div>
            <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
              <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(90deg, ${color}80, ${color})`, borderRadius: 2 }} />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom notification */}
      <div style={{
        margin: "0 12px 12px",
        padding: "8px 10px",
        borderRadius: 10,
        background: "rgba(255,43,122,0.1)",
        border: "1px solid rgba(255,43,122,0.25)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexShrink: 0,
      }}>
        <span style={{ fontSize: 14 }}>🔔</span>
        <div>
          <div style={{ fontSize: 7.5, fontWeight: 700, color: "#FF2B7A" }}>New Report Card</div>
          <div style={{ fontSize: 6.5, color: "rgba(168,157,196,0.6)" }}>Term 2 results ready</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  IPHONE PRO MOCKUP                                                          */
/* ─────────────────────────────────────────────────────────────────────────── */
function IPhonePro({ floatY }: { floatY: number }) {
  const W = 120, H = 240;

  return (
    <div style={{ position: "relative", width: W, flexShrink: 0 }}>
      {/* Glow */}
      <div style={{
        position: "absolute",
        bottom: -20,
        left: "50%",
        transform: "translateX(-50%)",
        width: "140%",
        height: 40,
        background: "radial-gradient(ellipse, rgba(255,43,122,0.45) 0%, transparent 70%)",
        filter: "blur(12px)",
        zIndex: 0,
      }} />

      <motion.div
        animate={{ y: floatY }}
        transition={{ duration: 0, ease: "linear" }}
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Body */}
        <div style={{
          background: "linear-gradient(165deg, #2C2C2E 0%, #1C1C1E 50%, #141416 100%)",
          borderRadius: 22,
          padding: 4,
          boxShadow:
            "0 0 0 0.5px rgba(255,255,255,0.08) inset, " +
            "1px 1px 0 rgba(255,255,255,0.06) inset, " +
            "0 40px 80px rgba(0,0,0,0.7), " +
            "0 20px 40px rgba(255,43,122,0.15)",
          position: "relative",
        }}>
          {/* Side buttons */}
          <div style={{
            position: "absolute", left: -2, top: 50, width: 2, height: 20,
            background: "rgba(255,255,255,0.1)", borderRadius: 1,
          }} />
          <div style={{
            position: "absolute", left: -2, top: 76, width: 2, height: 14,
            background: "rgba(255,255,255,0.1)", borderRadius: 1,
          }} />
          <div style={{
            position: "absolute", right: -2, top: 60, width: 2, height: 26,
            background: "rgba(255,255,255,0.1)", borderRadius: 1,
          }} />

          {/* Screen */}
          <div style={{
            background: "#000",
            borderRadius: 19,
            overflow: "hidden",
            position: "relative",
            height: H - 8,
          }}>
            {/* Dynamic island */}
            <div style={{
              position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)",
              width: 36, height: 10, borderRadius: 8,
              background: "#000",
              border: "1px solid rgba(255,255,255,0.08)",
              zIndex: 20,
            }} />
            {/* Screen inner shadow */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none",
              boxShadow: "inset 0 0 12px rgba(0,0,0,0.7)",
            }} />
            {/* Glass reflection */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "25%", zIndex: 9,
              background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
              pointerEvents: "none",
            }} />
            <IPhoneContent />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  FLOATING UI CARDS                                                          */
/* ─────────────────────────────────────────────────────────────────────────── */
interface FloatCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  delay?: number;
  duration?: number;
  yRange?: number;
}
function FloatCard({ children, style, delay = 0, duration = 6, yRange = 10 }: FloatCardProps) {
  return (
    <motion.div
      style={{
        background: "rgba(13,0,25,0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(191,168,255,0.12)",
        borderRadius: 14,
        boxShadow: "0 16px 48px rgba(0,0,0,0.5), 0 0 24px rgba(123,62,255,0.08)",
        position: "absolute",
        ...style,
      }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -yRange, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.6 },
        scale: { delay, duration: 0.6 },
        y: { delay: delay + 0.6, duration, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/*  HERO SECTION (MAIN)                                                        */
/* ─────────────────────────────────────────────────────────────────────────── */
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /* Parallax layers */
  const bgY       = useTransform(scrollYProgress, [0, 1], ["0%",  "20%"]);
  const contentY  = useTransform(scrollYProgress, [0, 1], ["0%",  "8%"]);
  const devicesY  = useTransform(scrollYProgress, [0, 1], ["0%",  "12%"]);

  /* Mouse parallax */
  const rawMX = useMotionValue(0);
  const rawMY = useMotionValue(0);
  const spMX  = useSpring(rawMX, { stiffness: 50, damping: 18 });
  const spMY  = useSpring(rawMY, { stiffness: 50, damping: 18 });
  const devRotY  = useTransform(spMX, [-0.5, 0.5], [-5, 5]);
  const devRotX  = useTransform(spMY, [-0.5, 0.5], [3, -3]);

  /* Floating animation tick */
  const [tick, setTick] = useState(0);
  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const loop = (ts: number) => {
      if (!start) start = ts;
      setTick((ts - start) / 1000);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  /* Derived float offsets — smooth sine waves */
  const macY   = Math.sin(tick * (2 * Math.PI) / 6) * 12;
  const iphY   = Math.sin((tick * (2 * Math.PI) / 6) + 1.2) * 10;

  /* Active state (counters) */
  const [active, setActive] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setActive(true), 600);
    return () => clearTimeout(t);
  }, []);

  /* Mouse handler */
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      rawMX.set(e.clientX / window.innerWidth - 0.5);
      rawMY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [rawMX, rawMY]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#0A0014",
        display: "flex",
        alignItems: "center",
        paddingTop: 96,
        paddingBottom: 80,
      }}
    >
      {/* ══════════════════════════════════════════════════════════════
          LAYER 1 — NOISE/GRAIN OVERLAY
      ══════════════════════════════════════════════════════════════ */}
      <svg
        style={{ position: "absolute", inset: 0, zIndex: 99, pointerEvents: "none", opacity: 0.035 }}
        width="100%"
        height="100%"
      >
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 2 — ANIMATED GRADIENT MESH
      ══════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          y: bgY,
          pointerEvents: "none",
        }}
      >
        {/* Animated CSS gradient mesh */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 30%, rgba(123,31,162,0.55) 0%, transparent 45%), " +
              "radial-gradient(circle at 80% 20%, rgba(194,24,91,0.45) 0%, transparent 45%), " +
              "radial-gradient(circle at 60% 80%, rgba(81,45,168,0.4) 0%, transparent 50%), " +
              "radial-gradient(circle at 10% 90%, rgba(136,14,79,0.35) 0%, transparent 40%), " +
              "radial-gradient(circle at 50% 50%, rgba(45,0,79,0.6) 0%, transparent 65%)",
            backgroundSize: "200% 200%",
            animation: "gradMeshDrift 20s ease-in-out infinite alternate",
          }}
        />
        {/* Ambient studio light */}
        <div style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "70%",
          background: "radial-gradient(ellipse at center, rgba(255,80,160,0.22) 0%, rgba(123,62,255,0.12) 40%, transparent 70%)",
          filter: "blur(60px)",
        }} />

        {/* Large abstract blob shapes */}
        <div style={{
          position: "absolute",
          top: "15%",
          left: "30%",
          width: 600,
          height: 500,
          borderRadius: "60% 40% 55% 45% / 50% 60% 40% 55%",
          background: "linear-gradient(135deg, rgba(123,62,255,0.18), rgba(255,43,122,0.12))",
          filter: "blur(80px)",
          mixBlendMode: "screen",
          animation: "blobRotate 30s linear infinite",
        }} />
        <div style={{
          position: "absolute",
          bottom: "5%",
          right: "20%",
          width: 400,
          height: 400,
          borderRadius: "45% 55% 60% 40% / 55% 45% 55% 45%",
          background: "linear-gradient(225deg, rgba(62,199,255,0.14), rgba(123,62,255,0.1))",
          filter: "blur(80px)",
          mixBlendMode: "screen",
          animation: "blobRotate 25s linear infinite reverse",
        }} />

        {/* Grid overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(123,62,255,0.05) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(123,62,255,0.05) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black 0%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black 0%, transparent 80%)",
        }} />
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 3 — PARTICLE FIELD
      ══════════════════════════════════════════════════════════════ */}
      <ParticleField />

      {/* ══════════════════════════════════════════════════════════════
          LAYER 4 — MAIN CONTENT (two-column)
      ══════════════════════════════════════════════════════════════ */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          width: "100%",
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          gap: 48,
          alignItems: "center",
        }}
      >
        {/* ──────────────────────────────── LEFT: COPY ──────────────────────────────── */}
        <motion.div
          style={{ y: contentY }}
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 28,
              padding: "7px 16px",
              borderRadius: 100,
              background: "rgba(255,43,122,0.08)",
              border: "1px solid rgba(255,43,122,0.22)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span style={{
              display: "inline-flex",
              width: 6, height: 6, borderRadius: "50%",
              background: "#FF2B7A",
              boxShadow: "0 0 8px #FF2B7A",
              animation: "livePulse 2s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "var(--font-ui)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: "#FF2B7A",
            }}>
              Trusted by 500+ Institutions
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            style={{
              fontFamily: "'DM Serif Display', var(--font-display), Georgia, serif",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#F0ECFF",
              marginBottom: 24,
            }}
          >
            Build a school
            <br />
            <span style={{
              background: "linear-gradient(120deg, #FF2B7A 0%, #C90A6D 30%, #7B3EFF 65%, #3EC7FF 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontStyle: "italic",
            }}>
              ready for anything.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              fontFamily: "'Inter', var(--font-body), sans-serif",
              fontSize: "clamp(15px, 1.7vw, 18px)",
              lineHeight: 1.72,
              color: "rgba(168,157,196,0.9)",
              maxWidth: 460,
              marginBottom: 40,
            }}
          >
            AI-powered learning tools, animated lessons, and game-based
            curricula — designed to unlock student potential and drive
            measurable institutional performance.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.44 }}
            style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" as const }}
          >
            {/* Primary — pill gradient */}
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 30px",
                borderRadius: 100,
                background: "linear-gradient(135deg, #FF2B7A 0%, #C90A6D 40%, #7B3EFF 100%)",
                color: "#fff",
                fontFamily: "'Inter', var(--font-ui), sans-serif",
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                boxShadow: "0 0 30px rgba(255,43,122,0.4), 0 0 60px rgba(123,62,255,0.15)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Shimmer overlay */}
              <motion.div
                style={{
                  position: "absolute",
                  top: 0, left: "-100%",
                  width: "60%",
                  height: "100%",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                  transform: "skewX(-20deg)",
                }}
                animate={{ left: ["−100%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
              />
              Request a Demo
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 16 16">
                <path d="M3 8h10M8 3l5 5-5 5" />
              </svg>
            </motion.a>

            {/* Secondary */}
            <motion.a
              href="#pillars"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "14px 24px",
                borderRadius: 100,
                border: "1px solid rgba(191,168,255,0.22)",
                color: "rgba(191,168,255,0.85)",
                fontFamily: "'Inter', var(--font-ui), sans-serif",
                fontWeight: 500,
                fontSize: 15,
                textDecoration: "none",
                background: "rgba(123,62,255,0.06)",
                backdropFilter: "blur(8px)",
                transition: "border-color 0.2s, background 0.2s",
              }}
            >
              Explore Platform
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 16 16">
                <path d="M8 3l5 5-5 5M13 8H3" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Social proof stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            style={{ display: "flex", gap: 0, marginTop: 52 }}
          >
            {[
              { num: "500+", label: "Institutions" },
              { num: "80K+", label: "Students" },
              { num: "≤4 Wk", label: "Deployment" },
              { num: "3", label: "Countries" },
            ].map(({ num, label }, i) => (
              <div
                key={label}
                style={{
                  flex: 1,
                  borderLeft: i > 0 ? "1px solid rgba(191,168,255,0.1)" : "none",
                  paddingLeft: i > 0 ? 24 : 0,
                }}
              >
                <div style={{
                  fontFamily: "'DM Serif Display', var(--font-display), Georgia, serif",
                  fontSize: 28,
                  fontWeight: 400,
                  color: "#F0ECFF",
                  lineHeight: 1,
                  marginBottom: 4,
                }}>
                  {num}
                </div>
                <div style={{ fontSize: 11.5, color: "rgba(107,94,133,0.8)", fontFamily: "'Inter', var(--font-ui)" }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ──────────────────────────────── RIGHT: DEVICES ──────────────────────────────── */}
        <motion.div
          style={{ y: devicesY, position: "relative", display: "flex", justifyContent: "center" }}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* 3D tilt wrapper for mouse parallax */}
          <motion.div
            style={{
              rotateX: devRotX,
              rotateY: devRotY,
              transformStyle: "preserve-3d" as const,
              perspective: 1200,
              position: "relative",
              width: "100%",
              minHeight: 480,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* MacBook — slightly angled */}
            <div style={{
              transform: "perspective(1200px) rotateY(-8deg)",
              transformOrigin: "center center",
            }}>
              <MacBookPro active={active} floatY={macY} />
            </div>

            {/* iPhone — overlapping right side */}
            <div style={{
              position: "absolute",
              right: "-4%",
              bottom: 20,
              transform: "perspective(1200px) rotateY(12deg)",
              transformOrigin: "center center",
              zIndex: 20,
            }}>
              <IPhonePro floatY={iphY} />
            </div>

            {/* ─── FLOATING UI CARDS ─── */}

            {/* Performance Score card — top left */}
            <FloatCard
              delay={0.9}
              duration={5.5}
              yRange={8}
              style={{ top: -20, left: -60, padding: "12px 16px", zIndex: 30, minWidth: 148 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10,
                  background: "linear-gradient(135deg, rgba(123,62,255,0.3), rgba(123,62,255,0.1))",
                  border: "1px solid rgba(123,62,255,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 15,
                }}>📈</div>
                <div>
                  <div style={{ fontSize: 10, color: "rgba(191,168,255,0.5)", fontFamily: "var(--font-ui)", letterSpacing: "0.06em" }}>PERFORMANCE</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#7B3EFF", fontFamily: "var(--font-display)", lineHeight: 1 }}>82%</div>
                </div>
              </div>
              <div style={{ marginTop: 8 }}>
                <MiniLineChart color="#7B3EFF" data={[60,65,70,73,75,79,82]} />
              </div>
            </FloatCard>

            {/* Live students badge — top right */}
            <FloatCard
              delay={1.1}
              duration={6}
              yRange={10}
              style={{ top: 30, right: -28, padding: "10px 14px", zIndex: 30 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ position: "relative" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px #22c55e" }} />
                  <div style={{
                    position: "absolute", inset: -3,
                    borderRadius: "50%",
                    border: "2px solid rgba(34,197,94,0.3)",
                    animation: "livePulse 2s ease-out infinite",
                  }} />
                </div>
                <div>
                  <div style={{ fontSize: 10, color: "rgba(191,168,255,0.5)", fontFamily: "var(--font-ui)" }}>LIVE NOW</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#F0ECFF", fontFamily: "var(--font-display)" }}>2,847 Students</div>
                </div>
              </div>
            </FloatCard>

            {/* Lesson completion — bottom left */}
            <FloatCard
              delay={1.3}
              duration={7}
              yRange={7}
              style={{ bottom: 60, left: -50, padding: "12px 16px", zIndex: 30, minWidth: 160 }}
            >
              <div style={{ fontSize: 9, color: "rgba(191,168,255,0.5)", fontFamily: "var(--font-ui)", letterSpacing: "0.06em", marginBottom: 6 }}>LESSON COMPLETION</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {/* Circular progress */}
                <svg width={36} height={36} viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
                  <circle cx={18} cy={18} r={14} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={3} />
                  <motion.circle
                    cx={18} cy={18} r={14}
                    fill="none"
                    stroke="url(#circGrad)"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 14}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 14 }}
                    animate={{ strokeDashoffset: active ? 2 * Math.PI * 14 * 0.06 : 2 * Math.PI * 14 }}
                    transition={{ duration: 1.6, delay: 1.0, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="circGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF2B7A" />
                      <stop offset="100%" stopColor="#7B3EFF" />
                    </linearGradient>
                  </defs>
                </svg>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#FF2B7A", fontFamily: "var(--font-display)", lineHeight: 1 }}>94%</div>
                  <div style={{ fontSize: 9, color: "rgba(168,157,196,0.5)" }}>+41% this term</div>
                </div>
              </div>
            </FloatCard>

            {/* Countries badge */}
            <FloatCard
              delay={1.5}
              duration={5}
              yRange={9}
              style={{ bottom: 80, right: -20, padding: "10px 14px", zIndex: 30 }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 22 }}>🌍</span>
                <div>
                  <div style={{ fontSize: 10, color: "rgba(191,168,255,0.5)", fontFamily: "var(--font-ui)" }}>REGIONS</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#F0ECFF", fontFamily: "var(--font-display)" }}>PK · SA · CA</div>
                </div>
              </div>
            </FloatCard>

          </motion.div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          SCROLL INDICATOR
      ══════════════════════════════════════════════════════════════ */}
      <motion.div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          gap: 8,
          zIndex: 20,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span style={{
          fontSize: 10,
          letterSpacing: "0.14em",
          color: "rgba(107,94,133,0.7)",
          fontFamily: "var(--font-ui)",
          textTransform: "uppercase" as const,
        }}>
          Scroll to explore
        </span>
        <motion.div
          style={{
            width: 20, height: 32, borderRadius: 10,
            border: "1px solid rgba(191,168,255,0.2)",
            display: "flex", justifyContent: "center", paddingTop: 6,
          }}
        >
          <motion.div
            style={{ width: 3, height: 8, borderRadius: 2, background: "rgba(191,168,255,0.5)" }}
            animate={{ y: [0, 10, 0], opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* ══════════════════════════════════════════════════════════════
          KEYFRAMES (injected globally via <style>)
      ══════════════════════════════════════════════════════════════ */}
      <style>{`
        @keyframes gradMeshDrift {
          0%   { background-position: 0% 0%; }
          50%  { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes blobRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes livePulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          70%  { transform: scale(2);   opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @media (max-width: 960px) {
          .hero-layout { grid-template-columns: 1fr !important; }
          .hero-devices { display: none !important; }
        }
      `}</style>
    </section>
  );
}
