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
  Lock, 
  CheckCircle2, 
  Trophy,
  User,
  Calendar,
  ShieldCheck,
  Hourglass,
  Ban
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';
import { useAppContext } from '../context/AppContext';
import { Logo } from '../components/common/Logo';
import { ScoreRing, XPBar } from '../components/common/Progress';
import { StatCard, ModuleCard } from '../components/common/Cards';
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

  const userAvatar = "A"; // Default avatar initial

  // Theme-aware helper classes using semantic variables
  const colors = {
    bg: 'bg-black',
    textAccent: 'text-accent',
    textHighlight: 'text-highlight',
  };

  const MobileLayout = () => (
    <div className="lg:hidden flex flex-col min-h-screen pb-32">
      {/* Header */}
      <header className="px-5 pb-4 flex justify-between items-center safe-top">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10" />
          <div className="flex flex-col">
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold leading-none mb-1 text-left">Bon retour parmi nous</p>
            <h1 className="text-xl font-bold tracking-tight leading-none text-left">Amadou</h1>
          </div>
        </div>
        <div className="flex items-center gap-2.5">
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1.5 bg-white/[0.06] border border-white/10 rounded-full px-3.5 py-1.5 hover:scale-[1.02] hover:border-highlight/30 active:scale-[0.97] transition-all duration-200"
          >
            <Coins size={14} className={colors.textHighlight} />
            <span className="font-mono text-sm font-bold">{globalCoins}</span>
          </motion.div>
          <button
            onClick={() => setTheme(theme === 'violet' ? 'terracotta' : 'violet')}
            className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:scale-105 hover:border-highlight/30 transition-all duration-200 cursor-pointer"
          >
            {theme === 'violet' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30 relative">
              <User size={20} className={colors.textAccent} />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-accent rounded-full border-2 border-black" />
            </div>
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
            <p className="text-[9px] uppercase tracking-[0.15em] text-white/40 font-bold text-left">Niveau 1 — Sécurité</p>
            <h2 className="text-lg font-bold mt-0.5 leading-tight text-left">WÔY Score</h2>
            <div className="mt-2 text-left">
              <XPBar current={userXP} total={600} />
            </div>
          </div>
        </div>

        {/* Ligue */}
        <div className="w-[90px] bg-white/[0.03] border border-white/[0.08] rounded-2xl p-3 flex flex-col items-center justify-center text-center gap-1">
          <Award size={24} className="text-yellow-500" />
          <p className="text-[9px] uppercase tracking-[0.12em] text-highlight font-bold leading-tight">Ligue Or</p>
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
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 blur-[60px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className={colors.textHighlight} />
              <h3 className="font-semibold text-sm text-left">Module du jour</h3>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono text-white/40">
              <span className="flex items-center gap-1"><Clock size={10} /> 9min</span>
              <span className="text-highlight font-bold">+150XP</span>
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5 mb-4 text-left">
            <p className="text-[13px] text-white/60 leading-relaxed">
              <span className="font-bold text-white/80">Dans ce module :</span> sécuriser ton wallet en 10 minutes — le protocole 4 étapes WÔY.
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentLesson('1.3')}
            className="w-full py-3.5 rounded-xl bg-accent font-bold text-sm text-white flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(var(--woy-accent-rgb),0.3)] cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
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
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 flex flex-col items-center gap-1.5 hover:scale-[1.02] hover:border-highlight/20 transition-all duration-200">
          <div className="flex items-center gap-1.5 flex-1">
            <Flame size={18} className="text-orange-400" />
            <span className="text-xl font-bold leading-none">{streak}</span>
          </div>
          <span className="text-[8px] uppercase tracking-widest text-white/30 font-bold">Streak</span>
        </div>

        {/* Modules */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 flex flex-col items-center gap-1.5 hover:scale-[1.02] hover:border-highlight/20 transition-all duration-200">
          <Calendar size={18} className="text-highlight/60" />
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Plan</span>
        </div>

        {/* Bouclier */}
        <div
          onClick={handleActivateShield}
          className={cn(
            "rounded-xl p-3 flex flex-col items-center gap-1.5 transition-all duration-200",
            isShieldActive
              ? "bg-accent/10 border border-accent/40 shadow-[0_0_15px_rgba(var(--woy-accent-rgb),0.15)]"
              : "bg-white/[0.03] border border-white/[0.08] cursor-pointer hover:scale-[1.02] hover:border-highlight/20 shrink-0"
          )}
        >
          <Shield size={18} className={isShieldActive ? "text-accent fill-accent/20" : colors.textAccent} />
          <div className="text-center">
            <p className="text-[11px] font-bold text-accent">Bouclier</p>
            {isShieldActive ? (
              <p className="text-[10px] text-accent/80 font-bold uppercase tracking-widest mt-0.5">Actif</p>
            ) : (
              <p className="text-[10px] text-white/40 font-mono flex items-center gap-0.5 justify-center mt-0.5">
                50 <Coins size={8} className={colors.textHighlight} />
              </p>
            )}
          </div>
        </div>

        {/* LAAMB */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-3 flex flex-col items-center gap-1.5 opacity-50">
          <Swords size={18} className="text-white/40" />
          <span className="text-[10px] font-bold text-white/40 tracking-tight text-center">LAAMB</span>
          <Lock size={10} className="text-white/20" />
        </div>
      </motion.section>

      {/* Modules List */}
      <section className="mx-5 pb-4">
        <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4 text-left">Tes Modules N1</h4>
        <div className="flex flex-col gap-3 text-left">
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
              <div className="w-24 h-24 rounded-full border-4 border-white/5 p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-3xl font-bold font-serif text-white">
                  {userAvatar}
                </div>
              </div>
              <div className="absolute bottom-0 right-0 bg-emerald-600 p-1.5 rounded-full border-4 border-black text-white">
                <ShieldCheck size={16} />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Amadou</h2>
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
            <div className="w-full text-left">
              <XPBar current={userXP} total={600} />
            </div>
          </motion.div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard icon={Flame} label="Streak" value={`${streak} Jours`} subValue="Série en cours" color="bg-orange-500/20" />
            <StatCard icon={Trophy} label="Ligue" value="Or" subValue="Rang 7/20" color="bg-yellow-500/20" />
          </div>
        </div>

        {/* Middle Column: Main Content */}
        <div className="col-span-6 flex flex-col gap-8">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left"
          >
            <p className="text-white/50 text-sm">Bon retour parmi nous</p>
            <h1 className="text-4xl font-bold font-serif tracking-wide text-white">
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
            <div className="absolute top-0 right-0 w-64 h-64 blur-[80px] opacity-20 -mr-20 -mt-20 bg-accent" />

            <div className="relative z-10 flex flex-col gap-6 text-left">
              <div className="flex justify-between items-center">
                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest uppercase text-white/60">
                  <BookOpen size={14} className="inline mr-1.5" /> Module du jour
                </span>
                <div className="flex items-center gap-4 text-[10px] font-mono text-white/40">
                  <span className="flex items-center gap-1"><Clock size={10} /> 9 MIN</span>
                  <span className="text-highlight font-bold">+150 XP</span>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-serif font-bold leading-tight text-white">
                  C'est quoi l'argent <br /> vraiment ?
                </h3>
                <p className="text-white/50 mt-4 text-sm leading-relaxed max-w-md">
                  Plonge dans l'histoire d'Amadou et découvre les secrets de la valeur, de l'inflation et de la confiance.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentLesson('N0.1')}
                className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(var(--woy-accent-rgb),0.4)] bg-accent hover:brightness-110 transition-all cursor-pointer text-white"
              >
                Commencer le Module N0.1 <ChevronRight size={18} />
              </motion.button>
            </div>
          </motion.section>

          {/* Curriculum List */}
          <section className="text-left">
            <div className="flex justify-between items-end mb-6">
              <h4 className="font-serif text-xl font-bold tracking-wider text-white uppercase">Vos Modules N1</h4>
              <span className="text-[10px] text-white/30 font-bold tracking-widest uppercase">3/6 Complétés</span>
            </div>
            <div className="flex flex-col gap-3">
              {modules.map((mod, i) => (
                <ModuleCard
                  key={mod.id}
                  mod={mod}
                  index={i}
                  onClick={() => mod.id === '1.3' ? setCurrentLesson('1.3') : undefined}
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
            className="glow-card p-6 rounded-3xl bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 text-left"
          >
            <div className="flex items-center gap-3 mb-6">
              <Swords size={20} className={colors.textHighlight} />
              <h4 className="font-serif font-bold tracking-widest text-sm uppercase text-white">WÔY LAAMB</h4>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                <p className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Champion du mois</p>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-[11px] font-bold tracking-widest uppercase">
                  <CheckCircle2 size={12} /> BUY — BTC · SOL
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-highlight/40 bg-highlight/10 text-highlight text-[11px] font-bold tracking-widest uppercase">
                  <Hourglass size={12} /> HOLD — ONDO
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent/40 bg-accent/10 text-accent text-[11px] font-bold tracking-widest uppercase">
                  <Ban size={12} /> WAIT — ETH
                </div>
              </div>

              <button className="w-full py-3 rounded-xl border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-white/70 cursor-pointer">
                Rejoindre l'arène <Lock size={12} />
              </button>
            </div>
          </motion.div>

          {/* Social Feed Mini */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glow-card p-6 rounded-3xl bg-white/[0.02] border border-white/10 text-left"
          >
            <h4 className="font-serif font-bold tracking-widest text-sm uppercase mb-4 text-white">COMMUNAUTÉ</h4>
            <div className="space-y-4">
              {[
                { name: 'Fatou_92', action: 'Vient de débloquer le badge "Sécurisé" !' },
                { name: 'Ibra.eth', action: 'A terminé le Module N1.2 avec 95% !' },
                { name: 'Awa_DK', action: 'A rejoint la Ligue Or' },
              ].map((u, i) => (
                <div key={i} className="flex gap-3 items-start opacity-60 hover:opacity-100 transition-opacity cursor-pointer text-white">
                  <div className={cn("w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold border border-white/10 bg-gradient-to-br from-white/20 to-white/5", colors.textHighlight)}>
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
                ? "bg-accent/10 border border-accent/40 shadow-[0_0_20px_rgba(var(--woy-accent-rgb),0.15)]"
                : "bg-white/[0.02] border border-white/10 cursor-pointer hover:bg-white/[0.04] hover:border-highlight/20"
            )}
          >
            <div className="flex items-center gap-4 text-left">
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                isShieldActive ? "bg-accent/20" : "bg-accent/10"
              )}>
                <Shield size={22} className={isShieldActive ? "text-accent fill-accent/20" : "text-accent"} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-0.5">Bouclier</p>
                <div className={cn(
                  "text-xl font-bold flex items-center gap-1.5",
                  isShieldActive ? "text-accent" : "text-white"
                )}>
                  {isShieldActive ? 'ACTIF' : <><span className="text-white">50</span> <Coins size={14} className="text-highlight" /></>}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );

  return (
    <>
      <MobileLayout />
      <DesktopLayout />
    </>
  );
};
