import type { CmsSiteContent } from './schema';

export const DEFAULT_SITE_CONTENT: CmsSiteContent = {
  siteName: 'Aura Studio',
  siteTitle: 'Aura Studio | Strategy-led portfolio design and frontend craft',
  siteDescription:
    'Aura Studio designs conversion-focused portfolio, product, and brand experiences for thoughtful founders and ambitious teams.',
  siteUrl: 'https://example.com',
  contactEmail: 'hello@aurastudio.com',
  contactLocation: 'London, United Kingdom',
  responseTime: 'Replies within 48 hours',
  availability: 'Booking select Q2 and Q3 collaborations',
  footerDescription:
    'Strategy-led portfolio, brand, and frontend work for founders and teams who want sharper presentation and stronger digital first impressions.',
  footerTagline: 'Crafted with intention.',
  navItems: [
    { id: 'nav-home', label: 'Home', href: '/' },
    { id: 'nav-portfolio', label: 'Portfolio', href: '/portfolio' },
    { id: 'nav-journal', label: 'Journal', href: '/journal' },
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
      id: 'social-twitter',
      label: 'X',
      href: 'https://x.com/',
      icon: 'twitter',
    },
    {
      id: 'social-linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/',
      icon: 'linkedin',
    },
    {
      id: 'social-email',
      label: 'Email',
      href: 'mailto:hello@aurastudio.com?subject=Project%20Inquiry',
      icon: 'mail',
    },
  ],
  contactMethods: [
    {
      id: 'contact-email',
      label: 'Email Us',
      value: 'hello@aurastudio.com',
      href: 'mailto:hello@aurastudio.com?subject=Project%20Inquiry',
      icon: 'mail',
    },
    {
      id: 'contact-location',
      label: 'Location',
      value: 'London, United Kingdom',
      href: 'https://www.google.com/maps/search/?api=1&query=London%2C%20United%20Kingdom',
      icon: 'map-pin',
      external: true,
    },
    {
      id: 'contact-response',
      label: 'Response Window',
      value: 'Replies within 48 hours',
      href: 'mailto:hello@aurastudio.com?subject=Project%20Inquiry',
      icon: 'clock-3',
    },
  ],
  serviceOptions: [
    'Portfolio Design',
    'Brand Direction',
    'Product Design',
    'Frontend Build',
    'Design System',
    'Strategy Sprint',
  ],
  timelineOptions: [
    'ASAP',
    'Within 2 weeks',
    'Within 1 month',
    'Within 1 quarter',
    'Flexible',
  ],
  budgetOptions: [
    '$3k-$6k',
    '$6k-$12k',
    '$12k-$20k',
    '$20k+',
    'Need guidance',
  ],
};
