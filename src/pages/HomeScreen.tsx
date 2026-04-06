import React from 'react';
import {
  Coins,
  Sun,
  Moon,
  Bell,
  Award,
  BookOpen,
  Clock,
  ChevronRight,
  Flame,
  Shield,
  Swords,
  Lock as LockIcon,
  CheckCircle2,
  Trophy,
  User,
  Calendar,
  ShieldCheck,
  Hourglass,
  Ban,
  Zap,
  Target,
  ArrowUpRight,
  Star,
  Coins as CoinIcon,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';
import { useAppContext } from '../context/AppContext';
import { Logo } from '../components/common/Logo';
import { ScoreRing, XPBar } from '../components/common/Progress';
import { StatCard, ModuleCard } from '../components/common/Cards';
import { StreakCard } from '../components/common/StreakCard';
import { LeagueCard } from '../components/common/LeagueCard';
import { ShieldCard } from '../components/common/ShieldCard';
import { modules } from '../data/modules';

export const HomeScreen = () => {
  const {
    theme,
    setTheme,
    globalCoins,
    userXP,
    streak,
    isShieldActive,
    handleActivateShield,
    setCurrentLesson
  } = useAppContext();
  const [isShieldModalOpen, setIsShieldModalOpen] = React.useState(false);

  const level = Math.floor(userXP / 1000) + 1;
  const xpInLevel = userXP % 1000;
  const xpForNext = 1000;

  const isLeagueLocked = level < 3;

  // --- Mobile ---
  const MobileLayout = () => (
    <div className="lg:hidden flex flex-col min-h-screen pb-24">
      <header className="px-5 pb-4 flex justify-between items-center safe-top">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10" />
          <div className="flex flex-col">
            <p className="text-white/30 text-[10px] uppercase tracking-widest font-medium leading-none mb-1 text-left">Bon retour</p>
            <h1 className="text-xl font-bold tracking-tight leading-none text-left text-white/90">Amadou</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-surface border border-white/[0.06] rounded-xl px-3 py-1.5">
            <Coins size={13} className="text-highlight/70" />
            <span className="font-mono text-sm font-bold text-white/70">{globalCoins}</span>
          </div>
          <button
            onClick={() => setTheme(theme === 'violet' ? 'terracotta' : 'violet')}
            className="w-9 h-9 rounded-xl bg-surface border border-white/[0.06] flex items-center justify-center text-white/30 cursor-pointer"
          >
            {theme === 'violet' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </div>
      </header>

      {/* Score + Streak */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-5 mb-5 flex gap-3"
      >
        <div className="flex-1 bg-surface border border-white/[0.06] rounded-2xl p-4 flex items-center gap-4">
          <ScoreRing score={78} size={80} strokeWidth={6} id="mobile" />
          <div className="flex-1 min-w-0">
            <p className="text-[9px] uppercase tracking-[0.15em] text-white/30 font-bold text-left">Niveau {level}</p>
            <h2 className="text-lg font-bold mt-0.5 leading-tight text-left text-white/80">WÔY Score</h2>
            <div className="mt-2 text-left">
              <XPBar current={xpInLevel} total={xpForNext} />
            </div>
          </div>
        </div>
        <StreakCard
          days={streak}
          className="w-[100px] min-h-0 py-4 px-2 rounded-2xl"
        />
      </motion.section>

      {/* Hero Module */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-5 mb-5 bg-surface border border-white/[0.06] rounded-2xl p-5 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 blur-[60px] rounded-full pointer-events-none" />

        {/* Mascot Integration (Mobile Focus) */}
        <div className="absolute -bottom-2 -right-4 h-[95%] z-5 pointer-events-none opacity-40">
          <img
            src="https://res.cloudinary.com/drxouwbms/image/upload/v1775502690/Untitled_design_2_by7ms9.png"
            alt="Amadou Mascot"
            className="h-full w-auto object-contain"
          />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <BookOpen size={15} className="text-highlight/60" />
              <h3 className="font-semibold text-sm text-left text-white/80">Module du jour</h3>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono text-white/30">
              <span className="flex items-center gap-1"><Clock size={10} /> 9min</span>
              <span className="text-accent/80 font-bold">+150XP</span>
            </div>
          </div>
          <div className="bg-white/[0.03] border border-white/[0.04] rounded-xl p-3.5 mb-4 text-left">
            <p className="text-[13px] text-white/50 leading-relaxed">
              <span className="font-bold text-white/70">Dans ce module :</span> sécuriser ton wallet en 10 minutes — le protocole 4 étapes WÔY.
            </p>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentLesson('1.3')}
            className="w-full py-3.5 rounded-xl bg-accent/90 font-bold text-sm text-white flex items-center justify-center gap-2 cursor-pointer hover:bg-accent transition-colors"
          >
            Continuer N1.3 <ChevronRight size={16} />
          </motion.button>
        </div>
      </motion.section>

      {/* Quick Stats */}
      {/* Quick Stats */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-5 mb-6 grid grid-cols-3 gap-2.5"
      >
        <ShieldCard
          isActive={isShieldActive}
          onActivate={() => setIsShieldModalOpen(true)}
          className="min-h-0 py-3 rounded-xl aspect-square"
        />
        <LeagueCard
          league="Or"
          rank={7}
          total={20}
          isLocked={isLeagueLocked}
          className="min-h-0 py-3 rounded-xl aspect-square"
        />
        <div className="bg-surface border border-white/[0.04] rounded-xl p-3 flex flex-col items-center justify-center gap-1.5 opacity-40 grayscale group">
          <LockIcon size={14} className="text-white/20 mb-1" />
          <span className="text-[8px] uppercase tracking-widest text-white/20 font-bold">WÔY LAAMB</span>
        </div>
      </motion.section>
    </div>
  );

  // --- Desktop ---
  const DesktopLayout = () => (
    <div className="hidden lg:block h-[calc(100vh-120px)] overflow-hidden max-w-full">
      <div className="h-full px-8 py-4 grid grid-cols-12 grid-rows-[3fr_2fr] gap-6">

        {/* Row 1, Col 1-8: Supreme Hero Module */}
        <div className="col-span-8 h-full min-h-0">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-[2.5rem] glass-boutique shadow-2xl p-7 xl:p-8 h-full flex flex-col justify-center"
          >
            {/* Dynamic Background Aesthetics */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent z-1" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] blur-[140px] opacity-25 -mr-32 -mt-32 bg-accent/40 pointer-events-none transition-transform duration-1000" />
            <div className="absolute bottom-0 left-0 w-96 h-96 blur-[120px] opacity-15 -ml-16 -mb-16 bg-highlight/30 pointer-events-none" />

            {/* Floating Crypto Orb (Particles) */}
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-20 z-2 bg-gradient-to-br from-highlight/20 to-accent/20 w-48 h-48 rounded-full blur-3xl opacity-40 pointer-events-none"
            />

            {/* Mascot Integration (Amadou Focus) */}
            <div className="absolute bottom-0 right-0 h-full z-5 pointer-events-none origin-bottom opacity-80">
              <div className="absolute inset-0 bg-accent/15 blur-[100px] rounded-full scale-75 opacity-60" />
              <img
                src="https://res.cloudinary.com/drxouwbms/image/upload/v1775503074/Untitled_design_2_-Picsart-AiImageEnhancer_mmzkbv.png"
                alt="Amadou Mascot"
                className="h-full w-auto object-contain drop-shadow-[0_10px_30px_rgba(var(--woy-accent-rgb),0.2)]"
              />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col gap-4 text-left max-w-2xl">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1.5 rounded-full bg-accent/20 border border-accent/20 text-[9px] font-black tracking-[0.3em] uppercase text-accent shadow-[0_0_15px_rgba(var(--woy-accent-rgb),0.1)]">
                  Module Actuel
                </span>
                <span className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-[9px] font-mono text-white/40 font-bold backdrop-blur-md">
                  NIVEAU 1 — M1.3
                </span>
              </div>

              <div>
                <h3 className="text-3xl xl:text-4xl font-serif font-bold leading-[1.2] text-white tracking-tighter drop-shadow-2xl">
                  Sécuriser ton <br />
                  <span className="crypto-gradient">patrimoine numérique</span>
                </h3>
                <p className="text-white/40 mt-3 text-sm xl:text-base leading-relaxed font-medium max-w-lg">
                  Le protocole ultime WÔY pour immuniser tes actifs des menaces <br />
                  extérieures. Devient le gardien de ta propre banque decentralized.
                </p>
              </div>

              <div className="flex items-center gap-6 mt-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setCurrentLesson('1.3')}
                  className="py-3 px-8 rounded-2xl font-black flex items-center gap-3 bg-accent hover:bg-accent-light transition-all shadow-lg cursor-pointer text-white text-[11px] uppercase tracking-widest"
                >
                  Démarrer maintenant <ChevronRight size={18} />
                </motion.button>
                <div className="flex flex-col">
                  <span className="text-white/20 text-[9px] font-black uppercase tracking-[0.2em] mb-0.5">Butin Estimé</span>
                  <div className="flex items-center gap-2">
                    <Star size={12} className="text-highlight fill-highlight drop-shadow-[0_0_8px_rgba(var(--woy-highlight-rgb),0.4)]" />
                    <span className="text-highlight font-black text-sm">+150 XP</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Row 1, Col 9-12: Supreme Score Card (Minimalist) */}
        <div className="col-span-4 h-full min-h-0">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-boutique rounded-[2.5rem] p-7 xl:p-8 flex flex-col items-center justify-between h-full relative group overflow-hidden"
          >
            {/* Advanced Glows */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[70px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-highlight/5 blur-[70px] rounded-full pointer-events-none" />

            <div className="flex items-center justify-between w-full relative z-10">
              <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[9px] font-black tracking-[0.3em] text-white/20 uppercase shadow-inner">
                STATISTIQUES WÔY
              </div>
            </div>

            <div className="relative flex-1 flex flex-col items-center justify-center transition-transform duration-1000">
              {/* Score Outer Aura */}
              <div className="absolute inset-0 bg-accent/5 blur-[40px] rounded-full animate-pulse" />
              <ScoreRing score={78} size={150} strokeWidth={9} id="supreme-desktop" />
            </div>

            <div className="w-full space-y-5 relative z-10">
              <div className="flex justify-between items-end px-1">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black tracking-[0.2em] text-white/20 uppercase mb-0.5 leading-none">MAÎTRISE NIV. {level}</span>
                  <span className="text-2xl font-serif font-bold text-white tracking-tight leading-none group-hover:text-accent transition-all duration-500">Initié WÔY</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[11px] font-mono font-bold text-accent drop-shadow-[0_0_10px_rgba(var(--woy-accent-rgb),0.3)]">{xpInLevel} <span className="text-white/20">/</span> {xpForNext}</span>
                  <span className="text-[8px] font-black text-white/10 uppercase tracking-widest mt-1">Énergie XP</span>
                </div>
              </div>
              <div className="relative">
                <XPBar current={xpInLevel} total={xpForNext} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Row 2, Col 1-8: Supreme Widgets Row */}
        <div className="col-span-8 h-full min-h-0">
          <div className="grid grid-cols-3 gap-6 h-full">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="h-full">
              <StreakCard days={streak} className="h-full min-h-0" />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="h-full">
              <LeagueCard
                league="Or"
                rank={7}
                total={20}
                isLocked={isLeagueLocked}
                className="h-full min-h-0"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="h-full">
              <ShieldCard isActive={isShieldActive} onActivate={() => setIsShieldModalOpen(true)} className="h-full min-h-0" />
            </motion.div>
          </div>
        </div>

        {/* Row 2, Col 9-12: Supreme LAAMB Section (Holo-Hub) */}
        <div className="col-span-4 h-full min-h-0">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group relative glass-boutique border-accent/20 rounded-[2.5rem] p-10 overflow-hidden h-full flex flex-col"
          >
            {/* Scanlines Effect */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none opacity-20" />

            {/* Standardized Unified Background (Matches Hero Module) */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent z-1" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/15 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-highlight/10 blur-[80px] rounded-full pointer-events-none" />

            <div className="absolute top-8 right-10 opacity-60">
              <LockIcon size={18} className="text-highlight animate-pulse" />
            </div>

            <div className="flex items-center gap-5 mb-8 relative z-10">
              <div className="relative">
                <div className="w-14 h-14 rounded-[1.4rem] bg-accent/20 border border-accent/30 flex items-center justify-center shadow-[inset_0_0_20px_rgba(var(--woy-accent-rgb),0.2)]">
                  <Swords size={26} className="text-accent drop-shadow-[0_0_8px_rgba(var(--woy-accent-rgb),0.5)]" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-highlight rounded-full border-4 border-bg flex items-center justify-center animate-bounce shadow-lg shadow-highlight/20" />
              </div>
              <div className="flex flex-col text-left">
                <h4 className="text-[12px] font-black tracking-[0.4em] uppercase text-accent/80 leading-none">WÔY LAAMB</h4>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/40 animate-pulse" />
                  <span className="text-[11px] font-bold text-white/30 uppercase tracking-[0.1em] leading-none">Arène de Marché v1.2</span>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-4 opacity-10 grayscale pointer-events-none relative z-10">
              {[1, 2].map((i) => (
                <div key={i} className="h-12 w-full bg-white/[0.02] border border-white/5 rounded-2xl flex items-center px-5 justify-between shadow-inner">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center"><Coins size={12} className="text-white/10" /></div>
                    <div className="w-24 h-2 bg-white/5 rounded-full" />
                  </div>
                  <div className="w-14 h-2 bg-accent/10 rounded-full" />
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/[0.05] flex justify-center relative z-10">
              <div className="px-6 py-2.5 rounded-full bg-highlight/10 border border-highlight/20 shadow-[0_0_20px_rgba(var(--woy-highlight-rgb),0.1)] group-hover:scale-105 transition-transform duration-500">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-highlight shimmer-gold">Expansion Bientôt Disponible</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <MobileLayout />
      <DesktopLayout />

      {/* Confirmation Modal: Shield Activation */}
      <AnimatePresence>
        {isShieldModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsShieldModalOpen(false)}
              className="absolute inset-0 bg-bg/80 backdrop-blur-xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-sm glass-boutique rounded-[2.5rem] p-10 shadow-2xl border border-white/10 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[60px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-highlight/10 blur-[60px] rounded-full pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-[1.8rem] bg-accent/20 border border-accent/20 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(var(--woy-accent-rgb),0.2)]">
                  <ShieldCheck size={32} className="text-accent" />
                </div>

                <h3 className="text-2xl font-serif font-bold text-white mb-2 tracking-tight">Activer le Bouclier ?</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                  Ton bouclier protège ta série d'une rupture pendant 24h. L'activation consomme des coins.
                </p>

                <div className="w-full space-y-3">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      handleActivateShield();
                      setIsShieldModalOpen(false);
                    }}
                    className="w-full py-4 rounded-2xl bg-accent font-black text-[11px] uppercase tracking-[0.2em] text-white shadow-lg shadow-accent/20 cursor-pointer flex items-center justify-center gap-3"
                  >
                    Confirmer (50 <CoinIcon size={14} className="text-highlight" />)
                  </motion.button>
                  <button
                    onClick={() => setIsShieldModalOpen(false)}
                    className="w-full py-4 rounded-2xl bg-white/[0.03] border border-white/5 font-bold text-[11px] uppercase tracking-[0.2em] text-white/30 cursor-pointer hover:bg-white/[0.06] transition-all"
                  >
                    Plus tard
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
