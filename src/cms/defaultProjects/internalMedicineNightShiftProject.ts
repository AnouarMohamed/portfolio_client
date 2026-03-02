import type { Project } from '../../types';

export const internalMedicineNightShiftProject: Project = {
  id: 'project-internal-medicine-nights',
  slug: 'internal-medicine-night-shift-reflections',
  title: 'Internal Medicine Night Shift Reflections',
  client: 'Internal Medicine Clerkship',
  year: '2025',
  category: 'Clinical',
  duration: '6 weeks',
  role: 'Fifth-year medical student',
  headline:
    'Finding steadiness during long evenings of admissions, handovers, and follow-up decisions.',
  description:
    'A chapter of medical school that taught me how different medicine feels after sunset, when everyone is tired and clarity matters even more.',
  summary:
    'Admission histories, bedside reassessments, overnight questions, and the discipline of staying organized when the ward pace quietly changes.',
  image:
    'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1400',
  tags: ['Internal medicine', 'Night shifts', 'Composure'],
  services: ['Case synthesis', 'Team communication', 'Calm under pressure'],
  stack: ['Follow-up notes', 'Handover structure', 'Differential lists'],
  challenge:
    'Night shifts compress everything: less energy, fewer words, more responsibility to listen carefully and communicate only what matters.',
  approach:
    'I leaned on structure. I organized each case cleanly, reviewed the plan before speaking, and learned to ask shorter, more precise questions when the team was busy.',
  outcome:
    'I finished the rotation more composed, more deliberate in presentations, and more respectful of how much good teamwork depends on clean communication.',
  results: [
    {
      value: '11',
      label: 'Night shifts completed',
      detail: 'Each one leaving behind a new lesson in pace, responsibility, or communication.',
    },
    {
      value: '30+',
      label: 'Follow-up notes reviewed',
      detail: 'Used to improve continuity and understand what changed overnight.',
    },
    {
      value: '1',
      label: 'Presentation style sharpened',
      detail: 'Shorter, clearer, and much more confident by the end of the block.',
    },
  ],
  gallery: [
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1580281657527-47c6484ddda8?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1200',
  ],
  featured: false,
  sortOrder: 4,
  status: 'published',
};
