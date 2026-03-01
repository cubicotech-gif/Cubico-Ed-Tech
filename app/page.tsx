import type { Metadata } from 'next';
import HeroSection from '@/components/HeroSection';
import ServiceCard from '@/components/ServiceCard';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cubico Technologies — EdTech Agency',
  description:
    'Karachi-based EdTech agency. Moodle LMS setups, 2D/3D animations, digital solutions, and multilingual educational content.',
};

const services = [
  {
    icon: '🎓',
    title: 'Moodle LMS Setup',
    description:
      'From basic installation to full enterprise deployment with custom branding, plugins, and RTL support for Arabic and Urdu.',
    accent: 'blue' as const,
  },
  {
    icon: '🎬',
    title: 'Educational Animations',
    description:
      'Professional 2D/3D animations, whiteboard videos, and motion graphics for every subject and grade level.',
    accent: 'green' as const,
  },
  {
    icon: '💻',
    title: 'Digital Solutions & Apps',
    description:
      'Custom school management systems, ERPs, and mobile apps for students, teachers, and parents.',
    accent: 'purple' as const,
  },
  {
    icon: '📚',
    title: 'Educational Content',
    description:
      'Curriculum design, e-books, SCORM modules, and interactive assessments aligned to any board.',
    accent: 'orange' as const,
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Services ── */}
      <section className="py-24 px-5 md:px-8 max-w-7xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-card-bg border border-border text-muted text-xs font-syne font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            What We Do
          </div>
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            End-to-End{' '}
            <span className="gradient-text">EdTech Solutions</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto mt-4 font-dm leading-relaxed">
            Whether you need a complete LMS, custom animations, a management system, or learning
            content — we deliver it in English, Urdu, and Arabic.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} {...service} delay={i * 0.1} />
          ))}
        </div>

        <AnimatedSection delay={0.4} className="mt-10 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-card-bg border border-border hover:border-accent/40 text-text font-syne font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:text-white"
          >
            View All Services →
          </Link>
        </AnimatedSection>
      </section>

      {/* ── Why Cubico ── */}
      <section className="py-24 px-5 md:px-8 bg-card-bg/40 border-y border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <AnimatedSection direction="left">
            <div className="inline-flex items-center gap-2 bg-card-bg border border-border text-muted text-xs font-syne font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
              Why Cubico
            </div>
            <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-white leading-tight mb-5">
              We build EdTech that{' '}
              <span className="gradient-text">actually works</span>.
            </h2>
            <p className="text-muted font-dm leading-relaxed mb-4">
              We combine technical expertise with a deep understanding of how education works in
              Pakistan and the wider Muslim world. We don&apos;t just deliver software — we deliver
              solutions that fit your institution&apos;s culture, language, and goals.
            </p>
            <p className="text-muted font-dm leading-relaxed">
              Serving conventional schools, Islamic institutions, madrassas, universities, coaching
              centres, and corporate training programs — all with full English, Urdu, and Arabic RTL
              support.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 mt-8 text-accent font-syne font-semibold text-sm hover:text-accent/80 transition-colors"
            >
              Learn more about us →
            </Link>
          </AnimatedSection>

          {/* Stats grid */}
          <AnimatedSection direction="right" delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '50+', label: 'Projects Delivered', icon: '🚀' },
                { value: '3', label: 'Languages Supported', icon: '🌐' },
                { value: '5+', label: 'Years Experience', icon: '📅' },
                { value: '100%', label: 'Custom Solutions', icon: '✅' },
              ].map(({ value, label, icon }) => (
                <div
                  key={label}
                  className="bg-card-bg border border-border rounded-2xl p-6 flex flex-col gap-2"
                >
                  <div className="text-2xl">{icon}</div>
                  <div className="font-syne font-extrabold text-3xl gradient-text">{value}</div>
                  <div className="text-muted text-sm font-dm">{label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="py-24 px-5 md:px-8">
        <AnimatedSection className="max-w-3xl mx-auto text-center">
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-white mb-4">
            Ready to transform your institution?
          </h2>
          <p className="text-muted font-dm mb-8 leading-relaxed">
            Tell us about your project and we&apos;ll send you a clear proposal within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="bg-accent hover:bg-accent/90 text-white font-syne font-semibold text-sm px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5"
            >
              Request a Proposal →
            </Link>
            <Link
              href="/portfolio"
              className="bg-card-bg border border-border text-text font-syne font-semibold text-sm px-8 py-4 rounded-xl transition-all duration-200 hover:border-border/60 hover:-translate-y-0.5"
            >
              See Our Work
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
