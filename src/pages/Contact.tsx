import { motion } from 'motion/react';
import { useSearchParams } from 'react-router-dom';
import { ContactDetails } from '../features/contact/ContactDetails';
import { InquiryForm } from '../features/contact/InquiryForm';
import { usePageMeta } from '../hooks/usePageMeta';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const selectedProject = searchParams.get('project')?.trim() ?? '';
  const selectedService = searchParams.get('service')?.trim() ?? '';

  usePageMeta({
    title: 'Say Hello | Aya Anouar',
    description: 'Reach out to me about medicine, research, art, volunteering, or a thoughtful conversation.',
  });

  return (
    <div className="relative overflow-hidden px-4 pb-24 pt-28 sm:px-6 sm:pb-40 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-20">
          <ContactDetails selectedProject={selectedProject} selectedService={selectedService} />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[2rem] border border-brand-paper bg-white p-5 shadow-xl shadow-brand-ink/5 sm:rounded-[40px] sm:p-8 md:p-12"
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
