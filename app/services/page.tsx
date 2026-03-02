import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services — Cubico Technologies',
  description:
    'Moodle LMS setup, educational animations, digital apps, and content creation — complete EdTech solutions in English, Urdu, and Arabic.',
};

const SERVICES = [
  {
    number: '01',
    title: 'Moodle LMS Setup',
    tagline: 'Your institution. Your platform.',
    description:
      'From basic installation to full enterprise-level deployment. We handle hosting, branding, plugins, content migration, and ongoing support — so you can focus on teaching.',
    features: [
      'Cloud & on-premise hosting setup',
      'Custom branded themes (your colors, logo, layout)',
      'Plugin integration: BBB, Zoom, H5P, Attendance, Certificates',
      'Multi-site setup for multi-branch institutions',
      'Arabic / Urdu RTL full support',
      'Student, Teacher, Parent, Admin role management',
      'Payment gateway integration',
      'Course migration from Google Classroom, Canvas, Blackboard',
    ],
    gradient: 'linear-gradient(135deg, #1A1208 0%, #2A1A08 50%, #1A1210 100%)',
    accent: '#E8622A',
  },
  {
    number: '02',
    title: 'Educational Animations',
    tagline: '2D · 3D · Motion Graphics',
    description:
      'Professional animations for every subject and grade level. Custom-made to match your curriculum, board guidelines, and institutional branding — with multilingual voice-overs.',
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
    gradient: 'linear-gradient(135deg, #0A1210 0%, #1A2010 50%, #0A1412 100%)',
    accent: '#C9A96E',
  },
  {
    number: '03',
    title: 'Digital Solutions & Apps',
    tagline: 'ERP · Mobile · Portals',
    description:
      'Custom software and mobile apps for every institutional need — from student management to full school ERP systems built for Pakistan\'s educational landscape.',
    features: [
      'Student Management Systems (attendance, grades, profiles)',
      'School ERP (fees, HR, accounts, inventory, library)',
      'Mobile Apps (iOS + Android) for students, teachers, parents',
      'WhatsApp & SMS automation',
      'Fee collection: JazzCash, Easypaisa, Stripe',
      'Admission portals with application workflows',
      'Sponsor & donor management portals',
      'Custom dashboards and reporting',
    ],
    gradient: 'linear-gradient(135deg, #100A18 0%, #180A28 50%, #100818 100%)',
    accent: '#E8622A',
  },
  {
    number: '04',
    title: 'Content Creation',
    tagline: 'Curriculum · E-books · SCORM',
    description:
      'Complete curriculum development and instructional design. We create content that makes learning stick — compatible with every major board and available in three languages.',
    features: [
      'Curriculum design and lesson plans',
      'E-books and digital textbooks',
      'Interactive quizzes and assessments',
      'SCORM-packaged e-learning modules',
      'Teacher training resources',
      'Worksheets and printable materials',
      'Cambridge, Matric, O/A Level, Islamic curriculum',
      'Available in English, Urdu, and Arabic',
    ],
    gradient: 'linear-gradient(135deg, #120A08 0%, #1E1208 50%, #140A06 100%)',
    accent: '#C9A96E',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#080808',
          padding: '160px 5% 100px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 60% 40% at 20% 60%, rgba(232,98,42,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Section label */}
          <div style={{ marginBottom: 40 }}>
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 14,
                color: '#E8622A',
                letterSpacing: '0.1em',
              }}
            >
              SERVICES
            </span>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 11,
                color: '#7A7268',
                letterSpacing: '0.2em',
                marginLeft: 16,
                textTransform: 'uppercase',
              }}
            >
              WHAT WE BUILD
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(48px, 7vw, 96px)',
              color: '#F0EBE3',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              margin: '0 0 32px',
              maxWidth: 800,
            }}
          >
            End-to-End EdTech. Built for Your Institution.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              color: '#7A7268',
              lineHeight: 1.7,
              maxWidth: 560,
              margin: 0,
            }}
          >
            Four complete service lines covering every digital need — from LMS platforms
            to animations, apps, and curriculum content. In English, Urdu, and Arabic.
          </p>
        </div>
      </section>

      {/* ── Service Sections ─────────────────────────────────────────────────── */}
      {SERVICES.map((service, i) => (
        <section
          key={service.number}
          style={{
            backgroundColor: '#080808',
            borderTop: '1px solid #2A2520',
            padding: '0',
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              padding: '0 5%',
              display: 'grid',
              gridTemplateColumns: i % 2 === 0 ? '1fr 420px' : '420px 1fr',
              gap: 0,
              minHeight: 520,
            }}
          >
            {/* Content block */}
            <div
              style={{
                padding: '72px 60px 72px 0',
                order: i % 2 === 0 ? 1 : 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* Number + title */}
              <div style={{ marginBottom: 32 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontSize: 13,
                    color: service.accent,
                    letterSpacing: '0.1em',
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  {service.number}
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: 'clamp(28px, 3.5vw, 44px)',
                    color: '#F0EBE3',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.1,
                    margin: '0 0 8px',
                  }}
                >
                  {service.title}
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 12,
                    color: '#7A7268',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  {service.tagline}
                </p>
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 16,
                  color: '#7A7268',
                  lineHeight: 1.75,
                  marginBottom: 36,
                }}
              >
                {service.description}
              </p>

              {/* Feature list */}
              <ul
                style={{
                  listStyle: 'none',
                  margin: '0 0 40px',
                  padding: 0,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px 24px',
                }}
              >
                {service.features.map((f) => (
                  <li
                    key={f}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 14,
                      color: '#C4BFB8',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 8,
                    }}
                  >
                    <span style={{ color: service.accent, flexShrink: 0, marginTop: 1 }}>→</span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div>
                <Link
                  href="/contact"
                  data-cursor="cta"
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    fontSize: 15,
                    color: '#F0EBE3',
                    textDecoration: 'none',
                    backgroundColor: '#E8622A',
                    padding: '14px 36px',
                    display: 'inline-block',
                    letterSpacing: '0.02em',
                  }}
                >
                  Request a Proposal →
                </Link>
              </div>
            </div>

            {/* Image panel */}
            <div
              style={{
                order: i % 2 === 0 ? 2 : 1,
                background: service.gradient,
                position: 'relative',
                overflow: 'hidden',
                minHeight: 400,
              }}
            >
              {/* Decorative number watermark */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  bottom: -20,
                  right: -10,
                  fontFamily: 'var(--font-accent)',
                  fontSize: 220,
                  color: '#F0EBE3',
                  opacity: 0.03,
                  lineHeight: 1,
                  userSelect: 'none',
                }}
              >
                {service.number}
              </div>

              {/* Accent line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  backgroundColor: service.accent,
                  opacity: 0.6,
                }}
              />
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA Strip (cream) ─────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#F5F2ED',
          padding: '120px 5%',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 640,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 500,
              fontSize: 11,
              color: '#7A7268',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Limited Project Slots · Q2 2026
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(36px, 5vw, 72px)',
              color: '#1A1714',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              margin: 0,
            }}
          >
            Ready to Build Something?
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              color: '#5A5550',
              lineHeight: 1.7,
              maxWidth: 480,
              margin: 0,
            }}
          >
            Tell us about your institution. We&apos;ll respond within 24 hours
            with a clear plan and honest pricing.
          </p>

          <Link
            href="/contact"
            data-cursor="cta"
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: 17,
              color: '#F0EBE3',
              textDecoration: 'none',
              backgroundColor: '#E8622A',
              padding: '18px 44px',
              display: 'inline-block',
              marginTop: 8,
            }}
          >
            Start Your Project →
          </Link>
        </div>
      </section>
    </>
  );
}
