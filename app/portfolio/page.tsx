import type { Metadata } from 'next';
import PortfolioGrid from '@/components/PortfolioGrid';

export const metadata: Metadata = {
  title: 'Portfolio — Cubico Technologies',
  description:
    'See our work — Moodle LMS deployments, educational animations, custom apps, and e-learning content created for institutions across Pakistan.',
};

export default function PortfolioPage() {
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
              'radial-gradient(ellipse 60% 40% at 80% 40%, rgba(201,169,110,0.05) 0%, transparent 70%)',
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
                color: '#C9A96E',
                letterSpacing: '0.1em',
              }}
            >
              PORTFOLIO
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
              OUR WORK
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
              maxWidth: 700,
            }}
          >
            50+ Projects. Every One Custom.
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
            A selection of LMS deployments, educational animations, management systems,
            and learning content — delivered across Pakistan and the wider Muslim world.
          </p>

          {/* Horizontal rule */}
          <div
            style={{
              marginTop: 64,
              height: 1,
              backgroundColor: '#2A2520',
            }}
          />
        </div>
      </section>

      {/* ── Portfolio Grid ────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#080808',
          padding: '64px 5% 120px',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <PortfolioGrid />
        </div>
      </section>

      {/* ── CTA Strip ────────────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: '#F5F2ED',
          padding: '120px 5%',
          textAlign: 'center',
          borderTop: '1px solid #D5CFC8',
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
            Your Project Could Be Next
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
            Let&apos;s Build Together.
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
            Every project in this portfolio started with a conversation. Tell us
            about your institution and we&apos;ll take it from there.
          </p>

          <a
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
          </a>
        </div>
      </section>
    </>
  );
}
