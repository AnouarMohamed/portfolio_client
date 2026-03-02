import type { Project } from '../../types';

export const eveningPaintingsProject: Project = {
  id: 'project-evening-paintings',
  slug: 'paintings-for-quiet-evenings',
  title: 'Paintings for Quiet Evenings',
  client: 'Personal painting practice',
  year: '2024',
  category: 'Personal',
  duration: 'Ongoing',
  role: 'Painter and journal keeper',
  headline:
    'Small acrylic and watercolor scenes that help me slow down after long hospital days.',
  description:
    'A growing body of quiet paintings I make in the evenings, usually after study blocks, long shifts, or days that need a softer ending.',
  summary:
    'Color studies, still lifes, small interiors, and handwritten notes about why certain evenings asked for blue, ochre, or silence.',
  image:
    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1400',
  tags: ['Painting', 'Rest', 'Reflection'],
  services: ['Painting', 'Color studies', 'Reflective journaling'],
  stack: ['Acrylic', 'Watercolor', 'Playlist loops'],
  challenge:
    'I needed something unhurried and tactile, a space where nothing had to be efficient or perfect after days shaped by responsibility.',
  approach:
    'I keep the canvases small, paint often instead of rarely, and let color carry emotion without forcing every piece to mean more than it naturally does.',
  outcome:
    'The paintings became a form of recovery as much as a hobby. They give me a quiet place to return to myself at the end of difficult weeks.',
  results: [
    {
      value: '18',
      label: 'Finished paintings',
      detail: 'Mostly small studies that now live across bedroom walls and sketchbook pages.',
    },
    {
      value: '1',
      label: 'Corner of home turned into a painting space',
      detail: 'Just enough space for brushes, paper, and a little evening light.',
    },
    {
      value: 'Countless',
      label: 'Calmer evenings',
      detail: 'The most important outcome, even if it refuses to become a neat metric.',
    },
  ],
  gallery: [
    'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200',
    'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&q=80&w=1200',
  ],
  testimonial: {
    quote:
      'Painting keeps reminding me that careful looking is its own form of devotion. I want to carry that same patience back into medicine.',
    author: 'On painting',
    role: 'From my evening practice',
  },
  featured: false,
  sortOrder: 6,
  status: 'published',
};
