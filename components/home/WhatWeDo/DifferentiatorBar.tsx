'use client';

const differentiators = [
  {
    title: 'Deep EdTech Specialisation',
    items: [
      '✓ Moodle-certified LMS architects',
      '✓ Built 50+ courses from scratch',
      '✓ Multilingual: EN · اردو · عربي',
    ],
  },
  {
    title: 'Visual Production Studio',
    items: [
      '✓ 2D & 3D animation in-house',
      '✓ Curriculum-aligned storytelling',
      '✓ Avg. 4-min retention (vs 1-min)',
    ],
  },
  {
    title: 'End-to-End Digital Build',
    items: [
      '✓ Custom ERP + portal development',
      '✓ Mobile-first, PWA-ready',
      '✓ 30-day delivery guarantee',
    ],
  },
  {
    title: 'Karachi-Native Team',
    items: [
      '✓ Urdu & Arabic content writers',
      '✓ Ministry curriculum alignment',
      '✓ On-site training included',
    ],
  },
];

export function DifferentiatorBar() {
  return (
    <div
      style={{
        marginTop: 32,
        borderTop: '2px solid #E8622A',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0,
        background: '#0a0a0a',
        borderRadius: '0 0 8px 8px',
        overflow: 'hidden',
      }}
    >
      {differentiators.map((col, i) => (
        <div
          key={i}
          style={{
            padding: '20px 20px',
            borderRight: i < 3 ? '1px solid #1d1d1d' : 'none',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: '#fff',
              fontFamily: 'var(--font-ui)',
              marginBottom: 10,
              letterSpacing: '0.01em',
            }}
          >
            {col.title}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            {col.items.map((item, j) => (
              <div
                key={j}
                style={{
                  fontSize: 9,
                  color: '#666',
                  fontFamily: 'var(--font-body)',
                  lineHeight: 1.5,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
