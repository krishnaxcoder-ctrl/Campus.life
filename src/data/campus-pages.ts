// Inner pages of the My Campus tiles (other than VTU, which has its own screen).
import { Img } from '@/constants/cl-assets';

export type SubCampus = {
  title: string;
  // 'tight' = title right after the back arrow, 'std' = title at 72dp with a 3-dot menu
  variant: 'tight' | 'std';
  menu?: boolean;
  banner: number;
  gridTop: number;
  rowGap: number;
  tiles: { name: string; image: number }[];
};

const S = Img.sub;

export const SUB_CAMPUS: Record<string, SubCampus> = {
  zap: {
    title: 'Internship Leagues',
    variant: 'std',
    menu: true,
    banner: S.zapBanner,
    gridTop: 13.5,
    rowGap: 20.3,
    tiles: [
      { name: 'Internship League July 2026', image: S.zapJuly },
      { name: 'Agentica 2.0', image: S.zapAgentica },
      { name: 'Finathon 2.0', image: S.zapFinathon },
    ],
  },
  siu: {
    title: 'SIU',
    variant: 'tight',
    banner: S.siuBanner,
    gridTop: 19.7,
    rowGap: 26.7,
    tiles: [
      { name: 'Batch of 2026', image: S.siuBatch },
      { name: 'Schools', image: S.siuSchools },
      { name: 'Clubs', image: S.siuClubs },
      { name: 'Events', image: S.siuEvents },
      { name: 'Leagues', image: S.siuLeagues },
      { name: 'Marketplace', image: S.siuMarketplace },
      { name: 'CL Forms', image: S.siuForms },
      { name: 'Session Feedback', image: S.siuFeedback },
    ],
  },
  sricity: {
    title: 'SriCity',
    variant: 'tight',
    banner: S.sricityBanner,
    gridTop: 19.7,
    rowGap: 26.7,
    tiles: [
      { name: 'Mango Feast', image: S.sricityMango },
      { name: 'Chess', image: S.sricityChess },
      { name: 'Fusion StrEat', image: S.sricityFusion },
      { name: 'Yoga Day', image: S.sricityYoga },
      { name: 'Clubs', image: S.sricityClubs },
      { name: 'Past Events', image: S.sricityPast },
      { name: 'Power Communicators League', image: S.sricityPower },
    ],
  },
  word: {
    title: 'Word Games',
    variant: 'std',
    menu: true,
    banner: S.wordBanner,
    gridTop: 13.5,
    rowGap: 20.3,
    tiles: [
      { name: 'Odd One Out', image: S.wordOdd },
      { name: 'Hangman', image: S.wordHangman },
      { name: 'Anagram Magrana', image: S.wordAnagram },
      { name: 'Word Grid', image: S.wordGrid },
      { name: 'Yell & Spell', image: S.wordYell },
      { name: 'Crossword', image: S.wordCrossword },
      { name: 'Sortonym', image: S.wordSortonym },
      { name: 'Bulls and Bears', image: S.wordBulls },
      { name: 'Leaderboard', image: S.wordLeaderboard },
    ],
  },
};
