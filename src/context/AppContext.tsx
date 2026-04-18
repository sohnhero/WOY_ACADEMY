import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, TabType } from '../types';

interface AppContextType {
  // Navigation & UI
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;

  // User Stats
  globalCoins: number;
  setGlobalCoins: (coins: number | ((prev: number) => number)) => void;
  userXP: number;
  setUserXP: (xp: number | ((prev: number) => number)) => void;
  streak: number;
  setStreak: (streak: number) => void;
  n1Modules: number;
  setN1Modules: (count: number) => void;
  isShieldActive: boolean;
  handleActivateShield: () => void;

  // Data
  niveaux: any[];

  // Lesson State
  currentLesson: string | null;
  setCurrentLesson: (id: string | null) => void;
  showingLesson: boolean;
  setShowingLesson: (showing: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

import { niveaux as initialNiveaux } from '../data/niveaux';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage
  const loadState = <T,>(key: string, defaultValue: T): T => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch (e) {
      console.warn(`Error loading state for key "${key}":`, e);
      return defaultValue;
    }
  };

  const [activeTab, setActiveTab] = useState<TabType>('accueil');
  const [theme, setTheme] = useState<Theme>(() => loadState('theme', 'terracotta'));

  const [globalCoins, _setGlobalCoins] = useState<number>(() => {
    const savedCoins = loadState('globalCoins', 175);
    return Math.floor(typeof savedCoins === 'number' ? savedCoins : 175);
  });

  const setGlobalCoins = (coins: number | ((prev: number) => number)) => {
    _setGlobalCoins(prev => Math.floor(typeof coins === 'function' ? coins(prev) : coins));
  };
  const [userXP, setUserXP] = useState<number>(() => loadState('userXP', 1450));
  const [streak, setStreak] = useState<number>(() => loadState('streak', 12));
  const [n1Modules, setN1Modules] = useState<number>(() => loadState('n1Modules', 3));
  const [isShieldActive, setIsShieldActive] = useState<boolean>(() => loadState('isShieldActive', false));

  const [niveaux] = useState(initialNiveaux);
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  const [showingLesson, setShowLesson] = useState(false);

  const handleActivateShield = () => {
    if (!isShieldActive && globalCoins >= 50) {
      setGlobalCoins(prev => prev - 50);
      setIsShieldActive(true);
    }
  };

  // Sync with localStorage and apply global theme class
  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme));

    // Apply theme class to document element for global CSS variable availability
    const root = window.document.documentElement;
    root.classList.remove('terracotta-theme', 'violet-theme');
    root.classList.add(`${theme}-theme`);

    localStorage.setItem('globalCoins', JSON.stringify(globalCoins));
    localStorage.setItem('userXP', JSON.stringify(userXP));
    localStorage.setItem('streak', JSON.stringify(streak));
    localStorage.setItem('n1Modules', JSON.stringify(n1Modules));
    localStorage.setItem('isShieldActive', JSON.stringify(isShieldActive));
  }, [theme, globalCoins, userXP, streak, n1Modules, isShieldActive]);

  const setShowingLesson = (showing: boolean) => {
    setShowLesson(showing);
    if (!showing) {
      setCurrentLesson(null);
    }
  };

  const value: AppContextType = {
    activeTab,
    setActiveTab,
    theme,
    setTheme,
    globalCoins,
    setGlobalCoins,
    userXP,
    setUserXP,
    streak,
    setStreak,
    n1Modules,
    setN1Modules,
    isShieldActive,
    handleActivateShield,
    niveaux,
    currentLesson,
    setCurrentLesson,
    showingLesson,
    setShowingLesson,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

