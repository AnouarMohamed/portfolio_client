import type { BlogPost } from '../types';

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-minimalist-living',
    title: 'The Art of Minimalist Living',
    excerpt:
      'Exploring how simplicity can bring profound clarity to our daily routines and creative spaces.',
    content:
      'Minimalism is more than just an aesthetic; it is a philosophy of intentionality. By removing the excess, we make room for what truly matters.\n\nIn this post, we dive into the psychology of clutter, curating a workspace that inspires, and digital minimalism in an always-on world.\n\nSimplicity is the ultimate sophistication.',
    date: '2024-03-15',
    category: 'Lifestyle',
    image:
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800',
    sortOrder: 1,
    status: 'published',
  },
  {
    id: 'post-beauty-mundane',
    title: 'Finding Beauty in the Mundane',
    excerpt:
      'A photographic journey through the quiet moments that often go unnoticed in the bustle of life.',
    content:
      'We often chase the grand milestones, forgetting that life happens in the quiet intervals. The steam rising from a morning coffee, the way light hits a dusty bookshelf, the sound of rain against the window.\n\nThese are the moments that ground us.',
    date: '2024-03-10',
    category: 'Photography',
    image:
      'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=800',
    sortOrder: 2,
    status: 'published',
  },
  {
    id: 'post-digital-design',
    title: 'The Future of Digital Design',
    excerpt:
      'How organic shapes and soft aesthetics are redefining our relationship with technology.',
    content:
      'As we spend more time in digital environments, the need for human-centric design grows. We are seeing a shift away from cold, sharp edges towards soft shadows, organic curves, and tactile interfaces.',
    date: '2024-03-05',
    category: 'Design',
    image:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
    sortOrder: 3,
    status: 'published',
  },
  {
    id: 'post-morning-rituals',
    title: 'Morning Rituals for Creativity',
    excerpt:
      'How the first hour of your day sets the tone for your creative output and mental clarity.',
    content:
      'The morning is a sacred time. Before the noise of the world rushes in, we have a window of opportunity to set our intentions.',
    date: '2024-02-28',
    category: 'Lifestyle',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800',
    sortOrder: 4,
    status: 'published',
  },
  {
    id: 'post-color-design',
    title: 'The Power of Color in Design',
    excerpt:
      'How different hues influence our emotions and the way we interact with digital products.',
    content:
      'Color is one of the most powerful tools in a designer\'s toolkit. It can evoke emotion, create hierarchy, and guide a user\'s attention.',
    date: '2024-02-20',
    category: 'Design',
    image:
      'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&q=80&w=800',
    sortOrder: 5,
    status: 'published',
  },
  {
    id: 'post-golden-hour',
    title: 'Capturing the Golden Hour',
    excerpt:
      'Tips for photographers on how to make the most of that magical time just before sunset.',
    content:
      'The golden hour is a photographer\'s dream. The soft, warm light creates long shadows and a magical atmosphere that is hard to replicate.',
    date: '2024-02-15',
    category: 'Photography',
    image:
      'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&q=80&w=800',
    sortOrder: 6,
    status: 'published',
  },
  {
    id: 'post-sustainable-design',
    title: 'Sustainable Design Practices',
    excerpt:
      'How designers can contribute to a more sustainable future through mindful material choices and processes.',
    content:
      'Sustainability is no longer an option; it is a necessity. As designers, we have a responsibility to consider the environmental impact of our work.',
    date: '2024-02-10',
    category: 'Design',
    image:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
    sortOrder: 7,
    status: 'published',
  },
  {
    id: 'post-typography',
    title: 'The Importance of Typography',
    excerpt:
      'Why choosing the right typeface is crucial for effective communication and brand identity.',
    content:
      'Typography is the voice of your design. It conveys tone, personality, and emotion before a single word is read.',
    date: '2024-02-05',
    category: 'Design',
    image:
      'https://images.unsplash.com/photo-1517210122415-b0c70b2a09bf?auto=format&fit=crop&q=80&w=800',
    sortOrder: 8,
    status: 'published',
  },
];
