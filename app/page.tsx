import type { Metadata } from 'next';
import HeroSection        from '@/components/home/HeroSection';
import TrustMarquee       from '@/components/home/TrustMarquee';
import ImpactNumbers      from '@/components/home/ImpactNumbers';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PillarsSection     from '@/components/home/PillarsSection';
import ProcessSection     from '@/components/home/ProcessSection';
import WhyCubicoSection   from '@/components/home/WhyCubicoSection';
import InstitutionTypes   from '@/components/home/InstitutionTypes';
import FAQSection         from '@/components/home/FAQSection';
import CTASection         from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Cubico Technologies | EdTech Solutions for Educational Institutions',
  description:
    'Transform your school with management systems, animated lessons, game-based learning, and digital infrastructure. Serving institutions in Pakistan, Saudi Arabia, and beyond. English, Arabic, Urdu.',
  keywords: [
    'edtech solutions', 'school management software', 'educational animation',
    'game-based learning', 'Moodle setup', 'digital transformation schools',
    'Islamic education technology', 'Arabic educational content',
  ],
  openGraph: {
    title: 'Cubico Technologies — From Chalk-and-Board to World-Class',
    description:
      'Complete EdTech solutions for schools: management, animated content, game-based learning, and digital transformation. One partner, every solution.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Cubico Technologies',
  },
};

export default function HomePage() {
  return (
    <>
      {/* 01 — Hero with dashboard mockup */}
      <HeroSection />

      {/* 02 — Trust marquee strip */}
      <TrustMarquee />

      {/* 03 — Impact numbers */}
      <ImpactNumbers />

      {/* 04 — Testimonials */}
      <TestimonialsSection />

      {/* 05 — Four Pillars / Solutions */}
      <PillarsSection />

      {/* 06 — How we work / Process */}
      <ProcessSection />

      {/* 07 — Why Cubico differentiators */}
      <WhyCubicoSection />

      {/* 08 — Institution types */}
      <InstitutionTypes />

      {/* 09 — FAQ */}
      <FAQSection />

      {/* 10 — Final CTA */}
      <CTASection />
    </>
  );
}
