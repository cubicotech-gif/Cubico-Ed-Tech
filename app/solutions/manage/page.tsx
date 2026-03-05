"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Metadata } from "next";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

interface PainPoint {
  emoji: string;
  text: string;
}

interface Feature {
  emoji: string;
  name: string;
  description: string;
}

interface Step {
  week: string;
  title: string;
  description: string;
}

interface Beneficiary {
  icon: string;
  role: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const painPoints: PainPoint[] = [
  { emoji: "📋", text: "Student records scattered across multiple Excel files and paper registers" },
  { emoji: "💸", text: "Fee collection is manual, error-prone, and impossible to audit at a glance" },
  { emoji: "📅", text: "Attendance is still taken by hand — and chasing defaulters takes hours" },
  { emoji: "📞", text: "Parents call constantly because there's no way for them to check progress online" },
  { emoji: "📊", text: "Reports for the board or owner take days to compile from fragmented data" },
];

const features: Feature[] = [
  {
    emoji: "🎓",
    name: "Student Management",
    description: "Centralized student profiles with academic history, documents, health records, and guardian contacts — all searchable in seconds.",
  },
  {
    emoji: "💰",
    name: "Fee & Finance",
    description: "Automated fee invoicing, online payment tracking, overdue alerts, discount management, and instant financial reports.",
  },
  {
    emoji: "📆",
    name: "Attendance & Timetable",
    description: "Digital attendance marking per class or subject, automated SMS/WhatsApp alerts to parents, and drag-and-drop timetable builder.",
  },
  {
    emoji: "🤝",
    name: "Parent-Teacher Portal",
    description: "A dedicated parent app and teacher dashboard so communication, progress updates, and homework is transparent and instant.",
  },
  {
    emoji: "👩‍💼",
    name: "Staff & HR",
    description: "Manage staff profiles, roles, payroll cycles, leave requests, and performance records without a separate HR system.",
  },
  {
    emoji: "📈",
    name: "Reports & Analytics",
    description: "One-click reports on enrolment, revenue, attendance trends, academic performance, and branch comparisons for multi-campus networks.",
  },
];

const steps: Step[] = [
  {
    week: "Week 1–2",
    title: "Discovery & Setup",
    description: "We map your current processes, import your existing data, and configure the platform to match your institution's structure.",
  },
  {
    week: "Week 2–3",
    title: "Training & Pilot",
    description: "Admin staff, teachers, and key stakeholders get hands-on training. We run a live pilot with one class or department first.",
  },
  {
    week: "Week 3–4",
    title: "Full Rollout",
    description: "The entire institution goes live. Our team stays on-call for 30 days post-launch to ensure a smooth transition.",
  },
];

const beneficiaries: Beneficiary[] = [
  {
    icon: "🏫",
    role: "Principals",
    description: "See every department's health at a glance. Spend less time chasing data and more time on strategic decisions.",
  },
  {
    icon: "🖥️",
    role: "Admin Staff",
    description: "Cut repetitive paperwork by up to 80%. Handle enrolments, fees, and communications from a single screen.",
  },
  {
    icon: "📚",
    role: "Teachers",
    description: "Mark attendance digitally, share homework, track individual student progress, and stay in sync with parents.",
  },
  {
    icon: "👨‍👩‍👧",
    role: "Parents",
    description: "Check attendance, results, fee status, and messages from the school — all from their phone, any time.",
  },
  {
    icon: "💼",
    role: "School Owners",
    description: "Monitor all campuses from a single dashboard. Get the financial and operational clarity needed to scale.",
  },
];

const faqs: FAQItem[] = [
  {
    question: "How long does it take to migrate our existing student data?",
    answer: "For most institutions, data migration from Excel or existing software takes 3–5 business days. We handle the entire process — you provide the files and we do the rest, with a full data verification step before go-live.",
  },
  {
    question: "Does Cubico Manage work for multi-campus networks?",
    answer: "Yes. Cubico Manage is built for networks with 1 to 50+ campuses. Each campus has its own admin access while school owners and directors get a unified cross-campus view for reporting and oversight.",
  },
  {
    question: "Is training included, and what happens after the first month?",
    answer: "Full onboarding training for all staff roles is included in every plan. After the initial 30-day hand-holding period, you get access to our knowledge base, video tutorials, and ongoing support via WhatsApp and email.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function AnimatedSection({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function FloatingParticle({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      animate={{ y: [0, -20, 0], opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        width: 4,
        height: 4,
        borderRadius: "50%",
        background: "#4F46E5",
        ...style,
      }}
    />
  );
}

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            background: "#101E32",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 24px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-ui)",
                fontWeight: 600,
                fontSize: 16,
                color: "#E2E8F0",
              }}
            >
              {item.question}
            </span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.2 }}
              style={{
                flexShrink: 0,
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "rgba(79,70,229,0.2)",
                border: "1px solid rgba(79,70,229,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#818CF8",
                fontSize: 18,
                lineHeight: 1,
              }}
            >
              +
            </motion.span>
          </button>
          <motion.div
            initial={false}
            animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                margin: 0,
                padding: "0 24px 20px",
                fontFamily: "var(--font-body)",
                fontSize: 15,
                color: "#94A3B8",
                lineHeight: 1.7,
              }}
            >
              {item.answer}
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ManagePage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const WA_URL =
    "https://wa.me/923001234567?text=Hi!%20I%20want%20to%20know%20more%20about%20your%20school%20management%20system%20and%20how%20it%20can%20help%20our%20institution.";

  const ctaButtonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
    padding: "16px 32px",
    borderRadius: 8,
    fontFamily: "var(--font-ui)",
    fontWeight: 600,
    fontSize: 16,
    color: "white",
    textDecoration: "none",
    boxShadow: "0 0 30px rgba(79,70,229,0.4)",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  };

  return (
    <main style={{ background: "#060A15", minHeight: "100vh", color: "#E2E8F0", overflowX: "hidden" }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          paddingTop: 140,
          paddingBottom: 120,
          paddingLeft: "5%",
          paddingRight: "5%",
          overflow: "hidden",
        }}
      >
        {/* Gradient orb */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 800,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(79,70,229,0.18) 0%, rgba(124,58,237,0.08) 50%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Floating particles */}
        {[
          { top: "20%", left: "15%" },
          { top: "60%", left: "8%" },
          { top: "35%", right: "12%" },
          { top: "75%", right: "20%" },
          { top: "50%", left: "45%" },
          { top: "15%", right: "35%" },
        ].map((pos, i) => (
          <FloatingParticle key={i} style={{ ...pos } as React.CSSProperties} />
        ))}

        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 8,
              alignItems: "center",
              marginBottom: 28,
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "#64748B",
            }}
          >
            <Link href="/" style={{ color: "#64748B", textDecoration: "none" }}>Home</Link>
            <span>›</span>
            <Link href="/solutions" style={{ color: "#64748B", textDecoration: "none" }}>Solutions</Link>
            <span>›</span>
            <span style={{ color: "#818CF8" }}>Manage</span>
          </motion.nav>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={heroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ marginBottom: 28 }}
          >
            <span
              style={{
                display: "inline-block",
                background: "rgba(79,70,229,0.15)",
                border: "1px solid rgba(79,70,229,0.4)",
                borderRadius: 100,
                padding: "6px 18px",
                fontFamily: "var(--font-ui)",
                fontSize: 13,
                fontWeight: 600,
                color: "#818CF8",
                letterSpacing: "0.05em",
              }}
            >
              Cubico Manage™
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "#E2E8F0",
              lineHeight: 1.15,
              margin: "0 0 24px",
            }}
          >
            Stop Managing Spreadsheets.
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #818CF8, #7C3AED)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Start Managing Education.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "clamp(16px, 2vw, 19px)",
              color: "#94A3B8",
              lineHeight: 1.75,
              maxWidth: 700,
              margin: "0 auto 40px",
            }}
          >
            Cubico Manage is a complete, cloud-based school management platform designed for South Asian and Middle Eastern institutions. From student enrolment to board-level analytics, every function your institution needs — fees, attendance, parent communication, staff HR, and multi-campus reporting — lives in one place, accessible from any device.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={ctaButtonStyle}
              whileHover={{ y: -2, boxShadow: "0 0 50px rgba(79,70,229,0.6)" }}
            >
              💬 Discuss Management Solutions
            </motion.a>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.65 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 48,
              marginTop: 64,
              flexWrap: "wrap",
            }}
          >
            {[
              { value: "500+", label: "Institutions Served" },
              { value: "3–4 Weeks", label: "Average Rollout Time" },
              { value: "80%", label: "Reduction in Admin Work" },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(28px, 3vw, 40px)",
                    fontWeight: 700,
                    color: "#818CF8",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontSize: 13,
                    color: "#64748B",
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEM SECTION ────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#0C1528",
          paddingTop: 100,
          paddingBottom: 100,
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#818CF8",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              The Problem
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 48px)",
                color: "#E2E8F0",
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              Sound Familiar?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                color: "#94A3B8",
                textAlign: "center",
                maxWidth: 580,
                margin: "0 auto 60px",
                lineHeight: 1.7,
              }}
            >
              These are the challenges we hear from institutions across Pakistan, Saudi Arabia, and the UAE every week.
            </p>
          </AnimatedSection>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {painPoints.map((point, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(79,70,229,0.15)" }}
                  style={{
                    background: "#101E32",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 16,
                    padding: "28px 24px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 16,
                    transition: "box-shadow 0.2s ease",
                  }}
                >
                  <span style={{ fontSize: 28, flexShrink: 0 }}>{point.emoji}</span>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 15,
                      color: "#94A3B8",
                      margin: 0,
                      lineHeight: 1.65,
                    }}
                  >
                    {point.text}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.5} style={{ textAlign: "center", marginTop: 48 }}>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 18,
                fontWeight: 600,
                color: "#E2E8F0",
              }}
            >
              If any of these sound familiar, Cubico Manage was built specifically for you.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FEATURES SECTION ───────────────────────────────────────────────── */}
      <section
        style={{
          paddingTop: 100,
          paddingBottom: 100,
          paddingLeft: "5%",
          paddingRight: "5%",
          background: "#060A15",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#818CF8",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Platform Features
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 52px)",
                color: "#E2E8F0",
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              One Platform. Every Department.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                color: "#94A3B8",
                textAlign: "center",
                maxWidth: 580,
                margin: "0 auto 64px",
                lineHeight: 1.7,
              }}
            >
              Purpose-built modules that cover every operational and academic function of a modern school or university.
            </p>
          </AnimatedSection>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: 24,
            }}
          >
            {features.map((feat, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(79,70,229,0.2)" }}
                  style={{
                    background: "#101E32",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 16,
                    padding: "32px 28px",
                    height: "100%",
                    transition: "box-shadow 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 12,
                      background: "rgba(79,70,229,0.15)",
                      border: "1px solid rgba(79,70,229,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      marginBottom: 20,
                    }}
                  >
                    {feat.emoji}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontWeight: 700,
                      fontSize: 18,
                      color: "#E2E8F0",
                      margin: "0 0 12px",
                    }}
                  >
                    {feat.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 15,
                      color: "#94A3B8",
                      margin: 0,
                      lineHeight: 1.7,
                    }}
                  >
                    {feat.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ───────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#0C1528",
          paddingTop: 100,
          paddingBottom: 100,
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#818CF8",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Implementation
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 52px)",
                color: "#E2E8F0",
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              Up and Running in Weeks, Not Months
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                color: "#94A3B8",
                textAlign: "center",
                maxWidth: 580,
                margin: "0 auto 72px",
                lineHeight: 1.7,
              }}
            >
              A structured, low-disruption rollout that gets your institution live without shutting down your day-to-day operations.
            </p>
          </AnimatedSection>

          {/* Timeline */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 0,
              position: "relative",
            }}
          >
            {/* Connector line (desktop) */}
            <div
              style={{
                position: "absolute",
                top: 40,
                left: "16.67%",
                right: "16.67%",
                height: 2,
                background: "linear-gradient(90deg, #4F46E5, #7C3AED)",
                zIndex: 0,
              }}
            />

            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div style={{ padding: "0 24px", textAlign: "center", position: "relative", zIndex: 1 }}>
                  {/* Circle */}
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 24px",
                      boxShadow: "0 0 30px rgba(79,70,229,0.4)",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 26,
                      color: "white",
                    }}
                  >
                    {i + 1}
                  </div>

                  <div
                    style={{
                      display: "inline-block",
                      background: "rgba(79,70,229,0.15)",
                      border: "1px solid rgba(79,70,229,0.3)",
                      borderRadius: 100,
                      padding: "4px 14px",
                      fontFamily: "var(--font-ui)",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#818CF8",
                      letterSpacing: "0.05em",
                      marginBottom: 14,
                    }}
                  >
                    {step.week}
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontWeight: 700,
                      fontSize: 20,
                      color: "#E2E8F0",
                      margin: "0 0 12px",
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 15,
                      color: "#94A3B8",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO BENEFITS ───────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#060A15",
          paddingTop: 100,
          paddingBottom: 100,
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimatedSection>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#818CF8",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              Who Benefits
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 52px)",
                color: "#E2E8F0",
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              Built for Every Role in Your Institution
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                color: "#94A3B8",
                textAlign: "center",
                maxWidth: 560,
                margin: "0 auto 64px",
                lineHeight: 1.7,
              }}
            >
              Whether you're running operations or sitting in a classroom, Cubico Manage makes your work easier.
            </p>
          </AnimatedSection>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
            }}
          >
            {beneficiaries.map((b, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(79,70,229,0.2)" }}
                  style={{
                    background: "#101E32",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 16,
                    padding: "32px 24px",
                    textAlign: "center",
                    transition: "box-shadow 0.2s ease",
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 16 }}>{b.icon}</div>
                  <h3
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontWeight: 700,
                      fontSize: 17,
                      color: "#818CF8",
                      margin: "0 0 12px",
                    }}
                  >
                    {b.role}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 14,
                      color: "#94A3B8",
                      margin: 0,
                      lineHeight: 1.65,
                    }}
                  >
                    {b.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#0C1528",
          paddingTop: 100,
          paddingBottom: 100,
          paddingLeft: "5%",
          paddingRight: "5%",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <AnimatedSection>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#818CF8",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              FAQ
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(28px, 4vw, 44px)",
                color: "#E2E8F0",
                textAlign: "center",
                marginBottom: 48,
              }}
            >
              Common Questions
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <FAQAccordion items={faqs} />
          </AnimatedSection>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#060A15",
          paddingTop: 100,
          paddingBottom: 100,
          paddingLeft: "5%",
          paddingRight: "5%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(79,70,229,0.15) 0%, rgba(124,58,237,0.08) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 800,
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <AnimatedSection>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#818CF8",
                marginBottom: 20,
              }}
            >
              Get Started
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 52px)",
                color: "#E2E8F0",
                marginBottom: 20,
                lineHeight: 1.2,
              }}
            >
              Ready to Manage Your Institution the Smart Way?
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 18,
                color: "#94A3B8",
                marginBottom: 40,
                lineHeight: 1.7,
              }}
            >
              Book a free consultation with our team. We'll walk you through the platform, answer every question, and give you a custom implementation plan — at no cost.
            </p>

            <motion.a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...ctaButtonStyle, fontSize: 18, padding: "20px 40px" }}
              whileHover={{ y: -2, boxShadow: "0 0 60px rgba(79,70,229,0.7)" }}
            >
              💬 Book a Free Consultation
            </motion.a>

            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 13,
                color: "#64748B",
                marginTop: 20,
              }}
            >
              Typically respond within 2 hours · No commitment required
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CROSS-SELL ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#0C1528",
          paddingTop: 64,
          paddingBottom: 64,
          paddingLeft: "5%",
          paddingRight: "5%",
          borderTop: "1px solid #1A2E4A",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <AnimatedSection>
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 13,
                color: "#64748B",
                marginBottom: 24,
              }}
            >
              Explore our other solutions:
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Cubico Teach™ — Animated Content", href: "/solutions/teach" },
                { label: "Cubico Learn™ — Student Platform", href: "/solutions/learn" },
                { label: "Cubico Scale™ — EdTech Growth", href: "/solutions/scale" },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  style={{
                    display: "inline-block",
                    background: "rgba(79,70,229,0.1)",
                    border: "1px solid rgba(79,70,229,0.3)",
                    borderRadius: 8,
                    padding: "10px 20px",
                    fontFamily: "var(--font-ui)",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#818CF8",
                    textDecoration: "none",
                    transition: "background 0.2s ease",
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
