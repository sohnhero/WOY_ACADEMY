import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, Home, Coins, ArrowRight, ShieldAlert, Sparkles, HelpCircle, Trophy } from 'lucide-react';
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
interface ChoiceProps {
  onPick: (id: string) => void;
  selectedId: string | null;
}

export const ChoiceSystem = ({ onPick, selectedId }: ChoiceProps) => {
  const CHOICES = [
    { id: 'A', title: 'Matelas', desc: 'Comme sa mère. Concret. On peut le toucher.', icon: Home, accent: 'bg-blue-500' },
    { id: 'B', title: 'Banque', desc: 'Comme Gassama. 2.5% intérêts.', icon: Landmark, accent: 'bg-purple-500' },
    { id: 'C', title: 'Or', desc: 'Comme tante Awa. Garde sa valeur.', icon: Coins, accent: 'bg-highlight' }
  ];

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm px-6">
      {CHOICES.map(c => (
        <button
          key={c.id}
          onClick={(e) => { e.stopPropagation(); audioService.playSelection(); onPick(c.id); }}
          className={cn(
            "p-4 rounded-xl border-2 transition-all flex items-center gap-4 text-left group",
            selectedId === c.id 
              ? "bg-white/10 border-highlight shadow-lg shadow-highlight/10 scale-105" 
              : "bg-white/5 border-white/5 opacity-60 hover:opacity-100"
          )}
        >
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white", selectedId === c.id ? c.accent : "bg-white/10")}>
            <c.icon size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black font-mono opacity-40">{c.id}</span>
              <span className="text-sm font-bold text-white uppercase">{c.title}</span>
            </div>
            <p className="text-[10px] text-white/40 leading-tight">{c.desc}</p>
          </div>
        </button>
      ))}
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
  currentXP,
  onXPAdd,
  onCaurisSpend,
  caurisEnabled
}: { 
  currentXP: number, 
  onXPAdd: (v: number) => void,
  onCaurisSpend: () => void,
  caurisEnabled: boolean
}) => {
  const [step, setStep] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [answered, setAnswered] = useState<number | null>(null);

  const QUESTIONS = [
    { 
      q: "Pourquoi les cauris ont-ils échoué ?", 
      o: ["Trop faciles à perdre", "Les Africains ont arrêté d'y croire", "Les Européens ont importé des tonnes", "Les gouvernements les ont interdits"], 
      ok: 2, 
      hint: "Quelqu'un d'autre a contrôlé l'offre...",
      fb: "Européens → gisements océan Indien → tonnes importées → inflation massive. Le problème : quelqu'un d'autre contrôlait l'offre."
    },
    { 
      q: "11 jan 1994. FCFA dévalué de 50%. Grand-mère : 300 000 FCFA. Le 12 au matin ?", 
      o: ["300 000", "270 000", "150 000", "0"], 
      ok: 2, 
      hint: "C'est la moitié de la valeur.",
      fb: "300 000 × 50% = 150 000 perdus. En une nuit. Décision : France + FMI."
    },
    { 
      q: "200K sous le matelas, inflation 4%, 14 ans. Valeur réelle ?", 
      o: ["200 000", "280 000", "~115 000", "160 000"], 
      ok: 2, 
      hint: "L'argent perd de la valeur avec le temps.",
      fb: "200 000 ÷ (1.04)^14 = 115 473 FCFA. Perte : 84 527 sans jamais dépenser."
    },
    { 
      q: "Quel est le point faible de Bitcoin ?", 
      o: ["Transportable", "Divisible", "Stable à court terme", "Durable"], 
      ok: 2, 
      hint: "Regarde le prix sur une journée...",
      fb: "La volatilité court terme est la seule faiblesse. Long terme : +200 000% en 10 ans."
    },
    { 
      q: "Pourquoi répartir 40/40/20 ?", 
      o: ["Maximiser les gains", "Éviter la faillite", "Protéger contre plusieurs risques", "Les intérêts"], 
      ok: 2, 
      hint: "Ne pas mettre tous les œufs dans le même panier.",
      fb: "Chaque part protège contre un risque différent. Tout en banque = tout exposé au même risque."
    }
  ];

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
    }, 1500);
  };

  return (
    <div className="w-full max-w-sm px-6 flex flex-col gap-4 max-h-[75vh] min-h-0 overflow-y-auto scrollbar-hide pb-8" onClick={e => e.stopPropagation()}>
      <div className="text-highlight text-[9px] font-black tracking-[0.4em] uppercase sticky top-0 bg-[#0F172A]/90 backdrop-blur-md py-3 z-10 border-b border-white/5">
        QUESTION {step + 1}/{QUESTIONS.length}
      </div>
      <h3 className="text-white font-serif text-lg leading-tight uppercase pt-2">{q.q}</h3>
      
      <div className="flex flex-col gap-2">
        {q.o.map((o, i) => (
          <button
            key={i}
            onClick={() => handleAns(i)}
            disabled={answered !== null}
            className={cn(
              "p-4 rounded-xl border transition-all text-left text-xs font-bold",
              answered === null ? "bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20 active:scale-[0.98]" :
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
            className="flex items-center gap-2 self-center text-highlight text-[10px] font-black uppercase tracking-widest opacity-60 hover:opacity-100 py-2"
          >
            <HelpCircle size={14} /> Indices (1 Cauris)
          </button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHint && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="bg-highlight/10 border border-highlight/20 p-4 rounded-xl italic text-[11px] text-highlight/80">
            {q.hint}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {answered !== null && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn("p-4 rounded-xl text-[11px] font-medium leading-relaxed font-sans mt-2", answered === q.ok ? "bg-green-500/10 text-green-400/80" : "bg-red-500/10 text-red-500/80")}>
            {answered === q.ok ? "✅ " : "❌ "} {q.fb}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * ══ BRANCHING REVEAL ════════════════════════════════════════════════════════
 */
export const BranchingReveal = ({ userChoice }: { userChoice: string | null }) => {
  const DATA = [
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
