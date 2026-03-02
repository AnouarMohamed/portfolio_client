import type { Project } from '../../types';

export const pediatricsRotationProject: Project = {
  id: 'project-pediatrics-rotation',
  slug: 'pediatrics-rotation-notes',
  title: 'Pediatrics Rotation Notes',
  client: "Ibn Rochd Children's Hospital",
  year: '2026',
  category: 'Clinical',
  duration: '8 weeks',
  role: 'Fifth-year medical student',
  headline:
    'Learning how much reassurance, observation, and family trust shape good pediatric care.',
  description:
    'A reflection-led look at one of the clinical rotations that has shaped me most so far.',
  summary:
    'Notes from ward rounds, family conversations, symptom tracking, and the human details that made pediatrics feel both demanding and deeply meaningful.',
  image:
    'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=1400',
  tags: ['Pediatrics', 'Communication', 'Observation'],
  services: ['Family conversations', 'Clinical observation', 'Case reflections'],
  stack: ['Ward notes', 'Growth charts', 'Supervised examinations'],
  challenge:
    'The ward moved quickly, parents arrived carrying understandable fear, and I had to learn how to stay clear and gentle while still thinking clinically.',
  approach:
    'I prepared before rounds, kept a pocket notebook of small lessons, reviewed each case again at night, and paid special attention to how senior doctors explained difficult things simply.',
  outcome:
    'I became calmer during histories, more confident in front of families, and more aware that medicine often begins with making people feel safe enough to speak honestly.',
  results: [
    {
      value: '70+',
      label: 'Patient encounters',
      detail: 'Observed or supported across consultations, rounds, and follow-up conversations.',
    },
    {
      value: '24',
      label: 'Handwritten reflections',
      detail: 'Short end-of-day notes capturing what felt clinically and emotionally important.',
    },
    {
      value: '1',
      label: 'Pocket notebook filled',
      detail: 'With growth-chart reminders, phrases that worked, and questions to study later.',
    },
  ],
  gallery: [
    'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=1200',
  ],
  testimonial: {
    quote:
      'This rotation kept teaching me that reassurance is not extra. It is part of the care itself, especially when a family is frightened.',
    author: 'On reassurance',
    role: 'After pediatrics',
  },
  featured: true,
  sortOrder: 1,
  status: 'published',
};
