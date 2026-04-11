import React from 'react';
import { motion } from 'motion/react';
import { Flame } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StreakCardProps {
  days: number;
  className?: string;
}

export const StreakCard: React.FC<StreakCardProps> = ({
  days,
  className
}) => {
  return (
    <motion.div
      className={cn(
        "relative glass-boutique rounded-[2.5rem] p-5 flex flex-col items-center justify-center min-h-[150px] overflow-hidden group",
        className
      )}
    >
      {/* Standardized Unified Background (Matches Hero Module) */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent z-1" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/15 blur-[60px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-highlight/10 blur-[60px] rounded-full pointer-events-none" />

      {/* Content Stack */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Layered Flame Icon Container */}
        <div className="bg-accent/10 p-4 rounded-[1.8rem] border border-accent/20 shadow-xl backdrop-blur-md mb-3">
          <Flame size={30} className="text-accent" />
        </div>
        
        {/* Labels */}
        <div className="text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 mb-1.5">STREAK</p>
          <span className="text-[10px] font-black tracking-widest uppercase py-1 px-3 rounded-full border border-accent/40 bg-accent/10 text-accent">
            {days} {days > 1 ? 'Jours' : 'Jour'}
          </span>
        </div>
      </div>

      {/* Modern Decoration */}
      <div className="absolute top-8 left-8 w-1 h-1 rounded-full bg-white/5" />
      <div className="absolute top-8 right-8 w-1 h-1 rounded-full bg-white/5" />
    </motion.div>
  );
};
