"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const DIFFERENTIATORS = [
  {
    icon: '👩‍🏫',
    title: 'Educators on the Team',
    description: 'Real teachers review every product. Your tools work in actual classrooms — not just in demos.',
  },
  {
    icon: '🌍',
    title: 'Native Arabic Content',
    description: 'Created by native speakers. Not translated. Not AI-generated. Culturally accurate and curriculum-aligned.',
  },
  {
    icon: '🏠',
    title: 'Everything Under One Roof',
    description: 'Management + Content + Learning + Infrastructure. One partner instead of five vendors who never talk to each other.',
  },
  {
    icon: '👥',
    title: 'Dedicated Project Teams',
    description: 'Every engagement gets its own team that knows your institution. No shared resources, no rotating staff.',
  },
  {
    icon: '🎓',
    title: 'Training Always Included',
    description: 'We train your staff until they\'re genuinely confident — not just "walked through". Free support month after launch.',
  },
  {
    icon: '🕐',
    title: '24/7 Responsive Support',
    description: 'Pakistan-GCC time zones are closely aligned. When you need us, we\'re there — no ticket queues.',
  },
];

// Comparison table data
const COMPARE = [
  { feature: 'School Management System',     cubico: true,  generic: false },
  { feature: 'Animated Educational Content', cubico: true,  generic: false },
  { feature: 'Game-Based Learning',          cubico: true,  generic: false },
  { feature: 'Native Arabic Content',        cubico: true,  generic: false },
  { feature: 'Moodle / LMS Setup',           cubico: true,  generic: false },
  { feature: 'Dedicated Team Per Project',   cubico: true,  generic: false },
  { feature: 'Training Included',            cubico: true,  generic: 'extra' },
  { feature: '24/7 Human Support',           cubico: true,  generic: 'ticket' },
];

function Tick({ yes }: { yes: boolean | string }) {
  if (yes === true)
    return <span style={{ color: '#F97316', fontSize: 16, fontWeight: 700 }}>✓</span>;
  if (yes === 'extra')
    return <span style={{ color: '#F59E0B', fontSize: 12, fontFamily: 'var(--font-ui)' }}>Add-on</span>;
  if (yes === 'ticket')
    return <span style={{ color: '#A1A1AA', fontSize: 12, fontFamily: 'var(--font-ui)' }}>Ticket only</span>;
  return <span style={{ color: '#E4E4E7', fontSize: 16 }}>✕</span>;
}

export default function WhyCubicoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const tableRef = useRef<HTMLDivElement>(null);
  const tableInView = useInView(tableRef, { once: true, margin: '-60px' });
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true, margin: '-60px' });

  return (
    <section style={{ backgroundColor: '#FFFFFF', padding: '96px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>

        {/* Header */}
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
            Why Cubico
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 4vw, 48px)', fontWeight: 700, color: '#18181B', margin: '0 0 16px', letterSpacing: '-0.025em' }}>
            What makes us different.
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: '#71717A', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
            No other EdTech company provides every piece of the puzzle under one roof.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div
          ref={ref}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 20, marginBottom: 72 }}
        >
          {DIFFERENTIATORS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                backgroundColor: '#FAFAF8',
                border: '1px solid #E4E4E7',
                borderRadius: 14,
                padding: '24px 24px',
                display: 'flex', gap: 16,
                transition: 'box-shadow 0.2s, transform 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(249,115,22,0.08)';
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(249,115,22,0.2)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                (e.currentTarget as HTMLElement).style.borderColor = '#E4E4E7';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <div
                style={{
                  flexShrink: 0, width: 44, height: 44, borderRadius: 11,
                  backgroundColor: 'rgba(249,115,22,0.08)',
                  border: '1px solid rgba(249,115,22,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
                }}
              >
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 600, color: '#18181B', margin: '0 0 6px' }}>
                  {item.title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#71717A', lineHeight: 1.65, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          ref={tableRef}
          initial={{ opacity: 0, y: 24 }}
          animate={tableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E4E4E7',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          {/* Table header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px 140px', borderBottom: '1px solid #E4E4E7' }}>
            <div style={{ padding: '18px 24px', fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Feature
            </div>
            <div style={{ padding: '18px 0', textAlign: 'center', backgroundColor: 'rgba(249,115,22,0.05)', borderLeft: '1px solid #E4E4E7' }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 14, fontWeight: 700, color: '#F97316' }}>Cubico</div>
            </div>
            <div style={{ padding: '18px 0', textAlign: 'center', borderLeft: '1px solid #E4E4E7' }}>
              <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: '#A1A1AA' }}>Generic Vendors</div>
            </div>
          </div>

          {COMPARE.map((row, i) => (
            <div
              key={row.feature}
              style={{
                display: 'grid', gridTemplateColumns: '1fr 140px 140px',
                borderBottom: i < COMPARE.length - 1 ? '1px solid #F4F4F5' : 'none',
                backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#FAFAF8',
              }}
            >
              <div style={{ padding: '14px 24px', fontFamily: 'var(--font-ui)', fontSize: 14, color: '#3F3F46', fontWeight: 500 }}>
                {row.feature}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid #F4F4F5', backgroundColor: i % 2 === 0 ? 'rgba(249,115,22,0.03)' : 'rgba(249,115,22,0.05)' }}>
                <Tick yes={row.cubico} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderLeft: '1px solid #F4F4F5' }}>
                <Tick yes={row.generic} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
