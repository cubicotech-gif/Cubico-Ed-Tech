'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY && currentY > 80) {
        setVisible(false);
        setMobileOpen(false);
      } else {
        setVisible(true);
      }
      setLastY(currentY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);

  return (
    <motion.header
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border"
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
            <span className="font-syne font-bold text-sm text-white">C</span>
          </div>
          <div className="leading-none">
            <div className="font-syne font-bold text-white text-base group-hover:text-accent transition-colors">
              Cubico
            </div>
            <div className="text-muted text-[0.6rem] uppercase tracking-widest">
              Technologies
            </div>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={clsx(
                  'text-sm font-dm transition-colors duration-200',
                  pathname === href
                    ? 'text-white'
                    : 'text-muted hover:text-text'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contact"
            className="bg-accent hover:bg-accent/90 text-white font-syne font-semibold text-sm px-5 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-accent/20"
          >
            Get In Touch
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={clsx(
              'block w-5 h-0.5 bg-text transition-all duration-300',
              mobileOpen && 'rotate-45 translate-y-2'
            )}
          />
          <span
            className={clsx(
              'block w-5 h-0.5 bg-text transition-all duration-300',
              mobileOpen && 'opacity-0'
            )}
          />
          <span
            className={clsx(
              'block w-5 h-0.5 bg-text transition-all duration-300',
              mobileOpen && '-rotate-45 -translate-y-2'
            )}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t border-border overflow-hidden"
          >
            <ul className="flex flex-col px-5 py-4 gap-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      'block py-1.5 text-sm font-dm transition-colors',
                      pathname === href ? 'text-white' : 'text-muted'
                    )}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-accent text-white font-syne font-semibold text-sm px-5 py-2.5 rounded-lg"
                >
                  Get In Touch
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
