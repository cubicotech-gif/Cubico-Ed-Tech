import type { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Cubico Technologies is a Karachi-based EdTech agency serving educational institutions with LMS, animations, apps, and multilingual content.',
};

const stats = [
  { value: '50+', label: 'Projects Delivered', icon: '🚀' },
  { value: '3', label: 'Languages Supported', icon: '🌐' },
  { value: '5+', label: 'Years Experience', icon: '📅' },
  { value: '100%', label: 'Custom Solutions', icon: '✅' },
];

const values = [
  {
    icon: '🎯',
    title: 'Education First',
    description:
      'Every decision we make is grounded in what\u2019s best for learners and institutions \u2014 not just what\u2019s technically impressive.',
  },
  {
    icon: '🔧',
    title: 'Custom to Premade',
    description:
      'We offer both fully custom solutions and fast, cost-effective ready-made setups. You choose what fits your budget and timeline.',
  },
  {
    icon: '🌍',
    title: 'Multilingual by Default',
    description:
      'English, Urdu, and Arabic support \u2014 including right-to-left layouts \u2014 is built into everything we create.',
  },
  {
    icon: '🤝',
    title: 'Long-Term Partnership',
    description:
      "We don\u2019t disappear after launch. We train your team, provide ongoing support, and grow with your institution.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Page hero ── */}
      <section className="relative pt-32 pb-16 px-5 md:px-8 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.08) 0%, transparent 65%)',
          }}
        />
        <AnimatedSection className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-card-bg border border-border text-muted text-xs font-syne font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            Who We Are
          </div>
          <h1 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            About <span className="gradient-text">Cubico</span>
          </h1>
          <p className="text-muted font-dm text-base md:text-lg leading-relaxed">
            A creative EdTech agency based in Karachi, Pakistan. We build technology that makes
            education better.
          </p>
        </AnimatedSection>
      </section>

      {/* ── About grid ── */}
      <section className="py-16 px-5 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <AnimatedSection direction="left">
            <h2 className="font-syne font-extrabold text-2xl md:text-3xl text-white mb-6 leading-tight">
              We build EdTech that <span className="gradient-text">actually works.</span>
            </h2>
            <div className="space-y-4 text-muted font-dm leading-relaxed">
              <p>
                Cubico Technologies is a Karachi-based EdTech agency specialising in digital
                solutions for educational institutions. From Moodle LMS setups to 2D/3D animations,
                school management systems to e-learning content — we deliver end-to-end solutions
                that help institutions teach better.
              </p>
              <p>
                We serve conventional schools, Islamic institutions, madrassas, universities,
                coaching centres, and corporate training programs. Everything we build supports
                English, Urdu, and Arabic — including full RTL layout support.
              </p>
              <p>
                Our team combines technical expertise with a deep understanding of how education
                works in Pakistan and the wider Muslim world. We don&apos;t just deliver software —
                we deliver solutions that fit your institution&apos;s culture, language, and goals.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-8 bg-accent hover:bg-accent/90 text-white font-syne font-semibold text-sm px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-accent/20"
            >
              Start a Conversation →
            </Link>
          </AnimatedSection>

          {/* Right: stats grid */}
          <AnimatedSection direction="right" delay={0.15}>
            <div className="grid grid-cols-2 gap-4">
              {stats.map(({ value, label, icon }) => (
                <div
                  key={label}
                  className="bg-card-bg border border-border rounded-2xl p-6 flex flex-col gap-3 hover:border-border/60 transition-colors"
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

      {/* ── Values section ── */}
      <section className="py-24 px-5 md:px-8 bg-card-bg/40 border-y border-border">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-card-bg border border-border text-muted text-xs font-syne font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
              Our Values
            </div>
            <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-white">
              What drives us
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon, title, description }, i) => (
              <AnimatedSection key={title} delay={i * 0.1}>
                <div className="bg-card-bg border border-border rounded-2xl p-6 h-full flex flex-col gap-4 hover:border-border/60 transition-colors">
                  <div className="text-3xl">{icon}</div>
                  <h3 className="font-syne font-bold text-white text-lg">{title}</h3>
                  <p className="text-muted font-dm text-sm leading-relaxed">{description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="py-24 px-5 md:px-8">
        <AnimatedSection className="max-w-3xl mx-auto bg-card-bg border border-border rounded-2xl p-10 md:p-14 text-center">
          <h2 className="font-syne font-extrabold text-2xl md:text-3xl text-white mb-3">
            Let&apos;s build something together.
          </h2>
          <p className="text-muted font-dm mb-8 leading-relaxed">
            Get in touch and we&apos;ll discuss how we can help your institution.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-syne font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5"
          >
            Start a Conversation →
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
