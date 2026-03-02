import type { Project } from '../../types';

export const studentResearchPosterProject: Project = {
  id: 'project-research-poster',
  slug: 'student-research-poster',
  title: 'Student Research Poster',
  client: 'Faculty research group',
  year: '2025',
  category: 'Research',
  duration: '2 months',
  role: 'Literature review and poster co-author',
  headline:
    'A first deeper step into medical research through reading, synthesis, and careful scientific writing.',
  description:
    'I contributed to a student research poster focused on adolescent iron deficiency and what early screening can change.',
  summary:
    'Reading papers, comparing findings, organizing evidence clearly, and translating a dense topic into a poster format that still felt understandable.',
  image:
    'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80&w=1400',
  tags: ['Research', 'Writing', 'Evidence'],
  services: ['Literature review', 'Data synthesis', 'Scientific writing'],
  stack: ['PubMed', 'Reference manager', 'Poster layout'],
  challenge:
    'Research demanded a different kind of patience: less immediate than the ward, but just as dependent on clarity, rigor, and the ability to stay with a question.',
  approach:
    'I broke the work into smaller reading goals, wrote summaries after every paper, and collaborated closely with mentors to turn scattered findings into a clean visual narrative.',
  outcome:
    'The project made research feel less intimidating and more exciting. It also gave me a stronger respect for slow, evidence-based thinking.',
  results: [
    {
      value: '26',
      label: 'Papers reviewed',
      detail: 'Screened and summarized to shape the final poster argument.',
    },
    {
      value: '1',
      label: 'Poster presented',
      detail: 'As part of a student-led academic showcase.',
    },
    {
      value: '2',
      label: 'Mentors who guided the process',
      detail: 'Helping me understand both method and academic discipline.',
    },
  ],
  gallery: [
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1516321310764-8d4bbf0ae5b9?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
  ],
  featured: false,
  sortOrder: 5,
  status: 'published',
};
