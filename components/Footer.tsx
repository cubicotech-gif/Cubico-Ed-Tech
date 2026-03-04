'use client';

import Link from 'next/link';

// ── "The Stamp" footer — minimal, confident, near-invisible ───────────────────
const NAV_LINKS = [
  { href: '/portfolio', label: 'WORK' },
  { href: '/services', label: 'SERVICES' },
  { href: '/about', label: 'ABOUT' },
  { href: '/contact', label: 'CONTACT' },
  {
    href: 'https://wa.me/923000000000',
    label: 'WHATSAPP',
    isWhatsApp: true,
    external: true,
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-dark)',
        borderTop: '1px solid var(--dark-line)',
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '56px 5% 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 32,
        }}
      >
        {/* Row 1 — Ghost wordmark (watermark confidence) */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 44,
            color: 'var(--dark-line2)',
            textDecoration: 'none',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            userSelect: 'none',
            display: 'block',
          }}
          aria-label="Cubico Technologies — Home"
        >
          Cubico
        </Link>

        {/* Row 2 — Navigation */}
        <nav aria-label="Footer navigation">
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px 0',
            }}
          >
            {NAV_LINKS.map(({ href, label, isWhatsApp, external }, i) => (
              <li key={href} style={{ display: 'flex', alignItems: 'center' }}>
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    style={{ color: 'var(--dark-line2)', fontSize: 12, margin: '0 16px' }}
                  >
                    ·
                  </span>
                )}
                <Link
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 500,
                    fontSize: 12,
                    letterSpacing: '0.15em',
                    color: isWhatsApp ? 'var(--blue)' : 'var(--dark-text-muted)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isWhatsApp)
                      (e.currentTarget as HTMLElement).style.color = 'var(--dark-text-body)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isWhatsApp)
                      (e.currentTarget as HTMLElement).style.color = 'var(--dark-text-muted)';
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Row 3 — Legal + Location */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid var(--dark-line)',
            paddingTop: 24,
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              color: 'var(--dark-text-muted)',
            }}
          >
            &copy; {new Date().getFullYear()} Cubico Technologies. All rights
            reserved.
          </span>
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 11,
              color: 'var(--dark-text-muted)',
            }}
          >
            Karachi, Pakistan&nbsp;&nbsp;·&nbsp;&nbsp;EdTech
            Agency&nbsp;&nbsp;·&nbsp;&nbsp;Est. 2019
          </span>
        </div>
      </div>
    </footer>
  );
}
