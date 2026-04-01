import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../utils/cn';

// --- Linear Progress Bar ---
export const ProgressBar = ({ progress, colorClass = 'bg-gradient-to-r from-accent to-highlight' }: { progress: number; colorClass?: string }) => (
  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden shrink-0">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
      className={cn("h-full rounded-full", colorClass)}
    />
  </div>
);

// --- Circular Score Ring ---
export const ScoreRing = ({ score, size = 90, strokeWidth = 7, id = 'default' }: { score: number; size?: number; strokeWidth?: number; id?: string }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const gradientId = `scoreGradient-${id}`;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--woy-accent)" />
            <stop offset="100%" stopColor="var(--woy-highlight)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className={cn("font-bold text-white leading-none", size <= 80 ? "text-xl" : "text-3xl")}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: 'spring' }}
        >
          {score}
        </motion.span>
        <span className={cn("text-white/40 uppercase tracking-[0.15em] font-bold", size <= 80 ? "text-[6px] mt-0.5" : "text-[8px] mt-1")}>Score</span>
      </div>
    </div>
  );
};

// --- XP Progress Bar with Stats ---
export const XPBar = ({ current, total }: { current: number; total: number }) => {
  const pct = (current / total) * 100;
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-center text-[10px]">
        <span className="text-white/40">N1 maîtrisé</span>
        <span className="text-white/50 font-mono">{Math.round(pct)}%</span>
      </div>
      <ProgressBar progress={pct} />
      <div className="flex items-center gap-1.5 text-[10px] text-white/40 font-mono">
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-accent" />
          <span className="inline-block w-2 h-2 rounded-full bg-highlight" />
        </div>
        <span>{current}/{total} XP</span>
      </div>
    </div>
  );
};
