'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import clsx from 'clsx';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  accent: 'blue' | 'green' | 'purple' | 'orange';
  delay?: number;
}

const accentMap = {
  blue: {
    border: 'border-accent/30 hover:border-accent/60',
    icon: 'bg-accent/10 text-accent',
    glow: 'hover:shadow-accent/10',
  },
  green: {
    border: 'border-accent-green/30 hover:border-accent-green/60',
    icon: 'bg-accent-green/10 text-accent-green',
    glow: 'hover:shadow-accent-green/10',
  },
  purple: {
    border: 'border-accent-purple/30 hover:border-accent-purple/60',
    icon: 'bg-accent-purple/10 text-accent-purple',
    glow: 'hover:shadow-accent-purple/10',
  },
  orange: {
    border: 'border-accent-orange/30 hover:border-accent-orange/60',
    icon: 'bg-accent-orange/10 text-accent-orange',
    glow: 'hover:shadow-accent-orange/10',
  },
};

export default function ServiceCard({
  icon,
  title,
  description,
  accent,
  delay = 0,
}: ServiceCardProps) {
  const a = accentMap[accent];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ y: -4 }}
      className={clsx(
        'group bg-card-bg border rounded-2xl p-7 flex flex-col gap-5 transition-all duration-300 hover:shadow-xl',
        a.border,
        a.glow
      )}
    >
      {/* Icon */}
      <div
        className={clsx(
          'w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110',
          a.icon
        )}
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="font-syne font-bold text-lg text-white">{title}</h3>
        <p className="text-muted text-sm leading-relaxed font-dm">{description}</p>
      </div>

      {/* CTA */}
      <Link
        href="/services"
        className="text-sm font-syne font-semibold text-muted group-hover:text-white flex items-center gap-1 transition-colors duration-200"
      >
        Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
      </Link>
    </motion.div>
  );
}
