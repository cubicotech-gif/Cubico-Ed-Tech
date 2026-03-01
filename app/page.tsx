import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import LogoMarquee from '@/components/home/LogoMarquee';
import ServicesGrid from '@/components/home/ServicesGrid';
import HowItWorks from '@/components/home/HowItWorks';
import DemoPreview from '@/components/home/DemoPreview';
import PortfolioPreview from '@/components/home/PortfolioPreview';
import LanguagesSection from '@/components/home/LanguagesSection';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: "Cubico Technologies — Pakistan's Premier EdTech Agency",
  description:
    'Karachi-based EdTech agency delivering Moodle LMS, educational animations, school ERPs, and multilingual content in English, Urdu & Arabic.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoMarquee />
      <ServicesGrid />
      <HowItWorks />
      <DemoPreview />
      <PortfolioPreview />
      <LanguagesSection />
      <CTASection />
    </>
  );
}
