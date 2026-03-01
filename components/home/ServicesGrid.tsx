'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const SERVICES = [
  {
    icon: '🎓',
    title: 'Moodle LMS Setup',
    description:
      'Enterprise-grade Moodle deployments with custom branding, RTL support for Urdu & Arabic, BigBlueButton integration, and full plugin configuration.',
    tags: ['Custom Theme', 'RTL Support', 'BBB Integration', 'SCORM'],
    href: '/services',
    accent: '#3b82f6',
    glow: 'rgba(59,130,246,0.18)',
    border: 'rgba(59,130,246,0.25)',
    span: 'lg:col-span-2',
  },
  {
    icon: '🎬',
    title: 'Educational Animations',
    description:
      '2D/3D animations, whiteboard videos, and motion graphics for any subject and grade.',
    tags: ['2D/3D', 'Urdu VO', 'SCORM Pack'],
    href: '/services',
    accent: '#06d6a0',
    glow: 'rgba(6,214,160,0.18)',
    border: 'rgba(6,214,160,0.25)',
    span: 'lg:col-span-1',
  },
  {
    icon: '💻',
    title: 'Digital Solutions & Apps',
    description:
      'Custom school ERPs, management systems, and mobile apps for students, teachers, and parents.',
    tags: ['School ERP', 'Mobile App', 'WhatsApp API'],
    href: '/services',
    accent: '#a855f7',
    glow: 'rgba(168,85,247,0.18)',
    border: 'rgba(168,85,247,0.25)',
    span: 'lg:col-span-1',
  },
  {
    icon: '📚',
    title: 'Educational Content Creation',
    description:
      'Curriculum design, SCORM e-learning modules, interactive H5P assessments, and multilingual e-books aligned to any board.',
    tags: ['SCORM / H5P', 'Curriculum Design', 'Cambridge / Matric'],
    href: '/services',
    accent: '#f97316',
    glow: 'rgba(249,115,22,0.18)',
    border: 'rgba(249,115,22,0.25)',
    span: 'lg:col-span-2',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function ServicesGrid() {
  return (
    <section className="py-24 px-5 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-card-bg border border-border text-muted text-xs font-syne font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          What We Do
        </div>
        <h2 className="font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
          Everything Your Institution{' '}
          <span className="gradient-text">Needs</span>
        </h2>
        <p className="text-muted font-dm mt-4 max-w-xl mx-auto leading-relaxed">
          One agency. Complete solutions. Any language.
        </p>
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.title}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            whileHover={{ scale: 1.025, transition: { type: 'spring', stiffness: 300, damping: 22 } }}
            className={`group relative bg-card-bg rounded-2xl p-7 border border-border cursor-default transition-colors duration-300 hover:bg-[#1a2030] ${service.span}`}
            style={{
              '--glow': service.glow,
              '--border-hover': service.border,
            } as React.CSSProperties}
          >
            {/* Hover glow border */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ boxShadow: `inset 0 0 0 1px ${service.border}, 0 0 40px ${service.glow}` }}
            />

            {/* Icon */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5 transition-transform duration-300 group-hover:scale-105"
              style={{ background: `${service.glow}`, border: `1px solid ${service.border}` }}
            >
              {service.icon}
            </div>

            {/* Title */}
            <h3 className="font-syne font-bold text-lg text-white mb-2">{service.title}</h3>

            {/* Description */}
            <p className="text-muted font-dm text-sm leading-relaxed mb-5">{service.description}</p>

            {/* Tag pills */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[0.7rem] font-syne font-semibold px-2.5 py-1 rounded-full border"
                  style={{
                    color: service.accent,
                    borderColor: service.border,
                    background: service.glow,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Link */}
            <Link
              href={service.href}
              className="text-sm font-syne font-semibold transition-colors duration-200"
              style={{ color: service.accent }}
            >
              Learn More →
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
