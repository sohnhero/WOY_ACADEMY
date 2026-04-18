import React, { useRef, useState, useEffect } from 'react';
import {
  Lock,
  Star,
  GripHorizontal,
  ChevronRight,
  ChevronLeft,
  Check,
  Play,
  ArrowRight,
  Target,
  Zap,
  Shield,
  Layers
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { cn } from '../utils/cn';
import { useAppContext } from '../context/AppContext';
import { CosmicBackground } from '../components/common/StarField';

// ─── Data ────────────────────────────────────────────────────────────────────
type ModuleStatus = 'complété' | 'en cours' | 'verrouillé';
interface RoadModule {
  id: string;
  label: string;
  title: string;
  status: ModuleStatus;
  xp?: number;
  x: number;
  y: number;
  dir: 'up' | 'down';
  category?: string;
}

const ROADMAP_MODULES: RoadModule[] = [
  { id: 'N0.1', label: '01', title: "C'est quoi l'argent", status: 'complété', xp: 100, x: 150, y: 470, dir: 'down', category: 'FONDATIONS' },
  { id: 'N0.2', label: '02', title: 'Marché financier', status: 'complété', xp: 150, x: 400, y: 230, dir: 'up', category: 'ÉCONOMIE' },
  { id: 'N0.3', label: '03', title: 'Blockchain', status: 'en cours', xp: 200, x: 650, y: 470, dir: 'down', category: 'TECHNOLOGIE' },
  { id: 'N0.4', label: '04', title: "C'est quoi la crypto", status: 'verrouillé', xp: 175, x: 900, y: 230, dir: 'up', category: 'ACTIFS' },
  { id: 'N0.5', label: '05', title: "Pourquoi l'Afrique", status: 'verrouillé', x: 1150, y: 470, dir: 'down', category: 'CONTEXTE' },
  { id: 'N0.6', label: '06', title: 'Cauris au FCFA', status: 'verrouillé', x: 1400, y: 230, dir: 'up', category: 'HISTOIRE' },
  { id: 'N0.7', label: '07', title: 'Inflation', status: 'verrouillé', x: 1650, y: 470, dir: 'down', category: 'RISQUES' },
  { id: 'N0.8', label: '08', title: 'Western Union vs crypto', status: 'verrouillé', x: 1900, y: 230, dir: 'up', category: 'TRANSFERT' },
  { id: 'N0.9', label: '09', title: 'Mobile Money vs crypto', status: 'verrouillé', x: 2150, y: 470, dir: 'down', category: 'ÉCOSYSTÈME' },
  { id: 'N0.10', label: '10', title: 'Comprendre les risques', status: 'verrouillé', x: 2400, y: 230, dir: 'up', category: 'SÉCURITÉ' },
];

const MAP_W = 2900;
const MAP_H = 700;

const PATH = `
  M -50 470 L 150 470
  C 275 470, 275 230, 400 230
  C 525 230, 525 470, 650 470
  C 775 470, 775 230, 900 230
  C 1025 230, 1025 470, 1150 470
  C 1275 470, 1275 230, 1400 230
  C 1525 230, 1525 470, 1650 470
  C 1775 470, 1775 230, 1900 230
  C 2025 230, 2025 470, 2150 470
  C 2275 470, 2275 230, 2400 230
  C 2525 230, 2525 350, 2650 350
`.replace(/\n/g, ' ').trim();

const GATE_X = 2650;
const GATE_Y = 350;

// ─── Sub-Components ───────────────────────────────────────────────────────────

const TacticalBadge = ({ label, value, icon: Icon }: any) => (
  <div className="flex flex-col items-start gap-1">
    <div className="flex items-center gap-1.5">
      {Icon && <Icon size={10} className="text-accent/60" />}
      <span className="text-[8px] text-white/30 uppercase tracking-[0.3em] font-black">{label}</span>
    </div>
    <span className="text-[15px] font-mono font-black text-white leading-none uppercase">{value}</span>
  </div>
);

const StationNode: React.FC<{ mod: RoadModule; onClick: () => void }> = ({ mod, onClick }) => {
  const done = mod.status === 'complété';
  const active = mod.status === 'en cours';
  const locked = mod.status === 'verrouillé';
  const isUp = mod.dir === 'up';

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
      style={{ left: mod.x, top: mod.y }}
    >
      {/* ── Holographic Label Card ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
        style={isUp ? { bottom: 70 } : { top: 70 }}
      >
        {isUp && <LabelCard mod={mod} />}
        <div className={cn("w-px h-8 transition-colors duration-700", active ? "bg-accent/40" : "bg-white/10")} />
        {!isUp && <LabelCard mod={mod} />}
      </div>

      {/* ── Interstellar Gateway Node ── */}
      <button
        onClick={onClick}
        disabled={locked}
        className={cn(
          "relative group transition-all duration-500",
          !locked ? "cursor-pointer" : "cursor-default"
        )}
      >
        {/* Holographic Concentric Rings */}
        <div className={cn(
          "absolute inset-[-12px] rounded-full border transition-all duration-700",
          active ? "border-accent/40 scale-100 opacity-100 animate-[spin_10s_linear_infinite]" : "border-white/5 scale-75 opacity-0"
        )} />
        <div className={cn(
          "absolute inset-[-6px] rounded-full border transition-all duration-700",
          active ? "border-accent/20 scale-100 opacity-60 animate-[spin_15s_linear_reverse_infinite]" : "border-white/5 scale-75 opacity-0"
        )} />

        {/* Node Body: High-End Artifact Style */}
        <div
          className={cn(
            "relative w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-500 backdrop-blur-2xl overflow-hidden",
            done && "bg-surface/60 border-accent/20",
            active && "bg-surface border-accent shadow-[0_0_30px_rgba(var(--woy-accent-rgb),0.3)] scale-110",
            locked && "bg-surface/20 border-white/5"
          )}
        >
          {/* Inner pulse for active node */}
          {active && <div className="absolute inset-0 bg-accent/10 animate-pulse" />}
          
          <div className="relative z-10">
            {done && <Check size={22} strokeWidth={3} className="text-accent" />}
            {active && <Play size={20} className="text-accent fill-accent ml-1" />}
            {locked && <Lock size={18} className="text-white/10" />}
          </div>
        </div>

        {/* Tactical XP Chip */}
        {mod.xp && !locked && (
          <div className={cn(
             "absolute -bottom-4 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md border text-[8px] font-black font-mono tracking-widest whitespace-nowrap transition-colors duration-500",
             done ? "bg-bg/80 border-white/10 text-white/40" : "bg-accent border-accent text-white shadow-lg"
          )}>
             {mod.xp} XP
          </div>
        )}
      </button>
    </div>
  );
};

const LabelCard = ({ mod }: { mod: RoadModule }) => {
  const done = mod.status === 'complété';
  const active = mod.status === 'en cours';
  const locked = mod.status === 'verrouillé';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "min-w-[140px] px-4 py-3 rounded-2xl border backdrop-blur-3xl transition-all duration-700 flex flex-col items-start text-left gap-1",
        done && "bg-surface/40 border-white/5",
        active && "bg-surface/80 border-accent/30 shadow-2xl",
        locked && "bg-surface/10 border-white/[0.02]"
      )}
    >
      <div className="flex items-center justify-between w-full mb-1">
        <span className={cn(
          "text-[8px] font-mono tracking-[0.3em] font-black",
          active ? "text-accent" : "text-white/30"
        )}>
          {mod.category || `MODULE ${mod.label}`}
        </span>
        {done && <Check size={10} className="text-accent/60" />}
      </div>
      <h3 className={cn(
        "text-[13px] font-serif font-black leading-none tracking-wide uppercase flex gap-1.5",
        locked ? "text-white/20" : "text-white"
      )}>
        <span className={cn(active ? "text-accent" : "text-white/40")}>{mod.id}</span>
        <span>{mod.title}</span>
      </h3>
      {active && (
        <div className="mt-2 w-full h-0.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '40%' }}
            className="h-full bg-accent"
          />
        </div>
      )}
    </motion.div>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
export const CoursScreen = () => {
  const { theme, setCurrentLesson } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollX } = useScroll({ container: containerRef });

  // Parallax calculations for background depth
  const bgX = useTransform(scrollX, [0, MAP_W], [0, -400]);

  const completedCount = ROADMAP_MODULES.filter(m => m.status === 'complété').length;
  const progress = Math.round((completedCount / ROADMAP_MODULES.length) * 100);

  // Path progression logic
  const activeX = ROADMAP_MODULES.find(m => m.status === 'en cours')?.x ?? 0;
  const activePct = ((activeX - (-50)) / (GATE_X - (-50))) * 100;

  const scroll = (dir: 'left' | 'right') => {
    containerRef.current?.scrollBy({ left: dir === 'left' ? -420 : 420, behavior: 'smooth' });
  };

  return (
    <div className={cn("relative w-full h-[calc(100vh-100px)] overflow-hidden flex flex-col text-white transition-colors duration-1000", theme === 'violet' ? 'violet-theme' : 'terracotta-theme')}>
      
      {/* ══ INTERSTELLAR FOUNDATION ═════════════════════════════════════════ */}
      <CosmicBackground />
      
      {/* ══ HEADER (TACTICAL OVERLAY) ═══════════════════════════════════════ */}
      <header className="relative h-24 lg:h-28 z-40 flex items-center justify-between px-8 lg:px-12 bg-bg/40 backdrop-blur-3xl border-b border-white/[0.05] shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2 mb-1">
               <span className="text-[10px] font-black text-accent tracking-[0.4em] uppercase">Secteur Alpha</span>
               <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-serif font-black text-white leading-none uppercase tracking-tight">
              L'argent et les marchés
            </h1>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-10">
          <TacticalBadge label="XP DISPONIBLE" value="+1500 XP" icon={Star} />
          <div className="w-px h-8 bg-white/10" />
          <TacticalBadge label="NODES EXPLORÉS" value={`${completedCount} / ${ROADMAP_MODULES.length}`} icon={Layers} />
          <div className="w-px h-8 bg-white/10" />
          
          <div className="flex flex-col gap-2 w-56">
            <div className="flex justify-between items-end mb-1">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">Progression Globale</span>
              <span className="text-sm font-mono font-black text-accent">{progress}%</span>
            </div>
            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-accent shadow-[0_0_10px_rgba(var(--woy-accent-rgb),0.5)]"
              />
            </div>
          </div>
        </div>
      </header>

      {/* ══ INTERSTELLAR CORRIDOR CANVAS ═════════════════════════════════════ */}
      <main
        ref={containerRef}
        className="relative flex-1 overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing scrollbar-hide select-none"
      >
        <motion.div
          className="relative flex items-center justify-start h-full"
          style={{ minWidth: MAP_W, width: MAP_W, x: bgX }}
        >
          {/* ── Energy Filaments SVG Path ── */}
          <svg
            width={MAP_W}
            height={MAP_H}
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            <defs>
              <linearGradient id="beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--woy-accent)" stopOpacity="0.4" />
                <stop offset={`${activePct}%`} stopColor="var(--woy-accent)" stopOpacity="0.8" />
                <stop offset={`${activePct+2}%`} stopColor="var(--woy-highlight)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="var(--woy-highlight)" stopOpacity="0.05" />
              </linearGradient>

              <filter id="energy-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Path Layer 1: Outer Atmosphere (Wide Glow) */}
            <path d={PATH} fill="none" stroke="var(--woy-accent)" strokeWidth="120" strokeOpacity="0.04" strokeLinecap="round" filter="blur(30px)" />
            <path d={PATH} fill="none" stroke="var(--woy-accent)" strokeWidth="60" strokeOpacity="0.06" strokeLinecap="round" filter="blur(15px)" />
            
            {/* Path Layer 3: Main Energy Tunnel */}
            <path d={PATH} fill="none" stroke="var(--woy-surface-light)" strokeWidth="80" strokeOpacity="0.1" strokeLinecap="round" />
            <path d={PATH} fill="none" stroke="var(--woy-surface-light)" strokeWidth="40" strokeOpacity="0.2" strokeLinecap="round" />
            
            {/* Path Layer 2: Magnetic Field (Dashed Filaments) */}
            <path d={PATH} fill="none" stroke="url(#beam-grad)" strokeWidth="4" strokeDasharray="1 16" strokeOpacity="0.4" strokeLinecap="round" />
            
            {/* Path Layer 4: The Core Beam (Digital Pulse) */}
            <path d={PATH} fill="none" stroke="url(#beam-grad)" strokeWidth="3" strokeLinecap="round" className="drop-shadow-[0_0_12px_var(--woy-accent-glow)]" />
            <path d={PATH} fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round" />

            {/* Path Layer 5: Traveling Data Pulses */}
            <path
              d={PATH}
              fill="none"
              stroke="var(--woy-accent)"
              strokeWidth="6"
              strokeDasharray="4 200"
              strokeLinecap="round"
              className="animate-energy-pulse opacity-60"
            />
          </svg>

          {/* ── Interactive Gate Nodes ── */}
          <div 
            className="absolute inset-x-0 top-1/2 -translate-y-1/2"
            style={{ height: MAP_H }}
          >
            {ROADMAP_MODULES.map(mod => (
              <StationNode
                key={mod.id}
                mod={mod}
                onClick={() => setCurrentLesson(mod.id)}
              />
            ))}

            {/* ── Next Quadrant Gate ── */}
            <div
              className="absolute -translate-x-1/2 flex flex-col items-center gap-4"
              style={{ left: GATE_X, top: GATE_Y }}
            >
              <div className="relative">
                <div className="absolute inset-[-15px] border border-highlight/20 rounded-full animate-spin [animation-duration:20s]" />
                <button className="w-20 h-20 rounded-full bg-surface/50 border border-highlight/30 flex items-center justify-center text-highlight hover:bg-highlight/10 transition-all group cursor-pointer shadow-2xl backdrop-blur-xl">
                  <ArrowRight size={32} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Secteur Suivant</span>
                <span className="text-xl font-serif font-black text-white uppercase tracking-tighter">Sécurité</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* ══ NAV ARROWS ═══════════════════════════════════════════════════════ */}
      {(['left', 'right'] as const).map(dir => (
        <button
          key={dir}
          onClick={() => scroll(dir)}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 z-50 hidden md:flex w-14 h-14 rounded-2xl bg-bg/40 backdrop-blur-xl border border-white/5 items-center justify-center text-white/30 hover:text-white hover:border-accent/40 transition-all active:scale-90",
            dir === 'left' ? 'left-8' : 'right-8'
          )}
        >
          {dir === 'left' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
        </button>
      ))}

    </div>
  );
};
