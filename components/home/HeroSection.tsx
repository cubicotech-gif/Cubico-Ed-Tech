"use client";

import type React from "react";
import { motion } from "framer-motion";

const WA_LINK =
  "https://wa.me/923001234567?text=Hi%20Cubico!%20I'm%20interested%20in%20learning%20about%20your%20EdTech%20solutions%20for%20our%20institution.";

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard: Sidebar
// ─────────────────────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { icon: "▦", label: "Dashboard", active: true },
  { icon: "◉", label: "My Tasks" },
  { icon: "⊞", label: "Projects" },
  { icon: "≡", label: "Reports" },
  { icon: "⊙", label: "Team" },
  { icon: "✦", label: "Chats" },
];
const GEN_ITEMS = [
  { icon: "⚙", label: "Setting" },
  { icon: "?", label: "Help" },
  { icon: "→", label: "Logout" },
];

function Sidebar() {
  const s: React.CSSProperties = {
    width: 130,
    background: "#FFFFFF",
    borderRight: "1px solid rgba(0,0,0,0.07)",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    padding: "14px 10px",
    gap: 4,
  };
  const label: React.CSSProperties = {
    fontSize: 7,
    fontFamily: "var(--font-ui)",
    color: "#9CA3AF",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    padding: "8px 6px 4px",
    fontWeight: 600,
  };
  return (
    <div style={s}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, padding: "0 4px" }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            background: "linear-gradient(135deg, #F97316, #FBBF24)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 10,
          }}
        >
          ◈
        </div>
        <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "var(--font-ui)", color: "#111827" }}>
          CUBICO
        </span>
      </div>

      <div style={label}>Menu</div>
      {MENU_ITEMS.map((item) => (
        <div
          key={item.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 7px",
            borderRadius: 6,
            backgroundColor: item.active ? "rgba(249,115,22,0.1)" : "transparent",
            color: item.active ? "#F97316" : "#6B7280",
            fontSize: 9,
            fontFamily: "var(--font-ui)",
            fontWeight: item.active ? 600 : 400,
          }}
        >
          <span style={{ fontSize: 9, width: 12, textAlign: "center" }}>{item.icon}</span>
          {item.label}
        </div>
      ))}

      <div style={label}>General</div>
      {GEN_ITEMS.map((item) => (
        <div
          key={item.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 7px",
            borderRadius: 6,
            color: "#9CA3AF",
            fontSize: 9,
            fontFamily: "var(--font-ui)",
          }}
        >
          <span style={{ fontSize: 9, width: 12, textAlign: "center" }}>{item.icon}</span>
          {item.label}
        </div>
      ))}

      {/* Upgrade card */}
      <div style={{ marginTop: "auto" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #FEF3C7, #FED7AA)",
            borderRadius: 10,
            padding: "10px 10px",
            border: "1px solid rgba(249,115,22,0.2)",
          }}
        >
          <div style={{ fontSize: 8, fontWeight: 700, color: "#92400E", fontFamily: "var(--font-ui)", marginBottom: 3 }}>
            Become Pro
          </div>
          <div style={{ fontSize: 7, color: "#B45309", fontFamily: "var(--font-ui)", lineHeight: 1.4, marginBottom: 6 }}>
            Unlock premium features, advance AI automation, and more.
          </div>
          <div
            style={{
              background: "#F97316",
              borderRadius: 5,
              padding: "4px 8px",
              textAlign: "center",
              color: "#fff",
              fontSize: 7,
              fontWeight: 600,
              fontFamily: "var(--font-ui)",
            }}
          >
            View our plan
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard: Stats row
// ─────────────────────────────────────────────────────────────────────────────
const STATS = [
  { label: "Total Task", value: "1,247", change: "↑ 12%", changeColor: "#10B981" },
  { label: "Due Today", value: "6", sub: "📋 3 done today", subColor: "#F97316" },
  { label: "In Progress", value: "48", sub: "⬤ 12 Review", subColor: "#3B82F6" },
  { label: "Overdue", value: "5", sub: "⚠ Missed deadline", subColor: "#EF4444" },
  { label: "Completed", value: "892", change: "↑ 8%", changeColor: "#10B981" },
];

function StatsRow() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8, marginBottom: 12 }}>
      {STATS.map((s) => (
        <div
          key={s.label}
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: 8,
            padding: "10px 10px",
          }}
        >
          <div style={{ fontSize: 7, color: "#9CA3AF", fontFamily: "var(--font-ui)", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            {s.label}
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "var(--font-ui)", color: "#111827", lineHeight: 1 }}>
            {s.value}
          </div>
          {s.change && (
            <div style={{ fontSize: 7, color: s.changeColor, marginTop: 3, fontFamily: "var(--font-ui)", fontWeight: 500 }}>
              {s.change}
            </div>
          )}
          {s.sub && (
            <div style={{ fontSize: 7, color: s.subColor, marginTop: 3, fontFamily: "var(--font-ui)" }}>
              {s.sub}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard: Timeline / Gantt
// ─────────────────────────────────────────────────────────────────────────────
const TIMELINE_ROWS = [
  { name: "UI Research",     status: "complete",     bar: { left: 4, width: 28 }, color: "#10B981" },
  { name: "Web design",      status: "in-progress",  bar: { left: 20, width: 35 }, color: "#F97316" },
  { name: "Design system",   status: "in-progress",  bar: { left: 30, width: 25 }, color: "#3B82F6" },
  { name: "Mobile app",      status: "not-started",  bar: { left: 38, width: 22 }, color: "#F97316" },
  { name: "Prototyping",     status: "not-started",  bar: { left: 50, width: 18 }, color: "#A855F7" },
];
const TIMELINE_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function LessonTimeline() {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 8,
        padding: "10px 12px",
        flex: 1,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <span style={{ fontSize: 9, fontWeight: 600, color: "#111827", fontFamily: "var(--font-ui)" }}>
          Project Timeline
        </span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["Day", "Week", "Month", "Year"].map((t, i) => (
            <span
              key={t}
              style={{
                fontSize: 7,
                fontFamily: "var(--font-ui)",
                color: i === 1 ? "#F97316" : "#9CA3AF",
                fontWeight: i === 1 ? 600 : 400,
                borderBottom: i === 1 ? "1px solid #F97316" : "none",
                paddingBottom: i === 1 ? 1 : 0,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 10, marginBottom: 6 }}>
        {[{ c: "#10B981", l: "Complete" }, { c: "#F97316", l: "On progress" }, { c: "#3B82F6", l: "Incomplete" }].map((leg) => (
          <div key={leg.l} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: 2, background: leg.c }} />
            <span style={{ fontSize: 7, color: "#9CA3AF", fontFamily: "var(--font-ui)" }}>{leg.l}</span>
          </div>
        ))}
      </div>

      {/* Day headers */}
      <div style={{ display: "flex", marginBottom: 4 }}>
        <div style={{ width: 70, flexShrink: 0 }} />
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(5, 1fr)" }}>
          {TIMELINE_DAYS.map((d) => (
            <div key={d} style={{ fontSize: 6.5, color: "#9CA3AF", fontFamily: "var(--font-ui)", textAlign: "center" }}>
              {d}
            </div>
          ))}
        </div>
      </div>

      {/* Gantt rows */}
      {TIMELINE_ROWS.map((row) => (
        <div key={row.name} style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
          <div style={{ width: 70, flexShrink: 0, fontSize: 7, color: "#374151", fontFamily: "var(--font-ui)", paddingRight: 6 }}>
            {row.name}
          </div>
          <div style={{ flex: 1, position: "relative", height: 14, background: "rgba(0,0,0,0.04)", borderRadius: 4, overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                left: `${row.bar.left}%`,
                width: `${row.bar.width}%`,
                top: 0,
                bottom: 0,
                background: row.color,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                paddingLeft: 5,
              }}
            >
              <span style={{ fontSize: 6, color: "#fff", fontFamily: "var(--font-ui)", whiteSpace: "nowrap", overflow: "hidden" }}>
                {row.status === "complete" ? "Done ✓" : row.status === "in-progress" ? "In progress..." : "Planned"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard: Project Progress
// ─────────────────────────────────────────────────────────────────────────────
const PROGRESS_ITEMS = [
  { name: "Web redesign",      pct: 67, color: "#F97316" },
  { name: "Mobile platform",   pct: 43, color: "#F97316" },
  { name: "User research",     pct: 180, note: "Complete", color: "#10B981" },
  { name: "Prototyping",       pct: 32, color: "#F97316" },
];

function ProjectProgress() {
  return (
    <div
      style={{
        width: 180,
        flexShrink: 0,
        background: "#FFFFFF",
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 8,
        padding: "10px 12px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 9, fontWeight: 600, color: "#111827", fontFamily: "var(--font-ui)" }}>
          Project Progress
        </span>
        <span style={{ fontSize: 7, color: "#F97316", fontFamily: "var(--font-ui)", fontWeight: 500 }}>
          + Add project
        </span>
      </div>

      {PROGRESS_ITEMS.map((item) => (
        <div key={item.name} style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <span style={{ fontSize: 7.5, color: "#374151", fontFamily: "var(--font-ui)" }}>{item.name}</span>
            {item.note ? (
              <span
                style={{
                  fontSize: 6.5,
                  background: "#D1FAE5",
                  color: "#065F46",
                  borderRadius: 3,
                  padding: "1px 4px",
                  fontFamily: "var(--font-ui)",
                  fontWeight: 600,
                }}
              >
                {item.note}
              </span>
            ) : (
              <span style={{ fontSize: 7, color: "#9CA3AF", fontFamily: "var(--font-ui)" }}>
                {item.pct}%
              </span>
            )}
          </div>
          <div style={{ height: 4, background: "#F3F4F6", borderRadius: 2, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${Math.min(item.pct, 100)}%`,
                background: item.color,
                borderRadius: 2,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard: Bottom row — Task Priority, Reminders, Recent Activity
// ─────────────────────────────────────────────────────────────────────────────
function BottomRow() {
  const tasks = [
    { name: "Design icon set for navigation", status: "Completed", statusColor: "#D1FAE5", statusText: "#065F46" },
    { name: "Design icon set for navigation", status: "On progress", statusColor: "#FEF3C7", statusText: "#92400E" },
  ];
  const reminders = [
    { text: "Meeting with product designer team", sub: "Monday, Oct 27 at 10:30 · on·Zoom", avatar: "👥" },
  ];
  const activity = [
    { text: "John completed design mockup", time: "1 hour ago", avatar: "J" },
    { text: "Sarah added 3 new tasks", time: "2 hours ago", avatar: "S" },
  ];

  const cardStyle: React.CSSProperties = {
    background: "#FFFFFF",
    border: "1px solid rgba(0,0,0,0.07)",
    borderRadius: 8,
    padding: "10px 12px",
    flex: 1,
  };
  const titleStyle: React.CSSProperties = {
    fontSize: 9,
    fontWeight: 600,
    color: "#111827",
    fontFamily: "var(--font-ui)",
    marginBottom: 8,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  return (
    <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
      {/* Task Priority */}
      <div style={cardStyle}>
        <div style={titleStyle}>
          Task Priority
          <span style={{ fontSize: 7, color: "#9CA3AF", cursor: "pointer" }}>✕</span>
        </div>
        {tasks.map((t, i) => (
          <div key={i} style={{ marginBottom: 6 }}>
            <div style={{ fontSize: 7.5, color: "#374151", fontFamily: "var(--font-ui)", marginBottom: 3 }}>
              {t.name}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span
                style={{
                  fontSize: 6.5,
                  background: t.statusColor,
                  color: t.statusText,
                  borderRadius: 3,
                  padding: "1px 5px",
                  fontFamily: "var(--font-ui)",
                  fontWeight: 500,
                }}
              >
                {t.status}
              </span>
              <span style={{ fontSize: 6.5, color: "#9CA3AF", fontFamily: "var(--font-ui)" }}>
                0 Comments
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Reminders */}
      <div style={cardStyle}>
        <div style={titleStyle}>
          Reminders
          <span style={{ fontSize: 7, color: "#9CA3AF" }}>✕</span>
        </div>
        {reminders.map((r, i) => (
          <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 6,
                background: "#FEF3C7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                flexShrink: 0,
              }}
            >
              {r.avatar}
            </div>
            <div>
              <div style={{ fontSize: 7.5, color: "#374151", fontFamily: "var(--font-ui)", fontWeight: 500 }}>
                {r.text}
              </div>
              <div style={{ fontSize: 6.5, color: "#9CA3AF", fontFamily: "var(--font-ui)", marginTop: 2, marginBottom: 5 }}>
                {r.sub}
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  background: "#F97316",
                  borderRadius: 4,
                  padding: "3px 8px",
                }}
              >
                <span style={{ fontSize: 7, color: "#fff", fontFamily: "var(--font-ui)", fontWeight: 600 }}>
                  ▶ Join Meeting
                </span>
              </div>
            </div>
          </div>
        ))}
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 6, marginTop: 4 }}>
          <div style={{ fontSize: 7.5, fontWeight: 600, color: "#111827", fontFamily: "var(--font-ui)", marginBottom: 3 }}>
            Task Completion
          </div>
          <div style={{ height: 4, background: "#F3F4F6", borderRadius: 2 }}>
            <div style={{ height: "100%", width: "72%", background: "linear-gradient(90deg, #F97316, #FBBF24)", borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 6.5, color: "#9CA3AF", fontFamily: "var(--font-ui)", marginTop: 2 }}>
            72% completed this week
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={cardStyle}>
        <div style={titleStyle}>
          Recent Activity
          <span style={{ fontSize: 7, color: "#9CA3AF" }}>✕</span>
        </div>
        {activity.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", marginBottom: 8 }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: i === 0 ? "#E0E7FF" : "#FEE2E2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 8,
                fontWeight: 700,
                color: i === 0 ? "#4F46E5" : "#EF4444",
                fontFamily: "var(--font-ui)",
                flexShrink: 0,
              }}
            >
              {a.avatar}
            </div>
            <div>
              <div style={{ fontSize: 7.5, color: "#374151", fontFamily: "var(--font-ui)", lineHeight: 1.4 }}>
                {a.text}
              </div>
              <div style={{ fontSize: 6.5, color: "#9CA3AF", fontFamily: "var(--font-ui)", marginTop: 1 }}>
                {a.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard: Top bar
// ─────────────────────────────────────────────────────────────────────────────
function DashboardTopBar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
      }}
    >
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#111827", fontFamily: "var(--font-ui)" }}>
          Welcome Back, Ashton!
        </div>
        <div style={{ fontSize: 8, color: "#9CA3AF", fontFamily: "var(--font-ui)", marginTop: 2 }}>
          Monday, Sept 15
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "#F97316",
            borderRadius: 6,
            padding: "5px 10px",
          }}
        >
          <span style={{ fontSize: 8, color: "#fff", fontFamily: "var(--font-ui)", fontWeight: 600 }}>
            + Add new task
          </span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #F97316, #FBBF24)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              color: "#fff",
              fontWeight: 700,
              fontFamily: "var(--font-ui)",
            }}
          >
            A
          </div>
          <div>
            <div style={{ fontSize: 7.5, fontWeight: 600, color: "#111827", fontFamily: "var(--font-ui)" }}>
              Ashton Kucher
            </div>
            <div style={{ fontSize: 6.5, color: "#9CA3AF", fontFamily: "var(--font-ui)" }}>
              UX/UI Designer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Dashboard: full composition
// ─────────────────────────────────────────────────────────────────────────────
function DashboardContent() {
  return (
    <div style={{ display: "flex", height: "100%" }}>
      <Sidebar />

      {/* Main area */}
      <div
        style={{
          flex: 1,
          background: "#F8FAFC",
          padding: "14px 16px",
          overflow: "hidden",
        }}
      >
        <DashboardTopBar />
        <StatsRow />

        {/* Middle row */}
        <div style={{ display: "flex", gap: 8, marginBottom: 0 }}>
          <LessonTimeline />
          <ProjectProgress />
        </div>

        <BottomRow />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Browser window chrome wrapper
// ─────────────────────────────────────────────────────────────────────────────
function BrowserMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "#FFFFFF",
        borderRadius: 14,
        boxShadow:
          "0 4px 6px rgba(0,0,0,0.04), 0 20px 60px rgba(0,0,0,0.10), 0 60px 120px rgba(0,0,0,0.06)",
        overflow: "hidden",
        border: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: "#F3F4F6",
          padding: "9px 14px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
          {["#FF5F57", "#FFBD2E", "#28C840"].map((c, i) => (
            <div
              key={i}
              style={{ width: 9, height: 9, borderRadius: "50%", background: c }}
            />
          ))}
        </div>

        {/* URL bar */}
        <div
          style={{
            flex: 1,
            background: "#FFFFFF",
            borderRadius: 5,
            padding: "4px 10px",
            display: "flex",
            alignItems: "center",
            gap: 6,
            border: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <span style={{ fontSize: 8, color: "#9CA3AF" }}>🔒</span>
          <span
            style={{
              fontSize: 8,
              color: "#6B7280",
              fontFamily: "var(--font-ui)",
            }}
          >
            cubico.edu/dashboard
          </span>
        </div>

        {/* Right icons */}
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          {["≡", "↗", "⊞"].map((icon, i) => (
            <span key={i} style={{ fontSize: 10, color: "#9CA3AF" }}>
              {icon}
            </span>
          ))}
        </div>
      </div>

      {/* Dashboard content */}
      <div style={{ height: 480 }}>
        <DashboardContent />
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Hero Section
// ─────────────────────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section
      className="hero-section"
      style={{
        background: "#FFFBF5",
        paddingTop: 80,
        paddingBottom: 0,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── Centered hero text ── */}
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "40px 24px 48px",
          textAlign: "center",
        }}
      >
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(38px, 5.5vw, 60px)",
            fontWeight: 700,
            lineHeight: 1.12,
            color: "#111827",
            margin: 0,
            marginBottom: 18,
            letterSpacing: "-0.025em",
          }}
        >
          Transform your team&apos;s
          <br />
          productivity
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 17,
            color: "#6B7280",
            lineHeight: 1.7,
            margin: "0 auto 32px",
            maxWidth: 520,
          }}
        >
          Cubico is the ultimate EdTech platform that brings your institution
          together, streamlines learning workflows, and drives real results.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}
        >
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(249,115,22,0.4)" }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#F97316",
              color: "#FFFFFF",
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              fontSize: 15,
              padding: "13px 26px",
              borderRadius: 8,
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(249,115,22,0.35)",
              letterSpacing: "0.01em",
            }}
          >
            Transform my team now
          </motion.a>

          <motion.a
            href="#results"
            whileHover={{
              backgroundColor: "rgba(249,115,22,0.06)",
              borderColor: "#F97316",
              color: "#F97316",
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "transparent",
              color: "#374151",
              fontFamily: "var(--font-ui)",
              fontWeight: 500,
              fontSize: 15,
              padding: "13px 26px",
              borderRadius: 8,
              textDecoration: "none",
              border: "1.5px solid #E5E7EB",
              transition: "all 0.2s",
            }}
          >
            Watch demo
          </motion.a>
        </motion.div>
      </div>

      {/* ── Dashboard mockup with background glow ── */}
      <div
        style={{
          position: "relative",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* Warm orange radial glow behind mockup */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            transform: "translate(-50%, 0)",
            width: "80%",
            height: "60%",
            background:
              "radial-gradient(ellipse at center, rgba(249,115,22,0.22) 0%, rgba(251,191,36,0.10) 40%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <BrowserMockup />
        </div>
      </div>
    </section>
  );
}
