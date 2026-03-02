import { ShieldCheck } from 'lucide-react';
import { AdminInput } from './AdminField';

interface AdminLoginViewProps {
  username: string;
  password: string;
  feedback: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: () => Promise<void>;
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
    <div className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl rounded-[2.5rem] border border-brand-ink/8 bg-white/90 p-8 shadow-2xl shadow-brand-ink/5 md:p-12">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-accent/15 bg-brand-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent">
          <ShieldCheck size={14} />
          Client-only editor
        </div>
        <h1 className="mb-4 text-5xl font-serif leading-[0.95]">Website content access</h1>
        <p className="mb-8 max-w-lg text-lg leading-relaxed text-brand-muted">
          Visitors can only read the portfolio. Editing requires the client credentials configured on the server.
        </p>

        <form
          className="space-y-5"
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
              required
            />
            <AdminInput
              label="Password"
              type="password"
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {feedback ? (
            <p className="text-sm text-red-600" aria-live="polite">
              {feedback}
            </p>
          ) : null}

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-brand-ink px-6 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-white transition-colors hover:bg-brand-accent"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
