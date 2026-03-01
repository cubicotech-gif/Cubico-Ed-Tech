import Link from 'next/link';

const LINKS = [
  { href: '/portfolio', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-void border-t border-rule">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 pt-14 pb-8">

        {/* Three-column row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 items-start mb-12">

          {/* Left — wordmark + tagline */}
          <div>
            <Link
              href="/"
              className="font-display font-semibold italic text-[2.5rem] text-ivory leading-none tracking-tight hover:text-fire transition-colors duration-300 block"
            >
              Cubico
            </Link>
            <p className="font-body text-[13px] text-warm-gray mt-3 leading-relaxed">
              EdTech Agency · Karachi, Pakistan
            </p>
          </div>

          {/* Center — links */}
          <nav className="flex flex-col md:flex-row md:items-center md:justify-center gap-3 md:gap-8">
            {LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="font-ui font-medium text-[14px] text-warm-gray hover:text-ivory transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right — email */}
          <div className="md:text-right">
            <a
              href="mailto:info@cubico.tech"
              className="font-ui font-medium text-[14px] text-fire hover:text-fire/70 transition-colors"
            >
              info@cubico.tech
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-rule pt-6">
          <p className="font-body text-[11px] text-warm-gray/50 text-center tracking-[0.05em]">
            © {new Date().getFullYear()} Cubico Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
