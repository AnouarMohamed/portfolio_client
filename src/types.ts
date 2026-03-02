export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  image: string;
  sortOrder: number;
  status: 'draft' | 'published';
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export type IconKey =
  | 'arrow-right'
  | 'briefcase'
  | 'camera'
  | 'clock-3'
  | 'code-2'
  | 'heart-handshake'
  | 'instagram'
  | 'linkedin'
  | 'mail'
  | 'map-pin'
  | 'sparkles'
  | 'twitter'
  | 'zap';

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: IconKey;
}

export interface ContactMethod {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: IconKey;
  external?: boolean;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
  detail?: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
  detail: string;
}

export interface ProjectTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  duration: string;
  role: string;
  headline: string;
  description: string;
  summary: string;
  image: string;
  tags: string[];
  services: string[];
  stack: string[];
  challenge: string;
  approach: string;
  outcome: string;
  results: ProjectMetric[];
  gallery: string[];
  testimonial?: ProjectTestimonial;
  featured?: boolean;
  sortOrder: number;
  status: 'draft' | 'published';
}
