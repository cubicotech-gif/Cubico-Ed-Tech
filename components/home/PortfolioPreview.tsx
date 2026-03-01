'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const PROJECTS = [
  {
    title: 'Al-Noor Academy — Moodle LMS',
    category: 'LMS DEPLOYMENT',
    description: 'Full Moodle 4.x with Arabic RTL theme, BBB live classes, and custom student portal for an Islamic school.',
    tags: ['Moodle 4.x', 'Arabic RTL', 'BigBlueButton'],
    // TODO: Replace with real project photography via next/image
    gradient: 'linear-gradient(160deg, #1A1410 0%, #0E0A08 60%, #1C1510 100%)',
    warmGlow: 'rgba(201,169,110,0.12)',
    accentColor: '#C9A96E',
  },
  {
    title: 'Grade 5 Science — 2D Animation Series',
    category: 'ANIMATION',
    description: '12-episode SCORM-packaged animation series with Urdu voice-overs: solar system, ecosystems, human body.',
    tags: ['2D Animation', 'SCORM', 'Urdu VO'],
    gradient: 'linear-gradient(160deg, #181210 0%, #0E0A08 60%, #1A1412 100%)',
    warmGlow: 'rgba(232,98,42,0.10)',
    accentColor: '#E8622A',
  },
  {
    title: 'CampusCore — School ERP',
    category: 'DIGITAL SOLUTION',
    description: 'Comprehensive ERP: fees, attendance, HR, accounts, and WhatsApp-automated parent communication.',
    tags: ['Custom ERP', 'WhatsApp API', 'Mobile App'],
    gradient: 'linear-gradient(160deg, #141418 0%, #0E0E12 60%, #141416 100%)',
    warmGlow: 'rgba(180,140,210,0.08)',
    accentColor: '#C9A96E',
  },
];

export default function PortfolioPreview() {
  return (
    <section className="bg-void py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Section counter + label */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <span className="font-accent text-[14px] text-bronze tracking-[0.1em]">03</span>
            <span className="font-ui text-[11px] text-warm-gray tracking-[0.22em] uppercase">
              Recent Work
            </span>
          </div>
          <Link
            href="/portfolio"
            className="hidden md:block font-ui font-medium text-[13px] text-fire hover:underline tracking-wide"
          >
            View All Work →
          </Link>
        </div>

        {/* Horizontal scroll on desktop, vertical on mobile */}
        <div className="flex flex-col md:flex-row gap-5 md:overflow-x-auto no-scrollbar md:snap-x md:snap-mandatory md:pb-4">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: 'easeOut' }}
              className="group relative flex-shrink-0 w-full md:w-[420px] md:snap-start overflow-hidden"
            >
              {/* Top: image area */}
              <div
                className="relative w-full h-[270px] md:h-[340px] overflow-hidden"
                style={{ background: project.gradient }}
              >
                {/* TODO: Replace with real photography using next/image */}
                {/* Warm glow overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 70% 60% at 50% 40%, ${project.warmGlow} 0%, transparent 70%)`,
                  }}
                />
                {/* Bottom fade into card bg */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent" />

                {/* "View Case" label — appears on hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                  <span
                    className="font-ui font-semibold text-[11px] text-ivory tracking-[0.12em] px-3 py-1.5"
                    style={{ backgroundColor: project.accentColor }}
                  >
                    VIEW CASE
                  </span>
                </div>

                {/* Category */}
                <div className="absolute bottom-4 left-5">
                  <span
                    className="font-accent text-[13px] tracking-[0.14em]"
                    style={{ color: project.accentColor }}
                  >
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Bottom: info */}
              <div className="bg-card p-5 pt-4">
                <h3 className="font-display font-semibold text-[21px] text-ivory leading-snug mb-2">
                  {project.title}
                </h3>
                <p className="font-body text-[14px] text-warm-gray leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-ui text-[11px] text-warm-gray/70 border border-rule px-2.5 py-0.5 tracking-[0.04em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 md:hidden">
          <Link
            href="/portfolio"
            className="font-ui font-medium text-[14px] text-fire hover:underline"
          >
            View All Work →
          </Link>
        </div>
      </div>
    </section>
  );
}
