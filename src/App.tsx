/**
 * WÔY Academy — Accueil Screen
 * Mobile PWA layout matching the screenshot exactly.
 * Desktop: enhanced 3-column cosmic layout.
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Trophy,
  Flame,
  Shield,
  Swords,
  ChevronRight,
  Bell,
  Home,
  BookOpen,
  BarChart3,
  Users,
  User,
  Coins,
  Play,
  Clock,
  Lock,
  Moon,
  Sun,
  Search,
  CheckCircle2,
  Award,
  TrendingUp,
  Zap,
  CircleCheck,
  Wallet,
  Eye,
  ArrowLeft,
  Rocket,
  Clapperboard,
  Smartphone,
  Gamepad2,
  PlayCircle,
  Lightbulb,
  MessageSquare,
  Send,
  Crown,
  Globe,
  Hourglass,
  Ban,
  LineChart,
  Mail,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  Check,
  X,
  Target,
  Calendar,
  Star,
  ShieldCheck,
  Medal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Custom Identity Icons (Minimalist Animal SVGs) ---
const LionIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a5 5 0 0 1 5 5v2a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V7a5 5 0 0 1 5-5z" />
    <path d="M7 11v1a5 5 0 0 0 5 5h0a5 5 0 0 0 5-5v-1" />
    <path d="M12 17v4" />
    <path d="M8 21h8" />
    <path d="M19 8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2" />
    <path d="M5 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2" />
  </svg>
);

const EagleIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2L4 9l2 10 6-3 6 3 2-10-8-7z" />
    <path d="M8 12h8" />
    <path d="M12 9v12" />
    <path d="M4 9l8 4 8-4" />
  </svg>
);

const PantherIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M16 8l-2 2h-4l-2-2" />
    <path d="M9 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
    <path d="M15 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
    <path d="M12 15v2" />
    <path d="M10 18h4" />
  </svg>
);

const SnakeIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
    <path d="M19 5c-1.5 0-3 1-3 3v8c0 2-1.5 3-3 3H7c-1.5 0-3-1-3-3V11" />
    <path d="M11 6V3" />
    <path d="M19 19c-1.5 0-3-1-3-3" />
  </svg>
);

// --- Types ---
type Theme = 'terracotta' | 'violet';

// --- Score Ring SVG ---
const ScoreRing = ({ score, size = 90, strokeWidth = 7, id = 'default' }: { score: number; size?: number; strokeWidth?: number; id?: string }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const gradientId = `scoreGradient-${id}`;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B5472A" />
            <stop offset="50%" stopColor="#C4A055" />
            <stop offset="100%" stopColor="#D4AF37" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className={cn("font-bold text-white leading-none", size <= 80 ? "text-xl" : "text-3xl")}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
        >
          {score}
        </motion.span>
        <span className={cn("text-white/40 uppercase tracking-[0.15em] font-bold", size <= 80 ? "text-[6px] mt-0.5" : "text-[8px] mt-1")}>Score</span>
      </div>
    </div>
  );
};

// --- Progress Bar ---
const ProgressBar = ({ progress, colorClass = 'bg-gradient-to-r from-[#B5472A] to-[#C4A055]' }: { progress: number; colorClass?: string }) => (
  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shrink-0">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
      className={cn("h-full rounded-full", colorClass)}
    />
  </div>
);

// --- StarField ---
const StarField = () => {
  const stars = useMemo(() => Array.from({ length: 45 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 1.4 + 0.4,
    duration: Math.random() * 5 + 4,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1
  })), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: star.size > 1.1 ? '0 0 6px 0.5px rgba(255, 255, 255, 0.2)' : 'none',
            animation: `twinkle ${star.duration}s infinite ease-in-out ${star.delay}s`
          }}
        />
      ))}
    </div>
  );
};

// --- XP Bar ---
const XPBar = ({ current, total }: { current: number; total: number }) => {
  const pct = (current / total) * 100;
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-center text-[10px]">
        <span className="text-white/40">N1 maîtrisé</span>
        <span className="text-white/50 font-mono">{Math.round(pct)}%</span>
      </div>
      <ProgressBar progress={pct} />
      <div className="flex items-center gap-1.5 text-[10px] text-white/40 font-mono">
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-[#B5472A]" />
          <span className="inline-block w-2 h-2 rounded-full bg-[#C4A055]" />
        </div>
        <span>{current}/{total} XP</span>
      </div>
    </div>
  );
};

// --- Module Card ---
const ModuleCard: React.FC<{ mod: any; index: number; onClick?: () => void }> = ({ mod, index, onClick }) => {
  const statusIcon = () => {
    if (mod.status === 'en cours') return <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-[#C4A055]/30 to-[#C4A055]/10 flex items-center justify-center"><BookOpen size={18} className="text-[#C4A055]" /></div>;
    if (mod.status === 'à venir') return <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white/5 flex items-center justify-center"><Search size={18} className="text-white/40" /></div>;
    return <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white/5 flex items-center justify-center"><Lock size={18} className="text-white/20" /></div>;
  };

  return (
    <motion.div
      onClick={mod.status !== 'verrouillé' ? onClick : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 + index * 0.12 }}
      whileHover={mod.status !== 'verrouillé' ? { scale: 1.01 } : undefined}
      whileTap={mod.status !== 'verrouillé' ? { scale: 0.98 } : undefined}
      className={cn(
        "p-4 lg:p-5 rounded-2xl border transition-all duration-200 flex items-center gap-4 cursor-pointer",
        mod.status === 'verrouillé'
          ? "bg-white/[0.01] border-white/5 opacity-50"
          : "bg-white/[0.03] border-white/[0.08] hover:border-[#C4A055]/30 hover:bg-white/[0.05]"
      )}
    >
      {statusIcon()}

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <h5 className="font-semibold text-sm truncate">
              <span className="font-mono text-white/40 text-xs">N{mod.id}</span>
              <span className="mx-1 text-white/20">·</span>
              {mod.title}
            </h5>
            <p className="text-[11px] text-white/30 mt-0.5">
              {mod.status === 'en cours' && `En cours · ${mod.progress}% maîtrisé`}
              {mod.status === 'à venir' && `À venir · ${mod.time}`}
              {mod.status === 'verrouillé' && mod.lockedMsg}
            </p>
          </div>
          <span className="text-[#C4A055] text-xs font-bold font-mono shrink-0">+{mod.xp}</span>
        </div>
        {mod.progress && (
          <div className="mt-2.5">
            <ProgressBar progress={mod.progress} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- Desktop Stat Card ---
const StatCard = ({ icon: Icon, label, value, subValue, color }: any) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-2"
  >
    <div className={cn("p-2 rounded-lg w-fit", color)}>
      <Icon size={18} className="text-white" />
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-widest text-white/40 font-medium">{label}</p>
      <p className="text-xl font-bold text-white mt-1">{value}</p>
      {subValue && <p className="text-[10px] text-white/30 italic">{subValue}</p>}
    </div>
  </motion.div>
);

// --- Modules Data ---
const modules = [
  { id: '1.3', title: 'Sécuriser son wallet', xp: 150, status: 'en cours', progress: 68 },
  { id: '1.4', title: 'Reconnaître un faux projet', xp: 150, status: 'à venir', time: '9 min' },
  { id: '2', title: 'Fondamentaux', xp: 200, status: 'verrouillé', lockedMsg: "Terminer N1 d'abord" },
];

// --- Niveaux Data ---
const niveaux = [
  {
    id: 'N0', label: 'N0', title: "L'Argent & les Marchés", badge: 'GRATUIT',
    status: 'complété', progress: 100, modules: 10, totalModules: 10, time: '~80 min',
    Icon: CircleCheck, color: 'bg-green-500', textColor: 'text-green-400',
    rewards: [],
    subModules: [
      { id: 'N0.1', title: "C'est quoi l'argent vraiment ?", time: '7min', done: true },
      { id: 'N0.2', title: 'Les marchés financiers expliqués', time: '8min', done: true },
      { id: 'N0.3', title: "Inflation et pouvoir d'achat", time: '7min', done: true },
    ],
  },
  {
    id: 'N1', label: 'N1', title: 'Sécurité', badge: '15 000 FCFA',
    status: 'en cours', progress: 68, modules: 3, totalModules: 10, time: '~90 min',
    Icon: Shield, color: 'bg-[#B5472A]', textColor: 'text-[#C4A055]',
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

// --- Niveau Card Component ---
const NiveauCard: React.FC<{
  niveau: typeof niveaux[0];
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onOpenLesson?: (id: string) => void;
}> = ({ niveau, index, expanded, onToggle, onOpenLesson }) => {
  const isLocked = niveau.status === 'verrouillé';
  const isDone = niveau.status === 'complété';
  const isInProgress = niveau.status === 'en cours';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      whileHover={!isLocked ? { scale: 1.01 } : undefined}
      whileTap={!isLocked ? { scale: 0.98 } : undefined}
      className={cn(
        "rounded-2xl border overflow-hidden transition-all duration-200 cursor-pointer",
        isLocked ? "bg-white/[0.02] border-white/5 opacity-70" : "bg-white/[0.03] border-white/[0.08] hover:border-[#C4A055]/30 hover:bg-white/[0.05]"
      )}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        disabled={isLocked}
        className="w-full p-4 flex items-center gap-4 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h5 className="font-bold text-sm">
              {niveau.id} — {niveau.title}
              {niveau.id === 'N6' && <Trophy size={14} className="inline ml-1.5 text-[#C4A055]" />}
            </h5>
            <span className={cn(
              "text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0",
              niveau.badge === 'GRATUIT'
                ? "border border-green-500/30 text-green-400"
                : "border border-[#C4A055]/30 text-[#C4A055]"
            )}>
              {niveau.badge}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-white/40 flex-wrap">
            {isDone && <CircleCheck size={14} className="text-green-400" />}
            {isInProgress && <Flame size={14} className="text-orange-400" />}
            {isLocked && <Lock size={12} className="text-white/20" />}
            <span>{niveau.totalModules} modules</span>
            {niveau.time && <span>{niveau.time}</span>}
            {isDone && <span className="text-green-400">Complété</span>}
            {isInProgress && <span className="text-[#C4A055] font-bold">En cours {niveau.progress}%</span>}
            {niveau.rewards.map((r, i) => (
              <span key={i} className="flex items-center gap-1 text-white/30">
                <r.icon size={11} /> {r.text}
              </span>
            ))}
          </div>
          {isInProgress && (
            <div className="mt-2.5">
              <ProgressBar progress={niveau.progress} colorClass="bg-gradient-to-r from-[#B5472A] to-[#C4A055]" />
            </div>
          )}
          {isDone && (
            <div className="mt-2.5">
              <ProgressBar progress={100} colorClass="bg-green-500/60" />
            </div>
          )}
        </div>
        {!isLocked && (
          <ChevronRight size={16} className={cn("text-white/30 transition-transform shrink-0", expanded && "rotate-90")} />
        )}
      </button>

      {/* Sub-modules */}
      <AnimatePresence>
        {expanded && niveau.subModules.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-white/5"
          >
            {niveau.subModules.map((sub, i) => (
              <div
                key={sub.id}
                onClick={() => onOpenLesson?.(sub.id === 'N1.3' ? '1.3' : sub.id)}
                className={cn(
                  "px-4 py-3 flex items-center gap-3 border-b border-white/[0.03] last:border-0 cursor-pointer hover:bg-white/[0.05] transition-colors",
                  sub.current && "bg-white/[0.03]"
                )}
              >
                <div className={cn(
                  "w-2 h-2 rounded-full shrink-0",
                  sub.done ? "bg-green-500" : sub.current ? "bg-[#C4A055]" : "bg-white/10"
                )} />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-mono text-white/30">{sub.id}</p>
                  <p className={cn("text-[13px]", sub.current ? "font-semibold text-white" : sub.done ? "text-white/60" : "text-white/40")}>
                    {sub.title}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {sub.done && <CircleCheck size={14} className="text-green-400" />}
                  <span className="text-[10px] text-white/30 font-mono">{sub.time}</span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ========== MAIN APP ==========

export default function App() {
  const [theme, setTheme] = useState<Theme>('terracotta');
  const [activeTab, setActiveTab] = useState('accueil');
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);

  // Dynamic State
  const [globalCoins, setGlobalCoins] = useState(175);
  const [isShieldActive, setIsShieldActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleActivateShield = () => {
    if (!isShieldActive && globalCoins >= 50) {
      setGlobalCoins(prev => prev - 50);
      setIsShieldActive(true);
    }
  };

  const colors = {
    terracotta: {
      bg: 'bg-[#0D0A07]',
      accent: 'bg-[#B5472A]',
      textAccent: 'text-[#C4A055]',
      gradient: 'from-[#1C1409] to-[#0D0A07]',
      glow: 'rgba(181, 71, 42, 0.15)',
      glowClass: 'bg-[#B5472A]',
    },
    violet: {
      bg: 'bg-[#0D0815]',
      accent: 'bg-[#7B2FBE]',
      textAccent: 'text-[#D4AF37]',
      gradient: 'from-[#1A1128] to-[#0D0815]',
      glow: 'rgba(123, 47, 190, 0.15)',
      glowClass: 'bg-[#7B2FBE]',
    },
  }[theme];

  const Logo = ({ className }: { className?: string }) => (
    <div
      className={cn("relative flex items-center justify-center w-10 h-10 shrink-0 cursor-pointer", className)}
      style={{ filter: `drop-shadow(0 4px 8px ${theme === 'terracotta' ? 'rgba(181,71,42,0.3)' : 'rgba(123,47,190,0.3)'})` }}
    >
      <div
        className={cn("absolute inset-0 shadow-lg shadow-black/20", colors.accent)}
        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
      />
      <span className="relative z-10 font-serif text-xl font-bold text-white mb-0.5">W</span>
    </div>
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Universal Scroll-to-Top on Navigation
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
    };

    // Immediate and slightly delayed for various mobile browser quirks
    scrollToTop();
    const timer = setTimeout(scrollToTop, 10);
    return () => clearTimeout(timer);
  }, [activeTab, currentLesson]);

  // ===========================
  //   AUTH SCREEN
  // ===========================
  const AuthScreen = ({ onLogin }: { onLogin: () => void }) => {
    const [view, setView] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onLogin();
    };

    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 relative z-50 min-h-[100dvh] safe-top w-full overflow-y-auto overflow-x-hidden">
        <button
          onClick={() => setTheme(theme === 'violet' ? 'terracotta' : 'violet')}
          className="absolute right-4 sm:right-6 p-2 rounded-full bg-white/5 border border-white/10 hover:scale-105 transition-transform z-10 cursor-pointer backdrop-blur-md hover:bg-white/10"
          style={{ top: 'max(1.5rem, env(safe-area-inset-top, 1.5rem))' }}
        >
          {theme === 'violet' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md relative mt-16 sm:mt-8 mb-8"
        >
          {/* Decorative Cinematic Backglow */}
          <div className="hidden sm:block absolute -inset-1 bg-gradient-to-tr from-[#B5472A]/20 via-[#C4A055]/10 to-transparent rounded-[1.5rem] sm:rounded-[2rem] blur-[20px] sm:blur-[30px] opacity-70 pointer-events-none" />

          <div className="p-2 sm:p-10 sm:rounded-[2rem] bg-transparent sm:bg-[#0A0705]/60 sm:backdrop-blur-3xl border-transparent sm:border-white/[0.08] sm:border flex flex-col items-center relative sm:overflow-hidden sm:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            {/* Interior Ambient Lights */}
            <div className="hidden sm:block absolute -top-32 -right-32 w-64 h-64 bg-[#C4A055]/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="hidden sm:block absolute -bottom-32 -left-32 w-64 h-64 bg-[#B5472A]/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Logo Wrapper */}
            <div className="relative mb-6 sm:mb-8">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#B5472A] to-[#C4A055] blur-[30px] opacity-20 rounded-full" />
              <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-2xl">
                <Logo className="w-10 h-10 sm:w-12 sm:h-12" />
              </div>
            </div>

            <h1 className="text-xl sm:text-3xl font-serif font-bold tracking-[0.1em] mb-2 sm:mb-3 uppercase text-center bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent relative z-10">
              {view === 'login' ? 'Connexion' : 'L\'Élite Wôy'}
            </h1>
            <p className="text-[10px] sm:text-[11px] text-white/40 mb-8 sm:mb-10 text-center font-medium px-1 sm:px-2 leading-relaxed relative z-10">
              {view === 'login'
                ? 'Accédez à votre espace confidentiel et poursuivez votre maîtrise.'
                : 'Créez votre profil chiffré pour débuter votre parcours vers la liberté financière.'}
            </p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 sm:gap-4 relative z-10">
              <AnimatePresence mode="popLayout">
                {view === 'register' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    className="relative overflow-hidden group"
                  >
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#C4A055] transition-colors" />
                    <input
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3.5 sm:py-4 pl-12 pr-4 text-base font-medium focus:outline-none focus:border-[#C4A055]/50 focus:bg-[#C4A055]/[0.02] focus:shadow-[0_0_20px_rgba(196,160,85,0.05)] transition-all text-white placeholder:text-white/20"
                      placeholder="Nom d'opérateur"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative group">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#C4A055] transition-colors" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3.5 sm:py-4 pl-12 pr-4 text-base font-medium focus:outline-none focus:border-[#C4A055]/50 focus:bg-[#C4A055]/[0.02] focus:shadow-[0_0_20px_rgba(196,160,85,0.05)] transition-all text-white placeholder:text-white/20"
                  placeholder="Adresse e-mail"
                />
              </div>

              <div className="relative group">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#C4A055] transition-colors" />
                <input
                  required
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3.5 sm:py-4 pl-12 pr-4 text-base font-medium focus:outline-none focus:border-[#C4A055]/50 focus:bg-[#C4A055]/[0.02] focus:shadow-[0_0_20px_rgba(196,160,85,0.05)] transition-all text-white placeholder:text-white/20 tracking-widest"
                  placeholder="••••••••"
                />
              </div>

              {view === 'login' && (
                <div className="flex justify-end mt-1 mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold cursor-pointer hover:text-[#C4A055] transition-colors">Clé d'accès perdue ?</span>
                </div>
              )}

              <button
                type="submit"
                className="mt-4 w-full relative overflow-hidden bg-gradient-to-r from-[#B5472A] to-[#C4A055] text-white font-bold py-4 rounded-xl text-sm uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(181,71,42,0.3)] hover:shadow-[0_15px_40px_rgba(196,160,85,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group cursor-pointer"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 flex items-center gap-2">
                  {view === 'login' ? 'Initialiser' : 'Créer l\'Identité'}
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </button>
            </form>

            <div className="w-full flex items-center gap-4 my-8 opacity-40 relative z-10">
              <div className="h-px bg-gradient-to-r from-transparent to-white flex-1" />
              <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-white">Sécurité Maximale</span>
              <div className="h-px bg-gradient-to-l from-transparent to-white flex-1" />
            </div>

            <div className="text-[11px] text-white/30 font-medium pb-2 flex flex-col sm:flex-row items-center justify-center gap-1.5 relative z-10 transition-colors">
              <span>{view === 'login' ? 'Protocole Wôy inactif ?' : 'Identité déjà forgée ?'}</span>
              <button
                type="button"
                onClick={() => {
                  setView(view === 'login' ? 'register' : 'login');
                  setEmail('');
                  setPassword('');
                  setName('');
                }}
                className="text-white/70 font-bold hover:text-[#C4A055] transition-colors uppercase tracking-[0.1em] cursor-pointer"
              >
                {view === 'login' ? 'Rejoindre la faction' : 'Accéder au terminal'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  // ===========================
  //   MOBILE LAYOUT
  // ===========================
  const MobileLayout = () => (
    <div className="lg:hidden flex flex-col min-h-screen pb-32">
      {/* Header */}
      <header className="px-5 pb-4 flex justify-between items-center safe-top">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10" />
          <div className="flex flex-col">
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold leading-none mb-1">Bon retour parmi nous</p>
            <h1 className="text-xl font-bold tracking-tight leading-none">Amadou</h1>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 bg-white/[0.06] border border-white/10 rounded-full px-3.5 py-1.5 hover:scale-[1.02] hover:border-[#C4A055]/30 active:scale-[0.97] transition-all duration-200"
          >
            <Coins size={14} className="text-[#C4A055]" />
            <span className="font-mono text-sm font-bold">{globalCoins}</span>
          </motion.div>
          <button
            onClick={() => setTheme(theme === 'violet' ? 'terracotta' : 'violet')}
            className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:scale-105 hover:border-[#C4A055]/30 transition-all duration-200 cursor-pointer"
          >
            {theme === 'violet' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <div className="relative">
            <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center cursor-pointer group hover:border-[#C4A055]/30 transition-all">
              <Bell size={16} className="text-white/60 group-hover:text-white transition-colors" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#B5472A] rounded-full border-2 border-[#0D0A07]" />
          </div>
        </div>
      </header>

      {/* Score + League Card */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-5 mb-5 flex gap-3"
      >
        {/* WÔY Score */}
        <div className="flex-1 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 flex items-center gap-4">
          <ScoreRing score={78} size={80} strokeWidth={6} id="mobile" />
          <div className="flex-1 min-w-0">
            <p className="text-[9px] uppercase tracking-[0.15em] text-white/40 font-bold">Niveau 1 — Sécurité</p>
            <h2 className="text-lg font-bold mt-0.5 leading-tight">WÔY Score</h2>
            <div className="mt-2">
              <XPBar current={350} total={600} />
            </div>
          </div>
        </div>

        {/* Ligue */}
        <div className="w-[90px] bg-white/[0.03] border border-white/[0.08] rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1">
          <Award size={24} className="text-yellow-500" />
          <p className="text-[9px] uppercase tracking-[0.12em] text-[#C4A055] font-bold leading-tight">Ligue Or</p>
          <p className="text-xl font-bold leading-none">7<span className="text-white/30 text-sm">/20</span></p>
          <p className="text-[8px] text-white/30 italic">Top 4 = monter</p>
        </div>
      </motion.section>

      {/* Module du jour */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-5 mb-5 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#B5472A]/10 blur-[60px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-[#C4A055]" />
              <h3 className="font-semibold text-sm">Module du jour</h3>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono text-white/40">
              <span className="flex items-center gap-1"><Clock size={10} /> 9min</span>
              <span className="text-[#C4A055] font-bold">+150XP</span>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5 mb-4">
            <p className="text-[13px] text-white/60 leading-relaxed">
              <span className="font-bold text-white/80">Dans ce module :</span> sécuriser ton wallet en 10 minutes — le protocole 4 étapes WÔY.
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentLesson('1.3')}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#B5472A] to-[#D4623E] font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#B5472A]/20"
          >
            Continuer N1.3 — Sécuriser son wallet <ChevronRight size={16} />
          </motion.button>
        </div>
      </motion.section>

      {/* Stats Row */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mx-5 mb-6 grid grid-cols-4 gap-2.5"
      >
        {/* Streak */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 flex flex-col items-center gap-1.5 hover:scale-[1.02] hover:border-[#C4A055]/20 transition-all duration-200">
          <div className="flex items-center gap-1.5 flex-1">
            <Flame size={18} className="text-orange-400" />
            <span className="text-xl font-bold leading-none">7</span>
          </div>
          <span className="text-[8px] uppercase tracking-widest text-white/30 font-bold">Streak</span>
        </div>

        {/* Modules */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 flex flex-col items-center gap-1.5 hover:scale-[1.02] hover:border-[#C4A055]/20 transition-all duration-200">
          <span className="text-lg font-bold leading-none mt-1">3<span className="text-white/30 text-xs">/6</span></span>
          <span className="text-[8px] uppercase tracking-widest text-white/30 font-bold mt-auto">Modules N1</span>
        </div>

        {/* Bouclier */}
        <div
          onClick={handleActivateShield}
          className={cn(
            "rounded-xl p-3 flex flex-col items-center gap-1.5 transition-all duration-200",
            isShieldActive
              ? "bg-[#B5472A]/10 border border-[#B5472A]/40 shadow-[0_0_15px_rgba(181,71,42,0.15)]"
              : "bg-white/[0.03] border border-white/[0.08] cursor-pointer hover:scale-[1.02] hover:border-[#C4A055]/20 shrink-0"
          )}
        >
          <Shield size={18} className={isShieldActive ? "text-[#B5472A] fill-[#B5472A]/20" : "text-[#B5472A]"} />
          <div className="text-center">
            <p className="text-[11px] font-bold text-[#B5472A]">Bouclier</p>
            {isShieldActive ? (
              <p className="text-[10px] text-[#B5472A]/80 font-bold uppercase tracking-widest mt-0.5">Actif</p>
            ) : (
              <p className="text-[10px] text-white/40 font-mono flex items-center gap-0.5 justify-center mt-0.5">
                50 <Coins size={8} className="text-[#C4A055]" />
              </p>
            )}
          </div>
        </div>

        {/* LAAMB */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 flex flex-col items-center gap-1.5 opacity-50">
          <Swords size={18} className="text-white/40" />
          <span className="text-[10px] font-bold text-white/40 tracking-tight">LAAMB</span>
          <Lock size={10} className="text-white/20" />
        </div>
      </motion.section>

      {/* Modules List */}
      <section className="mx-5 pb-4">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4">Tes Modules N1</h4>
        <div className="flex flex-col gap-3">
          {modules.map((mod, i) => (
            <ModuleCard
              key={mod.id}
              mod={mod}
              index={i}
              onClick={() => setCurrentLesson(mod.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );

  // ===========================
  //   DESKTOP LAYOUT
  // ===========================
  const DesktopLayout = () => (
    <div className="hidden lg:block">
      <main className="relative z-10 max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8">

        {/* Left Column: Profile & Quick Stats */}
        <div className="col-span-3 flex flex-col gap-6 sticky top-24 self-start h-fit">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glow-card flex flex-col items-center text-center gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/10"
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#B5472A] to-[#C4A055]">
                <div className="w-full h-full rounded-full bg-[#0D0A07] flex items-center justify-center text-3xl font-bold font-serif">
                  A
                </div>
              </div>
              <div className="absolute bottom-0 right-0 bg-[#4A6741] p-1.5 rounded-full border-4 border-[#0D0A07]">
                <CheckCircle2 size={14} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Amadou</h2>
              <p className="text-sm text-white/40 font-medium tracking-wide">NIVEAU 1 — SÉCURITÉ</p>
            </div>
          </motion.div>

          {/* Score ring card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glow-card bg-white/[0.02] border border-white/10 rounded-3xl p-6 flex flex-col items-center gap-4"
          >
            <ScoreRing score={78} size={120} strokeWidth={8} id="desktop" />
            <div className="w-full">
              <XPBar current={350} total={600} />
            </div>
          </motion.div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard icon={Flame} label="Streak" value="7 Jours" subValue="Série en cours" color="bg-orange-500/20" />
            <StatCard icon={Trophy} label="Ligue" value="Or" subValue="Rang 7/20" color="bg-yellow-500/20" />
          </div>
        </div>

        {/* Middle Column: Main Content */}
        <div className="col-span-6 flex flex-col gap-8">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-white/50 text-sm">Bon retour parmi nous</p>
            <h1 className="text-4xl font-bold font-serif tracking-wide">
              Bienvenue, <span className="shimmer-gold">Amadou</span>
            </h1>
          </motion.div>

          {/* Daily Module Hero */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glow-card relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 blur-[80px] opacity-20 -mr-20 -mt-20 bg-[#B5472A]" />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white/60">
                  <BookOpen size={14} className="inline mr-1.5" /> Module du jour
                </span>
                <div className="flex items-center gap-4 text-[10px] font-mono text-white/40">
                  <span className="flex items-center gap-1"><Clock size={10} /> 9 MIN</span>
                  <span className="text-[#C4A055] font-bold">+150 XP</span>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-serif font-bold leading-tight">
                  Sécuriser ton wallet <br /> en 10 minutes
                </h3>
                <p className="text-white/50 mt-4 text-sm leading-relaxed max-w-md">
                  Apprends le protocole WÔY en 4 étapes pour protéger tes actifs numériques contre les fraudes courantes.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentLesson('1.3')}
                className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-2xl bg-gradient-to-r from-[#B5472A] to-[#D4623E] hover:from-[#C65535] hover:to-[#E07350] transition-all"
              >
                Continuer N1.3 — Sécuriser son wallet <ChevronRight size={18} />
              </motion.button>
            </div>
          </motion.section>

          {/* Curriculum List */}
          <section>
            <div className="flex justify-between items-end mb-6">
              <h4 className="font-serif text-xl font-bold tracking-wider">TES MODULES N1</h4>
              <span className="text-[10px] text-white/30 font-bold tracking-widest uppercase">3/6 Complétés</span>
            </div>
            <div className="flex flex-col gap-3">
              {modules.map((mod, i) => (
                <ModuleCard
                  key={mod.id}
                  mod={mod}
                  index={i}
                  onClick={() => mod.id === 'N1.3' ? setCurrentLesson('1.3') : undefined}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Gamification & Social */}
        <div className="col-span-3 flex flex-col gap-6 sticky top-24 self-start h-fit">
          {/* LAAMB Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glow-card p-6 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <Swords size={20} className="text-[#C4A055]" />
              <h4 className="font-serif font-bold tracking-widest text-sm uppercase">WÔY LAAMB</h4>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Champion du mois</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm">Moussa.eth</p>
                    <p className="text-[10px] text-green-500 font-mono">+12.4% ROI</p>
                  </div>
                </div>
              </div>

              <button className="w-full py-3 rounded-xl border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                Rejoindre l'arène <Lock size={12} />
              </button>
            </div>
          </motion.div>

          {/* Social Feed Mini */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glow-card p-6 rounded-3xl bg-white/[0.02] border border-white/10"
          >
            <h4 className="font-serif font-bold tracking-widest text-sm uppercase mb-4">COMMUNAUTÉ</h4>
            <div className="space-y-4">
              {[
                { name: 'Fatou_92', action: 'Vient de débloquer le badge "Sécurisé" !' },
                { name: 'Ibra.eth', action: 'A terminé le Module N1.2 avec 95% !' },
                { name: 'Awa_DK', action: 'A rejoint la Ligue Or' },
              ].map((u, i) => (
                <div key={i} className="flex gap-3 items-start opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                  <div className={cn("w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold border border-white/10 bg-gradient-to-br from-white/20 to-white/5", colors.textAccent)}>
                    {u.name[0]}
                  </div>
                  <div className="text-[11px] leading-relaxed">
                    <span className="font-bold block">{u.name}</span>
                    <span className="text-white/50">{u.action}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bouclier Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
            onClick={handleActivateShield}
            className={cn(
              "glow-card p-5 rounded-2xl flex items-center justify-between gap-4 transition-all duration-300 shadow-xl",
              isShieldActive
                ? "bg-[#B5472A]/10 border border-[#B5472A]/40 shadow-[0_0_20px_rgba(181,71,42,0.15)]"
                : "bg-white/[0.02] border border-white/10 cursor-pointer hover:bg-white/[0.04] hover:border-[#C4A055]/20"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                isShieldActive ? "bg-[#B5472A]/20" : "bg-[#B5472A]/10"
              )}>
                <Shield size={22} className={isShieldActive ? "text-[#B5472A] fill-[#B5472A]/20" : "text-[#B5472A]"} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-0.5">Bouclier</p>
                <div className={cn(
                  "text-xl font-bold flex items-center gap-1.5",
                  isShieldActive ? "text-[#B5472A]" : "text-white"
                )}>
                  {isShieldActive ? 'ACTIF' : <><span className="text-white">50</span> <Coins size={14} className="text-[#C4A055]" /></>}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );

  // ===========================
  //   COURS - MOBILE
  // ===========================
  const CoursMobileScreen = () => {
    const [expandedNiveau, setExpandedNiveau] = useState<string | null>('N1');

    return (
      <div className="lg:hidden flex flex-col min-h-screen pb-32">
        {/* Profile Header */}
        <header className="px-5 pb-5 safe-top">
          <div className="flex items-center gap-4">
            <ScoreRing score={78} size={70} strokeWidth={5} id="cours-mobile" />
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold font-serif tracking-wide">Amadou</h1>
              <p className="text-[11px] text-white/50 mt-0.5">
                <span className="font-bold text-white/70">NIVEAU 1 — SÉCURITÉ</span>
                <span className="text-[#C4A055]"> · En cours</span>
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-[10px] text-white/40">
                <span className="flex items-center gap-1"><Coins size={10} className="text-[#C4A055]" /> {globalCoins} Cauris</span>
                <span className="flex items-center gap-1"><Flame size={10} className="text-orange-400" /> 7j streak</span>
                <span className="flex items-center gap-1"><Swords size={10} /> LAAMB <Lock size={8} /></span>
              </div>
            </div>
          </div>
        </header>

        {/* Continue Formation */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setCurrentLesson('1.3')}
          className="mx-5 mb-5 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 relative overflow-hidden cursor-pointer hover:bg-white/[0.05] transition-all"
        >
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#B5472A]/10 blur-[40px] rounded-full pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Play size={12} className="text-[#C4A055]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Continuer ta formation</span>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="text-[10px] text-white/30 font-mono">N1.3 · Sécurité</p>
                <h3 className="font-bold text-sm mt-0.5">Sécuriser son wallet en 10 min</h3>
                <p className="text-[10px] text-white/40 mt-1 flex items-center gap-1.5">
                  <Clock size={9} /> 9 min · Quiz + Mission · <span className="text-[#C4A055] font-bold">+150 XP</span>
                </p>
              </div>
              <button
                onClick={() => setCurrentLesson('1.3')}
                className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0"
              >
                <ChevronRight size={16} className="text-[#C4A055]" />
              </button>
            </div>
            <div className="mt-3">
              <ProgressBar progress={68} colorClass="bg-gradient-to-r from-[#B5472A] to-[#D4623E]" />
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-5 mb-5 grid grid-cols-4 gap-2.5"
        >
          {[
            { value: '12', label: 'Modules faits' },
            { value: '2h', label: 'Temps total' },
            { value: '7', label: 'Jours streak' },
            { value: '1', label: 'NFT obtenu' },
          ].map((s, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 flex flex-col items-center text-center gap-1">
              <span className="text-xl font-bold leading-none">{s.value}</span>
              <span className="text-[8px] text-white/30 font-medium leading-tight">{s.label}</span>
            </div>
          ))}
        </motion.section>

        {/* Level Roadmap */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-5 mb-6"
        >
          <div className="flex items-center justify-between px-2">
            {niveaux.map((n, i) => (
              <React.Fragment key={n.id}>
                <div className="flex flex-col items-center gap-1">
                  <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all",
                    n.status === 'complété' ? "bg-green-500/20 border-green-500/50 text-green-400" :
                      n.status === 'en cours' ? "bg-[#B5472A]/20 border-[#C4A055]/50 text-[#C4A055] animate-pulse" :
                        "bg-white/5 border-white/10 text-white/30"
                  )}>
                    {n.label}
                  </div>
                  {n.status === 'complété' && <CircleCheck size={12} className="text-green-400" />}
                  {n.status === 'en cours' && <span className="text-[9px] text-[#C4A055] font-bold">{n.progress}%</span>}
                  {n.status === 'verrouillé' && <n.Icon size={12} className="text-white/25" />}
                </div>
                {i < niveaux.length - 1 && (
                  <div className={cn(
                    "flex-1 h-0.5 mx-1",
                    niveaux[i].status === 'complété' && niveaux[i + 1].status !== 'verrouillé' ? "bg-green-500/30" :
                      niveaux[i].status !== 'verrouillé' ? "bg-[#C4A055]/20" : "bg-white/5"
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.section>

        {/* Mes Niveaux */}
        <section className="mx-5 pb-4">
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4">Mes Niveaux</h4>
          <div className="flex flex-col gap-3">
            {niveaux.map((n, i) => (
              <NiveauCard
                key={n.id}
                niveau={n}
                index={i}
                expanded={expandedNiveau === n.id}
                onToggle={() => setExpandedNiveau(expandedNiveau === n.id ? null : n.id)}
                onOpenLesson={setCurrentLesson}
              />
            ))}
          </div>
        </section>

        {/* Bottom Spacer for PWA Home Indicator */}
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    );
  };

  // ===========================
  //   COURS - DESKTOP
  // ===========================
  const CoursDesktopScreen = () => {
    const [expandedNiveau, setExpandedNiveau] = useState<string | null>('N1');

    return (
      <div className="hidden lg:block">
        <main className="relative z-10 max-w-7xl mx-auto px-8 py-8 grid grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-4 sticky top-24 self-start h-fit flex flex-col gap-6">
            {/* Profile + Score */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glow-card bg-white/[0.02] border border-white/10 rounded-3xl p-6"
            >
              <div className="flex items-center gap-5 mb-6">
                <ScoreRing score={78} size={100} strokeWidth={7} id="cours-desktop" />
                <div>
                  <h2 className="text-2xl font-bold font-serif">Amadou</h2>
                  <p className="text-[11px] text-white/50 mt-1">
                    <span className="font-bold text-white/70">NIVEAU 1 — SÉCURITÉ</span>
                    <span className="text-[#C4A055]"> · En cours</span>
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-white/40">
                    <span className="flex items-center gap-1"><Coins size={10} className="text-[#C4A055]" /> {globalCoins}</span>
                    <span className="flex items-center gap-1"><Flame size={10} className="text-orange-400" /> 7j</span>
                    <span className="flex items-center gap-1"><Swords size={10} /> LAAMB <Lock size={8} /></span>
                  </div>
                </div>
              </div>

              <div
                onClick={() => setCurrentLesson('1.3')}
                className="w-full text-left bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:bg-white/[0.06] hover:border-[#C4A055]/30 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Play size={12} className="text-[#C4A055] group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Continuer ta formation</span>
                </div>
                <p className="text-[10px] text-white/30 font-mono">N1.3 · Sécurité</p>
                <h3 className="font-bold text-sm mt-0.5">Sécuriser son wallet en 10 min</h3>
                <div className="mt-3">
                  <ProgressBar progress={68} colorClass="bg-gradient-to-r from-[#B5472A] to-[#D4623E]" />
                </div>
                <p className="text-[10px] text-white/40 mt-2 flex items-center gap-1.5">
                  <Clock size={9} /> 9 min · Quiz + Mission · <span className="text-[#C4A055] font-bold">+150 XP</span>
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '12', label: 'Modules faits', icon: BookOpen, color: 'bg-[#C4A055]/15' },
                { value: '2h', label: 'Temps total', icon: Clock, color: 'bg-blue-500/15' },
                { value: '7', label: 'Jours streak', icon: Flame, color: 'bg-orange-500/15' },
                { value: '1', label: 'NFT obtenu', icon: Trophy, color: 'bg-purple-500/15' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ y: -2 }}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col gap-2"
                >
                  <div className={cn("p-2 rounded-lg w-fit", s.color)}>
                    <s.icon size={16} className="text-white" />
                  </div>
                  <p className="text-xl font-bold">{s.value}</p>
                  <p className="text-[10px] text-white/40 font-medium">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Content: Roadmap + Niveaux */}
          <div className="col-span-8 flex flex-col gap-8">
            {/* Level Roadmap */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="glow-card bg-white/[0.02] border border-white/10 rounded-3xl p-6"
            >
              <h3 className="font-serif font-bold tracking-wider text-sm uppercase mb-6">Parcours WÔY</h3>
              <div className="flex items-center justify-between px-4">
                {niveaux.map((n, i) => (
                  <React.Fragment key={n.id}>
                    <div className="flex flex-col items-center gap-1.5">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all cursor-pointer hover:scale-105",
                        n.status === 'complété' ? "bg-green-500/20 border-green-500/50 text-green-400" :
                          n.status === 'en cours' ? "bg-[#B5472A]/20 border-[#C4A055]/50 text-[#C4A055] animate-pulse" :
                            "bg-white/5 border-white/10 text-white/30"
                      )}>
                        {n.label}
                      </div>
                      {n.status === 'complété' && <CircleCheck size={14} className="text-green-400" />}
                      {n.status === 'en cours' && <span className="text-[10px] text-[#C4A055] font-bold">{n.progress}%</span>}
                      {n.status === 'verrouillé' && <n.Icon size={14} className="text-white/25" />}
                    </div>
                    {i < niveaux.length - 1 && (
                      <div className={cn(
                        "flex-1 h-0.5 mx-2",
                        niveaux[i].status === 'complété' && niveaux[i + 1].status !== 'verrouillé' ? "bg-green-500/30" :
                          niveaux[i].status !== 'verrouillé' ? "bg-[#C4A055]/20" : "bg-white/5"
                      )} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>

            {/* Niveaux List */}
            <section>
              <div className="flex justify-between items-end mb-6">
                <h4 className="font-serif text-xl font-bold tracking-wider">MES NIVEAUX</h4>
              </div>
              <div className="flex flex-col gap-3">
                {niveaux.map((n, i) => (
                  <NiveauCard
                    key={n.id}
                    niveau={n}
                    index={i}
                    expanded={expandedNiveau === n.id}
                    onToggle={() => setExpandedNiveau(expandedNiveau === n.id ? null : n.id)}
                    onOpenLesson={setCurrentLesson}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Bottom Spacer for PWA Home Indicator */}
          <div className="h-[env(safe-area-inset-bottom)] pb-20 lg:pb-0" />
        </main>
      </div>
    );
  };

  // ===========================
  //   RAPPORT SCREEN
  // ===========================
  const RapportScreen = () => {
    return (
      <div className="flex flex-col min-h-screen pb-32 lg:pb-8">
        {/* Main Content Area */}
        <main className="px-5 pt-10 pb-10 flex flex-col w-full max-w-2xl lg:max-w-6xl mx-auto safe-top">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 size={24} className="text-white" />
            <div>
              <h1 className="text-xl font-bold font-serif tracking-wide uppercase">RAPPORT MENSUEL WÔY</h1>
              <p className="text-[11px] text-white/50 mt-0.5 font-medium tracking-wide">
                Analyse · Verdict · Portfolio · Focus Afrique
              </p>
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-10 lg:items-start w-full">
            {/* Left Column - Main Content */}
            <div className="flex flex-col gap-6 lg:col-span-8">
              {/* Main Report Card */}
              <section className="bg-white/[0.02] border border-white/[0.08] rounded-3xl overflow-hidden focus-within:border-white/20 transition-all">
                {/* Card Header */}
                <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <BarChart3 size={16} className="text-[#C4A055]" />
                    <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C4A055]">RAPPORT MARS 2026</h2>
                  </div>
                  <span className="text-[10px] font-mono text-white/40">01.03.26</span>
                </div>

                <div className="p-6 flex flex-col gap-8">
                  {/* Classement */}
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-4">CLASSEMENT WÔY /10</h3>
                    <div className="flex flex-col gap-3">
                      {[
                        { name: 'BTC', score: 8.4, pct: 84 },
                        { name: 'SOL', score: 7.9, pct: 79 },
                        { name: 'ONDO', score: 7.2, pct: 72 },
                        { name: 'ETH', score: 6.8, pct: 68 },
                      ].map((coin, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <span className="w-12 text-sm font-bold font-mono tracking-tight">{coin.name}</span>
                          <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden shrink-0">
                            <div className="h-full bg-gradient-to-r from-[#B5472A] to-[#C4A055] rounded-full" style={{ width: `${coin.pct}%` }} />
                          </div>
                          <span className="w-8 text-right text-sm font-bold text-[#C4A055] font-mono">{coin.score}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-center text-[10px] text-white/30 font-medium mt-4">20 cryptos analysées dans le rapport complet</p>
                  </div>

                  {/* Verdict */}
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-4">VERDICT DU MOIS</h3>
                    <div className="flex flex-wrap gap-2.5">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#4A6741]/40 bg-[#4A6741]/10 text-[#4A6741] text-[11px] font-bold tracking-widest uppercase">
                        <CheckCircle2 size={12} /> BUY — BTC · SOL
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C4A055]/40 bg-[#C4A055]/10 text-[#C4A055] text-[11px] font-bold tracking-widest uppercase">
                        <Hourglass size={12} /> HOLD — ONDO
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#B5472A]/40 bg-[#B5472A]/10 text-[#B5472A] text-[11px] font-bold tracking-widest uppercase">
                        <Ban size={12} /> WAIT — ETH
                      </div>
                    </div>
                    <p className="text-[10px] text-white/40 font-medium mt-3">Niveaux d'entrée + stop-loss dans le rapport complet</p>
                  </div>

                  {/* Narratifs */}
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-4">NARRATIFS DU MOIS</h3>
                    <div className="flex flex-col gap-2">
                      <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3.5 flex items-start gap-3">
                        <Flame size={14} className="text-[#B5472A] mt-0.5 shrink-0" />
                        <p className="text-xs text-white/70 leading-relaxed font-medium">
                          <strong className="text-white">RWA</strong> — Tokenisation d'actifs réels. BlackRock, Ondo, Centrifuge.
                        </p>
                      </div>
                      <div className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3.5 flex items-start gap-3">
                        <Globe size={14} className="text-blue-400 mt-0.5 shrink-0" />
                        <p className="text-xs text-white/70 leading-relaxed font-medium">
                          <strong className="text-white">Stablecoins Afrique</strong> — CLARITY Act US + adoption Nigeria/Kenya.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Portfolio Modèle */}
                  <div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-4">PORTFOLIO MODÈLE</h3>
                    <div className="relative rounded-2xl border border-white/5 overflow-hidden group hover:border-[#C4A055]/30 transition-all cursor-pointer">
                      {/* Blurred content simulation */}
                      <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[8px] z-10 flex flex-col items-center justify-center p-6 text-center">
                        <div className="flex items-center gap-2 text-[#C4A055] font-bold text-sm tracking-wide">
                          <Lock size={14} /> Abonnés LAAMB / N3+ / Élite
                        </div>
                        <p className="text-[10px] text-white/40 mt-2 font-medium flex items-center justify-center gap-1.5">
                          <Lock size={10} /> Réservé N2+ / LAAMB / Cercle Élite
                        </p>
                      </div>
                      <div className="p-4 flex flex-col gap-3 opacity-20 filter blur-sm">
                        {/* Fake rows */}
                        <div className="flex items-center justify-between"><div className="w-16 h-4 bg-white/20 rounded-md" /><div className="w-24 h-4 bg-white/20 rounded-md" /></div>
                        <div className="flex items-center justify-between"><div className="w-20 h-4 bg-white/20 rounded-md" /><div className="w-32 h-4 bg-white/20 rounded-md" /></div>
                        <div className="flex items-center justify-between"><div className="w-12 h-4 bg-white/20 rounded-md" /><div className="w-20 h-4 bg-white/20 rounded-md" /></div>
                      </div>
                    </div>
                  </div>

                  {/* Champion Mars */}
                  <div className="bg-gradient-to-tr from-[#1C1409] to-[#0D0A07] border border-[#C4A055]/20 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C4A055]/5 blur-[40px] rounded-full pointer-events-none" />
                    <div className="w-10 h-10 rounded-full bg-[#C4A055]/10 flex items-center justify-center shrink-0 border border-[#C4A055]/30">
                      <Crown size={20} className="text-[#C4A055]" />
                    </div>
                    <div className="flex-1 min-w-0 relative z-10">
                      <h4 className="text-sm font-bold text-[#C4A055]">Champion Mars — Gaindé</h4>
                      <p className="text-[10px] text-white/50 mt-0.5 tracking-wide">SOL · Breakout 88$→131$ · 36h</p>
                    </div>
                    <div className="text-lg font-bold text-[#4A6741] font-mono tracking-tighter relative z-10">
                      +38.7%
                    </div>
                  </div>

                  {/* Rapports spéciaux ponctuels */}
                  <div className="bg-white/[0.03] border border-[#C4A055]/10 rounded-2xl p-4 flex items-start gap-4 hover:border-[#C4A055]/20 transition-all cursor-pointer">
                    <div className="mt-1">
                      <Zap size={16} className="text-[#C4A055]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#C4A055] uppercase tracking-wider mb-1">Rapports spéciaux ponctuels</h4>
                      <p className="text-[11px] text-white/50 font-medium leading-relaxed">Si event majeur dans le mois — inclus automatiquement.</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Sidebar - Alerts & Accès */}
            <div className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-24 mt-2 lg:mt-0">
              {/* Top Alert */}
              <div className="bg-[#B5472A]/10 border border-[#B5472A]/30 rounded-2xl p-4 flex flex-col gap-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B5472A]/10 blur-[40px] rounded-full pointer-events-none" />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <TrendingUp size={16} className="text-[#C4A055]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#4A6741]">
                      SOL identifié à 88$ <br /><span className="text-[#B5472A]">+38.7% en 36h</span> — Gaindé <Crown size={14} className="inline ml-1 text-[#C4A055] -mt-0.5" />
                    </p>
                    <p className="text-[10px] text-white/40 mt-1 font-medium">Édition Avril · Dispo. 1er avril</p>
                  </div>
                </div>
              </div>

              {/* Accès au Rapport */}
              <section className="bg-white/[0.01] border border-white/[0.05] rounded-3xl p-6">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C4A055] mb-5">ACCÈS AU RAPPORT</h3>
                <div className="flex flex-col gap-3">
                  {/* LAAMB */}
                  <div className="bg-white/[0.02] border border-white/[0.08] hover:border-[#C4A055]/30 rounded-2xl p-4 flex flex-col gap-3 transition-all cursor-pointer group hover:bg-white/[0.04]">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#C4A055]/10 transition-colors">
                        <Swords size={20} className="text-white/40 group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white group-hover:text-[#C4A055] transition-colors">Inclus dans LAAMB</h4>
                        <p className="text-[10px] text-white/40 mt-0.5 font-medium leading-snug">Signaux champion + rapport + arène</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-white/[0.05] text-right">
                      <div className="text-[#C4A055] font-mono font-bold text-sm tracking-tight text-right w-full">20 000/mois</div>
                    </div>
                  </div>

                  {/* Rapport Seul */}
                  <div className="bg-white/[0.02] border border-white/[0.08] hover:border-[#C4A055]/30 rounded-2xl p-4 flex flex-col gap-3 transition-all cursor-pointer group hover:bg-white/[0.04]">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#C4A055]/10 transition-colors">
                        <BarChart3 size={20} className="text-white/40 group-hover:text-[#C4A055] transition-colors" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white group-hover:text-[#C4A055] transition-colors">Rapport seul (N2+)</h4>
                        <p className="text-[10px] text-white/40 mt-0.5 font-medium leading-snug">Analyse + verdict + portfolio</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-white/[0.05] text-right">
                      <div className="text-[#C4A055] font-mono font-bold text-sm tracking-tight text-right w-full">10 000/mois</div>
                    </div>
                  </div>

                  {/* Cercle Élite */}
                  <div className="bg-gradient-to-tr from-[#1C1409]/40 to-[#0D0A07]/40 border border-[#C4A055]/20 hover:border-[#C4A055]/40 rounded-2xl p-4 flex flex-col gap-3 transition-all cursor-pointer group hover:from-[#1C1409]/60">
                    <div className="flex items-center gap-4 relative">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-[#D4AF37]/10 blur-[30px] rounded-full pointer-events-none" />
                      <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0 border border-[#D4AF37]/20 group-hover:scale-105 transition-transform">
                        <Crown size={20} className="text-[#D4AF37] group-hover:text-[#F3E5AB] transition-colors" />
                      </div>
                      <div className="relative z-10">
                        <h4 className="font-bold text-sm text-[#D4AF37] group-hover:text-[#F3E5AB] transition-colors">Cercle Élite</h4>
                        <p className="text-[10px] text-white/50 mt-0.5 font-medium leading-snug">Tout inclus + analyses hebdo</p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-[#D4AF37]/20 text-right relative z-10">
                      <div className="text-[#D4AF37] font-mono font-bold text-sm tracking-tight text-right w-full">25 000/mois</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

        </main>
      </div>
    );
  };

  // ===========================
  //   LAAMB SCREEN
  // ===========================
  const LaambScreen = () => {
    const [expandedSections, setExpandedSections] = useState<string[]>(['classement']);

    const toggleSection = (sectionId: string) => {
      setExpandedSections(prev =>
        prev.includes(sectionId)
          ? prev.filter(id => id !== sectionId)
          : [...prev, sectionId]
      );
    };

    const traders = [
      {
        id: 1,
        name: 'Gaindé',
        Icon: LionIcon,
        tag: 'Breakout / Momentum',
        perf: '+38.7%',
        winrate: '72% (3W/1L)',
        trades: 4,
        history: ['W', 'W', 'L', 'W'],
        color: '#C4A055'
      },
      {
        id: 2,
        name: 'Picc',
        Icon: EagleIcon,
        tag: 'Swing / HTF',
        perf: '+18.2%',
        winrate: '66% (2W/1L)',
        trades: 3,
        history: ['W', 'L', 'W'],
        color: '#FFFFFF'
      },
      {
        id: 3,
        name: 'Ségg',
        Icon: PantherIcon,
        tag: 'Scalping / rapide',
        perf: '+12.5%',
        winrate: '60% (3W/2L)',
        trades: 5,
        history: ['W', 'L', 'W', 'L', 'W'],
        color: '#B5472A'
      },
      {
        id: 4,
        name: 'Jaan',
        Icon: SnakeIcon,
        tag: 'Reversal / contre-tendance',
        perf: '-4.3%',
        winrate: '50% (1W/1L)',
        trades: 2,
        history: ['L', 'W'],
        color: '#FFFFFF'
      }
    ];

    const monthlyCycle = [
      { id: 'j1-20', period: 'J1-20', title: '4 traders publient (min 2, max 5)', desc: 'Screenshot annoté + raisonnement + R:R + risque %' },
      { id: 'j21-25', period: 'J21-25', title: 'Vérification par les fondateurs', desc: 'Score technique /30 par Mohamed & Sadri' },
      { id: 'j25-28', period: 'J25-28', title: 'Vote communautaire anti-bot', desc: 'In-app · Quiz · Pondéré par niveau' },
      { id: 'results', period: 'Résultats', title: "L'événement", desc: 'NFT Champion · Signaux 30j · Relégation si dernier 2x/4' }
    ];

    return (
      <div className="flex flex-col min-h-screen pb-32 lg:pb-8">
        <main className="px-5 pt-10 pb-10 flex flex-col w-full max-w-2xl lg:max-w-6xl mx-auto safe-top">

          {/* Header */}
          <div className="flex flex-col gap-1.5 mb-10">
            <div className="flex items-center gap-2.5">
              <Swords size={22} className="text-[#C4A055]" />
              <h1 className="text-xl md:text-2xl font-bold font-serif tracking-[0.1em] uppercase leading-none">WÔY LAAMB</h1>
            </div>
            <p className="text-[10px] md:text-[11px] text-white/40 font-medium tracking-[0.05em] uppercase leading-relaxed max-w-[85%] md:max-w-none">
              4 traders anonymes · Scoring 50/30/20 · Relégation
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Classement Section */}
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-3xl overflow-hidden">
              <button
                onClick={() => toggleSection('classement')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <BarChart3 size={18} className="text-[#C4A055]" />
                    <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-white">Classement — Mars 2026</h2>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-medium text-white/30 uppercase tracking-widest">
                    <span>4 traders</span>
                    <span>Perf en cours</span>
                    <span className="text-[#B5472A]">Mars 2026</span>
                  </div>
                </div>
                {expandedSections.includes('classement') ? <ChevronUp size={18} className="text-white/40" /> : <ChevronDown size={18} className="text-white/40" />}
              </button>

              <AnimatePresence>
                {expandedSections.includes('classement') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 flex flex-col gap-3">
                      {traders.map((trader, i) => (
                        <motion.div
                          key={trader.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className={cn(
                            "relative p-5 rounded-3xl border transition-all duration-300 group hover:scale-[1.01]",
                            i === 0 
                              ? "bg-gradient-to-br from-[#C4A055]/10 to-transparent border-[#C4A055]/30 shadow-[0_10px_30px_rgba(196,160,85,0.1)]" 
                              : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/20"
                          )}
                        >
                          {/* Inner Content Grid */}
                          <div className="flex items-center justify-between gap-4 mb-5">
                            <div className="flex items-center gap-4">
                              {/* Integrated Avatar & Medal */}
                              <div className="relative shrink-0">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-105 transition-transform">
                                  <trader.Icon size={28} className={cn("transition-colors", i === 0 ? "text-[#C4A055]" : "text-white/40")} />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-black/80 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center shadow-lg">
                                  {i === 0 ? <Trophy size={14} className="text-[#C4A055]" /> : i === 1 ? <Award size={14} className="text-white/60" /> : i === 2 ? <Award size={14} className="text-[#B5472A]/80" /> : <span className="text-[10px] font-bold text-white/20">{trader.id}</span>}
                                </div>
                              </div>

                              {/* Identity & Tag */}
                              <div className="flex flex-col min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={cn(
                                    "text-[8px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border",
                                    i === 0 ? "bg-[#C4A055]/20 border-[#C4A055]/30 text-[#C4A055]" : "bg-white/5 border-white/10 text-white/30"
                                  )}>
                                    {trader.tag}
                                  </span>
                                </div>
                                <h3 className={cn(
                                  "text-xl font-bold font-serif uppercase tracking-wider truncate",
                                  i === 0 ? "text-[#C4A055]" : "text-white/90"
                                )}>
                                  {trader.name}
                                </h3>
                                <div className="flex items-center gap-1.5 text-[10px] text-white/30 font-medium font-mono mt-0.5">
                                  <span>WR: {trader.winrate.split(' ')[0]}</span>
                                  <span className="opacity-30">·</span>
                                  <span>{trader.trades} TRADES</span>
                                </div>
                              </div>
                            </div>

                            {/* Performance Badge */}
                            <div className="flex flex-col items-end shrink-0 bg-black/20 border border-white/5 px-4 py-2.5 rounded-2xl">
                              <span className={cn(
                                "text-lg md:text-xl font-black font-serif tracking-tight",
                                trader.perf.startsWith('+') ? "text-[#4A6741]" : "text-[#B5472A]"
                              )}>
                                {trader.perf}
                              </span>
                              <span className="text-[8px] font-bold text-white/15 uppercase tracking-[0.2em] -mt-0.5">MARS</span>
                            </div>
                          </div>

                          {/* Activity / History Strip */}
                          <div className="flex items-center justify-between border-t border-white/5 pt-4">
                            <div className="flex items-center gap-1.5">
                              {trader.history.map((res, idx) => (
                                <div
                                  key={idx}
                                  className={cn(
                                    "w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black shadow-sm transition-all",
                                    res === 'W' 
                                      ? "bg-[#4A6741]/20 border border-[#4A6741]/40 text-[#4A6741]" 
                                      : "bg-[#B5472A]/20 border border-[#B5472A]/40 text-[#B5472A]"
                                  )}
                                >
                                  {res}
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center gap-1 text-[#C4A055]/60 hover:text-[#C4A055] cursor-pointer transition-colors">
                              <span className="text-[9px] font-bold uppercase tracking-widest">Voir Track Record</span>
                              <ChevronRight size={12} />
                            </div>
                          </div>

                          {i === 0 && (
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C4A055]/5 blur-[40px] rounded-full pointer-events-none" />
                          )}
                        </motion.div>
                      ))}
                      <div className="pt-4 text-center">
                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.2em] leading-relaxed">
                          Score final (fin de mois) : 50% Perf · 30% Technique · 20% Vote
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Setup Section */}
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-3xl overflow-hidden">
              <button
                onClick={() => toggleSection('setup')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Flame size={18} className="text-[#B5472A]" />
                  <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-white">Setup du mois</h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-[#4A6741]/20 text-[#4A6741] px-3 py-1 rounded-lg text-[10px] font-bold">+38.7%</div>
                  {expandedSections.includes('setup') ? <ChevronUp size={18} className="text-white/40" /> : <ChevronDown size={18} className="text-white/40" />}
                </div>
              </button>

              <AnimatePresence>
                {expandedSections.includes('setup') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 flex flex-col gap-6">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-white/30 uppercase tracking-widest bg-white/5 p-3 rounded-xl">
                        <span>🦁 Gaindé</span>
                        <span className="text-white/10">·</span>
                        <span>SOL/USDT Daily</span>
                        <span className="text-white/10">·</span>
                        <span className="text-[#C4A055]">36h</span>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                        {[
                          { label: 'Entrée', val: '88$', color: 'text-white/40' },
                          { label: 'Stop Loss', val: '82$', color: 'text-[#B5472A]' },
                          { label: 'Take Profit', val: '131$', color: 'text-[#4A6741]' },
                          { label: 'Durée', val: '36h', color: 'text-white/40' }
                        ].map((stat, idx) => (
                          <div key={idx} className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3 flex flex-col gap-1 items-center text-center">
                            <span className="text-[10px] uppercase font-bold tracking-tighter text-white/20">{stat.label}</span>
                            <span className={cn("text-sm font-bold font-mono tracking-tight", stat.color)}>{stat.val}</span>
                          </div>
                        ))}
                      </div>

                      {/* Simulated Chart Container */}
                      <div className="relative aspect-[16/9] w-full bg-[#0D0A07] rounded-2xl border border-white/10 overflow-hidden group">
                        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                        <div className="absolute left-4 top-4 text-[10px] font-mono text-white/40 uppercase">SOL/USDT · Daily</div>
                        <div className="absolute right-4 top-4 bg-[#4A6741]/20 px-2 py-0.5 rounded text-[10px] font-bold text-[#4A6741]">+38.7%</div>

                        {/* Chart lines simulation */}
                        <div className="absolute inset-x-0 top-[25%] h-px bg-[#4A6741]/40 border-t border-dashed border-[#4A6741]/60 flex justify-end px-4"><span className="text-[8px] font-bold text-[#4A6741] -mt-2 bg-[#0D0A07] px-1">TP 131$</span></div>
                        <div className="absolute inset-x-0 top-[60%] h-px bg-[#C4A055]/40 border-t border-dashed border-[#C4A055]/60 flex justify-end px-4"><span className="text-[8px] font-bold text-[#C4A055] -mt-2 bg-[#0D0A07] px-1">Entrée 88$</span></div>
                        <div className="absolute inset-x-0 bottom-[20%] h-px bg-[#B5472A]/40 border-t border-dashed border-[#B5472A]/60 flex justify-end px-4"><span className="text-[8px] font-bold text-[#B5472A] -mt-2 bg-[#0D0A07] px-1">SL 82$</span></div>

                        {/* Simulated Candle Stems (Visual simulation) */}
                        <div className="absolute inset-0 flex items-end justify-center gap-2 pb-8 px-8">
                          {[15, 25, 20, 35, 45, 60, 55, 75, 85].map((h, i) => (
                            <div key={i} className="flex flex-col items-center gap-0.5 w-full max-w-[12px]">
                              <div className="w-px h-4 bg-white/20" />
                              <div
                                className={cn("w-full rounded-sm", i > 6 ? "bg-green-500" : (i % 3 === 0 ? "bg-[#B5472A]" : "bg-white/40"))}
                                style={{ height: `${h}%` }}
                              />
                              <div className="w-px h-3 bg-white/10" />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Reasoning */}
                      <div className="flex flex-col gap-3">
                        <h4 className="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">Raisonnement :</h4>
                        <p className="text-xs leading-relaxed text-white/70 font-medium">
                          Breakout daily au-dessus de 85$. Retest propre, volume x3. <strong className="text-white">MACD cross haussier</strong>. Accumulation whale on-chain. SL sous mèche retest. TP au précédent ATH local.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Track Record Section */}
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-3xl overflow-hidden">
              <button
                onClick={() => toggleSection('track')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex flex-col items-start gap-1">
                  <div className="flex items-center gap-2">
                    <TrendingUp size={18} className="text-[#4A6741]" />
                    <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-white">Track record — Lion</h2>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/30">
                    <span>7 mois</span>
                    <span>72% win rate</span>
                    <span className="text-[#4A6741]">Champion 3x</span>
                  </div>
                </div>
                {expandedSections.includes('track') ? <ChevronUp size={18} className="text-white/40" /> : <ChevronDown size={18} className="text-white/40" />}
              </button>

              <AnimatePresence>
                {expandedSections.includes('track') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 flex flex-col gap-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          { month: 'Déc', perf: '+41.2%', rank: '1er', icon: Trophy, iconColor: 'text-[#C4A055]', color: 'bg-[#4A6741]/10 border-[#4A6741]/20 text-[#4A6741]' },
                          { month: 'Jan', perf: '-8.4%', rank: '4ème', icon: null, iconColor: '', color: 'bg-[#B5472A]/5 border-[#B5472A]/20 text-[#B5472A]' },
                          { month: 'Fév', perf: '+27.6%', rank: '1er', icon: Trophy, iconColor: 'text-[#C4A055]', color: 'bg-[#4A6741]/10 border-[#4A6741]/20 text-[#4A6741]' },
                          { month: 'Mar', perf: '+38.7%', rank: '1er', icon: Trophy, iconColor: 'text-[#C4A055]', color: 'bg-[#4A6741]/10 border-[#4A6741]/20 text-[#4A6741]' }
                        ].map((m, i) => (
                          <div key={i} className={cn("rounded-2xl border p-4 flex flex-col items-center gap-1.5 transition-all text-center", m.color)}>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 text-white/60">{m.month}</span>
                            <span className="text-sm font-bold font-mono tracking-tighter">{m.perf}</span>
                            <div className="flex items-center gap-1 text-[10px] font-bold opacity-40 whitespace-nowrap">
                              {m.rank} {m.icon && <m.icon size={10} className={m.iconColor} />}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="text-center pt-2">
                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                          19 trades · Score moyen 81 · Relégation 0
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Cycle Mensuel Section */}
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-3xl overflow-hidden">
              <button
                onClick={() => toggleSection('cycle')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-white/40" />
                  <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-white">Cycle mensuel</h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-white/20 text-[10px] font-bold uppercase tracking-widest leading-none">J1→J28 · 4 phases</div>
                  {expandedSections.includes('cycle') ? <ChevronUp size={18} className="text-white/40" /> : <ChevronDown size={18} className="text-white/40" />}
                </div>
              </button>

              <AnimatePresence>
                {expandedSections.includes('cycle') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 flex flex-col gap-4">
                      {monthlyCycle.map((phase, idx) => (
                        <div key={phase.id} className="relative flex gap-4 pr-4 group">
                          {/* Connector line */}
                          {idx !== monthlyCycle.length - 1 && (
                            <div className="absolute left-6 top-12 bottom-[-16px] w-[1px] bg-white/10" />
                          )}

                          <div className={cn(
                            "w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center border transition-all",
                            idx === 0 ? "bg-[#B5472A]/10 border-[#B5472A]/30 text-[#B5472A]" : "bg-white/5 border-white/10 text-white/30 group-hover:border-white/20"
                          )}>
                            {idx === 3 ? <Crown size={16} className="text-[#C4A055]" /> : <span className="text-[10px] font-bold">{phase.period}</span>}
                          </div>

                          <div className="flex flex-col gap-1 py-1">
                            <h4 className="text-[11px] font-bold text-white group-hover:text-[#C4A055] transition-colors">
                              {phase.title}
                            </h4>
                            <p className="text-[10px] text-white/40 font-medium leading-relaxed">
                              {phase.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Comparison Section (Sticky Card style) */}
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-3xl overflow-hidden">
              <button
                onClick={() => toggleSection('comparison')}
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Swords size={18} className="text-white/40" />
                  <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-white">WÔY vs Signaux classiques</h2>
                </div>
                {expandedSections.includes('comparison') ? <ChevronUp size={18} className="text-white/40" /> : <ChevronDown size={18} className="text-white/40" />}
              </button>

              <AnimatePresence>
                {expandedSections.includes('comparison') && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#4A6741]/5 border border-[#4A6741]/20 rounded-2xl p-5 flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-[#4A6741]">
                          <Swords size={16} />
                          <h3 className="text-xs font-bold uppercase tracking-wider">WÔY LAAMB</h3>
                        </div>
                        <ul className="flex flex-col gap-3">
                          {[
                            '4 traders anonymes sélectionnés',
                            'Scoring 50/30/20 transparent',
                            'Track record permanent',
                            'Relégation si sous-perf'
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Check size={12} className="text-[#4A6741] mt-0.5 shrink-0" />
                              <span className="text-[11px] font-medium text-white/80">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-[#B5472A]/5 border border-[#B5472A]/20 rounded-2xl p-5 flex flex-col gap-4 opacity-60">
                        <div className="flex items-center gap-2 text-[#B5472A]">
                          <Target size={16} />
                          <h3 className="text-xs font-bold uppercase tracking-wider">Signaux classiques</h3>
                        </div>
                        <ul className="flex flex-col gap-3">
                          {[
                            'Influenceur sans preuve',
                            'Aucun scoring',
                            'Historique opaque',
                            'Aucune conséquence'
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <X size={12} className="text-[#B5472A] mt-0.5 shrink-0" />
                              <span className="text-[11px] font-medium text-white/60">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>


          </div>

          {/* Integrated Join Section - Replacing Fixed CTA */}
          <div className="mt-12 px-1 lg:mt-20">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] p-6 pt-8 md:p-10 backdrop-blur-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-10 bg-[#B5472A] -mr-16 -mt-16 pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center text-center gap-6">
                <div className="bg-[#B5472A]/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-[#B5472A]/30">
                  <Swords size={32} className="text-[#B5472A]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif tracking-wide uppercase mb-2">Rejoindre l'élite de l'arène</h3>
                  <p className="text-xs text-white/40 leading-relaxed max-w-[280px] mx-auto">
                    Accès exclusif aux 4 signaux des champions, aux raisonnements techniques et au vote communautaire.
                  </p>
                </div>

                <div className="w-full space-y-4 pt-2">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#B5472A] to-[#D4623E] text-white font-bold py-5 rounded-2xl text-[13px] uppercase tracking-[0.2em] shadow-[0_15px_40px_rgba(181,71,42,0.3)] flex items-center justify-center gap-3 cursor-pointer"
                  >
                    S'abonner — 20 000 FCFA/MOIS
                  </motion.button>
                  <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                    <Lock size={10} className="text-[#B5472A]" /> N3 — Lire le Marché requis
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Spacer for PWA Home Indicator */}
          <div className="h-[env(safe-area-inset-bottom)] pb-24 lg:pb-0" />

        </main>
      </div>
    );
  };

  // ===========================
  //   SCREEN: COMMUNAUTÉ
  // ===========================
  const CommunauteScreen = () => {
    const [activeCommTab, setActiveCommTab] = useState<'chat' | 'ligue' | 'membres'>('chat');
    const [activeChannel, setActiveChannel] = useState('Général');

    const channels = [
      { id: '1', name: 'Général', icon: Globe, unread: true },
      { id: '2', name: 'N0 Débutants', icon: BookOpen, unread: false },
      { id: '3', name: 'N1 Sécurité', icon: ShieldCheck, unread: false },
      { id: '4', name: 'N2+', icon: BarChart3, unread: false },
    ];

    const messages = [
      { id: 1, user: 'Kofi', level: 'N4 Analyste', color: 'bg-green-500/20 text-green-500', initial: 'K', text: 'Qui a vu le setup BTC de ce mois ? Le support à 42k tient bien 💪', time: '14:23' },
      { id: 2, user: 'Fatou', level: 'N1 Sécurité', color: 'bg-[#C4A055]/20 text-[#C4A055]', initial: 'F', text: "Kofi tu peux expliquer c'est quoi un support ? Je suis encore en N1 😅", time: '14:25' },
      { id: 3, user: 'Kofi', level: 'N4 Analyste', color: 'bg-green-500/20 text-green-500', initial: 'K', text: 'Fatou regarde le glossaire WÔY → "Support". En gros c\'est le sol du prix.', time: '14:26' },
      { id: 4, user: 'Mariama', level: 'N1 Sécurité', color: 'bg-blue-500/20 text-blue-500', initial: 'M', text: 'Je viens de finir N1.3 ! J\'ai sécurisé mon wallet ! Seed phrase ok ✅', time: '14:28' },
    ];

    const leagueMembers = [
      { rank: 1, name: 'Kofi', xp: 520, streak: 9, up: true },
      { rank: 2, name: 'Mariama', xp: 490, streak: 12, up: true },
      { rank: 3, name: 'Yvonne', xp: 420, streak: 6, up: true },
      { rank: 5, name: 'Diallo', xp: 370, streak: 8, up: false },
      { rank: 7, name: 'Amadou (toi)', xp: 350, streak: 7, me: true },
      { rank: 17, name: 'Thierno', xp: 120, streak: 2, down: true },
    ];

    const membersList = [
      { name: 'Sadri', status: 'online', role: 'Fondateur', level: 'N6 Élite', loc: 'Dakar', streak: 45, initial: 'S', color: 'bg-orange-500/20 text-orange-500' },
      { name: 'Mohamed', status: 'online', role: 'Fondateur', level: 'N6 Élite', loc: 'Dakar', streak: 45, initial: 'M', color: 'bg-orange-500/20 text-orange-500' },
      { name: 'Kofi', status: 'online', role: 'Champion LAAMB', level: 'N4 Analyste', loc: 'Lomé', streak: 9, initial: 'K', color: 'bg-green-500/20 text-green-500' },
      { name: 'Mariama', status: 'online', level: 'N1 Sécurité', loc: 'Abidjan', streak: 12, initial: 'M', color: 'bg-blue-500/20 text-blue-500' },
      { name: 'Yvonne', status: 'online', level: 'N2 Fondamentaux', loc: 'Yaoundé', streak: 6, initial: 'Y', color: 'bg-purple-500/20 text-purple-500' },
      { name: 'Diallo', status: 'online', level: 'N0 Débutant', loc: 'Dakar', isNew: true, initial: 'D', color: 'bg-yellow-500/20 text-yellow-500' },
    ];

    return (
      <div className="flex flex-col min-h-[calc(100vh-80px)]">
        {/* Header Section */}
        <section className="px-6 pt-[calc(env(safe-area-inset-top)+2.5rem)] pb-6 lg:pt-10">
          <h2 className="text-xl font-bold font-serif uppercase tracking-[0.2em] mb-6 text-[#C4A055]">Communauté WÔY</h2>
          
          <div className="flex p-1.5 bg-black/40 border border-white/5 rounded-2xl backdrop-blur-md mb-2">
            {[
              { id: 'chat', label: 'Chat', icon: MessageSquare },
              { id: 'ligue', label: 'Ligue', icon: Trophy },
              { id: 'membres', label: 'Membres', icon: Users },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveCommTab(t.id as any)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all relative cursor-pointer",
                  activeCommTab === t.id ? "bg-white/5 text-white" : "text-white/40"
                )}
              >
                <t.icon size={14} className={activeCommTab === t.id ? "text-[#C4A055]" : ""} />
                <span>{t.label}</span>
                {activeCommTab === t.id && (
                  <motion.div layoutId="comm-tab-indicator" className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#C4A055]" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Tab Content */}
        <div className="flex-1 px-6 pb-40">
          {activeCommTab === 'chat' && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6">
              {/* Channels - Wrapping Layout instead of horizontal scroll */}
              <div className="flex flex-wrap gap-2 px-1">
                {channels.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannel(ch.name)}
                    className={cn(
                      "px-3 py-2 rounded-xl border flex items-center gap-2 text-[10px] font-bold transition-all cursor-pointer",
                      activeChannel === ch.name 
                        ? "bg-[#C4A055]/10 border-[#C4A055]/30 text-[#C4A055] shadow-[0_5px_15px_rgba(196,160,85,0.1)]" 
                        : "bg-white/5 border-white/10 text-white/40"
                    )}
                  >
                    <ch.icon size={12} className={activeChannel === ch.name ? "text-[#C4A055]" : "text-white/40"} />
                    <span>{ch.name}</span>
                    {ch.unread && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                  </button>
                ))}
              </div>

              {/* Welcome Banner */}
              <div className="bg-[#C4A055]/5 border border-[#C4A055]/20 p-5 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C4A055]/10 blur-3xl opacity-20" />
                <p className="text-[11px] text-[#C4A055] leading-relaxed relative z-10 font-medium italic">
                  🎉 Bienvenue dans le chat WÔY ! Respecte les règles : pas de signaux, pas de pub, entraide uniquement.
                </p>
              </div>

              {/* Message Feed */}
              <div className="flex flex-col gap-8 mt-2 pb-24">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex gap-4">
                    <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-sm font-bold border border-white/5", msg.color)}>
                      {msg.initial}
                    </div>
                    <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white/90">{msg.user}</span>
                        <span className={cn(
                          "text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider",
                          msg.level.includes('Analyste') ? "bg-green-500/10 text-green-500" : "bg-white/5 text-white/30"
                        )}>
                          {msg.level}
                        </span>
                        <span className="text-[9px] text-white/10 ml-auto whitespace-nowrap">{msg.time}</span>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed font-normal">
                        {msg.text}
                      </p>
                    </div>
                  </div>
                ))}
                {/* Visual Spacer for sticky input */}
                <div className="h-10" />
              </div>

              {/* Sticky Message Input */}
              <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-md z-50">
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#C4A055]/10 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                  <div className="relative bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[1.25rem] p-3 flex items-center gap-3 shadow-2xl">
                    <input 
                      type="text" 
                      placeholder="Écris un message..." 
                      className="flex-1 bg-transparent border-none outline-none text-base font-medium px-2 text-white placeholder:text-white/20 h-10"
                    />
                    <button className="w-10 h-10 rounded-xl bg-[#B5472A] flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform cursor-pointer">
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeCommTab === 'ligue' && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6">
              {/* Ligue Hero Card */}
              <div className="bg-gradient-to-br from-[#C4A055]/20 via-[#C4A055]/5 to-transparent border border-[#C4A055]/30 p-8 rounded-[3rem] relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#C4A055]/10 blur-[60px] rounded-full -mr-20 -mt-20" />
                
                <div className="flex items-center gap-6 relative z-10">
                  <div className="w-20 h-20 bg-black/40 backdrop-blur-xl rounded-[2rem] flex items-center justify-center border border-[#C4A055]/30 shadow-2xl">
                    <Medal size={40} className="text-[#C4A055]" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-xl font-bold font-serif uppercase tracking-tight text-[#C4A055]">LIGUE OR</h3>
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.1em]">Semaine 12 · 20 membres</div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#B5472A] mt-1 bg-[#B5472A]/10 border border-[#B5472A]/20 px-3 py-1 rounded-full w-fit">
                      <Clock size={12} />
                      <span>3 JOURS RESTANTS</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison Rules */}
              <div className="flex justify-center -mt-2">
                <div className="px-5 py-2.5 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-white/40">
                  <div className="flex items-center gap-2 text-blue-400">
                    <ChevronUp size={12} />
                    <span>Top 4 → Diamant</span>
                  </div>
                  <div className="w-px h-3 bg-white/10" />
                  <div className="flex items-center gap-2 text-[#B5472A]">
                    <ChevronDown size={12} />
                    <span>Bas 4 → Argent</span>
                  </div>
                </div>
              </div>

              {/* Leaderboard */}
              <div className="flex flex-col gap-3 pb-24">
                {leagueMembers.map((m) => (
                  <div key={m.rank} className={cn(
                    "relative p-5 rounded-[2rem] border flex items-center justify-between transition-all group",
                    m.me ? "bg-[#B5472A]/10 border-[#B5472A]/40" : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]"
                  )}>
                    <div className="flex items-center gap-5">
                      <span className={cn(
                        "text-lg font-black font-serif w-8 text-center",
                        m.rank <= 3 ? "text-[#C4A055]" : "text-white/10"
                      )}>
                        {m.rank}
                      </span>
                      <div className="w-12 h-12 rounded-[1.25rem] bg-black/20 flex items-center justify-center text-sm font-bold border border-white/10">
                        {m.name.charAt(0)}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold text-white/90 flex items-center gap-1.5">
                          {m.name} {m.up && <User size={10} className="text-blue-400 opacity-80" />}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] font-bold">
                          <span className="text-[#B5472A] flex items-center gap-1">
                            <Flame size={12} /> {m.streak}j
                          </span>
                          {m.me && <span className="text-white/20 font-medium whitespace-nowrap">· -20 vs Mariama</span>}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm font-black text-white/90 whitespace-nowrap">
                      {m.xp} <span className="text-[10px] text-white/20 font-bold ml-0.5">XP</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeCommTab === 'membres' && (
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6">
              {/* Stats Bar */}
              <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-3xl flex justify-between items-center text-center">
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-black font-serif text-white">47</span>
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">EN LIGNE</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-black font-serif text-white">2 340</span>
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">TOTAL</span>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-black font-serif text-white">96%</span>
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">ACTIFS</span>
                </div>
              </div>

              {/* Members List */}
              <div className="flex flex-col gap-3 pb-24">
                {membersList.map((m, i) => (
                  <div key={i} className="p-4 rounded-[2rem] bg-white/[0.03] border border-white/[0.08] flex items-center justify-between group hover:bg-white/[0.06] transition-all">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-12 h-12 rounded-[1.25rem] flex items-center justify-center text-sm font-bold border border-white/5 shadow-inner", m.color)}>
                        {m.initial}
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-white">{m.name}</span>
                          {m.role && (
                             <span className={cn(
                               "text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider flex items-center gap-1",
                               m.role === 'Fondateur' ? "bg-[#C4A055]/20 text-[#C4A055] border border-[#C4A055]/30" : "bg-[#B5472A]/10 text-[#B5472A] border border-[#B5472A]/20"
                             )}>
                               {m.role === 'Fondateur' ? <Star size={10} fill="currentColor" /> : <Trophy size={10} />} 
                               {m.role}
                             </span>
                          )}
                          {m.role === 'Champion LAAMB' && <User size={10} className="text-blue-400 ml-1" />}
                        </div>
                        <div className="text-[10px] text-white/30 font-medium flex items-center gap-2">
                          <span>{m.level}</span>
                          <span className="opacity-30">·</span>
                          <span>{m.loc}</span>
                          {m.streak && (
                            <span className="flex items-center gap-1 text-[#B5472A] font-bold ml-1">
                              <Flame size={10} fill="currentColor" className="opacity-80" /> {m.streak}j
                            </span>
                          )}
                          {m.isNew && <span className="bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded-md text-[7px] font-black ml-1">NEW</span>}
                        </div>
                      </div>
                    </div>
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      m.status === 'online' ? "bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.4)]" : "bg-white/5"
                    )} />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  // ===========================
  //   SCREEN: PROFIL
  //   SCREEN: PROFIL
  // ===========================
  const ProfilScreen = ({ onLogout }: { onLogout: () => void }) => {
    const user = {
      name: "Amadou Diallo",
      level: "N1 Sécurité",
      score: "WÔY Score",
      coins: 175,
      xp: 350,
      streak: 7,
      n1Modules: "3/6",
      nfts: [
        { id: '1', name: 'Sécurité', icon: ShieldCheck, status: 'unlocked' },
        { id: '2', name: 'Wallets', icon: Wallet, status: 'unlocked' },
        { id: '3', name: 'Fond.', icon: BookOpen, status: 'locked' },
        { id: '4', name: 'N2', icon: Lock, status: 'locked' },
      ],
      mastery: [
        { id: 'N0', name: 'N0 Gratuit', progress: 100, status: 'completed' },
        { id: 'N1', name: 'N1 Sécurité', progress: 68, status: 'in-progress' },
        { id: 'N2', name: 'N2 Fond.', progress: 0, status: 'locked' },
        { id: 'N3', name: 'N3 Lire', progress: 0, status: 'locked' },
        { id: 'N4', name: 'N4 Trader', progress: 0, status: 'locked' },
        { id: 'N5', name: 'N5 AF', progress: 0, status: 'locked' },
        { id: 'N6', name: 'N6 Pro', progress: 0, status: 'locked' },
      ]
    };

    return (
      <div className="flex flex-col min-h-[calc(100vh-80px)]">
        {/* Profile Header */}
        <section className="px-6 pt-[calc(env(safe-area-inset-top)+2rem)] pb-8 flex items-center gap-6 lg:pt-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#C4A055]/30 to-[#B5472A]/10 flex items-center justify-center text-2xl font-black font-serif border-2 border-[#C4A055]/30 relative">
             <div className="absolute inset-0 bg-[#C4A055]/10 blur-xl opacity-40 rounded-full" />
             <span className="relative z-10 text-[#C4A055]">Am</span>
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-black text-white">{user.name}</h2>
            <div className="text-xs font-bold text-white/40 uppercase tracking-widest">
              {user.score} · <span className="text-[#C4A055]">{user.level}</span>
            </div>
            <button className="text-[10px] font-black text-[#C4A055]/80 hover:text-[#C4A055] transition-colors flex items-center gap-1 uppercase tracking-tight mt-1 cursor-pointer">
              Modifier le profil <ChevronRight size={10} />
            </button>
          </div>
        </section>

        {/* Global Desktop Grid container starts here for wider views */}
        <div className="flex-1 px-6 pb-40 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:max-w-7xl lg:mx-auto lg:w-full">
          
          {/* LEFT COLUMN: Stats & Mastery */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            {/* Cauris & NFT Row */}
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Cauris Box */}
              <div className="bg-[#C4A055]/5 border border-[#C4A055]/20 p-6 rounded-[2rem] flex flex-col gap-2 flex-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#C4A055]/10 blur-3xl" />
                <div className="flex items-center gap-3">
                  <Coins size={24} className="text-[#C4A055] opacity-60" />
                  <span className="text-3xl font-black font-serif text-[#C4A055]">{user.coins}</span>
                </div>
                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] whitespace-nowrap">Cauris WÔY</span>
              </div>

              {/* NFT Certifications Grid */}
              <div className="flex-1 flex flex-col gap-3">
                <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] px-1">Certifications NFT</h4>
                <div className="grid grid-cols-4 gap-2">
                  {user.nfts.map((n) => (
                    <div key={n.id} className={cn(
                      "aspect-square rounded-2xl flex flex-col items-center justify-center gap-1.5 border transition-all",
                      n.status === 'unlocked' ? "bg-white/5 border-white/10" : "bg-black/40 border-white/[0.03] grayscale opacity-40"
                    )}>
                      <n.icon size={16} className={n.status === 'unlocked' ? "text-[#C4A055]" : "text-white/20"} />
                      <span className="text-[8px] font-bold text-white/20 uppercase tracking-tighter">{n.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mastery Section */}
            <div className="flex flex-col gap-6">
              <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] px-1 mt-4">Maîtrise par niveau</h4>
              <div className="flex flex-col gap-3">
                {user.mastery.map((m) => (
                  <div key={m.id} className={cn(
                    "p-4 rounded-2xl border flex items-center justify-between transition-all",
                    m.status === 'locked' ? "bg-black/20 border-white/[0.03] opacity-40 grayscale" : "bg-white/[0.03] border-white/[0.08]"
                  )}>
                    <div className="flex flex-col gap-2 flex-1 mr-6">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-white/80">{m.name}</span>
                        {m.progress > 0 && <span className="text-[10px] font-bold text-white/20">{m.progress}%</span>}
                      </div>
                      <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/[0.05]">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${m.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={cn(
                            "h-full rounded-full",
                            m.status === 'completed' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" : 
                            m.status === 'in-progress' ? "bg-gradient-to-r from-[#C4A055] to-[#B5472A]" : "bg-white/10"
                          )}
                        />
                      </div>
                    </div>
                    <div className="shrink-0 w-8 h-8 rounded-xl bg-black/20 flex items-center justify-center border border-white/5">
                      {m.status === 'completed' && <Check size={14} className="text-green-500" />}
                      {m.status === 'in-progress' && <Flame size={14} className="text-[#B5472A]" />}
                      {m.status === 'locked' && <Lock size={14} className="text-white/10" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Metrics Grid & Menu */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Metric Grid (2x2) */}
            <div className="grid grid-cols-2 gap-3 mt-4 lg:mt-0">
              <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/[0.08] flex flex-col gap-1 group hover:bg-white/[0.05] transition-all">
                <span className="text-2xl font-black font-serif text-white">{user.xp}</span>
                <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">XP Total</span>
              </div>
              <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/[0.08] flex flex-col gap-1 group hover:bg-white/[0.05] transition-all">
                <div className="flex items-center gap-2">
                  <Flame size={20} className="text-[#B5472A]" />
                  <span className="text-2xl font-black font-serif text-white">{user.streak}</span>
                </div>
                <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Jours streak</span>
              </div>
              <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/[0.08] flex flex-col gap-1 group hover:bg-white/[0.05] transition-all">
                <span className="text-2xl font-black font-serif text-white">{user.n1Modules}</span>
                <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Modules N1</span>
              </div>
              <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/[0.08] flex flex-col gap-1 group hover:bg-white/[0.05] transition-all relative">
                <div className="flex items-center gap-2">
                  <Swords size={20} className="text-white/10" />
                  <span className="text-[10px] font-black text-white/20 uppercase">LAAMB</span>
                </div>
                <Lock size={12} className="absolute top-4 right-4 text-white/10" />
              </div>
            </div>

            {/* General Menu */}
            <div className="flex flex-col gap-2">
              {[
                { label: "Mon Skill Tree", icon: Zap, action: null },
                { label: "Mes certifications NFT", icon: Medal, action: null },
                { label: "Parrainage — +300 XP", icon: Users, action: null },
                { label: "Boutique Cauris WÔY", icon: Coins, action: null },
                { label: "Paramètres", icon: Sun, action: null },
              ].map((item, i) => (
                <button 
                  key={i}
                  className="w-full p-5 rounded-[1.5rem] bg-white/[0.03] border border-white/[0.08] flex items-center justify-between group hover:bg-white/[0.06] hover:border-white/20 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-black/20 flex items-center justify-center border border-white/5 group-hover:bg-[#C4A055]/10 group-hover:border-[#C4A055]/30 transition-all">
                      <item.icon size={18} className="text-white/40 group-hover:text-[#C4A055] transition-colors" />
                    </div>
                    <span className="text-xs font-bold text-white/80 group-hover:text-white transition-colors">{item.label}</span>
                  </div>
                  <ChevronRight size={14} className="text-white/10 group-hover:text-[#C4A055] transition-all group-hover:translate-x-1" />
                </button>
              ))}
            </div>

            {/* Disconnect Button */}
            <button 
              onClick={onLogout}
              className="w-full p-5 rounded-[1.5rem] bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/20 transition-all cursor-pointer group flex items-center justify-center gap-3 mt-4 mb-20"
            >
              <X size={16} className="text-red-500/40 group-hover:text-red-500 transition-colors" />
              <span className="text-[11px] font-black text-red-500/60 group-hover:text-red-500 transition-colors uppercase tracking-[0.3em]">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    );
  };
  const LessonScreen: React.FC<{ lessonId: string; onBack: () => void }> = ({ onBack }) => {
    const [activeLessonTab, setActiveLessonTab] = useState('cours');
    const [selectedSimOption, setSelectedSimOption] = useState<string | null>(null);
    const [showAllConsiquences, setShowAllConsiquences] = useState(false);

    // Quiz State
    const [currentQuizStep, setCurrentQuizStep] = useState(0);
    const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
    const [quizScore, setQuizScore] = useState(0);
    const [showQuizFeedback, setShowQuizFeedback] = useState(false);
    const [hintsRevealed, setHintsRevealed] = useState<number[]>([]);
    // Using local state to prevent App re-renders which would unmount LessonScreen
    const [localCoins, setLocalCoins] = useState(globalCoins);
    const [quizFinished, setQuizFinished] = useState(false);

    // Internal Scroll Ref for Lesson Content
    const lessonScrollRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const resetScroll = () => {
        // Reset both the main window and the internal container
        window.scrollTo(0, 0);
        document.documentElement.scrollTo(0, 0);
        document.body.scrollTo(0, 0);
        if (lessonScrollRef.current) {
          lessonScrollRef.current.scrollTo(0, 0);
        }
      };
      resetScroll();
      const timer = setTimeout(resetScroll, 10);
      return () => clearTimeout(timer);
    }, [activeLessonTab, currentQuizStep, quizFinished]);

    // N1.3 Data
    const lessonData = {
      id: "N1.3",
      title: "Sécuriser son wallet en 10 minutes",
      level: "NIVEAU 1 — Sécurité",
      time: "9 min",
      tldr: "Dans ce module : tu vas comprendre le **protocole de sécurité complet en 4 étapes** et savoir **exécuter les 4 étapes** : seed phrase sur papier, PIN, 2FA, test de restauration.",
      synopsis: [
        "Amadou vient de créer son wallet. Son ami : 'La seed phrase en photo c'est dangereux !'",
        "Amadou comprend que sa seed phrase dans Google Photos est accessible si hacké.",
        "Il apprend le protocole en 4 étapes WÔY.",
        "Il exécute les 4 étapes en 10 minutes réelles.",
        "Il teste la restauration de son wallet — ça marche."
      ],
      video: { duration: "~4 min", label: "Accroche + Conflit + Pivot" },
      realData: [
        { value: "3M", label: "Comptes Google compromis chaque jour" },
        { value: "30 SEC", label: "Durée de validité d'un code 2FA" },
        { value: "0", label: "Façon de récupérer un wallet sans seed phrase" },
        { value: "4", label: "Étapes du protocole de sécurité WÔY" }
      ],
      simulation: {
        question: "Amadou vient de recevoir sa seed phrase. Qu'est-ce qu'il fait ?",
        options: [
          {
            id: 'A',
            status: 'Dangereux',
            text: 'Il prend une photo avec son téléphone',
            xp: 0,
            feedback: 'DANGER CRITIQUE. Google Photos synchronise automatiquement. 3M comptes hackés par jour.'
          },
          {
            id: 'B',
            status: 'Dangereux',
            text: 'Il la note dans les \'Notes\' de son téléphone',
            xp: 30,
            feedback: 'Mieux qu\'une photo mais toujours digital. Les notes se synchronisent aussi.'
          },
          {
            id: 'C',
            status: 'Optimal',
            text: 'Il la note sur papier en lieu sûr avec une copie de secours',
            xp: 100,
            feedback: 'Protocole correct. Papier = hors ligne = impossible à hacker à distance.'
          }
        ]
      },
      quiz: [
        {
          id: 1,
          question: "Pourquoi ne jamais prendre en photo sa seed phrase ?",
          options: [
            { id: 'A', text: "La qualité peut rendre les mots illisibles" },
            { id: 'B', text: "La photo s'envoie sur le Cloud et peut être piratée" },
            { id: 'C', text: "C'est interdit par les conditions d'utilisation" },
            { id: 'D', text: "La lumière du flash peut l'endommager" }
          ],
          correct: 'B',
          hints: ["Le 'Cloud' est-il privé ?", "Où va ta photo après ?", "Le digital est-il sûr ?"]
        },
        {
          id: 2,
          question: "Où devrait-on idéalement stocker sa seed phrase physique ?",
          options: [
            { id: 'A', text: "Dans son portefeuille habituel" },
            { id: 'B', text: "Dans un coffre-fort ou lieu ultra-sécurisé" },
            { id: 'C', text: "Sous son clavier d'ordinateur" },
            { id: 'D', text: "Dans un tiroir de bureau ouvert" }
          ],
          correct: 'B',
          hints: ["Pense au vol...", "Loin des yeux...", "Ultra-sécurisé ?"]
        },
        {
          id: 3,
          question: "Que se passe-t-il si vous perdez votre seed phrase ?",
          options: [
            { id: 'A', text: "On peut la réinitialiser par email" },
            { id: 'B', text: "Le support client peut m'aider" },
            { id: 'C', text: "Accès définitif aux fonds perdu" },
            { id: 'D', text: "Ma banque peut la retrouver" }
          ],
          correct: 'C',
          hints: ["Pas de mot de passe oublié...", "Tu es ta propre banque.", "Définitif ?"]
        },
        {
          id: 4,
          question: "Partager sa seed avec un 'support' sur Discord ?",
          options: [
            { id: 'A', text: "Oui, s'il a le badge officiel" },
            { id: 'B', text: "Jamais, c'est une arnaque" },
            { id: 'C', text: "Seulement si c'est urgent" },
            { id: 'D', text: "Oui, mais par SMS" }
          ],
          correct: 'B',
          hints: ["Support Discord ?", "Ne la donne à PERSONNE.", "Arnaque ?"]
        },
        {
          id: 5,
          question: "Meilleur support pour une seed phrase durable ?",
          options: [
            { id: 'A', text: "Un post-it collé" },
            { id: 'B', text: "Un fichier Excel chiffré" },
            { id: 'C', text: "Une plaque en métal gravée" },
            { id: 'D', text: "Un mémo vocal" }
          ],
          correct: 'C',
          hints: ["Durable ?", "Feu et Eau...", "Métal ?"]
        }
      ]
    };

    return (
      <div className="flex flex-col relative">
        {/* Lesson Header */}
        <header className="px-5 pb-4 flex justify-between items-center sticky top-0 bg-black/40 backdrop-blur-xl z-20 border-b border-white/[0.05] safe-top">
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setGlobalCoins(localCoins); onBack(); }}
              className="group flex items-center gap-1.5 text-[#B5472A] hover:text-[#D4623E] transition-colors cursor-pointer"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-sm">Retour</span>
            </button>
            <div className="flex flex-col border-l border-white/10 pl-3">
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">{lessonData.id}</span>
              <span className="text-[11px] font-bold text-white/80 line-clamp-1 leading-none">{lessonData.title}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-white/[0.06] border border-white/10 rounded-full px-3 py-1.5 hover:scale-[1.02] hover:border-[#C4A055]/30 transition-all duration-200 cursor-pointer">
            <Coins size={12} className="text-[#C4A055]" />
            <span className="font-mono text-xs font-bold leading-none">{localCoins}</span>
          </div>
        </header>

        {/* Lesson Navigation Tabs */}
        <nav className="px-5 py-4 border-b border-white/[0.05] flex justify-between gap-3 items-center bg-black/20 backdrop-blur-md sticky top-[72px] z-10 scrollbar-hide overflow-x-auto">
          {[
            { id: 'cours', icon: BookOpen, label: 'Cours' },
            { id: 'quiz', icon: Zap, label: 'Quiz' },
            { id: 'mission', icon: Trophy, label: 'Mission' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveLessonTab(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-6 py-2 rounded-xl transition-all text-xs font-bold flex-1 md:flex-none justify-center whitespace-nowrap cursor-pointer",
                activeLessonTab === tab.id
                  ? "bg-[#C4A055]/10 text-[#C4A055] border border-[#C4A055]/20 shadow-[0_0_15px_rgba(196,160,85,0.1)]"
                  : "text-white/30 hover:text-white/50"
              )}
            >
              <tab.icon size={14} />
              {tab.label}
              {activeLessonTab === tab.id && (
                <motion.div
                  layoutId="lesson-tab-active"
                  className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-[#C4A055]"
                />
              )}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <main ref={lessonScrollRef} className="px-5 pt-10 pb-40 flex flex-col gap-12 overflow-y-auto max-w-4xl mx-auto w-full">
          {activeLessonTab === 'cours' && (
            <>
              {/* Lesson Hero */}
              <section className="bg-white/[0.03] border border-white/[0.08] rounded-[2rem] p-6 md:p-10 flex flex-col gap-10">
                <div className="flex justify-between items-start">
                  <span className={cn("text-sm font-mono font-bold tracking-[0.2em] opacity-80", colors.textAccent.replace('text-', 'text-'))}>N1.3</span>
                  <div className={cn("flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-xl border font-mono", colors.textAccent, colors.textAccent.replace('text-', 'bg-').concat('/10'), colors.textAccent.replace('text-', 'border-').concat('/30'))}>
                    <Clock size={12} /> {lessonData.time}
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl md:text-5xl font-serif font-bold uppercase leading-tight tracking-tight text-white/95">
                    SÉCURISER SON WALLET <br className="hidden md:block" /> EN 10 MINUTES
                  </h1>
                  <div className="mt-4 flex items-center gap-2 text-[10px] md:text-sm font-bold text-white/30 tracking-[0.1em] uppercase group">
                    <span className="shrink-0">{lessonData.level}</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>
                </div>
              </section>

              {/* TL;DR */}
              <section className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 relative overflow-hidden group hover:border-[#C4A055]/20 transition-all">
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <Rocket size={16} className="text-[#C4A055]" />
                  <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C4A055]">TL;DR</h3>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-white/70 relative z-10 max-w-2xl">
                  {lessonData.tldr.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-white font-bold">{part}</strong> : part)}
                </p>
              </section>

              {/* Synopsis & Real Data - Desktop Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:items-start">
                {/* Synopsis */}
                <section className="flex flex-col gap-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C4A055]">Synopsis</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {lessonData.synopsis.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 flex gap-4 items-start hover:border-[#C4A055]/20 transition-all"
                      >
                        <span className="font-mono text-xs font-bold text-[#C4A055] opacity-50 mt-0.5">{i + 1}</span>
                        <p className="text-sm text-white/70 leading-relaxed font-semibold">{step}</p>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* Données Réelles */}
                <section className="flex flex-col gap-6">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C4A055]">DONNÉES RÉELLES</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {lessonData.realData.map((stat, i) => (
                      <div key={i} className="bg-white/[0.03] border border-white/[0.08] rounded-[1.5rem] p-6 flex flex-col gap-2 hover:bg-white/[0.05] hover:border-[#C4A055]/30 transition-all duration-200 cursor-default">
                        <h4 className="text-3xl font-serif font-bold tracking-tight text-[#C4A055]">{stat.value}</h4>
                        <p className="text-[10px] text-white/50 leading-relaxed font-bold uppercase tracking-tight">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Vidéo Narrative */}
              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-1 md:mb-2">
                  <Clapperboard size={14} className="text-[#C4A055]" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C4A055]">VIDÉO NARRATIVE</h3>
                </div>
                <div className="relative aspect-video rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 bg-[#14110E] group cursor-pointer shadow-2xl hover:border-[#C4A055]/30 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B5472A]/20 to-transparent mix-blend-overlay" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 md:gap-4">
                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#B5472A] flex items-center justify-center shadow-[0_0_40px_rgba(181,71,42,0.5)] group-hover:scale-110 transition-transform duration-500">
                      <Play size={24} fill="currentColor" className="ml-1 md:ml-1.5" />
                    </div>
                    <div className="text-center translate-y-2 group-hover:translate-y-0 transition-transform duration-300 px-4">
                      <p className="text-[10px] md:text-[11px] font-bold italic text-white/70 tracking-wide uppercase">{lessonData.video.label}</p>
                      <p className="text-[9px] md:text-[10px] font-mono text-white/30 mt-0.5 md:mt-1 uppercase tracking-widest">{lessonData.video.duration}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 md:top-6 md:left-6">
                    <div className="flex items-center gap-1.5 bg-[#B5472A] px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[8px] md:text-[9px] font-bold uppercase tracking-widest shadow-lg">
                      <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-white animate-pulse" />
                      LIVE · {lessonData.video.duration}
                    </div>
                  </div>
                </div>
              </section>

              {/* Cas Pratique */}
              <section className="flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <Smartphone size={14} className="text-[#C4A055]" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C4A055]">CAS PRATIQUE</h3>
                </div>
                <div className="bg-[#4A6741]/5 border-l-4 border-l-[#4A6741] border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4 text-[#4A6741]">
                    <PlayCircle size={18} />
                    <span className="text-xs font-bold uppercase tracking-wider">À produire</span>
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 p-5 rounded-xl border-dashed">
                    <p className="text-sm font-bold text-white/40 italic text-center">Contenu en cours de production</p>
                  </div>
                </div>
              </section>

              {/* Simulation Interactive */}
              <section className="flex flex-col gap-6 ">
                <div className="flex items-center gap-2">
                  <Gamepad2 size={14} className="text-[#C4A055]" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C4A055]">SIMULATION INTERACTIVE</h3>
                </div>
                <div className="bg-white/[0.03] border border-white/[0.08] rounded-[2rem] p-6 md:p-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                    <div className="flex gap-6 items-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-2xl flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
                        <User size={40} className="text-[#C4A055] opacity-80" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <h4 className="text-base font-bold leading-relaxed text-white/90">
                          {lessonData.simulation.question}
                        </h4>
                        <p className="text-[10px] text-white/30 uppercase tracking-[0.15em] font-bold italic">Choisis la meilleure option pour protéger Amadou.</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {lessonData.simulation.options.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => {
                            setSelectedSimOption(opt.id);
                            setShowAllConsiquences(false);
                          }}
                          className={cn(
                            "w-full border rounded-2xl p-5 flex gap-5 items-center text-left transition-all group active:scale-[0.98]",
                            selectedSimOption === opt.id
                              ? "bg-[#C4A055]/10 border-[#C4A055]/50 shadow-[0_0_20px_rgba(196,160,85,0.1)]"
                              : "bg-white/[0.03] border-white/[0.08] hover:border-[#C4A055]/30 hover:bg-[#C4A055]/5"
                          )}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 text-sm font-mono font-bold transition-colors",
                            selectedSimOption === opt.id
                              ? "bg-[#C4A055]/20 border-[#C4A055]/40 text-[#C4A055]"
                              : "bg-white/5 border-white/10 text-white/30 group-hover:bg-[#C4A055]/20 group-hover:text-[#C4A055]"
                          )}>
                            {opt.id}
                          </div>
                          <p className={cn(
                            "text-sm leading-snug transition-colors",
                            selectedSimOption === opt.id ? "text-white font-medium" : "text-white/60 group-hover:text-white"
                          )}>
                            {opt.text}
                          </p>
                        </button>
                      ))}
                    </div>

                    {selectedSimOption && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col gap-6"
                      >
                        {/* Feedback Card */}
                        {!showAllConsiquences && (
                          <div className={cn(
                            "p-6 rounded-[2rem] border relative overflow-hidden",
                            lessonData.simulation.options.find(o => o.id === selectedSimOption)?.status === 'Optimal'
                              ? "bg-green-500/5 border-green-500/20"
                              : "bg-[#B5472A]/5 border-[#B5472A]/20"
                          )}>
                            <div className="flex flex-col gap-4 relative z-10">
                              <div className="flex items-center gap-2">
                                <span className={cn(
                                  "font-bold text-sm",
                                  lessonData.simulation.options.find(o => o.id === selectedSimOption)?.status === 'Optimal' ? "text-green-500" : "text-[#B5472A]"
                                )}>
                                  {lessonData.simulation.options.find(o => o.id === selectedSimOption)?.status === 'Optimal' ? '✅' : '❌'} {lessonData.simulation.options.find(o => o.id === selectedSimOption)?.status} — {selectedSimOption}
                                </span>
                              </div>
                              <p className="text-sm text-white/70 leading-relaxed font-medium">
                                {lessonData.simulation.options.find(o => o.id === selectedSimOption)?.feedback}
                              </p>
                              <div className={cn(
                                "text-lg font-bold font-serif",
                                lessonData.simulation.options.find(o => o.id === selectedSimOption)?.status === 'Optimal' ? "text-green-500" : "text-[#B5472A]"
                              )}>
                                {lessonData.simulation.options.find(o => o.id === selectedSimOption)?.xp} XP
                              </div>
                              {lessonData.simulation.options.find(o => o.id === selectedSimOption)?.status !== 'Optimal' && (
                                <div className="flex items-center gap-2 text-[11px] text-[#C4A055] py-2 px-3 rounded-lg bg-[#C4A055]/5 border border-[#C4A055]/10 mt-2">
                                  <Lightbulb size={14} className="shrink-0" />
                                  <span className="italic">Meilleur choix : {lessonData.simulation.options.find(o => o.id === 'C')?.id} — {lessonData.simulation.options.find(o => o.id === 'C')?.text}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Consequences List */}
                        {showAllConsiquences && (
                          <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/[0.08] flex flex-col gap-6">
                            <h5 className="text-[10px] uppercase font-bold tracking-widest text-[#C4A055]">Les 3 conséquences :</h5>
                            <div className="flex flex-col gap-6">
                              {lessonData.simulation.options.map((opt) => (
                                <div key={opt.id} className="flex gap-4 border-l-2 pl-4" style={{ borderColor: opt.status === 'Optimal' ? '#10B981' : '#B5472A' }}>
                                  <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5">
                                      <p className={cn("text-xs font-bold", opt.status === 'Optimal' ? "text-green-500" : "text-[#B5472A]")}>
                                        {opt.id} — {opt.status} · {opt.xp} XP
                                      </p>
                                    </div>
                                    <p className="text-[10px] text-white/50 leading-relaxed">
                                      {opt.feedback}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-center">
                          <button
                            onClick={() => setShowAllConsiquences(!showAllConsiquences)}
                            className="text-[11px] font-bold text-white/40 hover:text-[#C4A055] transition-colors py-2 px-4 rounded-full border border-white/5 hover:border-[#C4A055]/20 flex items-center gap-2 cursor-pointer group"
                          >
                            <span className="underline decoration-white/10 group-hover:decoration-[#C4A055]/20 underline-offset-4">
                              {showAllConsiquences ? 'Masquer les conséquences' : 'Voir les 3 conséquences'}
                            </span>
                            <ChevronRight size={14} className={cn("transition-transform duration-300", showAllConsiquences ? "-rotate-90" : "rotate-90")} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </section>

              <div className="mt-8 mb-12 flex justify-center sticky bottom-6 z-30">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setActiveLessonTab('quiz');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-10 py-4 rounded-full bg-[#B5472A] text-white text-sm font-bold shadow-[0_15px_30px_rgba(181,71,42,0.3)] flex items-center justify-center gap-3 hover:bg-[#D4623E] transition-all cursor-pointer tracking-widest uppercase"
                >
                  Passer au Quiz <ChevronRight size={18} />
                </motion.button>
              </div>
            </>
          )}

          {activeLessonTab === 'quiz' && (
            <div className="flex flex-col gap-8">
              {quizFinished ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] p-10 flex flex-col items-center text-center gap-8"
                >
                  <div className="w-24 h-24 bg-[#C4A055]/20 rounded-3xl flex items-center justify-center border border-[#C4A055]/30 shadow-[0_0_30px_rgba(196,160,85,0.2)]">
                    <Trophy size={48} className="text-[#C4A055]" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif font-bold uppercase tracking-tight mb-2">Quiz terminé !</h2>
                    <p className="text-white/50 font-medium">Félicitations Amadou, tu as maîtrisé ce module.</p>
                  </div>

                  <div className="flex gap-8 items-center bg-white/5 rounded-3xl px-8 py-6 border border-white/10">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-white/30 text-left">SCORE FINAL</span>
                      <span className="text-3xl font-serif font-black text-[#C4A055]">{quizScore}/5</span>
                    </div>
                    <div className="w-px h-10 bg-white/10" />
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-white/30 text-left">RÉCOMPENSE</span>
                      <span className="text-2xl font-serif font-bold flex items-center gap-2">+150 <Coins size={16} className="text-[#C4A055]" /></span>
                    </div>
                  </div>

                  <button
                    onClick={() => { setGlobalCoins(localCoins); onBack(); }}
                    className="mt-4 px-10 py-4 bg-[#B5472A] hover:bg-[#D4623E] rounded-full text-sm font-bold shadow-[0_10px_30px_rgba(181,71,42,0.3)] transition-all active:scale-[0.98] cursor-pointer"
                  >
                    Retour aux cours
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Progress Bar */}
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={cn(
                          "h-1.5 flex-1 rounded-full transition-all duration-500",
                          i < currentQuizStep ? "bg-green-500" : i === currentQuizStep ? "bg-[#C4A055]" : "bg-white/10"
                        )}
                      />
                    ))}
                  </div>

                  {/* Question Nav */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Question {currentQuizStep + 1} / 5</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num, i) => (
                        <div
                          key={num}
                          className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all",
                            i === currentQuizStep ? "bg-[#B5472A] text-white shadow-lg" :
                              i < currentQuizStep ? "bg-white/10 text-white/60" : "bg-white/5 text-white/20"
                          )}
                        >
                          {num}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main Question Card */}
                  <motion.div
                    key={currentQuizStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col gap-8"
                  >
                    <h2 className="text-xl md:text-2xl font-bold leading-tight text-white/95">
                      {lessonData.quiz[currentQuizStep].question}
                    </h2>

                    {/* Hints (Indices) */}
                    <div className="flex flex-wrap gap-3">
                      {[5, 10, 15].map((cost, idx) => (
                        <button
                          key={idx}
                          disabled={hintsRevealed.includes(idx)}
                          onClick={() => {
                            if (localCoins >= cost) {
                              setLocalCoins(localCoins - cost);
                              setHintsRevealed([...hintsRevealed, idx]);
                            }
                          }}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2.5 rounded-2xl border transition-all text-xs font-bold whitespace-nowrap cursor-pointer",
                            hintsRevealed.includes(idx)
                              ? "bg-[#C4A055]/20 border-[#C4A055]/30 text-[#C4A055]"
                              : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:border-white/20 active:scale-95"
                          )}
                        >
                          <Lightbulb size={14} className={hintsRevealed.includes(idx) ? "text-[#C4A055]" : "text-white/20"} />
                          Indice {idx + 1}
                          <span className={cn("flex items-center gap-1", !hintsRevealed.includes(idx) && "text-white/20")}>
                            {cost} <Coins size={10} />
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Revealed Hint Message */}
                    {hintsRevealed.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#C4A055]/5 border border-[#C4A055]/20 p-4 rounded-2xl flex items-start gap-3"
                      >
                        <Lightbulb size={16} className="text-[#C4A055] shrink-0 mt-0.5" />
                        <p className="text-xs text-[#C4A055] italic font-medium">
                          {lessonData.quiz[currentQuizStep].hints[Math.max(...hintsRevealed)]}
                        </p>
                      </motion.div>
                    )}

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      {lessonData.quiz[currentQuizStep].options.map((opt) => (
                        <button
                          key={opt.id}
                          disabled={showQuizFeedback}
                          onClick={() => {
                            setSelectedQuizOption(opt.id);
                          }}
                          className={cn(
                            "border rounded-2xl p-5 flex gap-4 items-center text-left transition-all group active:scale-[0.98] cursor-pointer",
                            selectedQuizOption === opt.id
                              ? "bg-[#B5472A]/10 border-[#B5472A]/50 shadow-[0_0_20px_rgba(181,71,42,0.1)]"
                              : "bg-white/[0.03] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05]"
                          )}
                        >
                          <div className={cn(
                            "w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 text-sm font-mono font-bold transition-all",
                            selectedQuizOption === opt.id
                              ? "bg-[#B5472A]/20 border-[#B5472A]/40 text-[#B5472A]"
                              : "bg-white/5 border-white/10 text-white/30 group-hover:bg-white/10"
                          )}>
                            {opt.id}
                          </div>
                          <p className={cn(
                            "text-sm leading-snug transition-colors",
                            selectedQuizOption === opt.id ? "text-white font-medium" : "text-white/60 group-hover:text-white"
                          )}>
                            {opt.text}
                          </p>
                        </button>
                      ))}
                    </div>

                    {/* Footer Score & Next */}
                    <div className="mt-8 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/30">SCORE TOTAL</span>
                        <div className="flex items-center gap-1.5 font-sans font-bold text-lg">
                          <span>{quizScore}/5</span>
                          <span className="text-white/10">·</span>
                          <div className="flex items-center gap-1">
                            <Coins size={14} className="text-[#C4A055]" />
                            <span className="text-[#C4A055]">{localCoins}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        disabled={!selectedQuizOption || showQuizFeedback}
                        onClick={() => {
                          setShowQuizFeedback(true);
                          if (selectedQuizOption === lessonData.quiz[currentQuizStep].correct) {
                            setQuizScore(quizScore + 1);
                          }
                          setTimeout(() => {
                            if (currentQuizStep < 4) {
                              setCurrentQuizStep(currentQuizStep + 1);
                              setSelectedQuizOption(null);
                              setShowQuizFeedback(false);
                              setHintsRevealed([]);
                            } else {
                              setQuizFinished(true);
                            }
                          }, 1000);
                        }}
                        className={cn(
                          "px-8 py-3.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg",
                          selectedQuizOption && !showQuizFeedback
                            ? "bg-[#B5472A] text-white hover:bg-[#D4623E] hover:translate-x-1"
                            : "bg-white/5 text-white/20 cursor-not-allowed"
                        )}
                      >
                        {currentQuizStep === 4 ? 'Terminer' : 'Suivant'}
                        <ArrowLeft size={16} className="rotate-180" />
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </div>
          )}
          {activeLessonTab === 'mission' && (
            <div className="flex flex-col gap-10">
              {/* Mission Hero */}
              <section className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-6 md:p-8 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-white/40 uppercase">N1.3 · Mission</span>
                  <div className="bg-[#C4A055]/10 border border-[#C4A055]/20 px-3 py-1.5 rounded-xl text-[10px] font-bold text-[#C4A055] shadow-[0_0_15px_rgba(196,160,85,0.1)]">
                    +150 XP
                  </div>
                </div>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-2xl md:text-3xl font-serif font-bold uppercase leading-tight tracking-tight text-white/95"
                >
                  MISSION — SÉCURISER SON <br className="hidden md:block" /> WALLET EN 10 MINUTES
                </motion.h2>
              </section>

              {/* TL;DR Card */}
              <motion.section
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="border-l-4 border-[#C4A055] bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#C4A055]/5 blur-[40px] rounded-full pointer-events-none" />
                <div className="flex items-center gap-2 mb-3 relative z-10">
                  <Zap size={14} className="text-[#C4A055]" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C4A055]">TL;DR</h3>
                </div>
                <p className="text-sm md:text-base leading-relaxed text-white/80 font-medium relative z-10">
                  Dans ce module : tu vas comprendre <strong className="text-white">le protocole de sécurité complet en 4 étapes</strong> et savoir <strong className="text-white">exécuter les 4 étapes</strong> : seed phrase sur papier, PIN, 2FA, test de restauration.
                </p>
              </motion.section>

              {/* Mission Pratique */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 whitespace-nowrap">MISSION PRATIQUE</h4>
                  <div className="h-px bg-white/10 w-full" />
                </div>
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-gradient-to-br from-[#4A6741]/20 to-transparent border border-[#4A6741]/40 rounded-3xl p-6 md:p-8 flex flex-col gap-5 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#4A6741]/10 blur-[50px] rounded-full pointer-events-none" />
                  <div className="flex items-center gap-2 text-[#4A6741] relative z-10">
                    <Trophy size={16} />
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#4A6741]">À COMPLÉTER DANS LES 24H</h3>
                  </div>
                  <p className="text-sm md:text-base text-white/80 leading-relaxed font-medium relative z-10">
                    Exécute les 4 étapes du protocole WÔY : (1) Seed phrase sur papier (2) PIN actif (3) 2FA activé (4) Test de restauration.
                  </p>
                  <div className="bg-black/30 border border-white/10 rounded-2xl p-4 flex gap-3 items-center relative z-10">
                    <div className="w-8 h-8 rounded-lg bg-[#C4A055]/10 flex items-center justify-center shrink-0">
                      <MessageSquare size={14} className="text-[#C4A055]" />
                    </div>
                    <p className="text-[11px] md:text-xs text-white/60 font-medium">
                      Poste dans le Telegram WÔY : <span className="text-[#C4A055] font-mono italic">'Protocole sécurité WÔY : 4/4 étapes ✅'</span>
                    </p>
                  </div>
                </motion.section>
              </div>

              {/* Final CTA */}
              <div className="mt-4 mb-12 flex justify-center sticky bottom-6 z-30">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setGlobalCoins(localCoins); onBack(); }}
                  className="px-10 py-4 rounded-full bg-[#B5472A] text-white text-sm font-bold shadow-[0_15px_30px_rgba(181,71,42,0.3)] flex items-center justify-center gap-3 hover:bg-[#D4623E] transition-all cursor-pointer tracking-widest uppercase"
                >
                  Module suivant — N1.4 <ChevronRight size={18} />
                </motion.button>
              </div>
            </div>
          )}

          {/* Bottom Spacer for PWA Home Indicator */}
          <div className="h-[env(safe-area-inset-bottom)] pb-24" />
        </main>
      </div>
    );
  };

  // ===========================
  //   RENDER
  // ===========================
  return (
    <div className={cn("min-h-screen transition-colors duration-700 font-sans text-white selection:bg-white/20", colors.bg)}>
      {/* Background Cosmic Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <StarField />
        <div
          className={cn(
            "absolute -top-[10%] left-1/2 -translate-x-1/2 w-[120%] h-[60%] blur-[120px] opacity-20 rounded-full transition-all duration-1000",
            colors.glowClass
          )}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay" />
        {/* Cosmic orbs */}
        <div className="absolute top-[20%] left-[10%] w-2 h-2 rounded-full bg-[#C4A055]/30" style={{ animation: 'cosmic-drift 12s infinite ease-in-out' }} />
        <div className="absolute top-[60%] right-[15%] w-1.5 h-1.5 rounded-full bg-[#B5472A]/30" style={{ animation: 'cosmic-drift 18s infinite ease-in-out reverse' }} />
        <div className="absolute top-[40%] left-[70%] w-1 h-1 rounded-full bg-[#D4AF37]/25" style={{ animation: 'cosmic-drift 15s infinite ease-in-out' }} />
      </div>

      {!isAuthenticated ? (
        <AuthScreen onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <>
          {/* Desktop Header */}
          <header className="hidden lg:flex relative z-50 border-b border-white/5 backdrop-blur-xl bg-black/20 px-8 py-4 justify-between items-center sticky top-0">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <Logo />
                <h1 className="font-serif text-xl tracking-[0.2em] font-bold">
                  WÔY <span className={colors.textAccent}>ACADEMY</span>
                </h1>
              </div>

              {/* Desktop Nav Links */}
              <nav className="flex items-center gap-1">
                {[
                  { id: 'accueil', icon: Home, label: 'Accueil' },
                  { id: 'cours', icon: BookOpen, label: 'Cours' },
                  { id: 'rapport', icon: BarChart3, label: 'Rapport' },
                  { id: 'laamb', icon: Swords, label: 'LAAMB' },
                  { id: 'communaute', icon: Users, label: 'Communauté' },
                  { id: 'profil', icon: User, label: 'Profil' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setCurrentLesson(null);
                    }}
                    className={cn(
                      "relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer",
                      activeTab === tab.id
                        ? "bg-white/[0.08] text-white"
                        : "text-white/40 hover:text-white/70 hover:bg-white/[0.03]"
                    )}
                  >
                    <tab.icon size={16} />
                    <span>{tab.label}</span>
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="desktop-nav-indicator"
                        className={cn("absolute bottom-0 left-3 right-3 h-0.5 rounded-full", colors.textAccent.replace('text-', 'bg-'))}
                      />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 cursor-pointer hover:bg-white/10 transition-all">
                <Coins size={16} className="text-[#C4A055]" />
                <span className="font-mono text-sm font-bold tracking-tighter">{globalCoins}</span>
              </div>
              <button
                onClick={() => setTheme(theme === 'violet' ? 'terracotta' : 'violet')}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:scale-105 transition-transform"
              >
                {theme === 'violet' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <div className="relative cursor-pointer group">
                <Bell size={20} className="text-white/60 group-hover:text-white transition-colors" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black" />
              </div>
            </div>
          </header>

          {/* Layouts */}
          {currentLesson ? (
            <LessonScreen lessonId={currentLesson} onBack={() => setCurrentLesson(null)} />
          ) : (
            <>
              {activeTab === 'accueil' && <MobileLayout />}
              {activeTab === 'accueil' && <DesktopLayout />}
              {activeTab === 'cours' && <CoursMobileScreen />}
              {activeTab === 'cours' && <CoursDesktopScreen />}
              {activeTab === 'rapport' && <RapportScreen />}
              {activeTab === 'laamb' && <LaambScreen />}
              {activeTab === 'communaute' && <CommunauteScreen />}
              {activeTab === 'profil' && <ProfilScreen onLogout={() => setShowLogoutConfirm(true)} />}
            </>
          )}

          {/* Logout Confirmation Modal */}
          <AnimatePresence>
            {showLogoutConfirm && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowLogoutConfirm(false)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative w-full max-w-sm bg-[#0D0A07] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full -mr-16 -mt-16" />
                  
                  <div className="relative z-10 flex flex-col items-center text-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                      <X size={32} className="text-red-500" />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl font-bold font-serif uppercase tracking-wider text-white">Déconnexion ?</h3>
                      <p className="text-sm text-white/40 leading-relaxed">
                        Es-tu sûr de vouloir quitter ton centre de formation WÔY ?
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full mt-2">
                      <button 
                        onClick={() => setShowLogoutConfirm(false)}
                        className="py-4 rounded-2xl bg-white/5 border border-white/10 font-bold text-xs text-white/60 hover:bg-white/10 transition-all cursor-pointer"
                      >
                        Annuler
                      </button>
                      <button 
                        onClick={() => {
                          setIsAuthenticated(false);
                          setShowLogoutConfirm(false);
                          setActiveTab('accueil');
                        }}
                        className="py-4 rounded-2xl bg-red-500 font-bold text-xs text-white shadow-lg shadow-red-500/20 hover:bg-red-600 transition-all cursor-pointer"
                      >
                        Oui, déconnexion
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Mobile Bottom Navigation */}
          {!currentLesson && (
            <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-2xl border-t border-white/[0.08] px-4 pt-3 pb-2 safe-bottom">
              <div className="flex justify-between items-center max-w-md mx-auto">
                {[
                  { id: 'accueil', icon: Home, label: 'Accueil' },
                  { id: 'cours', icon: BookOpen, label: 'Cours' },
                  { id: 'rapport', icon: BarChart3, label: 'Rapport' },
                  { id: 'laamb', icon: Swords, label: 'LAAMB' },
                  { id: 'communaute', icon: Users, label: 'Communauté' },
                  { id: 'profil', icon: User, label: 'Profil' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setCurrentLesson(null);
                    }}
                    className="flex flex-col items-center gap-0.5 min-w-[48px] group hover:scale-105 active:scale-[0.97] transition-transform duration-200"
                  >
                    <tab.icon
                      size={20}
                      className={cn(
                        "transition-colors",
                        activeTab === tab.id ? colors.textAccent : "text-white/30 group-hover:text-white/50"
                      )}
                    />
                    <span className={cn(
                      "text-[9px] font-medium transition-colors",
                      activeTab === tab.id ? "text-white" : "text-white/25"
                    )}>
                      {tab.label}
                    </span>
                    {activeTab === tab.id && (
                      <motion.div layoutId="nav-dot" className={cn("w-1 h-1 rounded-full mt-0.5", colors.textAccent.replace('text-', 'bg-'))} />
                    )}
                  </button>
                ))}
              </div>
            </nav>
          )}

          {/* Desktop Cursor Glow */}
          <div className="hidden lg:block fixed inset-0 pointer-events-none z-[9999]">
            <div
              className={cn("w-64 h-64 blur-[100px] opacity-10 rounded-full absolute -translate-x-1/2 -translate-y-1/2 transition-colors", colors.glowClass)}
              style={{ left: 'var(--mouse-x, 50%)', top: 'var(--mouse-y, 50%)' }}
            />
          </div>
        </>
      )}
    </div>
  );
}
