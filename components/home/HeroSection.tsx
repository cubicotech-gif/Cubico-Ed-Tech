"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const WA_LINK =
  "https://wa.me/923001234567?text=Hi%20Cubico!%20I'm%20interested%20in%20learning%20about%20your%20EdTech%20solutions%20for%20our%20institution.";

// ─── Static particle data (deterministic to avoid hydration mismatch) ─────────
const PARTICLES = [
  { id: 0,  x: 8,  y: 12, size: 2,   dur: 14, del: 0   },
  { id: 1,  x: 22, y: 55, size: 1.5, dur: 18, del: 1.2 },
  { id: 2,  x: 40, y: 8,  size: 2.5, dur: 12, del: 0.5 },
  { id: 3,  x: 58, y: 72, size: 1,   dur: 16, del: 2   },
  { id: 4,  x: 75, y: 30, size: 2,   dur: 11, del: 0.8 },
  { id: 5,  x: 88, y: 60, size: 1.5, dur: 19, del: 3   },
  { id: 6,  x: 15, y: 80, size: 2,   dur: 13, del: 1.5 },
  { id: 7,  x: 32, y: 40, size: 1,   dur: 17, del: 2.5 },
  { id: 8,  x: 52, y: 20, size: 2.5, dur: 10, del: 0.3 },
  { id: 9,  x: 68, y: 88, size: 1.5, dur: 15, del: 1.8 },
  { id: 10, x: 80, y: 15, size: 1,   dur: 20, del: 4   },
  { id: 11, x: 92, y: 45, size: 2,   dur: 14, del: 0.6 },
  { id: 12, x: 5,  y: 95, size: 1.5, dur: 16, del: 2.2 },
  { id: 13, x: 48, y: 65, size: 2,   dur: 12, del: 1   },
  { id: 14, x: 63, y: 50, size: 1,   dur: 18, del: 3.5 },
  { id: 15, x: 28, y: 25, size: 2.5, dur: 11, del: 0.9 },
  { id: 16, x: 95, y: 78, size: 1.5, dur: 15, del: 2.8 },
  { id: 17, x: 42, y: 92, size: 1,   dur: 13, del: 1.4 },
  { id: 18, x: 71, y: 5,  size: 2,   dur: 17, del: 0.7 },
  { id: 19, x: 18, y: 68, size: 1.5, dur: 14, del: 3.2 },
];

// ─── Layer 1: Animated gradient mesh background ───────────────────────────────
function GradientBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
      {/* Base deep background */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "#060A15" }} />

      {/* Animated mesh gradient (simulates WebGL shader) */}
      <div
        className="animate-gradient-shift"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            radial-gradient(ellipse 60% 60% at 20% 30%, rgba(123,31,162,0.55) 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 80% 20%, rgba(194,24,91,0.45) 0%, transparent 50%),
            radial-gradient(ellipse 55% 55% at 60% 80%, rgba(81,45,168,0.50) 0%, transparent 55%),
            radial-gradient(ellipse 45% 45% at 10% 90%, rgba(136,14,79,0.40) 0%, transparent 45%)
          `,
          backgroundSize: "200% 200%",
          filter: "blur(40px)",
        }}
      />

      {/* Bright pink accent glow — top center */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "35%",
          width: 600,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(255,43,122,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
          pointerEvents: "none",
        }}
      />

      {/* Purple accent glow — bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: "0%",
          right: "0%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(123,62,255,0.20) 0%, transparent 70%)",
          filter: "blur(50px)",
          pointerEvents: "none",
        }}
      />

      {/* Grid dot overlay */}
      <div
        className="grid-dot-pattern"
        style={{ position: "absolute", inset: 0, opacity: 0.25 }}
      />
    </div>
  );
}

// ─── Layer 2: Canvas film-grain noise overlay ─────────────────────────────────
function NoiseOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frameId = 0;

    const draw = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width !== w) canvas.width = w;
      if (canvas.height !== h) canvas.height = h;

      const img = ctx.createImageData(w, h);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const n = Math.random() * 30;
        d[i] = n;
        d[i + 1] = n;
        d[i + 2] = n;
        d[i + 3] = 10; // very subtle
      }
      ctx.putImageData(img, 0, 0);
      frameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        mixBlendMode: "overlay",
        opacity: 0.04,
        zIndex: 2,
      }}
    />
  );
}

// ─── Layer 3: Drifting particle field ────────────────────────────────────────
function ParticleField() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: "rgba(255,255,255,0.5)",
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, p.id % 2 === 0 ? 40 : -40, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.del,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Dashboard: mini SVG line chart ──────────────────────────────────────────
const CHART_VALUES = [82, 85, 78, 92, 88, 95, 91];

function MiniLineChart() {
  const W = 190;
  const H = 52;
  const MIN = 70;
  const MAX = 100;

  const pts = CHART_VALUES.map((v, i) => {
    const x = (i / (CHART_VALUES.length - 1)) * W;
    const y = H - ((v - MIN) / (MAX - MIN)) * H;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");

  const areaPoints = `0,${H} ${pts} ${W},${H}`;

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF2B7A" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#FF2B7A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill="url(#chartFill)" />
      <polyline
        points={pts}
        fill="none"
        stroke="#FF2B7A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Last point highlight dot */}
      {(() => {
        const lastX = W;
        const lastY =
          H - ((CHART_VALUES[CHART_VALUES.length - 1] - MIN) / (MAX - MIN)) * H;
        return (
          <circle cx={lastX} cy={lastY} r="3" fill="#FF2B7A">
            <animate
              attributeName="r"
              values="2;4;2"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
        );
      })()}
    </svg>
  );
}

// ─── Dashboard: inline bar chart ─────────────────────────────────────────────
const BAR_DATA = [65, 80, 55, 90, 75, 45, 85];
const BAR_DAYS = ["M", "T", "W", "T", "F", "S", "S"];

function MiniBarChart() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 44 }}>
      {BAR_DATA.map((h, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <div
            style={{
              width: "100%",
              height: Math.round((h / 100) * 36),
              borderRadius: "3px 3px 0 0",
              background:
                i === 3
                  ? "linear-gradient(180deg, #FF2B7A, #7B3EFF)"
                  : "rgba(255,255,255,0.12)",
            }}
          />
          <div
            style={{
              fontSize: 7,
              color: "rgba(255,255,255,0.3)",
              fontFamily: "var(--font-ui)",
            }}
          >
            {BAR_DAYS[i]}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Dashboard UI inside the laptop screen ───────────────────────────────────
const METRICS = [
  { label: "Performance", value: "82%", delta: "+12%" },
  { label: "Engagement", value: "+23%", delta: "↑ trend" },
  { label: "Leadership", value: "+41%", delta: "↑ trend" },
];

const NAV = ["Dashboard", "Analytics", "Coaching", "Team"];

function DashboardUI() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "72px 1fr",
        gap: 8,
        padding: 10,
        backgroundColor: "#0A0A12",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 10,
          padding: "10px 8px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: "linear-gradient(135deg, #FF2B7A, #7B3EFF)",
            margin: "0 auto 4px",
            flexShrink: 0,
          }}
        />
        {NAV.map((item, i) => (
          <div
            key={item}
            style={{
              padding: "5px 6px",
              borderRadius: 6,
              backgroundColor:
                i === 0 ? "rgba(255,43,122,0.18)" : "transparent",
              color:
                i === 0 ? "#FF2B7A" : "rgba(255,255,255,0.35)",
              fontSize: 8,
              fontFamily: "var(--font-ui)",
              fontWeight: i === 0 ? 600 : 400,
              textAlign: "center",
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Main pane */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 10,
            padding: "7px 10px",
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: 9,
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
            }}
          >
            Performance Overview
          </span>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #FF2B7A, #7B3EFF)",
            }}
          />
        </div>

        {/* Metric cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          {METRICS.map((m) => (
            <div
              key={m.label}
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 10,
                padding: "9px 9px",
              }}
            >
              <div
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: 7,
                  fontFamily: "var(--font-ui)",
                  marginBottom: 4,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {m.label}
              </div>
              <div
                style={{
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: "var(--font-ui)",
                  lineHeight: 1,
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  color: "#4ADE80",
                  fontSize: 7,
                  marginTop: 3,
                  fontFamily: "var(--font-ui)",
                }}
              >
                {m.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, flex: 1 }}>
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10,
              padding: "9px 10px",
            }}
          >
            <div
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: 7,
                fontFamily: "var(--font-ui)",
                marginBottom: 6,
              }}
            >
              Trend
            </div>
            <MiniLineChart />
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10,
              padding: "9px 10px",
            }}
          >
            <div
              style={{
                color: "rgba(255,255,255,0.35)",
                fontSize: 7,
                fontFamily: "var(--font-ui)",
                marginBottom: 6,
              }}
            >
              Weekly
            </div>
            <MiniBarChart />
          </div>
        </div>

        {/* Notifications row */}
        <div
          style={{
            display: "flex",
            gap: 6,
          }}
        >
          {[
            { icon: "✅", text: "Attendance Synced", sub: "Grade 5-B · Just now" },
            { icon: "🎬", text: "Lesson Ready", sub: "Arabic Grammar Ch.4" },
          ].map((n) => (
            <div
              key={n.text}
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 8,
                padding: "7px 8px",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span style={{ fontSize: 12 }}>{n.icon}</span>
              <div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 8,
                    fontWeight: 600,
                    fontFamily: "var(--font-ui)",
                  }}
                >
                  {n.text}
                </div>
                <div
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    fontSize: 7,
                    fontFamily: "var(--font-ui)",
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
    </div>
  );
}

// ─── Device mockup: laptop with 3-D tilt ─────────────────────────────────────
function LaptopMockup() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <motion.div
      ref={wrapRef}
      className="hidden lg:flex"
      style={{ y, justifyContent: "center", alignItems: "center" }}
      initial={{ opacity: 0, x: 60, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div style={{ position: "relative", width: 540 }}>
        {/* Screen bezel */}
        <div
          style={{
            backgroundColor: "#1C1C1E",
            borderRadius: 18,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.06), 0 30px 90px rgba(0,0,0,0.7), 0 0 80px rgba(255,43,122,0.18)",
            transform: "rotateY(-10deg) rotateX(3deg)",
            transformStyle: "preserve-3d",
            perspective: 1200,
          }}
        >
          {/* Glass sheen */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, transparent 45%)",
              pointerEvents: "none",
              zIndex: 10,
              borderRadius: 18,
            }}
          />

          {/* Title bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
              backgroundColor: "#141418",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
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
            <div
              style={{
                background: "rgba(255,255,255,0.07)",
                borderRadius: 5,
                padding: "3px 44px",
                color: "rgba(255,255,255,0.25)",
                fontSize: 9,
                fontFamily: "var(--font-ui)",
              }}
            >
              cubico.edu/dashboard
            </div>
            <div style={{ width: 52 }} />
          </div>

          {/* Live dashboard */}
          <div style={{ height: 310 }}>
            <DashboardUI />
          </div>
        </div>

        {/* Laptop base shadow */}
        <div
          style={{
            position: "absolute",
            bottom: -30,
            left: "8%",
            right: "8%",
            height: 20,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,43,122,0.45) 0%, transparent 70%)",
            filter: "blur(18px)",
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Floating glassmorphic cards ──────────────────────────────────────────────
function FloatingCards() {
  return (
    <>
      {/* Performance score — top right */}
      <motion.div
        className="hidden lg:block"
        style={{ position: "absolute", top: "18%", right: "5%", zIndex: 15 }}
        initial={{ opacity: 0, y: 20, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 1.1 }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            style={{
              background: "rgba(10, 6, 22, 0.88)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,43,122,0.3)",
              borderRadius: 14,
              padding: "14px 18px",
              boxShadow:
                "0 8px 40px rgba(255,43,122,0.18), inset 0 1px 0 rgba(255,255,255,0.07)",
              minWidth: 148,
            }}
          >
            <div
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: 10,
                fontFamily: "var(--font-ui)",
                marginBottom: 6,
                letterSpacing: "0.04em",
              }}
            >
              Performance Score
            </div>
            <div
              style={{
                color: "#fff",
                fontSize: 26,
                fontWeight: 700,
                fontFamily: "var(--font-ui)",
                lineHeight: 1,
              }}
            >
              82%
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginTop: 6,
              }}
            >
              <span
                style={{
                  color: "#4ADE80",
                  fontSize: 11,
                  fontFamily: "var(--font-ui)",
                  fontWeight: 600,
                }}
              >
                ↑ +12%
              </span>
              <span
                style={{
                  color: "rgba(255,255,255,0.25)",
                  fontSize: 10,
                  fontFamily: "var(--font-ui)",
                }}
              >
                vs last month
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Coaching notification — bottom right of mockup */}
      <motion.div
        className="hidden lg:block"
        style={{ position: "absolute", bottom: "24%", right: "4%", zIndex: 15 }}
        initial={{ opacity: 0, y: 20, scale: 0.85 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 1.4 }}
      >
        <motion.div
          animate={{ y: [0, 14, 0] }}
          transition={{
            duration: 6,
            delay: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            style={{
              background: "rgba(10, 6, 22, 0.88)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(123,62,255,0.3)",
              borderRadius: 14,
              padding: "12px 16px",
              boxShadow:
                "0 8px 40px rgba(123,62,255,0.18), inset 0 1px 0 rgba(255,255,255,0.07)",
              display: "flex",
              alignItems: "center",
              gap: 10,
              minWidth: 210,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                background: "linear-gradient(135deg, #7B3EFF, #FF2B7A)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              ✅
            </div>
            <div>
              <div
                style={{
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: "var(--font-ui)",
                }}
              >
                Coaching session completed
              </div>
              <div
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: 9,
                  fontFamily: "var(--font-ui)",
                  marginTop: 2,
                }}
              >
                Grade 8-A · Just now
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Live sessions — mid left */}
      <motion.div
        className="hidden xl:block"
        style={{ position: "absolute", top: "48%", left: "3%", zIndex: 15 }}
        initial={{ opacity: 0, x: -20, scale: 0.85 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 1.7 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 7,
            delay: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            style={{
              background: "rgba(10, 6, 22, 0.88)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 14,
              padding: "12px 16px",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {/* Stacked avatars */}
            <div style={{ display: "flex" }}>
              {["#FF2B7A", "#7B3EFF", "#4F46E5", "#06D6A0"].map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    backgroundColor: c,
                    marginLeft: i > 0 ? -9 : 0,
                    border: "2px solid rgba(10,6,22,0.95)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 9,
                    color: "#fff",
                    fontWeight: 700,
                    fontFamily: "var(--font-ui)",
                  }}
                >
                  {["A", "B", "C", "+"][i]}
                </div>
              ))}
            </div>
            <div>
              <div
                style={{
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 600,
                  fontFamily: "var(--font-ui)",
                }}
              >
                3 active sessions
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <div
                  className="animate-pulse-dot"
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "#4ADE80",
                  }}
                />
                <span
                  style={{
                    color: "#4ADE80",
                    fontSize: 9,
                    fontFamily: "var(--font-ui)",
                  }}
                >
                  Live now
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

// ─── Hero text & CTAs ─────────────────────────────────────────────────────────
function HeroContent() {
  return (
    <div style={{ position: "relative", zIndex: 5 }}>
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          backgroundColor: "rgba(255,43,122,0.08)",
          border: "1px solid rgba(255,43,122,0.28)",
          borderRadius: 100,
          padding: "6px 16px",
          marginBottom: 28,
        }}
      >
        <span
          className="animate-pulse-dot"
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "#FF2B7A",
            display: "inline-block",
            boxShadow: "0 0 8px #FF2B7A",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-ui)",
            fontSize: 13,
            fontWeight: 500,
            color: "#FF2B7A",
            letterSpacing: "0.04em",
          }}
        >
          AI-Powered EdTech for Institutions
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(42px, 5.5vw, 74px)",
          fontWeight: 700,
          lineHeight: 1.05,
          color: "#E2E8F0",
          margin: 0,
          marginBottom: 22,
          letterSpacing: "-0.025em",
        }}
      >
        Build a workforce
        <br />
        <span
          style={{
            background:
              "linear-gradient(135deg, #FF2B7A 0%, #A855F7 55%, #4F46E5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          ready for anything.
        </span>
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 18,
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.75,
          margin: 0,
          marginBottom: 42,
          maxWidth: 480,
        }}
      >
        AI-powered coaching and human guidance designed to unlock potential
        and drive enterprise performance across every institution.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        style={{
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 52,
        }}
      >
        <motion.a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.04,
            boxShadow: "0 0 60px rgba(255,43,122,0.55)",
          }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "linear-gradient(135deg, #FF2B7A 0%, #7B3EFF 100%)",
            color: "#fff",
            fontFamily: "var(--font-ui)",
            fontWeight: 600,
            fontSize: 15,
            padding: "14px 30px",
            borderRadius: 100,
            textDecoration: "none",
            boxShadow: "0 0 40px rgba(255,43,122,0.38)",
            letterSpacing: "0.01em",
          }}
        >
          💬 Request a Demo
        </motion.a>

        <motion.a
          href="#results"
          whileHover={{ backgroundColor: "rgba(255,255,255,0.07)" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            color: "rgba(255,255,255,0.6)",
            fontFamily: "var(--font-ui)",
            fontWeight: 500,
            fontSize: 15,
            padding: "14px 24px",
            textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 100,
            transition: "background-color 0.2s",
          }}
        >
          Watch Video →
        </motion.a>
      </motion.div>

      {/* Trust line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.2)",
            fontSize: 11,
            fontFamily: "var(--font-ui)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Trusted in
        </span>
        {["🇵🇰 Pakistan", "🇸🇦 Saudi Arabia", "🇨🇦 Canada"].map((c) => (
          <span
            key={c}
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: 13,
              fontFamily: "var(--font-ui)",
              letterSpacing: "0.02em",
            }}
          >
            {c}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Main cinematic hero section ──────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section
      className="hero-section"
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#060A15",
        display: "flex",
        alignItems: "center",
        paddingTop: 72,
      }}
    >
      {/* ── Background layers ── */}
      <GradientBackground />
      <NoiseOverlay />
      <ParticleField />

      {/* ── Main two-column layout ── */}
      <div
        className="hero-two-col"
        style={{
          maxWidth: 1260,
          margin: "0 auto",
          padding: "80px 5%",
          width: "100%",
          position: "relative",
          zIndex: 5,
        }}
      >
        <HeroContent />

        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LaptopMockup />
        </div>
      </div>

      {/* ── Floating UI overlays ── */}
      <FloatingCards />

      {/* ── Bottom vignette fade ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 160,
          background:
            "linear-gradient(to top, #060A15 0%, transparent 100%)",
          zIndex: 4,
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
