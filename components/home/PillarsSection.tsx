"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Pillars Section — glassmorphism 3-col feature cards ─────────────────── */

const PILLARS = [
  {
    icon: "🖥️",
    color: "#7B3EFF",
    title: "School Management System",
    desc: "A complete administrative backbone — attendance, grades, fees, timetables, HR, and parent communication in one unified dashboard.",
    tags: ["Attendance", "Grades", "Fees", "HR"],
  },
  {
    icon: "🎬",
    color: "#FF2B7A",
    title: "Animated Lessons",
    desc: "Curriculum-aligned animated content that brings abstract concepts to life. Available in English, Arabic, and Urdu for K-12.",
    tags: ["English", "Arabic", "Urdu", "K-12"],
  },
  {
    icon: "🎮",
    color: "#3EC7FF",
    title: "Game-Based Learning",
    desc: "Immersive educational games that drive engagement through quests, leaderboards, and rewards — turning study time into adventure.",
    tags: ["Quests", "Leaderboards", "Rewards"],
  },
  {
    icon: "📡",
    color: "#BFA8FF",
    title: "Digital Infrastructure",
    desc: "Moodle LMS setup, network configuration, device procurement and training — we build your school's digital foundation end-to-end.",
    tags: ["Moodle", "LMS", "Network", "Training"],
  },
  {
    icon: "📊",
    color: "#22c55e",
    title: "Analytics & Reporting",
    desc: "Real-time insight dashboards for teachers, principals, and parents. Track every student's journey with actionable data.",
    tags: ["Real-time", "Parents", "Teachers"],
  },
  {
    icon: "🌐",
    color: "#f59e0b",
    title: "Multi-Language Support",
    desc: "Full platform support in English, Arabic, and Urdu. Designed for diverse classrooms across Pakistan, Saudi Arabia, and beyond.",
    tags: ["Arabic", "Urdu", "RTL Support"],
  },
];

export default function PillarsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="pillars"
      ref={ref}
      style={{
        background: "#0A0014",
        padding: "100px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background accent */}
      <div style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800,
        height: 400,
        background: "radial-gradient(ellipse, rgba(123,62,255,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <motion.div
            className="section-eyebrow"
            style={{ marginBottom: 20, display: "inline-flex" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Our Solutions
          </motion.div>

          <motion.h2
            className="section-title"
            style={{ marginBottom: 16 }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Everything Your School Needs.{" "}
            <span style={{
              background: "linear-gradient(135deg, #FF2B7A, #7B3EFF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              One Partner.
            </span>
          </motion.h2>

          <motion.p
            style={{
              fontSize: 17,
              color: "#A89DC4",
              maxWidth: 540,
              margin: "0 auto",
              lineHeight: 1.65,
              fontFamily: "var(--font-body)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Six integrated solutions that take your institution from
            chalk-and-board to world-class — without juggling multiple vendors.
          </motion.p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              style={{ position: "relative", overflow: "hidden" }}
            >
              {/* Glow accent */}
              <div style={{
                position: "absolute",
                top: -40,
                right: -40,
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${pillar.color}18 0%, transparent 70%)`,
                pointerEvents: "none",
              }} />

              {/* Icon */}
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: `${pillar.color}15`,
                border: `1px solid ${pillar.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                marginBottom: 20,
              }}>
                {pillar.icon}
              </div>

              <h3 style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 700,
                color: "#F0ECFF",
                marginBottom: 12,
                lineHeight: 1.2,
              }}>
                {pillar.title}
              </h3>

              <p style={{
                fontSize: 14,
                color: "#A89DC4",
                lineHeight: 1.65,
                marginBottom: 20,
                fontFamily: "var(--font-body)",
              }}>
                {pillar.desc}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 6 }}>
                {pillar.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: 11,
                    fontFamily: "var(--font-ui)",
                    fontWeight: 600,
                    color: pillar.color,
                    background: `${pillar.color}12`,
                    border: `1px solid ${pillar.color}25`,
                    borderRadius: 6,
                    padding: "3px 9px",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom accent line */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${pillar.color}50, transparent)`,
                borderRadius: "0 0 20px 20px",
              }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 900px) {
          .pillars-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
