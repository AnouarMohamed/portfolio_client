export function AdminLoadingView() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="rounded-[2rem] border border-brand-ink/8 bg-white/85 p-10 text-center shadow-xl shadow-brand-ink/5">
        <div className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent">
          Secure editor
        </div>
        <h1 className="text-4xl font-serif">Checking session...</h1>
      </div>
    </div>
  );
}
