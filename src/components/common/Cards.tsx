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
  PlayCircle,
  Clock
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { ProgressBar } from './Progress';
import { Level } from '../../types';

// --- Module Card ---
export const ModuleCard: React.FC<{ mod: any; index: number; onClick?: () => void }> = ({ mod, index, onClick }) => {
  const statusIcon = () => {
    if (mod.status === 'en cours') return <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center border border-accent/30"><BookOpen size={20} className="text-accent" /></div>;
    if (mod.status === 'à venir') return <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5"><Search size={20} className="text-white/40" /></div>;
    return <div className="w-12 h-12 rounded-xl bg-white/[0.02] flex items-center justify-center border border-white/[0.05]"><Lock size={20} className="text-white/10" /></div>;
  };

  return (
    <motion.div
      onClick={mod.status !== 'verrouillé' ? onClick : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      whileHover={mod.status !== 'verrouillé' ? { y: -5, scale: 1.01 } : undefined}
      whileTap={mod.status !== 'verrouillé' ? { scale: 0.98 } : undefined}
      className={cn(
        "p-6 rounded-[2rem] border transition-all duration-300 flex items-center gap-5 cursor-pointer artifact-glass",
        mod.status === 'verrouillé'
          ? "opacity-30 border-white/5"
          : "hover:border-accent/40 group relative overflow-hidden"
      )}
    >

      {statusIcon()}

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-3">
          <div className="min-w-0 text-left">
            <h5 className="font-serif font-black text-base text-white uppercase tracking-wider group-hover:text-accent transition-colors">
              <span className="font-mono text-white/20 text-[10px] mr-3">MOD {mod.id}</span>
              {mod.title}
            </h5>
            <div className="flex items-center gap-3 mt-1.5 font-black uppercase tracking-[0.2em] text-[9px]">
              {mod.status === 'en cours' && <span className="text-accent">EN MISSION · {mod.progress}%</span>}
              {mod.status === 'à venir' && <span className="text-white/30">DISPONIBLE · {mod.time}</span>}
              {mod.status === 'verrouillé' && <span className="text-white/10">BOUCLIER ACTIF</span>}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-highlight text-[11px] font-black font-mono tracking-tighter">+{mod.xp}</span>
            <span className="text-[7px] text-white/20 font-black tracking-widest uppercase">UNITÉ XP</span>
          </div>
        </div>
        {mod.progress && (
          <div className="mt-4">
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
    whileHover={{ y: -8, scale: 1.02 }}
    className="relative artifact-glass rounded-[2rem] p-7 flex flex-col items-center justify-center gap-5 overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
  >
    
    <div className={cn(
      "relative p-5 rounded-[1.5rem] transition-all duration-500 group-hover:scale-110 border border-white/5 bg-white/[0.03]",
      color
    )}>
      <Icon size={28} className="text-white/80" />
    </div>
    
    <div className="text-center relative z-10">
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-2.5">{label}</p>
      <p className="text-3xl font-serif font-black text-white leading-none tracking-tight">{value}</p>
      {subValue && (
        <p className="text-[10px] text-accent font-black uppercase tracking-[0.15em] mt-3 py-1 px-3 bg-accent/5 rounded-full border border-accent/10">
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
      transition={{ delay: 0.2 + index * 0.1 }}
      whileHover={!isLocked ? { y: -2, scale: 1.005 } : undefined}
      className={cn(
        "rounded-[2.5rem] border transition-all duration-300 cursor-pointer overflow-hidden artifact-glass shadow-2xl",
        isLocked ? "opacity-30 grayscale" : "hover:border-accent/30"
      )}
    >
      {/* Header */}
      <button
        onClick={onToggle}
        disabled={isLocked}
        className="w-full p-6 flex items-center gap-5 text-left relative group/header"
      >
        {/* Progress Energy Track (Visible when expanded) */}
        {isInProgress && !expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent/20">
            <motion.div 
               className="h-full bg-accent" 
               initial={{ width: 0 }} 
               animate={{ width: `${niveau.progress}%` }} 
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <h5 className="font-serif font-black text-lg text-white group-hover/header:text-accent transition-colors tracking-tight">
              {niveau.id} — {niveau.title}
              {niveau.id === 'N6' && <Trophy size={18} className="inline ml-3 text-highlight" />}
            </h5>
            <span className={cn(
              "text-[9px] font-black px-3.5 py-1.5 rounded-full shrink-0 tracking-widest",
              niveau.badge === 'GRATUIT'
                ? "bg-green-500/10 border border-green-500/20 text-green-400"
                : "bg-accent/10 border border-accent/20 text-accent"
            )}>
              {niveau.badge}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-2.5 text-[10px] font-black uppercase tracking-widest text-white/30">
            <div className="flex items-center gap-1.5">
              {isDone ? <CircleCheck size={14} className="text-green-500" /> : <BookOpen size={14} />}
              <span>{niveau.totalModules} MODULES</span>
            </div>
            {niveau.time && <span className="flex items-center gap-1.5"><Clock size={12} /> {niveau.time}</span>}
            {isInProgress && <span className="text-accent">DASHBOARD ACTIF</span>}
          </div>
        </div>
        <div className={cn("p-2.5 rounded-xl border border-white/5 bg-white/[0.03] transition-transform shadow-xl", expanded ? "rotate-180 bg-accent/10 border-accent/20" : "")}>
          <ChevronDown size={22} className={cn("transition-colors", expanded ? "text-accent" : "text-white/20")} />
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-white/5 bg-white/[0.02] backdrop-blur-3xl"
          >
            <div className="p-6 flex flex-col gap-3">
              {niveau.subModules.length > 0 ? (
                niveau.subModules.map((sub) => (
                  <div
                    key={sub.id}
                    onClick={() => sub.id && onOpenLesson?.(sub.id)}
                    className={cn(
                      "group p-4 rounded-2xl border flex items-center justify-between transition-all active:scale-[0.98] cursor-pointer",
                      sub.done 
                        ? "bg-green-500/5 border-green-500/10 hover:bg-green-500/10" 
                        : (sub.current ? "bg-accent/10 border-accent/30 hover:bg-accent/15" : "bg-white/[0.03] border-white/5 hover:bg-white/[0.08]")
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-300",
                        sub.done ? "bg-green-500/20 border-green-500/30 text-green-400" : (sub.current ? "bg-accent border-accent text-white" : "bg-white/5 border-white/10 text-white/40")
                      )}>
                        {sub.done ? <CircleCheck size={18} /> : (sub.current ? <PlayCircle size={20} /> : <Lock size={16} />)}
                      </div>
                      <div className="text-left">
                        <p className={cn("text-[13px] font-black uppercase tracking-tight", sub.done ? "text-green-400/80" : "text-white")}>{sub.title}</p>
                        <p className="text-[9px] text-white/20 uppercase tracking-[0.2em] font-black mt-1">{sub.id} · EXPLORATION {sub.time}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center">
                   <p className="text-[10px] text-white/10 uppercase tracking-[0.4em] font-black">Archive verrouillée</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
