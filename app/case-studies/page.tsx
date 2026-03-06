"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

// Note: metadata cannot be exported from a "use client" component.
// To set page metadata, wrap this in a server component layout or use a separate metadata file.
// title: 'EdTech Case Studies | School Transformations | Cubico Technologies'
// description: 'Real transformation stories from schools in Pakistan, Saudi Arabia, and Canada...'

// ─── TYPES ───────────────────────────────────────────────────────────────────

interface CaseStudyCard {
  id: string;
  flag: string;
  country: string;
  title: string;
  tags: string[];
  pillars: string[];
  summary: string;
  featured?: boolean;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const caseStudyCards: CaseStudyCard[] = [
  {
    id: 'pakistan',
    flag: '🇵🇰',
    country: 'Pakistan',
    title: 'Pakistan Schools',
    tags: ['Website', 'Student Management'],
    pillars: ['Cubico Manage™', 'Cubico Scale™'],
    summary:
      'Karachi-based schools needed a modern digital presence and a way to manage thousands of students without spreadsheets. Cubico delivered end-to-end.',
  },
  {
    id: 'cornwall',
    flag: '🇨🇦',
    country: 'Canada',
    title: 'Cornwall Islamic Foundation',
    tags: ['Website', 'Moodle', 'Animation', 'Comics'],
    pillars: ['Cubico Manage™', 'Cubico Teach™', 'Cubico Scale™'],
    summary:
      'A full-spectrum transformation: website, LMS, whiteboard animations, and illustrated comic books — everything a modern Islamic school needs to thrive.',
    featured: true,
  },
  {
    id: 'saudi',
    flag: '🇸🇦',
    country: 'Saudi Arabia',
    title: 'Saudi Arabia School',
    tags: ['2D Animation', 'Arabic Content'],
    pillars: ['Cubico Teach™'],
    summary:
      'An Arabic-medium institution needed curriculum animations produced by people who actually speak and think in Arabic. We delivered exactly that.',
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-ui)',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        color: '#818CF8',
        marginBottom: 16,
      }}
    >
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(36px, 4vw, 52px)',
        color: '#E2E8F0',
        lineHeight: 1.15,
        marginBottom: 0,
      }}
    >
      {children}
    </h2>
  );
}

function PillarBadge({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        background: 'rgba(79,70,229,0.15)',
        border: '1px solid rgba(79,70,229,0.3)',
        borderRadius: 6,
        padding: '4px 10px',
        fontFamily: 'var(--font-ui)',
        fontSize: 11,
        fontWeight: 600,
        color: '#818CF8',
        letterSpacing: '0.06em',
      }}
    >
      {label}
    </span>
  );
}

function TagPill({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        background: 'rgba(6,214,160,0.1)',
        border: '1px solid rgba(6,214,160,0.2)',
        borderRadius: 20,
        padding: '3px 12px',
        fontFamily: 'var(--font-ui)',
        fontSize: 12,
        fontWeight: 500,
        color: '#06D6A0',
      }}
    >
      {label}
    </span>
  );
}

function QuotePlaceholder({ name = '[Name, Title, Institution]' }: { name?: string }) {
  return (
    <div
      style={{
        background: 'rgba(79,70,229,0.08)',
        border: '1px solid rgba(79,70,229,0.2)',
        borderLeft: '4px solid #4F46E5',
        borderRadius: '0 12px 12px 0',
        padding: '24px 28px',
        margin: '32px 0',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          fontStyle: 'italic',
          color: '#94A3B8',
          lineHeight: 1.7,
          marginBottom: 12,
        }}
      >
        "[Placeholder quote — replace with real testimonial from institution representative.]"
      </p>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: '#818CF8' }}>
        — {name}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: 11,
          color: '#4F46E5',
          marginTop: 8,
          letterSpacing: '0.06em',
        }}
      >
        📝 Fill in real quote when available
      </p>
    </div>
  );
}

function DeliveredItem({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
      <div
        style={{
          flexShrink: 0,
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: 'rgba(79,70,229,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          color: '#818CF8',
          marginTop: 1,
        }}
      >
        ✓
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#94A3B8', lineHeight: 1.65, margin: 0 }}>
        {children}
      </p>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function CaseStudiesPage() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main style={{ background: '#060A15', minHeight: '100vh', color: '#E2E8F0' }}>

      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          paddingTop: 160,
          paddingBottom: 120,
          paddingLeft: '5%',
          paddingRight: '5%',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Dot grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(79,70,229,0.12) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        {/* Center glow */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 700,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(79,70,229,0.18) 0%, rgba(124,58,237,0.08) 50%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#818CF8',
              marginBottom: 24,
            }}
          >
            Case Studies
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(36px, 5vw, 64px)',
              color: '#E2E8F0',
              lineHeight: 1.15,
              marginBottom: 28,
            }}
          >
            Real Institutions.{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Real Transformations.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              lineHeight: 1.75,
              color: '#94A3B8',
              maxWidth: 660,
              margin: '0 auto',
            }}
          >
            These aren't demos or mock-ups. They're real schools, real challenges, and real outcomes.
            See how Cubico has delivered management systems, animated curriculum content, LMS platforms,
            and full digital infrastructure for institutions across three countries.
          </motion.p>
        </div>
      </section>

      {/* ─── CASE STUDY CARDS GRID ─── */}
      <section
        style={{
          background: '#0C1528',
          paddingTop: 100,
          paddingBottom: 100,
          paddingLeft: '5%',
          paddingRight: '5%',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeInSection>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <SectionLabel>Our Work</SectionLabel>
              <SectionHeading>Three Countries. Three Transformations.</SectionHeading>
            </div>
          </FadeInSection>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 28,
              alignItems: 'stretch',
            }}
          >
            {caseStudyCards.map((card, i) => (
              <FadeInSection key={card.id} delay={i * 0.12}>
                <div
                  style={{
                    background: '#101E32',
                    border: card.featured
                      ? '1px solid rgba(79,70,229,0.5)'
                      : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 20,
                    padding: '32px 28px',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: card.featured ? '0 0 48px rgba(79,70,229,0.15)' : 'none',
                  }}
                >
                  {card.featured && (
                    <div
                      style={{
                        position: 'absolute',
                        top: -1,
                        right: 24,
                        background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                        borderRadius: '0 0 10px 10px',
                        padding: '4px 14px',
                        fontSize: 10,
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 700,
                        color: 'white',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Featured
                    </div>
                  )}

                  {/* Country badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                    <span
                      style={{
                        fontSize: 22,
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 8,
                        padding: '4px 10px',
                      }}
                    >
                      {card.flag}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#64748B',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {card.country}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 22,
                      color: '#E2E8F0',
                      marginBottom: 16,
                      lineHeight: 1.25,
                    }}
                  >
                    {card.title}
                  </h3>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                    {card.tags.map((tag) => (
                      <TagPill key={tag} label={tag} />
                    ))}
                  </div>

                  {/* Pillar badges */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                    {card.pillars.map((pillar) => (
                      <PillarBadge key={pillar} label={pillar} />
                    ))}
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 15,
                      lineHeight: 1.7,
                      color: '#94A3B8',
                      flex: 1,
                      marginBottom: 24,
                    }}
                  >
                    {card.summary}
                  </p>

                  <a
                    href={`#case-study-${card.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 600,
                      fontSize: 14,
                      color: '#818CF8',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(129,140,248,0.3)',
                      paddingBottom: 2,
                      alignSelf: 'flex-start',
                      transition: 'color 0.2s',
                    }}
                  >
                    Read Full Case Study →
                  </a>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ─── CASE STUDY 1: PAKISTAN ─── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}

      <section
        id="case-study-pakistan"
        style={{
          background: '#060A15',
          paddingTop: 100,
          paddingBottom: 100,
          paddingLeft: '5%',
          paddingRight: '5%',
          scrollMarginTop: 80,
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <FadeInSection>
            <div style={{ marginBottom: 56 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 36 }}>🇵🇰</span>
                <SectionLabel>Case Study 01 — Pakistan</SectionLabel>
              </div>
              <SectionHeading>Pakistan Schools</SectionHeading>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
                {['Website', 'Student Management'].map((t) => <TagPill key={t} label={t} />)}
                {['Cubico Manage™', 'Cubico Scale™'].map((p) => <PillarBadge key={p} label={p} />)}
              </div>
            </div>
          </FadeInSection>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              {/* The Challenge */}
              <FadeInSection delay={0.1}>
                <div style={{ marginBottom: 40 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#4F46E5',
                      marginBottom: 16,
                    }}
                  >
                    The Challenge
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#94A3B8', lineHeight: 1.75 }}>
                    Multiple schools across Karachi were operating with outdated paper-based systems, no online presence,
                    and no way for parents to access student records or communicate with teachers digitally. Admin teams
                    were drowning in manual work. There was no unified system — each school had cobbled together a
                    patchwork of WhatsApp groups, Excel sheets, and physical registers.
                  </p>
                </div>
              </FadeInSection>

              {/* What Cubico Delivered */}
              <FadeInSection delay={0.2}>
                <div style={{ marginBottom: 40 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#4F46E5',
                      marginBottom: 16,
                    }}
                  >
                    What Cubico Delivered
                  </h3>
                  <DeliveredItem>Custom school websites with modern design, mobile-responsive layouts, and clear parent-facing information architecture.</DeliveredItem>
                  <DeliveredItem>Student management system with enrollment tracking, attendance records, grade management, and parent communication portal.</DeliveredItem>
                  <DeliveredItem>Staff onboarding and training sessions to ensure full adoption across administrative teams.</DeliveredItem>
                  <DeliveredItem>Ongoing technical support and system updates post-launch.</DeliveredItem>
                </div>
              </FadeInSection>
            </div>

            <div>
              {/* The Result */}
              <FadeInSection delay={0.15}>
                <div
                  style={{
                    background: '#101E32',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 16,
                    padding: '32px 28px',
                    marginBottom: 28,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#06D6A0',
                      marginBottom: 20,
                    }}
                  >
                    The Result
                  </h3>
                  {[
                    'Administrative workload reduced significantly as manual data entry was eliminated.',
                    'Parents gained 24/7 access to student records and school announcements.',
                    'School leadership gained real-time visibility into enrollment and performance data.',
                    'Professional digital presence established, improving trust and first impressions for new families.',
                  ].map((result, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'flex-start' }}>
                      <span style={{ color: '#06D6A0', fontSize: 16, flexShrink: 0, marginTop: 1 }}>→</span>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#94A3B8', lineHeight: 1.65, margin: 0 }}>
                        {result}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeInSection>

              <FadeInSection delay={0.25}>
                <QuotePlaceholder name="[Principal / Admin, School Name, Karachi]" />
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 12,
                    color: '#4F46E5',
                    marginTop: 8,
                    letterSpacing: '0.06em',
                  }}
                >
                  📝 Fill in specific school name and real metrics when available
                </p>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(79,70,229,0.3), transparent)',
          margin: '0 5%',
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ─── CASE STUDY 2: CORNWALL ISLAMIC FOUNDATION ─── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}

      <section
        id="case-study-cornwall"
        style={{
          background: '#0C1528',
          paddingTop: 100,
          paddingBottom: 100,
          paddingLeft: '5%',
          paddingRight: '5%',
          scrollMarginTop: 80,
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <FadeInSection>
            <div style={{ marginBottom: 56 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 36 }}>🇨🇦</span>
                <SectionLabel>Case Study 02 — Canada · Featured</SectionLabel>
              </div>
              <SectionHeading>Cornwall Islamic Foundation</SectionHeading>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 17,
                  color: '#94A3B8',
                  marginTop: 16,
                  maxWidth: 680,
                  lineHeight: 1.7,
                }}
              >
                Our most comprehensive engagement to date — a full EdTech ecosystem delivered for a Canadian Islamic school,
                demonstrating the breadth of what Cubico can offer under one roof.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
                {['Website', 'Moodle', 'Animation', 'Comics'].map((t) => <TagPill key={t} label={t} />)}
                {['Cubico Manage™', 'Cubico Teach™', 'Cubico Scale™'].map((p) => <PillarBadge key={p} label={p} />)}
              </div>
            </div>
          </FadeInSection>

          {/* Challenge */}
          <FadeInSection delay={0.1}>
            <div
              style={{
                background: '#101E32',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 16,
                padding: '40px',
                marginBottom: 32,
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#4F46E5',
                  marginBottom: 16,
                }}
              >
                The Challenge
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#94A3B8', lineHeight: 1.75 }}>
                Cornwall Islamic Foundation was running a growing Islamic school in Ontario with no dedicated LMS, no
                professional website, and no digital learning materials tailored to their Islamic curriculum context.
                They needed a partner who understood both the technical requirements and the educational philosophy of
                an Islamic institution — someone who wouldn't need to be educated on halal content standards or
                Islamic values in curriculum design. They had tried working with generalist web agencies before and
                found the process exhausting. They needed one partner for everything.
              </p>
            </div>
          </FadeInSection>

          {/* What Cubico Delivered — detailed */}
          <FadeInSection delay={0.15}>
            <h3
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#4F46E5',
                marginBottom: 24,
              }}
            >
              What Cubico Delivered
            </h3>
          </FadeInSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 40 }}>
            {[
              {
                icon: '🌐',
                title: 'School Website',
                detail: 'A modern, mobile-responsive website with full brand identity, admissions flow, faculty pages, and news/events section. Designed to communicate professionalism and Islamic values simultaneously.',
              },
              {
                icon: '📖',
                title: 'Moodle LMS Setup',
                detail: 'Full Moodle installation, customization, and course architecture. We built out course structures for multiple grade levels, trained teachers on content upload, and integrated student login systems.',
              },
              {
                icon: '🎬',
                title: 'Whiteboard Animations',
                detail: 'Custom educational whiteboard animation videos covering core curriculum topics. Scriptwriting, voiceover, animation, and editing — all produced by Cubico\'s in-house team.',
              },
              {
                icon: '📚',
                title: 'Educational Comic Books',
                detail: 'Illustrated digital comic books designed to make learning engaging for younger students. Original characters, Islamic-context storytelling, and curriculum-aligned content produced from concept to final print-ready file.',
              },
            ].map((item, i) => (
              <FadeInSection key={item.title} delay={0.1 + i * 0.08}>
                <div
                  style={{
                    background: '#060A15',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: 14,
                    padding: '28px 24px',
                    height: '100%',
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 14 }}>{item.icon}</div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 600,
                      fontSize: 16,
                      color: '#E2E8F0',
                      marginBottom: 10,
                    }}
                  >
                    {item.title}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#94A3B8', lineHeight: 1.7, margin: 0 }}>
                    {item.detail}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* Highlight quote */}
          <FadeInSection delay={0.2}>
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(79,70,229,0.12), rgba(124,58,237,0.08))',
                border: '1px solid rgba(79,70,229,0.3)',
                borderRadius: 16,
                padding: '36px 40px',
                textAlign: 'center',
                marginBottom: 40,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(20px, 2.5vw, 28px)',
                  color: '#E2E8F0',
                  lineHeight: 1.4,
                  marginBottom: 16,
                }}
              >
                "One vendor. Four major deliverables. Zero compromise on quality or values."
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#818CF8' }}>
                This is Cubico's core advantage — the complete ecosystem in action.
              </p>
            </div>
          </FadeInSection>

          {/* The Result */}
          <FadeInSection delay={0.25}>
            <div
              style={{
                background: '#101E32',
                border: '1px solid rgba(6,214,160,0.15)',
                borderRadius: 16,
                padding: '40px',
                marginBottom: 32,
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#06D6A0',
                  marginBottom: 20,
                }}
              >
                The Result
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  'School established a complete, professional digital presence for the first time.',
                  'Teachers began delivering and tracking coursework through Moodle with minimal training time.',
                  'Students engaged with animated and illustrated content at higher rates than text-only materials.',
                  'School leadership reported being able to focus on pedagogy rather than operational chaos.',
                  'Institution positioned as a model Islamic school with full EdTech infrastructure.',
                  'Partnership ongoing — Cubico continues to produce new content and support the platform.',
                ].map((result, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#06D6A0', fontSize: 16, flexShrink: 0, marginTop: 1 }}>→</span>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#94A3B8', lineHeight: 1.65, margin: 0 }}>
                      {result}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInSection>

          <FadeInSection delay={0.3}>
            <QuotePlaceholder name="[Name, Title — Cornwall Islamic Foundation, Ontario]" />
          </FadeInSection>
        </div>
      </section>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: 'linear-gradient(to right, transparent, rgba(79,70,229,0.3), transparent)',
          margin: '0 5%',
        }}
      />

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ─── CASE STUDY 3: SAUDI ARABIA ─── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}

      <section
        id="case-study-saudi"
        style={{
          background: '#060A15',
          paddingTop: 100,
          paddingBottom: 100,
          paddingLeft: '5%',
          paddingRight: '5%',
          scrollMarginTop: 80,
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <FadeInSection>
            <div style={{ marginBottom: 56 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 36 }}>🇸🇦</span>
                <SectionLabel>Case Study 03 — Saudi Arabia</SectionLabel>
              </div>
              <SectionHeading>Saudi Arabia School</SectionHeading>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
                {['2D Animation', 'Arabic Content'].map((t) => <TagPill key={t} label={t} />)}
                {['Cubico Teach™'].map((p) => <PillarBadge key={p} label={p} />)}
              </div>
            </div>
          </FadeInSection>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              {/* The Challenge */}
              <FadeInSection delay={0.1}>
                <div style={{ marginBottom: 40 }}>
                  <h3
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#4F46E5',
                      marginBottom: 16,
                    }}
                  >
                    The Challenge
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#94A3B8', lineHeight: 1.75, marginBottom: 16 }}>
                    An established school in Saudi Arabia recognized that text-heavy, lecture-dependent teaching was
                    losing ground to students raised on visual media. Their Arabic curriculum — including Islamic
                    Studies, science, and core subjects — needed to be brought to life through animation.
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#94A3B8', lineHeight: 1.75 }}>
                    The critical constraint: the content had to be produced in native Arabic, not translated from English.
                    Previous vendors had offered dubbed or translated animations that felt inauthentic and broke the
                    learning flow. The school needed content that felt native — in language, cadence, and cultural context.
                  </p>
                </div>
              </FadeInSection>

              {/* What Cubico Delivered */}
              <FadeInSection delay={0.2}>
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#4F46E5',
                      marginBottom: 16,
                    }}
                  >
                    What Cubico Delivered
                  </h3>
                  <DeliveredItem>2D animated curriculum videos produced entirely in Arabic — scripted, voiced, and reviewed by native Arabic-speaking educators on our team.</DeliveredItem>
                  <DeliveredItem>Subject coverage across core curriculum areas, including Islamic Studies, sciences, and language arts.</DeliveredItem>
                  <DeliveredItem>Visual style tailored to the school's aesthetic and age group — engaging for students without being distracting.</DeliveredItem>
                  <DeliveredItem>Full production pipeline: concept → storyboard → voiceover recording → animation → review → delivery.</DeliveredItem>
                  <DeliveredItem>Content formatted for both classroom projection and individual device viewing through the school's LMS.</DeliveredItem>
                </div>
              </FadeInSection>
            </div>

            <div>
              {/* The Result */}
              <FadeInSection delay={0.15}>
                <div
                  style={{
                    background: '#101E32',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 16,
                    padding: '32px 28px',
                    marginBottom: 28,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#06D6A0',
                      marginBottom: 20,
                    }}
                  >
                    The Result
                  </h3>
                  {[
                    'Student engagement with animated lessons measurably higher than equivalent text-based lessons.',
                    'Teachers reported significantly less repetition needed — concepts landed on first delivery.',
                    'School leadership praised the authentic Arabic delivery as the key differentiator vs. prior vendors.',
                    'Content library built iteratively — new modules added each semester, ongoing partnership.',
                    'Model adopted as basis for wider curriculum modernization initiative within the institution.',
                  ].map((result, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'flex-start' }}>
                      <span style={{ color: '#06D6A0', fontSize: 16, flexShrink: 0, marginTop: 1 }}>→</span>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#94A3B8', lineHeight: 1.65, margin: 0 }}>
                        {result}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeInSection>

              {/* Native Arabic highlight */}
              <FadeInSection delay={0.25}>
                <div
                  style={{
                    background: 'linear-gradient(135deg, rgba(79,70,229,0.1), rgba(124,58,237,0.06))',
                    border: '1px solid rgba(79,70,229,0.2)',
                    borderRadius: 14,
                    padding: '24px',
                    marginBottom: 24,
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 10 }}>🌙</div>
                  <p
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 600,
                      fontSize: 15,
                      color: '#818CF8',
                      lineHeight: 1.6,
                    }}
                  >
                    Why native Arabic matters: students learn faster in their first language.
                    Content that sounds foreign creates cognitive friction. Cubico's Arabic team
                    produces content that sounds like it belongs — because it does.
                  </p>
                </div>
              </FadeInSection>

              <FadeInSection delay={0.3}>
                <QuotePlaceholder name="[School Director / HOD, Saudi Arabia]" />
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section
        style={{
          background: '#0C1528',
          paddingTop: 100,
          paddingBottom: 100,
          paddingLeft: '5%',
          paddingRight: '5%',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            height: 350,
            background: 'radial-gradient(ellipse, rgba(79,70,229,0.13) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
          <FadeInSection>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#818CF8',
                marginBottom: 20,
              }}
            >
              Start Your Transformation
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(36px, 4vw, 52px)',
                color: '#E2E8F0',
                marginBottom: 20,
                lineHeight: 1.15,
              }}
            >
              Want Similar Results for{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Your Institution?
              </span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: '#94A3B8', marginBottom: 20, lineHeight: 1.7 }}>
              Every institution is different. We'll start with a free consultation to understand your specific
              challenges — no obligation, no pitch deck, just an honest conversation about what you need and
              whether we're the right fit to help you get there.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#64748B', marginBottom: 40 }}>
              Schools in Pakistan, Saudi Arabia, Canada, and beyond have trusted us.
              Let's see if we can do the same for you.
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a
                href="https://wa.me/923001234567?text=Hi!%20I%20saw%20your%20case%20studies%20and%20would%20like%20to%20discuss%20a%20similar%20project%20for%20our%20institution."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ translateY: -2, boxShadow: '0 8px 40px rgba(79,70,229,0.6)' }}
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  padding: '16px 32px',
                  borderRadius: 8,
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 600,
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: 16,
                  boxShadow: '0 0 30px rgba(79,70,229,0.4)',
                  cursor: 'pointer',
                }}
              >
                💬 Chat on WhatsApp
              </motion.a>

              <Link
                href="/contact"
                style={{
                  display: 'inline-block',
                  background: 'transparent',
                  padding: '16px 32px',
                  borderRadius: 8,
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 600,
                  color: '#818CF8',
                  textDecoration: 'none',
                  fontSize: 16,
                  border: '1px solid rgba(129,140,248,0.3)',
                }}
              >
                Send Us a Message →
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </main>
  );
}
