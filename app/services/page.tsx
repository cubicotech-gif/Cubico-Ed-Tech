import type { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Moodle LMS setup, educational animations, digital apps, and content creation — complete EdTech solutions in English, Urdu, and Arabic.',
};

const services = [
  {
    number: '01',
    title: 'Moodle LMS Setup',
    description:
      'From basic installation to full enterprise-level deployment. We handle hosting, branding, plugins, content migration, and ongoing support.',
    features: [
      'Cloud & on-premise hosting setup',
      'Custom branded themes (your colors, logo, layout)',
      'Plugin integration: BigBlueButton, Zoom, H5P, Attendance, Certificates',
      'Multi-site setup for multi-branch institutions',
      'Arabic / Urdu RTL support',
      'Student, Teacher, Parent, Admin role management',
      'Payment gateway integration',
      'Course migration from Google Classroom, Canvas, Blackboard',
    ],
  },
  {
    number: '02',
    title: 'Educational Animations',
    description:
      'Professional animations for every subject and every grade level. Custom-made to match your curriculum, guidelines, and branding.',
    features: [
      '2D Character Animation',
      '3D Animation (science models, anatomy, geography)',
      'Whiteboard / Doodle Animation',
      'Motion Graphics & Kinetic Typography',
      'Voice-over: English, Urdu, Arabic',
      'All subjects: Science, Math, History, Languages, Islamic Studies',
      'All levels: Preschool to University',
      'Delivery in MP4, SCORM, YouTube-ready formats',
    ],
  },
  {
    number: '03',
    title: 'Digital Solutions & Apps',
    description:
      'Custom software and mobile apps for every institutional need — from student management to full school ERP systems.',
    features: [
      'Student Management Systems (attendance, grades, profiles)',
      'School ERP (fees, HR, accounts, inventory, library)',
      'Mobile Apps (iOS + Android) for students, teachers, parents',
      'WhatsApp & SMS automation',
      'Fee collection with JazzCash, Easypaisa, Stripe',
      'Admission portals with application workflows',
      'Sponsor & donor management portals',
      'Custom dashboards and reporting',
    ],
  },
  {
    number: '04',
    title: 'Educational Content Creation',
    description:
      'Complete curriculum development and instructional design services. We create content that makes learning stick.',
    features: [
      'Curriculum design and lesson plans',
      'E-books and digital textbooks',
      'Interactive quizzes and assessments',
      'SCORM-packaged e-learning modules',
      'Teacher training resources',
      'Worksheets and printable materials',
      'Compatible with any board: Cambridge, Matric, O/A Level, Islamic curriculum',
      'Available in English, Urdu, and Arabic',
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Page hero ── */}
      <section
        style={{
          backgroundColor: '#080808',
          padding: '160px 5% 100px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 60% 50% at 30% 60%, rgba(232,98,42,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <AnimatedSection style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <div style={{ marginBottom: 32 }}>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 500,
                fontSize: 11,
                color: '#E8622A',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
              }}
            >
              Services — What We Offer
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(44px, 6vw, 80px)',
              color: '#F0EBE3',
              lineHeight: 1.04,
              letterSpacing: '-0.025em',
              margin: '0 0 24px',
            }}
          >
            End-to-End EdTech.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              color: '#7A7268',
              lineHeight: 1.75,
              maxWidth: 520,
              margin: 0,
            }}
          >
            Complete solutions for every type of institution — conventional, Islamic, or
            international. In English, Urdu, and Arabic.
          </p>
        </AnimatedSection>
      </section>

      {/* ── Service blocks ── */}
      <section
        style={{
          backgroundColor: '#080808',
          padding: '0 5% 80px',
          borderTop: '1px solid #2A2520',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            paddingTop: 80,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {services.map((service, i) => (
            <AnimatedSection key={service.title} delay={0.05 * i}>
              <div
                style={{
                  backgroundColor: '#191919',
                  border: '1px solid #2A2520',
                  padding: '52px 48px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 2fr',
                  gap: 60,
                  alignItems: 'start',
                }}
                className="flex-col md:grid"
              >
                {/* Left: number + title + description + CTA */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-accent)',
                      fontSize: 64,
                      color: '#C9A96E',
                      opacity: 0.45,
                      lineHeight: 1,
                    }}
                  >
                    {service.number}
                  </div>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 26,
                      color: '#F0EBE3',
                      margin: 0,
                      lineHeight: 1.15,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {service.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 15,
                      color: '#7A7268',
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {service.description}
                  </p>
                  <Link
                    href="/contact"
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 600,
                      fontSize: 13,
                      color: '#F0EBE3',
                      textDecoration: 'none',
                      backgroundColor: '#E8622A',
                      padding: '13px 28px',
                      display: 'inline-block',
                      letterSpacing: '0.02em',
                      transition: 'background-color 0.2s ease',
                      alignSelf: 'flex-start',
                    }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = '#C4531F')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = '#E8622A')}
                  >
                    Request a Proposal →
                  </Link>
                </div>

                {/* Right: feature list */}
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 500,
                      fontSize: 10,
                      color: '#6A6460',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      marginBottom: 20,
                    }}
                  >
                    What&apos;s included
                  </div>
                  <ul
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '10px 40px',
                      listStyle: 'none',
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {service.features.map(feature => (
                      <li
                        key={feature}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 10,
                          fontFamily: 'var(--font-body)',
                          fontSize: 14,
                          color: '#9A9490',
                          lineHeight: 1.6,
                        }}
                        dir="auto"
                      >
                        <span style={{ color: '#E8622A', flexShrink: 0, marginTop: 1 }}>→</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section style={{ backgroundColor: '#F5F2ED', padding: '120px 5%', position: 'relative', overflow: 'hidden' }}>
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 60,
            background: 'linear-gradient(to bottom, #080808 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
        <AnimatedSection style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(36px, 4.5vw, 60px)',
              color: '#1A1714',
              letterSpacing: '-0.025em',
              lineHeight: 1.05,
              margin: '0 0 20px',
            }}
          >
            Ready to get started?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              color: '#5A5250',
              lineHeight: 1.7,
              margin: '0 0 40px',
            }}
          >
            Tell us what your institution needs and we&apos;ll send you a clear proposal within 24 hours.
          </p>
          <Link
            href="/contact"
            data-cursor="cta"
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: 15,
              color: '#F0EBE3',
              textDecoration: 'none',
              backgroundColor: '#E8622A',
              padding: '18px 48px',
              display: 'inline-block',
              letterSpacing: '0.02em',
              transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 4px 24px rgba(232,98,42,0.25)',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = '#C4531F';
              el.style.boxShadow = '0 8px 36px rgba(232,98,42,0.38)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = '#E8622A';
              el.style.boxShadow = '0 4px 24px rgba(232,98,42,0.25)';
            }}
          >
            Request a Proposal →
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
