import type { Metadata } from 'next';
import {
  Fraunces,
  Epilogue,
  Instrument_Sans,
  Bebas_Neue,
  Syne,
  DM_Sans,
} from 'next/font/google';
import CustomCursor    from '@/components/CustomCursor';
import Navbar          from '@/components/Navbar';
import Footer          from '@/components/Footer';
import ScrollProgress  from '@/components/ScrollProgress';
import './globals.css';

// ── Editorial typefaces (new design system) ───────────────────────────────────

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const epilogue = Epilogue({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-ui',
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-accent',
  display: 'swap',
});

// ── Legacy typefaces (used by other pages / components) ───────────────────────

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm',
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
    <html lang="en">
      <body
        className={[
          fraunces.variable,
          epilogue.variable,
          instrumentSans.variable,
          bebasNeue.variable,
          syne.variable,
          dmSans.variable,
        ].join(' ')}
        style={{ cursor: 'none' }}
      >
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
