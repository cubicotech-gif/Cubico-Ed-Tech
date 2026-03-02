import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact — Cubico Technologies',
  description:
    "Get in touch with Cubico Technologies. Tell us about your institution and we'll respond within 24 hours.",
};

const STEPS = [
  'We review your requirements carefully',
  'We prepare a tailored proposal',
  'We schedule a free consultation call',
  'We begin building your solution',
];

export default function ContactPage() {
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
              'radial-gradient(ellipse 50% 50% at 50% 0%, rgba(232,98,42,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ marginBottom: 40 }}>
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 14,
                color: '#E8622A',
                letterSpacing: '0.1em',
              }}
            >
              CONTACT
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
              LET&apos;S TALK
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
              maxWidth: 760,
            }}
          >
            Tell Us About Your Institution.
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              color: '#7A7268',
              lineHeight: 1.7,
              maxWidth: 520,
              margin: 0,
            }}
          >
            We respond within 24 hours with a clear plan and honest pricing.
            No generic proposals — every response is specific to you.
          </p>
        </div>
      </section>

      {/* ── Contact Grid ─────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#080808',
          padding: '80px 5% 120px',
          borderTop: '1px solid #2A2520',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '80px',
            alignItems: 'start',
          }}
        >
          {/* Left: form */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 11,
                color: '#7A7268',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: 32,
              }}
            >
              SEND A MESSAGE
            </p>
            <ContactForm />
          </div>

          {/* Right: sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

            {/* Contact details */}
            <div
              style={{
                borderTop: '2px solid #E8622A',
                paddingTop: 28,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  color: '#7A7268',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: 28,
                }}
              >
                CONTACT DETAILS
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { label: 'Email', value: 'info@cubico.tech', href: 'mailto:info@cubico.tech' },
                  { label: 'Location', value: 'Karachi, Pakistan', href: null },
                  { label: 'Languages', value: 'English · اردو · عربي', href: null },
                  { label: 'WhatsApp', value: 'Available', href: null },
                ].map(({ label, value, href }) => (
                  <div key={label}>
                    <p
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 10,
                        color: '#7A7268',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        margin: '0 0 4px',
                      }}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 15,
                          color: '#C9A96E',
                          textDecoration: 'none',
                        }}
                        dir="auto"
                      >
                        {value}
                      </a>
                    ) : (
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 15,
                          color: '#C4BFB8',
                        }}
                        dir="auto"
                      >
                        {value}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Response time */}
            <div
              style={{
                borderTop: '1px solid #2A2520',
                paddingTop: 28,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  color: '#7A7268',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: 12,
                }}
              >
                RESPONSE TIME
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  color: '#7A7268',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                We typically respond within{' '}
                <span style={{ color: '#E8622A' }}>24 hours</span> on business
                days. For urgent projects, mention it in your message.
              </p>
            </div>

            {/* What happens next */}
            <div
              style={{
                borderTop: '1px solid #2A2520',
                paddingTop: 28,
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  color: '#7A7268',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: 20,
                }}
              >
                WHAT HAPPENS NEXT
              </p>
              <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {STEPS.map((step, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      gap: 14,
                      alignItems: 'flex-start',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-accent)',
                        fontSize: 18,
                        color: '#C9A96E',
                        opacity: 0.6,
                        lineHeight: 1,
                        flexShrink: 0,
                        paddingTop: 2,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 14,
                        color: '#7A7268',
                        lineHeight: 1.6,
                      }}
                    >
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
