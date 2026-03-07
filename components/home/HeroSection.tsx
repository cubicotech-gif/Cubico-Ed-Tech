"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";

/* ── Constants ──────────────────────────────────────────────────────────── */
const WA_LINK =
  "https://wa.me/923001234567?text=Hi%20Cubico!%20I'm%20interested%20in%20learning%20about%20your%20EdTech%20solutions%20for%20our%20institution.";

/* ── Animated counter hook ──────────────────────────────────────────────── */
function useCountUp(target: number, active: boolean, duration = 1800) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const raf = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setVal(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

/* ── Dashboard Screen Content ────────────────────────────────────────────── */
function DashboardScreen({ active }: { active: boolean }) {
  const students = useCountUp(2847, active, 2000);
  const lessons  = useCountUp(94, active, 1600);
  const reports  = useCountUp(126, active, 1800);

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0a0018, #130025)",
        borderRadius: 10,
        overflow: "hidden",
        padding: "14px",
        fontFamily: "var(--font-ui)",
      }}
    >
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 5 }}>
          {(["#ff5f56","#ffbd2e","#27c93f"] as const).map((c, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{
          flex: 1,
          height: 6,
          background: "rgba(191,168,255,0.1)",
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          padding: "0 8px",
        }}>
          <div style={{ width: "60%", height: 3, background: "rgba(191,168,255,0.15)", borderRadius: 2 }} />
        </div>
        <div style={{ display: "flex", gap: 4 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{ width: 18, height: 6, background: "rgba(191,168,255,0.08)", borderRadius: 2 }} />
          ))}
        </div>
      </div>

      {/* Stat chips */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
        {[
          { label: "Students", val: students.toLocaleString(), color: "#7B3EFF" },
          { label: "Lessons", val: `${lessons}%`, color: "#FF2B7A" },
          { label: "Reports", val: String(reports), color: "#3EC7FF" },
        ].map(({ label, val, color }) => (
          <div key={label} style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${color}22`,
            borderRadius: 8,
            padding: "8px 10px",
          }}>
            <div style={{ fontSize: 17, fontWeight: 700, color, fontFamily: "var(--font-display)" }}>{val}</div>
            <div style={{ fontSize: 9, color: "#6B5E85", marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Progress bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
        {[
          { label: "Math", pct: 78, color: "#7B3EFF" },
          { label: "Science", pct: 65, color: "#FF2B7A" },
          { label: "Arabic", pct: 91, color: "#3EC7FF" },
        ].map(({ label, pct, color }) => (
          <div key={label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 9, color: "#A89DC4" }}>{label}</span>
              <span style={{ fontSize: 9, color: "#A89DC4" }}>{pct}%</span>
            </div>
            <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4, overflow: "hidden" }}>
              <motion.div
                style={{ height: "100%", background: color, borderRadius: 4 }}
                initial={{ width: 0 }}
                animate={{ width: active ? `${pct}%` : 0 }}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mini avatar row */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ display: "flex" }}>
          {(["#FF2B7A","#7B3EFF","#3EC7FF","#BFA8FF"] as const).map((c, i) => (
            <div key={i} style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: c,
              border: "2px solid #0a0018",
              marginLeft: i > 0 ? -6 : 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 8,
              color: "#0a0018",
              fontWeight: 700,
            }}>
              {String.fromCharCode(65 + i)}
            </div>
          ))}
        </div>
        <span style={{ fontSize: 9, color: "#6B5E85" }}>+2,800 students active</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ fontSize: 9, color: "#22c55e" }}>Live</span>
        </div>
      </div>
    </div>
  );
}

/* ── Tablet Screen Content ───────────────────────────────────────────────── */
function TabletScreen() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #0d001a, #160030)",
      borderRadius: 8,
      overflow: "hidden",
      padding: "12px",
      height: "100%",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#BFA8FF", fontFamily: "var(--font-ui)" }}>
          Lesson Hub
        </div>
        <div style={{
          fontSize: 8,
          color: "#FF2B7A",
          background: "rgba(255,43,122,0.1)",
          padding: "2px 6px",
          borderRadius: 4,
          border: "1px solid rgba(255,43,122,0.2)",
        }}>
          LIVE
        </div>
      </div>

      {[
        { title: "Algebra Basics", icon: "📐", progress: 72, color: "#7B3EFF" },
        { title: "World History", icon: "🌍", progress: 45, color: "#FF2B7A" },
        { title: "Arabic Grammar", icon: "📖", progress: 88, color: "#3EC7FF" },
      ].map(({ title, icon, progress, color }) => (
        <div key={title} style={{
          background: "rgba(255,255,255,0.03)",
          borderRadius: 6,
          padding: "7px 9px",
          marginBottom: 5,
          border: `1px solid ${color}15`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <span style={{ fontSize: 10 }}>{icon}</span>
            <span style={{ fontSize: 9, color: "#F0ECFF", fontFamily: "var(--font-ui)" }}>{title}</span>
            <span style={{ marginLeft: "auto", fontSize: 8, color: "#6B5E85" }}>{progress}%</span>
          </div>
          <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
            <div style={{ width: `${progress}%`, height: "100%", background: color, borderRadius: 2 }} />
          </div>
        </div>
      ))}

      <div style={{
        marginTop: 8,
        padding: "8px 10px",
        borderRadius: 8,
        background: "linear-gradient(135deg, rgba(123,62,255,0.15), rgba(62,199,255,0.08))",
        border: "1px solid rgba(123,62,255,0.2)",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}>
        <div style={{ fontSize: 14 }}>🎮</div>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#BFA8FF" }}>Game Mode</div>
          <div style={{ fontSize: 8, color: "#6B5E85" }}>3 quests available</div>
        </div>
      </div>
    </div>
  );
}

/* ── Phone Screen Content ────────────────────────────────────────────────── */
function PhoneScreen() {
  return (
    <div style={{
      background: "linear-gradient(180deg, #0a0014, #140028)",
      borderRadius: 12,
      overflow: "hidden",
      padding: "10px 8px",
      height: "100%",
    }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ fontSize: 8, color: "#6B5E85", marginBottom: 2 }}>Parent Portal</div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#F0ECFF", fontFamily: "var(--font-ui)" }}>My Child</div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
        <div style={{
          width: 40, height: 40, borderRadius: "50%",
          background: "linear-gradient(135deg, #7B3EFF, #FF2B7A)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, border: "2px solid rgba(191,168,255,0.25)",
        }}>
          👧
        </div>
      </div>

      {[
        { label: "Attendance", val: "97%", color: "#22c55e" },
        { label: "Grade Avg", val: "A+", color: "#3EC7FF" },
        { label: "Homework", val: "12/13", color: "#FF2B7A" },
      ].map(({ label, val, color }) => (
        <div key={label} style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "5px 6px", marginBottom: 3,
          background: "rgba(255,255,255,0.03)", borderRadius: 6,
        }}>
          <span style={{ fontSize: 8, color: "#6B5E85" }}>{label}</span>
          <span style={{ fontSize: 9, fontWeight: 700, color, fontFamily: "var(--font-ui)" }}>{val}</span>
        </div>
      ))}

      <div style={{
        marginTop: 6, padding: "6px 7px", borderRadius: 6,
        background: "rgba(255,43,122,0.08)", border: "1px solid rgba(255,43,122,0.2)",
        display: "flex", alignItems: "center", gap: 5,
      }}>
        <div style={{ fontSize: 10 }}>🔔</div>
        <div>
          <div style={{ fontSize: 8, color: "#FF2B7A" }}>New report ready</div>
          <div style={{ fontSize: 7, color: "#6B5E85" }}>Term 2 results</div>
        </div>
      </div>
    </div>
  );
}

/* ── Floating Badge ──────────────────────────────────────────────────────── */
interface FloatingBadgeProps {
  children: React.ReactNode;
  delay?: number;
  x?: number;
  y?: number;
  accentColor?: string;
}
function FloatingBadge({ children, delay = 0, x = 0, y = 0, accentColor = "#7B3EFF" }: FloatingBadgeProps) {
  return (
    <motion.div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        background: "rgba(10,0,20,0.88)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: `1px solid ${accentColor}35`,
        borderRadius: 12,
        padding: "8px 14px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${accentColor}18`,
        zIndex: 20,
        pointerEvents: "none",
        whiteSpace: "nowrap" as const,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.5 },
        y: { delay: delay + 0.5, duration: 3, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════ */
/*  HERO SECTION                                                               */
/* ═══════════════════════════════════════════════════════════════════════════ */

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const [inView, setInView] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setInView(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 60, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 60, damping: 20 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth - 0.5);
      rawY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [rawX, rawY]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#0A0014",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      {/* Background gradient blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div className="hero-mesh-blob" style={{
          width: 600, height: 600, left: "55%", top: "-10%",
          background: "radial-gradient(circle, rgba(123,62,255,0.35) 0%, transparent 70%)",
          animation: "blob-drift 12s ease-in-out infinite",
        }} />
        <div className="hero-mesh-blob" style={{
          width: 500, height: 500, left: "-10%", top: "40%",
          background: "radial-gradient(circle, rgba(255,43,122,0.2) 0%, transparent 70%)",
          animation: "blob-drift 16s ease-in-out infinite reverse",
          animationDelay: "4s",
        }} />
        <div className="hero-mesh-blob" style={{
          width: 400, height: 400, left: "70%", top: "60%",
          background: "radial-gradient(circle, rgba(62,199,255,0.15) 0%, transparent 70%)",
          animation: "blob-drift 20s ease-in-out infinite",
          animationDelay: "8s",
        }} />
        <div className="hero-grid-overlay" style={{ position: "absolute", inset: 0 }} />
      </div>

      {/* Main content */}
      <motion.div style={{ y: heroY, position: "relative", zIndex: 10, width: "100%" }}>
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* LEFT: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Eyebrow */}
            <motion.div
              className="section-eyebrow"
              style={{ marginBottom: 24 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span style={{
                display: "inline-block", width: 6, height: 6, borderRadius: "50%",
                background: "#FF2B7A",
              }} />
              Trusted by 500+ Institutions
            </motion.div>

            {/* Headline */}
            <motion.h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 5vw, 58px)",
                fontWeight: 700,
                lineHeight: 1.07,
                color: "#F0ECFF",
                marginBottom: 24,
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              The Platform That{" "}
              <span style={{
                background: "linear-gradient(135deg, #FF2B7A 0%, #7B3EFF 50%, #3EC7FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Transforms
              </span>
              <br />Schools Into
              <br /><em style={{ fontStyle: "italic" }}>World‑Class</em> Institutions
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              style={{
                fontSize: "clamp(15px, 1.6vw, 17px)",
                color: "#A89DC4",
                lineHeight: 1.7,
                maxWidth: 460,
                marginBottom: 36,
                fontFamily: "var(--font-body)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              From management systems to animated lessons and game‑based
              learning — Cubico delivers every EdTech solution your institution
              needs, in one seamless platform.
            </motion.p>

            {/* CTAs */}
            <motion.div
              style={{ display: "flex", gap: 16, flexWrap: "wrap" as const, alignItems: "center" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <a href={WA_LINK} className="cta-primary" target="_blank" rel="noopener noreferrer">
                Request a Demo
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 16 16">
                  <path d="M3 8h10M8 3l5 5-5 5" />
                </svg>
              </a>
              <a href="#pillars" className="cta-secondary">
                Explore Platform
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 16 16">
                  <path d="M3 8h10M8 3l5 5-5 5" />
                </svg>
              </a>
            </motion.div>

            {/* Social proof numbers */}
            <motion.div
              style={{ display: "flex", gap: 32, marginTop: 48 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              {[
                { num: "500+", label: "Institutions" },
                { num: "80K+", label: "Students" },
                { num: "4 Wk", label: "Avg. Setup" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 26, fontWeight: 700, color: "#F0ECFF",
                    lineHeight: 1, marginBottom: 4,
                  }}>
                    {num}
                  </div>
                  <div style={{ fontSize: 12, color: "#6B5E85", fontFamily: "var(--font-ui)" }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT: Device Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ position: "relative", display: "flex", justifyContent: "center" }}
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d" as const,
                perspective: 800,
                position: "relative",
                width: "100%",
                maxWidth: 520,
                minHeight: 440,
              }}
            >
              {/* LAPTOP */}
              <motion.div
                style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "84%", zIndex: 10 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div style={{
                  background: "linear-gradient(145deg, #1a0035, #0d0020)",
                  border: "1px solid rgba(191,168,255,0.15)",
                  borderRadius: "12px 12px 0 0",
                  padding: "12px 12px 0",
                  boxShadow: "0 0 60px rgba(123,62,255,0.2), 0 40px 80px rgba(0,0,0,0.6)",
                }}>
                  <DashboardScreen active={inView} />
                </div>
                <div style={{
                  background: "linear-gradient(180deg, #1a0035, #0f001e)",
                  border: "1px solid rgba(191,168,255,0.12)",
                  borderTop: "none",
                  borderRadius: "0 0 12px 12px",
                  height: 14,
                }} />
                <div style={{
                  background: "linear-gradient(180deg, #0f001e, #080012)",
                  height: 8,
                  borderRadius: "0 0 16px 16px",
                  border: "1px solid rgba(191,168,255,0.08)",
                  borderTop: "none",
                  clipPath: "polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)",
                }} />
              </motion.div>

              {/* TABLET */}
              <motion.div
                style={{
                  position: "absolute", top: "16%", left: "-2%",
                  width: "35%", height: 280, zIndex: 5,
                  transform: "translateZ(-20px) rotate(-8deg)",
                }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div style={{
                  background: "linear-gradient(145deg, #180035, #0a0018)",
                  border: "1px solid rgba(191,168,255,0.12)",
                  borderRadius: 14, padding: "10px 8px", height: "100%",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(123,62,255,0.12)",
                }}>
                  <TabletScreen />
                </div>
              </motion.div>

              {/* PHONE */}
              <motion.div
                style={{
                  position: "absolute", top: "20%", right: "-2%",
                  width: "22%", height: 260, zIndex: 5,
                  transform: "translateZ(-10px) rotate(7deg)",
                }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                <div style={{
                  background: "linear-gradient(145deg, #180035, #0a0018)",
                  border: "1px solid rgba(191,168,255,0.12)",
                  borderRadius: 20, padding: "10px 8px", height: "100%",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(255,43,122,0.1)",
                }}>
                  <PhoneScreen />
                </div>
              </motion.div>

              {/* FLOATING BADGES */}
              <FloatingBadge x={-18} y={6} delay={1.0} accentColor="#22c55e">
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: "rgba(34,197,94,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                }}>✅</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#F0ECFF", fontFamily: "var(--font-ui)" }}>System Live</div>
                  <div style={{ fontSize: 9, color: "#6B5E85" }}>Deployed in 4 weeks</div>
                </div>
              </FloatingBadge>

              <FloatingBadge x={68} y={72} delay={1.3} accentColor="#FF2B7A">
                <div style={{ fontSize: 16 }}>🎮</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#F0ECFF", fontFamily: "var(--font-ui)" }}>Game-Based</div>
                  <div style={{ fontSize: 9, color: "#6B5E85" }}>12 quests today</div>
                </div>
              </FloatingBadge>

              <FloatingBadge x={-8} y={84} delay={1.6} accentColor="#3EC7FF">
                <div style={{ fontSize: 16 }}>🌍</div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#F0ECFF", fontFamily: "var(--font-ui)" }}>PK · SA · CA</div>
                  <div style={{ fontSize: 9, color: "#6B5E85" }}>3 countries served</div>
                </div>
              </FloatingBadge>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .hero-inner-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
