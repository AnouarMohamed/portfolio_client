import { useCms } from '../../cms/useCms';

export function TrustBar() {
  const {
    content: { home },
  } = useCms();

  return (
    <section className="px-6 py-6">
      <div className="mx-auto max-w-7xl rounded-full border border-brand-ink/8 bg-white/60 px-6 py-4 shadow-sm backdrop-blur-sm">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-muted">
            Recent collaborators and portfolio categories
          </p>
          <div className="flex flex-wrap items-center gap-5 text-sm font-semibold uppercase tracking-[0.2em] text-brand-ink/70">
            {home.trustMarks.map((mark) => (
              <span key={mark}>{mark}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
