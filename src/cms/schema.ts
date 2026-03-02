import type {
  BlogPost,
  ContactMethod,
  FAQItem,
  NavItem,
  ProcessStep,
  Project,
  Service,
  SocialLink,
  Stat,
  Testimonial,
} from '../types';

export interface HomeHeroContent {
  badge: string;
  titleLeading: string;
  titleHighlight: string;
  titleTrailing: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  showcaseEyebrow: string;
  showcaseTitle: string;
  showcaseDescription: string;
  showcaseImage: string;
  showcaseImageAlt: string;
}

export interface ContentIntro {
  eyebrow: string;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface DifferentiatorItem {
  id: string;
  title: string;
  description: string;
  icon: ProcessStep['icon'];
}

export interface FinalCtaContent {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface AboutPageContent {
  eyebrow: string;
  titleLeading: string;
  titleHighlight: string;
  titleTrailing: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  bestFit: string;
}

export interface ContactPageContent {
  badge: string;
  titleLeading: string;
  titleHighlight: string;
  titleTrailing: string;
  description: string;
  formNote: string;
  submitLabel: string;
}

export interface JournalPageContent {
  title: string;
  description: string;
}

export interface PortfolioPageContent {
  eyebrow: string;
  title: string;
  description: string;
}

export interface CmsSiteContent {
  siteName: string;
  siteTitle: string;
  siteDescription: string;
  siteUrl: string;
  contactEmail: string;
  contactLocation: string;
  responseTime: string;
  availability: string;
  footerDescription: string;
  footerTagline: string;
  navItems: NavItem[];
  socialLinks: SocialLink[];
  contactMethods: ContactMethod[];
  serviceOptions: string[];
  timelineOptions: string[];
  budgetOptions: string[];
}

export interface CmsHomeContent {
  hero: HomeHeroContent;
  stats: Stat[];
  trustMarks: string[];
  servicesIntro: ContentIntro;
  services: Service[];
  featuredIntro: ContentIntro;
  differentiatorsIntro: ContentIntro;
  differentiators: DifferentiatorItem[];
  processIntro: ContentIntro;
  process: ProcessStep[];
  testimonialsIntro: ContentIntro;
  testimonials: Testimonial[];
  faqIntro: ContentIntro;
  faqs: FAQItem[];
  finalCta: FinalCtaContent;
}

export interface CmsPagesContent {
  portfolio: PortfolioPageContent;
  about: AboutPageContent;
  contact: ContactPageContent;
  journal: JournalPageContent;
}

export interface CmsContent {
  site: CmsSiteContent;
  home: CmsHomeContent;
  pages: CmsPagesContent;
  projects: Project[];
  blogPosts: BlogPost[];
}

export interface CmsEnvelope {
  content: CmsContent;
  updatedAt: string;
}

export interface AuthSession {
  authenticated: boolean;
  username?: string;
  csrfToken?: string;
}

export type AnalyticsEventType =
  | 'page_view'
  | 'cta_click'
  | 'project_open'
  | 'portfolio_filter'
  | 'journal_filter'
  | 'journal_page'
  | 'journal_post_open'
  | 'contact_method_click'
  | 'inquiry_submit'
  | 'admin_login'
  | 'admin_login_failed'
  | 'admin_logout'
  | 'admin_content_saved';

export interface AnalyticsEventPayload {
  sessionId: string;
  eventType: AnalyticsEventType;
  path: string;
  label?: string | null;
  metadata?: Record<string, boolean | number | string | null> | null;
}

export interface AnalyticsEventRecord extends AnalyticsEventPayload {
  id: number;
  createdAt: string;
}

export interface AnalyticsVisitPoint {
  date: string;
  pageViews: number;
  visitors: number;
}

export interface AnalyticsCountItem {
  label: string;
  value: number;
}

export interface AnalyticsEventBreakdownItem {
  eventType: AnalyticsEventType;
  count: number;
}

export interface AnalyticsOverview {
  totalVisitors: number;
  totalPageViews: number;
  totalActions: number;
  totalInquiries: number;
}

export interface AnalyticsSnapshot {
  windowDays: number;
  overview: AnalyticsOverview;
  visitsByDay: AnalyticsVisitPoint[];
  topPages: AnalyticsCountItem[];
  actionsByType: AnalyticsEventBreakdownItem[];
  recentEvents: AnalyticsEventRecord[];
}
