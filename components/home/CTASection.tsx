'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const CONTACT_ITEMS = [
  { icon: '📧', text: 'info@cubico.tech' },
  { icon: '📍', text: 'Karachi, Pakistan' },
  { icon: '💬', text: 'WhatsApp Available' },
];

export default function CTASection() {
  return (
    <section className="bg-cream py-36 md:py-44 px-6 md:px-10">
      <div className="max-w-[700px] mx-auto text-center">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="font-ui font-medium text-[11px] text-warm-gray uppercase tracking-[0.28em] mb-8"
        >
          LIMITED PROJECT SLOTS&nbsp;&nbsp;·&nbsp;&nbsp;Q2 2026
        </motion.p>

        {/* Heading — very large, ink colored */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-[clamp(48px,7vw,96px)] text-ink leading-[0.95] tracking-tight mb-8"
        >
          Let&apos;s Build
          <br />
          Something
          <br />
          Extraordinary.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.18, ease: 'easeOut' }}
          className="font-body text-[17px] leading-[1.7] max-w-[480px] mx-auto mb-12"
          style={{ color: '#5A5550' }}
        >
          Tell us about your institution. We&apos;ll respond within 24 hours with
          a clear plan and honest pricing.
        </motion.p>

        {/* CTA button — fire, sharp, pulsing */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="inline-block"
            style={{
              filter: 'drop-shadow(0 8px 32px rgba(232,98,42,0.28))',
            }}
          >
            <Link
              href="/contact"
              data-cursor="cta"
              className="inline-flex items-center font-ui font-semibold text-[17px] text-ivory bg-fire px-12 py-5 transition-colors duration-200 hover:bg-[#C4531F]"
            >
              Start Your Project →
            </Link>
          </motion.div>
        </motion.div>

        {/* Contact items row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.38, ease: 'easeOut' }}
          className="flex items-center justify-center flex-wrap gap-2 text-[14px]"
          style={{ color: '#7A7268' }}
        >
          {CONTACT_ITEMS.map(({ icon, text }, i) => (
            <span key={text} className="flex items-center gap-1.5 font-body">
              {i > 0 && <span className="text-[#D5CFC8] mx-1">·</span>}
              <span>{icon}</span>
              <span>{text}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
