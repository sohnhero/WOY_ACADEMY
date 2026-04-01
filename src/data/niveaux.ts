import { 
  Trophy, 
  Shield, 
  Wallet, 
  Eye, 
  TrendingUp, 
  Zap, 
  Clock, 
  BarChart3, 
  Swords, 
  Award 
} from 'lucide-react';
import { Level } from '../types';

export const niveaux: Level[] = [
  {
    id: 'N0', label: 'N0', title: "L'Argent & les Marchés", badge: 'GRATUIT',
    status: 'en cours', progress: 0, modules: 0, totalModules: 10, time: '82 min',
    Icon: Clock, color: 'bg-accent', textColor: 'text-highlight',
    rewards: [],
    subModules: [
      { id: 'N0.1', title: "C'est quoi l'argent vraiment ?", time: '10 min', done: false, current: true },
      { id: 'N0.2', title: "C'est quoi un marché financier ?", time: '8 min', done: false },
      { id: 'N0.3', title: "C'est quoi la blockchain ?", time: '8 min', done: false },
      { id: 'N0.4', title: "C'est quoi la crypto ?", time: '8 min', done: false },
      { id: 'N0.5', title: "Pourquoi l'Afrique s'y intéresse ?", time: '8 min', done: false },
      { id: 'N0.6', title: "Des cauris au FCFA", time: '8 min', done: false },
      { id: 'N0.7', title: "L'inflation", time: '7 min', done: false },
      { id: 'N0.8', title: "Western Union vs crypto", time: '8 min', done: false },
      { id: 'N0.9', title: "Mobile Money vs crypto", time: '8 min', done: false },
      { id: 'N0.10', title: "Comprendre les risques", time: '9 min', done: false },
    ],
  },
  {
    id: 'N1', label: 'N1', title: 'Sécurité', badge: '15 000 FCFA',
    status: 'en cours', progress: 68, modules: 3, totalModules: 10, time: '~90 min',
    Icon: Shield, color: 'bg-accent', textColor: 'text-highlight',
    rewards: [],
    subModules: [
      { id: 'N1.1', title: 'Les bases de la sécurité crypto', time: '8min', done: true },
      { id: 'N1.2', title: 'Mots de passe et 2FA', time: '7min', done: true },
      { id: 'N1.3', title: 'Sécuriser son wallet', time: '10min', done: false, current: true },
      { id: 'N1.4', title: 'Reconnaître un faux projet', time: '9min', done: false },
    ],
  },
  {
    id: 'N2', label: 'N2', title: 'Fondamentaux', badge: '20 000 FCFA',
    status: 'verrouillé', progress: 0, modules: 0, totalModules: 12, time: '',
    Icon: Wallet, color: 'bg-white/10', textColor: 'text-white/40',
    rewards: [{ icon: BarChart3, text: 'Rapport débloqué' }],
    subModules: [],
  },
  {
    id: 'N3', label: 'N3', title: 'Lire le marché', badge: '25 000 FCFA',
    status: 'verrouillé', progress: 0, modules: 0, totalModules: 10, time: '',
    Icon: Eye, color: 'bg-white/10', textColor: 'text-white/40',
    rewards: [{ icon: Award, text: 'NFT Lecteur' }, { icon: Swords, text: 'LAAMB débloqué' }],
    subModules: [],
  },
  {
    id: 'N4', label: 'N4', title: 'Trader le marché', badge: '30 000 FCFA',
    status: 'verrouillé', progress: 0, modules: 0, totalModules: 15, time: '',
    Icon: TrendingUp, color: 'bg-white/10', textColor: 'text-white/40',
    rewards: [{ icon: Award, text: 'NFT Analyste' }],
    subModules: [],
  },
  {
    id: 'N5', label: 'N5', title: 'AF & Avancé', badge: '40 000 FCFA',
    status: 'verrouillé', progress: 0, modules: 0, totalModules: 18, time: '',
    Icon: Zap, color: 'bg-white/10', textColor: 'text-white/40',
    rewards: [{ icon: Award, text: 'NFT Avancé WOY' }],
    subModules: [],
  },
  {
    id: 'N6', label: 'N6', title: 'Maîtrise Pro', badge: '70 000 FCFA',
    status: 'verrouillé', progress: 0, modules: 0, totalModules: 11, time: '',
    Icon: Trophy, color: 'bg-white/10', textColor: 'text-white/40',
    rewards: [{ icon: Award, text: 'NFT Pro + Ambassadeur' }],
    subModules: [],
  },
];
