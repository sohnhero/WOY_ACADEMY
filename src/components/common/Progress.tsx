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
export const ScoreRing = ({ score, size = 150, strokeWidth = 9, id = 'default' }: { score: number; size?: number; strokeWidth?: number; id?: string }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  // Design constants
  const segments = 60; // Elaborated tick count
  const innerRadius = radius - 10;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Dynamic Glow Layer */}
      <div className="absolute inset-0 bg-accent/5 blur-[50px] rounded-full animate-pulse pointer-events-none" />

      <svg width={size} height={size} className="-rotate-90 drop-shadow-2xl">
        {/* Underlayer Segments (The "Elaborated" Track) */}
        <g opacity="0.15">
          {Array.from({ length: segments }).map((_, i) => (
            <line
              key={i}
              x1={size / 2 + innerRadius * Math.cos((i * 2 * Math.PI) / segments)}
              y1={size / 2 + innerRadius * Math.sin((i * 2 * Math.PI) / segments)}
              x2={size / 2 + (innerRadius + 4) * Math.cos((i * 2 * Math.PI) / segments)}
              y2={size / 2 + (innerRadius + 4) * Math.sin((i * 2 * Math.PI) / segments)}
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ))}
        </g>

        {/* Base Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />

        {/* Progress Arc: Subtle Glow Layer */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--woy-accent)"
          strokeWidth={strokeWidth + 4}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          className="opacity-20 blur-[6px]"
        />

        {/* Progress Arc: Sharp Main Stroke */}
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
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          className="drop-shadow-[0_0_12px_var(--woy-accent-glow)]"
        />
      </svg>

      {/* Internal Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <span
            className={cn(
              "font-serif font-black text-white leading-none tracking-tight whitespace-nowrap",
              size <= 80
                ? (score >= 100 ? "text-base" : "text-lg")
                : (score >= 100 ? "text-2xl" : "text-3xl")
            )}
          >
            {score}
          </span>
          <div className="flex flex-col items-center mt-1">
            <span className={cn("text-accent font-black uppercase tracking-[0.3em]", size <= 80 ? "text-[6px]" : "text-[9px]")}>Score</span>
            <div className="h-[2px] w-4 bg-accent/40 rounded-full mt-1" />
          </div>
        </motion.div>
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
        <span className="text-white/40 font-bold uppercase tracking-wider">Maîtrise</span>
        <span className="text-accent font-mono font-bold">{Math.round(pct)}%</span>
      </div>
      <ProgressBar progress={pct} />
      <div className="flex items-center gap-1.5 text-[10px] text-white/40 font-mono">
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
        </div>
        <span>{current}/{total} XP</span>
      </div>
    </div>
  );
};
