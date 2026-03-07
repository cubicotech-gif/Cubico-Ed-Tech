"use client";

/* ── Trust Marquee — Infinite scroll enterprise logo strip ──────────────── */

const LOGOS = [
  { name: "Ministry of Education", icon: "🏛️" },
  { name: "Al-Noor Academy", icon: "🕌" },
  { name: "Beaconhouse", icon: "🏫" },
  { name: "The City School", icon: "🎓" },
  { name: "DPS International", icon: "🌐" },
  { name: "Roots IVY", icon: "📚" },
  { name: "SABIS Network", icon: "🔷" },
  { name: "Al-Rowad Schools", icon: "🌙" },
  { name: "Lahore Grammar School", icon: "✏️" },
  { name: "Karachi Grammar School", icon: "📖" },
];

export default function TrustMarquee() {
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <section
      style={{
        position: "relative",
        background: "#0A0014",
        padding: "40px 0",
        overflow: "hidden",
      }}
    >
      {/* Top separator line */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(123,62,255,0.3), rgba(255,43,122,0.3), transparent)",
      }} />
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(123,62,255,0.3), rgba(255,43,122,0.3), transparent)",
      }} />

      {/* Label */}
      <div style={{
        textAlign: "center",
        marginBottom: 24,
        fontSize: 11,
        fontFamily: "var(--font-ui)",
        letterSpacing: "0.14em",
        textTransform: "uppercase" as const,
        color: "#6B5E85",
      }}>
        Trusted by institutions across Pakistan, Saudi Arabia & Canada
      </div>

      {/* Marquee wrapper with edge fade */}
      <div
        style={{
          position: "relative",
          maskImage: "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
        }}
      >
        <div
          className="marquee-track"
          style={{
            display: "inline-flex",
            gap: "0px",
          }}
        >
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="trust-logo-item"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 36px",
                borderRight: "1px solid rgba(191,168,255,0.07)",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: 20 }}>{logo.icon}</span>
              <span style={{
                fontFamily: "var(--font-ui)",
                fontWeight: 600,
                fontSize: 14,
                color: "#A89DC4",
                whiteSpace: "nowrap" as const,
              }}>
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
