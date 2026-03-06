"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
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

interface ComparisonRow {
  capability: string;
  studio: string;
  cubico: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const painPoints: PainPoint[] = [
  { emoji: "📖", text: "Textbooks are dense and static — students disengage before they reach the end of the first chapter" },
  { emoji: "🌍", text: "Arabic-speaking and bilingual students lack curriculum-aligned digital content in their native language" },
  { emoji: "🎨", text: "Generic animation studios don't understand pedagogy and produce content that looks good but teaches nothing" },
  { emoji: "⏳", text: "Building internal content production capacity takes years and significant budget — most schools can't afford it" },
  { emoji: "📐", text: "Off-the-shelf content rarely aligns with your curriculum framework, examination board, or school culture" },
];

const features: Feature[] = [
  {
    emoji: "🎬",
    name: "2D & 3D Animations",
    description: "Full-motion, curriculum-aligned animated lessons crafted by educators and animators together. Concepts that are invisible in a textbook become vivid and memorable on screen.",
  },
  {
    emoji: "🗂️",
    name: "Comic Book Content",
    description: "Illustrated comic-style learning narratives for younger students. Story-driven content that builds vocabulary, comprehension, and a love of learning simultaneously.",
  },
  {
    emoji: "💻",
    name: "Course Digitization",
    description: "We transform your existing printed or PDF curriculum into structured, interactive digital courses compatible with your LMS or Cubico Learn platform.",
  },
  {
    emoji: "📝",
    name: "Lesson Plans",
    description: "Detailed teacher-facing lesson plans aligned to your animated content — so every classroom session is structured, purposeful, and easy to deliver.",
  },
  {
    emoji: "✅",
    name: "Assessments & Quizzes",
    description: "Embedded formative assessments, auto-graded quizzes, and end-of-unit tests built directly into the digital content — no third-party tool needed.",
  },
  {
    emoji: "🌐",
    name: "Multilingual Content",
    description: "Native Arabic production (not translation), Urdu narration, and English — supporting bilingual schools and international curricula across the MENA region and South Asia.",
  },
];

const comparisonRows: ComparisonRow[] = [
  {
    capability: "Curriculum Alignment",
    studio: "Rarely — generic topics only",
    cubico: "Always — mapped to your specific syllabus",
  },
  {
    capability: "Native Arabic Production",
    studio: "Translated dubbing at best",
    cubico: "Native-speaker scriptwriters & voice artists",
  },
  {
    capability: "Pedagogical Design",
    studio: "Designers without teaching expertise",
    cubico: "Built with qualified educators at every stage",
  },
  {
    capability: "LMS Integration",
    studio: "Delivered as raw video files",
    cubico: "SCORM/xAPI-ready or plug into Cubico Learn",
  },
  {
    capability: "Ongoing Iteration",
    studio: "Fixed deliverable, no revisions post-delivery",
    cubico: "Annual content refresh included in premium plans",
  },
];

const faqs: FAQItem[] = [
  {
    question: "How long does it take to produce an animated lesson?",
    answer: "A single 5–8 minute animated lesson typically takes 3–4 weeks from script approval to final delivery. Larger curriculum projects (e.g., a full academic year of content) are managed as rolling sprints so you receive batches of content continuously rather than waiting for everything at once.",
  },
  {
    question: "Can you match our existing curriculum and examination board?",
    answer: "Yes. We work with Pakistan's national curriculum, Cambridge IGCSE/O-Level, UAE and Saudi national frameworks, and other custom syllabi. Our educators review your curriculum documents and map every piece of content to specific learning outcomes before a single frame is animated.",
  },
  {
    question: "Do you provide Arabic-language content, and is it translated or native?",
    answer: "All Arabic content we produce is native — scripted by Arabic-speaking educators and voiced by professional native-speaker voice artists. We do not dub or translate English content into Arabic; the pedagogical logic and cultural references are built natively from the ground up.",
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

function FloatingParticle({ style, color = "#7C3AED" }: { style: React.CSSProperties; color?: string }) {
  return (
    <motion.div
      animate={{ y: [0, -18, 0], opacity: [0.25, 0.65, 0.25] }}
      transition={{ duration: 3.5 + Math.random() * 3, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        width: 5,
        height: 5,
        borderRadius: "50%",
        background: color,
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
                background: "rgba(124,58,237,0.2)",
                border: "1px solid rgba(124,58,237,0.4)",
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

export default function TeachPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const WA_URL =
    "https://wa.me/923001234567?text=Hi!%20I'm%20interested%20in%20your%20animated%20lesson%20content%20and%20course%20digitization%20for%20our%20school.";

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
        {/* Gradient orb — purple-dominant for Teach */}
        <div
          style={{
            position: "absolute",
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 900,
            height: 550,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, rgba(79,70,229,0.08) 50%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Floating particles */}
        {[
          { top: "18%", left: "10%", color: "#7C3AED" },
          { top: "55%", left: "6%", color: "#4F46E5" },
          { top: "30%", right: "10%", color: "#06D6A0" },
          { top: "70%", right: "18%", color: "#7C3AED" },
          { top: "45%", left: "48%", color: "#818CF8" },
          { top: "12%", right: "30%", color: "#4F46E5" },
          { top: "80%", left: "30%", color: "#06D6A0" },
        ].map((p, i) => (
          <FloatingParticle key={i} style={{ top: p.top, left: p.left, right: p.right } as React.CSSProperties} color={p.color} />
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
            <span style={{ color: "#818CF8" }}>Teach</span>
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
                background: "rgba(124,58,237,0.15)",
                border: "1px solid rgba(124,58,237,0.4)",
                borderRadius: 100,
                padding: "6px 18px",
                fontFamily: "var(--font-ui)",
                fontSize: 13,
                fontWeight: 600,
                color: "#818CF8",
                letterSpacing: "0.05em",
              }}
            >
              Cubico Teach™
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
            Your Textbooks Deserve
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #818CF8, #06D6A0)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              to Come Alive.
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
            Cubico Teach is an educational content studio that transforms your curriculum into 2D and 3D animated lessons, illustrated comic-book narratives, fully digitized courses, and multilingual learning materials. Every piece of content is built with qualified educators — not just designers — so it teaches as beautifully as it looks.
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
              whileHover={{ y: -2, boxShadow: "0 0 50px rgba(124,58,237,0.6)" }}
            >
              💬 Discuss Content for Your School
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
              { value: "1,200+", label: "Animated Lessons Delivered" },
              { value: "3", label: "Languages: Arabic, Urdu, English" },
              { value: "12+", label: "Curriculum Frameworks Supported" },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(26px, 3vw, 38px)",
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

      {/* ── THE CONTENT GAP (Problem) ──────────────────────────────────────── */}
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
              The Content Gap
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
              Why Students Stop Paying Attention
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
              These are the content challenges every forward-thinking school faces — and why static resources are no longer enough.
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
                  whileHover={{ y: -4, boxShadow: "0 12px 40px rgba(124,58,237,0.15)" }}
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
              Cubico Teach closes the gap between world-class content and your classroom.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────────────── */}
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
              Content Services
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
              From Static Text to Living Lessons
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
              Six content formats, each designed to complement the others and build a complete learning journey for your students.
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
                  whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(124,58,237,0.2)" }}
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
                      background: "rgba(124,58,237,0.15)",
                      border: "1px solid rgba(124,58,237,0.3)",
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

      {/* ── THE CUBICO DIFFERENCE (Comparison) ────────────────────────────── */}
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
              Why Cubico
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
              The Cubico Difference
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
              Not all content studios are created equal. Here's how we compare to a typical animation studio.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            {/* Table header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1.5fr 1.5fr",
                gap: 0,
                borderRadius: "16px 16px 0 0",
                overflow: "hidden",
              }}
            >
              {/* Header */}
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderBottom: "1px solid #1A2E4A",
                  padding: "16px 24px",
                  fontFamily: "var(--font-ui)",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "#64748B",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.08em",
                }}
              >
                Capability
              </div>
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderBottom: "1px solid #1A2E4A",
                  borderLeft: "1px solid #1A2E4A",
                  padding: "16px 24px",
                  fontFamily: "var(--font-ui)",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "#64748B",
                  textAlign: "center",
                }}
              >
                Generic Animation Studio
              </div>
              <div
                style={{
                  background: "rgba(79,70,229,0.12)",
                  borderBottom: "1px solid rgba(79,70,229,0.3)",
                  borderLeft: "1px solid rgba(79,70,229,0.3)",
                  padding: "16px 24px",
                  fontFamily: "var(--font-ui)",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#818CF8",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                    borderRadius: 6,
                    padding: "2px 10px",
                    fontSize: 12,
                    color: "white",
                  }}
                >
                  ✦
                </span>
                Cubico Teach™
              </div>
            </div>

            {/* Table rows */}
            {comparisonRows.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1.5fr 1.5fr",
                  gap: 0,
                  borderBottom: i < comparisonRows.length - 1 ? "1px solid #1A2E4A" : "none",
                  borderRadius:
                    i === comparisonRows.length - 1 ? "0 0 16px 16px" : 0,
                  overflow: "hidden",
                }}
              >
                {/* Capability */}
                <div
                  style={{
                    background: "#101E32",
                    padding: "20px 24px",
                    fontFamily: "var(--font-ui)",
                    fontWeight: 600,
                    fontSize: 15,
                    color: "#E2E8F0",
                    borderRight: "1px solid #1A2E4A",
                  }}
                >
                  {row.capability}
                </div>

                {/* Studio */}
                <div
                  style={{
                    background: "#101E32",
                    padding: "20px 24px",
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "#64748B",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRight: "1px solid #1A2E4A",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ opacity: 0.6 }}>✗ </span>&nbsp;{row.studio}
                </div>

                {/* Cubico — highlighted */}
                <div
                  style={{
                    background: "rgba(79,70,229,0.08)",
                    padding: "20px 24px",
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    color: "#A5B4FC",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderLeft: "1px solid rgba(79,70,229,0.2)",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "#06D6A0", marginRight: 6 }}>✓</span> {row.cubico}
                </div>
              </motion.div>
            ))}
          </AnimatedSection>

          {/* Bottom callout */}
          <AnimatedSection delay={0.5} style={{ marginTop: 40 }}>
            <div
              style={{
                background: "linear-gradient(135deg, rgba(79,70,229,0.12), rgba(124,58,237,0.08))",
                border: "1px solid rgba(79,70,229,0.25)",
                borderRadius: 16,
                padding: "32px 36px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: 36 }}>🎯</span>
              <div>
                <h3
                  style={{
                    fontFamily: "var(--font-ui)",
                    fontWeight: 700,
                    fontSize: 18,
                    color: "#E2E8F0",
                    margin: "0 0 8px",
                  }}
                >
                  We don't just produce content — we produce learning outcomes.
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 15,
                    color: "#94A3B8",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  Every animated lesson goes through a pedagogical review cycle before final delivery. If it doesn't teach correctly, it doesn't ship.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────────────────────────────── */}
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
              Our Process
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
              How We Build Your Content
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
              A rigorous, educator-led production process that ensures every piece of content is accurate, engaging, and curriculum-aligned.
            </p>
          </AnimatedSection>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 760, margin: "0 auto" }}>
            {[
              {
                step: "01",
                title: "Curriculum Analysis",
                desc: "Our educators review your syllabus documents, learning objectives, and examination board requirements in detail.",
              },
              {
                step: "02",
                title: "Script & Storyboard",
                desc: "Subject-matter experts write the script in your chosen language(s). Every concept is broken into clear, memorable micro-lessons.",
              },
              {
                step: "03",
                title: "Animation & Production",
                desc: "Our studio team animates the storyboard, records professional voice-over, and adds sound design and music.",
              },
              {
                step: "04",
                title: "Pedagogical Review",
                desc: "A senior educator reviews the final cut for accuracy, pacing, and cognitive load — no lesson ships without sign-off.",
              },
              {
                step: "05",
                title: "Delivery & Integration",
                desc: "Content is delivered in your required format (video, SCORM, xAPI) and integrated into your LMS or Cubico Learn platform.",
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div
                  style={{
                    display: "flex",
                    gap: 24,
                    alignItems: "flex-start",
                    background: "#101E32",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12,
                    padding: "24px 28px",
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 48,
                      height: 48,
                      borderRadius: 10,
                      background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 15,
                      color: "white",
                    }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h4
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontWeight: 700,
                        fontSize: 16,
                        color: "#E2E8F0",
                        margin: "0 0 8px",
                      }}
                    >
                      {item.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 14,
                        color: "#94A3B8",
                        margin: 0,
                        lineHeight: 1.65,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBJECT COVERAGE ───────────────────────────────────────────────── */}
      <section
        style={{
          background: "#0C1528",
          paddingTop: 80,
          paddingBottom: 80,
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
                marginBottom: 24,
                textAlign: "center",
              }}
            >
              Subject Coverage
            </p>
          </AnimatedSection>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
            }}
          >
            {[
              "Mathematics",
              "Physics",
              "Chemistry",
              "Biology",
              "Arabic Language",
              "Urdu Literature",
              "English Language",
              "Islamic Studies",
              "Pakistan Studies",
              "Computer Science",
              "Economics",
              "Geography",
              "History",
              "General Science",
            ].map((subject, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div
                  style={{
                    background: "rgba(79,70,229,0.1)",
                    border: "1px solid rgba(79,70,229,0.25)",
                    borderRadius: 100,
                    padding: "8px 20px",
                    fontFamily: "var(--font-ui)",
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#A5B4FC",
                  }}
                >
                  {subject}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────────────── */}
      <section
        style={{
          background: "#060A15",
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
              "radial-gradient(ellipse at center, rgba(124,58,237,0.18) 0%, rgba(79,70,229,0.08) 40%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Animated teal accent orb */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            bottom: "-10%",
            right: "5%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(6,214,160,0.2) 0%, transparent 70%)",
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
              Ready to Bring Your Curriculum to Life?
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
              Share your curriculum with us and we'll come back with a sample lesson — free of charge — so you can see the quality before committing to anything.
            </p>

            <motion.a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...ctaButtonStyle, fontSize: 18, padding: "20px 40px" }}
              whileHover={{ y: -2, boxShadow: "0 0 60px rgba(124,58,237,0.7)" }}
            >
              💬 Request a Free Sample Lesson
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
                { label: "Cubico Manage™ — School Management", href: "/solutions/manage" },
                { label: "Cubico Learn™ — Student Platform", href: "/solutions/learn" },
                { label: "Cubico Scale™ — EdTech Growth", href: "/solutions/scale" },
              ].map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  style={{
                    display: "inline-block",
                    background: "rgba(124,58,237,0.1)",
                    border: "1px solid rgba(124,58,237,0.3)",
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
