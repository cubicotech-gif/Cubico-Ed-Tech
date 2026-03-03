import type { Metadata } from 'next';
import HeroSection        from '@/components/home/HeroSection';
import MarqueeStrip       from '@/components/home/MarqueeStrip';
import ServicesReveal     from '@/components/home/ServicesReveal';
import ServicesCards      from '@/components/home/ServicesCards';
import RecentWork         from '@/components/home/RecentWork';
import HowWeWork          from '@/components/home/HowWeWork';
import WhoWeServe         from '@/components/home/WhoWeServe';
import CredibilityTrust   from '@/components/home/CredibilityTrust';
import FinalCTA           from '@/components/home/FinalCTA';

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

      {/* 02 — The Living Services List */}
      <ServicesReveal />

      {/* 03 — Services cards */}
      <ServicesCards />

      {/* 05 — Recent Work: The Evidence Wall ────────────────────────────── */}
      <RecentWork />

      {/* 06 — How We Work: Your 30 Days, Mapped ─────────────────────────── */}
      <HowWeWork />

      {/* 07 — Who We Serve: Your Institution, By Name ───────────────────── */}
      <WhoWeServe />

      {/* 08 — Credibility & Trust: The Silence Before the Ask ───────────── */}
      <CredibilityTrust />

      {/* 09 — Final CTA: The Open Door ──────────────────────────────────── */}
      <FinalCTA />
    </>
  );
}
