import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Send } from 'lucide-react';
import { trackAnalyticsEvent } from '../../analytics/client';
import { useCms } from '../../cms/useCms';
import { buildInquiryMailtoUrl, createInquiryMessage, isValidEmailAddress } from './contact.utils';

interface InquiryFormProps {
  selectedProject: string;
  selectedService: string;
}

interface InquiryFormData {
  name: string;
  email: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
}

function getInitialFormState(args: {
  selectedProject: string;
  selectedService: string;
  serviceOptions: string[];
  budgetOptions: string[];
  timelineOptions: string[];
  siteName: string;
}): InquiryFormData {
  return {
    name: '',
    email: '',
    service: args.selectedService || args.serviceOptions[0] || '',
    budget: args.budgetOptions[1] ?? args.budgetOptions[0] ?? '',
    timeline: args.timelineOptions[2] ?? args.timelineOptions[0] ?? '',
    message: args.selectedProject
      ? createInquiryMessage(args.siteName, args.selectedProject)
      : '',
  };
}

const fieldClassName =
  'w-full rounded-2xl border border-brand-paper bg-brand-paper/25 px-4 py-3.5 text-base transition-colors focus:border-brand-accent focus:outline-none sm:px-5 sm:py-4';
const textFields = [
  ['name', 'Your Name', 'contact-name', 'text', 'Jane Doe', 'name'],
  ['email', 'Email Address', 'contact-email', 'email', 'jane@example.com', 'email'],
] as const;
const selectFields = [
  ['service', 'Reason', 'contact-service', 'serviceOptions'],
  ['budget', 'Current focus', 'contact-budget', 'budgetOptions'],
  ['timeline', 'Timing', 'contact-timeline', 'timelineOptions'],
] as const;

export function InquiryForm({ selectedProject, selectedService }: InquiryFormProps) {
  const {
    content: { pages, site },
  } = useCms();
  const [formData, setFormData] = useState(() =>
    getInitialFormState({
      selectedProject,
      selectedService,
      serviceOptions: site.serviceOptions,
      budgetOptions: site.budgetOptions,
      timelineOptions: site.timelineOptions,
      siteName: site.siteName,
    }),
  );
  const [statusMessage, setStatusMessage] = useState('');
  const [statusTone, setStatusTone] = useState<'success' | 'error'>('success');

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setStatusTone('error');
      setStatusMessage('Add your name, email, and a short note before sending.');
      return;
    }

    if (!isValidEmailAddress(email)) {
      setStatusTone('error');
      setStatusMessage('Enter a valid email address so the drafted message is prepared correctly.');
      return;
    }

    trackAnalyticsEvent({
      eventType: 'inquiry_submit',
      path: '/contact',
      label: selectedProject || formData.service || 'Inquiry',
      metadata: {
        budget: formData.budget,
        service: formData.service,
        timeline: formData.timeline,
      },
    });

    window.location.href = buildInquiryMailtoUrl({
      contactEmail: site.contactEmail,
      siteName: site.siteName,
      name,
      email,
      message,
      service: formData.service,
      budget: formData.budget,
      timeline: formData.timeline,
      projectName: selectedProject || undefined,
    });
    setStatusTone('success');
    setStatusMessage('This should open a drafted email to me.');
  };

  return (
    <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {textFields.map(([name, label, id, type, placeholder, autoComplete]) => (
          <div key={name} className="space-y-2">
            <label htmlFor={id} className="text-xs font-bold uppercase tracking-widest text-brand-muted">
              {label}
            </label>
            <input
              id={id}
              name={name}
              type={type}
              autoComplete={autoComplete}
              value={formData[name]}
              onChange={handleChange}
              className={fieldClassName}
              placeholder={placeholder}
              required
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
        {selectFields.map(([name, label, id, optionsKey]) => (
          <div key={name} className="space-y-2">
            <label htmlFor={id} className="text-xs font-bold uppercase tracking-widest text-brand-muted">
              {label}
            </label>
            <select
              id={id}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={fieldClassName}
            >
              {site[optionsKey].map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-widest text-brand-muted">Message</label>
        <textarea
          id="contact-message"
          name="message"
          rows={7}
          value={formData.message}
          onChange={handleChange}
          className={`${fieldClassName} resize-none rounded-[1.75rem]`}
          placeholder="What would you like to tell me?"
          required
        />
      </div>

      <p className="text-sm leading-relaxed text-brand-muted">
        {pages.contact.formNote}
      </p>

      {statusMessage && (
        <p
          className={statusTone === 'success' ? 'text-sm text-emerald-700' : 'text-sm text-red-600'}
          aria-live="polite"
        >
          {statusMessage}
        </p>
      )}

      <button type="submit" className="w-full rounded-2xl bg-brand-ink py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white shadow-lg shadow-brand-ink/20 transition-all hover:-translate-y-0.5 hover:bg-brand-accent sm:py-5 sm:text-xs sm:tracking-[0.3em]">
        <span className="inline-flex items-center gap-2">
          {pages.contact.submitLabel}
          <Send size={16} />
        </span>
      </button>
    </form>
  );
}
