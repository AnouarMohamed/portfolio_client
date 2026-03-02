export function createInquiryMessage(siteName: string, projectName: string) {
  return `Hi ${siteName},\n\nI'm interested in discussing ${projectName}. Here is a bit more context:`;
}

export function isValidEmailAddress(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function buildInquiryMailtoUrl(args: {
  contactEmail: string;
  name: string;
  email: string;
  message: string;
  service: string;
  budget: string;
  timeline: string;
  projectName?: string;
}) {
  const subject = args.projectName
    ? `Project inquiry - ${args.projectName}`
    : `Project inquiry from ${args.name}`;

  const body = [
    `Name: ${args.name}`,
    `Email: ${args.email}`,
    `Service: ${args.service}`,
    `Budget: ${args.budget}`,
    `Timeline: ${args.timeline}`,
    args.projectName ? `Project: ${args.projectName}` : null,
    '',
    args.message,
  ]
    .filter(Boolean)
    .join('\n');

  return `mailto:${args.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
