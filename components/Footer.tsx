"use client";

import Link from 'next/link';

const SOLUTIONS = [
  { label: 'Cubico Manage™', href: '/#solutions' },
  { label: 'Cubico Teach™',  href: '/#solutions' },
  { label: 'Cubico Learn™',  href: '/#solutions' },
  { label: 'Cubico Scale™',  href: '/#solutions' },
];

const COMPANY = [
  { label: 'About Us',    href: '/about'     },
  { label: 'Case Studies', href: '/portfolio' },
  { label: 'Blog',        href: '#'          },
  { label: 'Contact',     href: '/contact'   },
];

const CONNECT = [
  { label: 'WhatsApp', href: 'https://wa.me/923001234567' },
  { label: 'LinkedIn',  href: '#' },
  { label: 'Instagram', href: '#' },
  { label: 'Email Us',  href: 'mailto:info@cubico.tech' },
];

const LINK_STYLE = {
  fontFamily: 'var(--font-ui)',
  fontWeight: 400,
  fontSize: 14,
  color: '#64748B',
  textDecoration: 'none',
  display: 'block',
  padding: '4px 0',
  transition: 'color 0.2s ease',
};

function FooterLinkList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {items.map(({ label, href }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={LINK_STYLE}
            onMouseEnter={e => ((e.target as HTMLElement).style.color = '#818CF8')}
            onMouseLeave={e => ((e.target as HTMLElement).style.color = '#64748B')}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#060A15', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '64px 5% 40px',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: 48,
          alignItems: 'start',
        }}
        className="footer-grid"
      >
        {/* Column 1 — Brand */}
        <div>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 700,
              fontSize: 32,
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              display: 'inline-block',
              background: 'linear-gradient(135deg, #818CF8, #7C3AED)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 12,
            }}
          >
            Cubico
          </Link>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 14,
              color: '#64748B',
              lineHeight: 1.7,
              margin: 0,
              marginBottom: 20,
              maxWidth: 260,
            }}
          >
            EdTech solutions that transform institutions from classic to extraordinary.
          </p>
          <div style={{ fontSize: 20, letterSpacing: 4 }}>🇵🇰 🇸🇦 🇨🇦</div>
        </div>

        {/* Column 2 — Solutions */}
        <div>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: '#818CF8', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>
            Solutions
          </p>
          <FooterLinkList items={SOLUTIONS} />
        </div>

        {/* Column 3 — Company */}
        <div>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: '#818CF8', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>
            Company
          </p>
          <FooterLinkList items={COMPANY} />
        </div>

        {/* Column 4 — Connect */}
        <div>
          <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 600, color: '#818CF8', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 16px' }}>
            Connect
          </p>
          <FooterLinkList items={CONNECT} />
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '20px 5%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#64748B', margin: 0 }}>
          © 2026 Cubico Technologies
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#64748B', margin: 0 }}>
          Karachi, Pakistan 🇵🇰
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
