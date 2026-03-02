import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About — Cubico Technologies',
  description:
    'Cubico Technologies is a Karachi-based EdTech agency serving educational institutions with LMS, animations, apps, and multilingual content.',
};

const STATS = [
  { number: '50+', label: 'Projects Delivered' },
  { number: '3',   label: 'Languages Supported' },
  { number: '5+',  label: 'Years Experience' },
  { number: '100%', label: 'Custom Solutions' },
];

const VALUES = [
  {
    number: '01',
    title: 'Education First',
    description:
      'Every decision we make is grounded in what\'s best for learners and institutions — not just what\'s technically impressive.',
  },
  {
    number: '02',
    title: 'Custom Over Templates',
    description:
      'We offer both fully custom solutions and fast, cost-effective ready-made setups. You choose what fits your budget and timeline.',
  },
  {
    number: '03',
    title: 'Multilingual by Default',
    description:
      'English, Urdu, and Arabic support — including right-to-left layouts — is built into everything we create, not bolted on after.',
  },
  {
    number: '04',
    title: 'Long-Term Partnership',
    description:
      'We don\'t disappear after launch. We train your team, provide ongoing support, and grow with your institution over time.',
  },
];

export default function AboutPage() {
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
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 50% 60% at 90% 20%, rgba(201,169,110,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Label */}
          <div style={{ marginBottom: 40 }}>
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 14,
                color: '#C9A96E',
                letterSpacing: '0.1em',
              }}
            >
              ABOUT
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
              WHO WE ARE
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
            A Creative EdTech Agency. Based in Karachi.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              color: '#7A7268',
              lineHeight: 1.7,
              maxWidth: 540,
              margin: 0,
            }}
          >
            We build technology that makes education better — for conventional schools,
            Islamic institutions, universities, and corporate training programs.
          </p>
        </div>
      </section>

      {/* ── Stats Row ─────────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#080808',
          borderTop: '1px solid #2A2520',
          borderBottom: '1px solid #2A2520',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 5%',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: '1 1 200px',
                padding: '60px 0',
                textAlign: 'center',
                borderRight: i < STATS.length - 1 ? '1px solid #2A2520' : 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-accent)',
                  fontSize: 'clamp(64px, 9vw, 120px)',
                  color: '#F0EBE3',
                  lineHeight: 1,
                }}
              >
                {stat.number}
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 12,
                  color: '#7A7268',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  marginTop: 10,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Story Section ─────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#080808',
          padding: '100px 5%',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          {/* Left column */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 11,
                color: '#7A7268',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 32,
              }}
            >
              OUR STORY
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                color: '#F0EBE3',
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
                margin: '0 0 32px',
              }}
            >
              We Build EdTech That Actually Works.
            </h2>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                color: '#7A7268',
                lineHeight: 1.8,
                display: 'flex',
                flexDirection: 'column',
                gap: 20,
              }}
            >
              <p style={{ margin: 0 }}>
                Cubico Technologies is a Karachi-based EdTech agency specialising in digital
                solutions for educational institutions. From Moodle LMS setups to 2D/3D
                animations, school management systems to e-learning content — we deliver
                end-to-end solutions that help institutions teach better.
              </p>
              <p style={{ margin: 0 }}>
                We serve conventional schools, Islamic institutions, madrassas, universities,
                coaching centres, and corporate training programs. Everything we build supports
                English, Urdu, and Arabic — including full RTL layout support.
              </p>
              <p style={{ margin: 0 }}>
                Our team combines technical expertise with a deep understanding of how education
                works in Pakistan and the wider Muslim world. We don&apos;t just deliver
                software — we deliver solutions that fit your institution&apos;s culture,
                language, and goals.
              </p>
            </div>

            <div style={{ marginTop: 48 }}>
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
                }}
              >
                Start a Conversation →
              </Link>
            </div>
          </div>

          {/* Right column: pull quote */}
          <div
            style={{
              paddingTop: 60,
              borderLeft: '1px solid #2A2520',
              paddingLeft: 60,
            }}
          >
            <blockquote
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(22px, 2.5vw, 30px)',
                color: '#C9A96E',
                lineHeight: 1.5,
                margin: '0 0 48px',
              }}
            >
              &ldquo;We don&apos;t use templates. Every solution is built for your
              institution — its curriculum, its culture, and its students.&rdquo;
            </blockquote>

            {/* Capability tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[
                'Moodle LMS', '2D Animation', '3D Animation', 'School ERP',
                'Mobile Apps', 'SCORM Content', 'Arabic RTL', 'Urdu VO',
                'Cambridge', 'Islamic Curriculum',
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: 12,
                    color: '#7A7268',
                    border: '1px solid #2A2520',
                    padding: '6px 14px',
                    letterSpacing: '0.06em',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Values Section ────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#111111',
          padding: '100px 5%',
          borderTop: '1px solid #2A2520',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Heading */}
          <div style={{ marginBottom: 64 }}>
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 14,
                color: '#C9A96E',
                letterSpacing: '0.1em',
                display: 'block',
                marginBottom: 8,
              }}
            >
              VALUES
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(28px, 4vw, 52px)',
                color: '#F0EBE3',
                letterSpacing: '-0.02em',
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              What Drives Us.
            </h2>
          </div>

          {/* 2×2 grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 0,
            }}
          >
            {VALUES.map((v, i) => (
              <div
                key={v.number}
                style={{
                  padding: '48px 40px',
                  borderBottom: '1px solid #2A2520',
                  borderRight: i % 2 === 0 ? '1px solid #2A2520' : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-accent)',
                    fontSize: 64,
                    color: '#C9A96E',
                    opacity: 0.35,
                    lineHeight: 1,
                    marginBottom: 16,
                  }}
                >
                  {v.number}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 22,
                    color: '#F0EBE3',
                    margin: '0 0 12px',
                    lineHeight: 1.2,
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 15,
                    color: '#7A7268',
                    margin: 0,
                    lineHeight: 1.75,
                  }}
                >
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            maxWidth: 600,
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
            Karachi, Pakistan
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
            Let&apos;s Build Something Together.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 16,
              color: '#5A5550',
              lineHeight: 1.7,
              maxWidth: 440,
              margin: 0,
            }}
          >
            Get in touch and we&apos;ll discuss how we can help your institution
            teach better, reach further, and grow faster.
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
            Start a Conversation →
          </Link>
        </div>
      </section>
    </>
  );
}
