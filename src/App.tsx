import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  Swords, 
  Users, 
  User, 
  Coins, 
  Sun, 
  Moon,
  Search,
  Bell,
  Flame,
  Settings,
  Zap,
  Shield,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './utils/cn';

// Context
import { AppProvider, useAppContext } from './context/AppContext';

// Pages
import { HomeScreen } from './pages/HomeScreen';
import { CoursScreen } from './pages/CoursScreen';
import { RapportScreen } from './pages/RapportScreen';
import { LaambScreen } from './pages/LaambScreen';
import { CommunauteScreen } from './pages/CommunauteScreen';
import { ProfilScreen } from './pages/ProfilScreen';
import { AuthScreen } from './pages/AuthScreen';
import { LessonScreen } from './pages/LessonScreen';

// Common Components
import { Logo } from './components/common/Logo';

// --- Desktop Icon Sidebar ---
interface DesktopSidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ isExpanded, onToggle }) => {
  const { activeTab, setActiveTab, setCurrentLesson, userXP } = useAppContext();
  const level = Math.floor(userXP / 1000) + 1;
  const xpProgress = (userXP % 1000) / 1000 * 100;

  const navItems = [
    { id: 'accueil', icon: Home, label: 'Accueil' },
    { id: 'cours', icon: BookOpen, label: 'Cours' },
    { id: 'rapport', icon: BarChart3, label: 'Rapport' },
    { id: 'laamb', icon: Swords, label: 'LAAMB' },
    { id: 'communaute', icon: Users, label: 'Communauté' },
  ];

  return (
    <motion.aside 
      initial={false}
      animate={{ width: isExpanded ? 240 : 76 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }} 
      className="hidden lg:flex flex-col w-[76px] shrink-0 py-6 bg-sidebar rounded-l-[1.75rem] border-r border-white/[0.04] relative group/sidebar"
    >
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-12 w-6 h-6 rounded-full bg-surface border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-accent/40 transition-all z-[60] cursor-pointer shadow-xl"
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <ChevronRight size={14} />
        </motion.div>
      </button>

      {/* Logo + Level */}
      <motion.div 
        layout
        className={cn(
          "flex flex-col items-center gap-3 mb-8 transition-all duration-400",
          isExpanded ? "px-6 items-start" : "px-0"
        )}
      >
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10" />
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col whitespace-nowrap"
              >
                <span className="text-sm font-serif font-black tracking-tight text-white/90">WÔY ACADEMY</span>
                <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">SOCIÉTÉ D'ÉLITE</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Level indicator */}
        <motion.div 
          layout
          className={cn("flex flex-col gap-1.5", isExpanded ? "w-full mt-2" : "items-center")}
        >
          <div className="flex items-center justify-between w-full whitespace-nowrap">
            <span className="text-[9px] font-black text-accent uppercase tracking-[0.2em]">NIVEAU {level}</span>
            {isExpanded && <span className="text-[8px] font-mono text-white/20">{Math.round(xpProgress)}%</span>}
          </div>
          <div className={cn("bg-white/[0.06] rounded-full overflow-hidden", isExpanded ? "w-full h-1" : "w-8 h-[3px]")}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              className="h-full bg-accent/60 rounded-full shadow-[0_0_8px_rgba(var(--woy-accent-rgb),0.3)]"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Nav Icons */}
      <nav className={cn(
        "flex flex-col gap-1.5 flex-1 transition-all duration-400",
        isExpanded ? "px-3" : "items-center"
      )}>
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            layout
            onClick={() => {
              setActiveTab(item.id as any);
              setCurrentLesson(null);
            }}
            className={cn(
              "relative h-11 rounded-xl flex items-center transition-all duration-300 cursor-pointer group/item overflow-hidden",
              isExpanded ? "w-full px-3 gap-3" : "w-11 justify-center",
              activeTab === item.id
                ? "bg-accent/15 text-accent border border-accent/20"
                : "text-white/25 hover:text-white/50 hover:bg-white/[0.04]"
            )}
          >
            <item.icon size={19} className="shrink-0" strokeWidth={activeTab === item.id ? 2.2 : 1.8} />
            
            <AnimatePresence mode="wait">
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>

            {!isExpanded && (
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-surface-light border border-white/10 rounded-lg text-[10px] font-bold text-white whitespace-nowrap opacity-0 pointer-events-none group-hover/item:opacity-100 transition-opacity z-50 shadow-xl">
                {item.label}
              </div>
            )}
            
            {activeTab === item.id && (
              <motion.div
                layoutId="sidebar-active-line"
                className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-accent"
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Bottom: Settings */}
      <motion.div 
        layout
        className={cn(
          "flex flex-col gap-2 mt-auto transition-all duration-400",
          isExpanded ? "px-3" : "items-center"
        )}
      >
        <div className={cn("h-px bg-white/[0.06] mb-1", isExpanded ? "w-full" : "w-8")} />
        <motion.button
          layout
          onClick={() => {
            setActiveTab('profil');
            setCurrentLesson(null);
          }}
          className={cn(
            "h-11 rounded-xl flex items-center transition-all duration-300 cursor-pointer group/item relative overflow-hidden",
            isExpanded ? "w-full px-3 gap-3" : "w-11 justify-center",
            activeTab === 'profil'
              ? "bg-accent/15 text-accent border border-accent/20"
              : "text-white/25 hover:text-white/50 hover:bg-white/[0.04]"
          )}
        >
          <Settings size={19} className="shrink-0" strokeWidth={1.8} />
          <AnimatePresence mode="wait">
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3 }}
                className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap"
              >
                Paramètres
              </motion.span>
            )}
          </AnimatePresence>

          {!isExpanded && (
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-surface-light border border-white/10 rounded-lg text-[10px] font-bold text-white whitespace-nowrap opacity-0 pointer-events-none group-hover/item:opacity-100 transition-opacity z-50 shadow-xl">
              Paramètres
            </div>
          )}
        </motion.button>
      </motion.div>
    </motion.aside>
  );
};

// --- Desktop Top Bar ---
const TopBar = () => {
  const { theme, setTheme, globalCoins, streak, userXP, isShieldActive } = useAppContext();
  const level = Math.floor(userXP / 1000) + 1;

  return (
    <header className="flex items-center justify-between px-8 h-[72px] shrink-0 border-b border-white/[0.04]">
      {/* Left: Greeting */}
      <div className="text-left">
        <p className="text-white/30 text-[11px] font-medium tracking-wide">Bon retour parmi nous</p>
        <h1 className="text-lg font-bold text-white/90 tracking-tight leading-tight">
          Bonsoir, <span className="shimmer-gold">AMADOU</span>
        </h1>
      </div>

      {/* Center: Search */}
      <div className="hidden xl:flex items-center gap-3 bg-white/[0.03] border border-white/[0.05] rounded-xl px-4 py-2.5 w-[280px] cursor-pointer hover:bg-white/[0.05] transition-colors">
        <Search size={14} className="text-white/20" />
        <span className="text-white/15 text-[13px]">Rechercher...</span>
      </div>

      {/* Right: Stats bar */}
      <div className="flex items-center gap-2">
        {/* Streak Pill */}
        <div className="flex items-center gap-1.5 bg-orange-900/20 border border-orange-800/20 rounded-xl px-3 py-2 group cursor-default">
          <Flame size={13} className="text-orange-400/80" />
          <span className="font-mono text-[11px] font-bold text-orange-300/80">{streak}</span>
        </div>

        {/* Shield status */}
        {isShieldActive && (
          <div className="flex items-center gap-1.5 bg-accent/8 border border-accent/15 rounded-xl px-3 py-2">
            <Shield size={13} className="text-accent/70 fill-accent/10" />
          </div>
        )}

        {/* Cauris */}
        <div className="flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.05] rounded-xl px-3 py-2 cursor-default">
          <Coins size={13} className="text-highlight/70" />
          <span className="font-mono text-[11px] font-bold text-white/60">{globalCoins}</span>
        </div>

        {/* Divider */}
        <div className="w-[1px] h-6 bg-white/[0.05] mx-1" />

        {/* Bell */}
        <button className="relative w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/25 hover:text-white/50 hover:bg-white/[0.06] transition-all cursor-pointer">
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-accent rounded-full" />
        </button>

        {/* Theme */}
        <button
          onClick={() => setTheme(theme === 'violet' ? 'terracotta' : 'violet')}
          className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-white/25 hover:text-white/50 hover:bg-white/[0.06] transition-all cursor-pointer"
        >
          {theme === 'violet' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-xl overflow-hidden border-2 border-white/[0.06] cursor-pointer hover:border-accent/30 transition-all ml-1">
          <img 
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </div>
      </div>
    </header>
  );
};

// --- Main App Content ---
const AppContent = () => {
  const { 
    theme, 
    setTheme, 
    activeTab, 
    setActiveTab, 
    currentLesson, 
    setCurrentLesson, 
    globalCoins,
    userXP,
    streak
  } = useAppContext();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const themeClass = theme === 'violet' ? 'violet-theme' : 'terracotta-theme';

  if (!isAuthenticated) {
    return (
      <div className={cn("min-h-screen transition-colors duration-500 font-sans text-white selection:bg-white/20 overflow-hidden relative", themeClass)}>
        <AuthScreen onLogin={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'accueil': return <HomeScreen />;
      case 'cours': return <CoursScreen />;
      case 'rapport': return <RapportScreen />;
      case 'laamb': return <LaambScreen />;
      case 'communaute': return <CommunauteScreen />;
      case 'profil': return <ProfilScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className={cn("min-h-screen transition-colors duration-500 font-sans text-white selection:bg-white/20", themeClass)}>
      
      {/* Desktop Layout: Sidebar + Container */}
      <div className="hidden lg:flex h-screen p-3 gap-0">
        <DesktopSidebar 
          isExpanded={isSidebarExpanded} 
          onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)} 
        />

        {/* Main Container */}
        <div className="flex-1 flex flex-col bg-surface/40 rounded-r-[1.75rem] border border-white/[0.04] border-l-0 overflow-hidden panel-inset">
          <TopBar />
          
          <main className="flex-1 overflow-y-auto scrollbar-hide">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {renderActiveScreen()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderActiveScreen()}
          </motion.div>
        </AnimatePresence>

        {/* Mobile Bottom Nav */}
        <nav className="fixed bottom-0 left-0 right-0 h-[76px] bg-sidebar/95 backdrop-blur-xl border-t border-white/[0.04] flex items-center justify-around px-4 z-[60] safe-bottom">
          {[
            { id: 'accueil', icon: Home, label: 'Accueil' },
            { id: 'cours', icon: BookOpen, label: 'Cours' },
            { id: 'rapport', icon: BarChart3, label: 'Rapport' },
            { id: 'laamb', icon: Swords, label: 'LAAMB' },
            { id: 'profil', icon: User, label: 'Profil' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setCurrentLesson(null);
              }}
              className={cn(
                "relative flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all cursor-pointer",
                activeTab === tab.id 
                  ? "text-accent" 
                  : "text-white/20"
              )}
            >
              <tab.icon size={21} strokeWidth={activeTab === tab.id ? 2.2 : 1.6} />
              <span className="text-[7px] font-bold uppercase tracking-[0.15em]">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="mobile-tab-indicator"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-5 h-[2.5px] rounded-full bg-accent"
                />
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Active Lesson Modal */}
      <AnimatePresence>
        {currentLesson && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-bg"
          >
            <LessonScreen 
              lessonId={currentLesson} 
              onBack={() => setCurrentLesson(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
