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
  { href: '/case-studies', label: 'Features'    },
  { href: '/about',        label: 'Showcase'    },
  { href: '/blog',         label: 'Testimonials' },
  { href: '/contact',      label: 'Pricing'     },
];

// ─── Orange hexagon logo icon (matches Planora-style badge) ──────────────────
function LogoIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="#F97316" />
      {/* Abstract "C" shape / hex mark */}
      <path
        d="M16 7 L22 10.5 L22 17.5 L16 21 L10 17.5 L10 10.5 Z"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="14" r="2.5" fill="white" />
    </svg>
  );
}

export default function Navbar() {
  const [hidden, setHidden]         = useState(false);
  const [dropOpen, setDropOpen]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY;
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

  const linkStyle = {
    fontFamily: 'var(--font-ui)',
    fontWeight: 500,
    fontSize: 14,
    color: 'rgba(255,255,255,0.72)',
    textDecoration: 'none',
    transition: 'color 0.18s ease',
    letterSpacing: '0.01em',
  } as const;

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.28, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: '#111111',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 5%',
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}
      >
        {/* ── Logo ── */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <LogoIcon />
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontWeight: 700,
              fontSize: 16,
              color: '#FFFFFF',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            CUBICO
          </span>
        </Link>

        {/* ── Desktop nav links (centered) ── */}
        <ul
          className="hidden md:flex"
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: 32,
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          {NAV_LINKS.map(({ href, label, dropdown }) => (
            <li key={label} style={{ position: 'relative' }}>
              {dropdown ? (
                <div
                  onMouseEnter={() => setDropOpen(true)}
                  onMouseLeave={() => setDropOpen(false)}
                >
                  <button
                    style={{
                      ...linkStyle,
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      color: dropOpen ? '#FFFFFF' : 'rgba(255,255,255,0.72)',
                    }}
                  >
                    {label}
                    <span
                      style={{
                        fontSize: 9,
                        opacity: 0.6,
                        transition: 'transform 0.2s',
                        transform: dropOpen ? 'rotate(180deg)' : 'none',
                        display: 'inline-block',
                      }}
                    >
                      ▾
                    </span>
                  </button>

                  <AnimatePresence>
                    {dropOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.16 }}
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          marginTop: 14,
                          background: '#1A1A1A',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: 10,
                          padding: '6px 0',
                          minWidth: 200,
                          boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                          zIndex: 200,
                        }}
                      >
                        {dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            style={{
                              display: 'block',
                              fontFamily: 'var(--font-ui)',
                              fontWeight: 500,
                              fontSize: 13,
                              color: 'rgba(255,255,255,0.6)',
                              textDecoration: 'none',
                              padding: '10px 18px',
                              transition: 'color 0.15s, background 0.15s',
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLElement).style.color = '#FFFFFF';
                              (e.currentTarget as HTMLElement).style.background = 'rgba(249,115,22,0.1)';
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)';
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
                  style={linkStyle}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#FFFFFF')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.72)')}
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* ── Desktop right: Sign In + Get started ── */}
        <div
          className="hidden md:flex"
          style={{ alignItems: 'center', gap: 20, flexShrink: 0 }}
        >
          <Link
            href="/contact"
            style={linkStyle}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#FFFFFF')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.72)')}
          >
            Sign In
          </Link>

          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 6px 24px rgba(249,115,22,0.5)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#F97316',
              color: '#FFFFFF',
              fontFamily: 'var(--font-ui)',
              fontWeight: 600,
              fontSize: 14,
              padding: '9px 20px',
              borderRadius: 8,
              textDecoration: 'none',
              letterSpacing: '0.01em',
              boxShadow: '0 2px 12px rgba(249,115,22,0.35)',
            }}
          >
            Get started
          </motion.a>
        </div>

        {/* ── Mobile hamburger ── */}
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
            flexShrink: 0,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 22,
                height: 1.5,
                backgroundColor: '#FFFFFF',
                borderRadius: 2,
                transition: 'transform 0.25s ease, opacity 0.25s ease',
                transform: mobileOpen
                  ? i === 0
                    ? 'rotate(45deg) translate(4px, 5px)'
                    : i === 2
                    ? 'rotate(-45deg) translate(4px, -5px)'
                    : 'none'
                  : 'none',
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </nav>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              overflow: 'hidden',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              backgroundColor: '#111111',
            }}
          >
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: '16px 5%',
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
              }}
            >
              {NAV_LINKS.map(({ href, label, dropdown }) => (
                <li key={label}>
                  {dropdown ? (
                    <>
                      <span
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-ui)',
                          fontWeight: 600,
                          fontSize: 11,
                          color: '#F97316',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          padding: '14px 0 6px',
                        }}
                      >
                        Solutions
                      </span>
                      {dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          style={{
                            display: 'block',
                            fontFamily: 'var(--font-ui)',
                            fontWeight: 500,
                            fontSize: 15,
                            color: 'rgba(255,255,255,0.6)',
                            textDecoration: 'none',
                            padding: '10px 0 10px 12px',
                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                          }}
                        >
                          {item.label}
                        </Link>
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
                        fontSize: 18,
                        color: 'rgba(255,255,255,0.72)',
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

              {/* Mobile CTA pair */}
              <li style={{ paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 500,
                    fontSize: 15,
                    color: 'rgba(255,255,255,0.72)',
                    textDecoration: 'none',
                    textAlign: 'center',
                    padding: '12px 0',
                    border: '1px solid rgba(255,255,255,0.15)',
                    borderRadius: 8,
                  }}
                >
                  Sign In
                </Link>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 600,
                    fontSize: 15,
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    background: '#F97316',
                    padding: '13px 24px',
                    borderRadius: 8,
                    textAlign: 'center',
                    boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
                  }}
                >
                  Get started
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
