import {
  ArrowRight,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { AdminInput } from './AdminField';

interface AdminLoginViewProps {
  username: string;
  password: string;
  feedback: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => Promise<void>;
}

interface SecurityItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const SECURITY_ITEMS: SecurityItem[] = [
  {
    icon: ShieldCheck,
    title: 'Session-based access',
    description: 'Only authenticated client sessions can open the editor or save changes.',
  },
  {
    icon: LockKeyhole,
    title: 'Protected writes',
    description: 'Admin mutations are guarded server-side before content is accepted.',
  },
  {
    icon: EyeOff,
    title: 'Read-only visitors',
    description: 'Public visitors can view the portfolio, but they cannot alter anything.',
  },
];

function SecurityCard({ description, icon: Icon, title }: SecurityItem) {
  return (
    <article className="rounded-[1.6rem] border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-brand-soft-gold">
        <Icon size={18} />
      </div>
      <h3 className="mt-4 text-xl font-serif text-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/72">{description}</p>
    </article>
  );
}

export function AdminLoginView({
  feedback,
  onPasswordChange,
  onSubmit,
  onUsernameChange,
  password,
  username,
}: AdminLoginViewProps) {
  return (
    <div className="relative min-h-screen overflow-hidden px-6 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgb(197_179_88_/_0.18),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgb(26_26_26_/_0.08),_transparent_28%)]" />

      <div className="relative mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative overflow-hidden rounded-[2.75rem] bg-[linear-gradient(140deg,_#181818_0%,_#1f1d19_50%,_#2a281f_100%)] px-7 py-8 text-white shadow-[0_30px_80px_rgb(26_26_26_/_0.22)] md:px-10 md:py-10">
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

          <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-brand-soft-gold">
            <ShieldCheck size={14} />
            Protected client editor
          </div>

          <h1 className="mt-8 max-w-2xl text-5xl leading-[0.92] md:text-6xl">
            Access the private workspace for content, publishing, and site activity.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/74 md:text-lg">
            This area is reserved for the client. Visitors stay in read-only mode while the editor
            remains behind authenticated access.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {SECURITY_ITEMS.map((item) => (
              <SecurityCard
                key={item.title}
                description={item.description}
                icon={item.icon}
                title={item.title}
              />
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2.75rem] border border-brand-ink/8 bg-white/86 p-7 shadow-[0_30px_70px_rgb(26_26_26_/_0.08)] backdrop-blur md:p-9">
          <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-brand-soft-gold/65 to-transparent" />

          <div className="inline-flex items-center gap-2 rounded-full border border-brand-accent/12 bg-brand-paper/70 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-brand-accent">
            <LockKeyhole size={14} />
            Editor sign in
          </div>

          <h2 className="mt-6 text-4xl leading-[0.96] text-brand-ink md:text-5xl">
            Enter client credentials
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-muted">
            Sign in to edit published content, manage drafts, and review admin analytics from the
            protected workspace.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
              void onSubmit();
            }}
          >
            <div className="grid gap-4">
              <AdminInput
                label="Username"
                type="text"
                value={username}
                onChange={(event) => onUsernameChange(event.target.value)}
                autoComplete="username"
                className="rounded-[1.4rem] border-brand-ink/10 bg-brand-cream/65 px-5 py-4 text-base shadow-[inset_0_1px_0_rgb(255_255_255_/_0.6)]"
                required
              />
              <AdminInput
                label="Password"
                type="password"
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
                autoComplete="current-password"
                className="rounded-[1.4rem] border-brand-ink/10 bg-brand-cream/65 px-5 py-4 text-base shadow-[inset_0_1px_0_rgb(255_255_255_/_0.6)]"
                required
              />
            </div>

            {feedback ? (
              <div
                className="rounded-[1.4rem] border border-red-500/14 bg-red-50 px-4 py-3 text-sm text-red-700"
                aria-live="polite"
              >
                {feedback}
              </div>
            ) : null}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-ink px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-transform transition-colors hover:-translate-y-0.5 hover:bg-brand-accent"
            >
              Access editor
              <ArrowRight size={16} />
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
