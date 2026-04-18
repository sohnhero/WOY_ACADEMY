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
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn(
        "relative rounded-[2rem] p-6 flex flex-col items-center justify-center min-h-[160px] overflow-hidden artifact-glass",
        className
      )}
    >
      {/* Icon Container (Matched with ShieldCard) */}
      <div className="p-5 rounded-[2rem] border bg-accent/10 border-accent/20 mb-4 transition-all duration-300">
        <Flame size={32} className="text-accent fill-accent/10 animate-pulse" />
      </div>

      {/* Content Stack */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-4">
        <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/40 leading-none">SÉRIE</p>

        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/5 border border-accent/10">
          <span className="text-[9px] font-black text-white uppercase tracking-widest">{days} JOURS D'AFFILÉS</span>
        </div>
      </div>
    </motion.div>
  );
};
