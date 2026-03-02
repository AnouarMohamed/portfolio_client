import { motion } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { useCms } from '../cms/useCms';
import { ContactDetails } from '../features/contact/ContactDetails';
import { InquiryForm } from '../features/contact/InquiryForm';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Contact() {
  const {
    content: { site },
  } = useCms();
  const [searchParams] = useSearchParams();
  const selectedProject = searchParams.get('project')?.trim() ?? '';
  const selectedService = searchParams.get('service')?.trim() ?? '';

  usePageMeta({
    title: 'Start a project',
    description: `Start a project with ${site.siteName} for portfolio design, brand direction, product surfaces, and frontend implementation.`,
  });

  return (
    <div className="relative overflow-hidden px-6 pb-40 pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-2">
          <ContactDetails selectedProject={selectedProject} selectedService={selectedService} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[40px] border border-brand-paper bg-white p-8 shadow-xl shadow-brand-ink/5 md:p-12"
          >
            <InquiryForm
              key={`${selectedProject}-${selectedService || 'default'}`}
              selectedProject={selectedProject}
              selectedService={selectedService}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
