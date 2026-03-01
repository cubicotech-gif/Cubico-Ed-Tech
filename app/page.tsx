import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import MarqueeSection from '@/components/home/MarqueeSection';
import ServicesSection from '@/components/home/ServicesSection';
import PortfolioPreview from '@/components/home/PortfolioPreview';
import ProcessSection from '@/components/home/ProcessSection';
import ImpactNumbers from '@/components/home/ImpactNumbers';
import LanguagesSection from '@/components/home/LanguagesSection';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: "Cubico Technologies — Pakistan's Premier EdTech Agency",
  description:
    'Karachi-based EdTech agency delivering Moodle LMS, educational animations, school ERPs, and multilingual content in English, Urdu & Arabic.',
};

export default function HomePage() {
  return (
    <>
      {/* 1 — Cinematic hero, 3-line headline, stats row */}
      <HeroSection />

      {/* 2 — Infinite marquee of services */}
      <MarqueeSection />

      {/* 3 — Services bento, sticky left heading, 4 sharp cards */}
      <ServicesSection />

      {/* 4 — Recent work, horizontal scroll cards */}
      <PortfolioPreview />

      {/* 5 — CREAM: Process steps 2×2 grid */}
      <ProcessSection />

      {/* 6 — Impact numbers, CountUp, Fraunces quote */}
      <ImpactNumbers />

      {/* 7 — Languages: English / Urdu / Arabic with RTL */}
      <LanguagesSection />

      {/* 8 — CREAM: Final CTA, fire button */}
      <CTASection />
    </>
  );
}
