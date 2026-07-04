export type QuestStatus = 'active' | 'claimed' | 'available';

export interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  progressCurrent: number;
  progressTarget: number;
  claimed: boolean;
  statusType: 'lime' | 'cyan' | 'pink' | 'gray';
}

export interface BlackMarketItem {
  id: string;
  name: string;
  category: string;
  rarity: 'RARE' | 'EPIC' | 'LEGENDARY' | 'ELITE';
  price: number;
  image: string;
  owned: boolean;
  unlockedAt: string;
  badgeStyle: string;
}

export interface SquadPost {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  content: string;
  streakDays?: number;
  badgeTitle?: string;
  badgeDetail?: string;
  progressPercent?: number;
  progressLabel?: string;
  type: 'streak' | 'badge' | 'progress';
  congratsCount: number;
  hasCongratulated: boolean;
  hasSupported: boolean;
  supportsCount: number;
}

export interface Operative {
  id: string;
  name: string;
  rank: string;
  streak: number;
  status: 'stable' | 'vulnerable';
  avatar: string;
}

export interface ChatMessage {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timeAgo: string;
  isYou?: boolean;
  borderColor?: string;
}
