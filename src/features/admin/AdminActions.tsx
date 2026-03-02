import { Plus, Trash2 } from 'lucide-react';

interface AdminActionButtonProps {
  label: string;
  onClick: () => void;
}

export function AdminAddButton({ label, onClick }: AdminActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-brand-ink/10 px-4 py-2 text-sm font-semibold text-brand-ink transition-colors hover:border-brand-accent"
    >
      <Plus size={16} />
      {label}
    </button>
  );
}

export function AdminRemoveButton({
  label = 'Remove',
  onClick,
}: AdminActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
    >
      <Trash2 size={16} />
      {label}
    </button>
  );
}
