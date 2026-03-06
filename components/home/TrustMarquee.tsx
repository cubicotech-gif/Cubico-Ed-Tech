'use client';

const ITEMS = [
  '🇵🇰 Pakistan · 3 Schools',
  '🇸🇦 Saudi Arabia · 1 Institution',
  '🇨🇦 Canada · 1 Foundation',
  '🏫 Conventional & Islamic',
  '🎬 Arabic & English Content',
  '🚀 5+ Institutions Transformed',
  '🌍 3 Countries Reached',
];

const DOUBLED = [...ITEMS, ...ITEMS];

export default function TrustMarquee() {
  return (
    <section
      style={{
        backgroundColor: '#0C1528',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '20px 0',
        overflow: 'hidden',
      }}
    >
      <div className="marquee-track" style={{ display: 'inline-flex', gap: 0 }}>
        {DOUBLED.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 14,
              fontWeight: 500,
              color: '#64748B',
              padding: '0 32px',
              whiteSpace: 'nowrap',
              borderRight: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
