import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, Home, Coins, ArrowRight, ShieldAlert, Sparkles, HelpCircle, Trophy, TrendingUp, Bitcoin, Store, Link as LinkIcon, Lock, Unlock, Users, Database } from 'lucide-react';
import { cn } from '../../utils/cn';
import { audioService } from '../../utils/AudioService';

/**
 * ══ WAVE ALERT ══════════════════════════════════════════════════════════════
 */
export const WaveAlert = ({ amount, context }: { amount: string, context: string }) => (
  <motion.div 
    initial={{ scale: 0.9, opacity: 0, y: 40 }}
    animate={{ scale: 1, opacity: 1, y: 0 }}
    transition={{ type: "spring", damping: 15 }}
    className="relative group w-full max-w-[280px] mx-auto overflow-hidden"
  >
    {/* Animated background glow */}
    <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-full translate-y-8 group-hover:bg-blue-500/30 transition-all duration-1000" />
    
    <div className="relative bg-[#0F172A]/80 backdrop-blur-2xl border border-blue-400/20 p-8 rounded-[32px] shadow-[0_20px_50px_rgba(30,58,138,0.4)] text-center">
      {/* Wave Brand Shimmer */}
      <motion.div 
        animate={{ x: ['-200%', '200%'] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent skew-x-12 pointer-events-none" 
      />

      {/* Wave Icon */}
      <div className="w-12 h-12 bg-blue-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-500/20 relative">
        <div className="absolute inset-0 rounded-2xl animate-ping bg-blue-500/30" />
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white relative z-10">
          <path d="M2 12s3-4 10-4 10 4 10 4M2 12s3 4 10 4 10-4 10-4" />
        </svg>
      </div>

      <div className="space-y-1">
        <div className="text-blue-400/80 text-[10px] font-black tracking-[0.4em] uppercase">WAVE NOTIFICATION</div>
        <div className="text-5xl font-serif font-black text-white tracking-tight drop-shadow-sm flex items-baseline justify-center gap-1">
          <span className="text-2xl opacity-40 font-sans mr-1"></span>{amount}
        </div>
        <div className="text-[11px] text-white/40 tracking-[0.2em] font-medium uppercase pt-2">{context}</div>
      </div>
      
      <div className="mt-8 flex justify-center gap-1">
        {[1, 1, 0.4].map((op, i) => (
          <div key={i} style={{ opacity: op }} className="h-1 w-4 bg-blue-400/40 rounded-full" />
        ))}
      </div>
    </div>
  </motion.div>
);

/**
 * ══ CHOICE SYSTEM ═══════════════════════════════════════════════════════════
 */
const IconMap: Record<string, any> = { Home, Landmark, Coins, TrendingUp, Bitcoin, Store, HelpCircle };

interface ChoiceProps {
  onPick: (id: string) => void;
  selectedId: string | null;
  choices?: { id: string, title: string, desc: string, icon?: string, accent: string }[];
}

export const ChoiceSystem = ({ onPick, selectedId, choices = [] }: ChoiceProps) => {
  const CHOICES = choices.length > 0 ? choices : [
    { id: 'A', title: 'Matelas', desc: 'Comme sa mère. Concret. On peut le toucher.', icon: 'Home', accent: 'bg-blue-500' },
    { id: 'B', title: 'Banque', desc: 'Comme Gassama. 2.5% intérêts.', icon: 'Landmark', accent: 'bg-purple-500' },
    { id: 'C', title: 'Or', desc: 'Comme tante Awa. Garde sa valeur.', icon: 'Coins', accent: 'bg-highlight' }
  ];

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm px-6">
      {CHOICES.map(c => {
        const Icon = c.icon ? IconMap[c.icon] || HelpCircle : HelpCircle;
        return (
          <button
            key={c.id}
            onClick={(e) => { e.stopPropagation(); audioService.playSelection(); onPick(c.id); }}
            className={cn(
              "p-5 rounded-2xl border transition-all flex items-center gap-4 text-left group",
              selectedId === c.id 
                ? "bg-surface border-highlight shadow-2xl shadow-highlight/10 scale-[1.02]" 
                : "bg-surface/40 border-white/[0.03] hover:bg-surface/60 hover:border-white/10"
            )}
          >
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", selectedId === c.id ? c.accent : "bg-white/5")}>
              <Icon size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black font-mono text-highlight opacity-40">{c.id}</span>
                <span className="text-[13px] font-black text-white uppercase tracking-wider">{c.title}</span>
              </div>
              <p className="text-[10px] text-white/40 leading-tight mt-0.5">{c.desc}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

/**
 * ══ DEVALUATION SLIDER ══════════════════════════════════════════════════════
 */
export const DevaluationSlider = ({ onComplete }: { onComplete: () => void }) => {
  const [percent, setPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const handleDrag = (e: React.ChangeEvent<HTMLInputElement>) => {
    const p = parseInt(e.target.value);
    setPercent(p);
    audioService.haptic('light');
    
    if (p >= 98 && !isDone) {
      setIsDone(true);
      audioService.haptic('heavy');
      onComplete();
    }
  };

  const beforeVal = 300000;
  const afterVal = Math.round(300000 - (150000 * (percent / 100)));

  return (
    <div className="w-full max-w-sm px-6 flex flex-col items-center gap-12 select-none" onClick={e => e.stopPropagation()}>
      {/* Cinematic Dual Counter */}
      <div className="relative w-full aspect-[2/1] bg-black/40 rounded-[32px] border border-white/5 overflow-hidden shadow-2xl">
        {/* Jan 11 - Stable Side */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent flex flex-col items-center justify-center transition-opacity duration-700"
          style={{ clipPath: `inset(0 ${percent}% 0 0)` }}
        >
          <div className="text-[10px] font-black text-green-400/40 uppercase tracking-[0.4em] mb-2">11 JAN · 23H59</div>
          <motion.div className="text-5xl font-serif font-black text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.3)]">
            {beforeVal.toLocaleString()}
          </motion.div>
          <div className="text-[10px] text-white/20 font-mono mt-2">VALEUR NOMINALE</div>
        </div>

        {/* Jan 12 - Devaluation Side */}
        <div 
          className="absolute inset-0 bg-gradient-to-bl from-red-500/10 to-transparent flex flex-col items-center justify-center"
          style={{ clipPath: `inset(0 0 0 ${100 - percent}%)` }}
        >
          <div className="text-[10px] font-black text-red-400/40 uppercase tracking-[0.4em] mb-2">12 JAN · MATIN</div>
          <motion.div 
            animate={percent === 100 ? { scale: [1, 1.1, 1], rotate: [0, 1, -1, 0] } : {}}
            className="text-5xl font-serif font-black text-red-500 drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]"
          >
            {afterVal.toLocaleString()}
          </motion.div>
          <div className="text-[10px] text-white/20 font-mono mt-2">POUVOIR D'ACHAT</div>
        </div>

        {/* Vertical Divider Line */}
        <div 
          className="absolute inset-y-0 w-px bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10"
          style={{ left: `${100 - percent}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[2px]" />
        </div>
      </div>

      {/* Control Track */}
      <div className="w-full space-y-4">
        <div className="flex justify-between items-end">
          <div className="text-[9px] font-black text-white/30 uppercase tracking-widest">Temps qui passe</div>
          {percent === 100 && (
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[9px] font-black text-red-500 uppercase tracking-widest bg-red-500/10 px-2 py-1 rounded"
            >
              CHOC MONÉTAIRE −50%
            </motion.span>
          )}
        </div>
        
        <div className="relative h-12 flex items-center group">
          <div className="absolute inset-x-0 h-1 bg-white/5 rounded-full" />
          <div 
            className="absolute left-0 h-1 bg-gradient-to-r from-green-500/40 to-red-500/40 rounded-full transition-all duration-75" 
            style={{ width: `${percent}%` }}
          />
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={percent} 
            onChange={handleDrag}
            className="absolute inset-0 w-full h-full opacity-0 cursor-grab active:cursor-grabbing z-20"
          />
          {/* Custom Handle Design */}
          <motion.div 
            className="absolute w-10 h-10 bg-[#0F172A] border-2 border-white/20 rounded-2xl flex items-center justify-center shadow-xl z-10 pointer-events-none group-active:scale-110 transition-transform"
            style={{ left: `calc(${percent}% - 20px)` }}
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

/**
 * ══ NARRATIVE QUIZ ══════════════════════════════════════════════════════════
 */
export const NarrativeQuiz = ({ 
  questions,
  currentXP,
  onXPAdd,
  onCaurisSpend,
  caurisEnabled
}: { 
  questions: { q: string, o: string[], ok: number, hint: string, fb: string }[],
  currentXP: number, 
  onXPAdd: (v: number) => void,
  onCaurisSpend: () => void,
  caurisEnabled: boolean
}) => {
  const [step, setStep] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [answered, setAnswered] = useState<number | null>(null);

  const QUESTIONS = questions;

  const q = QUESTIONS[step];

  const handleAns = (idx: number) => {
    if (answered !== null) return;
    setAnswered(idx);
    if (idx === q.ok) {
      onXPAdd(50);
      audioService.playSelection();
    } else {
      audioService.haptic('medium');
    }

    setTimeout(() => {
      if (step < QUESTIONS.length - 1) {
        setStep(s => s + 1);
        setAnswered(null);
        setShowHint(false);
      }
    }, 2000);
  };

  return (
    <div className="w-full max-w-sm px-4 flex flex-col h-full min-h-0 overflow-y-auto scrollbar-hide py-6" onClick={e => e.stopPropagation()}>
      <div className="m-auto w-full flex flex-col gap-4">
        <div className="sticky top-0 bg-transparent py-2 z-10">
          <div className="text-highlight text-[10px] font-black tracking-[0.5em] uppercase opacity-80">
            QUESTION {step + 1}/{QUESTIONS.length}
          </div>
        </div>
        
        <h3 className="text-white font-serif text-lg md:text-xl font-black leading-tight uppercase tracking-tight pr-2">
          {q.q}
        </h3>
      
      <div className="flex flex-col gap-2.5">
        {q.o.map((o, i) => (
          <button
            key={i}
            onClick={() => handleAns(i)}
            disabled={answered !== null}
            className={cn(
              "p-3 rounded-xl border transition-all text-left text-[11px] md:text-xs font-bold leading-relaxed",
              answered === null ? "bg-surface border-[#452b18] hover:bg-surface-hover hover:border-highlight/30 active:scale-[0.98]" :
              i === q.ok ? "bg-green-500/20 border-green-500/50 text-green-400" :
              i === answered ? "bg-red-500/20 border-red-500/50 text-red-500" : "opacity-30 border-white/5"
            )}
          >
             {o}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {!showHint && answered === null && (
          <button 
            onClick={() => { if(caurisEnabled) { onCaurisSpend(); setShowHint(true); } }}
            className="flex items-center gap-2 self-center text-highlight text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 py-3 transition-opacity"
          >
            <HelpCircle size={14} /> Indices (1 Cauris)
          </button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(showHint || answered !== null) && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className={cn(
              "p-3 rounded-xl border text-[10px] md:text-[11px] font-medium leading-relaxed font-sans shadow-xl",
              answered === null ? "bg-highlight/5 border-highlight/20 text-highlight/80 italic" :
              answered === q.ok ? "bg-green-500/5 border-green-500/20 text-green-400/80" : "bg-red-500/5 border-red-500/20 text-red-400/80"
            )}
          >
            {answered !== null && <span className="mr-1">{answered === q.ok ? "✅" : "❌"}</span>}
            {answered !== null ? q.fb : q.hint}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
};

/**
 * ══ BRANCHING REVEAL ════════════════════════════════════════════════════════
 */
export const BranchingReveal = ({ userChoice, results = [] }: { userChoice: string | null, results?: { id: string, label: string, desc: string, amount: string, diff: string, color: string }[] }) => {
  const DATA = results.length > 0 ? results : [
    { id: 'A', label: 'Matelas', desc: 'Inflation ~4%/an × 3 ans', amount: '88 900', diff: '-11 100', color: 'red' },
    { id: 'B', label: 'Banque', desc: 'Réel après inflation (2.5% int)', amount: '95 724', diff: '-4 276', color: 'orange' },
    { id: 'C', label: 'Or', desc: 'Or +35% en 3 ans', amount: '120 000', diff: '+20 000', color: 'green' }
  ];

  return (
    <div className="w-full max-w-xs flex flex-col gap-3 max-h-[60vh] overflow-y-auto scrollbar-hide py-2">
      {DATA.map((d, i) => (
        <motion.div
          key={d.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className={cn(
            "relative p-4 rounded-2xl border flex items-center gap-4 bg-black/40 backdrop-blur-md",
            d.color === 'red' ? "border-red-500/20" : d.color === 'orange' ? "border-orange-500/20" : "border-green-500/20",
            userChoice === d.id ? "ring-2 ring-accent ring-offset-2 ring-offset-black" : ""
          )}
        >
          {userChoice === d.id && (
            <div className="absolute -top-2 right-4 bg-accent text-white text-[8px] font-black uppercase px-2 py-0.5 rounded-full shadow-lg z-10">
              Ton choix
            </div>
          )}
          <div className={cn(
            "w-10 h-10 rounded-xl flex items-center justify-center font-serif font-black text-sm",
            d.color === 'red' ? "bg-red-500/10 text-red-500" : d.color === 'orange' ? "bg-orange-500/10 text-orange-400" : "bg-green-500/10 text-green-500"
          )}>
            {d.id}
          </div>
          <div className="flex-1">
            <div className="text-[11px] font-bold text-white uppercase">{d.label}</div>
            <div className="text-[9px] text-white/30 font-medium leading-tight">{d.desc}</div>
          </div>
          <div className="text-right">
            <div className={cn("font-mono text-sm font-black", d.color === 'red' ? "text-red-500" : d.color === 'orange' ? "text-orange-400" : "text-green-500")}>
              {d.amount}
            </div>
            <div className="text-[9px] font-mono opacity-40">{d.diff}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

/**
 * ══ ASSET MATRIX CATEGORIZER (N0.2) ═════════════════════════════════════════
 */
export const AssetMatrixCategorizer = ({ onComplete }: { onComplete: () => void }) => {
  const ASSETS = [
    { id: '1', name: 'USDT', cat: 'Crypto', icon: '💲' },
    { id: '2', name: 'Sonatel', cat: 'Actions', icon: '🏢' },
    { id: '3', name: 'Bon du Trésor', cat: 'Obligations', icon: '📜' },
    { id: '4', name: 'Pétrole brut', cat: 'Matières', icon: '🛢️' },
    { id: '5', name: 'EUR/USD', cat: 'Forex', icon: '💱' },
    { id: '6', name: 'Bitcoin', cat: 'Crypto', icon: '₿' },
    { id: '7', name: 'Or', cat: 'Matières', icon: '✨' },
    { id: '8', name: 'Cacao CI', cat: 'Matières', icon: '🍫' },
    { id: '9', name: 'Ethereum', cat: 'Crypto', icon: 'Ξ' },
    { id: '10', name: 'Apple', cat: 'Actions', icon: '🍎' },
  ];

  const CATEGORIES = ['Actions', 'Obligations', 'Forex', 'Matières', 'Crypto'];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [activeBucket, setActiveBucket] = useState<string | null>(null);
  const constraintsRef = useRef(null);
  const bucketRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleSort = (cat: string) => {
    if (feedback !== null) return;
    const isCorrect = ASSETS[currentIndex].cat === cat;
    
    setFeedback(isCorrect ? 'success' : 'error');
    
    if (isCorrect) {
      audioService.playSelection();
      audioService.haptic('light');
    } else {
      audioService.haptic('medium');
    }
    
    setTimeout(() => {
      setFeedback(null);
      if (isCorrect) {
        if (currentIndex < ASSETS.length - 1) {
          setCurrentIndex(c => c + 1);
        } else {
          onComplete();
        }
      }
    }, 800);
  };

  const onDragEnd = (event: any, info: any) => {
    // Basic collision detection
    let targetCat: string | null = null;
    
    Object.entries(bucketRefs.current).forEach(([cat, el]) => {
      if (!el) return;
      const rect = (el as HTMLElement).getBoundingClientRect();
      if (
        info.point.x >= rect.left &&
        info.point.x <= rect.right &&
        info.point.y >= rect.top &&
        info.point.y <= rect.bottom
      ) {
        targetCat = cat;
      }
    });

    if (targetCat) {
      handleSort(targetCat);
    }
    setActiveBucket(null);
  };

  const onDrag = (event: any, info: any) => {
    let hoveredCat: string | null = null;
    Object.entries(bucketRefs.current).forEach(([cat, el]) => {
      if (!el) return;
      const rect = (el as HTMLElement).getBoundingClientRect();
      if (
        info.point.x >= rect.left &&
        info.point.x <= rect.right &&
        info.point.y >= rect.top &&
        info.point.y <= rect.bottom
      ) {
        hoveredCat = cat;
      }
    });
    setActiveBucket(hoveredCat);
  };

  if (currentIndex >= ASSETS.length) return null;

  const asset = ASSETS[currentIndex];

  return (
    <div ref={constraintsRef} className="w-full max-w-lg flex flex-col gap-2 p-2 h-full min-h-0">
      <div className="text-center">
         <span className="text-highlight text-[8px] font-black uppercase tracking-widest block">Classement (Drag & Drop)</span>
         <span className="text-white/40 text-[9px] font-mono">{currentIndex + 1} / {ASSETS.length}</span>
      </div>

      <div className="flex-1 relative flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!feedback && (
            <motion.div
               key={asset.id}
               drag
               dragConstraints={constraintsRef}
               dragElastic={0.2}
               dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
               onDrag={onDrag}
               onDragEnd={onDragEnd}
               whileDrag={{ scale: 1.05, zIndex: 50 }}
               initial={{ opacity: 0, scale: 0.9, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
               className="w-24 h-32 rounded-2xl border-2 border-white/20 bg-surface shadow-2xl cursor-grab active:cursor-grabbing relative z-30 overflow-hidden group flex flex-col items-center justify-center"
            >
               {/* Aesthetic Background Effect */}
               <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50" />
               <div className="absolute top-0 right-0 w-20 h-20 bg-highlight/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
               
               <motion.span 
                 animate={{ y: [0, -3, 0] }}
                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                 className="text-4xl drop-shadow-2xl mb-1 mt-2"
               >
                 {asset.icon}
               </motion.span>
               <h3 className="text-[10px] font-black text-white tracking-[0.2em] uppercase text-center px-2">{asset.name}</h3>
               
               <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full border border-white/5 bg-white/5 text-[5px] font-black tracking-[0.3em] text-white/30 uppercase whitespace-nowrap">
                 DÉPOSER ICI
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feedback visual for correct/wrong drop */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              className={cn(
                "absolute z-40 w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-2xl backdrop-blur-md border-2",
                feedback === 'success' ? "bg-green-500/20 border-green-500/50" : "bg-red-500/20 border-red-500/50"
              )}
            >
              {feedback === 'success' ? "✅" : "❌"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Droppable Areas (Matrix Buckets) */}
      {/* Droppable Areas (Vertical Chutes) */}
      <div className="grid grid-cols-5 gap-1.5 w-full h-40 mt-2">
        {CATEGORIES.map(cat => (
          <div
            key={cat}
            ref={el => bucketRefs.current[cat] = el}
            className={cn(
              "relative rounded-t-2xl border-t-2 border-x transition-all duration-300 flex flex-col items-center pt-8 pb-4",
              activeBucket === cat 
                ? "bg-highlight/20 border-highlight shadow-[inset_0_0_40px_rgba(var(--woy-highlight-rgb),0.2)]" 
                : "bg-white/[0.02] border-white/5"
            )}
          >
            {/* Visual Chute Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
               <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-b from-highlight/50 to-transparent" />
            </div>

            <span className={cn(
              "text-2xl transition-transform duration-300 mb-2",
              activeBucket === cat ? "scale-125 rotate-6" : "opacity-40"
            )}>
              {cat === 'Actions' && '📈'}
              {cat === 'Obligations' && '📜'}
              {cat === 'Forex' && '💱'}
              {cat === 'Matières' && '🛢️'}
              {cat === 'Crypto' && '₿'}
            </span>
            
            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-white/30 writing-mode-vertical whitespace-nowrap mt-auto pb-4">
              {cat}
            </span>

            {activeBucket === cat && (
              <motion.div 
                layoutId="active-indicator"
                className="absolute inset-0 bg-highlight/5 animate-pulse" 
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * ══ NEWS IMPACT PREDICTOR (N0.2) ════════════════════════════════════════════
 */
export const NewsImpactPredictor = ({ onComplete }: { onComplete: () => void }) => {
  const NEWS = [
    { t: "BlackRock dépose une demande d'ETF Bitcoin", effect: 'UP', exp: "Plus d'acheteurs institutionnels. La hausse se confirme." },
    { t: "Exchange majeur piraté, 500M$ volés", effect: 'DOWN', exp: "Panique = plus de vendeurs. Perte de confiance." },
    { t: "La Fed baisse ses taux d'intérêt de 0,25%", effect: 'UP', exp: "L'argent est moins cher = les investisseurs cherchent du rendement." },
    { t: "La Chine interdit le minage", effect: 'DOWN', exp: "Des millions d'acheteurs/mineurs bloqués ou forcés de vendre." },
    { t: "Halving : l'émission de nouveaux BTC divisée par 2", effect: 'UP', exp: "Offre réduite + demande stable = prix qui monte mécaniquement." }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState<string | null>(null);

  const handleGuess = (guess: string) => {
    if (answered !== null) return;
    setAnswered(guess);
    
    setTimeout(() => {
      setAnswered(null);
      if (currentIndex < NEWS.length - 1) setCurrentIndex(c => c + 1);
      else onComplete();
    }, 3500);
  };

  if (currentIndex >= NEWS.length) return null;
  const item = NEWS[currentIndex];

  return (
    <div className="w-full max-w-sm flex flex-col gap-6 p-4">
      <div className="text-center font-mono text-[10px] text-white/40 tracking-widest">NEWS {currentIndex + 1}/5</div>
      
      <div className="bg-black/40 border border-white/10 p-6 rounded-2xl">
         <h3 className="text-sm md:text-base font-serif font-black text-white leading-relaxed">
           « {item.t} »
         </h3>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <button onClick={() => handleGuess('UP')} disabled={answered !== null} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-green-500/20 hover:text-green-400 transition-colors flex flex-col items-center gap-1 group">
           <span className="text-2xl group-hover:-translate-y-1 transition-transform">📈</span>
           <span className="text-[10px] font-black uppercase text-white/50 group-hover:text-green-400">Monte</span>
        </button>
        <button onClick={() => handleGuess('NEUTRAL')} disabled={answered !== null} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/20 transition-colors flex flex-col items-center gap-1 group">
           <span className="text-2xl">➡️</span>
           <span className="text-[10px] font-black uppercase text-white/50">Neutre</span>
        </button>
        <button onClick={() => handleGuess('DOWN')} disabled={answered !== null} className="p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-red-500/20 hover:text-red-400 transition-colors flex flex-col items-center gap-1 group">
           <span className="text-2xl group-hover:translate-y-1 transition-transform">📉</span>
           <span className="text-[10px] font-black uppercase text-white/50 group-hover:text-red-400">Baisse</span>
        </button>
      </div>

      <AnimatePresence>
        {answered !== null && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("p-4 rounded-xl border text-xs font-medium leading-relaxed", answered === item.effect ? "bg-green-500/10 border-green-500/20 text-green-100" : "bg-red-500/10 border-red-500/20 text-red-100")}>
             <span className="font-black block mb-1">{answered === item.effect ? "✅ CORRECT" : "❌ INCORRECT"}</span>
             <span className="opacity-80 block">{item.exp}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * ══ LIQUIDITY SCENARIO ENGINE (N0.2) ════════════════════════════════════════
 */
export const LiquidityScenarioEngine = ({ onComplete }: { onComplete: () => void }) => {
  const CHOICES = [
    { id: 'A', t: 'USDT (BitGet)', res: '~499 500 FCFA dans 2 min', type: 'success', desc: "-0,1% de frais. Immédiat." },
    { id: 'B', t: 'Actions Sonatel (BRVM)', res: 'Impossible', type: 'error', desc: "Marché fermé. Prend 3 à 5 jours." },
    { id: 'C', t: 'Bitcoin', res: '~495 000 FCFA dans 20 min', type: 'warning', desc: "Très liquide mais frais et volatilité pendant la transaction." },
    { id: 'D', t: 'Token Inconnu (Faible vol.)', res: '~250 000 FCFA', type: 'fatal', desc: "Obligé de brader à -50% car il n'y a aucun acheteur." }
  ];

  const [picked, setPicked] = useState<string | null>(null);

  const handlePick = (id: string) => {
    setPicked(id);
    setTimeout(onComplete, 4000);
  };

  return (
    <div className="w-full max-w-sm flex flex-col gap-4 p-4">
       <div className="bg-red-500/10 border border-red-500/30 p-5 rounded-2xl flex items-start gap-4 mb-4">
         <span className="text-2xl mt-1">🚨</span>
         <p className="text-xs font-bold text-red-100 leading-relaxed">
           URGENCE : Tu as besoin de 500 000 FCFA de CASH là, tout de suite, en moins d'une heure. Quel actif vends-tu pour limiter la casse ?
         </p>
       </div>

       <div className="flex flex-col gap-3">
         {CHOICES.map(c => (
           <button 
             key={c.id} 
             onClick={() => handlePick(c.id)}
             disabled={picked !== null}
             className={cn(
               "p-4 rounded-xl border transition-all text-left flex flex-col gap-1",
               picked === null ? "bg-surface border-white/10 hover:bg-white/10" :
               picked === c.id ? (c.type === 'success' ? "bg-green-500/20 border-green-500/50" : c.type === 'fatal' ? "bg-red-900/40 border-red-500/50" : c.type === 'error' ? "bg-orange-500/20 border-orange-500/50" : "bg-yellow-500/20 border-yellow-500/50") :
               "opacity-20 border-white/5"
             )}
           >
             <span className="text-[13px] font-black text-white">{c.t}</span>
             {picked !== null && (
               <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn("text-[11px] font-bold mt-1", c.type === 'success' ? "text-green-400" : c.type === 'fatal' ? "text-red-400" : c.type === 'error' ? "text-orange-400" : "text-yellow-400")}>
                 {c.res} <span className="opacity-70 font-normal block mt-1">{c.desc}</span>
               </motion.span>
             )}
           </button>
         ))}
       </div>
    </div>
  );
};

/**
 * ══ MISSION TERRAIN (N0.2) ══════════════════════════════════════════════════
 */
export const MissionTerrainN02 = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <div className="w-full max-w-2xl px-4 flex flex-col gap-6">
      <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-highlight/80 ml-4 mb-2 text-center">MISSION TERRAIN</h2>
      
      <div className="bg-white/[0.02] border border-white/[0.05] p-6 md:p-8 rounded-[2rem] flex flex-col gap-6 shadow-2xl backdrop-blur-xl">
        <p className="text-sm font-serif text-white leading-relaxed">
          Cette semaine, tu observes 2 marchés différents.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl flex flex-col gap-2">
            <h3 className="text-highlight font-black uppercase tracking-widest text-[10px] mb-2 flex items-center gap-2"><span>🍅</span> Marché 1 : Sandaga</h3>
            <ul className="text-[11px] text-white/50 space-y-2 list-disc pl-4">
              <li>Note un produit, son prix le matin et le soir.</li>
              <li>Plus d'acheteurs ou plus de vendeurs ?</li>
              <li>Qu'est-ce qui a fait bouger le prix ?</li>
            </ul>
          </div>
          <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl flex flex-col gap-2">
            <h3 className="text-highlight font-black uppercase tracking-widest text-[10px] mb-2 flex items-center gap-2"><span>💻</span> Marché 2 : CoinGecko</h3>
            <ul className="text-[11px] text-white/50 space-y-2 list-disc pl-4">
              <li>Note le prix du BTC ce soir.</li>
              <li>Lis un grand titre d'actualité.</li>
              <li>Est-ce MACRO ou MICRO ? Haussier ou Baissier ?</li>
            </ul>
          </div>
        </div>

        <div className="bg-black/30 border-l-2 border-highlight p-4 mt-2">
          <p className="text-xs text-white/60 italic">
            Partage tes observations dans la <strong className="text-white">Communauté WÔY</strong> et obtiens <strong className="text-highlight">+100 XP</strong> !
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button 
          onClick={onComplete}
          className="bg-highlight hover:bg-highlight-light text-black px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-highlight/20"
        >
          MODULE SUIVANT → N0.3
        </button>
      </div>
    </div>
  );
};

/**
 * ══ BLOCKCHAIN VISUALIZER (N0.3) ════════════════════════════════════════════
 */
export const BlockchainVisualizer = ({ onComplete }: { onComplete: () => void }) => {
  const [modified, setModified] = useState(false);
  
  const handleModify = () => {
    setModified(true);
    audioService.haptic('medium');
    setTimeout(() => {
      audioService.haptic('heavy');
      onComplete();
    }, 4000);
  };

  const blocks = [
    { id: 1, hash: modified ? 'xyz000' : 'abc123', prev: '000000', tx: modified ? '50 BTC' : '10 BTC', status: modified ? 'error' : 'success' },
    { id: 2, hash: 'def456', prev: 'abc123', tx: '0.5 BTC', status: modified ? 'invalid' : 'success' },
    { id: 3, hash: 'ghi789', prev: 'def456', tx: '2.0 BTC', status: modified ? 'invalid' : 'success' }
  ];

  return (
    <div className="w-full flex flex-col items-center gap-8 py-4">
      <div className="flex flex-col gap-4 w-full px-4">
        {blocks.map((b, i) => (
          <React.Fragment key={b.id}>
            <motion.div 
              layout
              className={cn(
                "relative p-4 rounded-xl border-2 transition-all duration-500",
                b.status === 'success' ? "bg-green-500/5 border-green-500/20" : 
                b.status === 'error' ? "bg-red-500/20 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]" :
                "bg-red-900/10 border-red-500/20 opacity-60"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">BLOC #{b.id}</span>
                {b.status === 'success' ? <Lock size={12} className="text-green-500" /> : <Unlock size={12} className="text-red-500" />}
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-mono text-white/20">PREV:</span>
                  <span className={cn("text-[10px] font-mono", b.status === 'invalid' ? "text-red-400 line-through" : "text-white/40")}>{b.prev}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] font-mono text-white/20">HASH:</span>
                  <span className={cn("text-[10px] font-mono font-bold", b.status === 'error' ? "text-red-500" : "text-green-400")}>{b.hash}</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-bold text-white">Tx: Satoshi → Hal</span>
                <span className={cn("text-[11px] font-black", b.status === 'error' ? "text-red-500" : "text-white")}>{b.tx}</span>
              </div>

              {b.id === 1 && !modified && (
                <button 
                  onClick={handleModify}
                  className="absolute -right-2 -top-2 bg-highlight text-black px-2 py-1 rounded text-[8px] font-black uppercase shadow-lg hover:scale-110 transition-transform"
                >
                  Modifier
                </button>
              )}

              {b.status === 'error' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -right-2 inset-y-0 flex items-center">
                  <span className="bg-red-500 text-white text-[8px] font-black px-2 py-1 rotate-90 rounded">FRAUDE !</span>
                </motion.div>
              )}
            </motion.div>
            
            {i < blocks.length - 1 && (
              <div className="flex justify-center -my-2 relative z-10">
                <div className={cn(
                  "h-8 w-0.5 transition-colors duration-500",
                  modified ? "bg-red-500/50" : "bg-green-500/50"
                )} />
                <LinkIcon size={14} className={cn("absolute top-1/2 -translate-y-1/2 transition-colors duration-500", modified ? "text-red-500" : "text-green-500")} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {modified && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-center text-red-400 font-bold px-8 leading-relaxed">
          10 000 nœuds ont détecté la fraude instantanément. Le registre rejette la modification.
        </motion.p>
      )}
    </div>
  );
};

/**
 * ══ ANALOGY MATCHER (N0.3) ══════════════════════════════════════════════════
 */
export const AnalogyMatcher = ({ onComplete }: { onComplete: () => void }) => {
  const PAIRS = [
    { id: 1, analogy: "Le palabre au village", concept: "Décentralisation", icon: "🗣️" },
    { id: 2, analogy: "Le cahier de Sandaga", concept: "Registre distribué", icon: "📒" },
    { id: 3, analogy: "Les Griots", concept: "Nœuds", icon: "🪘" },
    { id: 4, analogy: "L'empreinte digitale", concept: "Hash", icon: "☝️" },
    { id: 5, analogy: "Les porteurs d'eau", concept: "Mineurs", icon: "💧" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);

  const handleMatch = (id: number) => {
    const isCorrect = id === PAIRS[currentIndex].id;
    setFeedback(isCorrect ? 'success' : 'error');
    
    if (isCorrect) audioService.playSelection();
    
    setTimeout(() => {
      setFeedback(null);
      if (isCorrect) {
        if (currentIndex < PAIRS.length - 1) setCurrentIndex(c => c + 1);
        else onComplete();
      }
    }, 1500);
  };

  const item = PAIRS[currentIndex];
  // Shuffle options for the current step
  const options = [...PAIRS].sort(() => Math.random() - 0.5);

  return (
    <div className="w-full max-w-sm flex flex-col gap-6 p-4">
      <div className="text-center font-mono text-[10px] text-white/40 tracking-widest uppercase">Analogie {currentIndex + 1} / 5</div>
      
      <motion.div 
        key={item.id}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-highlight/10 border border-highlight/30 p-8 rounded-3xl flex flex-col items-center gap-4 text-center shadow-2xl shadow-highlight/5"
      >
        <span className="text-5xl mb-2">{item.icon}</span>
        <h3 className="text-xl font-serif font-black text-white">{item.analogy}</h3>
        <p className="text-[10px] text-highlight uppercase font-bold tracking-[0.2em] opacity-60">C'est quoi en technique ?</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-2">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => handleMatch(opt.id)}
            disabled={feedback !== null}
            className={cn(
              "p-4 rounded-xl border text-[11px] font-black uppercase tracking-wider transition-all",
              feedback === null ? "bg-white/5 border-white/10 hover:bg-white/10" :
              feedback === 'success' && opt.id === item.id ? "bg-green-500/20 border-green-500/50 text-green-400" :
              feedback === 'error' && opt.id === item.id ? "bg-red-500/20 border-red-500/50 text-red-400" :
              "opacity-20 border-white/5"
            )}
          >
            {opt.concept}
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * ══ CLASSIFICATION EXERCISE (N0.3) ══════════════════════════════════════════
 */
export const ClassificationExercise = ({ onComplete }: { onComplete: () => void }) => {
  const CASES = [
    { id: 1, t: "Bitcoin", cat: 'PUBLIQUE', desc: "Personne ne contrôle. Ne peut pas être arrêtée." },
    { id: 2, t: "Registre interne de la SGBS", cat: 'PRIVÉE', desc: "La banque contrôle et peut modifier les règles." },
    { id: 3, t: "Ethereum", cat: 'PUBLIQUE', desc: "Réseau ouvert, accessible à tous sans permission." },
    { id: 4, t: "Hyperledger (Entreprise)", cat: 'PRIVÉE', desc: "Consortium restreint. Pas de vraie décentralisation." },
    { id: 5, t: "Titres fonciers africains", cat: 'DEBAT', desc: "Privée = État contrôle. Publique = Propriétaire protégé." }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState<string | null>(null);

  const handlePick = (cat: string) => {
    setAnswered(cat);
    audioService.playSelection();
    setTimeout(() => {
      setAnswered(null);
      if (currentIndex < CASES.length - 1) setCurrentIndex(c => c + 1);
      else onComplete();
    }, 4000);
  };

  const item = CASES[currentIndex];

  return (
    <div className="w-full max-w-sm flex flex-col gap-6 p-4">
      <div className="text-center font-mono text-[10px] text-white/40 tracking-widest uppercase">Cas {currentIndex + 1} / 5</div>
      
      <div className="bg-white/[0.03] border border-white/10 p-8 rounded-3xl text-center">
        <h3 className="text-2xl font-serif font-black text-white mb-2">{item.t}</h3>
        <p className="text-[10px] text-white/40 uppercase tracking-widest">Quel type de blockchain ?</p>
      </div>

      <div className="flex flex-col gap-3">
        {['PUBLIQUE', 'PRIVÉE'].map(c => (
          <button
            key={c}
            onClick={() => handlePick(c)}
            disabled={answered !== null}
            className={cn(
              "p-5 rounded-2xl border font-black uppercase tracking-widest text-xs transition-all",
              answered === null ? "bg-white/5 border-white/10 hover:bg-white/10" :
              answered === c ? (item.cat === c || item.cat === 'DEBAT' ? "bg-green-500/20 border-green-500/50 text-green-400" : "bg-red-500/20 border-red-500/50 text-red-400") :
              "opacity-20 border-white/5"
            )}
          >
            Blockchain {c}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 rounded-xl bg-highlight/5 border border-highlight/20 text-[11px] text-white/70 leading-relaxed text-center">
            {item.desc}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * ══ MISSION TERRAIN (N0.3) ══════════════════════════════════════════════════
 */
export const MissionTerrainN03 = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <div className="w-full max-w-2xl px-4 flex flex-col gap-6">
      <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-highlight/80 ml-4 mb-2 text-center">MISSION TERRAIN</h2>
      
      <div className="bg-white/[0.02] border border-white/[0.05] p-6 md:p-8 rounded-[2rem] flex flex-col gap-6 shadow-2xl backdrop-blur-xl">
        <p className="text-sm font-serif text-white leading-relaxed">
          Cette semaine, tu expliques la blockchain à quelqu'un. Parent, ami, boutiquier... mais attention :
        </p>

        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-[10px] font-black uppercase text-red-400 text-center tracking-widest">
           Interdit : "Blockchain" · "Hash" · "Algorithme"
        </div>

        <div className="grid grid-cols-1 gap-2">
          {[
            { t: "La Décentralisation", d: "Utilise le palabre au village (tout le monde témoin)." },
            { t: "Le Registre", d: "Utilise le cahier de dettes de Sandaga (10 000 copies)." },
            { t: "L'Immuabilité", d: "Utilise la fraude aux titres fonciers (casser la chaîne)." }
          ].map((m, i) => (
            <div key={i} className="bg-white/[0.03] border border-white/10 p-4 rounded-xl flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-highlight" />
              <div>
                <div className="text-[12px] font-bold text-white">{m.t}</div>
                <div className="text-[10px] text-white/40">{m.d}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-black/30 border-l-2 border-highlight p-4 mt-2">
          <p className="text-xs text-white/60 italic">
            Partage ton expérience dans la communauté. Quelle analogie a le mieux fonctionné ?
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button 
          onClick={onComplete}
          className="bg-highlight hover:bg-highlight-light text-black px-6 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-highlight/20"
        >
          MODULE SUIVANT → N0.4
        </button>
      </div>
    </div>
  );
};

/**
 * ══ WAVE VS BITCOIN (N0.3) ══════════════════════════════════════════════════
 */
export const WaveVsBitcoin = ({ onComplete, data }: { onComplete: () => void, data?: any }) => {
  const DEFAULT = {
    left: { title: 'WAVE (Banque)', desc: 'Un seul registre. Un seul point de contrôle.', icon: 'Landmark' },
    right: { title: 'BITCOIN', desc: 'Des milliers de copies. Personne ne contrôle.', icon: 'Bitcoin' }
  };
  
  const content = data || DEFAULT;

  return (
    <div className="w-full max-w-sm flex flex-col gap-4 p-4">
      <div className="grid grid-cols-1 gap-3">
        {/* WAVE CARD */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-5 rounded-2xl border border-blue-500/20 bg-blue-500/5 flex items-center gap-4 relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
             <Landmark size={24} />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">{content.left.title}</h3>
            <p className="text-[10px] text-blue-100/40 leading-tight mt-1">{content.left.desc}</p>
          </div>
          <div className="absolute -right-2 top-0 bottom-0 w-1 bg-blue-500/30" />
        </motion.div>

        {/* VS DIVIDER */}
        <div className="relative flex items-center justify-center py-2">
           <div className="h-px w-full bg-white/5" />
           <div className="absolute bg-[#0f0a1c] px-3 text-[10px] font-black text-white/20 uppercase tracking-widest italic">VS</div>
        </div>

        {/* BITCOIN CARD */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 rounded-2xl border border-highlight/20 bg-highlight/5 flex items-center gap-4 relative overflow-hidden"
        >
          <div className="w-12 h-12 rounded-xl bg-highlight/20 flex items-center justify-center text-highlight shrink-0">
             <Bitcoin size={24} />
          </div>
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">{content.right.title}</h3>
            <p className="text-[10px] text-highlight/40 leading-tight mt-1">{content.right.desc}</p>
          </div>
          <div className="absolute -left-2 top-0 bottom-0 w-1 bg-highlight/30 shadow-[0_0_15px_rgba(var(--woy-highlight-rgb),0.5)]" />
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        onClick={onComplete}
        className="mt-6 w-full py-4 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition-all"
      >
        J'ai compris la différence →
      </motion.button>
    </div>
  );
};
