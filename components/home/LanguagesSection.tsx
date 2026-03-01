'use client';

import { motion } from 'framer-motion';

const LANGUAGES = [
  {
    code: 'en',
    flag: '🇬🇧',
    name: 'English',
    dir: 'ltr' as const,
    sample: 'Welcome to the future of education.',
    note: 'Full LTR support across all platforms.',
    accent: '#3b82f6',
    glow: 'rgba(59,130,246,0.12)',
    border: 'rgba(59,130,246,0.2)',
    features: ['Course names', 'UI labels', 'Assessment text'],
  },
  {
    code: 'ur',
    flag: '🇵🇰',
    name: 'اردو',
    dir: 'ltr' as const,
    sample: 'تعلیم کے مستقبل میں خوش آمدید',
    note: 'Nastaliq-ready Urdu for all content types.',
    accent: '#06d6a0',
    glow: 'rgba(6,214,160,0.12)',
    border: 'rgba(6,214,160,0.2)',
    features: ['Voice-overs', 'Subtitles', 'UI translation'],
  },
  {
    code: 'ar',
    flag: '🇸🇦',
    name: 'عربي',
    dir: 'rtl' as const,
    sample: 'مرحباً بكم في مستقبل التعليم',
    note: 'Complete RTL layout — menus, text, and media all flip correctly.',
    accent: '#a855f7',
    glow: 'rgba(168,85,247,0.12)',
    border: 'rgba(168,85,247,0.2)',
    features: ['RTL layouts', 'Arabic content', 'Islamic branding'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function LanguagesSection() {
  return (
    <section className="py-24 px-5 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-card-bg border border-border text-muted text-xs font-syne font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-green" />
          Multilingual
        </div>
        <h2 className="font-syne font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
          We Speak Your Language.{' '}
          <span className="gradient-text">Literally.</span>
        </h2>
        <p className="text-muted font-dm mt-4 max-w-lg mx-auto leading-relaxed">
          Every product we build supports English, Urdu, and full Arabic RTL — natively.
        </p>
      </div>

      {/* Language cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {LANGUAGES.map((lang, i) => (
          <motion.div
            key={lang.code}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="relative bg-card-bg rounded-2xl p-7 border border-border overflow-hidden group transition-colors duration-300 hover:bg-[#1a2030]"
            style={{
              boxShadow: `0 0 0 1px transparent`,
            }}
          >
            {/* Glow border on hover */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ boxShadow: `inset 0 0 0 1px ${lang.border}, 0 0 36px ${lang.glow}` }}
            />

            {/* Corner glow blob */}
            <div
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-20 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${lang.accent} 0%, transparent 70%)` }}
            />

            {/* Flag + language name */}
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">{lang.flag}</span>
              <div>
                <div
                  className="font-syne font-bold text-xl leading-none"
                  dir={lang.dir}
                  style={{ color: lang.accent }}
                >
                  {lang.name}
                </div>
                <div className="text-muted text-xs font-dm mt-0.5 uppercase tracking-wider">
                  {lang.code === 'en' ? 'English' : lang.code === 'ur' ? 'Urdu' : 'Arabic'}
                </div>
              </div>
            </div>

            {/* Sample text */}
            <div
              className="bg-background/60 border border-border/60 rounded-xl px-4 py-4 mb-5"
              dir={lang.dir}
            >
              <p
                className="text-white/90 leading-relaxed"
                style={{
                  fontFamily:
                    lang.code === 'ar' || lang.code === 'ur'
                      ? '"Noto Naskh Arabic", "Scheherazade New", serif'
                      : 'inherit',
                  fontSize: lang.code === 'en' ? '0.9rem' : '1.1rem',
                  textAlign: lang.dir === 'rtl' ? 'right' : 'left',
                }}
              >
                {lang.sample}
              </p>
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {lang.features.map((f) => (
                <span
                  key={f}
                  className="text-[0.68rem] font-syne font-semibold px-2.5 py-1 rounded-full border"
                  style={{
                    color: lang.accent,
                    borderColor: lang.border,
                    background: lang.glow,
                  }}
                >
                  {f}
                </span>
              ))}
            </div>

            {/* Note */}
            <p className="text-muted/70 text-xs font-dm leading-relaxed">{lang.note}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
