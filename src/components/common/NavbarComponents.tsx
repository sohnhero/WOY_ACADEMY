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
  <div className="flex items-center gap-2 px-2 py-1 transition-all group">
    <div className={cn("relative", pulse && "animate-pulse")}>
      <Icon size={13} className={cn(colorClass, "transition-transform group-hover:scale-110")} />
    </div>
    <div className="flex flex-col leading-none">
      <span className="font-mono text-[10px] font-black tracking-tight text-white/90 uppercase">{value}</span>
      {label && <span className="text-[6px] font-bold uppercase tracking-widest text-white/20 mt-0.5">{label}</span>}
    </div>
  </div>
);

export const XPProgress: React.FC<{ xp: number; maxXP: number }> = ({ xp, maxXP }) => {
  const percentage = Math.min(Math.round((xp / maxXP) * 100), 100);
  
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-white/5 overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        className="absolute inset-y-0 left-0 bg-accent shadow-[0_0_8px_rgba(var(--woy-accent-rgb),0.6)]"
      />
    </div>
  );
};

export const LevelBadge: React.FC<{ level: number }> = ({ level }) => (
  <div className="relative group cursor-pointer flex items-center justify-center p-1.5 rounded-xl border border-white/5 bg-white/[0.03] hover:border-accent/40 transition-all">
    <span className="font-serif font-black text-[10px] text-accent tracking-tighter">LVL {level}</span>
  </div>
);

export const StreakBadge: React.FC<{ days: number }> = ({ days }) => (
  <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-[10px] shadow-[0_0_10px_rgba(249,115,22,0.1)]">
    <Flame size={12} className="text-orange-500 fill-orange-500/20" />
    <span className="font-mono text-[10px] font-black text-white/90">{days} J</span>
  </div>
);
