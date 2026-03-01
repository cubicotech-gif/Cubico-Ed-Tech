'use client';

import { motion } from 'framer-motion';

const LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    dir: 'ltr' as const,
    headline: 'English',
    sample: 'Welcome to the future of education',
    note: 'Full LMS, content & support in English',
    useFallbackFont: false,
  },
  {
    code: 'ur',
    name: 'Urdu',
    flag: '🇵🇰',
    dir: 'rtl' as const,
    headline: 'اردو',
    sample: 'تعلیم کے مستقبل میں خوش آمدید',
    note: 'تمام خدمات اردو میں دستیاب ہیں',
    useFallbackFont: true,
  },
  {
    code: 'ar',
    name: 'Arabic',
    flag: '🇸🇦',
    dir: 'rtl' as const,
    headline: 'العربية',
    sample: 'مرحباً بكم في مستقبل التعليم',
    note: 'دعم كامل للغة العربية مع واجهة RTL',
    useFallbackFont: true,
  },
];

const ARABIC_FONT = '"Noto Naskh Arabic", "Scheherazade New", "Traditional Arabic", serif';

const colVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.14, ease: 'easeOut' },
  }),
};

export default function LanguagesSection() {
  return (
    <section className="bg-void py-24 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">

        {/* Section counter + label */}
        <div className="flex items-center gap-4 mb-14">
          <span className="font-accent text-[14px] text-bronze tracking-[0.1em]">06</span>
          <span className="font-ui text-[11px] text-warm-gray tracking-[0.22em] uppercase">
            We Speak Your Language
          </span>
        </div>

        {/* Three-column layout with vertical rule dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-rule">
          {LANGUAGES.map((lang, i) => (
            <motion.div
              key={lang.code}
              custom={i}
              variants={colVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className={[
                'py-10',
                i === 0 ? 'md:pr-10' : i === 1 ? 'md:px-10' : 'md:pl-10',
              ].join(' ')}
            >
              {/* Flag + code */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl" aria-hidden>{lang.flag}</span>
                <span className="font-ui text-[11px] text-warm-gray uppercase tracking-[0.2em]">
                  {lang.name}
                </span>
              </div>

              {/* Language headline */}
              <div className="mb-6" dir={lang.dir}>
                <span
                  className={[
                    'font-accent text-[clamp(36px,5vw,52px)] text-ivory leading-none block',
                    lang.dir === 'rtl' ? 'text-right' : '',
                  ].join(' ')}
                  style={lang.useFallbackFont ? { fontFamily: ARABIC_FONT, fontSize: 'clamp(32px,4.5vw,46px)', fontWeight: 700 } : {}}
                >
                  {lang.headline}
                </span>
              </div>

              {/* Sample text */}
              <div
                className={[
                  'bg-surface/50 border border-rule px-5 py-4 mb-5',
                  lang.dir === 'rtl' ? 'text-right' : '',
                ].join(' ')}
                dir={lang.dir}
              >
                <p
                  className="text-ivory/85 leading-[1.7]"
                  style={{
                    fontFamily: lang.useFallbackFont ? ARABIC_FONT : 'var(--font-body)',
                    fontSize: lang.useFallbackFont ? '1.15rem' : '0.95rem',
                  }}
                >
                  {lang.sample}
                </p>
              </div>

              {/* Note */}
              <p
                className={[
                  'font-body text-[13px] text-warm-gray leading-relaxed',
                  lang.dir === 'rtl' ? 'text-right' : '',
                ].join(' ')}
                dir={lang.dir}
                style={
                  lang.useFallbackFont
                    ? { fontFamily: ARABIC_FONT, fontSize: '0.85rem' }
                    : {}
                }
              >
                {lang.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
