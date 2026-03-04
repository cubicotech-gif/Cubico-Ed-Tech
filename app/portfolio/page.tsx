import type { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import PortfolioGrid from '@/components/PortfolioGrid';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'See our work — Moodle LMS deployments, educational animations, custom apps, and e-learning content created for institutions across Pakistan.',
};

export default function PortfolioPage() {
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
              'radial-gradient(ellipse 60% 50% at 70% 40%, rgba(232,98,42,0.07) 0%, transparent 70%)',
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
              Portfolio — Our Work
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
            Selected Work.
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
            LMS deployments, animations, management systems, and learning content —
            built for institutions in English, Urdu, and Arabic.
          </p>
        </AnimatedSection>
      </section>

      {/* ── Portfolio grid ── */}
      <section
        style={{
          backgroundColor: '#080808',
          padding: '0 5% 120px',
          borderTop: '1px solid #2A2520',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', paddingTop: 60 }}>
          <PortfolioGrid />
        </div>
      </section>
    </>
  );
}
