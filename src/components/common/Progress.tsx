import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';

// --- Linear Progress Bar ---
export const ProgressBar = ({ progress, colorClass = 'bg-accent' }: { progress: number; colorClass?: string }) => (
  <div className="h-2 w-full bg-white/[0.08] rounded-full overflow-hidden shrink-0">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
      className={cn("h-full rounded-full shadow-[0_0_8px_var(--woy-accent-glow)]", colorClass)}
    />
  </div>
);

// --- Circular Score Ring (Elaborated) ---
export const ScoreRing = ({ score, size = 150, strokeWidth = 10, id = 'default', showText = true }: { score: number; size?: number; strokeWidth?: number; id?: string; showText?: boolean }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Glow Backdrop */}
      <div className="absolute inset-0 bg-accent/10 blur-[40px] rounded-full pointer-events-none" />

      <svg width={size} height={size} className="-rotate-90">
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
        />

        {/* Progress */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--woy-accent)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="drop-shadow-[0_0_15px_var(--woy-accent-glow)]"
        />
      </svg>

      {/* Content */}
      {showText && (
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-0.5">
          <span className={cn("font-serif font-black text-white leading-none tracking-tight", size <= 60 ? "text-sm" : size <= 100 ? "text-2xl" : "text-5xl")}>
            {score}
          </span>
          <span className={cn("text-accent font-black uppercase tracking-[0.3em] font-mono mt-1", size <= 60 ? "text-[5px] tracking-[0.2em]" : size <= 100 ? "text-[7px]" : "text-[10px]")}>
            Score
          </span>
        </div>
      )}
    </div>
  );
};

// --- XP Progress Bar with Stats ---
export const XPBar = ({ current, total, label = "N1 maîtrisé" }: { current: number; total: number, label?: string }) => {
  const pct = (current / total) * 100;
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex justify-between items-end">
        <span className="text-white/30 text-[10px] uppercase font-bold tracking-widest">{label}</span>
        <span className="text-accent font-black text-xs font-mono">{Math.round(pct)}%</span>
      </div>
      
      <div className="h-2.5 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.03]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-accent relative"
        >
          {/* Subtle Segment Overlays */}
          <div className="absolute inset-x-0 inset-y-0 flex justify-evenly pointer-events-none opacity-20">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-px h-full bg-black/20" />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-end gap-1.5 text-[10px] font-black font-mono">
        <span className="text-white/60">{current}/{total}</span>
        <span className="text-white/20 uppercase tracking-widest">XP</span>
      </div>
    </div>
  );
};
