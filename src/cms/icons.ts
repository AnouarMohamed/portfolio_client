import {
  ArrowRight,
  Briefcase,
  Camera,
  Clock3,
  Code2,
  HeartHandshake,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Twitter,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type { IconKey } from '../types';

export const ICONS: Record<IconKey, LucideIcon> = {
  'arrow-right': ArrowRight,
  briefcase: Briefcase,
  camera: Camera,
  'clock-3': Clock3,
  'code-2': Code2,
  'heart-handshake': HeartHandshake,
  instagram: Instagram,
  linkedin: Linkedin,
  mail: Mail,
  'map-pin': MapPin,
  sparkles: Sparkles,
  twitter: Twitter,
  zap: Zap,
};

export const ADMIN_ICON_OPTIONS = Object.keys(ICONS) as IconKey[];
