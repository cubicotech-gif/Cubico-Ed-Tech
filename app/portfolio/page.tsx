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
      <section className="relative pt-32 pb-16 px-5 md:px-8 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(6,214,160,0.08) 0%, transparent 65%)',
          }}
        />
        <AnimatedSection className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-card-bg border border-border text-muted text-xs font-syne font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
            Our Work
          </div>
          <h1 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-muted font-dm text-base md:text-lg leading-relaxed">
            A selection of EdTech projects we&apos;ve delivered — LMS deployments, animations,
            management systems, and learning content.
          </p>
        </AnimatedSection>
      </section>

      {/* ── Portfolio grid with filters ── */}
      <section className="pb-24 px-5 md:px-8 max-w-7xl mx-auto">
        <PortfolioGrid />
      </section>
    </>
  );
}
