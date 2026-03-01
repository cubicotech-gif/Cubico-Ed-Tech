'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import clsx from 'clsx';

interface PortfolioCardProps {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image_url?: string | null;
  delay?: number;
}

const categoryColors: Record<string, string> = {
  LMS: 'bg-accent/15 text-accent',
  Animation: 'bg-accent-green/15 text-accent-green',
  Apps: 'bg-accent-purple/15 text-accent-purple',
  Content: 'bg-accent-orange/15 text-accent-orange',
};

export default function PortfolioCard({
  title,
  category,
  description,
  tags,
  image_url,
  delay = 0,
}: PortfolioCardProps) {
  const categoryStyle = categoryColors[category] ?? 'bg-muted/20 text-muted';

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      whileHover={{ scale: 1.02 }}
      className="bg-card-bg border border-border rounded-2xl overflow-hidden group transition-all duration-300 hover:border-border/80 hover:shadow-xl hover:shadow-black/30 flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video bg-background overflow-hidden">
        {image_url ? (
          <Image
            src={image_url}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          /* Placeholder with gradient when no image */
          <div className="absolute inset-0 bg-gradient-to-br from-card-bg via-background to-card-bg flex items-center justify-center">
            <div className="text-muted/30 font-syne font-bold text-5xl select-none">C</div>
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-green/5" />
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className={clsx(
              'text-xs font-syne font-semibold px-3 py-1 rounded-full',
              categoryStyle
            )}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h3 className="font-syne font-bold text-white text-base leading-snug">{title}</h3>
        <p className="text-muted text-sm leading-relaxed font-dm line-clamp-2">{description}</p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[0.7rem] font-dm text-muted bg-border/60 px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
