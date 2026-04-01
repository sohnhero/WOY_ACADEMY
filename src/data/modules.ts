export interface Module {
  id: string;
  title: string;
  xp: number;
  status: 'en cours' | 'à venir' | 'verrouillé' | 'complété';
  progress?: number;
  time?: string;
  lockedMsg?: string;
}

export const modules: Module[] = [
  { id: '1.3', title: 'Sécuriser son wallet', xp: 150, status: 'en cours', progress: 68 },
  { id: '1.4', title: 'Reconnaître un faux projet', xp: 150, status: 'à venir', time: '9 min' },
  { id: '2', title: 'Fondamentaux', xp: 200, status: 'verrouillé', lockedMsg: "Terminer N1 d'abord" },
];
