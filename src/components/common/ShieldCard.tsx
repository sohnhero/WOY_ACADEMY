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
      className={cn(
        "relative rounded-[2.5rem] p-6 flex flex-col items-center justify-center min-h-[180px] overflow-hidden cursor-pointer group transition-all duration-700",
        isActive 
          ? "glass-boutique border-accent/50" 
          : "bg-surface/40 border border-white/[0.05]",
        className
      )}
    >
      {/* Standardized Unified Background (Matches Hero Module) */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent z-1" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/15 blur-[60px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-highlight/10 blur-[60px] rounded-full pointer-events-none" />

      {/* Hex Grid Overlay (Only when active) */}
      <div className={cn(
        "absolute inset-0 hex-grid-pattern opacity-0 transition-opacity duration-1000",
        isActive && "opacity-20"
      )} />

      {/* Content Stack */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Shield Icon Container */}
        <div className={cn(
          "p-5 rounded-[2rem] border transition-all duration-700 backdrop-blur-xl mb-4",
          isActive 
            ? "bg-accent/20 border-accent/50 shadow-xl" 
            : "bg-white/[0.03] border-white/[0.08]"
        )}>
          <Shield size={36} className={cn(
            "transition-colors duration-700",
            isActive ? "text-accent fill-accent/40" : "text-white/10"
          )} />
        </div>

        {/* Labels */}
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-2">BOUCLIER</p>
          <span className={cn(
            "text-[11px] font-black tracking-widest uppercase py-1 px-3 rounded-full border",
            isActive ? "text-accent border-accent/40 bg-accent/10" : "text-white/40 border-white/5"
          )}>
            {isActive ? "Opérationnel" : "Activé via 50 Coins"}
          </span>
        </div>
      </div>

      {/* Modern Decoration */}
      <div className="absolute top-8 left-8 w-1 h-1 rounded-full bg-white/5" />
      <div className="absolute top-8 right-8 w-1 h-1 rounded-full bg-white/5" />

      {/* Lock Indicator (Subtle) */}
      {!isActive && (
        <div className="absolute bottom-6 right-6 opacity-30">
          <LockIcon size={12} className="text-white/20" />
        </div>
      )}
    </motion.div>
  );
};
