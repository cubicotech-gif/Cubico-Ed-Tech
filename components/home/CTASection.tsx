'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const CONTACT_ITEMS = [
  { icon: '📧', label: 'info@cubico.tech' },
  { icon: '💬', label: 'WhatsApp' },
  { icon: '📍', label: 'Karachi, Pakistan' },
];

export default function CTASection() {
  return (
    <section className="relative py-28 px-5 md:px-8 overflow-hidden">
      {/* Deep blue radial gradient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(59,130,246,0.12) 0%, rgba(6,214,160,0.04) 40%, transparent 70%), #0a0a0a',
        }}
      />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 hero-grid-bg opacity-40 pointer-events-none" />

      {/* Faint top/bottom borders */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-card-bg/80 border border-border text-muted text-xs font-syne font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-7 backdrop-blur"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Limited Slots Available
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-5"
        >
          Ready to Transform Your{' '}
          <span className="gradient-text">Institution?</span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-muted font-dm text-base md:text-lg leading-relaxed max-w-lg mx-auto mb-10"
        >
          We take on limited projects each quarter to ensure quality.
          <br />
          Let&apos;s talk about yours.
        </motion.p>

        {/* Pulsing CTA button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block"
          >
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-syne font-bold text-base px-10 py-5 rounded-2xl transition-colors duration-200"
              style={{
                boxShadow:
                  '0 0 48px rgba(59,130,246,0.50), 0 8px 24px rgba(59,130,246,0.28)',
              }}
            >
              Start Your Project →
            </Link>
          </motion.div>
        </motion.div>

        {/* Contact row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex items-center justify-center flex-wrap gap-6 mt-8"
        >
          {CONTACT_ITEMS.map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-muted text-sm font-dm">
              <span className="text-base">{icon}</span>
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
