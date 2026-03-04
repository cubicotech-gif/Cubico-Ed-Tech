// Pure CSS marquee — no JS, 42s linear infinite (elegant, premium pace)
// Spec note: appears between Hero and ServicesReveal

const ITEMS = [
  'MOODLE LMS',
  '2D ANIMATION',
  '3D ANIMATION',
  'SCHOOL ERP',
  'MOBILE APPS',
  'CONTENT CREATION',
  'E-LEARNING',
  'ARABIC · URDU · ENGLISH',
];

export default function MarqueeStrip() {
  // Duplicate for seamless loop
  const repeated = [...ITEMS, ...ITEMS];

  return (
    <div
      style={{
        backgroundColor: '#080808',
        borderTop:    '1px solid #2A2520',
        borderBottom: '1px solid #2A2520',
        overflow: 'hidden',
        padding: '20px 0',
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0,
          whiteSpace: 'nowrap',
        }}
      >
        {repeated.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontWeight: 500,
                fontSize: 12,
                color: '#8A8278',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '0 28px',
              }}
            >
              {item}
            </span>
            {/* Fire orange separator — psychological warmth & energy */}
            <span
              aria-hidden="true"
              style={{
                fontFamily: 'var(--font-accent)',
                fontSize: 10,
                color: '#E8622A',
                opacity: 0.65,
                lineHeight: 1,
              }}
            >
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
