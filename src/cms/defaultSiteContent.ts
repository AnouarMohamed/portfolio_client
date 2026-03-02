import type { CmsSiteContent } from './schema';

export const DEFAULT_SITE_CONTENT: CmsSiteContent = {
  siteName: 'Aya Anouar',
  siteTitle: 'Aya Anouar | Fifth-year medical student',
  siteDescription:
    "I'm Aya Anouar, a fifth-year medical student who loves thoughtful medicine, painting, reflective writing, and the small rituals that keep demanding days human.",
  siteUrl: 'https://aya-anouar.vercel.app',
  contactEmail: 'aya.anouar@example.com',
  contactLocation: 'Casablanca, Morocco',
  responseTime: 'I usually reply within a few days',
  availability: "I'm open to student opportunities, research conversations, volunteering, and warm hellos",
  footerDescription:
    "This is my personal space: a place for medicine, painting, notes, and the parts of everyday life that are shaping who I'm becoming.",
  footerTagline: 'Medicine, color, and quiet discipline.',
  navItems: [
    { id: 'nav-home', label: 'Home', href: '/' },
    { id: 'nav-highlights', label: 'Highlights', href: '/portfolio' },
    { id: 'nav-notes', label: 'Notes', href: '/journal' },
    { id: 'nav-about', label: 'About', href: '/about' },
    { id: 'nav-contact', label: 'Contact', href: '/contact' },
  ],
  socialLinks: [
    {
      id: 'social-instagram',
      label: 'Instagram',
      href: 'https://www.instagram.com/',
      icon: 'instagram',
    },
    {
      id: 'social-linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/',
      icon: 'linkedin',
    },
    {
      id: 'social-twitter',
      label: 'X',
      href: 'https://x.com/',
      icon: 'twitter',
    },
    {
      id: 'social-email',
      label: 'Email',
      href: 'mailto:aya.anouar@example.com?subject=Hello%20Aya',
      icon: 'mail',
    },
  ],
  contactMethods: [
    {
      id: 'contact-email',
      label: 'Email',
      value: 'aya.anouar@example.com',
      href: 'mailto:aya.anouar@example.com?subject=Hello%20Aya',
      icon: 'mail',
    },
    {
      id: 'contact-location',
      label: 'Based in',
      value: 'Casablanca, Morocco',
      href: 'https://www.google.com/maps/search/?api=1&query=Casablanca%2C%20Morocco',
      icon: 'map-pin',
      external: true,
    },
    {
      id: 'contact-response',
      label: 'Usually replies',
      value: 'Within a few days',
      href: 'mailto:aya.anouar@example.com?subject=Hello%20Aya',
      icon: 'clock-3',
    },
  ],
  serviceOptions: [
    'Say hello',
    'Student collaboration',
    'Research opportunity',
    'Volunteering',
    'Creative exchange',
    'Something else',
  ],
  timelineOptions: [
    'This week',
    'This month',
    'No rush',
    'Whenever works',
  ],
  budgetOptions: [
    'Clinical rotations',
    'Research and writing',
    'Painting and illustration',
    'Books and everyday life',
    'Just saying hi',
  ],
};
