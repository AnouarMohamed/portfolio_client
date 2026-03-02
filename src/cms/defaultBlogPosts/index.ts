import type { BlogPost } from '../../types';
import { anatomySketchbookPost } from './anatomySketchbookPost';
import { booksThisSemesterPost } from './booksThisSemesterPost';
import { groundingHabitsPost } from './groundingHabitsPost';
import { paintingAfterShiftsPost } from './paintingAfterShiftsPost';
import { pediatricsListeningPost } from './pediatricsListeningPost';
import { speakingUpOnRoundsPost } from './speakingUpOnRoundsPost';

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  pediatricsListeningPost,
  anatomySketchbookPost,
  groundingHabitsPost,
  paintingAfterShiftsPost,
  booksThisSemesterPost,
  speakingUpOnRoundsPost,
];
