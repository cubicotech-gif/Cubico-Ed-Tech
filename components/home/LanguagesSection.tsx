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
    <section style={{ backgroundColor: '#080808', padding: '100px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5%' }}>

        {/* Section label */}
        <div style={{ marginBottom: 64 }}>
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 500,
              fontSize: 11,
              color: '#E8622A',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            06 — WE SPEAK YOUR LANGUAGE
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
                  i < LANGUAGES.length - 1 ? '1px solid #2A2520' : 'none',
                textAlign: l.dir === 'rtl' ? 'right' : 'left',
              }}
            >
              {/* Small label */}
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 500,
                  fontSize: 10,
                  color: '#6A6460',
                  letterSpacing: '0.24em',
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
                  fontFamily: l.dir === 'ltr' ? 'var(--font-accent)' : 'inherit',
                  fontSize: 48,
                  color: '#F0EBE3',
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
                  fontFamily: 'var(--font-body)',
                  fontSize: 16,
                  color: '#8A8278',
                  lineHeight: 1.75,
                  marginBottom: 16,
                }}
              >
                {l.sample}
              </p>

              {/* Note */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 13,
                  color: '#7A7268',
                  lineHeight: 1.6,
                  borderTop: '1px solid #2A2520',
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
