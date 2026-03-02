import type { BlogPost } from '../../types';
import { sortPosts } from '../../cms/selectors';
import { AdminAddButton, AdminRemoveButton } from './AdminActions';
import { AdminInput, AdminSelect, AdminTextarea } from './AdminField';
import { AdminSection } from './AdminSection';
import {
  createEmptyPost,
  mapOptions,
  patchById,
  removeById,
} from './admin.utils';

interface JournalEditorProps {
  posts: BlogPost[];
  onChange: (posts: BlogPost[]) => void;
}

const statusOptions = mapOptions(['published', 'draft']);
const postFields: Array<{ key: 'category' | 'date' | 'sortOrder'; label: string; type?: string }> = [
  { key: 'sortOrder', label: 'Sort order', type: 'number' },
  { key: 'date', label: 'Publish date', type: 'date' },
  { key: 'category', label: 'Category' },
];

export function JournalEditor({ onChange, posts }: JournalEditorProps) {
  const updatePost = (postId: string, patch: Partial<BlogPost>) => {
    onChange(patchById(posts, postId, patch));
  };

  return (
    <div className="space-y-6">
      <AdminSection
        title="Journal posts"
        description="Draft posts stay hidden from visitors until you mark them as published."
      >
        <div className="space-y-6">
          {[...posts].sort(sortPosts).map((post) => (
            <article key={post.id} className="space-y-5 rounded-[1.75rem] border border-brand-ink/8 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-2xl font-serif text-brand-ink">{post.title}</h3>
                <AdminRemoveButton
                  label="Remove"
                  onClick={() => onChange(removeById(posts, post.id))}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <AdminSelect
                  label="Status"
                  value={post.status}
                  options={statusOptions}
                  onChange={(event) => updatePost(post.id, {
                    status: event.target.value as BlogPost['status'],
                  })}
                />
                {postFields.map(({ key, label, type }) => (
                  <AdminInput
                    key={key}
                    label={label}
                    type={type}
                    value={String(post[key])}
                    onChange={(event) => updatePost(post.id, {
                      [key]: type === 'number'
                        ? Number(event.target.value) || 0
                        : event.target.value,
                    } as Partial<BlogPost>)}
                  />
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <AdminInput
                  label="Title"
                  value={post.title}
                  onChange={(event) => updatePost(post.id, { title: event.target.value })}
                />
                <AdminInput
                  label="Image URL"
                  value={post.image}
                  onChange={(event) => updatePost(post.id, { image: event.target.value })}
                />
              </div>

              <AdminTextarea
                label="Excerpt"
                rows={3}
                value={post.excerpt}
                onChange={(event) => updatePost(post.id, { excerpt: event.target.value })}
              />
              <AdminTextarea
                label="Content"
                rows={10}
                value={post.content}
                onChange={(event) => updatePost(post.id, { content: event.target.value })}
              />
            </article>
          ))}
        </div>

        <AdminAddButton
          label="Add post"
          onClick={() => onChange([...posts, createEmptyPost(posts.length)])}
        />
      </AdminSection>
    </div>
  );
}
