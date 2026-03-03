'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { tokens } from '@/lib/tokens';

const { colors: C, ease } = tokens;

const NAV_LINKS = [
  { href: '/portfolio', label: 'Work' },
  { href: '/services',  label: 'Services' },
  { href: '/about',     label: 'About' },
  { href: '/contact',   label: 'Contact' },
];

// ── Nav link with animated underline ─────────────────────────────────────────
function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-ui)',
        fontWeight: 500,
        fontSize: 11,
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        color: hovered ? C.ivory : C.muted,
        textDecoration: 'none',
        position: 'relative' as const,
        paddingBottom: 2,
        transition: 'color 0.2s ease',
      }}
    >
      {label}
      <motion.span
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 2,
          backgroundColor: C.fire,
          transformOrigin: 'left',
          display: 'block',
        }}
      />
    </Link>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 68,
        zIndex: 1000,
        backgroundColor: scrolled ? 'rgba(5,5,5,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.line}` : '1px solid transparent',
        transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
      }}
    >
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '0 6%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* ── Logo ── */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 19,
              color: C.ivory,
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            Cubico
          </span>
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: 9,
              letterSpacing: '0.35em',
              color: C.muted,
              lineHeight: 1,
            }}
          >
            EDTECH AGENCY
          </span>
        </Link>

        {/* ── Center nav links (desktop) ── */}
        <div
          className="hidden md:flex"
          style={{ gap: 36, alignItems: 'center' }}
        >
          {NAV_LINKS.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </div>

        {/* ── Right side: language toggle + CTA ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Language toggle */}
          <Link
            href="/ar"
            data-cursor="large"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              textDecoration: 'none',
            }}
            className="hidden md:flex"
          >
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                fontSize: 11,
                color: C.ivory,
              }}
            >
              EN
            </span>
            <span style={{ color: C.bronze, opacity: 0.4, fontSize: 11 }}>·</span>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 600,
                fontSize: 11,
                color: C.bronze,
              }}
            >
              عر
            </span>
          </Link>

          {/* CTA button */}
          <Link
            href="/contact"
            data-cursor="large"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: C.fire,
              color: '#fff',
              fontFamily: 'var(--font-ui)',
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              textDecoration: 'none',
              padding: '10px 22px',
              borderRadius: 2,
              transition: 'background-color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = '#cf5020';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = C.fire;
            }}
          >
            Start a Project
            <motion.span
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'inline-block' }}
            >
              →
            </motion.span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
