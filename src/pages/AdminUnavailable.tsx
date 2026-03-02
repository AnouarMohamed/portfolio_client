import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';

export default function AdminUnavailable() {
  usePageMeta({
    title: 'Editor Unavailable',
    description: 'This Vercel branch ships as a static portfolio, so the private editor is not available here.',
  });

  return (
    <div className="min-h-screen px-6 pb-24 pt-32">
      <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-brand-ink/8 bg-white/80 p-10 shadow-2xl shadow-brand-ink/5 backdrop-blur-sm md:p-16">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent">
          Static deployment
        </p>
        <h1 className="mb-6 text-4xl font-serif md:text-6xl">
          The private editor is disabled on this Vercel branch.
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-brand-muted">
          This deployment is meant to be a clean public portfolio that works on Vercel without
          the Express, SQLite, auth, and custom analytics stack. The interactive editor still
          lives in the full-stack branch.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/"
            className="inline-flex rounded-full bg-brand-ink px-6 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-white transition-colors hover:bg-brand-accent"
          >
            Back to home
          </Link>
          <a
            href="https://github.com/AnouarMohamed/portfolio_client/tree/main"
            target="_blank"
            rel="noreferrer"
            className="inline-flex rounded-full border border-brand-ink/10 px-6 py-4 text-sm font-semibold uppercase tracking-[0.25em] text-brand-ink transition-colors hover:border-brand-accent hover:text-brand-accent"
          >
            Open full-stack branch
          </a>
        </div>
      </div>
    </div>
  );
}
