import type { Project } from '../types';

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'project-lumina',
    slug: 'lumina-brand-identity',
    title: 'Lumina Brand Identity',
    client: 'Lumina Home',
    year: '2025',
    category: 'Brand and Commerce',
    duration: '8 weeks',
    role: 'Strategy, brand direction, ecommerce UX',
    headline:
      'A warmer digital brand system for a candle company moving upmarket.',
    description:
      'Aura repositioned Lumina from a small-batch maker into a premium ritual-led brand with a commerce experience to match.',
    summary:
      'Brand, packaging, and ecommerce direction for a home-fragrance label moving from marketplace sales to direct-to-consumer growth.',
    image:
      'https://images.unsplash.com/photo-1602872030219-3df63824f5c9?auto=format&fit=crop&q=80&w=1400',
    tags: ['Branding', 'Packaging', 'Commerce'],
    services: ['Positioning', 'Brand system', 'Shop UX'],
    stack: ['Figma', 'React', 'Vite', 'Storytelling'],
    challenge:
      'Lumina had strong products but a generic online presence. The brand felt too small for its pricing, product ritual, and planned retailer conversations.',
    approach:
      'We reframed Lumina around sensory ritual rather than product specs, then built a typography-led system, tactile imagery direction, and a tighter commerce hierarchy around scent families and seasonal collections.',
    outcome:
      'The new launch gave the brand a clearer premium position, reduced visual clutter, and made room for stronger photography, collection storytelling, and direct purchase pathways.',
    results: [
      {
        value: '+41%',
        label: 'Direct sales lift',
        detail: 'Within the first six weeks after relaunch.',
      },
      {
        value: '2.2x',
        label: 'Higher average order value',
        detail: 'Driven by the collection bundling and ritual framing.',
      },
      {
        value: '18 days',
        label: 'Retailer deck turnaround',
        detail:
          'Using the same brand system for commerce and wholesale presentation.',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&q=80&w=1200',
    ],
    testimonial: {
      quote:
        'Aura gave us the visual confidence and product clarity we were missing. People finally understood the world we were trying to build.',
      author: 'Elena Rossi',
      role: 'Founder, Lumina Home',
    },
    featured: true,
    sortOrder: 1,
    status: 'published',
  },
  {
    id: 'project-ethereal',
    slug: 'ethereal-ui-kit',
    title: 'Ethereal UI Kit',
    client: 'Internal Product System',
    year: '2025',
    category: 'Design Systems',
    duration: '6 weeks',
    role: 'UI system design, documentation, frontend architecture',
    headline:
      'A softer interface system for product teams tired of sterile SaaS defaults.',
    description:
      'A reusable component library built to feel tactile and editorial without losing implementation discipline.',
    summary:
      'Systemized a modern interface kit for teams that wanted more atmosphere and less generic enterprise chrome.',
    image:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1400',
    tags: ['UI/UX', 'Design System', 'Frontend'],
    services: ['Component system', 'Interaction design', 'Documentation'],
    stack: ['React', 'TypeScript', 'Tailwind', 'Motion'],
    challenge:
      'The team needed consistency without another flat utility-first UI that looked interchangeable with every other dashboard.',
    approach:
      'We defined a visual grammar around restrained contrast, large-radius surfaces, controlled motion, and semantic component states, then mapped each decision into coded patterns.',
    outcome:
      'The final kit let the team move faster while protecting the look and feel across marketing surfaces, authenticated product views, and documentation.',
    results: [
      {
        value: '63%',
        label: 'Reduction in UI drift',
        detail: 'Measured across audited product surfaces.',
      },
      {
        value: '2 weeks',
        label: 'Saved per launch cycle',
        detail: 'Because new features started from shared patterns.',
      },
      {
        value: '34',
        label: 'Production components',
        detail: 'Documented and shipped with implementation rules.',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=1200',
    ],
    featured: true,
    sortOrder: 2,
    status: 'published',
  },
  {
    id: 'project-quiet-spaces',
    slug: 'quiet-spaces-app',
    title: 'Quiet Spaces App',
    client: 'Quiet Spaces',
    year: '2024',
    category: 'Product Design',
    duration: '10 weeks',
    role: 'Product strategy, UX writing, mobile UI',
    headline:
      'A calmer focus product built around less cognitive noise and better session completion.',
    description:
      'A meditation and focus app redesign centered on faster entry into sessions and stronger retention around routines.',
    summary:
      'Reworked the onboarding, session library, and accountability touchpoints for a habit product focused on attention recovery.',
    image:
      'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&q=80&w=1400',
    tags: ['Mobile App', 'UX Strategy', 'Product'],
    services: ['UX audit', 'Flow redesign', 'Retention patterns'],
    stack: ['Figma', 'User testing', 'React Native handoff'],
    challenge:
      'Users liked the content but dropped off before building routines. The product asked for too much attention before delivering calm.',
    approach:
      'We reduced interface choices, rewrote task framing, simplified onboarding, and made progress feel quieter and more grounded.',
    outcome:
      'The product became easier to start, easier to return to, and more aligned with the emotional state users were actually seeking.',
    results: [
      {
        value: '+27%',
        label: 'Session completion',
        detail: 'After the onboarding and discovery overhaul.',
      },
      {
        value: '+19%',
        label: 'Week-two retention',
        detail: 'Improved through better routine setup and calmer reminders.',
      },
      {
        value: '-31%',
        label: 'Navigation drop-off',
        detail: 'Because the surface area became smaller and clearer.',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=1200',
    ],
    featured: true,
    sortOrder: 3,
    status: 'published',
  },
  {
    id: 'project-mora',
    slug: 'organic-skincare-packaging',
    title: 'Organic Skincare Packaging',
    client: 'Mora Organics',
    year: '2024',
    category: 'Packaging',
    duration: '5 weeks',
    role: 'Packaging design, naming architecture, launch art direction',
    headline:
      'A minimalist packaging language for a skincare line that needed premium restraint, not wellness cliche.',
    description:
      'Packaging and launch visuals for a skincare brand balancing ingredient transparency with a more elevated retail presence.',
    summary:
      'Created a packaging system that felt clinically trustworthy without losing warmth or tactility.',
    image:
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=1400',
    tags: ['Packaging', 'Branding', 'Art Direction'],
    services: ['Packaging', 'Naming system', 'Campaign visuals'],
    stack: ['Print production', 'Packaging', 'Photography art direction'],
    challenge:
      'The previous line looked too generic and crowded for premium shelves, with inconsistent hierarchy across formulas and variants.',
    approach:
      'We built a disciplined labeling system with ingredient-first naming, elevated materials, and a tighter architecture across the full product family.',
    outcome:
      'The brand launched with clearer shelf presence and a system that scaled cleanly across new SKUs.',
    results: [
      {
        value: '14',
        label: 'SKUs systemized',
        detail: 'Across cleansers, serums, oils, and sets.',
      },
      {
        value: '+22%',
        label: 'Retail reorder rate',
        detail: 'After the packaging refresh and relaunch.',
      },
      {
        value: '1 system',
        label: 'For print and digital',
        detail: 'Reducing downstream campaign inconsistency.',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1629198735660-e39ea93f5c18?auto=format&fit=crop&q=80&w=1200',
    ],
    featured: false,
    sortOrder: 4,
    status: 'published',
  },
  {
    id: 'project-slow-living',
    slug: 'slow-living-magazine',
    title: 'Slow Living Magazine',
    client: 'Slow Living Quarterly',
    year: '2024',
    category: 'Editorial',
    duration: '7 weeks',
    role: 'Editorial design, layout systems, digital companion pages',
    headline:
      'An editorial system for a print title that needed to feel collectible, not disposable.',
    description:
      'Editorial direction for a quarterly publication focused on slow living, place, and contemporary rituals.',
    summary:
      'Defined the magazine\'s recurring layout rhythm, typography rules, and companion digital presentation.',
    image:
      'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&q=80&w=1400',
    tags: ['Editorial', 'Layout', 'Publishing'],
    services: ['Editorial system', 'Typography', 'Digital companion'],
    stack: ['Editorial design', 'Grid systems', 'Longform content'],
    challenge:
      'The publication had excellent writing but no coherent pacing or visual identity between features, essays, and shorter notes.',
    approach:
      'We established a calmer layout cadence, recurring opening devices, and a more deliberate text-to-image rhythm that let long-form stories breathe.',
    outcome:
      'The publication gained a stronger sense of authorship and a reusable structure for future issues.',
    results: [
      {
        value: '4 issues',
        label: 'Planned with one system',
        detail: 'Giving the editorial team a durable toolkit.',
      },
      {
        value: '+36%',
        label: 'Subscriber renewal intent',
        detail: 'From the post-launch reader survey.',
      },
      {
        value: '3x',
        label: 'More reusable templates',
        detail: 'Without making the magazine feel templated.',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    ],
    featured: false,
    sortOrder: 5,
    status: 'published',
  },
  {
    id: 'project-verde',
    slug: 'botanical-illustration-series',
    title: 'Botanical Illustration Series',
    client: 'Atelier Verde',
    year: '2023',
    category: 'Illustration',
    duration: '4 weeks',
    role: 'Illustration direction, menu system, print coordination',
    headline:
      'Illustration-led storytelling for a dining brand that wanted its printed touchpoints to feel like keepsakes.',
    description:
      'A bespoke botanical illustration series for menus, place cards, and private dining touchpoints.',
    summary:
      'Built an illustration system that gave the restaurant a distinctive printed identity beyond photography.',
    image:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1400',
    tags: ['Illustration', 'Print', 'Hospitality'],
    services: ['Illustration', 'Menu design', 'Print coordination'],
    stack: ['Illustration', 'Print production', 'Hospitality brand design'],
    challenge:
      'The restaurant had an elegant interior but generic printed material that broke the in-person experience.',
    approach:
      'We created a custom set of botanical studies mapped to seasonal dishes, then integrated them into menus and event collateral with a restrained typography system.',
    outcome:
      'Printed materials became part of the brand story rather than an afterthought.',
    results: [
      {
        value: '28',
        label: 'Original illustrations',
        detail: 'Mapped to the menu and seasonal event cadence.',
      },
      {
        value: '+17%',
        label: 'Private dining inquiries',
        detail: 'Supported by the elevated event collateral.',
      },
      {
        value: '1 week',
        label: 'Menu refresh time',
        detail: 'Reduced with a modular illustration and type system.',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1514986888952-8cd320577b68?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1498654200943-1088dd4438ae?auto=format&fit=crop&q=80&w=1200',
    ],
    featured: false,
    sortOrder: 6,
    status: 'published',
  },
];
