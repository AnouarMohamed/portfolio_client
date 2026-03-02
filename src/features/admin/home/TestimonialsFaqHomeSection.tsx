import type { ContentIntro } from '../../../cms/schema';
import type { FAQItem, Testimonial } from '../../../types';
import { AdminAddButton, AdminRemoveButton } from '../AdminActions';
import { AdminInput, AdminTextarea } from '../AdminField';
import { AdminSection } from '../AdminSection';
import { createId, patchById, removeById } from '../admin.utils';

interface TestimonialsFaqHomeSectionProps {
  testimonialsIntro: ContentIntro;
  testimonials: Testimonial[];
  faqIntro: ContentIntro;
  faqs: FAQItem[];
  onTestimonialsIntroChange: (intro: ContentIntro) => void;
  onTestimonialsChange: (testimonials: Testimonial[]) => void;
  onFaqIntroChange: (intro: ContentIntro) => void;
  onFaqsChange: (faqs: FAQItem[]) => void;
}

const eyebrowFields = [
  ['testimonials', 'Testimonials eyebrow'],
  ['faq', 'FAQ eyebrow'],
] as const;

export function TestimonialsFaqHomeSection({
  faqIntro,
  faqs,
  onFaqIntroChange,
  onFaqsChange,
  onTestimonialsChange,
  onTestimonialsIntroChange,
  testimonials,
  testimonialsIntro,
}: TestimonialsFaqHomeSectionProps) {
  const patchTestimonial = (id: string, patch: Partial<Testimonial>) => {
    onTestimonialsChange(patchById(testimonials, id, patch));
  };
  const patchFaq = (id: string, patch: Partial<FAQItem>) => {
    onFaqsChange(patchById(faqs, id, patch));
  };

  return (
    <AdminSection title="Testimonials and FAQ">
      <div className="grid gap-4 md:grid-cols-2">
        {eyebrowFields.map(([section, label]) => {
          const current = section === 'testimonials' ? testimonialsIntro : faqIntro;
          const onChange = section === 'testimonials' ? onTestimonialsIntroChange : onFaqIntroChange;

          return (
            <AdminInput
              key={section}
              label={label}
              value={current.eyebrow}
              onChange={(event) => onChange({ ...current, eyebrow: event.target.value })}
            />
          );
        })}
        <AdminTextarea
          label="Testimonials title"
          rows={2}
          value={testimonialsIntro.title}
          onChange={(event) => onTestimonialsIntroChange({
            ...testimonialsIntro,
            title: event.target.value,
          })}
        />
        <AdminTextarea
          label="FAQ title"
          rows={2}
          value={faqIntro.title}
          onChange={(event) => onFaqIntroChange({
            ...faqIntro,
            title: event.target.value,
          })}
        />
      </div>

      <div className="space-y-4">
        {testimonials.map((item) => (
          <div key={item.id} className="space-y-4 rounded-[1.5rem] border border-brand-ink/8 p-4">
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
              <AdminInput
                label="Author"
                value={item.author}
                onChange={(event) => patchTestimonial(item.id, { author: event.target.value })}
              />
              <AdminInput
                label="Role"
                value={item.role}
                onChange={(event) => patchTestimonial(item.id, { role: event.target.value })}
              />
              <div className="mt-7">
                <AdminRemoveButton
                  label="Remove"
                  onClick={() => onTestimonialsChange(removeById(testimonials, item.id))}
                />
              </div>
            </div>
            <AdminTextarea
              label="Quote"
              rows={3}
              value={item.quote}
              onChange={(event) => patchTestimonial(item.id, { quote: event.target.value })}
            />
          </div>
        ))}
      </div>
      <AdminAddButton
        label="Add testimonial"
        onClick={() => onTestimonialsChange([
          ...testimonials,
          { id: createId('testimonial'), author: 'New author', role: '', quote: '' },
        ])}
      />

      <div className="space-y-4">
        {faqs.map((item) => (
          <div key={item.id} className="space-y-4 rounded-[1.5rem] border border-brand-ink/8 p-4">
            <div className="grid gap-4 md:grid-cols-[1fr_auto]">
              <AdminInput
                label="Question"
                value={item.question}
                onChange={(event) => patchFaq(item.id, { question: event.target.value })}
              />
              <div className="mt-7">
                <AdminRemoveButton
                  label="Remove"
                  onClick={() => onFaqsChange(removeById(faqs, item.id))}
                />
              </div>
            </div>
            <AdminTextarea
              label="Answer"
              rows={3}
              value={item.answer}
              onChange={(event) => patchFaq(item.id, { answer: event.target.value })}
            />
          </div>
        ))}
      </div>
      <AdminAddButton
        label="Add FAQ"
        onClick={() => onFaqsChange([
          ...faqs,
          { id: createId('faq'), question: 'New question', answer: '' },
        ])}
      />
    </AdminSection>
  );
}
