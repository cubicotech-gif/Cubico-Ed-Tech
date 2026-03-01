// No hooks → can be a Server Component
const ITEMS = [
  { icon: '🕌', label: 'Madrassa' },
  { icon: '🎓', label: 'University' },
  { icon: '📚', label: 'Coaching Centre' },
  { icon: '🌙', label: 'Hifz Institute' },
  { icon: '🏫', label: 'K-12 School' },
  { icon: '🌐', label: 'E-Learning Platform' },
  { icon: '👨‍💼', label: 'Corporate Training' },
  { icon: '📖', label: 'Seminary' },
  { icon: '🏛️', label: 'College' },
  { icon: '✏️', label: 'Tutoring Centre' },
];

// Double the items so the seam is invisible when the first copy scrolls off
const DOUBLED = [...ITEMS, ...ITEMS];

export default function LogoMarquee() {
  return (
    <section className="py-14 border-y border-border overflow-hidden">
      {/* Title */}
      <p className="text-center text-muted text-xs font-syne font-semibold tracking-widest uppercase mb-8">
        Trusted by institutions across Pakistan
      </p>

      {/* Marquee track */}
      <div
        className="relative"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
        }}
      >
        <div className="flex animate-marquee whitespace-nowrap">
          {DOUBLED.map((item, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2.5 mx-8 text-muted/70 hover:text-text transition-colors duration-200 select-none"
            >
              <span className="text-xl" aria-hidden>
                {item.icon}
              </span>
              <span className="font-syne font-semibold text-sm tracking-wide">{item.label}</span>
              <span className="text-border text-lg font-light" aria-hidden>
                ·
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
