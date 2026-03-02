import type { Project } from '../../types';

export const communityHealthCaravanProject: Project = {
  id: 'project-community-caravan',
  slug: 'community-health-caravan',
  title: 'Community Health Caravan',
  client: 'Student Health Association',
  year: '2025',
  category: 'Community',
  duration: '3 weekends',
  role: 'Volunteer coordinator and student educator',
  headline:
    'A student-led outreach effort built around prevention, blood-pressure checks, and warm first contact.',
  description:
    'I helped organize a small health caravan focused on making basic screening and health conversations feel accessible and kind.',
  summary:
    'Planning volunteer roles, coordinating simple screening flows, and helping turn short health encounters into respectful conversations people actually wanted to have.',
  image:
    'https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?auto=format&fit=crop&q=80&w=1400',
  tags: ['Community health', 'Prevention', 'Teamwork'],
  services: ['Health education', 'Volunteer coordination', 'Patient listening'],
  stack: ['Screening forms', 'Checklists', 'Bilingual communication'],
  challenge:
    'The work had to be simple, welcoming, and organized enough that people could receive useful information without the atmosphere feeling clinical or cold.',
  approach:
    'I focused on tone, flow, and clarity. I helped divide roles, simplify explanations, and make sure the volunteer team approached people with patience rather than urgency.',
  outcome:
    'The outreach days felt more human and less transactional, and I left with a stronger appreciation for how much prevention work depends on trust and accessibility.',
  results: [
    {
      value: '180',
      label: 'Residents reached',
      detail: 'Across screening, blood-pressure checks, and prevention conversations.',
    },
    {
      value: '42',
      label: 'Student volunteers coordinated',
      detail: 'Across registration, screening, education, and follow-up roles.',
    },
    {
      value: '3',
      label: 'Workshops delivered',
      detail: 'On hydration, nutrition, and everyday prevention habits.',
    },
  ],
  gallery: [
    'https://images.unsplash.com/photo-1497486751825-1233686d5d80?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1200',
  ],
  testimonial: {
    quote:
      'The most useful thing I could bring here was not speed. It was warmth, clarity, and enough patience for people to feel welcome.',
    author: 'On outreach',
    role: 'After the caravan',
  },
  featured: true,
  sortOrder: 2,
  status: 'published',
};
