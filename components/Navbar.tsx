'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '/portfolio', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

function useScrollBehavior() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastY = 0;
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setVisible(y < 80 || y < lastY);
      lastY = y;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return { scrolled, visible };
}

export default function Navbar() {
  const pathname = usePathname();
  const { scrolled, visible } = useScrollBehavior();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        scrolled
          ? 'bg-void/92 backdrop-blur-md border-b border-rule'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      <nav className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between h-[72px]">

        {/* Wordmark — Fraunces italic */}
        <Link
          href="/"
          className="font-display font-semibold italic text-[1.6rem] text-ivory leading-none tracking-tight hover:text-fire transition-colors duration-300"
        >
          Cubico
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={[
                  'font-ui font-medium text-[13px] tracking-[0.03em] transition-colors duration-200',
                  pathname === href ? 'text-ivory' : 'text-warm-gray hover:text-ivory',
                ].join(' ')}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA — fire border, sharp */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            data-cursor="cta"
            className="font-ui font-semibold text-[13px] text-fire border border-fire px-5 py-2.5 transition-all duration-200 hover:bg-fire hover:text-ivory tracking-wide"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-0"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block h-px bg-ivory transition-all duration-300 ${mobileOpen ? 'w-6 rotate-45 translate-y-[6px]' : 'w-6'}`} />
          <span className={`block h-px bg-ivory transition-all duration-300 ${mobileOpen ? 'w-0 opacity-0' : 'w-4'}`} />
          <span className={`block h-px bg-ivory transition-all duration-300 ${mobileOpen ? 'w-6 -rotate-45 -translate-y-[6px]' : 'w-6'}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: 'easeInOut' }}
            className="md:hidden bg-void/96 backdrop-blur-md border-t border-rule overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-6 gap-5">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-ui font-medium text-xl text-warm-gray hover:text-ivory transition-colors py-0.5"
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-3">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block font-ui font-semibold text-[13px] text-fire border border-fire px-5 py-3.5 text-center hover:bg-fire hover:text-ivory transition-all"
                >
                  Start a Project
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
