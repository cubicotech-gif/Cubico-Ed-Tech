import Link from 'next/link';

const NAV = [
  { href: '/portfolio', label: 'WORK' },
  { href: '/services',  label: 'SERVICES' },
  { href: '/about',     label: 'ABOUT' },
  { href: '/contact',   label: 'CONTACT' },
  { href: 'https://wa.me/923001234567', label: 'WHATSAPP', orange: true, external: true },
];

export default function Footer() {
  return (
    <footer style={{ background: '#030303', borderTop: '1px solid #161616' }}>
      {/* Ghost wordmark */}
      <div style={{ textAlign: 'center', padding: '48px 6% 32px', borderBottom: '1px solid #0d0d0d' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 600, fontSize: 44, color: '#181818', letterSpacing: '-.02em', userSelect: 'none' }}>
          Cubico
        </span>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '28px 6%', borderBottom: '1px solid #0d0d0d', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
        {NAV.map(({ href, label, orange, external }, i) => (
          <div key={href} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && <span style={{ color: '#1e1e1e', fontSize: 10 }}>·</span>}
            {external ? (
              <a href={href} target="_blank" rel="noopener noreferrer"
                style={{ fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 12, letterSpacing: '.15em', color: orange ? '#E8622A' : '#3a3a3a', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => { if (!orange) (e.currentTarget as HTMLElement).style.color = '#888'; }}
                onMouseLeave={e => { if (!orange) (e.currentTarget as HTMLElement).style.color = '#3a3a3a'; }}
              >{label}</a>
            ) : (
              <Link href={href}
                style={{ fontFamily: 'var(--font-ui)', fontWeight: 500, fontSize: 12, letterSpacing: '.15em', color: '#3a3a3a', textDecoration: 'none', transition: 'color .2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#888')}
                onMouseLeave={e => (e.currentTarget.style.color = '#3a3a3a')}
              >{label}</Link>
            )}
          </div>
        ))}
      </nav>

      {/* Legal + Location */}
      <div style={{ padding: '20px 6%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#252525' }}>
          © 2026 Cubico Technologies. All rights reserved.
        </span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: '#252525' }}>
          Karachi, Pakistan · EdTech Agency · Est. 2019
        </span>
      </div>
    </footer>
  );
}
