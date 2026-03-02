import { Link as LinkIcon, Linkedin, Share2, Twitter } from 'lucide-react';
import { useState } from 'react';

interface PostShareActionsProps {
  shareText: string;
  shareUrl: string;
}

export function PostShareActions({ shareText, shareUrl }: PostShareActionsProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const openShareWindow = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const copyLink = async () => {
    if (!shareUrl || !navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(shareUrl);
    setHasCopied(true);
    window.setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-muted">
        <Share2 size={14} /> Share
      </span>
      <button
        type="button"
        onClick={() => openShareWindow(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`)}
        className="rounded-full bg-brand-paper p-2 text-brand-ink transition-colors hover:bg-brand-accent/10"
        aria-label="Share on X"
        title="Share on Twitter"
      >
        <Twitter size={16} />
      </button>
      <button
        type="button"
        onClick={() => openShareWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`)}
        className="rounded-full bg-brand-paper p-2 text-brand-ink transition-colors hover:bg-brand-accent/10"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin size={16} />
      </button>
      <button
        type="button"
        onClick={copyLink}
        className="rounded-full bg-brand-paper p-2 text-brand-ink transition-colors hover:bg-brand-accent/10"
        aria-label={hasCopied ? 'Link copied' : 'Copy link'}
        title={hasCopied ? 'Link copied' : 'Copy link'}
      >
        <LinkIcon size={16} />
      </button>
    </div>
  );
}
