import type { ContentIntro } from '../../../cms/schema';
import type { Service } from '../../../types';
import { AdminAddButton, AdminRemoveButton } from '../AdminActions';
import { AdminInput, AdminLineListField, AdminTextarea } from '../AdminField';
import { AdminSection } from '../AdminSection';
import { createId, patchById, removeById } from '../admin.utils';

interface ServicesHomeSectionProps {
  intro: ContentIntro;
  services: Service[];
  onIntroChange: (intro: ContentIntro) => void;
  onServicesChange: (services: Service[]) => void;
}

const introFields = [
  ['eyebrow', 'Eyebrow'],
  ['title', 'Title'],
] as const;

export function ServicesHomeSection({
  intro,
  onIntroChange,
  onServicesChange,
  services,
}: ServicesHomeSectionProps) {
  const patchIntro = (patch: Partial<ContentIntro>) => onIntroChange({ ...intro, ...patch });
  const patchService = (id: string, patch: Partial<Service>) => {
    onServicesChange(patchById(services, id, patch));
  };

  return (
    <AdminSection title="Services">
      <div className="grid gap-4 md:grid-cols-3">
        {introFields.map(([key, label]) => (
          <AdminInput
            key={key}
            label={label}
            value={intro[key]}
            onChange={(event) => patchIntro({ [key]: event.target.value })}
          />
        ))}
      </div>
      <AdminTextarea
        label="Description"
        rows={3}
        value={intro.description ?? ''}
        onChange={(event) => patchIntro({ description: event.target.value })}
      />
      <div className="space-y-4">
        {services.map((service) => (
          <div key={service.id} className="space-y-4 rounded-[1.5rem] border border-brand-ink/8 p-4">
            <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
              <AdminInput
                label="Title"
                value={service.title}
                onChange={(event) => patchService(service.id, { title: event.target.value })}
              />
              <AdminTextarea
                label="Description"
                rows={2}
                value={service.description}
                onChange={(event) => patchService(service.id, { description: event.target.value })}
              />
              <div className="mt-7">
                <AdminRemoveButton
                  label="Remove"
                  onClick={() => onServicesChange(removeById(services, service.id))}
                />
              </div>
            </div>
            <AdminLineListField
              label="Deliverables"
              hint="One deliverable per line."
              rows={3}
              values={service.deliverables}
              onChange={(deliverables) => patchService(service.id, { deliverables })}
            />
          </div>
        ))}
      </div>
      <AdminAddButton
        label="Add service"
        onClick={() => onServicesChange([
          ...services,
          { id: createId('service'), title: 'New service', description: '', deliverables: [] },
        ])}
      />
    </AdminSection>
  );
}
