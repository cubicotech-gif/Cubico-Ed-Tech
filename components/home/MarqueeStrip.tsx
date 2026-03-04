// Pure CSS marquee — no JS, 30s linear infinite
// Spec note: this strip appears between Hero and the ServicesReveal section
export default function MarqueeStrip() {
  const TEXT =
    'MOODLE LMS ✦ 2D ANIMATION ✦ 3D ANIMATION ✦ SCHOOL ERP ✦ MOBILE APPS ✦ CONTENT CREATION ✦ E-LEARNING ✦ ARABIC · URDU · ENGLISH ✦ ';

  // Duplicate content so loop is seamless (combined width = 200% → translate -50%)
  const repeated = TEXT + TEXT;

  return (
    <div
      style={{
        backgroundColor: '#080808',
        borderTop:    '1px solid #2A2520',
        borderBottom: '1px solid #2A2520',
        overflow: 'hidden',
        padding: '18px 0',
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: 'inline-block',
          fontFamily: 'var(--font-accent)',
          fontSize: 14,
          color: '#7A7268',
          letterSpacing: '0.12em',
          whiteSpace: 'nowrap',
        }}
      >
        {repeated}
      </div>
    </div>
  );
}
