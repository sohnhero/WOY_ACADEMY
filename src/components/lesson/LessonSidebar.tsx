import React, { useMemo } from 'react';
import { 
  ChevronLeft, 
  BookOpen, 
  Lock, 
  Zap, 
  Check, 
  Clock, 
  Play,
  Coins,
  Wallet,
  TrendingUp,
  Globe,
  ArrowRightLeft,
  Smartphone,
  ShieldAlert,
  BarChart3
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAppContext } from '../../context/AppContext';
import { niveaux } from '../../data/niveaux';

interface LessonSidebarProps {
  lessonId: string;
  onBack: () => void;
  isOpen?: boolean;
}

export const LessonSidebar: React.FC<LessonSidebarProps> = ({ lessonId, onBack, isOpen = false }) => {
  const { 
    theme, 
    globalCoins, 
    setActiveTab 
  } = useAppContext();

  const currentLevel = useMemo(() => {
    const normalizedId = lessonId.startsWith('N') ? lessonId : `N${lessonId}`;
    return niveaux.find(n => n.subModules.some(sm => 
      sm.id === normalizedId || 
      sm.id === lessonId || 
      sm.id.split('.').pop() === lessonId.split('.').pop()
    ));
  }, [lessonId]);

  const activeModuleCount = currentLevel?.totalModules || currentLevel?.subModules.length || 0;
  const levelStatus = currentLevel?.badge || 'GRATUIT';

  const getModuleIcon = (title: string, id: string) => {
    const t = title.toLowerCase();
    if (t.includes('argent') || t.includes('wallet')) return Wallet;
    if (t.includes('marché')) return BarChart3;
    if (t.includes('blockchain')) return Zap;
    if (t.includes('crypto')) return Globe;
    if (t.includes('afrique')) return Globe;
    if (t.includes('cauris')) return Coins;
    if (t.includes('inflation')) return TrendingUp;
    if (t.includes('western union')) return ArrowRightLeft;
    if (t.includes('mobile money')) return Smartphone;
    if (t.includes('risques')) return ShieldAlert;
    return BookOpen;
  };

  return (
    <aside className={cn(
      "fixed lg:relative inset-y-0 left-0 z-[100] lg:z-[75] flex flex-col gap-0 border-r border-white/5 h-full w-[310px] sm:w-[330px] shrink-0 scrollable-sidebar transition-all duration-500 ease-out bg-[#0D0A07] shadow-2xl lg:shadow-none",
      isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
    )}>
      {/* Return Button */}
      <div className="px-8 pt-8 pb-4 safe-top">
        <button 
          onClick={() => {
            setActiveTab('cours');
            onBack();
          }}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-highlight transition-colors cursor-pointer group"
        >
          <ChevronLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
          <span>Retour au site</span>
        </button>
      </div>

      {/* Header section with level name */}
      <div className="px-8 py-4 flex flex-col gap-1.5">
        <h3 className="text-xl font-serif font-black text-white uppercase leading-tight tracking-wide">
          {currentLevel?.id} — {currentLevel?.title}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.1em]">
            {activeModuleCount} modules
          </span>
          <span className="w-1 h-1 rounded-full bg-white/10" />
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.1em]">
            {levelStatus}
          </span>
        </div>
      </div>

      {/* User Credits Card (Simplified like screenshot) */}
      <div className="px-8 py-6">
        <div className="bg-[#151210] border border-white/5 rounded-2xl p-4 flex items-center justify-between shadow-xl">
          <div className="flex items-center gap-3">
             <div className="w-9 h-9 rounded-xl bg-highlight/10 flex items-center justify-center border border-highlight/20 text-highlight">
                <Coins size={18} />
             </div>
             <span className="text-[11px] font-black uppercase tracking-widest text-white/60">Cauris WÔY</span>
          </div>
          <span className="text-2xl font-serif font-black text-highlight">{globalCoins}</span>
        </div>
      </div>
      
      {/* Main Module List Content Area */}
      <div className="flex-1 overflow-y-auto px-6 pb-32 scrollable-sidebar flex flex-col gap-1 mt-2">
        {currentLevel?.subModules.map((sub, idx) => {
          const isActive = sub.id === lessonId || sub.id.split('.').pop() === lessonId.split('.').pop();
          const isLocked = currentLevel.status === 'verrouillé' && idx > 0;
          const Icon = getModuleIcon(sub.title, sub.id);

          return (
            <div 
              key={sub.id} 
              className={cn(
                "p-4 rounded-xl flex items-center gap-4 transition-all group relative cursor-pointer", 
                isActive 
                  ? "bg-[#1A1612] border border-white/10"
                  : (isLocked ? "opacity-30 pointer-events-none" : "hover:bg-white/[0.02] border border-transparent")
              )}
            >
              {/* Module Icon Container */}
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all",
                isActive 
                  ? "bg-highlight/20 text-highlight"
                  : "bg-[#151210] text-white/20 group-hover:text-white/40"
              )}>
                {isLocked ? <Lock size={16} /> : <Icon size={18} />}
              </div>

              {/* Module Info */}
              <div className="flex flex-col min-w-0 flex-1">
                <span className={cn("text-[8px] font-black uppercase tracking-widest leading-none mb-1", isActive ? "text-highlight" : "text-white/20")}>{sub.id}</span>
                <span className={cn("text-[12px] font-bold leading-snug tracking-tight", isActive ? "text-white" : "text-white/40 group-hover:text-white/60 transition-colors")}>{sub.title}</span>
                <div className="flex items-center gap-2 mt-1.5 opacity-20 group-hover:opacity-40 transition-all">
                  <Clock size={10} />
                  <span className="text-[8px] font-bold uppercase tracking-tighter">{sub.time}</span>
                </div>
              </div>

              {/* Action Indicator */}
              {isActive && (
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0 shadow-lg shadow-accent/20">
                  <Play size={14} className="fill-black text-black ml-0.5" />
                </div>
              )}
              {isLocked && <Lock size={14} className="text-white/5" />}
            </div>
          );
        })}
      </div>
    </aside>
  );
};
