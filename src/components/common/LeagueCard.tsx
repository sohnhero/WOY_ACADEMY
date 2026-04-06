import React from 'react';
import { motion } from 'motion/react';
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
        "relative rounded-[2.5rem] p-6 flex flex-col items-center justify-between min-h-[180px] overflow-hidden group",
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
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30">CLASSEMENT</p>
          <span className={cn(
            "text-xs font-black tracking-widest uppercase",
            isLocked ? "text-white/20" : "text-highlight drop-shadow-[0_0_10px_rgba(var(--woy-highlight-rgb),0.4)]"
          )}>
            Ligue {league}
          </span>
        </div>
        {!isLocked && (
          <div className="bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20 flex items-center gap-1.5 backdrop-blur-md">
            <TrendingUp size={10} className="text-emerald-400" />
            <span className="text-[10px] font-black text-emerald-400">TOP 10</span>
          </div>
        )}
      </div>

      {/* Trophy Section */}
      <div className={cn("relative my-2", isLocked && "filter grayscale opacity-20")}>
        {/* Particle Stars (Removed as requested) */}

        <div className="relative bg-highlight/20 p-6 rounded-[2.2rem] border border-highlight/30 shadow-xl backdrop-blur-xl transition-all duration-700">
          <Trophy size={36} className="text-highlight" />
        </div>
      </div>

      {/* Rank Stats & Battle Path */}
      <div className="text-center w-full relative z-10 mt-2">
        {isLocked ? (
          <div className="flex flex-col items-center gap-2">
            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
              <LockIcon size={16} className="text-white/20" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 opacity-50">DÉBLOQUÉ NIVEAU {unlockLevel}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-black text-white tracking-tighter drop-shadow-2xl">Rang {rank}</span>
            </div>
            
            {/* Battle Path Progress */}
            <div className="px-1 w-full mt-2">
              <div className="flex justify-between items-end mb-2 px-0.5">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Battle Path</span>
                <span className="text-[10px] font-mono font-bold text-highlight">{total - rank} Restants</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-highlight to-highlight-light rounded-full shadow-[0_0_15px_rgba(var(--woy-highlight-rgb),0.2)] relative" 
                    style={{ width: `${progressRatio}%` }}
                  />
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
