import type { Metadata } from 'next';
import {
  DM_Sans,
  DM_Serif_Display,
  Space_Grotesk,
  Instrument_Serif,
} from 'next/font/google';
import { CursorDot }     from '@/components/ui/CursorDot';
import { GrainOverlay }  from '@/components/ui/GrainOverlay';
import HeroNav           from '@/components/home/Hero/HeroNav';
import Footer            from '@/components/Footer';
import ScrollProgress    from '@/components/ScrollProgress';
import './globals.css';

// ── Precision White design system typefaces ───────────────────────────────────

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});

// ── Metadata ──────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: 'Cubico Technologies — EdTech Agency',
    template: '%s | Cubico Technologies',
  },
  description:
    'Karachi-based EdTech agency delivering Moodle LMS setups, educational animations, digital apps, and multilingual content in English, Urdu, and Arabic.',
  keywords: [
    'EdTech', 'Moodle LMS', 'educational animations', 'school management system',
    'e-learning', 'Karachi', 'Pakistan', 'Arabic', 'Urdu', 'educational content',
  ],
  openGraph: {
    title: 'Cubico Technologies — EdTech Agency',
    description: 'Building the future of education technology.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Cubico Technologies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cubico Technologies',
    description: 'Premium EdTech solutions for educational institutions.',
  },
  robots: { index: true, follow: true },
};

// ── Root layout ───────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={[
        dmSans.variable,
        dmSerifDisplay.variable,
        spaceGrotesk.variable,
        instrumentSerif.variable,
      ].join(' ')}
    >
      <body style={{ cursor: 'none' }}>
        <CursorDot />
        <GrainOverlay />
        <ScrollProgress />
        <HeroNav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
