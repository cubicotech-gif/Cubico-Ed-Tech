'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface PortfolioCardProps {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image_url?: string | null;
}

export default function PortfolioCard({
  title,
  category,
  description,
  tags,
  image_url,
}: PortfolioCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: '#191919',
        border: '1px solid #2A2520',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.25s ease',
      }}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#3A3530')}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = '#2A2520')}
    >
      {/* Thumbnail */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          backgroundColor: '#111111',
          overflow: 'hidden',
        }}
      >
        {image_url ? (
          <Image
            src={image_url}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #1A1714 0%, #111111 60%, #1A1210 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 72,
                color: '#2A2520',
                lineHeight: 1,
                userSelect: 'none',
              }}
            >
              C
            </span>
          </div>
        )}

        {/* Category badge */}
        <div style={{ position: 'absolute', top: 14, left: 14 }}>
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: 10,
              color: '#E8622A',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              backgroundColor: 'rgba(8,8,8,0.75)',
              padding: '4px 10px',
              backdropFilter: 'blur(4px)',
            }}
          >
            {category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: '24px 24px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          flex: 1,
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 17,
            color: '#F0EBE3',
            lineHeight: 1.25,
            margin: 0,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: '#7A7268',
            lineHeight: 1.7,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {description}
        </p>

        {tags && tags.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              marginTop: 'auto',
              paddingTop: 12,
            }}
          >
            {tags.map(tag => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 10,
                  color: '#6A6460',
                  border: '1px solid #2A2520',
                  padding: '3px 8px',
                  letterSpacing: '0.04em',
                }}
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
