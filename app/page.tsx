import type { Metadata } from 'next';
import HeroSection    from '@/components/home/HeroSection';
import ServicesReveal from '@/components/home/ServicesReveal';
import ExperienceLab  from '@/components/home/ExperienceLab';
import RecentWork     from '@/components/home/RecentWork';
import HowWeWork      from '@/components/home/HowWeWork';
import WhoWeServe     from '@/components/home/WhoWeServe';
import Credibility    from '@/components/home/Credibility';
import FinalCTA       from '@/components/home/FinalCTA';

export const metadata: Metadata = {
  title: 'Cubico Technologies — EdTech Agency',
  description:
    'Karachi-based EdTech agency. Moodle LMS setups, 2D/3D animations, digital solutions, and multilingual educational content.',
};

export default function HomePage() {
  return (
    <>
      {/* 01 — Hero */}
      <HeroSection />

      {/* 02 — What We Build */}
      <ServicesReveal />

      {/* 03 — Interactive Demo */}
      <ExperienceLab />

      {/* 05 — Recent Work (horizontal scroll) */}
      <RecentWork />

      {/* 06 — How We Work (pinned steps) */}
      <HowWeWork />

      {/* 07 — Who We Serve (accordion) */}
      <WhoWeServe />

      {/* 08 — Credibility (numbers + testimonial) */}
      <Credibility />

      {/* 09 — Final CTA */}
      <FinalCTA />
    </>
  );
}
