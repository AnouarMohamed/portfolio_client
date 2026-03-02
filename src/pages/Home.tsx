import { DifferentiatorsSection } from '../features/home/DifferentiatorsSection';
import { FaqSection } from '../features/home/FaqSection';
import { FeaturedProjectsSection } from '../features/home/FeaturedProjectsSection';
import { FinalCtaSection } from '../features/home/FinalCtaSection';
import { HeroSection } from '../features/home/HeroSection';
import { ProcessSection } from '../features/home/ProcessSection';
import { ServicesSection } from '../features/home/ServicesSection';
import { TestimonialsSection } from '../features/home/TestimonialsSection';
import { TrustBar } from '../features/home/TrustBar';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Home() {
  usePageMeta({
    title: 'Strategy-led portfolio design',
  });

  return (
    <>
      <HeroSection />
      <TrustBar />
      <ServicesSection />
      <FeaturedProjectsSection />
      <DifferentiatorsSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}
