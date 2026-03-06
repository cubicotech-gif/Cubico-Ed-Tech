"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import type { Metadata } from 'next';

// Note: metadata export won't work with "use client" — move to a layout or server wrapper if needed.
// For now, keeping it here as a reference; Next.js will ignore it in client components.
// export const metadata: Metadata = {
//   title: 'About Cubico Technologies | EdTech Partner for Educational Institutions',
//   description: 'Meet the team behind Cubico Technologies. Educators, animators, and developers building complete EdTech solutions for schools across Pakistan, Saudi Arabia, and beyond.',
// };

const values = [
  {
    icon: '📚',
    title: 'Education First',
    description:
      'Every decision we make is filtered through one question: does this genuinely help students learn and educators teach? Revenue follows purpose — not the other way around.',
  },
  {
    icon: '🏛️',
    title: 'One Roof',
    description:
      'Schools shouldn\'t have to juggle five vendors. We handle your website, LMS, animations, management system, and content under one roof, one team, one relationship.',
  },
  {
    icon: '👩‍🏫',
    title: 'Built With Educators',
    description:
      'Our team includes actual teachers, curriculum developers, and school administrators. We don\'t guess what schools need — we\'ve lived it.',
  },
  {
    icon: '🌍',
    title: 'Language is Identity',
    description:
      'Arabic-medium schools deserve Arabic-first content. Urdu-speaking communities deserve Urdu fluency. We produce content in the languages your students think in.',
  },
  {
    icon: '🤝',
    title: 'Partnership Over Transaction',
    description:
      'We don\'t deliver a project and disappear. We stay, support, iterate, and grow with you. Your long-term success is how we measure ours.',
  },
];

const advantages = [
  {
    title: 'Complete Ecosystem',
    description: 'Website, LMS, management system, animations, and apps — all integrated, all from one team.',
  },
  {
    title: 'Educators on the Team',
    description: 'We have teachers and curriculum developers in-house, not just developers. We understand pedagogy.',
  },
  {
    title: 'Native Arabic Content',
    description: 'Our Arabic content is produced by native Arabic-speaking educators — not translated from English.',
  },
  {
    title: 'Dedicated Teams',
    description: 'Your institution gets a dedicated project team, not a shared resource pool. You always know who to call.',
  },
  {
    title: 'Free Consultation & Training',
    description: 'We consult before we build, and we train your staff after delivery. No extra charge.',
  },
  {
    title: '24/7 Support',
    description: 'Schools don\'t run 9-to-5, and neither does our support. We\'re available when you need us.',
  },
];

const countries = [
  {
    flag: '🇵🇰',
    name: 'Pakistan',
    note: 'Serving schools across Karachi and beyond with management systems, websites, and full EdTech infrastructure.',
  },
  {
    flag: '🇸🇦',
    name: 'Saudi Arabia',
    note: 'Delivering native Arabic 2D animations and curriculum content for Arabic-medium institutions.',
  },
  {
    flag: '🇨🇦',
    name: 'Canada',
    note: 'Partnering with Islamic schools in Ontario on Moodle LMS, whiteboard animations, and digital learning comics.',
  },
];

const teamMembers = [
  {
    initials: 'RU',
    name: 'Rooh Ul',
    role: 'Founder & CEO',
    isFounder: true,
  },
  {
    initials: '+',
    name: 'Team Member',
    role: 'Lead Animator',
    isFounder: false,
  },
  {
    initials: '+',
    name: 'Team Member',
    role: 'EdTech Developer',
    isFounder: false,
  },
  {
    initials: '+',
    name: 'Team Member',
    role: 'Curriculum Designer',
    isFounder: false,
  },
];

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

export default function AboutPage() {
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
        {/* Background orb */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 700,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(79,70,229,0.15) 0%, rgba(124,58,237,0.08) 50%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 900, margin: '0 auto' }}>
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
            About Cubico Technologies
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
            We Believe Every School Deserves to Be{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Extraordinary.
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
              maxWidth: 680,
              margin: '0 auto 48px',
            }}
          >
            Cubico Technologies is a full-service EdTech company built specifically for educational institutions.
            We combine technology, design, curriculum expertise, and content production to transform how schools
            operate and how students learn — across Pakistan, Saudi Arabia, Canada, and beyond.
          </motion.p>

          {/* Stat highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            {[
              { value: '3 Countries', label: 'Active Partnerships' },
              { value: 'Complete Ecosystem', label: 'One Vendor, Everything You Need' },
            ].map((stat) => (
              <div
                key={stat.value}
                style={{
                  background: 'linear-gradient(135deg, rgba(79,70,229,0.12), rgba(124,58,237,0.08))',
                  border: '1px solid rgba(79,70,229,0.3)',
                  borderRadius: 12,
                  padding: '20px 32px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 28,
                    color: '#818CF8',
                    marginBottom: 6,
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: '#64748B' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section
        style={{
          background: '#0C1528',
          paddingTop: 100,
          paddingBottom: 100,
          paddingLeft: '5%',
          paddingRight: '5%',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          {/* Left: text */}
          <div>
            <FadeInSection>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#818CF8',
                  marginBottom: 16,
                }}
              >
                How It Started
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(32px, 3vw, 48px)',
                  color: '#E2E8F0',
                  marginBottom: 32,
                  lineHeight: 1.2,
                }}
              >
                Our Story
              </h2>
            </FadeInSection>

            <FadeInSection delay={0.1}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8, color: '#94A3B8', marginBottom: 20 }}>
                Cubico Technologies was founded on a simple frustration: educational institutions in Pakistan, the Gulf,
                and across the Muslim diaspora were being underserved by the tech industry. Schools were forced to piece
                together solutions from a dozen different vendors — none of whom understood how a school actually works.
              </p>
            </FadeInSection>

            <FadeInSection delay={0.2}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8, color: '#94A3B8', marginBottom: 20 }}>
                We started by building websites and management systems for schools in Karachi. Then came requests for
                Arabic content from Saudi institutions, then Moodle LMS setups from Canada, then animated curriculum
                resources. With each engagement, we realized the need wasn't for more tools — it was for a single,
                trusted partner who could handle everything.
              </p>
            </FadeInSection>

            <FadeInSection delay={0.3}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.8, color: '#94A3B8', marginBottom: 20 }}>
                Today, Cubico is that partner. We bring together developers, animators, curriculum experts, and designers
                who have all either worked in education or care deeply about it. We don't just deliver software — we
                deliver transformation.
              </p>
            </FadeInSection>

            <FadeInSection delay={0.4}>
              <div
                style={{
                  marginTop: 32,
                  padding: '20px 24px',
                  background: 'rgba(79,70,229,0.08)',
                  border: '1px solid rgba(79,70,229,0.2)',
                  borderRadius: 12,
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: '#818CF8',
                  fontStyle: 'italic',
                }}
              >
                📝 Founder story — Rooh Ul's personal journey in education and EdTech — coming soon.
              </div>
            </FadeInSection>
          </div>

          {/* Right: visual timeline */}
          <FadeInSection delay={0.2}>
            <div style={{ position: 'relative', paddingLeft: 40 }}>
              {/* Vertical line */}
              <div
                style={{
                  position: 'absolute',
                  left: 12,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: 'linear-gradient(to bottom, #4F46E5, #7C3AED, rgba(79,70,229,0.1))',
                  borderRadius: 2,
                }}
              />
              {[
                { year: 'Year 1', label: 'Founded in Karachi', detail: 'First school websites and student management systems go live.' },
                { year: 'Year 2', label: 'Saudi Arabia Partnership', detail: 'Native Arabic 2D animation production begins for Gulf schools.' },
                { year: 'Year 3', label: 'Canada Expansion', detail: 'Cornwall Islamic Foundation becomes our flagship international partner.' },
                { year: 'Today', label: 'Full EdTech Ecosystem', detail: '5 pillars. 3 countries. One team. Fully integrated solutions.' },
              ].map((item, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: 40, paddingLeft: 16 }}>
                  {/* Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: -34,
                      top: 4,
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                      border: '2px solid #060A15',
                      boxShadow: '0 0 12px rgba(79,70,229,0.5)',
                    }}
                  />
                  <div
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: '#818CF8',
                      marginBottom: 6,
                    }}
                  >
                    {item.year}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 16,
                      fontWeight: 600,
                      color: '#E2E8F0',
                      marginBottom: 6,
                    }}
                  >
                    {item.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#64748B', lineHeight: 1.6 }}>
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─── MISSION & VALUES ─── */}
      <section
        style={{
          background: '#060A15',
          paddingTop: 100,
          paddingBottom: 100,
          paddingLeft: '5%',
          paddingRight: '5%',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeInSection>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#818CF8',
                  marginBottom: 16,
                }}
              >
                What We Stand For
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(36px, 4vw, 52px)',
                  color: '#E2E8F0',
                  marginBottom: 16,
                }}
              >
                Mission & Values
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: '#94A3B8', maxWidth: 580, margin: '0 auto' }}>
                Our mission is to make extraordinary education accessible to every institution, regardless of size or location.
                These are the principles that guide every decision we make.
              </p>
            </div>
          </FadeInSection>

          {/* 2-col grid, 5 cards (last centered) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 24,
            }}
          >
            {values.slice(0, 4).map((val, i) => (
              <FadeInSection key={val.title} delay={i * 0.1}>
                <div
                  style={{
                    background: '#101E32',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 16,
                    padding: '32px 28px',
                    height: '100%',
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{val.icon}</div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 700,
                      fontSize: 18,
                      color: '#818CF8',
                      marginBottom: 12,
                    }}
                  >
                    {val.title}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: '#94A3B8' }}>
                    {val.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>

          {/* 5th card centered */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
            <FadeInSection delay={0.4}>
              <div
                style={{
                  background: '#101E32',
                  border: '1px solid rgba(79,70,229,0.2)',
                  borderRadius: 16,
                  padding: '32px 28px',
                  maxWidth: 560,
                  width: '100%',
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{values[4].icon}</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 700,
                    fontSize: 18,
                    color: '#818CF8',
                    marginBottom: 12,
                  }}
                >
                  {values[4].title}
                </h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7, color: '#94A3B8' }}>
                  {values[4].description}
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─── THE TEAM ─── */}
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
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#818CF8',
                  marginBottom: 16,
                }}
              >
                The People Behind Cubico
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(36px, 4vw, 52px)',
                  color: '#E2E8F0',
                  marginBottom: 16,
                }}
              >
                Meet the Team
              </h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: '#94A3B8', maxWidth: 580, margin: '0 auto 12px' }}>
                Educators, animators, developers, and designers — united by a shared belief that schools deserve better.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 12,
                  color: '#4F46E5',
                  letterSpacing: '0.06em',
                }}
              >
                Team cards with real photos coming soon
              </p>
            </div>
          </FadeInSection>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 24,
              marginTop: 48,
            }}
          >
            {teamMembers.map((member, i) => (
              <FadeInSection key={i} delay={i * 0.1}>
                <div
                  style={{
                    background: '#101E32',
                    border: member.isFounder
                      ? '1px solid rgba(79,70,229,0.4)'
                      : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 16,
                    padding: '32px 24px',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  {member.isFounder && (
                    <div
                      style={{
                        position: 'absolute',
                        top: -1,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                        borderRadius: '0 0 8px 8px',
                        padding: '3px 14px',
                        fontSize: 10,
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 600,
                        color: 'white',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Founder
                    </div>
                  )}
                  {/* Avatar */}
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      background: member.isFounder
                        ? 'linear-gradient(135deg, #4F46E5, #7C3AED)'
                        : '#1A2E4A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 20px',
                      fontSize: member.isFounder ? 24 : 28,
                      fontWeight: 700,
                      fontFamily: 'var(--font-ui)',
                      color: member.isFounder ? 'white' : '#4F46E5',
                      border: member.isFounder ? 'none' : '2px dashed #1A2E4A',
                    }}
                  >
                    {member.initials}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 600,
                      fontSize: 16,
                      color: '#E2E8F0',
                      marginBottom: 6,
                    }}
                  >
                    {member.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#64748B' }}>
                    {member.role}
                  </div>
                  {!member.isFounder && (
                    <div
                      style={{
                        marginTop: 12,
                        fontSize: 11,
                        fontFamily: 'var(--font-ui)',
                        color: '#4F46E5',
                        letterSpacing: '0.06em',
                      }}
                    >
                      Add photo
                    </div>
                  )}
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE CUBICO ─── */}
      <section
        style={{
          background: '#060A15',
          paddingTop: 100,
          paddingBottom: 100,
          paddingLeft: '5%',
          paddingRight: '5%',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <FadeInSection>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#818CF8',
                  marginBottom: 16,
                }}
              >
                Our Advantages
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(36px, 4vw, 52px)',
                  color: '#E2E8F0',
                }}
              >
                Why Choose Cubico
              </h2>
            </div>
          </FadeInSection>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
            }}
          >
            {advantages.map((adv, i) => (
              <FadeInSection key={adv.title} delay={i * 0.1}>
                <div
                  style={{
                    background: '#101E32',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 16,
                    padding: '28px 24px',
                    display: 'flex',
                    gap: 16,
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      flexShrink: 0,
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'rgba(79,70,229,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      color: '#818CF8',
                      marginTop: 2,
                    }}
                  >
                    ✓
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 600,
                        fontSize: 16,
                        color: '#E2E8F0',
                        marginBottom: 8,
                      }}
                    >
                      {adv.title}
                    </h3>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#94A3B8', lineHeight: 1.65 }}>
                      {adv.description}
                    </p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COUNTRIES WE SERVE ─── */}
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
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#818CF8',
                  marginBottom: 16,
                }}
              >
                Global Reach
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(36px, 4vw, 52px)',
                  color: '#E2E8F0',
                }}
              >
                Countries We Serve
              </h2>
            </div>
          </FadeInSection>

          <div
            style={{
              display: 'flex',
              gap: 28,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {countries.map((country, i) => (
              <FadeInSection key={country.name} delay={i * 0.15}>
                <div
                  style={{
                    background: '#101E32',
                    border: '1px solid rgba(79,70,229,0.25)',
                    borderRadius: 20,
                    padding: '40px 36px',
                    textAlign: 'center',
                    minWidth: 260,
                    maxWidth: 320,
                    flex: '1 1 260px',
                    boxShadow: '0 0 32px rgba(79,70,229,0.08)',
                  }}
                >
                  <div style={{ fontSize: 56, marginBottom: 16 }}>{country.flag}</div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 22,
                      color: '#E2E8F0',
                      marginBottom: 12,
                    }}
                  >
                    {country.name}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#94A3B8', lineHeight: 1.7 }}>
                    {country.note}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section
        style={{
          background: '#060A15',
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
            width: 600,
            height: 300,
            background: 'radial-gradient(ellipse, rgba(79,70,229,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto' }}>
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
              Get in Touch
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
              Want to Know More?{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Let's Talk.
              </span>
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: '#94A3B8', marginBottom: 40, lineHeight: 1.7 }}>
              Whether you're a school principal exploring options, a ministry official evaluating EdTech vendors, or an
              institution looking to modernize — we'd love a conversation. No sales pitch, just honest answers.
            </p>
            <motion.a
              href="https://wa.me/923001234567?text=Hi!%20I%20visited%20your%20about%20page%20and%20would%20like%20to%20learn%20more%20about%20Cubico%20Technologies."
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
          </FadeInSection>
        </div>
      </section>
    </main>
  );
}
