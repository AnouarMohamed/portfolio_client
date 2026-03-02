import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils';

interface JournalPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function JournalPagination({
  currentPage,
  totalPages,
  onPageChange,
}: JournalPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-24 flex items-center justify-center gap-8">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-brand-muted transition-all hover:text-brand-ink disabled:opacity-20"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-ink/10 transition-all group-hover:border-brand-ink group-hover:bg-brand-ink group-hover:text-white">
          <ArrowRight className="rotate-180" size={16} />
        </div>
        <span className="hidden sm:inline">Previous</span>
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold transition-all',
              currentPage === page
                ? 'scale-110 bg-brand-ink text-white shadow-xl shadow-brand-ink/20'
                : 'text-brand-muted hover:bg-brand-paper hover:text-brand-ink'
            )}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="group flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-brand-muted transition-all hover:text-brand-ink disabled:opacity-20"
      >
        <span className="hidden sm:inline">Next</span>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-ink/10 transition-all group-hover:border-brand-ink group-hover:bg-brand-ink group-hover:text-white">
          <ArrowRight size={16} />
        </div>
      </button>
    </div>
  );
}
