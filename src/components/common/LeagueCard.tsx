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
  league = "",
  rank = 7,
  total = 20,
  isLocked = false,
  unlockLevel = 3,
  className
}) => {
  return (
    <motion.div
      whileHover={!isLocked ? { y: -5, scale: 1.02 } : {}}
      className={cn(
        "relative rounded-[2rem] p-6 flex flex-col items-center justify-center min-h-[160px] gap-4 overflow-hidden artifact-glass group",
        isLocked && "opacity-50 grayscale cursor-not-allowed",
        className
      )}
    >
      {/* Icon Section */}
      <div className="relative z-10">
        <div className={cn(
          "relative p-4 rounded-2xl border transition-all duration-500",
          isLocked ? "bg-white/5 border-white/10" : "bg-highlight/10 border-highlight/20 group-hover:scale-110"
        )}>
          {isLocked ? (
            <LockIcon size={32} className="text-white/20" />
          ) : (
            <>
              <Trophy size={32} className="text-highlight fill-highlight/10" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-highlight text-[10px] font-black text-highlight">
                1
              </div>
            </>
          )}
        </div>
      </div>

      <div className="text-center space-y-2 relative z-10">
        <p className={cn("text-[11px] font-black uppercase tracking-[0.4em]", isLocked ? "text-white/40" : "text-highlight")}>LIGUE {league}</p>
        <div className="flex flex-col items-center text-center">
          {isLocked ? (
            <span className="text-lg font-serif font-black text-white/40 mt-1 mb-1 tracking-tight">VERROUILLÉE</span>
          ) : (
            <span className="text-3xl font-serif font-black text-white leading-none tracking-tighter uppercase">{rank}/{total}</span>
          )}
          <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mt-2 whitespace-nowrap">
            {isLocked ? `SECTEUR NIV. ${unlockLevel}` : "TOP OCTUOR MANDATAIRE"}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
