import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, Coins, Lock as LockIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ShieldCardProps {
  isActive: boolean;
  onActivate?: () => void;
  cost?: number;
  className?: string;
}

export const ShieldCard: React.FC<ShieldCardProps> = ({ 
  isActive, 
  onActivate, 
  cost = 50,
  className 
}) => {
  return (
    <motion.div
      onClick={!isActive ? onActivate : undefined}
      whileHover={{ y: -5, scale: 1.02 }}
      className={cn(
        "relative rounded-[2.5rem] p-6 flex flex-col items-center justify-center min-h-[160px] overflow-hidden cursor-pointer group transition-all duration-700 artifact-glass",
        !isActive && "opacity-80 grayscale-[0.5]",
        className
      )}
    >
        <div className={cn(
          "p-5 rounded-[2rem] border transition-all duration-700 backdrop-blur-xl mb-4",
          isActive 
            ? "bg-accent/20 border-accent/40" 
            : "bg-white/[0.03] border-white/10"
        )}>
          <Shield size={36} className={cn(
            "transition-colors duration-700",
            isActive ? "text-accent fill-accent/30" : "text-white/10"
          )} />
        </div>

        {/* Labels */}
        <div className="space-y-4">
          <p className="text-[11px] font-black uppercase tracking-[0.5em] text-white/40">BOUCLIER</p>
          
          <div className="flex flex-col items-center gap-2">
            {isActive ? (
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">ACTIF</span>
              </div>
            ) : (
              <button 
                onClick={(e) => { e.stopPropagation(); onActivate?.(); }}
                className="px-6 py-2 rounded-xl bg-accent text-[9px] font-black text-white uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all"
              >
                ACTIVER ({cost} <Coins size={10} className="inline mb-0.5" />)
              </button>
            )}
          </div>
        </div>

      {/* Modern Decoration */}
      <div className="absolute top-8 left-8 w-2 h-0.5 bg-white/10" />
      <div className="absolute bottom-8 right-8 w-2 h-0.5 bg-white/10" />

      {/* Lock Indicator (Not Active) */}
      {!isActive && (
        <div className="absolute top-6 right-6 opacity-30">
          <LockIcon size={14} className="text-white/40" />
        </div>
      )}
    </motion.div>
  );
};
