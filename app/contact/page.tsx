import type { Metadata } from 'next';
import AnimatedSection from '@/components/AnimatedSection';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Get in touch with Cubico Technologies. Tell us about your institution and we'll respond within 24 hours.",
};

const contactDetails = [
  {
    icon: '📧',
    label: 'Email',
    value: 'info@cubico.tech',
    href: 'mailto:info@cubico.tech',
  },
  {
    icon: '📍',
    label: 'Location',
    value: 'Karachi, Pakistan',
    href: null,
  },
  {
    icon: '🌐',
    label: 'Website',
    value: 'cubico.tech',
    href: 'https://cubico.tech',
  },
  {
    icon: '💬',
    label: 'Languages',
    value: 'English · اردو · عربي',
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      {/* ── Page hero ── */}
      <section className="relative pt-32 pb-16 px-5 md:px-8 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(6,214,160,0.07) 0%, transparent 65%)',
          }}
        />
        <AnimatedSection className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-card-bg border border-border text-muted text-xs font-syne font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
            Let&apos;s Talk
          </div>
          <h1 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-muted font-dm text-base md:text-lg leading-relaxed">
            Tell us about your institution and what you need. We&apos;ll get back to you within 24
            hours with a clear plan.
          </p>
        </AnimatedSection>
      </section>

      {/* ── Contact grid ── */}
      <section className="pb-24 px-5 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8">
          {/* Left: form */}
          <AnimatedSection direction="left">
            <div className="bg-card-bg border border-border rounded-2xl p-8">
              <h2 className="font-syne font-bold text-white text-xl mb-7">Send us a message</h2>
              <ContactForm />
            </div>
          </AnimatedSection>

          {/* Right: contact details */}
          <AnimatedSection direction="right" delay={0.15}>
            <div className="flex flex-col gap-5">
              {/* Details card */}
              <div className="bg-card-bg border border-border rounded-2xl p-7">
                <h2 className="font-syne font-bold text-white text-xl mb-6">Contact Details</h2>
                <div className="flex flex-col gap-5">
                  {contactDetails.map(({ icon, label, value, href }) => (
                    <div key={label} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-border/50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                        {icon}
                      </div>
                      <div>
                        <div className="text-muted text-xs font-syne font-semibold uppercase tracking-wider mb-0.5">
                          {label}
                        </div>
                        {href ? (
                          <a
                            href={href}
                            className="text-text text-sm font-dm hover:text-accent transition-colors"
                            dir="auto"
                          >
                            {value}
                          </a>
                        ) : (
                          <span className="text-text text-sm font-dm" dir="auto">
                            {value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response time note */}
              <div className="bg-accent-green/10 border border-accent-green/25 rounded-2xl p-6 flex items-start gap-4">
                <div className="text-2xl flex-shrink-0">⚡</div>
                <div>
                  <div className="font-syne font-bold text-white text-sm mb-1">Fast Response</div>
                  <p className="text-muted text-sm font-dm leading-relaxed">
                    We typically respond within 24 hours on business days. For urgent projects,
                    mention it in your message.
                  </p>
                </div>
              </div>

              {/* What to expect */}
              <div className="bg-card-bg border border-border rounded-2xl p-6">
                <h3 className="font-syne font-bold text-white text-sm mb-4">What happens next?</h3>
                <ol className="flex flex-col gap-3">
                  {[
                    'We review your requirements carefully',
                    'We prepare a tailored proposal',
                    'We schedule a free consultation call',
                    'We begin building your solution',
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm font-dm text-muted">
                      <span className="w-5 h-5 rounded-full bg-accent/15 text-accent font-syne font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
