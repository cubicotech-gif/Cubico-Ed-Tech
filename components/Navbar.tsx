"use client";


import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WA_LINK =
  "https://wa.me/923001234567?text=Hi%20Cubico!%20I'm%20interested%20in%20learning%20about%20your%20EdTech%20solutions%20for%20our%20institution.";

type NavLink = { href: string; label: string; dropdown?: { href: string; label: string }[] };
const NAV_LINKS: NavLink[] = [
  {
    href: '#',
    label: 'Solutions',
    dropdown: [
      { href: '/solutions/manage', label: 'Cubico Manage™' },
      { href: '/solutions/teach',  label: 'Cubico Teach™'  },
      { href: '/solutions/learn',  label: 'Cubico Learn™'  },
      { href: '/solutions/scale',  label: 'Cubico Scale™'  },
    ],
  },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/about',        label: 'About'        },
  { href: '/blog',         label: 'Blog'         },
  { href: '/contact',      label: 'Contact'      },
];

export default function Navbar() {
  const [hidden, setHidden]         = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen]     = useState(false);
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
        backgroundColor: scrolled ? 'rgba(6,10,21,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
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
            fontWeight: 700,
            fontSize: 26,
            color: '#E2E8F0',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(135deg, #818CF8, #7C3AED)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Cubico
        </Link>

        {/* Desktop links */}
        <ul
          className="hidden md:flex"
          style={{ listStyle: 'none', margin: 0, padding: 0, gap: 36, alignItems: 'center' }}
        >
          {NAV_LINKS.map(({ href, label, dropdown }) => (
            <li key={label} style={{ position: 'relative' }}>
              {dropdown ? (
                <div
                  onMouseEnter={() => setDropOpen(true)}
                  onMouseLeave={() => setDropOpen(false)}
                  style={{ position: 'relative' }}
                >
                  <button
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-ui)',
                      fontWeight: 500,
                      fontSize: 14,
                      color: dropOpen ? '#E2E8F0' : '#64748B',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      padding: 0,
                    }}
                  >
                    {label}
                    <span style={{ fontSize: 10, transition: 'transform 0.2s', transform: dropOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
                  </button>
                  <AnimatePresence>
                    {dropOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          marginTop: 12,
                          background: '#0C1528',
                          border: '1px solid rgba(255,255,255,0.08)',
                          borderRadius: 12,
                          padding: '8px 0',
                          minWidth: 200,
                          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                          zIndex: 200,
                        }}
                      >
                        {dropdown.map(item => (
                          <Link
                            key={item.href}
                            href={item.href}
                            style={{
                              display: 'block',
                              fontFamily: 'var(--font-ui)',
                              fontWeight: 500,
                              fontSize: 13,
                              color: '#94A3B8',
                              textDecoration: 'none',
                              padding: '10px 20px',
                              transition: 'color 0.15s, background 0.15s',
                            }}
                            onMouseEnter={e => {
                              (e.currentTarget as HTMLElement).style.color = '#E2E8F0';
                              (e.currentTarget as HTMLElement).style.background = 'rgba(79,70,229,0.08)';
                            }}
                            onMouseLeave={e => {
                              (e.currentTarget as HTMLElement).style.color = '#94A3B8';
                              (e.currentTarget as HTMLElement).style.background = 'transparent';
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={href}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 500,
                    fontSize: 14,
                    color: '#64748B',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => ((e.target as HTMLElement).style.color = '#E2E8F0')}
                  onMouseLeave={e => ((e.target as HTMLElement).style.color = '#64748B')}
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: 13,
              color: '#fff',
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              padding: '10px 22px',
              borderRadius: 8,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              boxShadow: '0 0 20px rgba(79,70,229,0.35)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.opacity = '0.9';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.opacity = '1';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            💬 Get a Free Consultation
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
          style={{ background: 'none', border: 'none', padding: 8, display: 'flex', flexDirection: 'column', gap: 5 }}
        >
          {[0, 1, 2].map(i => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 22,
                height: 1.5,
                backgroundColor: '#E2E8F0',
                borderRadius: 2,
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
              borderTop: '1px solid rgba(255,255,255,0.06)',
              backgroundColor: 'rgba(6,10,21,0.97)',
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
              {NAV_LINKS.map(({ href, label, dropdown }) => (
                <li key={label}>
                  {dropdown ? (
                    <>
                      <span style={{
                        display: 'block',
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 600,
                        fontSize: 11,
                        color: '#818CF8',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        padding: '14px 0 6px',
                      }}>Solutions</span>
                      {dropdown.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-ui)',
                            fontWeight: 500,
                            fontSize: 17,
                            color: '#64748B',
                            textDecoration: 'none',
                            padding: '10px 0',
                            borderBottom: '1px solid rgba(255,255,255,0.04)',
                            paddingLeft: 12,
                          }}
                        >{item.label}</Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-ui)',
                        fontWeight: 500,
                        fontSize: 20,
                        color: '#64748B',
                        textDecoration: 'none',
                        padding: '14px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
              <li style={{ paddingTop: 20 }}>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#fff',
                    textDecoration: 'none',
                    background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                    padding: '14px 24px',
                    borderRadius: 8,
                    textAlign: 'center',
                  }}
                >
                  💬 Get a Free Consultation
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
