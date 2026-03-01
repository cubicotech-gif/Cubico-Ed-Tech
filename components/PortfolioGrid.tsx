'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PortfolioCard from '@/components/PortfolioCard';
import { fetchPortfolioProjects, type PortfolioProject } from '@/lib/supabase';

// ── Placeholder cards shown when Supabase returns no data ──────────────────
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
        // Fall back to placeholders if Supabase returns nothing
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
      : projects.filter((p) => p.category === activeFilter);

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`font-syne font-semibold text-sm px-5 py-2 rounded-full border transition-all duration-200 ${
              activeFilter === cat
                ? 'bg-accent border-accent text-white'
                : 'bg-card-bg border-border text-muted hover:text-text hover:border-border/60'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Error note (non-blocking) */}
      {error && (
        <p className="text-muted text-sm font-dm mb-6 bg-card-bg border border-border rounded-lg px-4 py-3">
          ⚠️ {error}
        </p>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-card-bg border border-border rounded-2xl overflow-hidden animate-pulse"
            >
              <div className="aspect-video bg-border/40" />
              <div className="p-5 flex flex-col gap-3">
                <div className="h-4 bg-border/60 rounded w-3/4" />
                <div className="h-3 bg-border/40 rounded w-full" />
                <div className="h-3 bg-border/40 rounded w-5/6" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
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
        <div className="text-center py-20 text-muted font-dm">
          <div className="text-4xl mb-3">🔍</div>
          <p>No projects in this category yet.</p>
        </div>
      )}
    </div>
  );
}
