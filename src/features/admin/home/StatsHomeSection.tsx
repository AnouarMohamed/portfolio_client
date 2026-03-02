import type { Stat } from '../../../types';
import { AdminAddButton, AdminRemoveButton } from '../AdminActions';
import { AdminInput, AdminLineListField } from '../AdminField';
import { AdminSection } from '../AdminSection';
import { createId, patchById, removeById } from '../admin.utils';

interface StatsHomeSectionProps {
  stats: Stat[];
  trustMarks: string[];
  onStatsChange: (stats: Stat[]) => void;
  onTrustMarksChange: (trustMarks: string[]) => void;
}

const statFields = [
  ['value', 'Value'],
  ['label', 'Label'],
  ['detail', 'Detail'],
] as const;

export function StatsHomeSection({
  onStatsChange,
  onTrustMarksChange,
  stats,
  trustMarks,
}: StatsHomeSectionProps) {
  const patchStat = (id: string, patch: Partial<Stat>) => onStatsChange(patchById(stats, id, patch));

  return (
    <AdminSection title="Stats and trust marks">
      <div className="space-y-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="grid gap-4 rounded-[1.5rem] border border-brand-ink/8 p-4 md:grid-cols-[180px_1fr_1fr_auto]"
          >
            {statFields.map(([key, label]) => (
              <AdminInput
                key={key}
                label={label}
                value={stat[key] ?? ''}
                onChange={(event) => patchStat(stat.id, { [key]: event.target.value })}
              />
            ))}
            <div className="mt-7">
              <AdminRemoveButton
                label="Remove"
                onClick={() => onStatsChange(removeById(stats, stat.id))}
              />
            </div>
          </div>
        ))}
      </div>
      <AdminAddButton
        label="Add stat"
        onClick={() => onStatsChange([
          ...stats,
          { id: createId('stat'), value: '', label: '', detail: '' },
        ])}
      />
      <AdminLineListField
        label="Trust marks"
        hint="One item per line."
        rows={4}
        values={trustMarks}
        onChange={onTrustMarksChange}
      />
    </AdminSection>
  );
}
