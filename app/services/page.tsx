import type { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Moodle LMS setup, educational animations, digital apps, and content creation — complete EdTech solutions in English, Urdu, and Arabic.',
};

const services = [
  {
    icon: '🎓',
    title: 'Moodle LMS Setup',
    description:
      'From basic installation to full enterprise-level deployment. We handle hosting, branding, plugins, content migration, and ongoing support.',
    accent: 'blue',
    accentClass: {
      icon: 'bg-accent/10 text-accent border-accent/20',
      border: 'border-accent/20',
    },
    features: [
      'Cloud & on-premise hosting setup',
      'Custom branded themes (your colors, logo, layout)',
      'Plugin integration: BigBlueButton, Zoom, H5P, Attendance, Certificates',
      'Multi-site setup for multi-branch institutions',
      'Arabic / Urdu RTL support',
      'Student, Teacher, Parent, Admin role management',
      'Payment gateway integration',
      'Course migration from Google Classroom, Canvas, Blackboard',
    ],
  },
  {
    icon: '🎬',
    title: 'Educational Animations',
    description:
      'Professional animations for every subject and every grade level. Custom-made to match your curriculum, guidelines, and branding.',
    accent: 'green',
    accentClass: {
      icon: 'bg-accent-green/10 text-accent-green border-accent-green/20',
      border: 'border-accent-green/20',
    },
    features: [
      '2D Character Animation',
      '3D Animation (science models, anatomy, geography)',
      'Whiteboard / Doodle Animation',
      'Motion Graphics & Kinetic Typography',
      'Voice-over: English, Urdu, Arabic',
      'All subjects: Science, Math, History, Languages, Islamic Studies',
      'All levels: Preschool to University',
      'Delivery in MP4, SCORM, YouTube-ready formats',
    ],
  },
  {
    icon: '💻',
    title: 'Digital Solutions & Apps',
    description:
      'Custom software and mobile apps for every institutional need — from student management to full school ERP systems.',
    accent: 'purple',
    accentClass: {
      icon: 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
      border: 'border-accent-purple/20',
    },
    features: [
      'Student Management Systems (attendance, grades, profiles)',
      'School ERP (fees, HR, accounts, inventory, library)',
      'Mobile Apps (iOS + Android) for students, teachers, parents',
      'WhatsApp & SMS automation',
      'Fee collection with JazzCash, Easypaisa, Stripe',
      'Admission portals with application workflows',
      'Sponsor & donor management portals',
      'Custom dashboards and reporting',
    ],
  },
  {
    icon: '📚',
    title: 'Educational Content Creation',
    description:
      'Complete curriculum development and instructional design services. We create content that makes learning stick.',
    accent: 'orange',
    accentClass: {
      icon: 'bg-accent-orange/10 text-accent-orange border-accent-orange/20',
      border: 'border-accent-orange/20',
    },
    features: [
      'Curriculum design and lesson plans',
      'E-books and digital textbooks',
      'Interactive quizzes and assessments',
      'SCORM-packaged e-learning modules',
      'Teacher training resources',
      'Worksheets and printable materials',
      'Compatible with any board: Cambridge, Matric, O/A Level, Islamic curriculum',
      'Available in English, Urdu, and Arabic',
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Page hero ── */}
      <section className="relative pt-32 pb-16 px-5 md:px-8 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.1) 0%, transparent 65%)',
          }}
        />
        <AnimatedSection className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-card-bg border border-border text-muted text-xs font-syne font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            What We Offer
          </div>
          <h1 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-muted font-dm text-base md:text-lg leading-relaxed">
            End-to-end EdTech solutions for every type of institution — conventional, Islamic, or
            international. In English, Urdu, and Arabic.
          </p>
        </AnimatedSection>
      </section>

      {/* ── Service blocks ── */}
      <section className="py-16 px-5 md:px-8 max-w-6xl mx-auto space-y-16">
        {services.map((service, i) => (
          <AnimatedSection key={service.title} delay={0.05 * i}>
            <div
              className={`bg-card-bg border ${service.accentClass.border} rounded-2xl p-8 md:p-10 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 items-start`}
            >
              {/* Left: icon + title */}
              <div className="flex flex-col gap-5">
                <div
                  className={`w-16 h-16 rounded-2xl border flex items-center justify-center text-3xl ${service.accentClass.icon}`}
                >
                  {service.icon}
                </div>
                <div>
                  <h2 className="font-syne font-extrabold text-2xl md:text-3xl text-white mb-3">
                    {service.title}
                  </h2>
                  <p className="text-muted font-dm leading-relaxed text-sm md:text-base">
                    {service.description}
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-syne font-semibold text-sm px-5 py-2.5 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-accent/20 w-fit"
                >
                  Request a Proposal →
                </Link>
              </div>

              {/* Right: feature list */}
              <div>
                <h3 className="font-syne font-semibold text-muted text-xs uppercase tracking-widest mb-4">
                  What&apos;s included
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm font-dm text-text">
                      <span className="text-accent-green mt-0.5 flex-shrink-0">→</span>
                      <span dir="auto">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </section>

      {/* ── CTA Strip ── */}
      <section className="py-24 px-5 md:px-8">
        <AnimatedSection className="max-w-3xl mx-auto bg-card-bg border border-border rounded-2xl p-10 md:p-14 text-center">
          <h2 className="font-syne font-extrabold text-2xl md:text-3xl text-white mb-3">
            Ready to get started?
          </h2>
          <p className="text-muted font-dm mb-8 leading-relaxed">
            Tell us what your institution needs and we&apos;ll send you a clear proposal.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-syne font-semibold px-8 py-4 rounded-xl transition-all duration-200 hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-0.5"
          >
            Request a Proposal →
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
