import React, { useRef } from 'react';
import {
  Lock,
  Star,
  GripHorizontal,
  ChevronRight,
  ChevronLeft,
  Check,
  Play,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';
import { useAppContext } from '../context/AppContext';

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
}

const ROADMAP_MODULES: RoadModule[] = [
  { id: '1.1', label: '01', title: "C'est quoi l'argent", status: 'complété', xp: 100, x: 150, y: 470, dir: 'down' },
  { id: '1.2', label: '02', title: 'Marché financier', status: 'complété', xp: 150, x: 400, y: 230, dir: 'up' },
  { id: '1.3', label: '03', title: 'Blockchain', status: 'complété', xp: 200, x: 650, y: 470, dir: 'down' },
  { id: '1.4', label: '04', title: "C'est quoi la crypto", status: 'en cours', xp: 175, x: 900, y: 230, dir: 'up' },
  { id: '1.5', label: '05', title: "Pourquoi l'Afrique", status: 'verrouillé', x: 1150, y: 470, dir: 'down' },
  { id: '1.6', label: '06', title: 'Cauris au FCFA', status: 'verrouillé', x: 1400, y: 230, dir: 'up' },
  { id: '1.7', label: '07', title: 'Inflation', status: 'verrouillé', x: 1650, y: 470, dir: 'down' },
  { id: '1.8', label: '08', title: 'Western Union vs crypto', status: 'verrouillé', x: 1900, y: 230, dir: 'up' },
  { id: '1.9', label: '09', title: 'Mobile Money vs crypto', status: 'verrouillé', x: 2150, y: 470, dir: 'down' },
  { id: '1.10', label: '10', title: 'Comprendre les risques', status: 'verrouillé', x: 2400, y: 230, dir: 'up' },
];

// ─── Constants ───────────────────────────────────────────────────────────────
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

/** Header stat column */
const Stat = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex flex-col items-end gap-1">
    <span className="text-[9px] text-white/35 uppercase tracking-[0.25em] font-mono">{label}</span>
    <span className="text-[17px] font-mono font-semibold text-white/85 leading-none">{value}</span>
  </div>
);

/** Station node — sits exactly on the road center */
const StationNode = ({
  mod,
  onClick,
}: {
  mod: RoadModule;
  onClick: () => void;
}) => {
  const done = mod.status === 'complété';
  const active = mod.status === 'en cours';
  const locked = mod.status === 'verrouillé';
  const isUp = mod.dir === 'up';

  // Label card floats 64px above or below the node center
  const cardOffset = 64;
  const stemH = 32;

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
      style={{ left: mod.x, top: mod.y }}
    >
      {/* ── Label card ── */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
        style={isUp ? { bottom: cardOffset } : { top: cardOffset }}
      >
        {/* order: card + stem for UP; stem + card for DOWN */}
        {isUp && <LabelCard mod={mod} />}

        {/* Stem */}
        <div
          className={cn(
            'w-px bg-white/10',
            isUp ? 'mt-0' : 'mb-0'
          )}
          style={{ height: stemH }}
        />

        {!isUp && <LabelCard mod={mod} />}
      </div>

      {/* ── Node button ── */}
      <button
        onClick={onClick}
        disabled={locked}
        className={cn(
          'relative w-[50px] h-[50px] rounded-full flex items-center justify-center z-10 transition-transform duration-200',
          !locked && 'hover:scale-110 active:scale-95 cursor-pointer',
          locked && 'cursor-default',
        )}
      >
        {/* Ring layers */}
        {active && (
          <span className="absolute inset-[-6px] rounded-full border border-accent opacity-30 animate-ping" />
        )}
        {active && (
          <span className="absolute inset-[-3px] rounded-full border border-accent/40" />
        )}

        {/* Circle body */}
        <span
          className={cn(
            'w-[50px] h-[50px] rounded-full flex items-center justify-center border',
            done && 'bg-surface border-white/20',
            active && 'bg-surface border-accent shadow-[0_0_20px_rgba(var(--woy-accent-rgb),0.25)]',
            locked && 'bg-surface/50 border-white/5',
          )}
        >
          {done && <Check size={18} strokeWidth={2.5} className="text-white/70" />}
          {active && <Play size={16} className="text-accent fill-accent ml-0.5" />}
          {locked && <Lock size={15} className="text-white/15" />}
        </span>

        {/* XP chip (completed + active only) */}
        {mod.xp && !locked && (
          <span
            className={cn(
              'absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border whitespace-nowrap',
              done && 'bg-bg border-white/10 text-white/50',
              active && 'bg-bg border-accent/30 text-accent',
            )}
          >
            <Star size={8} className={active ? 'text-accent' : 'text-white/40'} fill="currentColor" />
            {mod.xp} XP
          </span>
        )}
      </button>
    </div>
  );
};

/** Glassmorphic label card attached to the stem */
const LabelCard = ({ mod }: { mod: RoadModule }) => {
  const done = mod.status === 'complété';
  const active = mod.status === 'en cours';
  const locked = mod.status === 'verrouillé';

  return (
    <div
      className={cn(
        'flex flex-col gap-0.5 px-4 py-2.5 rounded-xl border whitespace-nowrap',
        done && 'bg-surface/60 border-white/8',
        active && 'bg-surface/80 border-accent/25',
        locked && 'bg-surface/20 border-white/4',
      )}
    >
      <span
        className={cn(
          'text-[9px] font-mono tracking-[0.25em] uppercase',
          done ? 'text-white/35' : active ? 'text-accent' : 'text-white/15',
        )}
      >
        Module {mod.label}
      </span>
      <span
        className={cn(
          'text-[13px] font-serif leading-snug tracking-wide',
          done ? 'text-white/80' : active ? 'text-white' : 'text-white/30',
        )}
      >
        {mod.title}
      </span>
    </div>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────
export const CoursScreen = () => {
  const { setCurrentLesson } = useAppContext();
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    containerRef.current?.scrollBy({ left: dir === 'left' ? -420 : 420, behavior: 'smooth' });
  };

  // Active node X drives the gradient cutoff (horizontal linear gradient trick)
  const activeX = ROADMAP_MODULES.find(m => m.status === 'en cours')?.x ?? 0;
  const activePct = ((activeX - (-50)) / (GATE_X - (-50))) * 100;

  const completedCount = ROADMAP_MODULES.filter(m => m.status === 'complété').length;
  const totalXP = ROADMAP_MODULES.filter(m => m.xp && m.status !== 'verrouillé').reduce((s, m) => s + (m.xp ?? 0), 0);
  const progress = Math.round((completedCount / ROADMAP_MODULES.length) * 100);

  return (
    <div className="relative w-full min-h-[600px] h-[calc(100dvh-80px)] lg:h-[calc(100vh-96px)] bg-bg overflow-hidden flex flex-col text-white select-none">

      {/* ══ HEADER ══════════════════════════════════════════════════════════ */}
      <header className="absolute inset-x-0 top-0 h-[108px] z-40 flex items-center justify-between px-6 lg:px-10 border-b border-white/[0.04] bg-bg shrink-0">

        {/* Level badge + title */}
          <div className="flex items-center gap-5">
          <div className="h-10 px-4 rounded-xl bg-surface border border-white/[0.06] flex items-center gap-2 shrink-0">
            <span className="text-[9px] font-mono text-white/30 tracking-[0.2em] uppercase">Niv.</span>
            <span className="text-[18px] font-serif font-bold text-white/85 leading-none">0</span>
          </div>

          <div>
            <h1 className="text-[20px] lg:text-[22px] font-serif text-white/90 leading-tight tracking-wide">
              L'argent et les marchés
            </h1>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-[0.22em] text-accent">
                <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                En cours
              </span>
              <span className="w-px h-3 bg-white/10" />
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/30">
                {completedCount} / {ROADMAP_MODULES.length} modules
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="hidden lg:flex items-center gap-10">
          <Stat label="XP total" value={<span className="flex items-center gap-1.5"><Star size={12} className="text-accent" fill="currentColor" />{totalXP}</span>} />
          <span className="w-px h-8 bg-white/[0.06]" />
          <Stat label="Modules" value={<span>{completedCount}<span className="text-white/25 text-[13px]"> / {ROADMAP_MODULES.length}</span></span>} />
          <span className="w-px h-8 bg-white/[0.06]" />

          {/* Progress */}
          <div className="flex flex-col gap-2 w-52">
            <div className="flex justify-between">
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-white/35">Progression</span>
              <span className="text-[11px] font-mono text-white/60">{progress}%</span>
            </div>
            <div className="h-[3px] w-full bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ══ CANVAS ══════════════════════════════════════════════════════════ */}
      <main
        ref={containerRef}
        className="absolute top-[108px] bottom-[72px] inset-x-0 overflow-x-auto overflow-y-hidden cursor-grab active:cursor-grabbing scrollbar-hide"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* World container — fixed intrinsic size, vertically centred */}
        <div
          className="relative flex items-center justify-start h-full"
          style={{ minWidth: MAP_W, width: MAP_W }}
        >
          {/* ── Road SVG (exact pixel placement, no scaling distortion) ── */}
          <svg
            width={MAP_W}
            height={MAP_H}
            viewBox={`0 0 ${MAP_W} ${MAP_H}`}
            className="absolute inset-x-0"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
            preserveAspectRatio="xMinYMid meet"
            aria-hidden
          >
            <defs>
              {/*
                PREMIUM ROAD — 3D DOME SYSTEM (theme-consistent)
                All colors pull from CSS variables so both Terracotta + Violet themes work.
                Terracotta: bg=#2e1610 → surface=#3d221a → surface-light=#573525
                Violet:     bg=#1c0d2e → surface=#2a163e → surface-light=#3f2558
              */}

              {/* Highlight radial for the road's top-lit dome center */}
              <radialGradient id="road-dome" cx="50%" cy="0%" r="70%" fx="50%" fy="0%">
                <stop offset="0%"   stopColor="var(--woy-surface-light)" stopOpacity="1" />
                <stop offset="100%" stopColor="var(--woy-surface)"        stopOpacity="1" />
              </radialGradient>

              {/* Completed-section accent tint (fades out after active node) */}
              <linearGradient id="grad-active" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"                      stopColor="var(--woy-accent)" stopOpacity="0.15" />
                <stop offset={`${activePct}%`}         stopColor="var(--woy-accent)" stopOpacity="0.10" />
                <stop offset={`${activePct + 0.5}%`}   stopColor="var(--woy-accent)" stopOpacity="0"    />
                <stop offset="100%"                    stopColor="var(--woy-accent)" stopOpacity="0"    />
              </linearGradient>

              {/* Progress centerline: accent up to active node, then faint after */}
              <linearGradient id="grad-line" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"                      stopColor="var(--woy-accent)"  stopOpacity="0.8" />
                <stop offset={`${activePct}%`}         stopColor="var(--woy-accent)"  stopOpacity="0.8" />
                <stop offset={`${activePct + 0.5}%`}   stopColor="var(--woy-highlight)" stopOpacity="0.08" />
                <stop offset="100%"                    stopColor="var(--woy-highlight)" stopOpacity="0.08" />
              </linearGradient>

              {/* Highlight pin-stripe on top of road (the hairline shimmer) */}
              <linearGradient id="grad-highlight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="var(--woy-highlight)" stopOpacity="0.06" />
                <stop offset="50%"  stopColor="var(--woy-highlight)" stopOpacity="0.14" />
                <stop offset="100%" stopColor="var(--woy-highlight)" stopOpacity="0.06" />
              </linearGradient>
            </defs>

            {/*
              LAYER 1 — Ground bed / outermost shadow
              Uses `bg` (darkest theme color) to blend with the screen background.
              This creates the "inset trench" separation.
            */}
            <path d={PATH} fill="none" stroke="var(--woy-bg)" strokeWidth="100" strokeLinecap="round" />

            {/*
              LAYER 2 — Road edge / tube sides
              Slightly lighter than bg — creates the dark curved "walls" of the road.
            */}
            <path d={PATH} fill="none" stroke="var(--woy-surface)" strokeWidth="86" strokeLinecap="round" />

            {/*
              LAYER 3 — Main road surface
              The primary readable road body. Using surface tone so it blends with
              the card/panel language of the Accueil screen.
            */}
            <path d={PATH} fill="none" stroke="var(--woy-surface)" strokeWidth="76" strokeLinecap="round" />

            {/*
              LAYER 4 — Mid elevation band
              50% of road width, slightly lighter (surface-hover). 
              This narrowing creates the 3D "rounded top" illusion.
            */}
            <path d={PATH} fill="none" stroke="var(--woy-surface-hover)" strokeWidth="52" strokeLinecap="round" />

            {/*
              LAYER 5 — Top-lit highlight dome
              The narrowest band — surface-light tone.
              Simulates directional light hitting the crown of the road.
              This single layer is what makes the road read as 3D.
            */}
            <path d={PATH} fill="none" stroke="var(--woy-surface-light)" strokeWidth="28" strokeLinecap="round" />

            {/*
              LAYER 6 — Gold shimmer pinstripe
              A single-pixel-ish shimmer using the highlight color.
              Gives the road a premium metallic look, consistent with the score ring 
              and cauris gold used in the Accueil screen.
            */}
            <path d={PATH} fill="none" stroke="url(#grad-highlight)" strokeWidth="10" strokeLinecap="round" />

            {/*
              LAYER 7 — Completed section accent tint
              Warms up only the portion the user has already navigated.
            */}
            <path d={PATH} fill="none" stroke="url(#grad-active)" strokeWidth="76" strokeLinecap="round" />

            {/*
              LAYER 8 — Center dashes
              Warm highlight-tone dashes (matching the gold/cauris color from Accueil).
              Low opacity — functional without being loud.
            */}
            <path
              d={PATH}
              fill="none"
              stroke="var(--woy-highlight)"
              strokeOpacity="0.12"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="16 24"
            />

            {/*
              LAYER 9 — Progress accent centerline
              Crisp accent line tracing exactly how far the user is.
              Fades to a faint highlight tone past the active node.
            */}
            <path d={PATH} fill="none" stroke="url(#grad-line)" strokeWidth="2.5" strokeLinecap="round" />
          </svg>

          {/* ── Nodes (absolute pixel coords, centered on SVG) ── */}
          <div
            className="absolute inset-x-0 pointer-events-none"
            style={{ top: '50%', height: MAP_H, transform: 'translateY(-50%)' }}
          >
            {ROADMAP_MODULES.map(mod => (
              <div key={mod.id} className="pointer-events-auto">
                <StationNode
                  mod={mod}
                  onClick={() => setCurrentLesson(mod.id)}
                />
              </div>
            ))}

            {/* ── Next Level Gate ── */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
              style={{ left: GATE_X, top: GATE_Y }}
            >
              <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-white/25">Prochain niveau</span>
              <button className="w-[52px] h-[52px] rounded-full bg-surface/50 border border-white/8 flex items-center justify-center text-white/25 hover:text-white/50 hover:border-white/15 transition-all group cursor-pointer">
                <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <span className="text-[14px] font-serif tracking-wide text-white/35">Sécurité</span>
            </div>
          </div>
        </div>
      </main>

      {/* ══ NAV ARROWS ═══════════════════════════════════════════════════════ */}
      {(['left', 'right'] as const).map(dir => (
        <button
          key={dir}
          onClick={() => scroll(dir)}
          className={cn(
            'absolute top-1/2 -translate-y-1/2 z-40 hidden md:flex w-10 h-10 rounded-full bg-bg border border-white/8 items-center justify-center text-white/30 hover:text-white/70 hover:border-white/15 transition-all shadow-sm active:scale-95',
            dir === 'left' ? 'left-5' : 'right-5',
          )}
          aria-label={dir === 'left' ? 'Précédent' : 'Suivant'}
        >
          {dir === 'left' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      ))}

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <footer className="absolute inset-x-0 bottom-0 h-[72px] bg-bg border-t border-white/[0.04] z-40 flex items-center justify-between px-6 lg:px-10 pointer-events-none">

        {/* Legend */}
        <div className="flex items-center gap-6">
          {[
            { color: 'bg-white/60', label: 'Complété' },
            { color: 'bg-accent', label: 'En cours' },
            { color: 'bg-white/10', label: 'Verrouillé' },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className={cn('w-1.5 h-1.5 rounded-full', color)} />
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/30">{label}</span>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="hidden md:flex items-center gap-2.5">
          <GripHorizontal size={14} className="text-white/15" />
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/20">Glisse pour explorer</span>
        </div>
      </footer>
    </div>
  );
};
