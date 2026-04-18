import React, { useState } from 'react';
import { 
  Swords, 
  BarChart3, 
  ChevronUp, 
  ChevronDown, 
  Trophy, 
  Award, 
  ChevronRight, 
  Flame, 
  Calendar, 
  Target, 
  Check, 
  X, 
  Lock, 
  ArrowRight,
  TrendingUp,
  Crown,
  Clock, 
  Play,
  Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';
import { LionIcon, EagleIcon, PantherIcon, SnakeIcon } from '../components/common/Icons';

export const LaambScreen = () => {
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
      color: 'highlight'
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
      color: 'white'
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
      color: 'accent'
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
      color: 'white'
    }
  ];

  const monthlyCycle = [
    { id: 'j1-20', period: 'J1-20', title: '4 traders publient (min 2, max 5)', desc: 'Screenshot annoté + raisonnement + R:R + risque %' },
    { id: 'j21-25', period: 'J21-25', title: 'Vérification par les fondateurs', desc: 'Score technique /30 par Mohamed & Sadri' },
    { id: 'j25-28', period: 'J25-28', title: 'Vote communautaire anti-bot', desc: 'In-app · Quiz · Pondéré par niveau' },
    { id: 'results', period: 'Résultats', title: "L'événement", desc: 'NFT Champion · Signaux 30j · Relégation si dernier 2x/4' }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] relative overflow-hidden">
      {/* ── HIGH-LEVEL LOCK OVERLAY ── */}
      <div className="absolute inset-x-0 top-[10%] bottom-0 z-50 flex items-start justify-center p-6 pointer-events-auto">
        <div className="artifact-glass rounded-[2rem] p-8 max-w-sm w-full flex flex-col items-center justify-center text-center gap-4 border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-3xl mt-10">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-highlight/20 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2 shadow-inner">
             <Lock className="text-white/40" size={28} />
          </div>
          
          <div>
             <h2 className="text-xl font-serif font-black text-white leading-none mb-2 uppercase tracking-tighter">Accès Verrouillé</h2>
             <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/30 leading-relaxed max-w-[240px]">
                L'arène WÔY LAAMB est restreinte aux initiés de haut niveau.
             </p>
          </div>
          
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-4">
             <div className="h-full w-1/3 bg-highlight/40 animate-[pulse_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>

      <main className="px-5 flex flex-col w-full max-w-2xl lg:max-w-6xl mx-auto safe-top pb-32 lg:pb-12 blur-md opacity-20 pointer-events-none select-none grayscale-[0.5] transition-all duration-1000">

        {/* Header */}
        <div className="flex flex-col gap-1.5 mb-10">
          <div className="flex items-center gap-2.5">
            <Swords size={22} className="text-highlight" />
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
                  <BarChart3 size={18} className="text-highlight" />
                  <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-white">Classement — Mars 2026</h2>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-medium text-white/30 uppercase tracking-widest">
                  <span>4 traders</span>
                  <span>Perf en cours</span>
                  <span className="text-accent">Mars 2026</span>
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
                            ? "bg-gradient-to-br from-highlight/10 to-transparent border-highlight/30 shadow-lg shadow-highlight/10"
                            : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/20"
                        )}
                      >
                        {/* Inner Content Grid */}
                        <div className="flex items-center justify-between gap-4 mb-5">
                          <div className="flex items-center gap-4">
                            {/* Integrated Avatar & Medal */}
                            <div className="relative shrink-0">
                              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner group-hover:scale-105 transition-transform">
                                <trader.Icon size={28} className={cn("transition-colors", i === 0 ? "text-highlight" : "text-white/40")} />
                              </div>
                              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-black/80 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center shadow-lg">
                                {i === 0 ? <Trophy size={14} className="text-highlight" /> : i === 1 ? <Award size={14} className="text-white/60" /> : i === 2 ? <Award size={14} className="text-accent/80" /> : <span className="text-[10px] font-bold text-white/20">{trader.id}</span>}
                              </div>
                            </div>

                            {/* Identity & Tag */}
                            <div className="flex flex-col min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={cn(
                                  "text-[8px] font-bold uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border",
                                  i === 0 ? "bg-highlight/20 border-highlight/30 text-highlight" : "bg-white/5 border-white/10 text-white/30"
                                )}>
                                  {trader.tag}
                                </span>
                              </div>
                              <h3 className={cn(
                                "text-xl font-bold font-serif uppercase tracking-wider truncate",
                                i === 0 ? "text-highlight" : "text-white/90"
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
                              trader.perf.startsWith('+') ? "text-emerald-500" : "text-accent"
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
                                    ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-500"
                                    : "bg-accent/20 border border-accent/40 text-accent"
                                )}
                              >
                                {res}
                              </div>
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-highlight/60 hover:text-highlight cursor-pointer transition-colors">
                            <span className="text-[9px] font-bold uppercase tracking-widest">Voir Track Record</span>
                            <ChevronRight size={12} />
                          </div>
                        </div>

                        {i === 0 && (
                          <div className="absolute top-0 right-0 w-32 h-32 bg-highlight/5 blur-[40px] rounded-full pointer-events-none" />
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
                <Flame size={18} className="text-accent" />
                <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-white">Setup du mois</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-emerald-500/20 text-emerald-500 px-3 py-1 rounded-lg text-[10px] font-bold">+38.7%</div>
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
                      <span className="text-highlight">36h</span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                      {[
                        { label: 'Entrée', val: '88$', color: 'text-white/40' },
                        { label: 'Stop Loss', val: '82$', color: 'text-accent' },
                        { label: 'Take Profit', val: '131$', color: 'text-emerald-500' },
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
                      <div className="absolute right-4 top-4 bg-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold text-emerald-500">+38.7%</div>

                      {/* Chart lines simulation */}
                      <div className="absolute inset-x-0 top-[25%] h-px bg-emerald-500/40 border-t border-dashed border-emerald-500/60 flex justify-end px-4"><span className="text-[8px] font-bold text-emerald-500 -mt-2 bg-[#0D0A07] px-1">TP 131$</span></div>
                      <div className="absolute inset-x-0 top-[60%] h-px bg-highlight/40 border-t border-dashed border-highlight/60 flex justify-end px-4"><span className="text-[8px] font-bold text-highlight -mt-2 bg-[#0D0A07] px-1">Entrée 88$</span></div>
                      <div className="absolute inset-x-0 bottom-[20%] h-px bg-accent/40 border-t border-dashed border-accent/60 flex justify-end px-4"><span className="text-[8px] font-bold text-accent -mt-2 bg-[#0D0A07] px-1">SL 82$</span></div>

                      {/* Simulated Candle Stems (Visual simulation) */}
                      <div className="absolute inset-0 flex items-end justify-center gap-2 pb-8 px-8">
                        {[15, 25, 20, 35, 45, 60, 55, 75, 85].map((h, i) => (
                          <div key={i} className="flex flex-col items-center gap-0.5 w-full max-w-[12px]">
                            <div className="w-px h-4 bg-white/20" />
                            <div
                              className={cn("w-full rounded-sm", i > 6 ? "bg-green-500" : (i % 3 === 0 ? "bg-accent" : "bg-white/40"))}
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
                  <TrendingUp size={18} className="text-emerald-500" />
                  <h2 className="text-sm font-bold uppercase tracking-[0.1em] text-white">Track record — Lion</h2>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white/30">
                  <span>7 mois</span>
                  <span>72% win rate</span>
                  <span className="text-emerald-500">Champion 3x</span>
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
                        { month: 'Déc', perf: '+41.2%', rank: '1er', icon: Trophy, iconColor: 'text-highlight', color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' },
                        { month: 'Jan', perf: '-8.4%', rank: '4ème', icon: null, iconColor: '', color: 'bg-accent/5 border-accent/20 text-accent' },
                        { month: 'Fév', perf: '+27.6%', rank: '1er', icon: Trophy, iconColor: 'text-highlight', color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' },
                        { month: 'Mar', perf: '+38.7%', rank: '1er', icon: Trophy, iconColor: 'text-highlight', color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' }
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
                          idx === 0 ? "bg-accent/10 border-accent/30 text-accent" : "bg-white/5 border-white/10 text-white/30 group-hover:border-white/20"
                        )}>
                          {idx === 3 ? <Crown size={16} className="text-highlight" /> : <span className="text-[10px] font-bold">{phase.period}</span>}
                        </div>

                        <div className="flex flex-col gap-1 py-1">
                          <h4 className="text-[11px] font-bold text-white group-hover:text-highlight transition-colors">
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
                    <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5 flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-emerald-500">
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
                            <Check size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                            <span className="text-[11px] font-medium text-white/80">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-accent/5 border border-accent/20 rounded-2xl p-5 flex flex-col gap-4 opacity-60">
                      <div className="flex items-center gap-2 text-accent">
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
                            <X size={12} className="text-accent mt-0.5 shrink-0" />
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
            <div className="absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-10 bg-accent -mr-16 -mt-16 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center gap-6">
              <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center border border-accent/30">
                <Swords size={32} className="text-accent" />
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
                  className="w-full bg-accent text-white font-bold py-5 rounded-2xl text-[13px] uppercase tracking-[0.2em] shadow-[0_0_25px_rgba(var(--woy-accent-rgb),0.4)] flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.01] transition-transform"
                >
                  S'abonner — 20 000 FCFA/MOIS
                </motion.button>
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                  <Lock size={10} className="text-accent" /> N3 — Lire le Marché requis
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
