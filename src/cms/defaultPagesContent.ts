import type { CmsPagesContent } from './schema';

export const DEFAULT_PAGES_CONTENT: CmsPagesContent = {
  portfolio: {
    eyebrow: 'Highlights',
    title: 'Clinical experiences, creative projects, and small chapters that say a lot about me.',
    description:
      'This is where rotations, research, community work, and painting practice sit beside each other. Together, they tell a more honest story than any single category could.',
  },
  about: {
    eyebrow: 'About me',
    titleLeading: 'Care, curiosity, and',
    titleHighlight: 'a sketchbook in the bag',
    titleTrailing: '',
    paragraphs: [
      'I am a fifth-year medical student who cares deeply about the human side of medicine: how trust is built, how calm changes a room, and how closely we have to listen before we can really help.',
      'Outside the hospital, I paint, read, journal, and collect small routines that make heavy weeks feel lighter. Those habits are not separate from medicine for me. They shape how I observe, reflect, and stay emotionally present.',
      'This site is simply a quieter way to present that whole picture: the student, the future doctor, the painter, the reader, and the person still learning how to hold all of it at once.',
    ],
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Portrait of a woman smiling softly outdoors',
    bestFit:
      'People interested in thoughtful medicine, student research, community work, creative practice, or simply honest conversation.',
  },
  contact: {
    badge: 'Notes, opportunities, and warm hellos',
    titleLeading: 'Say',
    titleHighlight: 'hello',
    titleTrailing: '.',
    description:
      'Whether it is about medicine, research, volunteering, painting, or simply introducing yourself, this is the place to reach out to me.',
    formNote:
      'This form opens a drafted email to me so you can edit it and send it in your own words.',
    submitLabel: 'Draft Email',
  },
  journal: {
    title: 'Notes and sketches',
    description:
      'Reflections on medicine, study life, painting, books, and the habits helping me stay grounded.',
  },
};
