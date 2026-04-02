import React, { useState } from 'react';
import { 
  Coins, 
  Flame, 
  Swords, 
  Lock, 
  Play, 
  Clock, 
  ChevronRight, 
  CircleCheck, 
  BookOpen, 
  Trophy 
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';
import { useAppContext } from '../context/AppContext';
import { ScoreRing, ProgressBar } from '../components/common/Progress';
import { NiveauCard } from '../components/common/Cards';

export const CoursScreen = () => {
  const { 
    globalCoins, 
    setCurrentLesson, 
    niveaux 
  } = useAppContext();
  
  const [expandedNiveau, setExpandedNiveau] = useState<string | null>('N1');

  const CoursMobileScreen = () => (
    <div className="lg:hidden flex flex-col min-h-screen pb-32">
      {/* Profile Header */}
      <header className="px-5 pb-5 safe-top">
        <div className="flex items-center gap-4">
          <ScoreRing score={78} size={70} strokeWidth={5} id="cours-mobile" />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold font-serif tracking-wide text-left">Amadou</h1>
            <p className="text-[11px] text-white/50 mt-0.5 text-left">
              <span className="font-bold text-white/70">NIVEAU 1 — SÉCURITÉ</span>
              <span className="text-highlight"> · En cours</span>
            </p>
            <div className="flex items-center gap-3 mt-1.5 text-[10px] text-white/40">
              <span className="flex items-center gap-1"><Coins size={10} className="text-highlight" /> {globalCoins} Cauris</span>
              <span className="flex items-center gap-1"><Flame size={10} className="text-orange-500" /> 7j streak</span>
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
        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/10 blur-[40px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Play size={12} className="text-highlight" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Continuer ta formation</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex-1 text-left">
              <p className="text-[10px] text-white/30 font-mono">N1.3 · Sécurité</p>
              <h3 className="font-bold text-sm mt-0.5 text-white">Sécuriser son wallet en 10 min</h3>
              <p className="text-[10px] text-white/40 mt-1 flex items-center gap-1.5">
                <Clock size={9} /> 9 min · Quiz + Mission · <span className="text-highlight font-bold">+150 XP</span>
              </p>
            </div>
            <button
              onClick={() => setCurrentLesson('1.3')}
              className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 cursor-pointer hover:bg-white/10 transition-colors"
            >
              <ChevronRight size={16} className="text-highlight" />
            </button>
          </div>
          <div className="mt-3">
            <ProgressBar progress={68} colorClass="bg-accent" />
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
            <span className="text-xl font-bold leading-none text-white">{s.value}</span>
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
                    n.status === 'en cours' ? "bg-accent/20 border-highlight/50 text-highlight animate-pulse" :
                      "bg-white/5 border-white/10 text-white/30"
                )}>
                  {n.label}
                </div>
                {n.status === 'complété' && <CircleCheck size={12} className="text-green-400" />}
                {n.status === 'en cours' && <span className="text-[9px] text-highlight font-bold">{n.progress}%</span>}
                {n.status === 'verrouillé' && <n.Icon size={12} className="text-white/25" />}
              </div>
              {i < niveaux.length - 1 && (
                <div className={cn(
                  "flex-1 h-0.5 mx-1",
                  niveaux[i].status === 'complété' && niveaux[i + 1].status !== 'verrouillé' ? "bg-emerald-500/30" :
                    niveaux[i].status !== 'verrouillé' ? "bg-highlight/30" : "bg-white/5"
                )} />
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.section>

      {/* Mes Niveaux */}
      <section className="mx-5 pb-4">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4 text-left">Mes Niveaux</h4>
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

  const CoursDesktopScreen = () => (
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
              <div className="text-left">
                <h2 className="text-2xl font-bold font-serif text-white">Amadou</h2>
                <p className="text-[11px] text-white/50 mt-1">
                  <span className="font-bold text-white/70">NIVEAU 1 — SÉCURITÉ</span>
                  <span className="text-highlight"> · En cours</span>
                </p>
                <div className="flex items-center gap-3 mt-2 text-[10px] text-white/40">
                  <span className="flex items-center gap-1"><Coins size={10} className="text-highlight" /> {globalCoins}</span>
                  <span className="flex items-center gap-1"><Flame size={10} className="text-orange-500" /> 7j</span>
                  <span className="flex items-center gap-1"><Swords size={10} /> LAAMB <Lock size={8} /></span>
                </div>
              </div>
            </div>

            <div
              onClick={() => setCurrentLesson('1.3')}
              className="w-full text-left bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:bg-white/[0.06] hover:border-highlight/30 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2 mb-2">
                <Play size={12} className="text-highlight group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Continuer ta formation</span>
              </div>
              <p className="text-[10px] text-white/30 font-mono">N1.3 · Sécurité</p>
              <h3 className="font-bold text-sm mt-0.5 text-white">Sécuriser son wallet en 10 min</h3>
              <div className="mt-3">
                <ProgressBar progress={68} colorClass="bg-accent" />
              </div>
              <p className="text-[10px] text-white/40 mt-2 flex items-center gap-1.5">
                <Clock size={9} /> 9 min · Quiz + Mission · <span className="text-highlight font-bold">+150 XP</span>
              </p>
            </div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: '12', label: 'Modules faits', icon: BookOpen, color: 'bg-highlight/15' },
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
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 flex flex-col gap-2 text-left"
              >
                <div className={cn("p-2 rounded-lg w-fit", s.color)}>
                  <s.icon size={16} className="text-white" />
                </div>
                <p className="text-xl font-bold text-white">{s.value}</p>
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
            className="glow-card bg-white/[0.02] border border-white/10 rounded-3xl p-6 text-left"
          >
            <h3 className="font-serif font-bold tracking-wider text-sm uppercase mb-6 text-white">Parcours WÔY</h3>
            <div className="flex items-center justify-between px-4">
              {niveaux.map((n, i) => (
                <React.Fragment key={n.id}>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all cursor-pointer hover:scale-105",
                      n.status === 'complété' ? "bg-green-500/20 border-green-500/50 text-green-400" :
                        n.status === 'en cours' ? "bg-accent/20 border-highlight/50 text-highlight animate-pulse" :
                          "bg-white/5 border-white/10 text-white/30"
                    )}>
                      {n.label}
                    </div>
                    {n.status === 'complété' && <CircleCheck size={14} className="text-green-400" />}
                    {n.status === 'en cours' && <span className="text-[10px] text-highlight font-bold">{n.progress}%</span>}
                    {n.status === 'verrouillé' && <n.Icon size={14} className="text-white/25" />}
                  </div>
                  {i < niveaux.length - 1 && (
                    <div className={cn(
                      "flex-1 h-0.5 mx-2",
                      niveaux[i].status === 'complété' && niveaux[i + 1].status !== 'verrouillé' ? "bg-emerald-500/30" :
                        niveaux[i].status !== 'verrouillé' ? "bg-highlight/30" : "bg-white/5"
                    )} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </motion.div>

          {/* Niveaux List */}
          <section className="text-left">
            <div className="flex justify-between items-end mb-6">
              <h4 className="font-serif text-xl font-bold tracking-wider text-white">MES NIVEAUX</h4>
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

  return (
    <>
      <CoursMobileScreen />
      <CoursDesktopScreen />
    </>
  );
};
