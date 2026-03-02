import { useCms } from '../../cms/useCms';

export function FaqSection() {
  const {
    content: { home },
  } = useCms();

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent">
            {home.faqIntro.eyebrow}
          </p>
          <h2 className="text-5xl font-serif md:text-6xl">{home.faqIntro.title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {home.faqs.map((item) => (
            <article key={item.id} className="rounded-[2rem] border border-brand-ink/8 bg-white/80 p-8 shadow-lg shadow-brand-ink/5">
              <h3 className="mb-4 text-2xl font-serif">{item.question}</h3>
              <p className="leading-relaxed text-brand-muted">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
