import type { HomeHeroContent } from '../../../cms/schema';
import { AdminInput, AdminTextarea } from '../AdminField';
import { AdminSection } from '../AdminSection';

interface HeroHomeSectionProps {
  hero: HomeHeroContent;
  onChange: (hero: HomeHeroContent) => void;
}

const heroFields: Array<{ key: keyof HomeHeroContent; label: string }> = [
  { key: 'badge', label: 'Badge' },
  { key: 'primaryCtaLabel', label: 'Primary CTA label' },
  { key: 'titleLeading', label: 'Title lead' },
  { key: 'primaryCtaHref', label: 'Primary CTA link' },
  { key: 'titleHighlight', label: 'Title highlight' },
  { key: 'secondaryCtaLabel', label: 'Secondary CTA label' },
  { key: 'titleTrailing', label: 'Title ending' },
  { key: 'secondaryCtaHref', label: 'Secondary CTA link' },
  { key: 'showcaseEyebrow', label: 'Showcase eyebrow' },
  { key: 'showcaseImage', label: 'Showcase image' },
  { key: 'showcaseTitle', label: 'Showcase title' },
  { key: 'showcaseImageAlt', label: 'Showcase alt text' },
];

export function HeroHomeSection({ hero, onChange }: HeroHomeSectionProps) {
  const patchHero = (patch: Partial<HomeHeroContent>) => {
    onChange({
      ...hero,
      ...patch,
    });
  };

  return (
    <AdminSection title="Hero">
      <div className="grid gap-4 md:grid-cols-2">
        {heroFields.map(({ key, label }) => (
          <AdminInput
            key={key}
            label={label}
            value={hero[key]}
            onChange={(event) => patchHero({ [key]: event.target.value } as Partial<HomeHeroContent>)}
          />
        ))}
      </div>
      <AdminTextarea
        label="Hero description"
        rows={3}
        value={hero.description}
        onChange={(event) => patchHero({ description: event.target.value })}
      />
      <AdminTextarea
        label="Showcase description"
        rows={3}
        value={hero.showcaseDescription}
        onChange={(event) => patchHero({ showcaseDescription: event.target.value })}
      />
    </AdminSection>
  );
}
