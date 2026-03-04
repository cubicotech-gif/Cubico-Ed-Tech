'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';

// ── HeroNav ───────────────────────────────────────────────────────────────────
// Fixed, frosted glass nav. Slides down on mount.
// Active nav links get a fire dot above them.

const NAV_LINKS = [
  { label: 'Work',     href: '/portfolio' },
  { label: 'Services', href: '/services'  },
  { label: 'About',    href: '/about'     },
  { label: 'Contact',  href: '/contact'   },
];

function NavLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: 'var(--font-ui)',
        fontWeight: 600,
        fontSize: 11,
        color: hovered ? 'var(--dark-text-primary)' : 'var(--dark-text-muted)',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        position: 'relative',
        paddingBottom: 3,
        transition: 'color 0.2s ease',
      }}
    >
      {label}
      {/* Underline */}
      <motion.span
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 1,
          backgroundColor: 'var(--blue)',
          transformOrigin: 'left',
          display: 'block',
        }}
      />
    </Link>
  );
}

export default function HeroNav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 72,
        zIndex: 50,
        backgroundColor: 'rgba(10,15,30,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--dark-line)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5%',
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Fire square */}
        <div style={{ width: 8, height: 8, backgroundColor: 'var(--blue)', borderRadius: 2, flexShrink: 0 }} />
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: 'var(--dark-text-primary)', letterSpacing: '-0.02em', lineHeight: 1 }}>
            Cubico
          </div>
          <div style={{ fontFamily: 'var(--font-stamp)', fontSize: 9, color: 'var(--dark-text-muted)', letterSpacing: '0.4em' }}>
            EDTECH AGENCY
          </div>
        </div>
      </Link>

      {/* Center nav links */}
      <div style={{ display: 'flex', gap: 36 }}>
        {NAV_LINKS.map((link) => (
          <NavLink key={link.label} label={link.label} href={link.href} />
        ))}
      </div>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Language toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 11, color: 'var(--blue)' }}>EN</span>
          <span style={{ width: 1, height: 16, backgroundColor: 'var(--dark-line2)', display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 11, color: 'var(--dark-text-muted)' }}>عر</span>
        </div>

        {/* CTA */}
        <CTAButton />
      </div>
    </motion.nav>
  );
}

function CTAButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="large"
      style={{
        fontFamily: 'var(--font-ui)',
        fontWeight: 800,
        fontSize: 12,
        color: '#fff',
        backgroundColor: hovered ? 'var(--blue-dark)' : 'var(--blue)',
        borderRadius: 2,
        padding: '11px 24px',
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        transition: 'background 0.2s ease',
        whiteSpace: 'nowrap',
      }}
    >
      Start a Project
      <motion.span
        animate={{ x: hovered ? 5 : 0 }}
        transition={{ duration: 0.2 }}
        style={{ display: 'inline-block' }}
      >
        →
      </motion.span>
    </Link>
  );
}
