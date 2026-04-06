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
  Shield
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
const DesktopSidebar = () => {
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
    <aside className="hidden lg:flex flex-col items-center w-[76px] shrink-0 py-6 gap-2 bg-sidebar rounded-l-[1.75rem] border-r border-white/[0.04]">
      {/* Logo + Level */}
      <div className="flex flex-col items-center gap-3 mb-6">
        <Logo className="w-10 h-10" />
        {/* Level indicator */}
        <div className="flex flex-col items-center gap-1">
          <span className="text-[8px] font-black text-accent uppercase tracking-[0.2em]">LVL {level}</span>
          <div className="w-8 h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              className="h-full bg-accent/60 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Nav Icons */}
      <nav className="flex flex-col items-center gap-1.5 flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id as any);
              setCurrentLesson(null);
            }}
            className={cn(
              "relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer group",
              activeTab === item.id
                ? "bg-accent/15 text-accent border border-accent/20"
                : "text-white/25 hover:text-white/50 hover:bg-white/[0.04]"
            )}
            title={item.label}
          >
            <item.icon size={19} strokeWidth={activeTab === item.id ? 2.2 : 1.8} />
            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-3 py-1.5 bg-surface-light border border-white/10 rounded-lg text-[10px] font-bold text-white whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 shadow-xl">
              {item.label}
            </div>
            {/* Active indicator line */}
            {activeTab === item.id && (
              <motion.div
                layoutId="sidebar-active-line"
                className="absolute -left-[1px] top-2 bottom-2 w-[3px] rounded-r-full bg-accent"
              />
            )}
          </button>
        ))}
      </nav>

      {/* Bottom: Settings */}
      <div className="flex flex-col items-center gap-2 mt-auto">
        <div className="w-8 h-[1px] bg-white/[0.06] mb-1" />
        <button
          onClick={() => {
            setActiveTab('profil');
            setCurrentLesson(null);
          }}
          className={cn(
            "w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer",
            activeTab === 'profil'
              ? "bg-accent/15 text-accent border border-accent/20"
              : "text-white/25 hover:text-white/50 hover:bg-white/[0.04]"
          )}
          title="Profil & Réglages"
        >
          <Settings size={19} strokeWidth={1.8} />
        </button>
      </div>
    </aside>
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
        <DesktopSidebar />

        {/* Main Container */}
        <div className="flex-1 flex flex-col bg-surface/40 rounded-r-[1.75rem] border border-white/[0.04] border-l-0 overflow-hidden panel-inset">
          <TopBar />
          
          <main className="flex-1 overflow-y-auto">
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
