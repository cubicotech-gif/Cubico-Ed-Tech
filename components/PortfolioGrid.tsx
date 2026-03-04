'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PortfolioCard from '@/components/PortfolioCard';
import { fetchPortfolioProjects, type PortfolioProject } from '@/lib/supabase';

const PLACEHOLDER_PROJECTS: PortfolioProject[] = [
  {
    id: '1',
    title: 'Al-Noor Academy — Moodle LMS',
    category: 'LMS',
    description:
      'Full Moodle deployment with Arabic RTL theme, BBB integration, and custom student dashboard for an Islamic school in Karachi.',
    tags: ['Moodle', 'Arabic RTL', 'BigBlueButton', 'Custom Theme'],
    image_url: null,
    created_at: '',
  },
  {
    id: '2',
    title: 'Grade 5 Science — 2D Animation Series',
    category: 'Animation',
    description:
      'A 12-episode animated series covering the solar system, ecosystems, and the human body with Urdu voice-overs.',
    tags: ['2D Animation', 'Urdu VO', 'Science', 'SCORM'],
    image_url: null,
    created_at: '',
  },
  {
    id: '3',
    title: 'CampusCore — School ERP',
    category: 'Apps',
    description:
      'Comprehensive school ERP covering fees, attendance, HR, accounts, and parent communication via WhatsApp automation.',
    tags: ['ERP', 'WhatsApp API', 'JazzCash', 'Mobile App'],
    image_url: null,
    created_at: '',
  },
  {
    id: '4',
    title: 'O-Level Chemistry — e-Learning Pack',
    category: 'Content',
    description:
      'SCORM-packaged e-learning modules for Cambridge O-Level Chemistry with interactive quizzes and revision notes.',
    tags: ['SCORM', 'Cambridge', 'H5P', 'Moodle'],
    image_url: null,
    created_at: '',
  },
  {
    id: '5',
    title: 'Madrassa Management Portal',
    category: 'Apps',
    description:
      'A custom student and fee management system built for a network of 8 madrassas with Urdu interface and sponsor tracking.',
    tags: ['Management System', 'Urdu UI', 'Sponsor Portal'],
    image_url: null,
    created_at: '',
  },
  {
    id: '6',
    title: 'Early Childhood — Animated Alphabet',
    category: 'Animation',
    description:
      'Bilingual animated series teaching the English and Urdu alphabets to preschool children with songs and activities.',
    tags: ['Preschool', 'Bilingual', '2D', 'Songs'],
    image_url: null,
    created_at: '',
  },
];

const CATEGORIES = ['All', 'LMS', 'Animation', 'Apps', 'Content'] as const;
type Category = (typeof CATEGORIES)[number];

export default function PortfolioGrid() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<Category>('All');

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchPortfolioProjects();
        setProjects(data.length > 0 ? data : PLACEHOLDER_PROJECTS);
      } catch {
        setError('Could not load projects. Showing sample work.');
        setProjects(PLACEHOLDER_PROJECTS);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter(p => p.category === activeFilter);

  return (
    <div>
      {/* Filter buttons */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 48 }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              padding: '9px 20px',
              border: '1px solid',
              borderColor: activeFilter === cat ? '#E8622A' : '#2A2520',
              backgroundColor: activeFilter === cat ? '#E8622A' : 'transparent',
              color: activeFilter === cat ? '#F0EBE3' : '#7A7268',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => {
              if (activeFilter !== cat) {
                const el = e.currentTarget;
                el.style.borderColor = '#3A3530';
                el.style.color = '#F0EBE3';
              }
            }}
            onMouseLeave={e => {
              if (activeFilter !== cat) {
                const el = e.currentTarget;
                el.style.borderColor = '#2A2520';
                el.style.color = '#7A7268';
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Error note */}
      {error && (
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 13,
            color: '#7A7268',
            backgroundColor: '#191919',
            border: '1px solid #2A2520',
            padding: '12px 16px',
            marginBottom: 24,
          }}
        >
          {error}
        </p>
      )}

      {/* Loading skeleton */}
      {loading ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#191919',
                border: '1px solid #2A2520',
                overflow: 'hidden',
              }}
            >
              <div style={{ aspectRatio: '16/9', backgroundColor: '#111111' }} />
              <div style={{ padding: '24px 24px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ height: 16, backgroundColor: '#2A2520', width: '75%' }} />
                <div style={{ height: 12, backgroundColor: '#2A2520', width: '100%' }} />
                <div style={{ height: 12, backgroundColor: '#2A2520', width: '85%' }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 24,
            }}
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <PortfolioCard
                  title={project.title}
                  category={project.category}
                  description={project.description}
                  tags={project.tags}
                  image_url={project.image_url}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {!loading && filtered.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 0',
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            color: '#7A7268',
          }}
        >
          No projects in this category yet.
        </div>
      )}
    </div>
  );
}
