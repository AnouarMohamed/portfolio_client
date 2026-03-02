import type { CmsHomeContent } from '../../cms/schema';
import { FeaturedHomeSection } from './home/FeaturedHomeSection';
import { HeroHomeSection } from './home/HeroHomeSection';
import { NarrativeHomeSection } from './home/NarrativeHomeSection';
import { ServicesHomeSection } from './home/ServicesHomeSection';
import { StatsHomeSection } from './home/StatsHomeSection';
import { TestimonialsFaqHomeSection } from './home/TestimonialsFaqHomeSection';

interface HomeContentEditorProps {
  home: CmsHomeContent;
  onChange: (home: CmsHomeContent) => void;
}

export function HomeContentEditor({ home, onChange }: HomeContentEditorProps) {
  const updateHome = <Key extends keyof CmsHomeContent>(key: Key, value: CmsHomeContent[Key]) => {
    onChange({
      ...home,
      [key]: value,
    });
  };

  return (
    <div className="space-y-6">
      <HeroHomeSection hero={home.hero} onChange={(hero) => updateHome('hero', hero)} />
      <StatsHomeSection
        stats={home.stats}
        trustMarks={home.trustMarks}
        onStatsChange={(stats) => updateHome('stats', stats)}
        onTrustMarksChange={(trustMarks) => updateHome('trustMarks', trustMarks)}
      />
      <ServicesHomeSection
        intro={home.servicesIntro}
        services={home.services}
        onIntroChange={(servicesIntro) => updateHome('servicesIntro', servicesIntro)}
        onServicesChange={(services) => updateHome('services', services)}
      />
      <FeaturedHomeSection
        featuredIntro={home.featuredIntro}
        finalCta={home.finalCta}
        onFeaturedIntroChange={(featuredIntro) => updateHome('featuredIntro', featuredIntro)}
        onFinalCtaChange={(finalCta) => updateHome('finalCta', finalCta)}
      />
      <NarrativeHomeSection
        differentiators={home.differentiators}
        differentiatorsIntro={home.differentiatorsIntro}
        process={home.process}
        processIntro={home.processIntro}
        onDifferentiatorsChange={(differentiators) => updateHome('differentiators', differentiators)}
        onDifferentiatorsIntroChange={(differentiatorsIntro) =>
          updateHome('differentiatorsIntro', differentiatorsIntro)
        }
        onProcessChange={(process) => updateHome('process', process)}
        onProcessIntroChange={(processIntro) => updateHome('processIntro', processIntro)}
      />
      <TestimonialsFaqHomeSection
        faqIntro={home.faqIntro}
        faqs={home.faqs}
        onFaqIntroChange={(faqIntro) => updateHome('faqIntro', faqIntro)}
        onFaqsChange={(faqs) => updateHome('faqs', faqs)}
        onTestimonialsChange={(testimonials) => updateHome('testimonials', testimonials)}
        onTestimonialsIntroChange={(testimonialsIntro) =>
          updateHome('testimonialsIntro', testimonialsIntro)
        }
        testimonials={home.testimonials}
        testimonialsIntro={home.testimonialsIntro}
      />
    </div>
  );
}
