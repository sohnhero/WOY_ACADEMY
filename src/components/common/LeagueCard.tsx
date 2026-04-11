import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, TrendingUp, Lock as LockIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LeagueCardProps {
  league: string;
  rank: number;
  total: number;
  isLocked?: boolean;
  unlockLevel?: number;
  className?: string;
}

export const LeagueCard: React.FC<LeagueCardProps> = ({ 
  league = "Or", 
  rank = 7, 
  total = 20, 
  isLocked = false,
  unlockLevel = 3,
  className 
}) => {
  const progressRatio = (total - rank) / total * 100;

  return (
    <motion.div
      className={cn(
        "relative rounded-[2.5rem] p-5 flex flex-col items-center justify-between min-h-[150px] overflow-hidden group",
        isLocked ? "bg-surface/20 border border-white/5 opacity-60" : "glass-boutique border-highlight/30",
        className
      )}
    >
      {/* Standardized Unified Background (Matches Hero Module) */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent z-1" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/15 blur-[60px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-highlight/10 blur-[60px] rounded-full pointer-events-none" />
      
      <div className="flex justify-between items-start w-full relative z-10">
        <div className="flex flex-col items-start gap-0.5">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/50">CLASSEMENT</p>
          <span className={cn(
            "text-[11px] font-black tracking-[0.2em] uppercase",
            isLocked ? "text-white/20" : "text-white drop-shadow-[0_0_12px_rgba(var(--woy-highlight-rgb),0.5)]"
          )}>
            Ligue {league}
          </span>
        </div>
        {!isLocked && (
          <div className="bg-emerald-500/10 px-1.5 py-0.5 rounded-lg border border-emerald-500/20 flex items-center gap-1 backdrop-blur-md">
            <TrendingUp size={8} className="text-emerald-400" />
            <span className="text-[8px] font-black text-emerald-400">TOP 10</span>
          </div>
        )}
      </div>

      {/* Trophy Section */}
      <div className={cn("relative my-1.5 transition-all duration-700", isLocked && "blur-lg opacity-20 scale-90")}>
        <div className="relative bg-highlight/20 p-5 rounded-[1.8rem] border border-highlight/30 shadow-xl backdrop-blur-xl transition-all duration-700">
          <Trophy size={30} className="text-highlight" />
        </div>
      </div>

      {/* Rank Stats & Battle Path */}
      <div className={cn("text-center w-full relative z-10 mt-1 transition-all duration-700", isLocked && "blur-md opacity-10")}>
        <div className="space-y-3">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-black text-white tracking-tighter drop-shadow-2xl">Rang {rank}</span>
          </div>
          
          {/* Battle Path Progress */}
          <div className="px-1 w-full mt-1">
            <div className="flex justify-between items-end mb-1.5 px-0.5">
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40">Battle Path</span>
              <span className="text-[9px] font-mono font-bold text-highlight">{total - rank} Restants</span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-highlight to-highlight-light rounded-full shadow-[0_0_15px_rgba(var(--woy-highlight-rgb),0.2)] relative" 
                  style={{ width: `${progressRatio}%` }}
                />
            </div>
          </div>
        </div>
      </div>

      {/* Premium Lock Overlay */}
      <AnimatePresence>
        {isLocked && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-bg/40 backdrop-blur-md"
          >
            <div className="relative group/lock">
              <div className="absolute inset-0 bg-accent/20 blur-2xl rounded-full animate-pulse" />
              <div className="relative bg-surface/80 border border-white/10 p-4 rounded-[1.8rem] shadow-2xl flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/20 flex items-center justify-center shadow-[0_0_15px_rgba(var(--woy-accent-rgb),0.2)]">
                  <LockIcon size={18} className="text-accent" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white/40 mb-0.5">DÉBLOCAGE</span>
                  <span className="text-xs font-black text-white tracking-widest uppercase">NIVEAU {unlockLevel}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
