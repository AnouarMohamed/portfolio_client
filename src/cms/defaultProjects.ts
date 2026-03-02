import type { Project } from '../types';

export const DEFAULT_PROJECTS: Project[] = [
  {
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
  },
  {
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
  },
  {
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
  },
  {
    id: 'project-internal-medicine-nights',
    slug: 'internal-medicine-night-shift-reflections',
    title: 'Internal Medicine Night Shift Reflections',
    client: 'Internal Medicine Clerkship',
    year: '2025',
    category: 'Clinical',
    duration: '6 weeks',
    role: 'Fifth-year medical student',
    headline:
      'Finding steadiness during long evenings of admissions, handovers, and follow-up decisions.',
    description:
      'A chapter of medical school that taught me how different medicine feels after sunset, when everyone is tired and clarity matters even more.',
    summary:
      'Admission histories, bedside reassessments, overnight questions, and the discipline of staying organized when the ward pace quietly changes.',
    image:
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1400',
    tags: ['Internal medicine', 'Night shifts', 'Composure'],
    services: ['Case synthesis', 'Team communication', 'Calm under pressure'],
    stack: ['Follow-up notes', 'Handover structure', 'Differential lists'],
    challenge:
      'Night shifts compress everything: less energy, fewer words, more responsibility to listen carefully and communicate only what matters.',
    approach:
      'I leaned on structure. I organized each case cleanly, reviewed the plan before speaking, and learned to ask shorter, more precise questions when the team was busy.',
    outcome:
      'I finished the rotation more composed, more deliberate in presentations, and more respectful of how much good teamwork depends on clean communication.',
    results: [
      {
        value: '11',
        label: 'Night shifts completed',
        detail: 'Each one leaving behind a new lesson in pace, responsibility, or communication.',
      },
      {
        value: '30+',
        label: 'Follow-up notes reviewed',
        detail: 'Used to improve continuity and understand what changed overnight.',
      },
      {
        value: '1',
        label: 'Presentation style sharpened',
        detail: 'Shorter, clearer, and much more confident by the end of the block.',
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1580281657527-47c6484ddda8?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1200',
    ],
    featured: false,
    sortOrder: 4,
    status: 'published',
  },
  {
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
  },
  {
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
  },
];
