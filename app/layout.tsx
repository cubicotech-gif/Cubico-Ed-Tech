import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// ── Root metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default: 'Cubico Technologies — EdTech Agency',
    template: '%s | Cubico Technologies',
  },
  description:
    'Karachi-based EdTech agency delivering Moodle LMS setups, educational animations, digital apps, and multilingual content in English, Urdu, and Arabic.',
  keywords: [
    'EdTech',
    'Moodle LMS',
    'educational animations',
    'school management system',
    'e-learning',
    'Karachi',
    'Pakistan',
    'Arabic',
    'Urdu',
    'educational content',
  ],
  openGraph: {
    title: 'Cubico Technologies — EdTech Agency',
    description:
      'Building the future of education technology. Moodle LMS, animations, apps, and educational content.',
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
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts — loaded at runtime so no build-time network needed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
