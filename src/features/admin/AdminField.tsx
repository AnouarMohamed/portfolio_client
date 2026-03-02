import { fromLineList, toLineList } from './admin.utils';
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface FieldWrapperProps {
  label: string;
  hint?: string;
  children: ReactNode;
}

function FieldWrapper({ children, hint, label }: FieldWrapperProps) {
  return (
    <label className="block space-y-2">
      <span className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
        {label}
      </span>
      {children}
      {hint ? <span className="block text-sm text-brand-muted">{hint}</span> : null}
    </label>
  );
}

const fieldClassName =
  'w-full rounded-2xl border border-brand-ink/10 bg-white px-4 py-3 text-sm text-brand-ink transition-colors focus:border-brand-accent focus:outline-none';

interface AdminInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

export function AdminInput({ label, hint, ...props }: AdminInputProps) {
  return (
    <FieldWrapper label={label} hint={hint}>
      <input {...props} className={`${fieldClassName} ${props.className ?? ''}`.trim()} />
    </FieldWrapper>
  );
}

interface AdminTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hint?: string;
}

export function AdminTextarea({ label, hint, rows = 4, ...props }: AdminTextareaProps) {
  return (
    <FieldWrapper label={label} hint={hint}>
      <textarea
        {...props}
        rows={rows}
        className={`${fieldClassName} resize-y ${props.className ?? ''}`.trim()}
      />
    </FieldWrapper>
  );
}

interface AdminLineListFieldProps {
  label: string;
  values: string[];
  onChange: (values: string[]) => void;
  hint?: string;
  rows?: number;
}

export function AdminLineListField({
  hint,
  label,
  onChange,
  rows = 4,
  values,
}: AdminLineListFieldProps) {
  return (
    <AdminTextarea
      label={label}
      hint={hint}
      rows={rows}
      value={fromLineList(values)}
      onChange={(event) => onChange(toLineList(event.target.value))}
    />
  );
}

interface AdminSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  hint?: string;
  options: Array<{ label: string; value: string }>;
}

export function AdminSelect({ hint, label, options, ...props }: AdminSelectProps) {
  return (
    <FieldWrapper label={label} hint={hint}>
      <select {...props} className={`${fieldClassName} ${props.className ?? ''}`.trim()}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

interface AdminCheckboxProps {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
}

export function AdminCheckbox({ checked, label, onChange }: AdminCheckboxProps) {
  return (
    <label className="inline-flex items-center gap-3 rounded-2xl border border-brand-ink/10 bg-white px-4 py-3 text-sm text-brand-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 rounded border-brand-ink/20 accent-brand-accent"
      />
      <span>{label}</span>
    </label>
  );
}
