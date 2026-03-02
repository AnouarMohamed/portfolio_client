import type { CmsPagesContent } from './schema';

export const DEFAULT_PAGES_CONTENT: CmsPagesContent = {
  portfolio: {
    eyebrow: 'Portfolio',
    title: 'Case studies built to prove taste, process, and commercial clarity.',
    description:
      'This is not a wall of thumbnails. Each project is treated as a system: positioning, hierarchy, interface choices, and implementation working together.',
  },
  about: {
    eyebrow: 'About Aura Studio',
    titleLeading: 'Quiet visuals are not enough.',
    titleHighlight: 'The structure has to work too.',
    titleTrailing: '',
    paragraphs: [
      'Aura Studio exists for clients whose work is already strong but whose site still feels too safe, too vague, or too close to everyone else in the market.',
      'The studio combines brand thinking, interface design, and frontend implementation so the final experience feels coherent from headline to hover state. The goal is not maximal style. It is precise presentation with enough character to be remembered.',
      'Most engagements begin with positioning and narrative cleanup, because weak structure cannot be solved with polished layouts alone. Once the page story is sharp, the visual and technical layers can actually do their job.',
    ],
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200',
    imageAlt: 'Studio work session',
    bestFit:
      'Founders, consultants, creative studios, and product teams that need sharper presentation and cleaner frontend delivery.',
  },
  contact: {
    badge: 'Discovery calls and scoped inquiries',
    titleLeading: "Let's make the site",
    titleHighlight: 'feel more intentional.',
    titleTrailing: '',
    description:
      'If the work is strong but the presentation feels generic, vague, or underpowered, Aura can help tighten the message, visual system, and frontend layer.',
    formNote:
      'This form drafts the inquiry in your default email app so you can review and send it with all the project details already structured.',
    submitLabel: 'Draft Inquiry',
  },
  journal: {
    title: 'Journal',
    description:
      'Notes on portfolio strategy, design systems, product storytelling, and launch surfaces from Aura Studio.',
  },
};
