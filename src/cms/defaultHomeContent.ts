import type { CmsHomeContent } from './schema';

export const DEFAULT_HOME_CONTENT: CmsHomeContent = {
  hero: {
    badge: 'Strategy-led portfolio design and frontend craft',
    titleLeading: 'Make the work feel',
    titleHighlight: 'as strong online',
    titleTrailing: 'as it is in real life.',
    description:
      'Aura Studio designs sharper portfolio, brand, and launch experiences for founders and teams whose current site looks fine but says too little.',
    primaryCtaLabel: 'Start a Project',
    primaryCtaHref: '/contact?service=Portfolio%20Design',
    secondaryCtaLabel: 'Browse Case Studies',
    secondaryCtaHref: '/portfolio',
    showcaseEyebrow: 'Recent engagement',
    showcaseTitle:
      'Portfolio repositioning for a product consultant scaling into studio work.',
    showcaseDescription:
      'Messaging, case-study architecture, new visual language, and implementation cleanup across the full marketing surface.',
    showcaseImage:
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1400',
    showcaseImageAlt: 'Portfolio detail composition',
  },
  stats: [
    {
      id: 'stat-launches',
      value: '32',
      label: 'Launches shipped',
      detail: 'Across portfolio, product and brand work.',
    },
    {
      id: 'stat-conversion',
      value: '4.8x',
      label: 'Average conversion lift',
      detail: 'Measured across redesign engagements.',
    },
    {
      id: 'stat-craft',
      value: '12 yrs',
      label: 'Combined craft',
      detail: 'Strategy, visual systems and frontend delivery.',
    },
  ],
  trustMarks: ['Northstar', 'Luma', 'Fieldhouse', 'Vanta Labs', 'Atelier No. 9'],
  servicesIntro: {
    eyebrow: 'Services',
    title:
      'Design and frontend work that sharpens your positioning, not just your pixels.',
    description:
      'Aura focuses on the public-facing surfaces that shape first impressions: portfolios, product marketing pages, launch sites, and the systems behind them.',
  },
  services: [
    {
      id: 'service-brand-systems',
      title: 'Portfolio and brand systems',
      description:
        'Sharper positioning, tighter storytelling, and a visual system that stops your work from looking interchangeable.',
      deliverables: ['Positioning direction', 'Visual language', 'Launch-ready pages'],
    },
    {
      id: 'service-product-marketing',
      title: 'Product marketing surfaces',
      description:
        'Pages and flows that connect product value to action without reading like feature soup.',
      deliverables: ['Homepage systems', 'Feature narratives', 'Conversion modules'],
    },
    {
      id: 'service-frontend',
      title: 'Frontend implementation',
      description:
        'Production-quality React builds with responsive behavior, motion restraint, and maintainable structure.',
      deliverables: ['Component architecture', 'Responsive polish', 'Performance cleanup'],
    },
  ],
  featuredIntro: {
    eyebrow: 'Selected work',
    title: 'Case studies built around positioning, systems, and commercial clarity.',
    description:
      'Each project connects narrative, visual hierarchy, and implementation so the final site does more than look refined.',
    ctaLabel: 'View full portfolio',
    ctaHref: '/portfolio',
  },
  differentiatorsIntro: {
    eyebrow: 'Why this works',
    title: 'Better portfolios do three things well: they position, they prove, and they convert.',
  },
  differentiators: [
    {
      id: 'diff-strategy',
      icon: 'heart-handshake',
      title: 'Strategy before decoration',
      description:
        'The site is structured around what must be understood, trusted, and acted on.',
    },
    {
      id: 'diff-build',
      icon: 'code-2',
      title: 'Design that survives build',
      description:
        'Systems are designed with implementation in mind, so the launch does not collapse into compromises.',
    },
    {
      id: 'diff-voice',
      icon: 'sparkles',
      title: 'Less template energy',
      description:
        'The final result is sharper, more editorial, and more specific to the client than standard portfolio kits.',
    },
  ],
  processIntro: {
    eyebrow: 'Process',
    title: 'Clear enough to move quickly, rigorous enough to hold up in production.',
    description:
      'The workflow is built to get from foggy ambition to a launch-ready surface without bloating the project.',
  },
  process: [
    {
      id: 'process-position',
      icon: 'sparkles',
      title: 'Position',
      description:
        'We define the point of view, audience, and offer so the work knows what it is trying to win.',
    },
    {
      id: 'process-shape',
      icon: 'zap',
      title: 'Shape',
      description:
        'We turn that strategy into clear page structures, visual hierarchy, and interaction patterns.',
    },
    {
      id: 'process-build',
      icon: 'code-2',
      title: 'Build',
      description:
        'We implement the interface with production-grade React patterns, responsive behavior, and clean structure.',
    },
    {
      id: 'process-launch',
      icon: 'camera',
      title: 'Launch',
      description:
        'We polish the release layer: page titles, performance, assets, and the details people actually notice.',
    },
  ],
  testimonialsIntro: {
    eyebrow: 'Client feedback',
    title:
      'The work should feel specific enough that clients notice the difference immediately.',
  },
  testimonials: [
    {
      id: 'testimonial-elena',
      quote:
        'Aura took a visually decent site and turned it into a business asset. The story, structure, and frontend polish changed how prospects responded.',
      author: 'Elena Rossi',
      role: 'Founder, Atelier North',
    },
    {
      id: 'testimonial-marcus',
      quote:
        'The biggest difference was clarity. Every page suddenly had intent, and the product narrative started converting instead of just looking premium.',
      author: 'Marcus Thorne',
      role: 'Product Lead, Fieldhouse',
    },
    {
      id: 'testimonial-sophia',
      quote:
        'We hired Aura for design polish and ended up getting a much stronger system than expected, both visually and technically.',
      author: 'Sophia Chen',
      role: 'Principal, SC Studio',
    },
    {
      id: 'testimonial-ibrahim',
      quote:
        'Rare combination of taste, restraint, and technical discipline. The result felt custom because it actually was.',
      author: 'Ibrahim El-Mansouri',
      role: 'Founder, Luma Practice',
    },
  ],
  faqIntro: {
    eyebrow: 'FAQ',
    title: 'A few things people usually ask before we start.',
  },
  faqs: [
    {
      id: 'faq-fit',
      question: 'What kind of clients is Aura best for?',
      answer:
        'Founders, consultants, studios, and product teams who already have strong work but need sharper presentation, stronger conversion, and less template energy.',
    },
    {
      id: 'faq-design-build',
      question: 'Do you only design or do you also build?',
      answer:
        'Both. Aura handles strategy, direction, interface design, and React/Vite implementation so the final launch matches the concept.',
    },
    {
      id: 'faq-start',
      question: 'How do projects usually start?',
      answer:
        'With a focused audit and positioning pass. That sets the narrative, priorities, and content hierarchy before we touch polished interface work.',
    },
  ],
  finalCta: {
    eyebrow: 'Next step',
    title: 'If the work is solid but the site still feels generic, that is fixable.',
    description:
      'Aura helps turn strong raw material into a portfolio or launch surface that tells a clearer story and makes a sharper first impression.',
    buttonLabel: 'Start a Project',
    buttonHref: '/contact',
  },
};
