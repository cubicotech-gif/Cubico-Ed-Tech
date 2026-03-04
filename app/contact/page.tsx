import type { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Get in touch with Cubico Technologies. Tell us about your institution and we'll respond within 24 hours.",
};

const contactDetails = [
  { label: 'Email',     value: 'info@cubico.tech',         href: 'mailto:info@cubico.tech' },
  { label: 'Location',  value: 'Karachi, Pakistan',         href: null },
  { label: 'Website',   value: 'cubico.tech',               href: 'https://cubico.tech' },
  { label: 'Languages', value: 'English · اردو · عربي',     href: null },
];

const nextSteps = [
  'We review your requirements carefully',
  'We prepare a tailored proposal',
  'We schedule a free consultation call',
  'We begin building your solution',
];

export default function ContactPage() {
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
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(232,98,42,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <AnimatedSection style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
          <div style={{ marginBottom: 32 }}>
            <span style={{
              fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 11, color: '#E8622A',
              letterSpacing: '0.22em', textTransform: 'uppercase',
            }}>
              Contact — Let&apos;s Talk
            </span>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(44px, 6vw, 80px)', color: '#F0EBE3',
            lineHeight: 1.04, letterSpacing: '-0.025em', margin: '0 0 24px',
          }}>
            Get In Touch.
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 17, color: '#7A7268',
            lineHeight: 1.75, maxWidth: 520, margin: 0,
          }}>
            Tell us about your institution and what you need. We&apos;ll get back
            to you within 24 hours with a clear plan.
          </p>
        </AnimatedSection>
      </section>

      {/* ── Contact grid ── */}
      <section
        style={{
          backgroundColor: '#080808',
          padding: '0 5% 120px',
          borderTop: '1px solid #2A2520',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            paddingTop: 80,
            display: 'grid',
            gridTemplateColumns: '3fr 2fr',
            gap: 40,
            alignItems: 'start',
          }}
          className="grid-cols-1 lg:grid-cols-[3fr_2fr]"
        >
          {/* Left: form */}
          <AnimatedSection direction="left">
            <div style={{
              backgroundColor: '#191919',
              border: '1px solid #2A2520',
              padding: '48px 44px',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22,
                color: '#F0EBE3', margin: '0 0 32px',
              }}>
                Send us a message
              </h2>
              <ContactForm />
            </div>
          </AnimatedSection>

          {/* Right: details */}
          <AnimatedSection direction="right" delay={0.15}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* Contact details */}
              <div style={{
                backgroundColor: '#191919', border: '1px solid #2A2520', padding: '36px 32px',
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18,
                  color: '#F0EBE3', margin: '0 0 28px',
                }}>
                  Contact Details
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {contactDetails.map(({ label, value, href }) => (
                    <div key={label}>
                      <div style={{
                        fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 10,
                        color: '#6A6460', letterSpacing: '0.18em', textTransform: 'uppercase',
                        marginBottom: 4,
                      }}>
                        {label}
                      </div>
                      {href ? (
                        <a
                          href={href}
                          style={{
                            fontFamily: 'var(--font-body)', fontSize: 14, color: '#9A9490',
                            textDecoration: 'none', transition: 'color 0.2s ease',
                          }}
                          onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#E8622A')}
                          onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#9A9490')}
                          dir="auto"
                        >
                          {value}
                        </a>
                      ) : (
                        <span style={{
                          fontFamily: 'var(--font-body)', fontSize: 14, color: '#9A9490',
                        }} dir="auto">
                          {value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Response time */}
              <div style={{
                backgroundColor: '#191919', border: '1px solid #2A2520', padding: '28px 32px',
                borderLeft: '3px solid #E8622A',
              }}>
                <div style={{
                  fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 13,
                  color: '#F0EBE3', marginBottom: 8,
                }}>
                  Fast Response
                </div>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 13, color: '#7A7268',
                  lineHeight: 1.7, margin: 0,
                }}>
                  We typically respond within 24 hours on business days. For urgent
                  projects, mention it in your message.
                </p>
              </div>

              {/* What happens next */}
              <div style={{
                backgroundColor: '#191919', border: '1px solid #2A2520', padding: '28px 32px',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 10,
                  color: '#6A6460', letterSpacing: '0.18em', textTransform: 'uppercase',
                  margin: '0 0 20px',
                }}>
                  What happens next?
                </h3>
                <ol style={{ display: 'flex', flexDirection: 'column', gap: 14, listStyle: 'none', padding: 0, margin: 0 }}>
                  {nextSteps.map((step, i) => (
                    <li key={i} style={{
                      display: 'flex', alignItems: 'flex-start', gap: 14,
                      fontFamily: 'var(--font-body)', fontSize: 13, color: '#7A7268', lineHeight: 1.6,
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-accent)', fontSize: 14,
                        color: '#E8622A', flexShrink: 0, lineHeight: 1.4,
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
