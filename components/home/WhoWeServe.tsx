'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ROWS = [
  {
    num: '01',
    title: 'Conventional Schools & Academies',
    pain: 'You have a great school. Parents just can\'t see it online.',
    deliverables: [
      'Website with online admissions & fee portal',
      'Moodle LMS for blended learning',
      'Digital marketing for each intake season',
    ],
    img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=70',
  },
  {
    num: '02',
    title: 'Islamic Schools & Madrassas',
    pain: 'You need a digital presence that respects your values — not one that ignores them.',
    deliverables: [
      'Full Arabic RTL website, scholar-reviewed Islamic content',
      'Urdu & Arabic Moodle LMS with Quran & Hadith modules',
      'Zakat, donation & scholarship portals',
    ],
    img: 'https://images.unsplash.com/photo-1604710813690-d9e46413c4f3?w=600&q=70',
  },
  {
    num: '03',
    title: 'Universities & Colleges',
    pain: 'Your institution has the reputation. The digital experience hasn\'t caught up.',
    deliverables: [
      'Programme catalogues, faculty directories & student portals',
      'LMS for 1,000+ concurrent users with analytics dashboards',
      'Application & enrollment management systems',
    ],
    img: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&q=70',
  },
  {
    num: '04',
    title: 'Coaching Centers & EdTech Startups',
    pain: 'You move fast. You need tech that keeps up — and doesn\'t break when your students double.',
    deliverables: [
      'Custom LMS from scratch with SCORM course authoring',
      'Subscription & payment gateway integration (JazzCash, Stripe)',
      'Mobile app with push notifications & offline support',
    ],
    img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=70',
  },
];

export default function WhoWeServe() {
  const [active, setActive] = useState(1); // Islamic schools default-open

  return (
    <>
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
        viewport={{ once: true }} transition={{ duration: .6, ease: 'easeOut' }}
        style={{ height: 2, background: '#E8622A', transformOrigin: 'left' }}
      />
      <section style={{ background: '#050505', position: 'relative', overflow: 'hidden' }}>
        {/* Grain */}
        <div aria-hidden style={{ position: 'absolute', inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='.022'/%3E%3C/svg%3E\")", pointerEvents: 'none', zIndex: 0 }} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: .55 }}
          style={{ maxWidth: 1440, margin: '0 auto', padding: '80px 6% 64px', position: 'relative', zIndex: 1 }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-accent)', fontSize: 11, letterSpacing: '.4em', color: '#C9A96E', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ display: 'inline-block', width: 28, height: 1, background: '#C9A96E' }} />
                07 — WHO WE SERVE
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(40px,6vw,80px)', lineHeight: .94, letterSpacing: '-.03em', color: '#F0EBE3', margin: 0 }}>
                Your institution,<br />
                <em style={{ fontWeight: 300, color: '#C9A96E' }}>by name.</em>
              </h2>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.75, color: '#6a6460', maxWidth: 400, marginBottom: 0 }}>
              Specificity earns trust. We name your institution type because we know it deeply — its pressures, its audiences, and its needs.
            </p>
          </div>
        </motion.div>

        {/* Accordion rows */}
        <div style={{ borderTop: '1px solid #1a1a1a', position: 'relative', zIndex: 1 }}>
          {ROWS.map((row, idx) => {
            const isOpen = active === idx;
            return (
              <div key={idx}>
                <div
                  onClick={() => setActive(isOpen ? -1 : idx)}
                  style={{ cursor: 'pointer', borderBottom: '1px solid #1a1a1a' }}
                >
                  {/* Collapsed header row */}
                  <div style={{
                    maxWidth: 1440, margin: '0 auto', padding: '0 6%',
                    height: 100, display: 'flex', alignItems: 'center', gap: 40,
                    background: isOpen ? '#080808' : '#050505',
                    transition: 'background .3s',
                  }}>
                    <div style={{ fontFamily: 'var(--font-accent)', fontSize: 13, letterSpacing: '.25em', color: isOpen ? '#E8622A' : '#3a3530', flexShrink: 0, width: 32, transition: 'color .3s' }}>{row.num}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(20px,2.8vw,36px)', letterSpacing: '-.02em', color: isOpen ? '#F0EBE3' : '#7a7268', flex: 1, transition: 'color .3s' }}>{row.title}</div>
                    <div style={{ fontFamily: 'var(--font-accent)', fontSize: 18, color: isOpen ? '#E8622A' : '#2a2a2a', transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform .35s, color .3s', flexShrink: 0 }}>+</div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: .45, ease: [.16, 1, .3, 1] }}
                        style={{ overflow: 'hidden', background: '#080808' }}
                      >
                        <div style={{ maxWidth: 1440, margin: '0 auto', padding: '48px 6% 56px', display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 64, alignItems: 'start' }}>
                          {/* Pain point */}
                          <div>
                            <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(18px,2.2vw,28px)', lineHeight: 1.3, color: '#C9A96E', marginBottom: 32 }}>
                              &ldquo;{row.pain}&rdquo;
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                              {row.deliverables.map((d, di) => (
                                <motion.div
                                  key={di}
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: di * 0.08 + 0.15, duration: .35 }}
                                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
                                >
                                  <span style={{ color: '#E8622A', fontSize: 13, flexShrink: 0, marginTop: 1 }}>✓</span>
                                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#c8c2ba', lineHeight: 1.6 }}>{d}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                          {/* Empty col for spacing */}
                          <div />
                          {/* Ghost preview image */}
                          <div style={{ width: 240, flexShrink: 0 }}>
                            <div style={{ width: '100%', aspectRatio: '16/10', backgroundImage: `url('${row.img}')`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'saturate(.3) brightness(.4)', border: '1px solid #1a1a1a', transition: 'filter .3s' }}
                              onMouseEnter={e => (e.currentTarget.style.filter = 'saturate(.7) brightness(.6)')}
                              onMouseLeave={e => (e.currentTarget.style.filter = 'saturate(.3) brightness(.4)')}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <div style={{ padding: '48px 6%', textAlign: 'center', borderTop: '1px solid #1a1a1a', position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(16px,2vw,22px)', color: '#3a3530', margin: 0 }}>
            If your institution teaches people, we build for you.
          </p>
        </div>
      </section>
    </>
  );
}
