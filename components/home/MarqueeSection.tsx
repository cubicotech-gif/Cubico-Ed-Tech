// Pure CSS marquee — no client JS needed
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

const SEPARATOR = '  ✦  ';

// Duplicate for seamless loop
const DOUBLED = [...ITEMS, ...ITEMS];

export default function MarqueeSection() {
  return (
    <div className="border-y border-rule bg-void">
      {/* Top rule is border-t of this div */}

      <div className="marquee-root overflow-hidden py-5 cursor-default select-none">
        <div className="animate-marquee whitespace-nowrap inline-flex items-center">
          {DOUBLED.map((item, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="font-accent text-[18px] text-warm-gray tracking-[0.08em]">
                {item}
              </span>
              <span className="font-accent text-[18px] text-rule/60 mx-7">{SEPARATOR}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
