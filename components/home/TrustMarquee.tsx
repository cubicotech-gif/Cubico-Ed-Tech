'use client';

const ITEMS = [
  { flag: '🇵🇰', text: 'Pakistan · 3 Schools' },
  { flag: '🇸🇦', text: 'Saudi Arabia' },
  { flag: '🇨🇦', text: 'Canada' },
  { flag: '🏫', text: '5+ Institutions' },
  { flag: '🌍', text: '3 Countries' },
  { flag: '🎬', text: 'Arabic & English Content' },
  { flag: '🚀', text: 'Live in 4 Weeks' },
  { flag: '🎓', text: 'K-12 & Higher Ed' },
  { flag: '⭐', text: '100% Client Retention' },
];

const DOUBLED = [...ITEMS, ...ITEMS];

export default function TrustMarquee() {
  return (
    <section
      style={{
        backgroundColor: '#18181B',
        padding: '14px 0 16px',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <p
        style={{
          textAlign: 'center',
          fontFamily: 'var(--font-ui)',
          fontSize: 10,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.2)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          margin: '0 0 12px',
        }}
      >
        Trusted by institutions across
      </p>

      <div className="marquee-track" style={{ display: 'inline-flex', gap: 0 }}>
        {DOUBLED.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              fontFamily: 'var(--font-ui)',
              fontSize: 13,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.48)',
              padding: '0 24px',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: 14 }}>{item.flag}</span>
            {item.text}
            <span
              style={{
                display: 'inline-block',
                width: 3,
                height: 3,
                borderRadius: '50%',
                backgroundColor: '#F97316',
                opacity: 0.6,
                marginLeft: 24,
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>
    </section>
  );
}
