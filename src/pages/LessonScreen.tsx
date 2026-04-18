import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import { cn } from '../utils/cn';
import { useAppContext } from '../context/AppContext';
import { CosmicBackground } from '../components/common/StarField';
import { Logo } from '../components/common/Logo';
import { N01Content } from '../components/lesson/N01Content';
import { N02Content } from '../components/lesson/N02Content';
import { N03Content } from '../components/lesson/N03Content';
import { LessonSidebar as DesktopSidebar } from '../components/lesson/LessonSidebar';

interface LessonScreenProps {
  lessonId: string;
  onBack: () => void;
}

export const LessonScreen: React.FC<LessonScreenProps> = ({ lessonId, onBack }) => {
  const { globalCoins, setGlobalCoins, theme } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const themeClass = theme === 'violet' ? 'violet-theme' : 'terracotta-theme';
  
  const colors = {
    glowPrimary: theme === 'violet' ? 'bg-[#9D4EDD]' : 'bg-[#E07A5F]',
    glowSecondary: theme === 'violet' ? 'bg-[#7B2CBF]' : 'bg-[#3D405B]',
    bg: theme === 'violet' ? 'bg-[#0f0a1c]' : 'bg-[#1a1110]',
  };

  const SidebarBackdrop = () => (
    <div 
      className={cn(
        "fixed inset-0 bg-black/60 backdrop-blur-sm z-[85] lg:hidden transition-opacity duration-300",
        isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={() => setIsSidebarOpen(false)}
    />
  );

  return (
    <div className={cn("fixed inset-0 z-[100]", colors.bg, "overflow-hidden flex", themeClass)}>
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <CosmicBackground />
        {/* Edge-to-edge nebula glows for narrative view - Increased for vibrance */}
        <div className={cn("absolute -top-[10%] left-[-10%] w-[90%] h-[70%] blur-[180px] opacity-35 rounded-full transition-all duration-1000 animate-cosmic-drift", colors.glowPrimary)} />
        <div className={cn("absolute top-[20%] right-[-15%] w-[80%] h-[70%] blur-[160px] opacity-30 rounded-full transition-all duration-1000 animate-pulse-glow delay-700", colors.glowSecondary)} />
      </div>
      <div className={cn("absolute inset-0 transition-colors duration-1000 bg-black/15 backdrop-blur-sm z-0")} />
      
      <div className="relative z-[100] flex w-full h-full overflow-hidden">
        <SidebarBackdrop />
        <DesktopSidebar lessonId={lessonId} onBack={onBack} isOpen={isSidebarOpen} />
        
        <div className="flex-1 overflow-y-auto relative flex flex-col">
          <header className="lg:hidden p-4 flex justify-between items-center bg-black/20 backdrop-blur-md safe-top border-b border-white/5 relative z-[80]">
             <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-white/50 hover:text-white transition-colors">
                <BookOpen size={20} />
             </button>
             <Logo />
          </header>
          <div className="flex-1 overflow-y-auto">
            {lessonId === 'N0.2' ? (
              <N02Content
                currentCoins={globalCoins}
                onUpdateCoins={(val) => setGlobalCoins(val)}
                onBack={onBack}
                onComplete={(xpReward, caurisReward) => {
                  setGlobalCoins(prev => prev + Math.floor(caurisReward / 2));
                  onBack();
                }}
              />
            ) : lessonId === 'N0.3' ? (
              <N03Content
                currentCoins={globalCoins}
                onUpdateCoins={(val) => setGlobalCoins(val)}
                onBack={onBack}
                onComplete={(xpReward, caurisReward) => {
                  setGlobalCoins(prev => prev + Math.floor(caurisReward / 2));
                  onBack();
                }}
              />
            ) : (
              <N01Content
                currentCoins={globalCoins}
                onUpdateCoins={(val) => setGlobalCoins(val)}
                onBack={onBack}
                onComplete={(xpReward, caurisReward) => {
                  setGlobalCoins(prev => prev + Math.floor(caurisReward / 2));
                  onBack();
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
