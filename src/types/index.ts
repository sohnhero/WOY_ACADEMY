import { LucideIcon } from 'lucide-react';

export type Theme = 'terracotta' | 'violet';
export type TabType = 'accueil' | 'cours' | 'rapport' | 'laamb' | 'communaute' | 'profil';

export interface Reward {
  icon: LucideIcon;
  text: string;
}

export interface SubModule {
  id: string;
  title: string;
  time: string;
  done: boolean;
  current?: boolean;
}

export interface Level {
  id: string;
  label: string;
  title: string;
  badge: string;
  status: 'en cours' | 'à venir' | 'verrouillé' | 'complété';
  progress: number;
  modules: number;
  totalModules: number;
  time: string;
  Icon: LucideIcon;
  color: string;
  textColor: string;
  rewards: Reward[];
  subModules: SubModule[];
}

export interface Enrollment {
  id: string;
  name: string;
  email: string;
  course: string;
  status: 'Active' | 'Pending' | 'Completed';
  date: string;
}

export interface UserStats {
  xp: number;
  streak: number;
  n1Modules: number;
  globalCoins: number;
}
