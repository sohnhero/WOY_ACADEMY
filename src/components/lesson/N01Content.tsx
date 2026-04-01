import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Home, 
  Landmark, 
  Coins, 
  ShieldAlert, 
  Play, 
  Lightbulb, 
  Trophy 
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAppContext } from '../../context/AppContext';
import { TimeSkipOverlay } from './TimeSkipOverlay';
import { InflationCalculator } from './InflationCalculator';
import { StarField } from '../common/StarField';

interface N01ContentProps {
  onComplete: (xp: number, cauris: number) => void;
  currentCoins: number;
  onUpdateCoins: (newCoins: number) => void;
}

export const N01Content: React.FC<N01ContentProps> = ({ 
  onComplete, 
  currentCoins, 
  onUpdateCoins 
}) => {
  const { theme } = useAppContext();
  const [currentStep, setCurrentStep] = useState(0);
  const onSetStep = (step: number) => setCurrentStep(step);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [showTimeSkip, setShowTimeSkip] = useState(false);
  const [revealedPracticalSteps, setRevealedPracticalSteps] = useState<Set<number>>(new Set());
  const [xp, setXp] = useState(0);
  const [showHint, setShowHint] = useState<number | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, boolean>>({});
  const [xpToast, setXpToast] = useState<number | null>(null);

  const accentText = 'text-highlight';
  const accentBg = 'bg-accent';
  const accentBg10 = 'bg-accent/10';
  const accentBorder = 'border-highlight/30';
  const secondaryGrad = 'from-accent to-accent-light';

  const maxXP = 300;
  const xpPercent = Math.min((xp / maxXP) * 100, 100);

  const addXP = (amount: number) => {
    setXp(prev => prev + amount);
    setXpToast(amount);
    setTimeout(() => setXpToast(null), 1800);
  };

  const steps = [
    's0', 's1', 's2', 's3a', 's3b', 's3c', 's3d', 's4', 's5', 's6a', 's6b', 's6c', 's6d', 's6e', 's7a', 's7b'
  ];

  const currentStepId = steps[currentStep];

  const handleChoice = (choice: string) => {
    setUserChoice(choice);
    addXP(30);
    setTimeout(() => setShowTimeSkip(true), 800);
  };

  const handlePracticalReveal = (index: number) => {
    const newRevealed = new Set(revealedPracticalSteps);
    newRevealed.add(index);
    setRevealedPracticalSteps(newRevealed);
    addXP(5);
  };

  const handleQuizAnswer = (qIndex: number, isCorrect: boolean) => {
    if (quizAnswers[qIndex] !== undefined) return;
    setQuizAnswers(prev => ({ ...prev, [qIndex]: isCorrect }));
    if (isCorrect) addXP(50);
    else addXP(10);
  };

  const useHint = (qIndex: number) => {
    if (currentCoins > 0 && showHint !== qIndex) {
      onUpdateCoins(currentCoins - 1);
      setShowHint(qIndex);
    }
  };

  const skipTimeContext = userChoice === 'A'
    ? "Amadou n'a touché à rien. Son argent est resté dans le tiroir, à l'abri des voleurs..."
    : userChoice === 'B'
      ? "Amadou a fait confiance au système. Son argent a généré des intérêts à 2.5% par an..."
      : "Amadou a sécurisé sa richesse d'une manière ancestrale mais efficace...";

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto px-4 py-4 sm:py-6 pb-28 relative z-10">
      {/* XP Toast */}
      <AnimatePresence>
        {xpToast !== null && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 lg:left-[calc(50%+165px)] z-[999] px-5 py-2 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-2"
          >
            <Zap size={14} className={accentText} />
            <span className={cn("font-mono font-black text-sm", accentText)}>+{xpToast} XP</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* XP Progress Bar */}
      <div className="flex items-center gap-3">
        <span className={cn("text-[8px] font-black uppercase tracking-[0.3em]", accentText)}>XP</span>
        <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full", accentBg)}
            initial={{ width: 0 }}
            animate={{ width: `${xpPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <span className="text-[9px] font-mono font-bold text-white/30">{xp}/{maxXP}</span>
      </div>
      <StarField />
      <TimeSkipOverlay
        active={showTimeSkip}
        year={3}
        context={skipTimeContext}
        onComplete={() => {
          setShowTimeSkip(false);
          onSetStep(currentStep + 1);
        }}
      />

      <AnimatePresence mode="wait">
        {currentStepId === 's0' && (
          <motion.div
            key="s0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs border", accentBg10, accentBorder, accentText)}>0</div>
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">La situation</span>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-7 relative overflow-hidden group">
              <div className={cn("absolute top-0 right-0 w-48 h-48 blur-3xl rounded-full -mr-24 -mt-24", accentBg10)} />
              <div className="relative z-10 flex flex-col gap-5 text-left">
                <div className="flex flex-col gap-1.5">
                  <span className={cn("text-[8px] font-black uppercase tracking-[0.3em]", accentText)}>📍 Dakar · Amadou</span>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white leading-tight uppercase tracking-tight">Amadou vient de toucher son premier salaire.</h2>
                </div>

                <div className="flex flex-col gap-4 text-sm md:text-base text-white/60 leading-relaxed font-medium">
                  <p>
                    <strong className="text-white">100 000 FCFA.</strong> Pas besoin maintenant — il veut garder ça pour plus tard.
                  </p>
                  <div className={cn("pl-4 border-l-2 flex flex-col gap-3 italic font-serif", accentBorder)}>
                    <p className="text-sm">"Garde à la maison, mon fils. La banque c'est pas pour nous." <br /><span className={cn("text-[9px] not-italic font-sans uppercase tracking-[0.2em] font-black mt-1 inline-block opacity-60", accentText)}>— Sa mère</span></p>
                    <p className="text-sm">"Dépose à la banque, l'argent va travailler pour toi." <br /><span className={cn("text-[9px] not-italic font-sans uppercase tracking-[0.2em] font-black mt-1 inline-block opacity-60", accentText)}>— Gassama, son ami</span></p>
                  </div>
                </div>

                <div className="pt-5 border-t border-white/5 flex flex-col gap-3">
                  <p className="text-white font-bold text-sm sm:text-base uppercase tracking-wider font-serif">Lequel tu suis ?</p>
                  <button
                    onClick={() => { addXP(10); onSetStep(1); }}
                    className={cn("w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer", secondaryGrad)}
                  >
                    Voir les 3 options
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStepId === 's1' && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs border", accentBg10, accentBorder, accentText)}>1</div>
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Essaie d'abord</span>
            </div>

            <div className="flex flex-col gap-2 text-left">
              <h2 className="text-lg md:text-xl font-serif font-bold text-white uppercase tracking-wider">Amadou a 3 options.</h2>
              <p className="text-xs text-white/40 tracking-wider font-bold uppercase">Choisis avant de savoir la réponse.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { id: 'A', title: "À la maison", desc: "Comme dit sa mère — en sécurité", icon: Home, accent: "blue" },
                { id: 'B', title: "À la banque", desc: "Comme dit Gassama — intérêts", icon: Landmark, accent: "purple" },
                { id: 'C', title: "En or", desc: "La troisième option — protection", icon: Coins, accent: "gold" }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleChoice(opt.id)}
                  className={cn("group relative bg-white/[0.03] border border-white/10 rounded-xl p-4 sm:p-5 flex flex-col gap-4 hover:bg-white/[0.08] transition-all text-left cursor-pointer overflow-hidden", `hover:${accentBorder}`)}
                >
                  <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center border transition-colors",
                    opt.accent === 'blue' ? "bg-blue-500/10 border-blue-500/20 group-hover:border-blue-500/50" :
                      opt.accent === 'purple' ? "bg-purple-500/10 border-purple-500/20 group-hover:border-purple-500/50" :
                        `${accentBg10} ${accentBorder}`
                  )}>
                    <opt.icon size={16} className={cn(
                      opt.accent === 'blue' ? "text-blue-400" :
                        opt.accent === 'purple' ? "text-purple-400" :
                          accentText
                    )} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] font-mono">{opt.id}</span>
                    <h3 className="text-sm font-bold font-serif text-white uppercase">{opt.title}</h3>
                    <p className="text-[10px] text-white/40 leading-relaxed font-medium">{opt.desc}</p>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {currentStepId === 's2' && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs border", accentBg10, accentBorder, accentText)}>2</div>
              <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">La révélation</span>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-7 flex flex-col gap-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/5 blur-[80px] rounded-full -mr-24 -mt-24 group-hover:bg-red-500/10 transition-colors duration-1000" />

              <div className="flex flex-col gap-1.5 relative z-10 text-left">
                <span className={cn("text-[8px] font-black uppercase tracking-[0.3em] font-mono", accentText)}>3 ans plus tard · 100 000 FCFA initial</span>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-white leading-tight uppercase">Voici ce qu'il reste à Amadou</h2>
              </div>

              <div className="flex flex-col gap-3 relative z-10 text-left">
                {[
                  { id: 'A', title: "À la maison", amount: "100 000 FCFA", diff: "−18 000", pwr: "82 000 FCFA", status: "Perdant", context: "L'inflation UEMOA (~6%/an) a mangé son pouvoir d'achat.", color: "red" },
                  { id: 'B', title: "À la banque", amount: "107 689 FCFA", diff: "−10 311", pwr: "89 689 FCFA", status: "Inégal", context: "Les intérêts (2.5%) ne compensent pas l'inflation.", color: "orange" },
                  { id: 'C', title: "En or", amount: "135 000 FCFA", diff: "+35 000", pwr: "117 000 FCFA", status: "Gagnant", context: "L'or a historiquement mieux protégé contre l'inflation.", color: "green" }
                ].map((item) => (
                  <div
                    key={item.id}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all flex flex-col md:flex-row justify-between gap-4 items-center",
                      userChoice === item.id
                        ? cn("bg-white/[0.08] shadow-lg shadow-highlight/10", accentBorder.replace('/30', ''))
                        : "bg-white/[0.03] border-white/10 opacity-40 hover:opacity-100 scale-95"
                    )}
                  >
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className={cn("text-[9px] font-black px-3 py-0.5 rounded-full uppercase tracking-widest",
                          item.color === 'red' ? "bg-red-500/20 text-red-400" :
                            item.color === 'orange' ? "bg-orange-500/20 text-orange-400" :
                              "bg-green-500/20 text-green-400"
                        )}>{item.status}</span>
                        <h3 className="text-sm md:text-base font-black font-serif text-white uppercase">{item.title}</h3>
                        {userChoice === item.id && <span className={cn("text-[8px] font-black text-black px-2 py-0.5 rounded-full uppercase tracking-[0.2em] font-mono", accentBg)}>Ton choix</span>}
                      </div>
                      <p className="text-[10px] text-white/50 leading-relaxed font-medium max-w-sm">{item.context}</p>
                    </div>

                    <div className="flex flex-col items-end gap-1 text-right">
                      <span className="text-lg md:text-2xl font-serif font-black text-white">{item.amount}</span>
                      <div className="flex items-center gap-2">
                        <span className={cn("font-mono font-bold text-xs",
                          item.diff.startsWith('+') ? "text-green-500" : "text-red-500"
                        )}>{item.diff}</span>
                        <span className="text-[8px] font-black text-white/30 uppercase tracking-widest font-mono">Pouvoir d'achat : {item.pwr}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {userChoice === 'A' && (
                <div className="bg-red-500/10 border border-red-500/20 p-8 rounded-[2rem] flex flex-col gap-4 relative z-10 text-left">
                  <div className="flex items-center gap-3">
                    <ShieldAlert size={20} className="text-red-500" />
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Attention</span>
                  </div>
                  <p className="text-base md:text-lg text-red-200/90 leading-relaxed italic">
                    "Garder son argent immobile, c'est comme essayer de retenir du sable dans ses mains. Plus tu attends, plus il s'écoule."
                    <span className="block mt-4 text-xs font-black not-italic text-red-500/60 uppercase tracking-widest">— Gassama</span>
                  </p>
                </div>
              )}

              <button
                onClick={() => { addXP(50); onSetStep(currentStep + 1); }}
                className="w-full py-3 sm:py-4 rounded-xl bg-white/[0.05] border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all cursor-pointer relative z-10"
              >
                Pourquoi ça arrive ? Voir la suite
              </button>
            </div>
          </motion.div>
        )}

        {currentStepId?.startsWith('s3') && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs border", accentBg10, accentBorder, accentText)}>3</div>
              <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">Le Djéli explique</span>
            </div>

            {currentStepId === 's3a' ? (
              <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-7 flex flex-col gap-5 text-left">
                <h2 className="text-lg sm:text-xl font-serif font-black text-white uppercase tracking-tight">Le Djéli WÔY s'arrête.</h2>
                <p className={cn("text-sm text-white/60 leading-relaxed italic border-l-2 pl-4", accentBorder)}>
                  Amadou cherche une réponse auprès du sage. {skipTimeContext}
                </p>
                <button
                  onClick={() => onSetStep(currentStep + 1)}
                  className={cn("w-full py-3 rounded-xl text-black font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer", accentBg)}
                >
                  Ecouter le sage
                </button>
              </div>
            ) : currentStepId === 's3b' ? (
              <div className="grid grid-cols-1 gap-3 text-left">
                {[
                  { tag: "AVANT L'ARGENT", txt: "Il pose son bâton orné de cauris. \"Avant l'argent, il y avait le troc.\" J'ai du riz, tu as du poisson — on échange. Simple.", sub: "Mais si le boucher ne veut pas de ton tissu ce jour-là, tu rentres chez toi le ventre vide." },
                  { tag: "LA SOLUTION", txt: "Alors quelqu'un a eu une idée. Un objet que tout le monde accepte.", sub: "Les cauris en Afrique, l'or ailleurs, puis les billets. Plus besoin que l'autre veuille ce que t'as. Tu paies, c'est réglé." },
                ].map((block, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="bg-white/[0.03] border border-white/10 rounded-xl p-4 sm:p-5 flex flex-col gap-2"
                  >
                    <span className={cn("text-[8px] font-black uppercase tracking-[0.3em] font-mono", accentText)}>{block.tag}</span>
                    <p className="text-sm text-white leading-relaxed">{block.txt}</p>
                    <p className="text-[10px] text-white/40 leading-relaxed font-medium">{block.sub}</p>
                  </motion.div>
                ))}
                <button
                  onClick={() => onSetStep(currentStep + 1)}
                  className="w-full py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] hover:bg-white/10 transition-all cursor-pointer"
                >
                  Continuer la leçon
                </button>
              </div>
            ) : currentStepId === 's3c' ? (
              <div className="flex flex-col gap-5">
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-7 flex flex-col gap-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-2">
                    <Play size={20} className="text-red-500 translate-x-0.5" />
                  </div>
                  <h2 className="text-base sm:text-lg font-serif font-black text-white uppercase tracking-wider">Vidéo narrative : Amadou & le Djéli</h2>
                  <p className="text-[10px] text-white/40 max-w-sm mx-auto uppercase tracking-widest font-bold">Découve l'histoire de la confiance (~4 min).</p>
                  <div className="w-full h-32 bg-white/[0.02] border border-dashed border-white/10 rounded-xl flex items-center justify-center">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Vidéo Placeholder</span>
                  </div>
                  <button
                    onClick={() => onSetStep(currentStep + 1)}
                    className="w-full py-3 rounded-xl bg-white text-black font-black text-xs uppercase tracking-[0.2em] hover:bg-gray-200 transition-all cursor-pointer"
                  >
                    J'ai fini la vidéo
                  </button>
                </div>
              </div>
            ) : (
              <div className={cn("border rounded-2xl p-5 md:p-7 flex flex-col gap-5 text-left bg-highlight/5 border-highlight/20")}>
                <div className="flex flex-col gap-1.5">
                  <span className={cn("text-[9px] font-black uppercase tracking-[0.3em]", accentText)}>Conseil du Djéli</span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-white uppercase leading-tight">La règle des 3 fonctions (40/40/20)</h2>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    { pct: "40%", title: "À la maison", subt: "Liquidité — accessible", amount: "40 000 FCFA", color: "blue" },
                    { pct: "40%", title: "À la banque", subt: "Rendement — intérêts", amount: "43 086 FCFA", color: "purple" },
                    { pct: "20%", title: "En or", subt: "Protection — inflation", amount: "27 000 FCFA", color: "gold" }
                  ].map((row, i) => (
                    <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-3 sm:p-4 flex justify-between items-center group hover:bg-white/[0.06] transition-all">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center font-black text-xs border",
                          row.color === 'blue' ? "bg-blue-500/10 border-blue-500/20 text-blue-400" :
                            row.color === 'purple' ? "bg-purple-500/10 border-purple-500/20 text-purple-400" :
                              cn(accentBg10, accentBorder, accentText)
                        )}>{row.pct}</div>
                        <div className="flex flex-col">
                          <span className="text-white font-bold text-xs sm:text-sm">{row.title}</span>
                          <span className="text-[8px] uppercase font-black tracking-widest text-white/30">{row.subt}</span>
                        </div>
                      </div>
                      <span className={cn("text-sm sm:text-lg font-mono font-black",
                        row.color === 'blue' ? "text-blue-400" :
                          row.color === 'purple' ? "text-purple-400" :
                            accentText
                      )}>{row.amount}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white/[0.05] p-4 rounded-xl border border-white/10 flex justify-between items-center text-center md:text-left flex-col md:flex-row gap-2">
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">Total après 3 ans</span>
                  <span className={cn("text-xl font-serif font-black", accentText)}>110 086 FCFA</span>
                  <span className="text-[11px] font-black text-green-500 uppercase tracking-widest">+10 086 FCFA</span>
                </div>

                <button
                  onClick={() => onSetStep(7)}
                  className={cn("w-full py-3 sm:py-4 rounded-xl bg-gradient-to-r text-white font-black text-xs uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer", secondaryGrad)}
                >
                  Voir les données réelles
                </button>
              </div>
            )}
          </motion.div>
        )}

        {currentStepId === 's4' && (
          <motion.div
            key="s4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-[10px] border", accentBg10, accentBorder, accentText)}>4</div>
              <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">Données réelles</span>
            </div>

            <div className="flex flex-col gap-1.5 text-left">
              <h2 className="text-base md:text-lg font-serif font-bold text-white uppercase tracking-wider">📊 Sénégal · Chiffres 2024</h2>
              <p className="text-[10px] text-white/40 leading-relaxed max-w-xs italic">Les faits ne mentent pas. Voici pourquoi comprendre l'inflation est vital.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left">
              {[
                { lbl: "Inflation UEMOA", val: "5.9%", ctx: "Moyenne annuelle 2022–2024", src: "Source : BCEAO officiel" },
                { lbl: "Taux Epargne", val: "2.5%", ctx: "Moins que l'inflation. Bilan réel : −3 400 FCFA/an sur 100k.", src: "Source : Banques locales 2024" },
                { lbl: "Or en FCFA", val: "+35%", ctx: "Performance sur 3 ans au Sénégal.", src: "Source : Cours de l'or x BCEAO" },
                { lbl: "Bancarisation", val: "43%", ctx: "57% des adultes n'ont pas de compte bancaire.", src: "Source : Banque Mondiale 2023" }
              ].map((d, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/10 rounded-xl p-4 flex flex-col gap-1.5 hover:bg-white/[0.06] transition-all group">
                  <span className={cn("text-[8px] font-black uppercase tracking-[0.3em] font-mono", accentText)}>{d.lbl}</span>
                  <span className="text-xl md:text-2xl font-serif font-black text-white">{d.val}</span>
                  <p className="text-[9px] text-white/50 leading-relaxed font-medium">{d.ctx}</p>
                  <span className="text-[7px] font-black text-white/20 uppercase mt-1">{d.src}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onSetStep(currentStep + 1)}
              className={cn("w-full py-3.5 rounded-xl text-black font-black text-[10px] uppercase tracking-[0.2em] shadow-lg hover:bg-gray-200 transition-all cursor-pointer", accentBg)}
            >
              Passer au cas pratique
            </button>
          </motion.div>
        )}

        {currentStepId === 's5' && (
          <motion.div
            key="s5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-5"
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold text-[10px] border", accentBg10, accentBorder, accentText)}>5</div>
              <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">Cas Pratique : WAVE</span>
            </div>

            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col gap-6 text-left">
              <div className="flex flex-col gap-1.5">
                <span className={cn("text-[9px] font-black uppercase tracking-[0.4em]", accentText)}>L'énigme du jour</span>
                <h2 className="text-lg md:text-xl font-serif font-black text-white uppercase leading-tight">Pourquoi Wave existe ?</h2>
                <p className="text-[11px] text-white/40">Clique sur chaque étape pour révéler la vérité.</p>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { id: 1, title: "L'utilisateur (Toi)", desc: "Tu as 10 000 FCFA sur ton Wave.", reveal: "WAVE n'est pas une banque. C'est un 'Emetteur de Monnaie Electronique'." },
                  { id: 2, title: "WAVE (L'interface)", desc: "Wave garde tes 10 000 FCFA.", reveal: "FAUX. La loi UEMOA interdit à Wave de garder ton argent réel. Ils doivent le déposer ailleurs." },
                  { id: 3, title: "La Banque (UBA/Ecobank)", desc: "Wave dépose tes 10 000 FCFA à la banque.", reveal: "La banque garantit que ton argent électronique sur Wave vaut de l'argent réel (CASH)." },
                  { id: 4, title: "BCEAO (Le Maître)", desc: "Tout est contrôlé par la Banque Centrale.", reveal: "C'est elle qui crée la confiance. Sans BCEAO, ton billet de 10k n'est qu'un papier bleu." }
                ].map((s, i) => (
                  <div
                    key={s.id}
                    onClick={() => handlePracticalReveal(i)}
                    className={cn(
                      "p-4 rounded-xl border transition-all cursor-pointer overflow-hidden relative",
                      revealedPracticalSteps.has(i)
                        ? cn(accentBg10, accentBorder)
                        : "bg-white/[0.03] border-white/10 hover:border-white/20"
                    )}
                  >
                    <div className="flex justify-between items-center relative z-10">
                      <div className="flex items-center gap-3">
                        <span className={cn("w-7 h-7 rounded-full flex items-center justify-center font-mono font-black text-[10px]",
                          revealedPracticalSteps.has(i) ? cn(accentBg, "text-black") : "bg-white/10 text-white/40"
                        )}>{s.id}</span>
                        <span className="text-white font-bold text-sm">{s.title}</span>
                      </div>
                      {!revealedPracticalSteps.has(i) && <span className={cn("text-[8px] font-black uppercase tracking-widest", accentText)}>Voir</span>}
                    </div>

                    <AnimatePresence>
                      {revealedPracticalSteps.has(i) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="mt-3 pt-3 border-t border-white/5"
                        >
                          <p className="text-[9px] text-white/40 mb-1.5 uppercase tracking-widest font-black">Ce qu'on croit :</p>
                          <p className="text-[11px] text-white/60 mb-3">{s.desc}</p>
                          <div className={cn("p-3 rounded-lg border", accentBg10, accentBorder.replace('/30', '/10'))}>
                            <p className={cn("text-xs font-bold", accentText)}>💡 {s.reveal}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {revealedPracticalSteps.size === 4 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => onSetStep(9)}
                  className="w-full py-3 sm:py-4 rounded-xl bg-white text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:bg-gray-200 transition-all cursor-pointer"
                >
                  Prêt pour le Quiz ?
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {currentStepId?.startsWith('s6') && (
          <motion.div
            key="s6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs border", accentBg10, accentBorder, accentText)}>6</div>
              <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">Le Quiz Final</span>
            </div>

            {(() => {
              const qIndex = currentStep - 9;
              const questions = [
                { q: "Qu'est-ce que l'inflation ?", opts: ["Une taxe invisible du gouvernement", "L'augmentation générale des prix", "La baisse de la valeur de l'or", "La création de nouveaux billets"], correct: 1, hint: "Quand le pain passe de 150 à 200 FCFA..." },
                { q: "Après 3 ans à la maison, 100 000 FCFA valent...", opts: ["Toujours 100 000 en pouvoir d'achat", "Plus grâce à la rareté", "Environ 82 000 en pouvoir d'achat", "Rien du tout"], correct: 2, hint: "Regarde le résultat d'Amadou (Option A)." },
                { q: "Quelle est la 'Règle des 3 fonctions' du Djéli ?", opts: ["50/50/0", "40/40/20", "30/30/40", "100/0/0"], correct: 1, hint: "Liquidité / Rendement / Protection." },
                { q: "Qui est le garant ultime de la monnaie en UEMOA ?", opts: ["Wave", "UBA", "La BCEAO", "L'Etat du Sénégal"], correct: 2, hint: "Celui qui contrôle la Banque Centrale." },
                { q: "Pourquoi l'or est-il recommandé par le Djéli ?", opts: ["C'est joli", "Il ne perd jamais sa valeur réelle contre l'inflation", "C'est plus facile à transporter", "C'est obligatoire"], correct: 1, hint: "Historiquement, l'or protège mieux." }
              ];
              const q = questions[qIndex];

              return (
                <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 sm:p-7 flex flex-col gap-6 relative overflow-hidden group text-left">
                  <div className={cn("absolute top-0 right-0 w-48 h-48 blur-3xl rounded-full -mr-24 -mt-24", accentBg10)} />

                  <div className="flex justify-between items-center relative z-10">
                    <span className={cn("text-[9px] font-black uppercase tracking-[0.3em]", accentText)}>Question {qIndex + 1} / 5</span>
                    <div className="flex items-center gap-1.5 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/10">
                      <Coins size={9} className={accentText} />
                      <span className="text-[9px] font-mono font-black text-white">{currentCoins}</span>
                    </div>
                  </div>

                  <h2 className="text-lg md:text-xl font-serif font-black text-white uppercase tracking-tight relative z-10">{q.q}</h2>

                  <div className="flex flex-col gap-2.5 relative z-10">
                    {q.opts.map((opt, i) => (
                      <button
                        key={i}
                        disabled={quizAnswers[qIndex] !== undefined}
                        onClick={() => handleQuizAnswer(qIndex, i === q.correct)}
                        className={cn(
                          "w-full p-4 rounded-xl border transition-all text-left font-bold cursor-pointer text-xs",
                          quizAnswers[qIndex] === undefined ? "bg-white/[0.03] border-white/10 hover:bg-white/[0.05] text-white" :
                            i === q.correct ? "bg-green-500/20 border-green-500/40 text-green-400" :
                              quizAnswers[qIndex] === false && i !== q.correct ? "bg-red-500/5 border-red-500/10 opacity-30 text-red-500" : "bg-white/[0.01] border-white/5 opacity-50 text-white/40"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence>
                    {quizAnswers[qIndex] === undefined && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => useHint(qIndex)}
                        className={cn("flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest transition-colors relative z-10 opacity-60 hover:opacity-100 cursor-pointer", accentText)}
                      >
                        <Lightbulb size={11} />
                        Indices (1 Cauris)
                      </motion.button>
                    )}
                  </AnimatePresence>

                  {showHint === qIndex && quizAnswers[qIndex] === undefined && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn("p-3 rounded-xl border relative z-10", accentBg10, accentBorder.replace('/30', '/10'))}
                    >
                      <p className={cn("text-[10px] font-bold", accentText)}>💡 {q.hint}</p>
                    </motion.div>
                  )}

                  {quizAnswers[qIndex] !== undefined && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      onClick={() => {
                        setShowHint(null);
                        if (qIndex === 4) onSetStep(14);
                        else onSetStep(currentStep + 1);
                      }}
                      className={cn("w-full py-3.5 rounded-xl text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer relative z-10", accentBg)}
                    >
                      {qIndex === 4 ? "Terminer le Quiz" : "Question Suivante"}
                    </motion.button>
                  )}
                </div>
              );
            })()}
          </motion.div>
        )}

        {currentStepId === 's7a' && (
          <motion.div
            key="s7a"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs border border-red-500/30 bg-red-500/10 text-red-500")}>M</div>
              <span className="text-[11px] font-black text-white/40 uppercase tracking-[0.3em]">Mission de Terrain</span>
            </div>

            <div className="flex flex-col gap-2 text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-white uppercase tracking-tight">À toi de jouer.</h2>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed max-w-xs">
                Utilise le calculateur WÔY pour comprendre ta propre situation financière.
              </p>
            </div>

            <InflationCalculator />

            <button
              onClick={() => onSetStep(currentStep + 1)}
              className={cn("w-full py-4 rounded-xl bg-gradient-to-r text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer", secondaryGrad)}
            >
              Terminer le module
            </button>
          </motion.div>
        )}

        {currentStepId === 's7b' && (
          <motion.div
            key="s7b"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col gap-6 items-center text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className={cn("w-20 h-20 rounded-full border border-dashed flex items-center justify-center relative", accentBorder)}
            >
              <Trophy size={32} className={accentText} />
              <div className={cn("absolute inset-0 blur-2xl rounded-full opacity-20", accentBg)} />
            </motion.div>

            <div className="flex flex-col gap-2">
              <span className={cn("text-[8px] font-black uppercase tracking-[0.5em]", accentText)}>Module Complété</span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-black text-white uppercase leading-tight">Tu es maintenant plus riche... de savoir.</h2>
              <p className="text-[11px] text-white/40 max-w-xs mx-auto uppercase tracking-wide">
                L'argent est une histoire de confiance. Protège-le de l'inflation.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
              <div className="bg-white/[0.03] border border-white/10 p-4 rounded-2xl flex flex-col gap-1.5 shadow-sm">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Points d'XP</span>
                <span className="text-lg sm:text-xl font-mono font-black text-white">+{xp}</span>
              </div>
              <div className="bg-white/[0.03] border border-white/10 p-4 rounded-2xl flex flex-col gap-1.5 shadow-sm">
                <span className="text-[8px] font-black text-white/20 uppercase tracking-widest">Bilan Cauris</span>
                <span className={cn("text-lg sm:text-xl font-mono font-black", accentText)}>{currentCoins}</span>
              </div>
            </div>

            <button
              onClick={() => onComplete(xp, currentCoins)}
              className={cn("w-full max-w-xs py-4 rounded-xl text-black font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-[1.05] active:scale-[0.95] transition-all cursor-pointer", accentBg)}
            >
              Génial !
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
