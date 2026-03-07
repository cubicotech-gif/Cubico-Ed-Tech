"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── CTA Section — Gradient conversion section ───────────────────────────── */

const WA_LINK =
  "https://wa.me/923001234567?text=Hi%20Cubico!%20I'm%20interested%20in%20learning%20about%20your%20EdTech%20solutions%20for%20our%20institution.";

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{
        background: "#0A0014",
        padding: "80px 0 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background blobs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute",
          top: "-20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 600,
          background: "radial-gradient(ellipse, rgba(201,10,109,0.25) 0%, rgba(123,62,255,0.15) 40%, transparent 70%)",
          filter: "blur(40px)",
        }} />
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <motion.div
          style={{
            background: "linear-gradient(135deg, rgba(45,0,79,0.85) 0%, rgba(86,0,111,0.80) 30%, rgba(140,0,92,0.75) 60%, rgba(201,10,109,0.70) 85%, rgba(255,43,122,0.65) 100%)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,43,122,0.25)",
            borderRadius: 28,
            padding: "64px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow:
              "0 0 80px rgba(255,43,122,0.15), 0 0 160px rgba(123,62,255,0.1), 0 40px 80px rgba(0,0,0,0.4)",
          }}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Inner glow rings */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            border: "1px solid rgba(255,43,122,0.1)",
            pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: "1px solid rgba(123,62,255,0.12)",
            pointerEvents: "none",
          }} />

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 11,
              fontFamily: "var(--font-ui)",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: "#F0ECFF",
              padding: "6px 16px",
              borderRadius: 100,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              marginBottom: 28,
            }}
          >
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#22c55e" }} />
            Ready to Transform Your School?
          </motion.div>

          {/* Headline */}
          <motion.h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1.1,
              marginBottom: 20,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Start Your EdTech Journey
            <br />
            <em style={{ fontStyle: "italic" }}>Today.</em>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.75)",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.65,
              fontFamily: "var(--font-body)",
              marginBottom: 40,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Join 500+ institutions already running on Cubico. Get a free demo,
            and see your school live within 4 weeks — or we keep working until it is.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" as const }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#fff",
                color: "#C90A6D",
                fontFamily: "var(--font-ui)",
                fontWeight: 700,
                fontSize: 15,
                padding: "14px 32px",
                borderRadius: 10,
                textDecoration: "none",
                boxShadow: "0 0 30px rgba(255,255,255,0.25)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 50px rgba(255,255,255,0.4)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px rgba(255,255,255,0.25)";
              }}
            >
              Request a Demo
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 16 16">
                <path d="M3 8h10M8 3l5 5-5 5" />
              </svg>
            </a>

            <a
              href="mailto:hello@cubico.tech"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "rgba(255,255,255,0.85)",
                fontFamily: "var(--font-ui)",
                fontWeight: 500,
                fontSize: 15,
                padding: "14px 24px",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 10,
                transition: "all 0.2s ease",
                background: "rgba(255,255,255,0.06)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.12)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.45)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.25)";
              }}
            >
              Email Us
            </a>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            style={{
              display: "flex",
              gap: 32,
              justifyContent: "center",
              marginTop: 40,
              flexWrap: "wrap" as const,
            }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              { icon: "⚡", text: "4-week deployment" },
              { icon: "🌐", text: "Arabic, Urdu, English" },
              { icon: "🔒", text: "Data secure & compliant" },
              { icon: "🏆", text: "500+ institutions" },
            ].map(({ icon, text }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-ui)" }}>
                  {text}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
