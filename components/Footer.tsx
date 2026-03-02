import Link from 'next/link';

const LINKS = [
  { href: '/portfolio', label: 'Work' },
  { href: '/services',  label: 'Services' },
  { href: '/about',     label: 'About' },
  { href: '/contact',   label: 'Contact' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#080808' }}>
      <div style={{ height: 1, backgroundColor: '#2A2520' }} />

      {/* Main 3-column grid */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '56px 5%',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 40,
          alignItems: 'start',
        }}
        className="grid-cols-1 md:grid-cols-3"
      >
        {/* Left — wordmark + tagline */}
        <div>
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 600,
              fontSize: 36,
              color: '#F0EBE3',
              textDecoration: 'none',
              letterSpacing: '-0.02em',
              display: 'block',
            }}
          >
            Cubico
          </Link>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              color: '#7A7268',
              marginTop: 8,
              lineHeight: 1.6,
            }}
          >
            EdTech Agency · Karachi, Pakistan
          </p>
        </div>

        {/* Center — nav links */}
        <nav style={{ display: 'flex', justifyContent: 'center' }}>
          <ul
            style={{
              listStyle: 'none',
              margin: 0,
              padding: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px 28px',
            }}
          >
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontWeight: 500,
                    fontSize: 14,
                    color: '#7A7268',
                    textDecoration: 'none',
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right — email */}
        <div style={{ textAlign: 'right' }}>
          <a
            href="mailto:info@cubico.tech"
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 14,
              color: '#E8622A',
              textDecoration: 'none',
            }}
          >
            info@cubico.tech
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid #2A2520',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '18px 5%',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            color: '#7A7268',
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} Cubico Technologies. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
