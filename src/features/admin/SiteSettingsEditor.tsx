import { ADMIN_ICON_OPTIONS } from '../../cms/icons';
import type { CmsSiteContent } from '../../cms/schema';
import { AdminAddButton, AdminRemoveButton } from './AdminActions';
import {
  AdminCheckbox,
  AdminInput,
  AdminLineListField,
  AdminSelect,
  AdminTextarea,
} from './AdminField';
import { AdminSection } from './AdminSection';
import {
  createId,
  mapOptions,
  patchById,
  removeById,
} from './admin.utils';

interface SiteSettingsEditorProps {
  site: CmsSiteContent;
  onChange: (site: CmsSiteContent) => void;
}

type SiteCollectionKey = 'contactMethods' | 'navItems' | 'socialLinks';

const iconOptions = mapOptions(ADMIN_ICON_OPTIONS);
const brandFields: Array<{
  key:
    | 'availability'
    | 'contactEmail'
    | 'contactLocation'
    | 'footerTagline'
    | 'responseTime'
    | 'siteName'
    | 'siteTitle'
    | 'siteUrl';
  label: string;
}> = [
  { key: 'siteName', label: 'Site name' },
  { key: 'siteUrl', label: 'Site URL' },
  { key: 'siteTitle', label: 'Site title' },
  { key: 'contactEmail', label: 'Contact email' },
  { key: 'contactLocation', label: 'Contact location' },
  { key: 'responseTime', label: 'Response time' },
  { key: 'availability', label: 'Availability' },
  { key: 'footerTagline', label: 'Footer tagline' },
];

export function SiteSettingsEditor({ onChange, site }: SiteSettingsEditorProps) {
  const updateSite = <Key extends keyof CmsSiteContent>(key: Key, value: CmsSiteContent[Key]) => {
    onChange({
      ...site,
      [key]: value,
    });
  };

  const patchCollectionItem = <Key extends SiteCollectionKey>(
    key: Key,
    id: string,
    patch: Partial<CmsSiteContent[Key][number]>,
  ) => {
    updateSite(
      key,
      patchById(site[key], id, patch) as CmsSiteContent[Key],
    );
  };

  const removeCollectionItem = <Key extends SiteCollectionKey>(key: Key, id: string) => {
    updateSite(key, removeById(site[key], id) as CmsSiteContent[Key]);
  };

  return (
    <div className="space-y-6">
      <AdminSection
        title="Brand and contact"
        description="This controls the public identity, SEO defaults, footer copy, and inquiry details."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {brandFields.map(({ key, label }) => (
            <AdminInput
              key={key}
              label={label}
              value={site[key]}
              onChange={(event) => updateSite(key, event.target.value)}
            />
          ))}
        </div>
        <AdminTextarea
          label="Site description"
          rows={3}
          value={site.siteDescription}
          onChange={(event) => updateSite('siteDescription', event.target.value)}
        />
        <AdminTextarea
          label="Footer description"
          rows={3}
          value={site.footerDescription}
          onChange={(event) => updateSite('footerDescription', event.target.value)}
        />
      </AdminSection>

      <AdminSection title="Navigation">
        <div className="space-y-4">
          {site.navItems.map((item) => (
            <div
              key={item.id}
              className="grid gap-4 rounded-[1.5rem] border border-brand-ink/8 p-4 md:grid-cols-[1fr_1fr_auto]"
            >
              <AdminInput
                label="Label"
                value={item.label}
                onChange={(event) => patchCollectionItem('navItems', item.id, { label: event.target.value })}
              />
              <AdminInput
                label="Path"
                value={item.href}
                onChange={(event) => patchCollectionItem('navItems', item.id, { href: event.target.value })}
              />
              <div className="mt-7">
                <AdminRemoveButton
                  label="Remove"
                  onClick={() => removeCollectionItem('navItems', item.id)}
                />
              </div>
            </div>
          ))}
        </div>
        <AdminAddButton
          label="Add nav item"
          onClick={() => updateSite('navItems', [
            ...site.navItems,
            { id: createId('nav'), label: 'New item', href: '/' },
          ])}
        />
      </AdminSection>

      <AdminSection title="Social links">
        <div className="space-y-4">
          {site.socialLinks.map((item) => (
            <div
              key={item.id}
              className="grid gap-4 rounded-[1.5rem] border border-brand-ink/8 p-4 md:grid-cols-[1fr_1fr_220px_auto]"
            >
              <AdminInput
                label="Label"
                value={item.label}
                onChange={(event) => patchCollectionItem('socialLinks', item.id, { label: event.target.value })}
              />
              <AdminInput
                label="URL"
                value={item.href}
                onChange={(event) => patchCollectionItem('socialLinks', item.id, { href: event.target.value })}
              />
              <AdminSelect
                label="Icon"
                value={item.icon}
                options={iconOptions}
                onChange={(event) => patchCollectionItem('socialLinks', item.id, {
                  icon: event.target.value as typeof item.icon,
                })}
              />
              <div className="mt-7">
                <AdminRemoveButton
                  label="Remove"
                  onClick={() => removeCollectionItem('socialLinks', item.id)}
                />
              </div>
            </div>
          ))}
        </div>
        <AdminAddButton
          label="Add social link"
          onClick={() => updateSite('socialLinks', [
            ...site.socialLinks,
            { id: createId('social'), label: 'New link', href: '', icon: 'linkedin' },
          ])}
        />
      </AdminSection>

      <AdminSection title="Contact methods">
        <div className="space-y-4">
          {site.contactMethods.map((item) => (
            <div key={item.id} className="space-y-4 rounded-[1.5rem] border border-brand-ink/8 p-4">
              <div className="grid gap-4 md:grid-cols-3">
                <AdminInput
                  label="Label"
                  value={item.label}
                  onChange={(event) => patchCollectionItem('contactMethods', item.id, { label: event.target.value })}
                />
                <AdminInput
                  label="Value"
                  value={item.value}
                  onChange={(event) => patchCollectionItem('contactMethods', item.id, { value: event.target.value })}
                />
                <AdminSelect
                  label="Icon"
                  value={item.icon}
                  options={iconOptions}
                  onChange={(event) => patchCollectionItem('contactMethods', item.id, {
                    icon: event.target.value as typeof item.icon,
                  })}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
                <AdminInput
                  label="Link"
                  value={item.href}
                  onChange={(event) => patchCollectionItem('contactMethods', item.id, { href: event.target.value })}
                />
                <div className="pt-7">
                  <AdminCheckbox
                    label="External"
                    checked={Boolean(item.external)}
                    onChange={(checked) => patchCollectionItem('contactMethods', item.id, { external: checked })}
                  />
                </div>
                <div className="mt-7">
                  <AdminRemoveButton
                    label="Remove"
                    onClick={() => removeCollectionItem('contactMethods', item.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <AdminAddButton
          label="Add contact method"
          onClick={() => updateSite('contactMethods', [
            ...site.contactMethods,
            { id: createId('contact'), label: 'New method', value: '', href: '', icon: 'mail' },
          ])}
        />
      </AdminSection>

      <AdminSection
        title="Inquiry options"
        description="One option per line. These populate the public inquiry form."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <AdminLineListField
            label="Service options"
            rows={6}
            values={site.serviceOptions}
            onChange={(value) => updateSite('serviceOptions', value)}
          />
          <AdminLineListField
            label="Budget options"
            rows={6}
            values={site.budgetOptions}
            onChange={(value) => updateSite('budgetOptions', value)}
          />
          <AdminLineListField
            label="Timeline options"
            rows={6}
            values={site.timelineOptions}
            onChange={(value) => updateSite('timelineOptions', value)}
          />
        </div>
      </AdminSection>
    </div>
  );
}
