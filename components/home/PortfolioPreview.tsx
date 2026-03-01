'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const PROJECTS = [
  {
    title: 'Al-Noor Academy — Moodle LMS',
    category: 'LMS',
    description:
      'Full Moodle deployment with Arabic RTL theme, BigBlueButton live classes, and a custom student portal.',
    tags: ['Moodle 4.x', 'Arabic RTL', 'BBB', 'Custom Plugin'],
    gradient: 'linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(6,214,160,0.18) 100%)',
    accentColor: '#3b82f6',
    icon: '🎓',
  },
  {
    title: 'Grade 5 Science — 2D Animation Series',
    category: 'Animation',
    description:
      'A 12-episode SCORM-packaged animation series with Urdu voice-overs covering the solar system, ecosystems, and the human body.',
    tags: ['2D Animation', 'SCORM', 'Urdu VO', 'H5P Quizzes'],
    gradient: 'linear-gradient(135deg, rgba(6,214,160,0.35) 0%, rgba(59,130,246,0.18) 100%)',
    accentColor: '#06d6a0',
    icon: '🎬',
  },
  {
    title: 'CampusCore — School ERP',
    category: 'Apps',
    description:
      'Comprehensive ERP covering fees, attendance, HR, accounts, and WhatsApp-automated parent communication.',
    tags: ['Custom ERP', 'WhatsApp API', 'JazzCash', 'Mobile App'],
    gradient: 'linear-gradient(135deg, rgba(168,85,247,0.35) 0%, rgba(249,115,22,0.18) 100%)',
    accentColor: '#a855f7',
    icon: '💻',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function PortfolioPreview() {
  return (
    <section className="py-24 px-5 md:px-8 bg-surface/50 border-y border-border">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-card-bg border border-border text-muted text-xs font-syne font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
            Our Work
          </div>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            Recent{' '}
            <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted font-dm mt-4 max-w-md mx-auto leading-relaxed">
            A sample of EdTech projects delivered across Pakistan.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="group relative bg-card-bg border border-border rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Thumbnail */}
              <div
                className="relative aspect-video flex items-center justify-center overflow-hidden"
                style={{ background: project.gradient }}
              >
                <span className="text-5xl opacity-60">{project.icon}</span>
                {/* Category badge */}
                <span
                  className="absolute top-3 left-3 text-[10px] font-syne font-bold px-2.5 py-1 rounded-full backdrop-blur"
                  style={{
                    background: `${project.accentColor}28`,
                    border: `1px solid ${project.accentColor}50`,
                    color: project.accentColor,
                  }}
                >
                  {project.category}
                </span>

                {/* Hover overlay — slides up from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out flex items-end p-4">
                  <Link
                    href="/portfolio"
                    className="flex items-center gap-1.5 font-syne font-bold text-sm text-white"
                    style={{ color: project.accentColor }}
                  >
                    View Project →
                  </Link>
                </div>
              </div>

              {/* Body */}
              <div className="p-5">
                <h3 className="font-syne font-bold text-white text-base leading-snug mb-2">
                  {project.title}
                </h3>
                <p className="text-muted font-dm text-sm leading-relaxed mb-4">
                  {project.description}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.68rem] font-syne font-semibold text-muted bg-background border border-border px-2 py-0.5 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all CTA */}
        <div className="text-center mt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 bg-card-bg border border-border hover:border-accent/40 text-text font-syne font-semibold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 hover:text-white hover:-translate-y-0.5"
          >
            View Full Portfolio →
          </Link>
        </div>
      </div>
    </section>
  );
}
