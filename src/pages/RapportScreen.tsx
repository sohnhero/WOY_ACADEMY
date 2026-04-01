import React from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  Hourglass, 
  Ban, 
  Flame, 
  Globe, 
  Lock, 
  Crown, 
  Zap, 
  TrendingUp, 
  Swords 
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

export const RapportScreen = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)] bg-transparent">
      <main className="px-5 flex flex-col w-full max-w-2xl lg:max-w-6xl mx-auto safe-top pb-32 lg:pb-12">
        {/* Header Section */}
        <div className="flex flex-col gap-1.5 mb-10">
          <div className="flex items-center gap-2.5">
            <BarChart3 size={22} className="text-highlight" />
            <h1 className="text-xl md:text-2xl font-bold font-serif tracking-[0.1em] uppercase leading-none">RAPPORT WÔY</h1>
          </div>
          <p className="text-[10px] md:text-[11px] text-white/40 font-medium tracking-[0.05em] uppercase leading-relaxed max-w-[85%] md:max-w-none">
            Analyse mensuelle · Verdict · Portfolio Modèle
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-10 lg:items-start w-full">
          {/* Left Column - Main Content */}
          <div className="flex flex-col gap-6 lg:col-span-8">
            {/* Main Report Card */}
            <section className="bg-white/[0.02] border border-white/[0.08] rounded-3xl overflow-hidden focus-within:border-white/20 transition-all">
              {/* Card Header */}
              <div className="bg-white/5 px-6 py-4 flex items-center justify-between border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <BarChart3 size={16} className="text-highlight" />
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-highlight">RAPPORT MARS 2026</h2>
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
                          <div className="h-full bg-gradient-to-r from-accent to-highlight rounded-full" style={{ width: `${coin.pct}%` }} />
                        </div>
                        <span className="w-8 text-right text-sm font-bold text-highlight font-mono">{coin.score}</span>
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
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-highlight/40 bg-highlight/10 text-highlight text-[11px] font-bold tracking-widest uppercase">
                      <Hourglass size={12} /> HOLD — ONDO
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-accent/40 bg-accent/10 text-accent text-[11px] font-bold tracking-widest uppercase">
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
                      <Flame size={14} className="text-accent mt-0.5 shrink-0" />
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
                  <div className="relative rounded-2xl border border-white/5 overflow-hidden group hover:border-highlight/30 transition-all cursor-pointer">
                    {/* Blurred content simulation */}
                    <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-[8px] z-10 flex flex-col items-center justify-center p-6 text-center">
                      <div className="flex items-center gap-2 text-highlight font-bold text-sm tracking-wide">
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
                <div className="bg-gradient-to-tr from-accent/20 to-black/40 border border-highlight/20 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-highlight/5 blur-[40px] rounded-full pointer-events-none" />
                  <div className="w-10 h-10 rounded-full bg-highlight/10 flex items-center justify-center shrink-0 border border-highlight/30">
                    <Crown size={20} className="text-highlight" />
                  </div>
                  <div className="flex-1 min-w-0 relative z-10">
                    <h4 className="text-sm font-bold text-highlight">Champion Mars — Gaindé</h4>
                    <p className="text-[10px] text-white/50 mt-0.5 tracking-wide">SOL · Breakout 88$→131$ · 36h</p>
                  </div>
                  <div className="text-lg font-bold text-[#4A6741] font-mono tracking-tighter relative z-10">
                    +38.7%
                  </div>
                </div>

                {/* Rapports spéciaux ponctuels */}
                <div className="bg-white/[0.03] border border-highlight/10 rounded-2xl p-4 flex items-start gap-4 hover:border-highlight/20 transition-all cursor-pointer">
                  <div className="mt-1">
                    <Zap size={16} className="text-highlight" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-highlight uppercase tracking-wider mb-1">Rapports spéciaux ponctuels</h4>
                    <p className="text-[11px] text-white/50 font-medium leading-relaxed">Si event majeur dans le mois — inclus automatiquement.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar - Alerts & Accès */}
          <div className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-24 mt-2 lg:mt-0">
            {/* Top Alert */}
            <div className="bg-accent/10 border border-accent/30 rounded-2xl p-4 flex flex-col gap-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[40px] rounded-full pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                  <TrendingUp size={16} className="text-highlight" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-[#4A6741]">
                    SOL identifié à 88$ <br /><span className="text-accent">+38.7% en 36h</span> — Gaindé <Crown size={14} className="inline ml-1 text-highlight -mt-0.5" />
                  </p>
                  <p className="text-[10px] text-white/40 mt-1 font-medium">Édition Avril · Dispo. 1er avril</p>
                </div>
              </div>
            </div>

            {/* Accès au Rapport */}
            <section className="bg-white/[0.01] border border-white/[0.05] rounded-3xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-highlight mb-5">ACCÈS AU RAPPORT</h3>
              <div className="flex flex-col gap-3">
                {/* LAAMB */}
                <div className="bg-white/[0.02] border border-white/[0.08] hover:border-highlight/30 rounded-2xl p-4 flex flex-col gap-3 transition-all cursor-pointer group hover:bg-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-highlight/10 transition-colors">
                      <Swords size={20} className="text-white/40 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-highlight transition-colors">Inclus dans LAAMB</h4>
                      <p className="text-[10px] text-white/40 mt-0.5 font-medium leading-snug">Signaux champion + rapport + arène</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-white/[0.05] text-right">
                    <div className="text-highlight font-mono font-bold text-sm tracking-tight text-right w-full">20 000/mois</div>
                  </div>
                </div>

                {/* Rapport Seul */}
                <div className="bg-white/[0.02] border border-white/[0.08] hover:border-highlight/30 rounded-2xl p-4 flex flex-col gap-3 transition-all cursor-pointer group hover:bg-white/[0.04]">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-highlight/10 transition-colors">
                      <BarChart3 size={20} className="text-white/40 group-hover:text-highlight transition-colors" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white group-hover:text-highlight transition-colors">Rapport seul (N2+)</h4>
                      <p className="text-[10px] text-white/40 mt-0.5 font-medium leading-snug">Analyse + verdict + portfolio</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-white/[0.05] text-right">
                    <div className="text-highlight font-mono font-bold text-sm tracking-tight text-right w-full">10 000/mois</div>
                  </div>
                </div>

                {/* Cercle Élite */}
                <div className="bg-gradient-to-tr from-accent/10 to-black/40 border border-highlight/20 hover:border-highlight/40 rounded-2xl p-4 flex flex-col gap-3 transition-all cursor-pointer group hover:from-accent/20">
                  <div className="flex items-center gap-4 relative">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-highlight/10 blur-[30px] rounded-full pointer-events-none" />
                    <div className="w-10 h-10 rounded-full bg-highlight/10 flex items-center justify-center shrink-0 border border-highlight/20 group-hover:scale-105 transition-transform">
                      <Crown size={20} className="text-highlight group-hover:text-white transition-colors" />
                    </div>
                    <div className="relative z-10">
                      <h4 className="font-bold text-sm text-highlight group-hover:text-white transition-colors">Cercle Élite</h4>
                      <p className="text-[10px] text-white/50 mt-0.5 font-medium leading-snug">Tout inclus + analyses hebdo</p>
                    </div>
                  </div>
                  <div className="pt-3 border-t border-highlight/20 text-right relative z-10">
                    <div className="text-highlight font-mono font-bold text-sm tracking-tight text-right w-full">25 000/mois</div>
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
