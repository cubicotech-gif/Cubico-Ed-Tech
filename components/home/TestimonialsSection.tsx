"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ── Testimonials — Large editorial quote slider ─────────────────────────── */

const TESTIMONIALS = [
  {
    quote:
      "Cubico transformed how we manage our 2,400-student campus. From attendance to fee collection, everything is now automated. Our admin load dropped by 60% in the first month.",
    name: "Dr. Fatima Al-Rashid",
    role: "Principal, Al-Noor Academy",
    location: "Jeddah, Saudi Arabia",
    avatar: "👩‍💼",
    color: "#7B3EFF",
    metric: "60%",
    metricLabel: "Admin time saved",
  },
  {
    quote:
      "Our students went from disengaged to genuinely excited about learning. The animated lessons and game-based modules made all the difference — parents are calling us asking what changed.",
    name: "Zubair Ahmed",
    role: "Director of Curriculum",
    location: "Lahore, Pakistan",
    avatar: "👨‍🏫",
    color: "#FF2B7A",
    metric: "3×",
    metricLabel: "Engagement increase",
  },
  {
    quote:
      "We were skeptical about the 4-week setup promise. Cubico delivered in 3.5 weeks — fully deployed Moodle, trained staff, and had 800 students onboarded. Remarkable execution.",
    name: "Sarah Chen",
    role: "IT Director, DPS International",
    location: "Toronto, Canada",
    avatar: "👩‍💻",
    color: "#3EC7FF",
    metric: "3.5 wk",
    metricLabel: "Full deployment",
  },
  {
    quote:
      "The Arabic-language support is exceptional. Our Islamic Studies curriculum is now fully digital, with animated content our students absolutely love. Cubico understood our community's needs.",
    name: "Sheikh Abdullah",
    role: "Head of Academics",
    location: "Riyadh, Saudi Arabia",
    avatar: "👨‍🎓",
    color: "#BFA8FF",
    metric: "100%",
    metricLabel: "Arabic RTL support",
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const current = TESTIMONIALS[active];

  return (
    <section
      ref={ref}
      style={{
        background: "#0A0014",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(123,62,255,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <motion.div
            className="section-eyebrow"
            style={{ marginBottom: 20, display: "inline-flex" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Client Stories
          </motion.div>

          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Institutions That{" "}
            <span style={{
              background: "linear-gradient(135deg, #FF2B7A, #7B3EFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Made the Leap
            </span>
          </motion.h2>
        </div>

        {/* Main testimonial display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: 32,
            alignItems: "stretch",
          }}>
            {/* Quote card */}
            <div style={{ position: "relative" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="testimonial-card"
                  style={{ height: "100%", position: "relative", overflow: "hidden" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Accent glow */}
                  <div style={{
                    position: "absolute",
                    top: -60,
                    left: -60,
                    width: 180,
                    height: 180,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${current.color}18 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }} />

                  {/* Quote mark */}
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 72,
                    lineHeight: 0.8,
                    color: current.color,
                    opacity: 0.4,
                    marginBottom: 16,
                  }}>
                    "
                  </div>

                  <p style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(18px, 2.2vw, 24px)",
                    fontStyle: "italic",
                    lineHeight: 1.5,
                    color: "#F0ECFF",
                    marginBottom: 32,
                  }}>
                    {current.quote}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{
                      width: 52,
                      height: 52,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${current.color}40, ${current.color}20)`,
                      border: `2px solid ${current.color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                    }}>
                      {current.avatar}
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-ui)", fontWeight: 700, fontSize: 16, color: "#F0ECFF" }}>
                        {current.name}
                      </div>
                      <div style={{ fontSize: 13, color: "#A89DC4", marginTop: 2, fontFamily: "var(--font-body)" }}>
                        {current.role}
                      </div>
                      <div style={{ fontSize: 12, color: "#6B5E85", marginTop: 1, fontFamily: "var(--font-body)" }}>
                        📍 {current.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sidebar: metric + nav */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Metric highlight */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`metric-${active}`}
                  style={{
                    background: "rgba(15, 0, 32, 0.80)",
                    border: `1px solid ${current.color}30`,
                    borderRadius: 20,
                    padding: "32px 24px",
                    textAlign: "center",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                  }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35 }}
                >
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 52,
                    fontWeight: 700,
                    color: current.color,
                    lineHeight: 1,
                    marginBottom: 8,
                  }}>
                    {current.metric}
                  </div>
                  <div style={{ fontSize: 13, color: "#A89DC4", fontFamily: "var(--font-ui)" }}>
                    {current.metricLabel}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Testimonial navigation */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 16px",
                      borderRadius: 12,
                      border: i === active
                        ? `1px solid ${t.color}40`
                        : "1px solid rgba(191,168,255,0.08)",
                      background: i === active
                        ? `${t.color}10`
                        : "rgba(15,0,32,0.5)",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      textAlign: "left" as const,
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{t.avatar}</span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: i === active ? "#F0ECFF" : "#A89DC4", fontFamily: "var(--font-ui)" }}>
                        {t.name}
                      </div>
                      <div style={{ fontSize: 11, color: "#6B5E85", fontFamily: "var(--font-body)" }}>
                        {t.location}
                      </div>
                    </div>
                    {i === active && (
                      <div style={{
                        marginLeft: "auto",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: t.color,
                      }} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
