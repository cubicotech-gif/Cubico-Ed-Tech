import type { Metadata } from 'next';
import HeroSection       from '@/components/home/HeroSection';
import MarqueeStrip      from '@/components/home/MarqueeStrip';
import ServicesReveal    from '@/components/home/ServicesReveal';
import ExperienceLab     from '@/components/home/ExperienceLab';
import ServicesCards     from '@/components/home/ServicesCards';
import PortfolioPreview  from '@/components/home/PortfolioPreview';
import ProcessSection    from '@/components/home/ProcessSection';
import ImpactNumbers     from '@/components/home/ImpactNumbers';
import LanguagesSection  from '@/components/home/LanguagesSection';
import CTASection        from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Cubico Technologies — EdTech Agency',
  description:
    'Karachi-based EdTech agency. Moodle LMS setups, 2D/3D animations, digital solutions, and multilingual educational content.',
};

export default function HomePage() {
  return (
    <>
      {/* 01 — Hero ──────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* Marquee transition strip */}
      <MarqueeStrip />

      {/* 02 — The Living Services List (replaces original marquee section) */}
      <ServicesReveal />

      {/* 03 — Interactive Demo Showcase ─────────────────────────────────── */}
      <ExperienceLab />

      {/* 04 — Services cards ────────────────────────────────────────────── */}
      <ServicesCards />

      {/* 04 — Portfolio preview ─────────────────────────────────────────── */}
      <PortfolioPreview />

      {/* 05 — Process (cream) ───────────────────────────────────────────── */}
      <ProcessSection />

      {/* 06 — Impact numbers ────────────────────────────────────────────── */}
      <ImpactNumbers />

      {/* 07 — Languages ─────────────────────────────────────────────────── */}
      <LanguagesSection />

      {/* 08 — CTA (cream) ───────────────────────────────────────────────── */}
      <CTASection />
    </>
  );
}
