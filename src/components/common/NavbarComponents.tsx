import React from 'react';
import { motion } from 'motion/react';
import { Coins, Flame, Shield, TrendingUp, Zap } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatBadgeProps {
  icon: React.ElementType;
  value: string | number;
  colorClass?: string;
  label?: string;
  pulse?: boolean;
}

export const StatBadge: React.FC<StatBadgeProps> = ({ icon: Icon, value, colorClass = "text-highlight", label, pulse }) => (
  <div className="glass-pill px-3 py-1.5 flex items-center gap-2.5 transition-all group hover:scale-105 hover:border-white/20 active:scale-95">
    <div className={cn("relative flex items-center justify-center w-6 h-6 rounded-lg bg-white/5 border border-white/5", pulse && "animate-pulse")}>
      <Icon size={14} className={cn(colorClass, "transition-transform group-hover:scale-110")} />
      {pulse && <div className="absolute inset-0 bg-accent/20 blur-md rounded-lg animate-pulse" />}
    </div>
    <div className="flex flex-col leading-none">
      <span className="font-mono text-xs font-black tracking-tight text-white uppercase">{value}</span>
      {label && <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white/30 mt-1">{label}</span>}
    </div>
  </div>
);

export const XPProgress: React.FC<{ xp: number; maxXP: number }> = ({ xp, maxXP }) => {
  const percentage = Math.min(Math.round((xp / maxXP) * 100), 100);
  
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-white/5 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        className="absolute inset-y-0 left-0 bg-accent relative"
      >
        {/* Energy Pulse Detail */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
        <div className="absolute inset-0 shadow-[0_0_12px_var(--woy-accent-glow)]" />
      </motion.div>
    </div>
  );
};

export const LevelBadge: React.FC<{ level: number }> = ({ level }) => (
  <div className="relative group cursor-pointer flex items-center justify-center px-4 py-2 rounded-2xl border border-white/5 bg-[#1f0e0a]/40 hover:border-accent/40 transition-all shadow-xl backdrop-blur-md">
    <span className="font-serif font-black text-[11px] text-accent tracking-widest">NIVEAU {level}</span>
    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-accent animate-ping opacity-40" />
  </div>
);

export const StreakBadge: React.FC<{ days: number }> = ({ days }) => (
  <div className="flex items-center gap-2 px-4 py-1.5 bg-orange-500/5 border border-orange-500/20 rounded-2xl shadow-2xl backdrop-blur-md">
    <Flame size={16} className="text-orange-500 fill-orange-500/10" />
    <span className="font-serif font-black text-xs text-white">{days}</span>
    <span className="font-black text-[8px] text-white/20 uppercase tracking-widest mt-0.5">JOURS</span>
  </div>
);
