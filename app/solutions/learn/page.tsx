"use client";

import type { Metadata } from 'next';
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
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

interface DayCard {
  time: string;
  label: string;
  icon: string;
  description: string;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const painPoints: PainPoint[] = [
  {
    emoji: '😴',
    title: 'Students Zone Out in 8 Minutes',
    description:
      'Research shows the average student loses focus within 8 minutes of a traditional lecture. Yet most classrooms still rely on 45-minute talk-and-chalk sessions.',
  },
  {
    emoji: '📉',
    title: 'Passive Learning Doesn\'t Stick',
    description:
      'Students retain only 5% of what they hear in a lecture. But they retain up to 75% of what they learn by doing. Traditional teaching ignores this completely.',
  },
  {
    emoji: '😟',
    title: 'Fear of Failure Kills Curiosity',
    description:
      'When every mistake is graded, students stop taking risks. They stop asking questions. They stop being curious. The joy of discovery gets crushed by fear.',
  },
  {
    emoji: '🏆',
    title: 'No Immediate Feedback Loop',
    description:
      'Students submit work and wait days for feedback. By then, the learning moment is gone. Without instant feedback, errors become habits.',
  },
  {
    emoji: '🔌',
    title: 'Technology Is Used Wrong',
    description:
      'Most schools that "use technology" just show PowerPoint on a projector. That\'s not transformation — that\'s decoration. Real EdTech changes the learning experience.',
  },
];

const features: FeatureCard[] = [
  {
    icon: '🎮',
    title: 'Game-Based Modules',
    description:
      'Curriculum-aligned educational games that turn Math, Science, English, and more into interactive adventures. Students compete, collaborate, and learn — without realising it.',
  },
  {
    icon: '✅',
    title: 'Interactive Assessments',
    description:
      'Drag-and-drop, matching, fill-in-the-blank, and scenario-based quizzes that adapt to student performance. Instant feedback means mistakes become learning moments, not demoralising red marks.',
  },
  {
    icon: '🔬',
    title: 'STEM Activities',
    description:
      'Virtual labs, simulations, and hands-on digital experiments. Students explore chemistry reactions, physics principles, and biology systems without needing expensive physical equipment.',
  },
  {
    icon: '📊',
    title: 'Real-Time Progress Tracking',
    description:
      'Teachers see exactly where each student stands — not just at report card time, but every single day. Spot struggling learners before they fall behind, and celebrate those who excel.',
  },
  {
    icon: '🏅',
    title: 'Gamified Achievements',
    description:
      'Badges, leaderboards, XP points, and level-up systems that make academic progress feel like winning. Students actually want to come back and beat their last score.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Parent Dashboard',
    description:
      'Parents get a live window into their child\'s learning journey — activity logs, achievement feeds, progress charts, and direct communication tools. No more "how was school?" answered with "fine."',
  },
];

const dayCards: DayCard[] = [
  {
    time: '08:30',
    label: 'Morning',
    icon: '🌅',
    description:
      'Students arrive and log into their personal learning dashboards. They check their XP points from yesterday, see new badges earned, and receive their personalised learning goals for the day. Engagement starts before the bell.',
  },
  {
    time: '10:00',
    label: 'Core Lesson',
    icon: '🎯',
    description:
      'The teacher launches an interactive game-based module on fractions. Students work in teams, racing to solve problems. The classroom leaderboard updates in real time. Laughter, competition, and genuine understanding — all happening at once.',
  },
  {
    time: '12:30',
    label: 'Assessment',
    icon: '⚡',
    description:
      'Instead of a paper test, students complete an adaptive quiz. Each question adjusts to their level. They get instant feedback with explanations. A student who answers wrong doesn\'t feel ashamed — they get another chance to learn, right then.',
  },
  {
    time: '15:00',
    label: 'After School',
    icon: '🏠',
    description:
      'At home, parents receive a real-time summary of their child\'s day. Three badges earned. One concept that needs review. A short practice activity recommended. The learning loop continues beyond the classroom walls.',
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
    href: '/solutions/scale',
    label: 'Cubico Scale™',
    description: 'LMS setup & digital transformation',
    color: '#F59E0B',
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-ui)',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#06D6A0',
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

// ── Decorative Hero SVG ───────────────────────────────────────────────────────

function HeroDecoration() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 480,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Outer glow */}
      <div
        style={{
          position: 'absolute',
          width: 340,
          height: 340,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,214,160,0.15) 0%, transparent 70%)',
          animation: 'pulse 3s ease-in-out infinite',
        }}
      />

      {/* Central game controller icon */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'linear-gradient(135deg, #0C1528, #101E32)',
          border: '1px solid rgba(6,214,160,0.3)',
          borderRadius: 24,
          padding: 32,
          boxShadow: '0 0 60px rgba(6,214,160,0.2), 0 20px 60px rgba(0,0,0,0.4)',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          width: 280,
        }}
      >
        {/* Controller SVG */}
        <div style={{ textAlign: 'center', fontSize: 64 }}>🎮</div>

        {/* Mini progress bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { label: 'Math Quest', value: 78, color: '#06D6A0' },
            { label: 'Science Lab', value: 55, color: '#818CF8' },
            { label: 'Word Challenge', value: 92, color: '#F59E0B' },
          ].map((bar) => (
            <div key={bar.label}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 11,
                    color: '#94A3B8',
                  }}
                >
                  {bar.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 11,
                    color: bar.color,
                    fontWeight: 600,
                  }}
                >
                  {bar.value}%
                </span>
              </div>
              <div
                style={{
                  height: 6,
                  background: 'rgba(255,255,255,0.07)',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${bar.value}%` }}
                  transition={{ duration: 1.2, delay: 0.6, ease: 'easeOut' }}
                  style={{
                    height: '100%',
                    background: bar.color,
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Achievement badges */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
          {['🏆', '⭐', '🔥', '💡'].map((badge, i) => (
            <motion.div
              key={badge}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1 + i * 0.15, type: 'spring' }}
              style={{
                width: 40,
                height: 40,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
              }}
            >
              {badge}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating puzzle pieces */}
      {[
        { top: '5%', left: '-10%', emoji: '🧩', delay: 0 },
        { top: '70%', right: '-8%', emoji: '⭐', delay: 1 },
        { top: '20%', right: '-12%', emoji: '🎯', delay: 0.5 },
        { bottom: '5%', left: '-5%', emoji: '💡', delay: 1.5 },
      ].map((item, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: item.delay,
          }}
          style={{
            position: 'absolute',
            top: item.top,
            left: (item as any).left,
            right: (item as any).right,
            bottom: (item as any).bottom,
            fontSize: 28,
            filter: 'drop-shadow(0 0 8px rgba(6,214,160,0.4))',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function LearnPage() {
  // Section refs for scroll-triggered animations
  const problemRef = useRef(null);
  const featuresRef = useRef(null);
  const dayRef = useRef(null);
  const ctaRef = useRef(null);
  const crossSellRef = useRef(null);

  const problemInView = useInView(problemRef, { once: true, margin: '-80px' });
  const featuresInView = useInView(featuresRef, { once: true, margin: '-80px' });
  const dayInView = useInView(dayRef, { once: true, margin: '-80px' });
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
            width: 800,
            height: 600,
            background:
              'radial-gradient(ellipse, rgba(6,214,160,0.12) 0%, rgba(79,70,229,0.06) 40%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: '-10%',
            width: 500,
            height: 500,
            background:
              'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)',
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
                <span style={{ color: '#06D6A0' }}>Learn</span>
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
                    background: 'rgba(6,214,160,0.1)',
                    border: '1px solid rgba(6,214,160,0.3)',
                    borderRadius: 999,
                    padding: '6px 16px',
                    fontFamily: 'var(--font-ui)',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#06D6A0',
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: '#06D6A0',
                      boxShadow: '0 0 8px #06D6A0',
                      display: 'inline-block',
                    }}
                  />
                  Cubico Learn™
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
                Students Don't Need More{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #06D6A0, #4F46E5)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Lectures.
                </span>{' '}
                They Need Experiences.
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
                Cubico Learn™ transforms how students engage with education. Through game-based
                learning, interactive assessments, virtual STEM labs, and real-time progress
                tracking, we make learning something students actually look forward to.
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
                When students are engaged, they learn faster, retain more, and develop genuine
                curiosity. That's not an opinion — it's what the research shows. And it's what
                Cubico makes possible in your classrooms.
              </motion.p>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
              >
                <CTAButton href="https://wa.me/923001234567?text=Hi!%20Tell%20me%20about%20your%20game-based%20learning%20solutions%20for%20students.">
                  Talk to Us About Student Engagement →
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

      {/* ── THE ENGAGEMENT CRISIS ─────────────────────────────────────────────── */}
      <section
        ref={problemRef}
        style={{
          ...sectionPadding,
          background: '#0C1528',
        }}
      >
        <div style={innerMax}>
          {/* Header */}
          <motion.div
            initial="hidden"
            animate={problemInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: 64 }}
          >
            <SectionLabel>The Engagement Crisis</SectionLabel>
            <SectionHeading>
              Why Students Are{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #06D6A0, #4F46E5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Checking Out
              </span>
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
              The traditional classroom model was designed for a world that no longer exists.
              Here's what's really happening to your students every day.
            </p>
          </motion.div>

          {/* Pain Point Cards */}
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
                whileHover={{ translateY: -4, boxShadow: '0 12px 40px rgba(6,214,160,0.12)' }}
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
          {/* Header */}
          <motion.div
            initial="hidden"
            animate={featuresInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: 72 }}
          >
            <SectionLabel>What Cubico Learn™ Delivers</SectionLabel>
            <SectionHeading>
              Learning That Feels{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #06D6A0, #818CF8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Like Play
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
              Six powerful tools, one mission: to make every student genuinely excited to learn.
            </p>
          </motion.div>

          {/* Feature Grid */}
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
                  boxShadow: '0 16px 48px rgba(6,214,160,0.15)',
                  borderColor: 'rgba(6,214,160,0.3)',
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
                {/* Icon */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    background: 'rgba(6,214,160,0.1)',
                    border: '1px solid rgba(6,214,160,0.2)',
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

                {/* Accent line */}
                <div
                  style={{
                    marginTop: 20,
                    height: 2,
                    width: 40,
                    background: 'linear-gradient(90deg, #06D6A0, transparent)',
                    borderRadius: 1,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── A DAY IN A CUBICO-POWERED CLASSROOM ──────────────────────────────── */}
      <section
        ref={dayRef}
        style={{
          ...sectionPadding,
          background: '#0C1528',
        }}
      >
        <div style={innerMax}>
          {/* Header */}
          <motion.div
            initial="hidden"
            animate={dayInView ? 'visible' : 'hidden'}
            variants={fadeUp}
            style={{ textAlign: 'center', marginBottom: 72 }}
          >
            <SectionLabel>A Day in the Life</SectionLabel>
            <SectionHeading>
              A Day in a{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #06D6A0, #818CF8)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Cubico-Powered
              </span>{' '}
              Classroom
            </SectionHeading>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                color: '#94A3B8',
                maxWidth: 580,
                margin: '20px auto 0',
                lineHeight: 1.7,
              }}
            >
              Here's what an ordinary school day looks like when Cubico Learn™ is running in your
              institution.
            </p>
          </motion.div>

          {/* Timeline Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 0,
              position: 'relative',
            }}
          >
            {/* Connector line */}
            <div
              style={{
                position: 'absolute',
                top: 56,
                left: '12%',
                right: '12%',
                height: 2,
                background: 'linear-gradient(90deg, #06D6A0, #4F46E5, #7C3AED, #06D6A0)',
                opacity: 0.3,
                pointerEvents: 'none',
              }}
            />

            {dayCards.map((card, index) => (
              <motion.div
                key={card.label}
                custom={index}
                initial="hidden"
                animate={dayInView ? 'visible' : 'hidden'}
                variants={fadeUp}
                style={{ padding: '0 12px', position: 'relative' }}
              >
                {/* Time chip */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    background: 'rgba(6,214,160,0.1)',
                    border: '1px solid rgba(6,214,160,0.25)',
                    borderRadius: 999,
                    padding: '4px 12px',
                    fontFamily: 'var(--font-ui)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#06D6A0',
                    marginBottom: 16,
                  }}
                >
                  {card.time}
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ translateY: -4, boxShadow: '0 12px 40px rgba(6,214,160,0.12)' }}
                  style={{
                    background: '#101E32',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 16,
                    padding: '28px 24px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{card.icon}</div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      fontSize: 16,
                      color: '#E2E8F0',
                      marginBottom: 10,
                    }}
                  >
                    {card.label}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      color: '#94A3B8',
                      lineHeight: 1.65,
                    }}
                  >
                    {card.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
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
              background: 'linear-gradient(135deg, rgba(6,214,160,0.06), rgba(79,70,229,0.06))',
              border: '1px solid rgba(6,214,160,0.15)',
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
                width: 500,
                height: 300,
                background:
                  'radial-gradient(ellipse, rgba(6,214,160,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <SectionLabel>Get Started Today</SectionLabel>
              <SectionHeading style={{ marginBottom: 20 }}>
                Ready to Transform How Your{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #06D6A0, #818CF8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Students Learn?
                </span>
              </SectionHeading>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 17,
                  color: '#94A3B8',
                  maxWidth: 560,
                  margin: '0 auto 40px',
                  lineHeight: 1.7,
                }}
              >
                Join institutions that have already seen the difference. Book a free consultation
                and see how Cubico Learn™ fits into your classrooms.
              </p>
              <CTAButton href="https://wa.me/923001234567?text=Hi!%20Tell%20me%20about%20your%20game-based%20learning%20solutions%20for%20students.">
                Start the Conversation →
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
