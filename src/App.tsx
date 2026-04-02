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
  Bell
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
import { StarField } from './components/common/StarField';

const AppContent = () => {
  const { 
    theme, 
    setTheme, 
    activeTab, 
    setActiveTab, 
    currentLesson, 
    setCurrentLesson, 
    globalCoins 
  } = useAppContext();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Theme-aware helper classes using semantic variables
  const colors = {
    bg: 'bg-black/95',
    textAccent: 'text-accent',
    textHighlight: 'text-highlight',
    glowPrimary: 'bg-accent',
    glowSecondary: theme === 'violet' ? 'bg-highlight' : 'bg-accent-light',
  };

  const themeClass = theme === 'violet' ? 'violet-theme' : 'terracotta-theme';

  const GlobalBackground = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <StarField />
      
      {/* Primary Nebula Glows - Spanned for edge vibrancy but with reduced opacity */}
      <div className={cn("absolute -top-[15%] left-[-10%] w-[90%] h-[80%] blur-[180px] opacity-20 rounded-full transition-all duration-1000 animate-cosmic-drift", colors.glowPrimary)} />
      <div className={cn("absolute top-[20%] right-[-15%] w-[85%] h-[75%] blur-[160px] opacity-15 rounded-full transition-all duration-1000 animate-pulse-glow delay-700", colors.glowSecondary)} />
      
      {/* Secondary Balancing Glows */}
      <div className={cn("absolute bottom-[-15%] left-[-5%] w-[75%] h-[65%] blur-[170px] opacity-15 rounded-full transition-all duration-1000 animate-cosmic-drift delay-1000", colors.glowPrimary)} />
      <div className={cn("absolute top-[40%] left-[20%] w-[60%] h-[60%] blur-[200px] opacity-12 rounded-full transition-all duration-1000 animate-pulse-glow delay-500", colors.glowSecondary)} />
      <div className={cn("absolute bottom-[10%] right-[5%] w-[70%] h-[60%] blur-[160px] opacity-15 rounded-full transition-all duration-1000 animate-cosmic-drift delay-1500", colors.glowPrimary)} />

      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.04] mix-blend-overlay pointer-events-none" />
      
      {/* Light Ambient Depth - Subtle vignette to focus the center */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15 pointer-events-none" />
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className={cn("min-h-screen transition-colors duration-700 font-sans text-white selection:bg-white/20 overflow-hidden relative", colors.bg, themeClass)}>
        <GlobalBackground />
        <AuthScreen onLogin={() => setIsAuthenticated(true)} />
      </div>
    );
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'accueil':
        return <HomeScreen />;
      case 'cours':
        return <CoursScreen />;
      case 'rapport':
        return <RapportScreen />;
      case 'laamb':
        return <LaambScreen />;
      case 'communaute':
        return <CommunauteScreen />;
      case 'profil':
        return <ProfilScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className={cn("min-h-screen transition-colors duration-700 font-sans text-white selection:bg-white/20", colors.bg, themeClass)}>
      {/* Global Cosmic Background Stack */}
      <GlobalBackground />

      {/* Desktop Header */}
      <header className="hidden lg:flex relative z-50 border-b border-white/5 backdrop-blur-xl bg-black/20 px-8 py-4 justify-between items-center sticky top-0">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <Logo />
            <h1 className="font-serif text-xl tracking-[0.2em] font-bold uppercase">
              WÔY <span className={colors.textAccent}>ACADEMY</span>
            </h1>
          </div>

          {/* Desktop Nav Links */}
          <nav className="flex items-center gap-1">
            {[
              { id: 'accueil', icon: Home, label: 'Accueil' },
              { id: 'cours', icon: BookOpen, label: 'Cours' },
              { id: 'rapport', icon: BarChart3, label: 'Rapport' },
              { id: 'laamb', icon: Swords, label: 'LAAMB' },
              { id: 'communaute', icon: Users, label: 'Communauté' },
              { id: 'profil', icon: User, label: 'Profil' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setCurrentLesson(null);
                }}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer",
                  activeTab === tab.id
                    ? "bg-white/[0.08] text-accent font-bold"
                    : "text-white/40 hover:text-accent hover:bg-accent/5"
                )}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="desktop-nav-indicator"
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-accent shadow-[0_0_8px_var(--woy-accent-glow)]"
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 cursor-pointer hover:bg-white/10 transition-all">
            <Coins size={16} className="text-highlight" />
            <span className="font-mono text-sm font-bold tracking-tighter">{globalCoins}</span>
          </div>
          <button
            onClick={() => setTheme(theme === 'violet' ? 'terracotta' : 'violet')}
            className="p-2 rounded-full bg-white/5 border border-white/10 hover:scale-105 transition-transform cursor-pointer"
          >
            {theme === 'violet' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="relative cursor-pointer group">
             <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden transition-all group-hover:border-white/30">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Profile" className="w-full h-full object-crop" />
             </div>
             <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative min-h-[calc(100vh-140px)] lg:min-h-min">
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
      </main>

      {/* Mobile Nav Bar */}
      <nav className="lg:hidden fixed bottom-6 left-5 right-5 h-[72px] bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] flex items-center justify-between px-6 z-[60] shadow-2xl">
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
              "relative flex flex-col items-center gap-1.5 transition-all text-[9px] font-bold uppercase tracking-widest",
              activeTab === tab.id ? colors.textAccent : "text-white/20"
            )}
          >
            <tab.icon size={20} />
            {activeTab === tab.id && (
              <motion.div
                layoutId="mobile-nav-indicator"
                className="absolute -top-3 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_5px_var(--woy-accent-glow)]"
              />
            )}
          </button>
        ))}
      </nav>

      {/* Active Lesson Modal / Screen */}
      <AnimatePresence>
        {currentLesson && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn("fixed inset-0 z-[100]", colors.bg)}
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
