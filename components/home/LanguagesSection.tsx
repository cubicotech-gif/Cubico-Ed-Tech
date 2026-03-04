'use client';

import { motion } from 'framer-motion';

const LANGUAGES = [
  {
    lang: 'ENGLISH',
    name: 'English',
    sample: 'Welcome to the future of education.',
    note: 'Full LMS, content & support in English',
    dir: 'ltr' as const,
  },
  {
    lang: 'URDU',
    name: 'اردو',
    sample: 'تعلیم کے مستقبل میں خوش آمدید',
    note: 'تمام خدمات اردو میں دستیاب ہیں',
    dir: 'rtl' as const,
  },
  {
    lang: 'ARABIC',
    name: 'العربية',
    sample: 'مرحباً بكم في مستقبل التعليم',
    note: 'دعم كامل للغة العربية مع واجهة RTL',
    dir: 'rtl' as const,
  },
];

const colVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay: i * 0.15 },
  }),
};

export default function LanguagesSection() {
  return (
    <section style={{ backgroundColor: 'var(--bg-base)', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>

        {/* Section label */}
        <div style={{ marginBottom: 64 }}>
          <span
            style={{
              fontFamily: 'var(--font-stamp)',
              fontSize: 14,
              color: 'var(--gold)',
              letterSpacing: '0.1em',
            }}
          >
            06
          </span>
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              color: 'var(--text-muted)',
              letterSpacing: '0.2em',
              marginLeft: 16,
              textTransform: 'uppercase',
            }}
          >
            WE SPEAK YOUR LANGUAGE
          </span>
        </div>

        {/* 3-column language grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 0,
          }}
        >
          {LANGUAGES.map((l, i) => (
            <motion.div
              key={l.lang}
              custom={i}
              variants={colVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              dir={l.dir}
              style={{
                padding: '40px 36px',
                borderRight:
                  i < LANGUAGES.length - 1 ? '1px solid var(--line)' : 'none',
                textAlign: l.dir === 'rtl' ? 'right' : 'left',
              }}
            >
              {/* Small label */}
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: 20,
                  direction: 'ltr',
                  textAlign: 'left',
                }}
              >
                {l.lang}
              </div>

              {/* Language name */}
              <div
                style={{
                  fontFamily: l.dir === 'ltr' ? 'var(--font-stamp)' : 'inherit',
                  fontSize: 48,
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                  marginBottom: 24,
                  fontWeight: l.dir === 'rtl' ? 700 : 400,
                }}
              >
                {l.name}
              </div>

              {/* Sample text */}
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 16,
                  color: 'var(--text-body)',
                  lineHeight: 1.7,
                  marginBottom: 16,
                }}
              >
                {l.sample}
              </p>

              {/* Note */}
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 13,
                  color: 'var(--text-body)',
                  lineHeight: 1.6,
                  borderTop: '1px solid var(--line)',
                  paddingTop: 16,
                  marginTop: 16,
                }}
              >
                {l.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
