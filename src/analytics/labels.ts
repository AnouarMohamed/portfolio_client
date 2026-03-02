import type { AnalyticsEventType } from '../cms/schema';

export const ANALYTICS_EVENT_LABELS: Record<AnalyticsEventType, string> = {
  page_view: 'Page view',
  cta_click: 'CTA click',
  project_open: 'Project open',
  portfolio_filter: 'Portfolio filter',
  journal_filter: 'Journal filter',
  journal_page: 'Journal pagination',
  journal_post_open: 'Journal post open',
  contact_method_click: 'Contact click',
  inquiry_submit: 'Inquiry draft',
  admin_login: 'Admin login',
  admin_login_failed: 'Admin login failed',
  admin_logout: 'Admin logout',
  admin_content_saved: 'Admin save',
};
