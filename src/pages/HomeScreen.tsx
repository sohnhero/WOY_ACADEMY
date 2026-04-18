import React from 'react';
import {
  Bell,
  Award,
  Zap,
  Target,
  ArrowRight,
  Check,
  Lock,
  Trophy,
  Coins as CoinIcon,
  BookOpen,
  Clock,
  PlayCircle,
  Search,
  Shield,
  ShieldCheck,
  ChevronRight,
  Star,
  ListChecks
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';
import { useAppContext } from '../context/AppContext';
import { Logo } from '../components/common/Logo';
import { ScoreRing } from '../components/common/Progress';
import { 
  StatBadge, 
  LevelBadge, 
  StreakBadge,
  XPProgress 
} from '../components/common/NavbarComponents';
import { CosmicBackground } from '../components/common/StarField';
import { StatCard, ModuleCard } from '../components/common/Cards';
import { StreakCard } from '../components/common/StreakCard';
import { LeagueCard } from '../components/common/LeagueCard';
import { ShieldCard } from '../components/common/ShieldCard';
import { modules } from '../data/modules';
import { AVATARS } from '../data/narrativeN01';

export const HomeScreen = () => {
  const {
    theme,
    setTheme,
    globalCoins,
    userXP,
    streak,
    isShieldActive,
    isShieldModalOpen,
    setIsShieldModalOpen,
    setCurrentLesson
  } = useAppContext();

  const level = Math.floor(userXP / 1000) + 1;
  const xpInLevel = userXP % 1000;
  const xpForNext = 1000;

  const isLeagueLocked = level < 3;

  // --- Logic: Progress Tracking ---
  const completedCount = modules.filter(m => m.status === 'complété').length;
  const remainingCount = modules.length - completedCount;

  // --- Mobile HUD ---
  const MobileLayout = () => (
    <div className="lg:hidden flex flex-col min-h-screen pb-24 relative z-10 text-left">
      <header className="px-6 pt-10 pb-8 flex justify-between items-end safe-top">
        <div className="flex flex-col text-left">
          <p className="text-white/20 text-[11px] font-black tracking-[0.3em] uppercase mb-2">Canal de Mission</p>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-serif font-black text-white leading-none tracking-tight uppercase">Amadou</h1>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
             onClick={() => setTheme(theme === 'violet' ? 'terracotta' : 'violet')}
             className="w-12 h-12 rounded-2xl glass-pill flex items-center justify-center text-white/40 border-white/5 shadow-2xl transition-all active:scale-90"
          >
            <Zap size={20} className={cn(theme === 'violet' ? "text-accent" : "text-highlight")} />
          </button>
          <div className="relative group">
            <button className="w-12 h-12 rounded-2xl glass-pill flex items-center justify-center text-white/40 border-white/5 shadow-2xl transition-all active:scale-90">
              <Bell size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="px-6 mb-8 flex items-center gap-3 overflow-x-auto scrollbar-hide">
        <StatBadge icon={CoinIcon} value={globalCoins} label="ORRUM" pulse />
        <StreakBadge days={streak} />
        <LevelBadge level={level} />
      </div>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-6 mb-6 artifact-glass rounded-[2.5rem] p-8 relative overflow-hidden group"
      >
        <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 blur-xl bg-accent scale-150 rounded-full" />
        <div className="flex items-center gap-8 relative z-10">
          <div className="relative text-white">
            <ScoreRing score={78} size={110} strokeWidth={10} id="cosmic-mobile" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[10px] font-black tracking-[0.4em] text-accent uppercase mb-2">Secteur Actif</p>
            <h2 className="text-3xl font-serif font-black text-white leading-tight mb-4 tracking-tighter uppercase">N0.1 Sécurité</h2>
            <XPProgress xp={xpInLevel} maxXP={xpForNext} />
          </div>
        </div>
      </motion.section>

      <div className="px-6 pb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="artifact-glass rounded-[2rem] p-6 relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/30">
                <Target size={18} className="text-accent" />
              </div>
              <h3 className="font-serif font-black text-lg text-white uppercase tracking-tight">Objectif du Jour</h3>
            </div>
          </div>
          <button 
            onClick={() => setCurrentLesson('1.3')}
            className="w-full py-5 rounded-2xl bg-accent font-black text-xs uppercase tracking-[0.2em] text-white flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(var(--woy-accent-rgb),0.3)] hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
          >
            Lancer <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    </div>
  );

  // --- TWO-COLUMN MISSION CONTROL HUD ---
  const DesktopLayout = () => (
    <div className="hidden lg:grid grid-cols-[1.6fr_1fr] h-full max-h-[calc(100vh-100px)] p-6 xl:p-8 gap-8 relative z-10 w-full max-w-[1500px] mx-auto overflow-hidden">
      
      {/* ══ LEFT COLUMN: MISSIONS & ACTIVITY ═════════════════════════════════ */}
      <div className="flex flex-col gap-6 min-h-0 min-w-0">
        
        {/* Current Module Card (with Holographic Amadou) */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative overflow-hidden rounded-[2.5rem] artifact-glass border-white/5 p-8 xl:p-10 flex items-center gap-8 shrink-0"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 blur-[90px] -mr-16 -mt-16 pointer-events-none" />
          
          <div className="flex-1 text-left space-y-4 relative z-10">
            <div className="flex items-center gap-4">
              <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">MISSION ACTIVE</span>
            </div>
            <h2 className="text-3xl xl:text-4xl font-serif font-black leading-tight text-white tracking-widest uppercase">
              SÉCURISER SON <span className="text-accent">WALLET</span>
            </h2>
            <p className="max-w-md text-xs text-white/40 leading-relaxed italic">"Fortifiez vos remparts numériques avant que les maraudeurs ne frappent."</p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentLesson('1.3')}
              className="py-3.5 px-8 rounded-xl bg-accent font-black text-[10px] uppercase tracking-[0.3em] text-white flex items-center gap-3 transition-all cursor-pointer"
            >
              Lancer la Mission <ArrowRight size={16} />
            </motion.button>
          </div>

          {/* Static Hero-Sized Amadou (Grounded to Bottom) */}
          <div className="relative shrink-0 w-48 h-full xl:w-64 flex items-end">
            <div 
              className="relative w-full h-[120%] xl:h-[130%] -mb-8 xl:-mb-10"
            >
               <img 
                 src={AVATARS.AMADOU} 
                 alt="Amadou" 
                 className="w-full h-full object-contain object-bottom"
               />
            </div>
          </div>
        </motion.section>

        {/* Daily Missions */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0">
          <div className="flex items-center justify-between px-4 mb-4">
            <h3 className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] leading-none">Missions du jour</h3>
            <button className="text-[9px] font-black text-accent uppercase tracking-[0.3em] hover:opacity-70 transition-all cursor-pointer">Archive complet</button>
          </div>
          <div className="space-y-4 overflow-y-auto scrollbar-hide pb-4">
            {modules.slice(1, 10).map((mod, i) => (
              <ModuleCard key={mod.id} mod={mod} index={i} onClick={() => setCurrentLesson(mod.id.toString())} />
            ))}
          </div>
        </div>
      </div>

      {/* ══ RIGHT COLUMN: STATUS & TACTICAL DATA ═════════════════════════════ */}
      <div className="flex flex-col gap-6 shrink-0">
        
        {/* Top Row: Streak & Shield */}
        <div className="grid grid-cols-2 gap-4">
           <StreakCard days={streak} />
           <ShieldCard isActive={isShieldActive} onActivate={() => setIsShieldModalOpen(true)} />
        </div>

        {/* Bottom Row: Progress & League */}
        <div className="grid grid-cols-2 gap-4">
           {/* Progress Summary Card */}
           <div className="artifact-glass rounded-[2rem] p-6 flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden group transition-all duration-300">
              <div className="p-4 rounded-[2rem] bg-white/5 border border-white/10 mb-4 group-hover:scale-110 transition-transform duration-500">
                 <ListChecks size={28} className="text-white/40" />
              </div>
              <div className="flex items-center gap-6 z-10 text-center">
                 <div className="flex flex-col items-center">
                    <h4 className="text-2xl font-mono font-black text-white leading-none tracking-tight">{completedCount}</h4>
                    <p className="text-[8px] font-black text-white/30 uppercase tracking-[0.3em] mt-2">COMPLÉ.</p>
                 </div>
                 <div className="w-px h-8 bg-white/10" />
                 <div className="flex flex-col items-center">
                    <h4 className="text-lg font-mono font-black text-white/40 leading-none tracking-tight mt-1">{remainingCount}</h4>
                    <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mt-2">REST.</p>
                 </div>
              </div>
           </div>

           <LeagueCard league="Or" rank={7} total={20} isLocked={isLeagueLocked} />
        </div>

        {/* Level Stats Badge */}
        <div className="artifact-glass rounded-[2rem] p-6 flex flex-col items-center justify-center min-h-[160px] gap-4 relative overflow-hidden">
           <div className="flex flex-col items-center gap-3 w-full">
              <div className="flex items-center gap-5 w-full">
                 <div className="shrink-0 p-1 rounded-full bg-surface border border-white/5 shadow-2xl">
                    <ScoreRing score={Math.round((xpInLevel / xpForNext) * 100)} size={52} strokeWidth={4} id="level-side-stat" />
                 </div>
                 <div className="flex-1 text-left">
                    <div className="flex items-center gap-1.5 mb-1.5">
                       <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                       <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">ÉNERGIE</p>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                       <span className="text-white font-mono font-black text-[22px] leading-none tracking-tight">{xpInLevel}</span>
                       <span className="text-white/30 font-mono text-[10px] uppercase tracking-widest">/ 1000 XP</span>
                    </div>
                 </div>
              </div>
              
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-2">
                 <motion.div 
                   initial={{ width: 0 }}
                   animate={{ width: `${(xpInLevel / xpForNext) * 100}%` }}
                   className="h-full bg-accent"
                 />
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("h-full relative overflow-hidden bg-transparent transition-colors duration-1000", theme === 'violet' ? 'violet-theme' : 'terracotta-theme')}>
      <CosmicBackground />
      <MobileLayout />
      <DesktopLayout />

      {/* Confirmation Modal */}
      <AnimatePresence>
        {isShieldModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShieldModalOpen(false)}
              className="absolute inset-0 bg-bg/90 backdrop-blur-2xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-xs artifact-glass rounded-[3rem] p-10 shadow-2xl border border-white/10 overflow-hidden text-center"
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-[1.5rem] bg-accent/20 border border-accent/20 flex items-center justify-center mb-6 shadow-xl">
                  <ShieldCheck size={32} className="text-accent" />
                </div>
                <h3 className="text-2xl font-serif font-black text-white mb-3 uppercase tracking-tight">Activer?</h3>
                <p className="text-white/40 text-[11px] leading-relaxed mb-8">Protection continue 24h.</p>
                <button onClick={() => setIsShieldModalOpen(false)} className="w-full py-4 rounded-xl bg-accent font-black text-[10px] uppercase tracking-[0.2em] text-white cursor-pointer active:scale-95 transition-all">
                  Confirmer (50 <CoinIcon size={12} />)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
