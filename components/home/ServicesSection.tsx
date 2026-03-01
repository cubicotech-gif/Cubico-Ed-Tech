'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const SERVICES = [
  {
    num: '01',
    title: 'Moodle LMS Setup',
    description:
      'Enterprise-grade Moodle deployments with custom Arabic and Urdu RTL theming, BigBlueButton live classes, advanced plugins, and seamless SCORM integration.',
    tags: ['Custom Theme', 'RTL Support', 'BigBlueButton', 'SCORM/H5P'],
    // TODO: Replace gradient with real photography via next/image
    gradient: 'linear-gradient(135deg, #12181F 0%, #0E141A 50%, #111820 100%)',
    glowColor: 'rgba(59,90,130,0.12)',
  },
  {
    num: '02',
    title: 'Educational Animations',
    description:
      'Professional 2D and 3D animations, whiteboard explainers, and motion graphics for any subject, grade level, or language — SCORM-packaged and LMS-ready.',
    tags: ['2D / 3D', 'Urdu Voice-Over', 'SCORM Pack', 'Motion Graphics'],
    gradient: 'linear-gradient(135deg, #1C1610 0%, #17130E 50%, #1A1410 100%)',
    glowColor: 'rgba(201,169,110,0.10)',
  },
  {
    num: '03',
    title: 'Digital Solutions & Apps',
    description:
      'Custom school ERPs, student management systems, fee portals, and mobile apps — built for Pakistani institutions with WhatsApp automation and JazzCash integration.',
    tags: ['School ERP', 'Mobile App', 'WhatsApp API', 'JazzCash'],
    gradient: 'linear-gradient(135deg, #15111C 0%, #110E18 50%, #141020 100%)',
    glowColor: 'rgba(100,60,160,0.08)',
  },
  {
    num: '04',
    title: 'Educational Content Creation',
    description:
      'Curriculum design, interactive SCORM e-learning modules, H5P assessments, and multilingual e-books aligned to Cambridge, Matric, or custom boards.',
    tags: ['SCORM / H5P', 'Curriculum Design', 'Cambridge · Matric', 'Multilingual'],
    gradient: 'linear-gradient(135deg, #141414 0%, #111111 50%, #131313 100%)',
    glowColor: 'rgba(232,98,42,0.07)',
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-void py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">

        {/* Section counter + label */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-accent text-[14px] text-bronze tracking-[0.1em]">02</span>
          <span className="font-ui text-[11px] text-warm-gray tracking-[0.22em] uppercase">
            What We Build
          </span>
        </div>

        {/* Two-column layout: sticky heading left, card stack right */}
        <div className="md:grid md:grid-cols-[2fr_3fr] md:gap-20 items-start">

          {/* LEFT — sticky heading */}
          <div className="md:sticky md:top-[88px] mb-14 md:mb-0">
            <h2 className="font-display font-bold text-[clamp(36px,4vw,54px)] text-ivory leading-[1.08]">
              Complete Solutions.
              <br />
              Any Institution.
              <br />
              Any Language.
            </h2>
            <p className="font-body text-[15px] text-warm-gray leading-relaxed mt-6 max-w-[300px]">
              Four core disciplines. One agency. Delivered with precision.
            </p>
            <Link
              href="/services"
              className="inline-block font-ui font-medium text-[13px] text-fire mt-8 hover:underline tracking-wide"
            >
              View All Services →
            </Link>
          </div>

          {/* RIGHT — card stack */}
          <div className="flex flex-col">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: 'easeOut' }}
                className="group flex border-t border-rule hover:border-fire transition-colors duration-300 overflow-hidden"
              >
                {/* Left: content */}
                <div className="flex-[3] py-10 pr-6">
                  {/* Decorative number */}
                  <div className="font-accent text-[72px] leading-none text-rule/40 mb-5 select-none">
                    {service.num}
                  </div>

                  <h3 className="font-display font-semibold text-[26px] text-ivory mb-3 leading-snug">
                    {service.title}
                  </h3>

                  <p className="font-body text-[15px] text-warm-gray leading-[1.72] mb-6">
                    {service.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-ui text-[11px] text-warm-gray/80 border border-rule px-3 py-1 tracking-[0.05em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/services"
                    className="font-ui font-medium text-[14px] text-fire hover:underline tracking-wide"
                  >
                    Learn More →
                  </Link>
                </div>

                {/* Right: image panel — TODO: Replace with real photography */}
                <div
                  className="hidden md:block flex-[2] relative overflow-hidden min-h-[240px]"
                >
                  <div
                    className="absolute inset-0 transition-all duration-500 group-hover:brightness-110"
                    style={{ background: service.gradient }}
                  />
                  {/* Subtle glow overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${service.glowColor} 0%, transparent 70%)`,
                    }}
                  />
                  {/* Decorative service number watermark */}
                  <div className="absolute bottom-4 right-5 font-accent text-[80px] text-ivory/5 leading-none select-none">
                    {service.num}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Final rule line */}
            <div className="border-t border-rule" />
          </div>
        </div>
      </div>
    </section>
  );
}
