import type { Metadata } from 'next';
import {
  Fraunces,
  Epilogue,
  Instrument_Sans,
  Bebas_Neue,
  Syne,
  DM_Sans,
} from 'next/font/google';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
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
  weight: ['400', '500', '600', '700'],
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
    default: 'Cubico Technologies | EdTech Solutions for Educational Institutions',
    template: '%s | Cubico Technologies',
  },
  description:
    'Transform your school with management systems, animated lessons, game-based learning, and digital infrastructure. Serving institutions in Pakistan, Saudi Arabia, and beyond. English, Arabic, Urdu.',
  keywords: [
    'edtech solutions', 'school management software', 'educational animation',
    'game-based learning', 'Moodle setup', 'digital transformation schools',
    'Islamic education technology', 'Arabic educational content',
    'EdTech Pakistan', 'EdTech Saudi Arabia',
  ],
  openGraph: {
    title: 'Cubico Technologies — From Chalk-and-Board to World-Class',
    description:
      'Complete EdTech solutions for schools: management, animated content, game-based learning, and digital transformation. One partner, every solution.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Cubico Technologies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cubico Technologies',
    description: 'Complete EdTech solutions for educational institutions. One partner, every solution.',
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
      >
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
