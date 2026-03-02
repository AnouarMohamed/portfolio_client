import type { Project } from '../../types';

export const anatomySketchbookProject: Project = {
  id: 'project-anatomy-sketchbook',
  slug: 'anatomy-sketchbook-practice',
  title: 'Anatomy Sketchbook Practice',
  client: 'Personal practice',
  year: '2025',
  category: 'Creative',
  duration: 'Ongoing',
  role: 'Painter and medical student',
  headline:
    'Turning anatomy revision into a visual habit through color, line, and repetition.',
  description:
    'A personal sketchbook practice that lets me study structure while keeping creativity close to my medical training.',
  summary:
    'Anatomy references, handwritten annotations, watercolor studies, and repeated drawing sessions that made memory feel more tactile and less abstract.',
  image:
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1400',
  tags: ['Anatomy', 'Painting', 'Visual memory'],
  services: ['Observation', 'Visual memory', 'Creative practice'],
  stack: ['Watercolor', 'Colored pencil', 'Atlas references'],
  challenge:
    'I wanted study methods that felt more alive than rereading notes, especially during weeks when everything started to blur together.',
  approach:
    'I turned revision into drawing sessions, using color coding, repeated forms, and quick written summaries beside each sketch to connect structure with understanding.',
  outcome:
    'The sketchbooks became both a study tool and a reset ritual. They helped me remember more, slow down, and enjoy the process of learning again.',
  results: [
    {
      value: '60',
      label: 'Anatomy studies',
      detail: 'Completed across muscles, joints, organ systems, and quick observational pages.',
    },
    {
      value: '3',
      label: 'Mediums explored',
      detail: 'Mostly watercolor, pencil, and gouache for different kinds of emphasis.',
    },
    {
      value: '20 min',
      label: 'Typical daily practice',
      detail: 'Short enough to be sustainable even during exam-heavy weeks.',
    },
  ],
  gallery: [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1200',
  ],
  featured: true,
  sortOrder: 3,
  status: 'published',
};
