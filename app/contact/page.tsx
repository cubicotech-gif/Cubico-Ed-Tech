"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Metadata } from "next";

const pageTitle = "Contact Cubico Technologies | Free EdTech Consultation";
const pageDescription =
  "Get in touch with Cubico Technologies. Free consultation for educational institutions. WhatsApp, email, or contact form. Based in Karachi, serving worldwide.";

const WHATSAPP_URL =
  "https://wa.me/923001234567?text=Hi%20Cubico!%20I'd%20like%20to%20chat%20about%20your%20EdTech%20solutions.";

const PROCESS_STEPS = [
  { icon: "💬", title: "You send a message", description: "Via WhatsApp, email, or the form below. Any channel works." },
  { icon: "⚡", title: "We reply within 2 hours", description: "During business hours. We take response time seriously." },
  { icon: "📞", title: "Free 30-min consultation", description: "A relaxed call to understand your institution's needs." },
  { icon: "📋", title: "Custom proposal", description: "We put together a tailored plan and transparent pricing." },
  { icon: "🤝", title: "You decide — no pressure", description: "Take your time. We're here whenever you're ready." },
];

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  background: "#060A15",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  padding: "14px 16px",
  color: "#E2E8F0",
  fontFamily: "var(--font-body)",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

function FadeIn({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    institution: "",
    contact: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fieldStyle = (name: string): React.CSSProperties => ({
    ...INPUT_STYLE,
    borderColor: focused === name ? "#4F46E5" : "rgba(255,255,255,0.1)",
  });

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          textAlign: "center",
          padding: "48px 32px",
          background: "rgba(79,70,229,0.08)",
          border: "1px solid rgba(79,70,229,0.3)",
          borderRadius: "12px",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "24px",
            fontWeight: 700,
            color: "#E2E8F0",
            marginBottom: "12px",
          }}
        >
          Message received!
        </h3>
        <p style={{ fontFamily: "var(--font-body)", color: "#94A3B8", fontSize: "16px" }}>
          Thank you! We&apos;ll be in touch within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontFamily: "var(--font-ui)", fontSize: "13px", fontWeight: 600, color: "#94A3B8", letterSpacing: "0.04em" }}>
            Your Name *
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            placeholder="Ahmed Khan"
            style={fieldStyle("name")}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontFamily: "var(--font-ui)", fontSize: "13px", fontWeight: 600, color: "#94A3B8", letterSpacing: "0.04em" }}>
            Institution Name *
          </label>
          <input
            type="text"
            required
            value={form.institution}
            onChange={(e) => setForm({ ...form, institution: e.target.value })}
            onFocus={() => setFocused("institution")}
            onBlur={() => setFocused(null)}
            placeholder="Bright Future Academy"
            style={fieldStyle("institution")}
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label style={{ fontFamily: "var(--font-ui)", fontSize: "13px", fontWeight: 600, color: "#94A3B8", letterSpacing: "0.04em" }}>
          Email or Phone *
        </label>
        <input
          type="text"
          required
          value={form.contact}
          onChange={(e) => setForm({ ...form, contact: e.target.value })}
          onFocus={() => setFocused("contact")}
          onBlur={() => setFocused(null)}
          placeholder="you@institution.edu or +92 300 000 0000"
          style={fieldStyle("contact")}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label style={{ fontFamily: "var(--font-ui)", fontSize: "13px", fontWeight: 600, color: "#94A3B8", letterSpacing: "0.04em" }}>
          What Are You Looking For?
        </label>
        <select
          value={form.interest}
          onChange={(e) => setForm({ ...form, interest: e.target.value })}
          onFocus={() => setFocused("interest")}
          onBlur={() => setFocused(null)}
          style={{
            ...fieldStyle("interest"),
            appearance: "none",
            cursor: "pointer",
          }}
        >
          <option value="" disabled>Select an option...</option>
          <option value="school-management">School Management</option>
          <option value="animated-content">Animated Content</option>
          <option value="game-based">Game-Based Learning</option>
          <option value="digital-transformation">Digital Transformation</option>
          <option value="not-sure">Not Sure Yet</option>
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <label style={{ fontFamily: "var(--font-ui)", fontSize: "13px", fontWeight: 600, color: "#94A3B8", letterSpacing: "0.04em" }}>
          Anything else? <span style={{ color: "#64748B", fontWeight: 400 }}>(optional)</span>
        </label>
        <textarea
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          onFocus={() => setFocused("message")}
          onBlur={() => setFocused(null)}
          placeholder="Tell us about your institution, your challenges, or anything else on your mind..."
          style={{
            ...fieldStyle("message"),
            resize: "vertical",
            minHeight: "120px",
          }}
        />
      </div>

      <motion.button
        type="submit"
        whileHover={{ translateY: -2, boxShadow: "0 0 50px rgba(79,70,229,0.6)" }}
        style={{
          background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
          padding: "16px 32px",
          borderRadius: "8px",
          fontFamily: "var(--font-ui)",
          fontWeight: 600,
          color: "white",
          fontSize: "16px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 0 30px rgba(79,70,229,0.4)",
          transition: "box-shadow 0.2s",
          alignSelf: "flex-start",
        }}
      >
        Send Message →
      </motion.button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div style={{ background: "#060A15", minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          paddingTop: "140px",
          paddingBottom: "100px",
          paddingLeft: "5%",
          paddingRight: "5%",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(79,70,229,0.12) 0%, transparent 70%)",
          }}
        />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#818CF8",
                marginBottom: "20px",
              }}
            >
              Get in Touch
            </p>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(36px, 5vw, 60px)",
                color: "#E2E8F0",
                lineHeight: 1.15,
                marginBottom: "24px",
              }}
            >
              Let&apos;s Talk About Your Institution.
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(16px, 2vw, 20px)",
                color: "#94A3B8",
                maxWidth: "640px",
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              Whether you have a specific project in mind or just want to explore what&apos;s
              possible, we are here. No sales pitch. No pressure. Just a conversation between people
              who care about education.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── CONTACT METHODS GRID ── */}
      <section
        style={{
          paddingTop: "20px",
          paddingBottom: "100px",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {/* Card 1 — WhatsApp (Featured) */}
          <FadeIn delay={0.0} style={{ gridColumn: "span 1" }}>
            <motion.div
              whileHover={{ translateY: -4, boxShadow: "0 0 50px rgba(79,70,229,0.25)" }}
              style={{
                background: "#101E32",
                border: "1px solid rgba(79,70,229,0.5)",
                borderRadius: "16px",
                padding: "36px 28px",
                height: "100%",
                boxSizing: "border-box",
                boxShadow: "0 0 30px rgba(79,70,229,0.15)",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "26px",
                }}
              >
                💬
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#818CF8",
                    marginBottom: "6px",
                  }}
                >
                  WhatsApp
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#E2E8F0",
                    marginBottom: "6px",
                  }}
                >
                  +92 300 123 4567
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#94A3B8", lineHeight: 1.6 }}>
                  Message us on WhatsApp. It&apos;s the fastest way to start a conversation. Typically
                  respond within 2 hours.
                </p>
              </div>
              <motion.a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ translateY: -2, boxShadow: "0 0 40px rgba(6,214,160,0.5)" }}
                style={{
                  display: "inline-block",
                  marginTop: "auto",
                  background: "#25D366",
                  color: "white",
                  fontFamily: "var(--font-ui)",
                  fontWeight: 600,
                  fontSize: "15px",
                  padding: "14px 24px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  textAlign: "center",
                  boxShadow: "0 0 20px rgba(37,211,102,0.3)",
                  transition: "box-shadow 0.2s",
                }}
              >
                Message on WhatsApp →
              </motion.a>
            </motion.div>
          </FadeIn>

          {/* Card 2 — Email */}
          <FadeIn delay={0.1}>
            <motion.div
              whileHover={{ translateY: -4, boxShadow: "0 0 30px rgba(79,70,229,0.15)" }}
              style={{
                background: "#101E32",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "32px 28px",
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "12px",
                  background: "rgba(79,70,229,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                }}
              >
                ✉️
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#818CF8",
                    marginBottom: "6px",
                  }}
                >
                  Email
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "#E2E8F0",
                    marginBottom: "6px",
                    wordBreak: "break-all",
                  }}
                >
                  hello@cubicotechnologies.com
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#94A3B8", lineHeight: 1.6 }}>
                  Prefer email? Send us a message and we&apos;ll get back to you within 24 hours.
                </p>
              </div>
              <motion.a
                href="mailto:hello@cubicotechnologies.com"
                whileHover={{ translateY: -2 }}
                style={{
                  display: "inline-block",
                  marginTop: "auto",
                  background: "transparent",
                  color: "#818CF8",
                  fontFamily: "var(--font-ui)",
                  fontWeight: 600,
                  fontSize: "14px",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  border: "1px solid rgba(129,140,248,0.4)",
                  textAlign: "center",
                }}
              >
                Send Email →
              </motion.a>
            </motion.div>
          </FadeIn>

          {/* Card 3 — LinkedIn */}
          <FadeIn delay={0.2}>
            <motion.div
              whileHover={{ translateY: -4, boxShadow: "0 0 30px rgba(79,70,229,0.15)" }}
              style={{
                background: "#101E32",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "32px 28px",
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "12px",
                  background: "rgba(10,102,194,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                }}
              >
                💼
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#818CF8",
                    marginBottom: "6px",
                  }}
                >
                  LinkedIn
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "#E2E8F0",
                    marginBottom: "6px",
                  }}
                >
                  linkedin.com/company/cubico-technologies
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#94A3B8", lineHeight: 1.6 }}>
                  Follow us for EdTech insights and project updates.
                </p>
              </div>
              <motion.a
                href="https://linkedin.com/company/cubico-technologies"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ translateY: -2 }}
                style={{
                  display: "inline-block",
                  marginTop: "auto",
                  background: "transparent",
                  color: "#818CF8",
                  fontFamily: "var(--font-ui)",
                  fontWeight: 600,
                  fontSize: "14px",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  border: "1px solid rgba(129,140,248,0.4)",
                  textAlign: "center",
                }}
              >
                Visit LinkedIn ↗
              </motion.a>
            </motion.div>
          </FadeIn>

          {/* Card 4 — Location */}
          <FadeIn delay={0.3}>
            <motion.div
              whileHover={{ translateY: -4, boxShadow: "0 0 30px rgba(79,70,229,0.15)" }}
              style={{
                background: "#101E32",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "32px 28px",
                height: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "12px",
                  background: "rgba(6,214,160,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                }}
              >
                📍
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#818CF8",
                    marginBottom: "6px",
                  }}
                >
                  Location
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#E2E8F0",
                    marginBottom: "6px",
                  }}
                >
                  Karachi, Pakistan 🇵🇰
                </p>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", color: "#94A3B8", lineHeight: 1.6 }}>
                  Based in Karachi, serving institutions worldwide.
                </p>
              </div>
              <div
                style={{
                  marginTop: "auto",
                  background: "rgba(6,214,160,0.08)",
                  border: "1px solid rgba(6,214,160,0.2)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  fontFamily: "var(--font-ui)",
                  fontSize: "13px",
                  color: "#06D6A0",
                  fontWeight: 500,
                }}
              >
                🌍 Serving globally — remote-first
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* ── WHAT HAPPENS NEXT ── */}
      <section
        style={{
          background: "#0C1528",
          paddingTop: "100px",
          paddingBottom: "100px",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#818CF8",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              The Process
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(36px, 4vw, 52px)",
                color: "#E2E8F0",
                textAlign: "center",
                marginBottom: "64px",
              }}
            >
              What Happens After You Message Us
            </h2>
          </FadeIn>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "32px",
              alignItems: "start",
            }}
          >
            {PROCESS_STEPS.map((step, index) => (
              <FadeIn key={index} delay={index * 0.1}>
                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, rgba(79,70,229,0.3), rgba(124,58,237,0.3))",
                      border: "1px solid rgba(79,70,229,0.4)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "28px",
                      margin: "0 auto 16px",
                    }}
                  >
                    {step.icon}
                  </div>
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-ui)",
                      fontWeight: 700,
                      fontSize: "13px",
                      color: "white",
                      margin: "-8px auto 12px",
                    }}
                  >
                    {index + 1}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "#E2E8F0",
                      marginBottom: "8px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      color: "#94A3B8",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section
        style={{
          paddingTop: "100px",
          paddingBottom: "100px",
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <FadeIn>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#818CF8",
                textAlign: "center",
                marginBottom: "16px",
              }}
            >
              Contact Form
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(28px, 3vw, 42px)",
                color: "#E2E8F0",
                textAlign: "center",
                marginBottom: "48px",
              }}
            >
              Not on WhatsApp? Send us a message here.
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div
              style={{
                background: "#101E32",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "40px 36px",
              }}
            >
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
