'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PILLARS = [
  {
    icon: '🏫',
    name: 'Cubico Manage™',
    tagline: 'Run Your Institution Smarter',
    description: 'Student records, attendance, fees, timetables, parent portals, and staff management — all from one platform. Eliminate paperwork. Connect every stakeholder.',
    features: ['Student Info System', 'Fee Management', 'Parent Portal', 'Attendance', 'Analytics', 'Staff HR'],
    waText: 'Hi! I want to know more about your school management system and how it can help our institution.',
    color: '#4F46E5',
    gradient: 'linear-gradient(135deg, rgba(79,70,229,0.15), rgba(79,70,229,0.05))',
    borderColor: 'rgba(79,70,229,0.25)',
  },
  {
    icon: '🎬',
    name: 'Cubico Teach™',
    tagline: 'Transform How Educators Deliver',
    description: 'Your textbooks come alive as stunning 2D/3D animated lessons, visual comic books, and structured digital materials. In English, Arabic, and Urdu. Created with real educators.',
    features: ['2D/3D Animation', 'Comic Books', 'Course Design', 'Lesson Plans', 'Arabic Content', 'Assessments'],
    waText: "Hi! I'm interested in your animated lesson content and course digitization for our school.",
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(124,58,237,0.05))',
    borderColor: 'rgba(124,58,237,0.25)',
  },
  {
    icon: '🎮',
    name: 'Cubico Learn™',
    tagline: 'Make Students Love Learning',
    description: 'Game-based modules turn STEM concepts into interactive adventures. Gamified assessments replace boring tests. Real-time progress tracking that parents and educators can see.',
    features: ['Game Modules', 'STEM Activities', 'Gamification', 'Progress Tracking', 'Parent Dashboard', 'Adaptive Learning'],
    waText: 'Hi! Tell me about your game-based learning solutions for students.',
    color: '#06D6A0',
    gradient: 'linear-gradient(135deg, rgba(6,214,160,0.15), rgba(6,214,160,0.05))',
    borderColor: 'rgba(6,214,160,0.25)',
  },
  {
    icon: '🚀',
    name: 'Cubico Scale™',
    tagline: 'Go From Classic to World-Class',
    description: "Moodle LMS deployment, custom platforms, digital infrastructure, staff training, and 24/7 support. Complete transformation with one partner. You don't need five vendors — just one.",
    features: ['Moodle LMS', 'Custom Dev', 'Infrastructure', 'Training', 'Consulting', '24/7 Support'],
    waText: "Hi! We're looking to digitally transform our institution. Can we discuss Moodle and LMS setup?",
    color: '#818CF8',
    gradient: 'linear-gradient(135deg, rgba(129,140,248,0.15), rgba(129,140,248,0.05))',
    borderColor: 'rgba(129,140,248,0.25)',
  },
];

function PillarCard({ pillar, index }: { pillar: typeof PILLARS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const waLink = `https://wa.me/923001234567?text=${encodeURIComponent(pillar.waText)}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        background: pillar.gradient,
        border: `1px solid ${pillar.borderColor}`,
        borderRadius: 20,
        padding: '36px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${pillar.color}22`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Icon + name */}
      <div>
        <div style={{ fontSize: 40, marginBottom: 16 }}>{pillar.icon}</div>
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700,
          color: '#E2E8F0', margin: '0 0 6px', letterSpacing: '-0.01em',
        }}>
          {pillar.name}
        </h3>
        <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: pillar.color, margin: 0, fontWeight: 500 }}>
          {pillar.tagline}
        </p>
      </div>

      {/* Description */}
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#64748B', lineHeight: 1.7, margin: 0 }}>
        {pillar.description}
      </p>

      {/* Feature tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 8 }}>
        {pillar.features.map(f => (
          <span key={f} style={{
            fontFamily: 'var(--font-ui)', fontSize: 11, fontWeight: 500,
            color: pillar.color, backgroundColor: `${pillar.color}18`,
            border: `1px solid ${pillar.color}33`,
            borderRadius: 6, padding: '4px 10px',
          }}>
            {f}
          </span>
        ))}
      </div>

      {/* CTA */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 600,
          color: pillar.color, textDecoration: 'none',
          border: `1px solid ${pillar.color}44`,
          borderRadius: 8, padding: '12px 20px',
          marginTop: 'auto',
          transition: 'background-color 0.2s ease',
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = `${pillar.color}15`)}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = 'transparent')}
      >
        💬 Discuss {pillar.name.replace('Cubico ', '').replace('™', '')} Solutions
      </a>
    </motion.div>
  );
}

export default function PillarsSection() {
  return (
    <section id="solutions" style={{ backgroundColor: '#060A15', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <p style={{
            fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600,
            color: '#818CF8', letterSpacing: '0.12em', textTransform: 'uppercase' as const,
            margin: '0 0 16px',
          }}>
            SOLUTIONS
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 700, color: '#E2E8F0',
            margin: 0, letterSpacing: '-0.02em',
          }}>
            Four pillars. One mission.
          </h2>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.name} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
