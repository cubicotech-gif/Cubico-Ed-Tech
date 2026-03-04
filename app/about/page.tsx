import type { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Cubico Technologies is a Karachi-based EdTech agency serving educational institutions with LMS, animations, apps, and multilingual content.',
};

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '3',   label: 'Languages Supported' },
  { value: '5+',  label: 'Years Experience' },
  { value: '100%', label: 'Custom Solutions' },
];

const values = [
  {
    number: '01',
    title: 'Education First',
    description:
      'Every decision we make is grounded in what\u2019s best for learners and institutions \u2014 not just what\u2019s technically impressive.',
  },
  {
    number: '02',
    title: 'Custom to Premade',
    description:
      'We offer both fully custom solutions and fast, cost-effective ready-made setups. You choose what fits your budget and timeline.',
  },
  {
    number: '03',
    title: 'Multilingual by Default',
    description:
      'English, Urdu, and Arabic support \u2014 including right-to-left layouts \u2014 is built into everything we create.',
  },
  {
    number: '04',
    title: 'Long-Term Partnership',
    description:
      'We don\u2019t disappear after launch. We train your team, provide ongoing support, and grow with your institution.',
  },
];

export default function AboutPage() {
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
              'radial-gradient(ellipse 60% 50% at 20% 70%, rgba(232,98,42,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <AnimatedSection style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <div style={{ marginBottom: 32 }}>
            <span style={{
              fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 11, color: '#E8622A',
              letterSpacing: '0.22em', textTransform: 'uppercase',
            }}>
              About — Who We Are
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(44px, 6vw, 80px)', color: '#F0EBE3',
            lineHeight: 1.04, letterSpacing: '-0.025em', margin: '0 0 24px',
          }}>
            We Build EdTech.
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 17, color: '#7A7268',
            lineHeight: 1.75, maxWidth: 520, margin: 0,
          }}>
            A creative EdTech agency based in Karachi, Pakistan. We build technology
            that makes education better.
          </p>
        </AnimatedSection>
      </section>

      {/* ── About grid ── */}
      <section
        style={{
          backgroundColor: '#080808',
          padding: '80px 5%',
          borderTop: '1px solid #2A2520',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'start',
          }}
          className="grid-cols-1 md:grid-cols-2"
        >
          {/* Left: text */}
          <AnimatedSection direction="left">
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 32,
              color: '#F0EBE3', margin: '0 0 28px', lineHeight: 1.15, letterSpacing: '-0.015em',
            }}>
              Building the future of education in Pakistan and beyond.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                'Cubico Technologies is a Karachi-based EdTech agency specialising in digital solutions for educational institutions. From Moodle LMS setups to 2D/3D animations, school management systems to e-learning content — we deliver end-to-end solutions that help institutions teach better.',
                'We serve conventional schools, Islamic institutions, madrassas, universities, coaching centres, and corporate training programs. Everything we build supports English, Urdu, and Arabic — including full RTL layout support.',
                'Our team combines technical expertise with a deep understanding of how education works in Pakistan and the wider Muslim world. We don\u2019t just deliver software — we deliver solutions that fit your institution\u2019s culture, language, and goals.',
              ].map((para, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-body)', fontSize: 15, color: '#7A7268',
                  lineHeight: 1.8, margin: 0,
                }}>
                  {para}
                </p>
              ))}
            </div>
            <Link
              href="/contact"
              style={{
                fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 13,
                color: '#F0EBE3', textDecoration: 'none', backgroundColor: '#E8622A',
                padding: '14px 32px', display: 'inline-block', marginTop: 36,
                letterSpacing: '0.02em', transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.backgroundColor = '#C4531F')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.backgroundColor = '#E8622A')}
            >
              Start a Conversation →
            </Link>
          </AnimatedSection>

          {/* Right: stats grid */}
          <AnimatedSection direction="right" delay={0.15}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
              {stats.map(({ value, label }) => (
                <div
                  key={label}
                  style={{
                    backgroundColor: '#191919',
                    border: '1px solid #2A2520',
                    padding: '36px 28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-accent)', fontSize: 56,
                    color: '#F0EBE3', lineHeight: 1,
                  }}>
                    {value}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: 12,
                    color: '#7A7268', textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                  }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Values section ── */}
      <section style={{ backgroundColor: '#080808', padding: '80px 5% 100px', borderTop: '1px solid #2A2520' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <AnimatedSection style={{ marginBottom: 56 }}>
            <span style={{
              fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 11, color: '#E8622A',
              letterSpacing: '0.22em', textTransform: 'uppercase',
            }}>
              Our Values
            </span>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 700,
              fontSize: 'clamp(28px, 3.5vw, 44px)', color: '#F0EBE3',
              letterSpacing: '-0.02em', lineHeight: 1.1, margin: '16px 0 0',
            }}>
              What drives us.
            </h2>
          </AnimatedSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 1 }}>
            {values.map(({ number, title, description }, i) => (
              <AnimatedSection key={title} delay={i * 0.08}>
                <div style={{
                  backgroundColor: '#191919', border: '1px solid #2A2520',
                  padding: '36px 28px', height: '100%', display: 'flex', flexDirection: 'column', gap: 16,
                }}>
                  <div style={{
                    fontFamily: 'var(--font-accent)', fontSize: 40,
                    color: '#C9A96E', opacity: 0.5, lineHeight: 1,
                  }}>
                    {number}
                  </div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18,
                    color: '#F0EBE3', margin: 0, lineHeight: 1.2,
                  }}>
                    {title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 14,
                    color: '#7A7268', lineHeight: 1.75, margin: 0,
                  }}>
                    {description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
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
        <AnimatedSection style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(36px, 4.5vw, 60px)', color: '#1A1714',
            letterSpacing: '-0.025em', lineHeight: 1.05, margin: '0 0 20px',
          }}>
            Let&apos;s build something together.
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 17, color: '#5A5250',
            lineHeight: 1.7, margin: '0 0 40px',
          }}>
            Get in touch and we&apos;ll discuss how we can help your institution.
          </p>
          <Link
            href="/contact"
            data-cursor="cta"
            style={{
              fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 15,
              color: '#F0EBE3', textDecoration: 'none', backgroundColor: '#E8622A',
              padding: '18px 48px', display: 'inline-block',
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
            Start a Conversation →
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
