import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Search, 
  Lock, 
  Trophy, 
  Flame, 
  CircleCheck, 
  ChevronDown, 
  PlayCircle 
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { ProgressBar } from './Progress';
import { Level } from '../../types';

// --- Module Card ---
export const ModuleCard: React.FC<{ mod: any; index: number; onClick?: () => void }> = ({ mod, index, onClick }) => {
  const statusIcon = () => {
    if (mod.status === 'en cours') return <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-highlight/10 flex items-center justify-center"><BookOpen size={18} className="text-highlight" /></div>;
    if (mod.status === 'à venir') return <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white/5 flex items-center justify-center"><Search size={18} className="text-white/40" /></div>;
    return <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-white/5 flex items-center justify-center"><Lock size={18} className="text-white/20" /></div>;
  };

  return (
    <motion.div
      onClick={mod.status !== 'verrouillé' ? onClick : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 + index * 0.08 }}
      whileHover={mod.status !== 'verrouillé' ? { scale: 1.005 } : undefined}
      whileTap={mod.status !== 'verrouillé' ? { scale: 0.98 } : undefined}
      className={cn(
        "p-4 lg:p-5 rounded-2xl border transition-all duration-200 flex items-center gap-4 cursor-pointer",
        mod.status === 'verrouillé'
          ? "bg-white/[0.01] border-white/[0.04] opacity-35"
          : "bg-surface border-white/[0.06] hover:border-accent/15 hover:bg-surface-hover card-glow"
      )}
    >
      {statusIcon()}

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <h5 className="font-semibold text-sm truncate">
              <span className="font-mono text-white/40 text-xs">N{mod.id}</span>
              <span className="mx-1 text-white/20">·</span>
              {mod.title}
            </h5>
            <p className="text-[11px] text-white/30 mt-0.5">
              {mod.status === 'en cours' && `En cours · ${mod.progress}% maîtrisé`}
              {mod.status === 'à venir' && `À venir · ${mod.time}`}
              {mod.status === 'verrouillé' && mod.lockedMsg}
            </p>
          </div>
          <span className="text-highlight text-xs font-bold font-mono shrink-0">+{mod.xp}</span>
        </div>
        {mod.progress && (
          <div className="mt-2.5">
            <ProgressBar progress={mod.progress} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- Stat Card ---
export const StatCard = ({ icon: Icon, label, value, subValue, color }: any) => (
  <motion.div
    whileHover={{ y: -4, scale: 1.01 }}
    className="relative bg-surface border border-white/[0.06] rounded-[2rem] p-5 flex flex-col items-center justify-center gap-3 card-glow min-h-[160px] overflow-hidden group"
  >
    <div className="absolute top-0 left-0 w-16 h-16 bg-white/[0.02] blur-2xl rounded-full -ml-8 -mt-8 pointer-events-none" />
    
    <div className={cn(
      "relative p-4 rounded-full transition-all duration-500 group-hover:scale-110 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/5",
      color
    )}>
      <Icon size={22} className="text-white/80 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
    </div>
    
    <div className="text-center relative z-10">
      <p className="text-[9px] font-black uppercase tracking-[0.25em] text-white/25 mb-1.5">{label}</p>
      <p className="text-xl font-bold text-white/90 tracking-tight">{value}</p>
      {subValue && (
        <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest mt-1">
          {subValue}
        </p>
      )}
    </div>
  </motion.div>
);

// --- Niveau Card ---
export interface NiveauCardProps {
  niveau: Level;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  onOpenLesson?: (id: string) => void;
}

export const NiveauCard: React.FC<NiveauCardProps> = ({ niveau, index, expanded, onToggle, onOpenLesson }) => {
  const isLocked = niveau.status === 'verrouillé';
  const isDone = niveau.status === 'complété';
  const isInProgress = niveau.status === 'en cours';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      whileHover={!isLocked ? { scale: 1.005 } : undefined}
      className={cn(
        "rounded-2xl border overflow-hidden transition-all duration-200 cursor-pointer",
        isLocked ? "bg-white/[0.01] border-white/[0.04] opacity-35" : "bg-surface border-white/[0.06] hover:border-accent/15 hover:bg-surface-hover card-glow"
      )}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        disabled={isLocked}
        className="w-full p-4 flex items-center gap-4 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h5 className="font-bold text-sm">
              {niveau.id} — {niveau.title}
              {niveau.id === 'N6' && <Trophy size={14} className="inline ml-1.5 text-highlight" />}
            </h5>
            <span className={cn(
              "text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0",
              niveau.badge === 'GRATUIT'
                ? "border border-green-500/30 text-green-400"
                : "border border-highlight/30 text-highlight"
            )}>
              {niveau.badge}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1.5 text-[11px] text-white/40 flex-wrap">
            {isDone && <CircleCheck size={14} className="text-green-400" />}
            {isInProgress && <Flame size={14} className="text-orange-400" />}
            {isLocked && <Lock size={12} className="text-white/20" />}
            <span>{niveau.totalModules} modules</span>
            {niveau.time && <span>{niveau.time}</span>}
            {isDone && <span className="text-green-400">Complété</span>}
            {isInProgress && <span className="text-accent/70 font-bold">En cours {niveau.progress}%</span>}
            {niveau.rewards.map((r, i) => (
              <span key={i} className="flex items-center gap-1 text-white/30">
                <r.icon size={11} /> {r.text}
              </span>
            ))}
          </div>
          {isInProgress && (
            <div className="mt-2.5">
              <ProgressBar progress={niveau.progress} />
            </div>
          )}
        </div>
        <div className={cn("p-2 rounded-xl transition-transform", expanded ? "rotate-180" : "")}>
          <ChevronDown size={20} className="text-white/20" />
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5 bg-sidebar"
          >
            <div className="p-4 flex flex-col gap-2">
              {niveau.subModules.length > 0 ? (
                niveau.subModules.map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => sub.id && onOpenLesson?.(sub.id)}
                    className={cn(
                      "group p-3 rounded-xl border flex items-center justify-between transition-all active:scale-[0.98]",
                      sub.done 
                        ? "bg-green-500/5 border-green-500/10 hover:bg-green-500/10" 
                        : (sub.current ? "bg-accent/10 border-accent/20 hover:bg-accent/15" : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06]")
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        sub.done ? "bg-green-500/20 text-green-400" : (sub.current ? "bg-accent/20 text-accent" : "bg-white/5 text-white/40")
                      )}>
                        {sub.done ? <CircleCheck size={16} /> : (sub.current ? <PlayCircle size={16} /> : <Lock size={14} />)}
                      </div>
                      <div>
                        <p className={cn("text-xs font-bold", sub.done ? "text-green-400/80" : "text-white")}>{sub.title}</p>
                        <p className="text-[10px] text-white/30 uppercase tracking-tighter">{sub.id} · {sub.time}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                   <p className="text-xs text-white/20 uppercase tracking-widest font-black">Contenu à venir</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
