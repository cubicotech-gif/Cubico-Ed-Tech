"use client";

import type { Metadata } from 'next';
import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ── Types ─────────────────────────────────────────────────────────────────────

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

interface PainPoint {
  emoji: string;
  title: string;
  description: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface Advantage {
  icon: string;
  title: string;
  description: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const painPoints: PainPoint[] = [
  {
    emoji: '🔀',
    title: 'Too Many Vendors, Zero Accountability',
    description:
      'One company sets up your LMS. Another designs it. A third provides content. A fourth trains your staff. When something breaks, nobody knows whose fault it is — and you\'re the one left scrambling.',
  },
  {
    emoji: '💰',
    title: 'Costs Spiral Out of Control',
    description:
      'Each vendor charges separately. Setup fees, monthly SaaS subscriptions, per-user licensing, integration costs. What started as a ₹50,000 budget becomes a ₹5 lakh annual commitment nobody planned for.',
  },
  {
    emoji: '🏃',
    title: 'Staff Are Left Behind',
    description:
      'New technology is installed. A one-hour training session is held. Six months later, half your teachers still use paper. Without proper, ongoing staff development, digital transformation is just expensive decoration.',
  },
  {
    emoji: '🔧',
    title: 'Systems That Don\'t Communicate',
    description:
      'Your attendance system doesn\'t talk to your fee management. Your LMS doesn\'t connect to your gradebook. Your app doesn\'t sync with your parent portal. Every platform is an island. Data lives in silos.',
  },
  {
    emoji: '📉',
    title: 'No Long-Term Partnership',
    description:
      'Vendors deliver the project, send the final invoice, and vanish. When you need updates, support, or new features, you\'re back to square one — finding someone new, paying re-discovery fees, losing months of momentum.',
  },
];

const features: FeatureCard[] = [
  {
    icon: '🎓',
    title: 'Moodle LMS Setup',
    description:
      'Complete Moodle deployment from scratch — cloud or on-premise hosting, branded themes, plugin integration (BigBlueButton, H5P, Zoom, certificates), multi-site support, and Arabic/Urdu RTL configuration. We handle everything.',
  },
  {
    icon: '💻',
    title: 'Custom Platform Development',
    description:
      'Need something Moodle can\'t do? We build custom LMS platforms, student portals, admission systems, and school ERPs tailored exactly to your institutional workflows — no compromise on what you actually need.',
  },
  {
    icon: '🌐',
    title: 'Digital Infrastructure',
    description:
      'Servers, domains, SSL certificates, CDN configuration, backups, security hardening, email systems, and cloud architecture. We build the foundation so everything else can scale without breaking.',
  },
  {
    icon: '👩‍🏫',
    title: 'Staff Training Programmes',
    description:
      'Hands-on training sessions for administrators, teachers, and support staff. We don\'t just show them where the buttons are — we build confidence, create documentation, and provide ongoing support as questions arise.',
  },
  {
    icon: '🧠',
    title: 'EdTech Consulting',
    description:
      'Not sure where to start? Our consultants audit your current setup, map your institution\'s goals, and design a realistic digital transformation roadmap — with clear priorities, timelines, and budget guidance.',
  },
  {
    icon: '🤝',
    title: 'Ongoing Support & Growth',
    description:
      'We don\'t disappear after go-live. Cubico Scale™ includes long-term support agreements: bug fixes, feature additions, platform updates, staff refresher training, and strategic quarterly reviews.',
  },
];

const advantages: Advantage[] = [
  {
    icon: '🔗',
    title: 'One Partner, Everything Connected',
    description:
      'Your LMS, your content, your management system, and your training — all from Cubico. Systems that talk to each other. Zero gaps. One point of contact.',
  },
  {
    icon: '🎯',
    title: 'Built Around Your Institution',
    description:
      'We start with a discovery session. We learn your workflows, your constraints, your language requirements, and your goals. Then we build exactly what you need.',
  },
  {
    icon: '📈',
    title: 'Scales As You Grow',
    description:
      'Whether you\'re a 200-student primary school or a 5,000-student multi-campus institution, our solutions scale without forcing you to rebuild from scratch.',
  },
  {
    icon: '🌍',
    title: 'Multilingual by Default',
    description:
      'English, Urdu, and Arabic — including full right-to-left layout support. We\'ve built for Islamic institutions, international schools, and Pakistani curricula.',
  },
];

const faqs: FAQItem[] = [
  {
    question: 'How long does a Moodle LMS setup take?',
    answer:
      'A standard Moodle setup — including hosting, branding, plugin configuration, and basic course structure — typically takes 2 to 4 weeks. More complex deployments with custom development, content migration, or multi-campus configurations can take 6 to 12 weeks. During our initial consultation, we\'ll give you a precise timeline based on your specific requirements.',
  },
  {
    question: 'Do you offer support after the platform goes live?',
    answer:
      'Yes — and this is actually what makes Cubico different. We offer structured post-launch support agreements that include bug fixes, platform updates, additional training sessions, and strategic reviews. We treat every client relationship as a long-term partnership, not a one-time transaction.',
  },
  {
    question: 'Can you migrate our existing courses and data from another platform?',
    answer:
      'Absolutely. We have experience migrating content from Google Classroom, Canvas, Blackboard, TalentLMS, and various custom platforms. We can migrate course structures, enrolled users, gradebook data, completion records, and multimedia content. We\'ll assess your existing data and give you a clear migration plan before we begin.',
  },
];

const crossSellLinks = [
  {
    href: '/solutions/manage',
    label: 'Cubico Manage™',
    description: 'School operations & administration',
    color: '#4F46E5',
  },
  {
    href: '/solutions/teach',
    label: 'Cubico Teach™',
    description: 'Animated lessons & curriculum content',
    color: '#7C3AED',
  },
  {
    href: '/solutions/learn',
    label: 'Cubico Learn™',
    description: 'Game-based learning & student engagement',
    color: '#06D6A0',
  },
];

// ── Animation helpers ─────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
};

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionLabel({ children, color = '#F59E0B' }: { children: React.ReactNode; color?: string }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-ui)',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color,
        marginBottom: 16,
      }}
    >
      {children}
    </p>
  );
}

function SectionHeading({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: 'clamp(36px, 4vw, 52px)',
        color: '#E2E8F0',
        lineHeight: 1.15,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

function CTAButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2, boxShadow: '0 0 50px rgba(79,70,229,0.6)' }}
      style={{
        display: 'inline-block',
        background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
        padding: '16px 32px',
        borderRadius: 8,
        fontFamily: 'var(--font-ui)',
        fontWeight: 600,
        color: 'white',
        textDecoration: 'none',
        boxShadow: '0 0 30px rgba(79,70,229,0.4)',
        fontSize: 16,
        cursor: 'pointer',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {children}
    </motion.a>
  );
}

// ── Decorative Hero Visual ────────────────────────────────────────────────────

function HeroDecoration() {
  const layers = [
    { label: 'Student Portal', color: '#F59E0B', offset: 0 },
    { label: 'Moodle LMS', color: '#4F46E5', offset: 16 },
    { label: 'Analytics Dashboard', color: '#7C3AED', offset: 32 },
    { label: 'Parent App', color: '#06D6A0', offset: 48 },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 460,
        margin: '0 auto',
        height: 380,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(245,158,11,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Layered card stack */}
      {layers.map((layer, i) => (
        <motion.div
          key={layer.label}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
          style={{
            position: 'absolute',
            width: 300 - i * 12,
            background: '#101E32',
            border: `1px solid ${layer.color}33`,
            borderRadius: 14,
            padding: '18px 20px',
            boxShadow: `0 ${8 + i * 6}px ${24 + i * 12}px rgba(0,0,0,0.3)`,
            top: `${10 + i * 18}%`,
            left: `${i * 4}%`,
            zIndex: layers.length - i,
          }}
        >
          {/* Header row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: layer.color,
                boxShadow: `0 0 6px ${layer.color}`,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 12,
                fontWeight: 600,
                color: '#E2E8F0',
              }}
            >
              {layer.label}
            </span>
            <div
              style={{
                marginLeft: 'auto',
                background: `${layer.color}22`,
                border: `1px solid ${layer.color}44`,
                borderRadius: 4,
                padding: '2px 6px',
                fontFamily: 'var(--font-ui)',
                fontSize: 10,
                color: layer.color,
                fontWeight: 600,
              }}
            >
              LIVE
            </div>
          </div>

          {/* Mock bar */}
          <div
            style={{
              height: 6,
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${60 + i * 10}%` }}
              transition={{ duration: 1, delay: 0.8 + i * 0.2 }}
              style={{
                height: '100%',
                background: `linear-gradient(90deg, ${layer.color}, ${layer.color}88)`,
                borderRadius: 3,
              }}
            />
          </div>
        </motion.div>
      ))}

      {/* Floating institution icon */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '0%',
          background: 'linear-gradient(135deg, #0C1528, #101E32)',
          border: '1px solid rgba(245,158,11,0.3)',
          borderRadius: 14,
          padding: '12px 16px',
          boxShadow: '0 0 40px rgba(245,158,11,0.15)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          zIndex: 10,
        }}
      >
        <span style={{ fontSize: 24 }}>🏫</span>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 12,
              fontWeight: 700,
              color: '#F59E0B',
            }}
          >
            Fully Transformed
          </div>
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 11,
              color: '#94A3B8',
            }}
          >
            100% digital infrastructure
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── FAQ Accordion ─────────────────────────────────────────────────────────────

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            style={{
              background: '#101E32',
              border: `1px solid ${isOpen ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.07)'}`,
              borderRadius: 12,
              overflow: 'hidden',
              transition: 'border-color 0.3s ease',
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '22px 24px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                gap: 16,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 600,
                  fontSize: 16,
                  color: '#E2E8F0',
                }}
              >
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  color: '#F59E0B',
                  fontSize: 22,
                  lineHeight: 1,
                  flexShrink: 0,
                  fontWeight: 300,
                }}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    style={{
                      padding: '0 24px 22px',
                      fontFamily: 'var(--font-body)',
                      fontSize: 15,
                      color: '#94A3B8',
                      lineHeight: 1.7,
                    }}
                  >
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ScalePage() {
  const problemRef = useRef(null);
  const featuresRef = useRef(null);
  const differenceRef = useRef(null);
  const caseStudyRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);
  const crossSellRef = useRef(null);

  const problemInView = useInView(problemRef, { once: true, margin: '-80px' });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-80px' });
  const differenceInView = useInView(differenceRef, { once: true, margin: '-80px' });
  const caseStudyInView = useInView(caseStudyRef, { once: true, margin: '-80px' });
  const faqInView = useInView(faqRef, { once: true, margin: '-80px' });
  const ctaInView = useInView(ctaRef, { once: true, margin: '-80px' });
  const crossSellInView = useInView(crossSellRef, { once: true, margin: '-80px' });

  const sectionPadding: React.CSSProperties = {
    paddingTop: 100,
    paddingBottom: 100,
    paddingLeft: '5%',
    paddingRight: '5%',
  };

  const innerMax: React.CSSProperties = {
    maxWidth: 1200,
    margin: '0 auto',
  };

  return (
    <div style={{ background: '#060A15', minHeight: '100vh', color: '#E2E8F0' }}>

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section
        style={{
          ...sectionPadding,
          paddingTop: 140,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gradient orbs */}
        <div
          style={{
            position: 'absolute',
            top: -200,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 900,
            height: 600,
            background:
              'radial-gradient(ellipse, rgba(245,158,11,0.1) 0%, rgba(79,70,229,0.05) 45%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '-10%',
            width: 500,
            height: 500,
            background:
              'radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={innerMax}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 64,
              alignItems: 'center',
            }}
          >
            {/* Left: Text */}
            <div>
              {/* Breadcrumb */}
              <motion.nav
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                  marginBottom: 24,
                  fontFamily: 'var(--font-ui)',
                  fontSize: 13,
                  color: '#64748B',
                }}
              >
                <Link href="/" style={{ color: '#64748B', textDecoration: 'none' }}>Home</Link>
                <span>›</span>
                <Link href="/solutions" style={{ color: '#64748B', textDecoration: 'none' }}>Solutions</Link>
                <span>›</span>
                <span style={{ color: '#F59E0B' }}>Scale</span>
              </motion.nav>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ marginBottom: 24 }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'rgba(245,158,11,0.1)',
                    border: '1px solid rgba(245,158,11,0.3)',
                    borderRadius: 999,
                    padding: '6px 16px',
                    fontFamily: 'var(--font-ui)',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#F59E0B',
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: '#F59E0B',
                      boxShadow: '0 0 8px #F59E0B',
                      display: 'inline-block',
                    }}
                  />
                  Cubico Scale™
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(38px, 5vw, 62px)',
                  color: '#E2E8F0',
                  lineHeight: 1.1,
                  marginBottom: 24,
                }}
              >
                Your Institution's{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Digital Future
                </span>{' '}
                Starts Here.
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 18,
                  color: '#94A3B8',
                  lineHeight: 1.75,
                  marginBottom: 16,
                }}
              >
                Cubico Scale™ is a complete digital transformation service for educational
                institutions. From Moodle LMS setup and custom platform development to staff
                training, digital infrastructure, and long-term support — we handle everything
                under one roof.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 18,
                  color: '#94A3B8',
                  lineHeight: 1.75,
                  marginBottom: 40,
                }}
              >
                No more juggling vendors. No more systems that don't talk to each other.
                No more paying for things that don't work. Just one trusted partner with a
                single mission: transforming your institution completely and sustainably.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <CTAButton href="https://wa.me/923001234567?text=Hi!%20We're%20looking%20to%20digitally%20transform%20our%20institution.%20Can%20we%20discuss%20Moodle%20and%20LMS%20setup?">
                  Begin Your Transformation →
                </CTAButton>
              </motion.div>
            </div>

            {/* Right: Decorative */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <HeroDecoration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── THE VENDOR NIGHTMARE ──────────────────────────────────────────────── */}
      <section
        ref={problemRef}
        style={{
          ...sectionPadding,
          background: '#0C1528',
        }}
      >
        <div style={innerMax}>
          <motion.div
            initial="hidden"
            animate={problemInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <SectionLabel>The Problem</SectionLabel>
            <SectionHeading>
              The{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Vendor Nightmare
              </span>{' '}
              Most Schools Face
            </SectionHeading>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                color: '#94A3B8',
                maxWidth: 620,
                margin: '20px auto 0',
                lineHeight: 1.7,
              }}
            >
              Digital transformation should be liberating. For most institutions, it becomes
              a logistical nightmare. Here's what goes wrong — and why.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
            }}
          >
            {painPoints.map((point, index) => (
              <motion.div
                key={point.title}
                custom={index}
                initial="hidden"
                animate={problemInView ? 'visible' : 'hidden'}
                variants={fadeUp}
                whileHover={{ translateY: -4, boxShadow: '0 12px 40px rgba(245,158,11,0.1)' }}
                style={{
                  background: '#101E32',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16,
                  padding: '32px 28px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'default',
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 16 }}>{point.emoji}</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 700,
                    fontSize: 18,
                    color: '#E2E8F0',
                    marginBottom: 12,
                  }}
                >
                  {point.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    color: '#94A3B8',
                    lineHeight: 1.65,
                  }}
                >
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────────── */}
      <section ref={featuresRef} style={sectionPadding}>
        <div style={innerMax}>
          <motion.div
            initial="hidden"
            animate={featuresInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: 72 }}
          >
            <SectionLabel>What We Deliver</SectionLabel>
            <SectionHeading>
              Complete Digital Transformation,{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #F59E0B, #818CF8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                One Partner
              </span>
            </SectionHeading>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                color: '#94A3B8',
                maxWidth: 600,
                margin: '20px auto 0',
                lineHeight: 1.7,
              }}
            >
              Six interconnected services. One team. One invoice. One relationship you can
              actually rely on.
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                custom={index}
                initial="hidden"
                animate={featuresInView ? 'visible' : 'hidden'}
                variants={fadeUp}
                whileHover={{
                  translateY: -4,
                  boxShadow: '0 16px 48px rgba(245,158,11,0.13)',
                  borderColor: 'rgba(245,158,11,0.25)',
                }}
                style={{
                  background: '#101E32',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 16,
                  padding: '32px 28px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease',
                  cursor: 'default',
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    background: 'rgba(245,158,11,0.1)',
                    border: '1px solid rgba(245,158,11,0.2)',
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    marginBottom: 20,
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 700,
                    fontSize: 18,
                    color: '#E2E8F0',
                    marginBottom: 12,
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    color: '#94A3B8',
                    lineHeight: 1.65,
                  }}
                >
                  {feature.description}
                </p>
                <div
                  style={{
                    marginTop: 20,
                    height: 2,
                    width: 40,
                    background: 'linear-gradient(90deg, #F59E0B, transparent)',
                    borderRadius: 1,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE CUBICO DIFFERENCE ─────────────────────────────────────────────── */}
      <section
        ref={differenceRef}
        style={{
          ...sectionPadding,
          background: '#0C1528',
        }}
      >
        <div style={innerMax}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: 80,
              alignItems: 'center',
            }}
          >
            {/* Left: Text */}
            <div>
              <motion.div
                initial="hidden"
                animate={differenceInView ? 'visible' : 'hidden'}
                variants={fadeUp}
              >
                <SectionLabel>Why Cubico</SectionLabel>
                <SectionHeading style={{ marginBottom: 20 }}>
                  We Don't Just Build the Classroom.{' '}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #F59E0B, #818CF8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    We Fill It With Life.
                  </span>
                </SectionHeading>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    color: '#94A3B8',
                    lineHeight: 1.75,
                    marginBottom: 40,
                  }}
                >
                  Most EdTech vendors build the infrastructure and leave. Cubico stays. We
                  integrate every layer of your digital ecosystem — the platform, the content,
                  the people, and the process — into a cohesive whole that actually functions
                  in the real world.
                </p>
              </motion.div>

              {/* Advantages list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {advantages.map((adv, index) => (
                  <motion.div
                    key={adv.title}
                    custom={index}
                    initial="hidden"
                    animate={differenceInView ? 'visible' : 'hidden'}
                    variants={fadeUp}
                    style={{
                      display: 'flex',
                      gap: 16,
                      alignItems: 'flex-start',
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        background: 'rgba(245,158,11,0.1)',
                        border: '1px solid rgba(245,158,11,0.2)',
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 20,
                        flexShrink: 0,
                      }}
                    >
                      {adv.icon}
                    </div>
                    <div>
                      <h4
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 700,
                          fontSize: 16,
                          color: '#E2E8F0',
                          marginBottom: 6,
                        }}
                      >
                        {adv.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 14,
                          color: '#94A3B8',
                          lineHeight: 1.6,
                        }}
                      >
                        {adv.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Layered visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={differenceInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ position: 'relative' }}
            >
              {/* Stack of nested cards */}
              <div style={{ position: 'relative', paddingTop: 40 }}>
                {/* Shadow card 3 */}
                <div
                  style={{
                    position: 'absolute',
                    top: 20,
                    left: 30,
                    right: -30,
                    height: 200,
                    background: 'rgba(245,158,11,0.04)',
                    border: '1px solid rgba(245,158,11,0.1)',
                    borderRadius: 20,
                  }}
                />
                {/* Shadow card 2 */}
                <div
                  style={{
                    position: 'absolute',
                    top: 10,
                    left: 15,
                    right: -15,
                    height: 220,
                    background: 'rgba(245,158,11,0.06)',
                    border: '1px solid rgba(245,158,11,0.15)',
                    borderRadius: 20,
                  }}
                />
                {/* Main card */}
                <div
                  style={{
                    background: '#101E32',
                    border: '1px solid rgba(245,158,11,0.25)',
                    borderRadius: 20,
                    padding: '36px 32px',
                    position: 'relative',
                    zIndex: 2,
                    boxShadow: '0 0 60px rgba(245,158,11,0.1), 0 20px 60px rgba(0,0,0,0.3)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#F59E0B',
                      marginBottom: 12,
                    }}
                  >
                    Cubico Scale™ Stack
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { layer: 'Infrastructure & Hosting', color: '#4F46E5' },
                      { layer: 'LMS Platform (Moodle)', color: '#7C3AED' },
                      { layer: 'Custom Features & Plugins', color: '#06D6A0' },
                      { layer: 'Content & Curriculum', color: '#F59E0B' },
                      { layer: 'Staff Training', color: '#818CF8' },
                      { layer: 'Ongoing Support & Growth', color: '#EF4444' },
                    ].map((item, i) => (
                      <motion.div
                        key={item.layer}
                        initial={{ opacity: 0, x: -10 }}
                        animate={differenceInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '10px 14px',
                          background: `${item.color}0D`,
                          border: `1px solid ${item.color}22`,
                          borderRadius: 8,
                        }}
                      >
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: item.color,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: 13,
                            fontWeight: 500,
                            color: '#E2E8F0',
                          }}
                        >
                          {item.layer}
                        </span>
                        <div
                          style={{
                            marginLeft: 'auto',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: '#06D6A0',
                            boxShadow: '0 0 6px #06D6A0',
                          }}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom summary */}
                  <div
                    style={{
                      marginTop: 20,
                      paddingTop: 20,
                      borderTop: '1px solid rgba(255,255,255,0.07)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <span style={{ fontSize: 20 }}>✅</span>
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 13,
                        color: '#94A3B8',
                      }}
                    >
                      All layers managed by one team
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CASE STUDY: CORNWALL ISLAMIC FOUNDATION ──────────────────────────── */}
      <section ref={caseStudyRef} style={sectionPadding}>
        <div style={innerMax}>
          <motion.div
            initial="hidden"
            animate={caseStudyInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            style={{ marginBottom: 48, textAlign: 'center' }}
          >
            <SectionLabel>Real Results</SectionLabel>
            <SectionHeading>
              From{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #F59E0B, #818CF8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Challenge
              </span>{' '}
              to Complete Transformation
            </SectionHeading>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={caseStudyInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={1}
            style={{
              background: 'linear-gradient(135deg, #0C1528, #101E32)',
              border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: 20,
              padding: '48px 44px',
              boxShadow: '0 0 60px rgba(245,158,11,0.06)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background decoration */}
            <div
              style={{
                position: 'absolute',
                top: -60,
                right: -60,
                width: 240,
                height: 240,
                background: 'radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            {/* Header row */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 16,
                alignItems: 'flex-start',
                marginBottom: 32,
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 8,
                  }}
                >
                  <span style={{ fontSize: 28 }}>🇨🇦</span>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 26,
                      color: '#E2E8F0',
                    }}
                  >
                    Cornwall Islamic Foundation
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    color: '#64748B',
                  }}
                >
                  Cornwall, Ontario, Canada
                </p>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Moodle LMS', 'Islamic Education', 'Staff Training', 'Custom Theme', 'RTL Support'].map(
                  (tag) => (
                    <span
                      key={tag}
                      style={{
                        background: 'rgba(245,158,11,0.08)',
                        border: '1px solid rgba(245,158,11,0.2)',
                        borderRadius: 6,
                        padding: '4px 10px',
                        fontFamily: 'var(--font-ui)',
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#F59E0B',
                      }}
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Case study grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 28,
              }}
            >
              {[
                {
                  heading: 'The Client',
                  icon: '🏛️',
                  content:
                    'An established Islamic educational foundation serving the Muslim community in Cornwall, Ontario. Running weekend Islamic school programs, full-time Hifz classes, and adult education programs across multiple sites.',
                },
                {
                  heading: 'The Challenge',
                  icon: '⚠️',
                  content:
                    'Classes were managed entirely on WhatsApp and paper registers. No standardised curriculum delivery, no way to track student progress, and no system for communicating with parents beyond phone calls. Teachers were burning out on admin.',
                },
                {
                  heading: 'What We Delivered',
                  icon: '🛠️',
                  content:
                    'Full Moodle LMS setup with custom Islamic-themed branding, Arabic and English dual-language support, Quran and Hifz course structures, attendance tracking, parent communication portal, and a full-day staff training programme.',
                },
                {
                  heading: 'The Result',
                  icon: '📈',
                  content:
                    'Teachers reduced weekly admin time by over 60%. Students and parents now have full visibility into progress and attendance. The foundation expanded its online offerings to students outside Cornwall within 3 months of launch.',
                },
              ].map((block) => (
                <div key={block.heading}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginBottom: 10,
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{block.icon}</span>
                    <h4
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 700,
                        fontSize: 14,
                        color: '#F59E0B',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {block.heading}
                    </h4>
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      color: '#94A3B8',
                      lineHeight: 1.7,
                    }}
                  >
                    {block.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Testimonial placeholder */}
            <div
              style={{
                marginTop: 36,
                paddingTop: 28,
                borderTop: '1px solid rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #F59E0B, #4F46E5)',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                }}
              >
                💬
              </div>
              <div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    color: '#E2E8F0',
                    lineHeight: 1.7,
                    fontStyle: 'italic',
                    marginBottom: 10,
                  }}
                >
                  "Cubico understood what we needed as an Islamic institution — not just the
                  technology, but the sensitivity to our curriculum and our community. The
                  platform they built feels like it was made specifically for us."
                </p>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 13,
                    color: '#64748B',
                  }}
                >
                  — Institution Administrator, Cornwall Islamic Foundation{' '}
                  <span style={{ color: '#F59E0B' }}>(testimonial on file)</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section
        ref={faqRef}
        style={{
          ...sectionPadding,
          background: '#0C1528',
        }}
      >
        <div style={{ ...innerMax, maxWidth: 800 }}>
          <motion.div
            initial="hidden"
            animate={faqInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: 56 }}
          >
            <SectionLabel>Common Questions</SectionLabel>
            <SectionHeading>Frequently Asked Questions</SectionHeading>
          </motion.div>

          <motion.div
            initial="hidden"
            animate={faqInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={1}
          >
            <FAQAccordion items={faqs} />
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <section ref={ctaRef} style={sectionPadding}>
        <div style={innerMax}>
          <motion.div
            initial="hidden"
            animate={ctaInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            style={{
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(245,158,11,0.06), rgba(79,70,229,0.06))',
              border: '1px solid rgba(245,158,11,0.15)',
              borderRadius: 24,
              padding: '80px 40px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Orb */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 600,
                height: 300,
                background:
                  'radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <SectionLabel>Let's Build Your Future</SectionLabel>
              <SectionHeading style={{ marginBottom: 20 }}>
                Ready to Transform Your{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #F59E0B, #818CF8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Institution Completely?
                </span>
              </SectionHeading>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 17,
                  color: '#94A3B8',
                  maxWidth: 580,
                  margin: '0 auto 40px',
                  lineHeight: 1.7,
                }}
              >
                Start with a free consultation. We'll map out your institution's needs,
                recommend the right solutions, and give you a clear roadmap — with no
                obligation and no pressure.
              </p>
              <CTAButton href="https://wa.me/923001234567?text=Hi!%20We're%20looking%20to%20digitally%20transform%20our%20institution.%20Can%20we%20discuss%20Moodle%20and%20LMS%20setup?">
                Book a Free Consultation →
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CROSS-SELL ────────────────────────────────────────────────────────── */}
      <section
        ref={crossSellRef}
        style={{
          ...sectionPadding,
          paddingTop: 60,
          background: '#0C1528',
          borderTop: '1px solid #1A2E4A',
        }}
      >
        <div style={innerMax}>
          <motion.div
            initial="hidden"
            animate={crossSellInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: 48 }}
          >
            <SectionLabel>Explore More Solutions</SectionLabel>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(24px, 2.5vw, 32px)',
                color: '#E2E8F0',
              }}
            >
              Cubico Has a Solution for Every Layer of Education
            </h3>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 20,
            }}
          >
            {crossSellLinks.map((link, index) => (
              <motion.div
                key={link.href}
                custom={index}
                initial="hidden"
                animate={crossSellInView ? 'visible' : 'hidden'}
                variants={fadeUp}
              >
                <Link
                  href={link.href}
                  style={{
                    display: 'block',
                    background: '#101E32',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 12,
                    padding: '24px 20px',
                    textDecoration: 'none',
                    transition: 'border-color 0.3s ease, transform 0.3s ease',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: link.color,
                        boxShadow: `0 0 8px ${link.color}`,
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 700,
                        fontSize: 15,
                        color: '#E2E8F0',
                      }}
                    >
                      {link.label}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      color: '#94A3B8',
                      paddingLeft: 20,
                    }}
                  >
                    {link.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
