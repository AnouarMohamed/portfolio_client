import { ADMIN_ICON_OPTIONS } from '../../../cms/icons';
import type { ContentIntro, DifferentiatorItem } from '../../../cms/schema';
import type { IconKey, ProcessStep } from '../../../types';
import { AdminAddButton, AdminRemoveButton } from '../AdminActions';
import { AdminInput, AdminSelect, AdminTextarea } from '../AdminField';
import { AdminSection } from '../AdminSection';
import { createId, mapOptions, patchById, removeById } from '../admin.utils';

interface NarrativeHomeSectionProps {
  differentiatorsIntro: ContentIntro;
  differentiators: DifferentiatorItem[];
  processIntro: ContentIntro;
  process: ProcessStep[];
  onDifferentiatorsIntroChange: (intro: ContentIntro) => void;
  onDifferentiatorsChange: (items: DifferentiatorItem[]) => void;
  onProcessIntroChange: (intro: ContentIntro) => void;
  onProcessChange: (items: ProcessStep[]) => void;
}

interface IconCollectionItem {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
}

interface IconCollectionEditorProps {
  addLabel: string;
  items: IconCollectionItem[];
  onChange: (items: IconCollectionItem[]) => void;
  createItem: () => IconCollectionItem;
}

const iconOptions = mapOptions(ADMIN_ICON_OPTIONS);
const eyebrowFields = [
  ['differentiators', 'Differentiators eyebrow'],
  ['process', 'Process eyebrow'],
] as const;

function IconCollectionEditor({
  addLabel,
  createItem,
  items,
  onChange,
}: IconCollectionEditorProps) {
  const patchItem = (id: string, patch: Partial<IconCollectionItem>) => onChange(patchById(items, id, patch));

  return (
    <>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid gap-4 rounded-[1.5rem] border border-brand-ink/8 p-4 md:grid-cols-[200px_1fr_1fr_auto]"
          >
            <AdminSelect
              label="Icon"
              value={item.icon}
              options={iconOptions}
              onChange={(event) => patchItem(item.id, { icon: event.target.value as IconKey })}
            />
            <AdminInput
              label="Title"
              value={item.title}
              onChange={(event) => patchItem(item.id, { title: event.target.value })}
            />
            <AdminTextarea
              label="Description"
              rows={2}
              value={item.description}
              onChange={(event) => patchItem(item.id, { description: event.target.value })}
            />
            <div className="mt-7">
              <AdminRemoveButton
                label="Remove"
                onClick={() => onChange(removeById(items, item.id))}
              />
            </div>
          </div>
        ))}
      </div>
      <AdminAddButton label={addLabel} onClick={() => onChange([...items, createItem()])} />
    </>
  );
}

export function NarrativeHomeSection({
  differentiators,
  differentiatorsIntro,
  onDifferentiatorsChange,
  onDifferentiatorsIntroChange,
  onProcessChange,
  onProcessIntroChange,
  process,
  processIntro,
}: NarrativeHomeSectionProps) {
  return (
    <AdminSection title="Why this works and process">
      <div className="grid gap-4 md:grid-cols-2">
        {eyebrowFields.map(([section, label]) => {
          const value = section === 'differentiators'
            ? differentiatorsIntro.eyebrow
            : processIntro.eyebrow;
          const onChange = section === 'differentiators'
            ? onDifferentiatorsIntroChange
            : onProcessIntroChange;
          const current = section === 'differentiators' ? differentiatorsIntro : processIntro;

          return (
            <AdminInput
              key={section}
              label={label}
              value={value}
              onChange={(event) => onChange({ ...current, eyebrow: event.target.value })}
            />
          );
        })}
        <AdminTextarea
          label="Differentiators title"
          rows={2}
          value={differentiatorsIntro.title}
          onChange={(event) => onDifferentiatorsIntroChange({
            ...differentiatorsIntro,
            title: event.target.value,
          })}
        />
        <AdminTextarea
          label="Process title"
          rows={2}
          value={processIntro.title}
          onChange={(event) => onProcessIntroChange({
            ...processIntro,
            title: event.target.value,
          })}
        />
      </div>
      <AdminTextarea
        label="Process description"
        rows={3}
        value={processIntro.description ?? ''}
        onChange={(event) => onProcessIntroChange({
          ...processIntro,
          description: event.target.value,
        })}
      />
      <IconCollectionEditor
        addLabel="Add differentiator"
        items={differentiators}
        onChange={(items) => onDifferentiatorsChange(items as DifferentiatorItem[])}
        createItem={() => ({
          id: createId('diff'),
          title: 'New differentiator',
          description: '',
          icon: 'sparkles',
        })}
      />
      <IconCollectionEditor
        addLabel="Add process step"
        items={process}
        onChange={(items) => onProcessChange(items as ProcessStep[])}
        createItem={() => ({
          id: createId('process'),
          title: 'New step',
          description: '',
          icon: 'zap',
        })}
      />
    </AdminSection>
  );
}
