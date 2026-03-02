import { useCms } from '../../cms/useCms';

export function FaqSection() {
  const {
    content: { home },
  } = useCms();

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl sm:mb-14">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-accent sm:text-xs sm:tracking-[0.35em]">
            {home.faqIntro.eyebrow}
          </p>
          <h2 className="text-3xl font-serif sm:text-4xl md:text-6xl">{home.faqIntro.title}</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {home.faqs.map((item) => (
            <article key={item.id} className="rounded-[2rem] border border-brand-ink/8 bg-white/80 p-6 shadow-lg shadow-brand-ink/5 sm:p-8">
              <h3 className="mb-4 text-xl font-serif sm:text-2xl">{item.question}</h3>
              <p className="leading-relaxed text-brand-muted">{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
