import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Coins, 
  BookOpen, 
  Zap, 
  Trophy, 
  Clock, 
  HelpCircle, 
  ChevronRight,
  ChevronLeft,
  Lock,
  Check,
  Play
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useAppContext } from '../context/AppContext';
import { StarField } from '../components/common/StarField';
import { N01Content } from '../components/lesson/N01Content';
import { LessonSidebar as DesktopSidebar } from '../components/lesson/LessonSidebar';

interface LessonScreenProps {
  lessonId: string;
  onBack: () => void;
}

export const LessonScreen: React.FC<LessonScreenProps> = ({ lessonId, onBack }) => {
  const { 
    globalCoins, 
    setGlobalCoins, 
    theme, 
    setActiveTab,
    niveaux 
  } = useAppContext();

  const [activeLessonTab, setActiveLessonTab] = useState('cours');
  const [selectedSimOption, setSelectedSimOption] = useState<string | null>(null);
  const [currentQuizStep, setCurrentQuizStep] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizFeedback, setShowQuizFeedback] = useState(false);
  const [localCoins, setLocalCoins] = useState(globalCoins);
  const [quizFinished, setQuizFinished] = useState(false);

  const lessonScrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (lessonScrollRef.current) lessonScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeLessonTab, currentQuizStep, quizFinished]);

  // Using semantic variables directly in the TSX
  const colors = {
    accent: 'bg-highlight',
    textAccent: 'text-highlight',
    activeTabBg: 'bg-highlight/10',
    activeTabBorder: 'border-highlight/20',
    sidebarActiveBg: 'bg-highlight/10',
    sidebarActiveBorder: 'border-highlight/30'
  };

  const lessonData = {
    id: "N1.3",
    title: "Sécuriser son wallet en 10 minutes",
    level: "NIVEAU 1 — Sécurité",
    time: "9 min",
    tldr: "Dans ce module : tu vas comprendre le **protocole de sécurité complet en 4 étapes** et savoir **exécuter les 4 étapes** : seed phrase sur papier, PIN, 2FA, test de restauration.",
    simulation: {
      question: "Amadou vient de recevoir sa seed phrase. Qu'est-ce qu'il fait ?",
      options: [
        { id: 'A', text: 'Il prend une photo avec son téléphone', status: 'Dangereux', feedback: 'DANGER CRITIQUE. Google Photos synchronise automatiquement. 3M comptes hackés par jour.' },
        { id: 'B', text: 'Il la note dans les notes de son téléphone', status: 'Risqué', feedback: 'Mieux qu\'une photo mais toujours digital. Les notes se synchronisent aussi.' },
        { id: 'C', text: 'Il la note sur papier en lieu sûr', status: 'Optimal', feedback: 'Papier = hors ligne = impossible à hacker à distance.' }
      ]
    },
    quiz: [
      { id: 1, question: "Pourquoi ne jamais prendre en photo sa seed phrase ?", options: [{ id: 'A', text: "La qualité est mauvaise" }, { id: 'B', text: "La photo se synchronise sur le Cloud" }, { id: 'C', text: "C'est interdit" }], correct: 'B', hints: ["Cloud...", "Internet...", "Privé ?"] },
      { id: 2, question: "Où stocker sa seed phrase ?", options: [{ id: 'A', text: "Portefeuille" }, { id: 'B', text: "Coffre-fort" }, { id: 'C', text: "Clavier" }], correct: 'B', hints: ["Vol...", "Caché...", "Sécurité ?"] },
      { id: 3, question: "Perte de seed phrase ?", options: [{ id: 'A', text: "Email" }, { id: 'B', text: "Support" }, { id: 'C', text: "Accès perdu" }], correct: 'C', hints: ["Pas de support...", "L'argent...", "Perte ?"] },
      { id: 4, question: "Partager sa seed ?", options: [{ id: 'A', text: "Oui" }, { id: 'B', text: "Jamais" }, { id: 'C', text: "Parfois" }], correct: 'B', hints: ["Arnaque...", "Message...", "Badge ?"] },
      { id: 5, question: "Support durable ?", options: [{ id: 'A', text: "Post-it" }, { id: 'B', text: "Excel" }, { id: 'C', text: "Métal" }], correct: 'C', hints: ["Feu...", "Eau...", "Matériau ?"] }
    ]
  };

  // Narrative logic for N0.1
  if (lessonId === 'N0.1' || lessonId === '0.1') {
    return (
      <div className={cn("fixed inset-0 z-[60] overflow-hidden flex safe-top", theme === 'terracotta' ? 'terracotta-theme' : 'violet-theme')}>
        <div className={cn("absolute inset-0 transition-colors duration-1000 bg-black/40 backdrop-blur-sm")} />
        
        <DesktopSidebar lessonId={lessonId} onBack={onBack} />
        <div className="flex-1 overflow-y-auto relative">
          <N01Content
            currentCoins={globalCoins}
            onUpdateCoins={(val) => setGlobalCoins(val)}
            onComplete={(xpReward, caurisReward) => {
              setGlobalCoins(prev => prev + caurisReward/2); // Adjustment logic if needed
              onBack();
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("fixed inset-0 z-[60] flex flex-col overflow-hidden", theme === 'terracotta' ? 'terracotta-theme' : 'violet-theme')}>
      <div className={cn("absolute inset-0 transition-colors duration-1000 bg-black/60 backdrop-blur-md")} />
      
      <div className="flex-1 flex overflow-hidden lg:grid lg:grid-cols-[330px,1fr]">
        <DesktopSidebar lessonId={lessonId} onBack={onBack} />
        
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <header className="px-4 py-3 flex justify-between items-center bg-black/40 backdrop-blur-xl z-20 border-b border-white/[0.05] safe-top relative">
            <button onClick={() => { setGlobalCoins(localCoins); onBack(); }} className="group flex items-center gap-1.5 transition-colors cursor-pointer text-accent hover:text-accent-light">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-xs">Retour</span>
            </button>
            <div className="flex items-center gap-1.5 bg-white/[0.06] border border-white/10 rounded-full px-3 py-1">
              <Coins size={11} className={colors.textAccent} />
              <span className="font-mono text-[11px] font-bold leading-none">{localCoins}</span>
            </div>
          </header>

          <nav className="px-4 py-2.5 border-b border-white/[0.05] flex justify-between gap-2 items-center bg-black/20 backdrop-blur-md z-10 overflow-x-auto scrollbar-hide">
            {['cours', 'quiz', 'mission'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveLessonTab(tab)}
                className={cn(
                  "relative flex items-center gap-1.5 px-4 py-1.5 rounded-lg transition-all text-[11px] font-bold flex-1 justify-center whitespace-nowrap cursor-pointer capitalize",
                  activeLessonTab === tab
                    ? `${colors.activeTabBg} ${colors.textAccent} border ${colors.activeTabBorder} shadow-lg`
                    : "text-white/30 hover:text-white/50"
                )}
              >
                {tab === 'cours' && <BookOpen size={12} />}
                {tab === 'quiz' && <Zap size={12} />}
                {tab === 'mission' && <Trophy size={12} />}
                {tab}
                {activeLessonTab === tab && (
                  <motion.div layoutId="lesson-tab-active" className="absolute bottom-[-11px] left-0 right-0 h-[2px] bg-highlight" />
                )}
              </button>
            ))}
          </nav>

          <main ref={lessonScrollRef} className="flex-1 overflow-y-auto px-4 pt-6 pb-28 flex flex-col gap-8 max-w-3xl mx-auto w-full text-left">
            {activeLessonTab === 'cours' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6">
                <section className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-4 md:p-6 flex flex-col gap-3">
                  <span className={cn("text-[9px] font-mono font-bold tracking-[0.4em] uppercase opacity-40 leading-none", colors.textAccent)}>{lessonData.id}</span>
                  <h1 className="text-lg md:text-xl font-serif font-black uppercase text-white leading-tight">{lessonData.title}</h1>
                  <div className="flex items-center gap-2 text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">
                    <Clock size={10} /> {lessonData.time} DE LECTURE
                  </div>
                </section>

                <section className="border rounded-2xl p-4 md:p-5 bg-accent/5 border-accent/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap size={12} className={colors.textAccent} />
                    <h3 className={cn("text-[8px] font-black uppercase tracking-[0.3em]", colors.textAccent)}>Résumé Éclair</h3>
                  </div>
                  <p className="text-[11px] md:text-xs leading-relaxed text-white/70 font-medium">
                    {lessonData.tldr.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-white">{part}</strong> : part)}
                  </p>
                </section>

                <section className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 md:p-7 flex flex-col gap-5">
                  <div className="flex items-center gap-2 mb-2">
                     <HelpCircle size={12} className={colors.textAccent} />
                     <h3 className={cn("text-[8px] font-black uppercase tracking-[0.3em]", colors.textAccent)}>Scénario</h3>
                  </div>
                  <h4 className="text-xs md:text-sm font-bold text-white/80 leading-snug mb-3">{lessonData.simulation.question}</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {lessonData.simulation.options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedSimOption(opt.id)}
                        className={cn(
                          "w-full text-left p-3.5 rounded-xl border transition-all active:scale-[0.98] cursor-pointer group",
                          selectedSimOption === opt.id 
                            ? `${colors.sidebarActiveBg} ${colors.sidebarActiveBorder} shadow-lg` 
                            : "bg-white/[0.03] border-white/5 hover:border-white/10"
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={cn("w-6 h-6 rounded-md flex items-center justify-center font-mono font-black text-[9px] border transition-colors", selectedSimOption === opt.id ? `${colors.accent} text-black border-transparent` : "bg-white/5 text-white/30 border-white/10 group-hover:text-white/60")}>{opt.id}</span>
                          <span className={cn("text-[11px] font-bold", selectedSimOption === opt.id ? "text-white" : "text-white/50")}>{opt.text}</span>
                        </div>
                        {selectedSimOption === opt.id && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-2.5 pt-2.5 border-t border-white/10">
                             <p className="text-[10px] text-white/40 leading-relaxed italic">{opt.feedback}</p>
                          </motion.div>
                        )}
                      </button>
                    ))}
                  </div>
                </section>

                <div className="mt-2 mb-12 flex justify-center">
                  <button onClick={() => setActiveLessonTab('quiz')} className="px-8 py-3.5 rounded-xl text-white text-[10px] font-black shadow-xl transition-all cursor-pointer tracking-widest uppercase flex items-center gap-2 hover:scale-105 bg-accent">
                    Passer au Quiz <ChevronRight size={14} />
                  </button>
                </div>
              </motion.div>
            )}

            {activeLessonTab === 'quiz' && (
              <div className="flex flex-col gap-5">
                {quizFinished ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 flex flex-col items-center text-center gap-5">
                     <div className="relative">
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} className="w-20 h-20 rounded-full border border-dashed border-white/10 flex items-center justify-center relative" />
                        <Trophy size={32} className={cn("absolute inset-0 m-auto", colors.textAccent)} />
                     </div>
                     
                     <div className="flex flex-col gap-1">
                       <h2 className="text-lg md:text-xl font-serif font-black uppercase tracking-tight">Quiz terminé !</h2>
                       <div className="flex items-center gap-2 justify-center">
                         <span className="text-[10px] font-black uppercase tracking-widest text-[#4ade80]">+{quizScore * 10} XP</span>
                         <span className="text-white/10">•</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-white/30 font-mono">Score : {quizScore}/5</span>
                       </div>
                     </div>
                     
                     <button onClick={() => { setGlobalCoins(localCoins); onBack(); }} className="px-10 py-3.5 rounded-xl font-black text-[10px] shadow-xl cursor-pointer uppercase tracking-widest text-white transition-all hover:scale-105 bg-accent">Terminer le module</button>
                  </motion.div>
                ) : (
                  <motion.div key={currentQuizStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-5">
                     <div className="flex justify-between items-center bg-white/5 px-2.5 py-1 rounded-full border border-white/10 self-start">
                       <span className="text-[8px] font-black text-white/40 tracking-[0.2em]">QUESTION {currentQuizStep + 1}/5</span>
                     </div>
                     <h2 className="text-base md:text-lg font-serif font-bold text-white leading-tight uppercase tracking-tight">{lessonData.quiz[currentQuizStep].question}</h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                       {lessonData.quiz[currentQuizStep].options.map((opt) => (
                         <button
                           key={opt.id}
                           disabled={showQuizFeedback}
                           onClick={() => {
                             setSelectedQuizOption(opt.id);
                             setShowQuizFeedback(true);
                             if (opt.id === lessonData.quiz[currentQuizStep].correct) setQuizScore(prev => prev + 1);
                             setTimeout(() => {
                               if (currentQuizStep < 4) {
                                 setCurrentQuizStep(prev => prev + 1);
                                 setSelectedQuizOption(null);
                                 setShowQuizFeedback(false);
                               } else {
                                 setQuizFinished(true);
                               }
                             }, 1500);
                           }}
                           className={cn(
                             "p-3.5 rounded-xl border text-left transition-all active:scale-[0.98] cursor-pointer flex items-center gap-2.5 group",
                             selectedQuizOption === opt.id
                               ? (opt.id === lessonData.quiz[currentQuizStep].correct ? "bg-green-500/10 border-green-500/30 text-green-400" : "bg-red-500/10 border-red-500/30 text-red-400")
                               : "bg-white/[0.03] border-white/5 hover:border-white/10"
                           )}
                         >
                           <span className={cn("w-6 h-6 rounded-md flex items-center justify-center font-mono font-black text-[9px] transition-colors", selectedQuizOption === opt.id ? (opt.id === lessonData.quiz[currentQuizStep].correct ? "bg-green-500 text-white" : "bg-red-500 text-white") : "bg-white/5 border border-white/10 text-white/40 group-hover:text-white/60")}>{opt.id}</span>
                           <span className="text-[11px] font-bold">{opt.text}</span>
                         </button>
                       ))}
                     </div>
                  </motion.div>
                )}
              </div>
            )}

            {activeLessonTab === 'mission' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-5">
                <section className="bg-white/[0.03] border border-highlight/20 rounded-2xl p-5 md:p-7 flex flex-col gap-4 shadow-xl overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full -mr-16 -mt-16 transition-colors duration-700 bg-highlight/5 group-hover:bg-highlight/10" />
                  
                  <div className={cn("flex items-center gap-2 relative z-10", colors.textAccent)}>
                     <Trophy size={14} />
                     <h3 className="text-[8px] font-black uppercase tracking-[0.4em]">Mission Pratique</h3>
                  </div>
                  <div className="relative z-10">
                    <h2 className="text-lg md:text-xl font-serif font-black uppercase text-white leading-tight mb-2 tracking-tight">Sécurise ton wallet maintenant.</h2>
                    <p className="text-white/50 text-[11px] leading-relaxed max-w-lg font-medium">
                      Exécute les 4 étapes du protocole WÔY : (1) Seed phrase sur papier (2) PIN actif (3) 2FA activé (4) Test de restauration.
                    </p>
                  </div>
                  <button onClick={() => { setGlobalCoins(localCoins); onBack(); }} className={cn("w-full md:w-fit px-8 py-3 text-black font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg hover:scale-105 transition-all cursor-pointer relative z-10", colors.accent)}>
                    J'ai terminé ma mission
                  </button>
                </section>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
