import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wallet, 
  BookOpen, 
  Lock, 
  ChevronRight, 
  Coins, 
  Flame, 
  CheckCircle2, 
  PlayCircle, 
  CreditCard, 
  Mail, 
  Bell, 
  LogOut, 
  Moon, 
  Sun 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';
import { useAppContext } from '../context/AppContext';
import { ProgressBar } from '../components/common/Progress';

interface ProfilScreenProps {
  onLogout: () => void;
}

export const ProfilScreen: React.FC<ProfilScreenProps> = ({ onLogout }) => {
  const { 
    globalCoins, 
    userXP, 
    streak, 
    n1Modules, 
    theme, 
    setTheme 
  } = useAppContext();

  const user = {
    name: "Amadou Diallo",
    level: "N1 Sécurité",
    score: "WÔY Score",
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
      <section className="px-6 pb-8 flex items-center gap-6 max-w-7xl mx-auto w-full safe-top">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-highlight/30 to-accent/10 flex items-center justify-center text-2xl font-black font-serif border-2 border-highlight/30 relative">
          <div className="absolute inset-0 bg-highlight/10 blur-xl opacity-40 rounded-full" />
          <span className="relative z-10 text-highlight">Am</span>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-black text-white">{user.name}</h2>
          <div className="text-xs font-bold text-white/40 uppercase tracking-widest">
            {user.score} · <span className="text-highlight">{user.level}</span>
          </div>
          <button className="text-[10px] font-black text-highlight/80 hover:text-highlight transition-colors flex items-center gap-1 uppercase tracking-tight mt-1 cursor-pointer w-fit">
            Modifier le profil <ChevronRight size={10} />
          </button>
        </div>
      </section>

      {/* Global Desktop Grid container */}
      <div className="flex-1 px-6 pb-40 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:max-w-7xl lg:mx-auto lg:w-full">

        {/* LEFT COLUMN: Stats & Mastery */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          {/* Cauris & NFT Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Cauris Box */}
            <div className="bg-highlight/5 border border-highlight/20 p-6 rounded-[2rem] flex flex-col gap-2 flex-1 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-highlight/10 blur-3xl" />
              <div className="flex items-center gap-3">
                <Coins size={24} className="text-highlight opacity-60" />
                <span className="text-3xl font-black font-serif text-highlight">{globalCoins}</span>
              </div>
              <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] whitespace-nowrap">Cauris WÔY</span>
            </div>

            {/* NFT Certifications Grid */}
            <div className="flex-1 flex flex-col gap-3">
              <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] px-1">Certifications NFT</h4>
              <div className="grid grid-cols-4 gap-2">
                {user.nfts.map((nft) => (
                  <div 
                    key={nft.id} 
                    className={cn(
                      "aspect-square rounded-2xl flex items-center justify-center border transition-all",
                      nft.status === 'unlocked' 
                        ? "bg-highlight/10 border-highlight/30 text-highlight" 
                        : "bg-white/[0.02] border-white/5 text-white/10"
                    )}
                  >
                    <nft.icon size={20} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mastery Section */}
          <section className="flex flex-col gap-5">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-highlight">Progression WÔY</h3>
            <div className="grid grid-cols-1 gap-3">
              {user.mastery.map((m) => (
                <div 
                  key={m.id} 
                  className={cn(
                    "p-5 rounded-[2rem] border flex items-center justify-between gap-6 group transition-all",
                    m.status === 'completed' ? "bg-emerald-500/[0.03] border-emerald-500/10" : 
                    (m.status === 'in-progress' ? "bg-highlight/5 border-highlight/20" : "bg-white/[0.02] border-white/5 opacity-40")
                  )}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black",
                      m.status === 'completed' ? "bg-emerald-500/10 text-emerald-500" : 
                      (m.status === 'in-progress' ? "bg-highlight/10 text-highlight" : "bg-white/5 text-white/20")
                    )}>
                      {m.id}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-black text-white/90">{m.name}</span>
                        <span className="text-[10px] font-bold text-white/40">{m.progress}%</span>
                      </div>
                      <ProgressBar 
                        progress={m.progress} 
                        colorClass={m.status === 'completed' ? 'bg-emerald-500' : 'bg-highlight'} 
                      />
                    </div>
                  </div>
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    m.status === 'online' ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]" : "bg-white/5"
                  )} />
                  {m.status === 'completed' && <CheckCircle2 size={18} className="text-emerald-500/60" />}
                  {m.status === 'in-progress' && <PlayCircle size={18} className="text-highlight animate-pulse" />}
                  {m.status === 'locked' && <Lock size={16} className="text-white/10" />}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Settings & Settings */}
        <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24 h-fit">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem] flex flex-col gap-1">
              <span className="text-2xl font-black font-serif text-white">{userXP}</span>
              <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Total XP</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-5 rounded-[2rem] flex flex-col gap-1">
              <span className="text-2xl font-black font-serif text-white">{streak}j</span>
              <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Série Actuelle</span>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-6 lg:p-8 flex flex-col gap-6">
            <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] px-1">Paramètres</h4>
            
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => setTheme(theme === 'violet' ? 'terracotta' : 'violet')}
                className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                    {theme === 'violet' ? <Sun size={16} /> : <Moon size={16} />}
                  </div>
                  <span className="text-[11px] font-bold text-white/70">Mode {theme === 'violet' ? 'Clair' : 'Sombre'}</span>
                </div>
                <div className="w-10 h-5 bg-white/10 rounded-full relative p-1 transition-colors">
                   <motion.div 
                     animate={{ x: theme === 'violet' ? 20 : 0 }}
                     className="w-3 h-3 bg-highlight rounded-full" 
                   />
                </div>
              </button>

              <button className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                    <CreditCard size={16} />
                  </div>
                  <span className="text-[11px] font-bold text-white/70">Abonnement & Facturation</span>
                </div>
                <ChevronRight size={14} className="text-white/10" />
              </button>

              <button className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                    <Mail size={16} />
                  </div>
                  <span className="text-[11px] font-bold text-white/70">Email & Sécurité</span>
                </div>
                <ChevronRight size={14} className="text-white/10" />
              </button>

              <button className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-all flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                    <Bell size={16} />
                  </div>
                  <span className="text-[11px] font-bold text-white/70">Notifications</span>
                </div>
                <ChevronRight size={14} className="text-white/10" />
              </button>

              <div className="h-px bg-white/5 my-2" />

              <button 
                onClick={onLogout}
                className="w-full p-4 rounded-2xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3 text-red-500/70 group-hover:text-red-500 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <LogOut size={16} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest">Déconnexion</span>
                </div>
              </button>
            </div>
          </div>
          
          <div className="text-center">
             <p className="text-[9px] font-bold text-white/10 uppercase tracking-[0.3em]">WÔY Academy Alpha v0.4.2</p>
          </div>
        </div>
      </div>
    </div>
  );
};
