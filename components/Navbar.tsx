'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { href: '/portfolio', label: 'Work' },
  { href: '/services',  label: 'Services' },
  { href: '/about',     label: 'About' },
  { href: '/contact',   label: 'Contact' },
];

export default function Navbar() {
  const [hidden, setHidden]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      if (y > lastY.current && y > 80) {
        setHidden(true);
        setMobileOpen(false);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: scrolled ? 'rgba(8,8,8,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #2A2520' : '1px solid transparent',
        transition: 'background-color 0.4s ease, border-color 0.4s ease',
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 5%',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 600,
            fontSize: 24,
            color: '#F0EBE3',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          Cubico
        </Link>

        {/* Desktop links */}
        <ul
          className="hidden md:flex"
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: 40,
            alignItems: 'center',
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontWeight: 500,
                  fontSize: 14,
                  color: '#8C8680',
                  textDecoration: 'none',
                  transition: 'color 0.22s ease',
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = '#F0EBE3')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = '#8C8680')}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            data-cursor="cta"
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: 13,
              color: '#E8622A',
              textDecoration: 'none',
              border: '1px solid #E8622A',
              padding: '10px 22px',
              transition: 'background-color 0.2s ease, color 0.2s ease',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = '#E8622A';
              el.style.color = '#F0EBE3';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = 'transparent';
              el.style.color = '#E8622A';
            }}
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          style={{
            background: 'none',
            border: 'none',
            padding: 8,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 22,
                height: 1,
                backgroundColor: '#F0EBE3',
                transition: 'transform 0.25s ease, opacity 0.25s ease',
                transform: mobileOpen
                  ? i === 0 ? 'rotate(45deg) translate(4px, 5px)'
                  : i === 2 ? 'rotate(-45deg) translate(4px, -5px)'
                  : 'none'
                  : 'none',
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              overflow: 'hidden',
              borderTop: '1px solid #2A2520',
              backgroundColor: 'rgba(8,8,8,0.97)',
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: '20px 5%',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
              }}
            >
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 500,
                      fontSize: 20,
                      color: '#8C8680',
                      textDecoration: 'none',
                      padding: '14px 0',
                      borderBottom: '1px solid #2A2520',
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li style={{ paddingTop: 20 }}>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#F0EBE3',
                    textDecoration: 'none',
                    backgroundColor: '#E8622A',
                    padding: '14px 24px',
                    textAlign: 'center',
                  }}
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
