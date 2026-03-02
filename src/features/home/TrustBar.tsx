import { useCms } from '../../cms/useCms';

export function TrustBar() {
  const {
    content: { home },
  } = useCms();

  return (
    <section className="px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-brand-ink/8 bg-white/60 px-5 py-4 shadow-sm backdrop-blur-sm sm:rounded-full sm:px-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-muted sm:text-xs sm:tracking-[0.35em]">
            Recent collaborators and portfolio categories
          </p>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-ink/70 sm:gap-5 sm:text-sm sm:tracking-[0.2em]">
            {home.trustMarks.map((mark) => (
              <span key={mark}>{mark}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
