import type { CmsHomeContent } from './schema';

export const DEFAULT_HOME_CONTENT: CmsHomeContent = {
  hero: {
    badge: 'Fifth-year medical student, painter, and curious observer',
    titleLeading: 'Medicine taught me to',
    titleHighlight: 'look closely',
    titleTrailing: 'and live gently.',
    description:
      "I'm Aya Anouar, a fifth-year medical student building a life around attentive care, disciplined study, painting, reading, and the small rituals that keep long hospital days human.",
    primaryCtaLabel: 'Say Hello',
    primaryCtaHref: '/contact?service=Say%20hello',
    secondaryCtaLabel: 'Browse Highlights',
    secondaryCtaHref: '/portfolio',
    showcaseEyebrow: 'Right now',
    showcaseTitle: 'Clerkships, sketchbooks, and finding calm inside busy weeks.',
    showcaseDescription:
      'A personal collection of clinical reflections, student projects, creative habits, and the things shaping how I listen, learn, and show up for people.',
    showcaseImage:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1400',
    showcaseImageAlt: 'Desk with notebooks, coffee, and painting materials',
  },
  stats: [
    {
      id: 'stat-year',
      value: '5th',
      label: 'Year of medicine',
      detail: 'Currently learning through clinical rotations, rounds, and long evenings of reflection.',
    },
    {
      id: 'stat-sketchbooks',
      value: '3',
      label: 'Sketchbooks filled recently',
      detail: 'Mostly anatomy studies, portraits, and color notes after long days.',
    },
    {
      id: 'stat-anchors',
      value: '4',
      label: 'Things that keep me grounded',
      detail: 'Medicine, painting, books, and movement.',
    },
  ],
  trustMarks: [
    'Pediatrics',
    'Internal Medicine',
    'Community Health',
    'Painting',
    'Research',
  ],
  servicesIntro: {
    eyebrow: 'Current rhythms',
    title: 'Medicine is the center, but it is not the whole story.',
    description:
      'My days move between clerkships, handwritten notes, painting sessions, novels, playlists, and the quiet habits that make demanding work sustainable.',
  },
  services: [
    {
      id: 'service-clinical-learning',
      title: 'Clinical learning',
      description:
        "I'm especially drawn to the human side of medicine: listening carefully, noticing subtle changes, and earning trust with calm communication.",
      deliverables: ['Pediatrics and internal medicine rotations', 'Case reflections', 'Growing confidence on ward rounds'],
    },
    {
      id: 'service-painting',
      title: 'Painting and visual notes',
      description:
        'Painting is both rest and study. It sharpens observation, patience, and a comfort with detail that travels back into medicine.',
      deliverables: ['Anatomy sketches', 'Portrait studies', 'Small acrylic and watercolor series'],
    },
    {
      id: 'service-everyday-life',
      title: 'Life outside the hospital',
      description:
        'I like long walks, novels, playlists for late-night studying, and any excuse to sit near sunlight with a notebook.',
      deliverables: ['Reading and journaling', 'Coffee with friends', 'Reset rituals after busy weeks'],
    },
  ],
  featuredIntro: {
    eyebrow: 'Highlights',
    title: 'Experiences and personal projects that show how I think, learn, and care.',
    description:
      'This page holds clinical moments, community work, research, and creative practice in the same place because all of them are shaping the person I am becoming as a doctor.',
    ctaLabel: 'View all highlights',
    ctaHref: '/portfolio',
  },
  differentiatorsIntro: {
    eyebrow: 'What guides me',
    title: 'Curiosity, steadiness, and attention to the person behind the situation.',
  },
  differentiators: [
    {
      id: 'diff-observation',
      icon: 'heart-handshake',
      title: 'Observation first',
      description:
        'I pay attention to tone, hesitation, body language, and the small human details that often matter before the obvious answer appears.',
    },
    {
      id: 'diff-discipline',
      icon: 'clock-3',
      title: 'Discipline without drama',
      description:
        'Long days do not scare me. I like routines, preparation, and the quiet confidence that comes from showing up consistently.',
    },
    {
      id: 'diff-creativity',
      icon: 'sparkles',
      title: 'Creativity keeps me human',
      description:
        'Painting, writing, and reflective habits help me stay open, curious, and emotionally present inside demanding environments.',
    },
  ],
  processIntro: {
    eyebrow: 'How I learn',
    title: 'I tend to learn in four steps: notice, study, reflect, repeat.',
    description:
      'It is a simple rhythm, but it helps me turn busy experiences into something lasting and personal.',
  },
  process: [
    {
      id: 'process-notice',
      icon: 'sparkles',
      title: 'Notice',
      description:
        'I start by paying close attention: what is being said, what is being avoided, and what the room feels like.',
    },
    {
      id: 'process-study',
      icon: 'zap',
      title: 'Study',
      description:
        'Then comes the work: reading, reviewing cases, asking better questions, and filling the gaps with intention.',
    },
    {
      id: 'process-reflect',
      icon: 'camera',
      title: 'Reflect',
      description:
        'I write things down, sketch, and revisit difficult moments so they become lessons instead of blurred memories.',
    },
    {
      id: 'process-repeat',
      icon: 'heart-handshake',
      title: 'Return',
      description:
        'The next day I come back steadier, a little clearer, and more prepared to care for the person in front of me.',
    },
  ],
  testimonialsIntro: {
    eyebrow: 'Personal notes',
    title: 'A few thoughts I keep coming back to.',
  },
  testimonials: [
    {
      id: 'testimonial-senior',
      quote:
        'I want the people I care for to feel that I am paying attention before they remember anything else about me.',
      author: 'On clinical presence',
      role: 'A note I return to often',
    },
    {
      id: 'testimonial-peer',
      quote:
        'I am learning that rest does not always mean stopping. Sometimes it means painting for an hour until the day feels human again.',
      author: 'On recovery',
      role: 'After long hospital days',
    },
    {
      id: 'testimonial-community',
      quote:
        'I hope the people around me feel calmer, not smaller, after speaking with me.',
      author: 'On showing up well',
      role: 'Something I try to protect',
    },
    {
      id: 'testimonial-creative',
      quote:
        'I do some of my clearest thinking with a brush in my hand and no need to explain myself yet.',
      author: 'On painting',
      role: 'The quiet part of my week',
    },
  ],
  faqIntro: {
    eyebrow: 'Quick notes',
    title: 'A few things people usually want to know about me.',
  },
  faqs: [
    {
      id: 'faq-interests',
      question: 'What kind of medicine am I most drawn to?',
      answer:
        'I am especially interested in pediatrics, community health, and the parts of medicine that depend on trust, patience, and careful communication.',
    },
    {
      id: 'faq-outside',
      question: 'What do I do outside medicine?',
      answer:
        'I paint, read novels, keep journals, take long walks, and build little routines that help demanding weeks feel more livable.',
    },
    {
      id: 'faq-building',
      question: 'What am I hoping to keep building next?',
      answer:
        'Deeper clinical confidence, thoughtful research habits, and a life where creativity still has room beside medicine.',
    },
  ],
  finalCta: {
    eyebrow: 'Say hello',
    title: 'If you want to connect about medicine, art, books, or a student opportunity, I would love to hear from you.',
    description:
      'This site is meant to feel personal on purpose. If something here resonated, send a note.',
    buttonLabel: 'Get in touch',
    buttonHref: '/contact?service=Say%20hello',
  },
};
