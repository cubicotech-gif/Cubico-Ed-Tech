import Link from 'next/link';

const footerLinks = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card-bg/50">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo + tagline */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center flex-shrink-0">
            <span className="font-syne font-bold text-xs text-white">C</span>
          </div>
          <div className="leading-none">
            <div className="font-syne font-bold text-white text-sm">Cubico Technologies</div>
            <div className="text-muted text-[0.6rem] uppercase tracking-widest mt-0.5">
              EdTech Agency · Karachi
            </div>
          </div>
        </div>

        {/* Links */}
        <nav className="flex items-center gap-6">
          {footerLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-muted hover:text-text text-sm font-dm transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p className="text-muted text-xs font-dm">
          © {new Date().getFullYear()} Cubico Technologies. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
