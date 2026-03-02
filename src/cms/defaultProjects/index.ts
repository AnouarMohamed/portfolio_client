import type { Project } from '../../types';
import { anatomySketchbookProject } from './anatomySketchbookProject';
import { communityHealthCaravanProject } from './communityHealthCaravanProject';
import { eveningPaintingsProject } from './eveningPaintingsProject';
import { internalMedicineNightShiftProject } from './internalMedicineNightShiftProject';
import { pediatricsRotationProject } from './pediatricsRotationProject';
import { studentResearchPosterProject } from './studentResearchPosterProject';

export const DEFAULT_PROJECTS: Project[] = [
  pediatricsRotationProject,
  communityHealthCaravanProject,
  anatomySketchbookProject,
  internalMedicineNightShiftProject,
  studentResearchPosterProject,
  eveningPaintingsProject,
];
