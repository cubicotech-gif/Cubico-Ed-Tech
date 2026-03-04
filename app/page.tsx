import type { Metadata } from 'next';
import Hero             from '@/components/home/Hero';
import WhatWeDo         from '@/components/home/WhatWeDo';
import Services         from '@/components/home/Services';
import ExperienceLab    from '@/components/home/ExperienceLab';
import RecentWork       from '@/components/home/RecentWork';
import HowWeWork        from '@/components/home/HowWeWork';
import WhoWeServe       from '@/components/home/WhoWeServe';
import CredibilityTrust from '@/components/home/CredibilityTrust';
import FinalCTA         from '@/components/home/FinalCTA';

export const metadata: Metadata = {
  title: 'Cubico Technologies — EdTech Agency',
  description:
    'Karachi-based EdTech agency. Moodle LMS setups, 2D/3D animations, digital solutions, and multilingual educational content.',
};

export default function HomePage() {
  return (
    <>
      {/* 01 — Hero: Preloader + Dashboard ───────────────────────────────── */}
      <Hero />

      {/* 02 — What We Do: Before/After Split Screen ────────────────────── */}
      <WhatWeDo />

      {/* 04 — Experience Lab: Live Interactive Systems ───────────────────── */}
      <ExperienceLab />

      {/* 05 — Services: The Prescription Cards ──────────────────────────── */}
      <Services />

      {/* 05 — Recent Work: The Evidence Wall ────────────────────────────── */}
      <RecentWork />

      {/* 06 — How We Work: Your 30 Days, Mapped ─────────────────────────── */}
      <HowWeWork />

      {/* 07 — Who We Serve: Your Institution, By Name ───────────────────── */}
      <WhoWeServe />

      {/* 08 — Credibility & Trust ─────────────────────────────────────────── */}
      <CredibilityTrust />

      {/* 09 — Final CTA: The Open Door ──────────────────────────────────── */}
      <FinalCTA />
    </>
  );
}
