import React, { useMemo } from 'react';
import { 
  ChevronLeft, 
  BookOpen, 
  Lock, 
  Zap, 
  Check, 
  Clock, 
  Play,
  Coins
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAppContext } from '../../context/AppContext';
import { niveaux } from '../../data/niveaux';

interface LessonSidebarProps {
  lessonId: string;
  onBack: () => void;
}

export const LessonSidebar: React.FC<LessonSidebarProps> = ({ lessonId, onBack }) => {
  const { 
    theme, 
    globalCoins, 
    setActiveTab 
  } = useAppContext();

  // Precise level lookup 
  const currentLevel = useMemo(() => {
    const normalizedId = lessonId.startsWith('N') ? lessonId : `N${lessonId}`;
    return niveaux.find(n => n.subModules.some(sm => 
      sm.id === normalizedId || 
      sm.id === lessonId || 
      sm.id.split('.').pop() === lessonId.split('.').pop()
    ));
  }, [lessonId]);

  const activeModuleCount = currentLevel?.subModules.length || 0;
  const levelStatus = currentLevel?.badge || 'GRATUIT';

  const sidebarBg = 'bg-[var(--woy-sidebar-bg)]';
  const borderAccent = 'border-highlight/20';
  const textAccent = 'text-highlight';
  const bgAccent10 = 'bg-highlight/10';
  const dotAccent = 'bg-highlight';

  return (
    <aside className={cn("hidden lg:flex flex-col gap-0 border-r border-white/5 h-full w-[330px] shrink-0 scrollable-sidebar relative z-[75] transition-colors duration-1000", sidebarBg)}>
      {/* Header section with back button and level name */}
      <div className="p-8 flex flex-col gap-8 border-b border-white/[0.03] safe-top">
        <button 
          onClick={() => {
            setActiveTab('cours');
            onBack();
          }}
          className={cn("flex items-center gap-3 transition-all text-[11px] font-black uppercase tracking-[0.2em] cursor-pointer group active:scale-95 w-fit", textAccent)}
        >
          <div className={cn("w-7 h-7 rounded-full border flex items-center justify-center transition-all group-hover:bg-current/10", borderAccent)}>
            <ChevronLeft size={14} />
          </div>
          <span>Retour au site</span>
        </button>

        <div className="flex flex-col gap-2.5">
          <h3 className="text-2xl font-serif font-black text-white uppercase leading-[1.1] tracking-tight drop-shadow-sm">
            {currentLevel?.id} — {currentLevel?.title}
          </h3>
          <div className="flex items-center gap-2.5">
            <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.15em]">
              {activeModuleCount} modules
            </span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span className={cn("text-[10px] font-black uppercase tracking-[0.15em]", textAccent)}>
              {levelStatus}
            </span>
          </div>
        </div>
      </div>

      {/* User Credits / XP Card */}
      <div className="px-8 py-6">
        <div className="bg-white/[0.02] border border-white/[0.08] rounded-[1.5rem] p-5 flex items-center justify-between group hover:bg-white/[0.04] hover:border-white/15 transition-all cursor-default shadow-xl relative overflow-hidden">
          <div className={cn("absolute inset-y-0 left-0 w-1 opacity-50", dotAccent)} />
          <div className="flex items-center gap-4">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border transition-colors bg-highlight/10 border-highlight/20")}>
              <Coins size={22} className={textAccent} />
            </div>
            <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">Cauris WÔY</span>
               <span className="text-[9px] font-bold text-white/20">Solde actuel</span>
            </div>
          </div>
          <span className={cn("text-2xl font-mono font-black", textAccent)}>{globalCoins}</span>
        </div>
      </div>
      
      {/* Main Module List Content Area */}
      <div className="flex-1 overflow-y-auto px-8 pb-32 scrollable-sidebar flex flex-col gap-4">
        <div className="flex items-center gap-3 mb-1 px-1 mt-2">
           <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] whitespace-nowrap">Plan du cours</span>
           <div className="h-px w-full bg-white/[0.05]" />
        </div>

        {currentLevel?.subModules.map((sub, idx) => {
          const isActive = sub.id === lessonId || sub.id.split('.').pop() === lessonId.split('.').pop();
          const isLocked = currentLevel.status === 'verrouillé' && idx > 0;

          return (
            <div 
              key={sub.id} 
              className={cn(
                "p-5 rounded-[1.25rem] border transition-all flex items-center gap-5 group relative overflow-hidden", 
                isActive 
                  ? "bg-highlight/10 border-highlight/30 text-white shadow-lg shadow-highlight/15"
                  : (isLocked ? "bg-white/[0.01] border-white/5 opacity-40 pointer-events-none" : "bg-white/[0.01] border-white/5 text-white/40 hover:bg-white/[0.03] hover:border-white/10 active:scale-[0.98]")
              )}
            >
              {/* Module Icon Container */}
              <div className={cn(
                "w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500",
                isActive 
                  ? "bg-highlight/20 border-highlight/40 rotate-6"
                  : "bg-white/5 border-white/10 group-hover:bg-white/10 group-hover:border-white/20"
              )}>
                {isActive ? (
                  <BookOpen size={20} className={textAccent} />
                ) : isLocked ? (
                  <Lock size={18} className="text-white/10" />
                ) : (
                  <div className="relative">
                    <Zap size={18} className="text-white/20 group-hover:text-white/40" />
                    {sub.done && <Check size={10} className="absolute -top-1 -right-1 text-green-500 bg-black rounded-full" />}
                  </div>
                )}
              </div>

              {/* Module Info */}
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1.5 overflow-hidden">
                   <span className={cn("text-[9px] font-black uppercase tracking-[0.1em] shrink-0", isActive ? textAccent : "text-white/20")}>{sub.id}</span>
                   {sub.done && <span className="text-[7px] font-bold text-green-500 uppercase tracking-widest border border-green-500/20 px-1 rounded-sm shrink-0">Complété</span>}
                </div>
                <span className={cn("text-[13px] font-bold leading-snug tracking-tight", isActive ? "text-white" : "group-hover:text-white/70 transition-colors duration-300")}>{sub.title}</span>
                <div className="flex items-center gap-2 mt-2.5 opacity-30 group-hover:opacity-50 transition-all duration-300">
                  <Clock size={11} />
                  <span className="text-[9px] font-black uppercase font-mono tracking-tight">{sub.time}</span>
                </div>
              </div>

              {/* Action Icon / Status */}
              {isActive ? (
                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 animate-pulse-subtle shrink-0 bg-highlight shadow-highlight/40")}>
                  <Play size={18} className="fill-black text-black ml-0.5" />
                </div>
              ) : (
                <div className={cn("w-9 h-9 rounded-full border border-white/5 flex items-center justify-center transition-all shrink-0", isLocked ? "text-white/5" : "text-white/10 group-hover:text-white/40 group-hover:border-white/20 group-hover:bg-white/5")}>
                   {isLocked ? <Lock size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
