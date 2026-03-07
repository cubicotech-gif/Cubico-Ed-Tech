"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PILLARS = [
  {
    icon: '🏫',
    name: 'Cubico Manage™',
    tagline: 'Run your institution smarter',
    description: 'Student records, attendance, fees, timetables, parent portals, and staff management — all from one dashboard. Eliminate paperwork. Connect every stakeholder.',
    features: ['Student Info System', 'Fee Management', 'Parent Portal', 'Attendance Tracking', 'Staff HR', 'Analytics'],
    waText: 'Hi! I want to know more about your school management system.',
    color: '#F97316',
    bg: 'rgba(249,115,22,0.05)',
    border: 'rgba(249,115,22,0.18)',
  },
  {
    icon: '🎬',
    name: 'Cubico Teach™',
    tagline: 'Transform how educators deliver',
    description: 'Your textbooks come alive as 2D/3D animated lessons, visual comic books, and structured digital materials — in English, Arabic, and Urdu. Built with real educators.',
    features: ['2D/3D Animation', 'Comic Books', 'Course Design', 'Lesson Plans', 'Arabic Content', 'Assessments'],
    waText: "Hi! I'm interested in animated lesson content and course digitization.",
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.05)',
    border: 'rgba(139,92,246,0.18)',
  },
  {
    icon: '🎮',
    name: 'Cubico Learn™',
    tagline: 'Make students love learning',
    description: 'Game-based modules turn STEM into interactive adventures. Gamified assessments replace boring tests. Real-time progress tracking for parents and educators.',
    features: ['Game Modules', 'STEM Activities', 'Gamification', 'Progress Tracking', 'Parent Dashboard', 'Adaptive Learning'],
    waText: 'Hi! Tell me about your game-based learning solutions.',
    color: '#10B981',
    bg: 'rgba(16,185,129,0.05)',
    border: 'rgba(16,185,129,0.18)',
  },
  {
    icon: '🚀',
    name: 'Cubico Scale™',
    tagline: 'Go from classic to world-class',
    description: "Moodle LMS deployment, custom platforms, digital infrastructure, staff training, and 24/7 support. Full transformation with one partner — not five vendors.",
    features: ['Moodle LMS', 'Custom Dev', 'Infrastructure', 'Staff Training', 'Consulting', '24/7 Support'],
    waText: "Hi! We're looking to digitally transform our institution with Moodle/LMS.",
    color: '#3B82F6',
    bg: 'rgba(59,130,246,0.05)',
    border: 'rgba(59,130,246,0.18)',
  },
];

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="7" cy="7" r="7" fill={color} fillOpacity="0.1" />
      <path d="M4 7l2 2 4-4" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PillarCard({ pillar, index }: { pillar: typeof PILLARS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const waLink = `https://wa.me/923001234567?text=${encodeURIComponent(pillar.waText)}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E4E4E7',
        borderRadius: 20,
        padding: '32px 28px',
        display: 'flex', flexDirection: 'column',
        transition: 'box-shadow 0.25s, transform 0.25s, border-color 0.25s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 48px ${pillar.color}14`;
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLElement).style.borderColor = pillar.border;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.borderColor = '#E4E4E7';
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 52, height: 52, borderRadius: 14,
          backgroundColor: pillar.bg, border: `1px solid ${pillar.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, marginBottom: 20,
        }}
      >
        {pillar.icon}
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: '#18181B', margin: '0 0 4px', letterSpacing: '-0.015em' }}>
        {pillar.name}
      </h3>
      <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: pillar.color, fontWeight: 500, margin: '0 0 16px' }}>
        {pillar.tagline}
      </p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#71717A', lineHeight: 1.7, margin: '0 0 24px' }}>
        {pillar.description}
      </p>

      {/* Features */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 28, flex: 1 }}>
        {pillar.features.map(f => (
          <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <CheckIcon color={pillar.color} />
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: '#3F3F46', fontWeight: 500 }}>{f}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600,
          color: pillar.color, textDecoration: 'none',
          border: `1.5px solid ${pillar.border}`,
          borderRadius: 8, padding: '11px 20px',
          backgroundColor: pillar.bg, transition: 'all 0.18s',
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.filter = 'brightness(0.92)')}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.filter = 'none')}
      >
        Explore {pillar.name.replace('Cubico ', '').replace('™', '')} →
      </a>
    </motion.div>
  );
}

export default function PillarsSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  return (
    <section id="solutions" style={{ backgroundColor: '#FFFFFF', padding: '96px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>

        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span
            style={{
              display: 'inline-block',
              fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
              color: '#F97316', letterSpacing: '0.12em', textTransform: 'uppercase',
              backgroundColor: 'rgba(249,115,22,0.07)',
              border: '1px solid rgba(249,115,22,0.18)',
              borderRadius: 100, padding: '4px 14px', marginBottom: 16,
            }}
          >
            Solutions
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 700, color: '#18181B', margin: '0 0 16px', letterSpacing: '-0.025em' }}>
            Four pillars. One mission.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: '#71717A', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Management, content, learning, and infrastructure — under one roof, from one partner you can trust.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 24 }}>
          {PILLARS.map((pillar, i) => <PillarCard key={pillar.name} pillar={pillar} index={i} />)}
        </div>
      </div>
    </section>
  );
}
