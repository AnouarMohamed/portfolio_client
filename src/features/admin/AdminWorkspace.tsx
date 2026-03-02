import { startTransition, type ReactNode } from 'react';
import { LogOut, RefreshCcw, Save } from 'lucide-react';
import { formatAdminTimestamp } from './admin.utils';
import { ADMIN_TABS, type AdminTab } from './admin.constants';

interface AdminWorkspaceProps {
  activeTab: AdminTab;
  updatedAt: string | null;
  feedback: string;
  isRefreshing: boolean;
  isSaving: boolean;
  onTabChange: (tab: AdminTab) => void;
  onRefresh: () => Promise<void>;
  onSave: () => Promise<void>;
  onLogout: () => Promise<void>;
  children: ReactNode;
}

export function AdminWorkspace({
  activeTab,
  children,
  feedback,
  isRefreshing,
  isSaving,
  onLogout,
  onRefresh,
  onSave,
  onTabChange,
  updatedAt,
}: AdminWorkspaceProps) {
  return (
    <div className="px-6 pb-16 pt-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-6 rounded-[2.5rem] border border-brand-ink/8 bg-white/85 p-6 shadow-xl shadow-brand-ink/5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-accent">
              Client editor
            </div>
            <h1 className="text-5xl font-serif leading-[0.95]">Manage website content</h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-brand-muted">
              Save changes here to update the live portfolio content. Published items are public; drafts stay hidden.
            </p>
          </div>
          <div className="space-y-2 text-sm text-brand-muted md:text-right">
            <div>Last saved: {formatAdminTimestamp(updatedAt)}</div>
            {feedback ? <div className="text-brand-ink">{feedback}</div> : null}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          {ADMIN_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => startTransition(() => onTabChange(tab.id))}
              className={`rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.28em] transition-colors ${
                activeTab === tab.id
                  ? 'bg-brand-ink text-white'
                  : 'border border-brand-ink/10 bg-white/80 text-brand-muted hover:border-brand-accent hover:text-brand-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mb-6">{children}</div>

        <div className="sticky bottom-6 flex flex-wrap items-center justify-between gap-3 rounded-[2rem] border border-brand-ink/8 bg-brand-cream/95 p-4 shadow-2xl shadow-brand-ink/10 backdrop-blur">
          <div className="text-sm text-brand-muted">
            Refresh if someone else changed content directly in the database or from another browser.
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void onRefresh()}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 rounded-full border border-brand-ink/10 bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCcw size={16} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button
              type="button"
              onClick={() => void onSave()}
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-full bg-brand-ink px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} />
              {isSaving ? 'Saving...' : 'Save changes'}
            </button>
            <button
              type="button"
              onClick={() => void onLogout()}
              className="inline-flex items-center gap-2 rounded-full border border-brand-ink/10 bg-white px-5 py-3 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-accent"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
