export function createInquiryMessage(siteName: string, projectName: string) {
  return `Hi ${siteName},\n\nI'm reaching out after reading ${projectName}. Here is a little context:`;
}

export function isValidEmailAddress(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function buildInquiryMailtoUrl(args: {
  contactEmail: string;
  siteName: string;
  name: string;
  email: string;
  message: string;
  service: string;
  budget: string;
  timeline: string;
  projectName?: string;
}) {
  const subject = args.projectName
    ? `Message for ${args.siteName} - ${args.projectName}`
    : `Hello ${args.siteName} - ${args.name}`;

  const body = [
    `Name: ${args.name}`,
    `Email: ${args.email}`,
    `Reason: ${args.service}`,
    `Current focus: ${args.budget}`,
    `Timing: ${args.timeline}`,
    args.projectName ? `Highlight: ${args.projectName}` : null,
    '',
    args.message,
  ]
    .filter(Boolean)
    .join('\n');

  return `mailto:${args.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
