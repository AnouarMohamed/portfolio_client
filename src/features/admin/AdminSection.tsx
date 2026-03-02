import type { ReactNode } from 'react';

interface AdminSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function AdminSection({ children, description, title }: AdminSectionProps) {
  return (
    <section className="rounded-[2rem] border border-brand-ink/8 bg-white/80 p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-serif text-brand-ink">{title}</h2>
        {description ? <p className="mt-2 max-w-3xl text-sm text-brand-muted">{description}</p> : null}
      </div>
      <div className="space-y-6">{children}</div>
    </section>
  );
}
