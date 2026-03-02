import type { ContentIntro, FinalCtaContent } from '../../../cms/schema';
import { AdminInput, AdminTextarea } from '../AdminField';
import { AdminSection } from '../AdminSection';

interface FeaturedHomeSectionProps {
  featuredIntro: ContentIntro;
  finalCta: FinalCtaContent;
  onFeaturedIntroChange: (featuredIntro: ContentIntro) => void;
  onFinalCtaChange: (finalCta: FinalCtaContent) => void;
}

const featuredFields = [
  ['eyebrow', 'Featured eyebrow'],
  ['ctaLabel', 'Featured CTA label'],
  ['title', 'Featured title'],
  ['ctaHref', 'Featured CTA link'],
] as const;
const finalCtaFields = [
  ['eyebrow', 'Final CTA eyebrow'],
  ['buttonLabel', 'Final CTA button label'],
  ['title', 'Final CTA title'],
  ['buttonHref', 'Final CTA button link'],
] as const;

export function FeaturedHomeSection({
  featuredIntro,
  finalCta,
  onFeaturedIntroChange,
  onFinalCtaChange,
}: FeaturedHomeSectionProps) {
  return (
    <AdminSection title="Featured work and final CTA">
      <div className="grid gap-4 md:grid-cols-2">
        {featuredFields.map(([field, label]) => (
          <AdminInput
            key={`featured-${field}`}
            label={label}
            value={featuredIntro[field] ?? ''}
            onChange={(event) => onFeaturedIntroChange({
              ...featuredIntro,
              [field]: event.target.value,
            })}
          />
        ))}
        {finalCtaFields.map(([field, label]) => (
          <AdminInput
            key={`final-${field}`}
            label={label}
            value={finalCta[field] ?? ''}
            onChange={(event) => onFinalCtaChange({
              ...finalCta,
              [field]: event.target.value,
            })}
          />
        ))}
      </div>
      <AdminTextarea
        label="Featured description"
        rows={3}
        value={featuredIntro.description ?? ''}
        onChange={(event) => onFeaturedIntroChange({
          ...featuredIntro,
          description: event.target.value,
        })}
      />
      <AdminTextarea
        label="Final CTA description"
        rows={3}
        value={finalCta.description}
        onChange={(event) => onFinalCtaChange({
          ...finalCta,
          description: event.target.value,
        })}
      />
    </AdminSection>
  );
}
