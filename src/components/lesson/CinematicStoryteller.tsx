import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Zap, Coins, Trophy, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Scene, StoryBeat, CharacterKey } from '../../data/narrativeN01';
import { NarrativeAvatar } from './NarrativeAvatar';
import { useTypewriter } from '../../hooks/useTypewriter';
import { audioService } from '../../utils/AudioService';

import { 
  WaveAlert, 
  ChoiceSystem, 
  DevaluationSlider, 
  NarrativeQuiz, 
  BranchingReveal, 
  AssetMatrixCategorizer, 
  NewsImpactPredictor, 
  LiquidityScenarioEngine, 
  MissionTerrainN02,
  BlockchainVisualizer,
  AnalogyMatcher,
  ClassificationExercise,
  MissionTerrainN03,
  WaveVsBitcoin
} from './NarrativeInteractions';

interface CinematicStorytellerProps {
  narrative: Scene[];
  quizData?: { q: string, o: string[], ok: number, hint: string, fb: string }[];
  onComplete: (xp: number, cauris: number) => void;
  onCaurisChange: (newCauris: number) => void;
  cauris: number;
  modulePrefix: string;
  moduleTitle: React.ReactNode;
  onBack: () => void;
}

export const CinematicStoryteller: React.FC<CinematicStorytellerProps> = ({
  narrative,
  quizData = [],
  onComplete,
  cauris,
  onCaurisChange,
  modulePrefix,
  moduleTitle,
  onBack
}) => {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [beatIndex, setBeatIndex] = useState(0);
  const [xp, setXp] = useState(0);
  const [userChoice, setUserChoice] = useState<string | null>(null);
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [isAudioLoading, setIsAudioLoading] = useState(!audioService.isReady());

  useEffect(() => {
    if (isAudioLoading) {
      audioService.preloadAssets().then(() => setIsAudioLoading(false));
    }
  }, [isAudioLoading]);

  const currentScene = narrative[sceneIndex] || narrative[0];
  
  // Filter beats based on user choice
  const activeBeats = useMemo(() => {
    return currentScene.beats.filter(beat => {
      if (!beat.condition) return true;
      if (beat.condition.choice && beat.condition.choice !== userChoice) return false;
      return true;
    });
  }, [currentScene.beats, userChoice]);

  const currentBeat = activeBeats[beatIndex] || activeBeats[0];

  const { displayedText, isComplete, skip } = useTypewriter(
    currentBeat.text || '',
    20,
    !showStartScreen
  );

  const handleStart = () => {
    if (isAudioLoading) return;
    audioService.playSelection(); // Trigger context
    setShowStartScreen(false);
  };

  const handleNext = useCallback(() => {
    if (showStartScreen) return;

    // If we're on an interactive beat that isn't complete, block progression
    if (currentBeat.type === 'interactive') {
      if (currentBeat.interactiveType === 'CHOICE_SYSTEM' && !userChoice) return;
    }

    if (!isComplete) {
      skip();
      return;
    }

    if (beatIndex < activeBeats.length - 1) {
      setBeatIndex(prev => prev + 1);
    } else if (sceneIndex < narrative.length - 1) {
      setBeatIndex(0);
      setSceneIndex(prev => prev + 1);
    } else {
      // At the very end, if it's a recap or mission, we wait for a manual click on the "Terminer" button
      if (currentBeat.type !== 'recap' && currentBeat.type !== 'mission') {
        onComplete(xp, cauris);
      }
    }

    audioService.haptic('light');
  }, [beatIndex, activeBeats.length, sceneIndex, isComplete, skip, onComplete, xp, cauris, currentBeat, userChoice, showStartScreen]);

  const handleBack = useCallback(() => {
    if (showStartScreen) return;

    if (beatIndex > 0) {
      setBeatIndex(prev => prev - 1);
    } else if (sceneIndex > 0) {
      const prevScene = narrative[sceneIndex - 1];
      // Need to find how many active beats the previous scene had
      const prevActiveBeats = prevScene.beats.filter(beat => {
        if (!beat.condition) return true;
        if (beat.condition.choice && beat.condition.choice !== userChoice) return false;
        return true;
      });
      setSceneIndex(prev => prev - 1);
      setBeatIndex(prevActiveBeats.length - 1);
    }
  }, [beatIndex, sceneIndex, userChoice, showStartScreen]);

  // Click navigation: Left 30% for back, Right 70% for forward
  const handleStageClick = (e: React.MouseEvent) => {
    if (showStartScreen) return;
    const x = e.clientX;
    const w = window.innerWidth;
    if (x < w * 0.3) {
      handleBack();
    } else {
      handleNext();
    }
  };

  const isLastBeat = sceneIndex === narrative.length - 1 && beatIndex === activeBeats.length - 1;

  return (
    <div
      className="fixed inset-0 z-[100] bg-bg/80 backdrop-blur-sm overflow-hidden flex flex-col"
      onClick={handleStageClick}
    >
      {/* ══ TOP HUD ══════════════════════════════════════════════════════════ */}
      <div className="absolute top-0 inset-x-0 h-24 px-8 flex items-center justify-between z-[110]">
        <div className="flex gap-2">
          {narrative.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-0.5 rounded-full transition-all duration-700",
                i < sceneIndex ? "w-8 bg-highlight" : i === sceneIndex ? "w-16 bg-accent" : "w-4 bg-white/5"
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-full px-4 py-1.5">
            <Zap size={12} className="text-accent" />
            <span className="font-mono text-[11px] font-bold text-white tracking-wider">{xp} XP</span>
          </div>
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 rounded-full px-4 py-1.5">
            <Coins size={12} className="text-highlight" />
            <span className="font-mono text-[11px] font-bold text-white tracking-wider">{cauris}</span>
          </div>
        </div>
      </div>

      {/* ══ STAGE (Avatars) ══════════════════════════════════════════════════ */}
      <main className="flex-1 relative flex flex-col items-center justify-center pt-20">
        <AnimatePresence mode="wait">
          {currentBeat.character && (
            <motion.div
              key={currentBeat.character}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="mb-8"
            >
              <NarrativeAvatar character={currentBeat.character} isActive={true} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtext Context Indicator */}
        <AnimatePresence>
          {currentBeat.subText && currentBeat.interactiveType !== 'QUIZ' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[200px] text-center w-full max-w-sm px-6"
            >
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.15em] text-white/60 leading-relaxed drop-shadow-xl block">
                {currentBeat.subText}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ══ INTERACTIVE OVERLAYS (Slider, Quiz, etc) ══ */}
      <AnimatePresence>
        {(currentBeat.interactiveType || currentBeat.type === 'mission' || currentBeat.type === 'recap') && (
          <motion.div
            key={currentBeat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-x-0 top-0 bottom-[210px] z-[115] flex flex-col items-center justify-center p-6 bg-black/20"
            onClick={(e) => e.stopPropagation()}
          >
            {currentBeat.interactiveType === 'WAVE_ALERT' && (
              <WaveAlert amount="100 000" context="FCFA · Virement reçu" />
            )}

            {currentBeat.interactiveType === 'BRANCHING_REVEAL' && (
              <BranchingReveal userChoice={userChoice} results={currentBeat.interactiveData} />
            )}

            {currentBeat.interactiveType === 'CHOICE_SYSTEM' && (
              <ChoiceSystem
                selectedId={userChoice}
                choices={currentBeat.interactiveData}
                onPick={(id) => { setUserChoice(id); setTimeout(handleNext, 800); }}
              />
            )}

            {currentBeat.interactiveType === 'DEVALUATION_SLIDER' && (
              <DevaluationSlider onComplete={() => setTimeout(handleNext, 2000)} />
            )}

            {currentBeat.interactiveType === 'QUIZ' && (
              <NarrativeQuiz
                questions={quizData}
                currentXP={xp}
                onXPAdd={(v) => setXp(prev => prev + v)}
                onCaurisSpend={() => onCaurisChange(Math.max(0, cauris - 1))}
                caurisEnabled={cauris > 0}
              />
            )}

            {currentBeat.interactiveType === 'ASSET_MATCH' && (
              <AssetMatrixCategorizer onComplete={() => setTimeout(handleNext, 1000)} />
            )}

            {currentBeat.interactiveType === 'NEWS_SWIPE' && (
              <NewsImpactPredictor onComplete={() => setTimeout(handleNext, 1000)} />
            )}

            {currentBeat.interactiveType === 'LIQUIDITY_CHOICE' && (
              <LiquidityScenarioEngine onComplete={() => setTimeout(handleNext, 1000)} />
            )}

            {currentBeat.interactiveType === 'MISSION_N02' && (
              <MissionTerrainN02 onComplete={() => onComplete(xp, cauris)} />
            )}

            {currentBeat.interactiveType === 'BLOCKCHAIN_VISUALIZER' && (
              <BlockchainVisualizer onComplete={() => setTimeout(handleNext, 1000)} />
            )}

            {currentBeat.interactiveType === 'ANALOGY_MATCHER' && (
              <AnalogyMatcher onComplete={() => setTimeout(handleNext, 1000)} />
            )}

            {currentBeat.interactiveType === 'CLASSIFICATION_EXERCISE' && (
              <ClassificationExercise onComplete={() => setTimeout(handleNext, 1000)} />
            )}

            {currentBeat.interactiveType === 'MISSION_N03' && (
              <MissionTerrainN03 onComplete={() => onComplete(xp, cauris)} />
            )}

            {currentBeat.interactiveType === 'WAVE_VS_BITCOIN' && (
              <WaveVsBitcoin 
                onComplete={() => setTimeout(handleNext, 1000)} 
                data={currentBeat.interactiveData} 
              />
            )}

            {currentBeat.type === 'recap' && (
              <div className="w-full max-w-2xl px-4 flex flex-col gap-4">
                <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40 ml-4 mb-2">{currentBeat.text || 'BILAN'}</h2>
                
                <div className="bg-white/[0.02] border border-white/[0.05] p-6 md:p-8 rounded-[2rem] flex flex-col gap-10 shadow-2xl backdrop-blur-xl">
                  {/* Top Stats Row */}
                  <div className="flex justify-around items-center px-4">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl font-serif font-black text-highlight">{xp}</span>
                      <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">XP</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl font-serif font-black text-green-400">1/5</span>
                      <span className="text-[10px] font-mono font-bold text-white/40 uppercase tracking-widest">Quiz</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-3xl font-serif font-black text-highlight">5</span>
                      <span className="text-sm opacity-80 filter drop-shadow-sm leading-none pt-1">🐚</span>
                    </div>
                  </div>

                  {/* Rules Section */}
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-highlight font-black text-[12px] uppercase tracking-widest pl-2">
                       <span>📌</span>
                       <span>3 RÈGLES</span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {[
                        { t: "5 qualités, 1 échec.", d: "Les cauris avaient tout. Ils ont échoué parce que quelqu'un d'autre contrôlait l'offre. Bitcoin : 21 millions. Jamais plus." },
                        { t: "L'inflation est une taxe invisible.", d: "4%/an × 14 ans = −42%. 200K sous le matelas = 115K en 2024." },
                        { t: "40/40/20 = protection, pas stratégie.", d: "Chaque part protège contre un risque différent." }
                      ].map((rule, idx) => (
                        <div key={idx} className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl flex items-start gap-4">
                          <span className="text-highlight font-serif font-black text-lg leading-none mt-1">{idx + 1}</span>
                          <p className="text-[13px] text-white/70 leading-relaxed font-serif">
                            <strong className="text-highlight font-bold mr-1">{rule.t}</strong>
                            {rule.d}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="flex justify-center mt-6">
                  {isLastBeat ? (
                    <button 
                      onClick={() => onComplete(xp, cauris)}
                      className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors cursor-pointer"
                    >
                      ← retour · suite →
                    </button>
                  ) : (
                    <button onClick={handleNext} className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors cursor-pointer">
                       ← retour · suite →
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ TEXT BOX ═════════════════════════════════════════════════════════ */}
      <footer className="h-[210px] bg-black/90 border-t border-white/10 p-6 md:p-10 relative z-[120] flex flex-col items-center justify-center">
        <div className="w-full max-w-2xl relative">
          {currentBeat.character && (
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent mb-2 block drop-shadow-sm">
              {currentBeat.character.replace('_', ' ')}
            </span>
          )}

          <p className={cn(
            "text-base md:text-lg md:leading-relaxed font-serif text-white selection:bg-accent/40 drop-shadow-md",
            currentBeat.type === 'narration' ? "italic opacity-80" : ""
          )}>
            {displayedText}
            {!isComplete && <span className="inline-block w-1.5 h-4 bg-accent ml-1 animate-pulse" />}
          </p>
        </div>

        {/* Fixed "Suivant" Button - Absolute Right of Footer */}
        <div className="absolute bottom-8 right-10 md:right-16 flex items-center">
          <AnimatePresence>
            {isComplete && (
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="flex items-center gap-3 group cursor-pointer p-4"
              >
                <span className="hidden md:block text-[11px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">Suivant</span>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white group-hover:border-transparent transition-all shadow-2xl">
                  <ChevronRight size={20} />
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </footer>
      {/* ══ START SCREEN OVERLAY ════════════════════════════════════════════ */}
      <AnimatePresence>
        {showStartScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-8 text-center"
          >
            {/* Elegant Back Button */}
            <button 
              onClick={(e) => { e.stopPropagation(); onBack(); }}
              className="absolute top-10 left-10 p-3 rounded-2xl bg-white/5 border border-white/10 text-white/40 hover:text-white hover:bg-white/10 transition-all flex items-center gap-3 group active:scale-95 z-[210] cursor-pointer"
            >
              <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] pr-2">Retour au parcours</span>
            </button>

            <div className="absolute inset-0 z-0 opacity-20">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/20 blur-[120px] rounded-full" />
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10 space-y-8"
            >
              <div className="space-y-4">
                <div className="text-highlight text-[10px] font-black tracking-[0.6em] uppercase">{modulePrefix}</div>
                <h1 className="text-4xl md:text-5xl font-serif font-black text-white uppercase leading-tight max-w-xl">
                  {moduleTitle}
                </h1>
                <p className="text-white/40 text-xs tracking-widest uppercase">Préparez-vous pour le voyage</p>
              </div>

              <div className="flex flex-col items-center gap-6 pt-4">
                <button
                  onClick={handleStart}
                  disabled={isAudioLoading}
                  className={cn(
                    "group relative px-12 py-4 rounded-2xl text-white font-black text-xs uppercase tracking-[0.3em] overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-pointer",
                    isAudioLoading ? "bg-white/10 opacity-50" : "bg-accent shadow-xl shadow-accent/20"
                  )}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative">
                    {isAudioLoading ? "Chargement Audio..." : "Démarrer l'expérience"}
                  </span>
                </button>

                <div className="flex items-center gap-2 opacity-30">
                  <Zap size={10} className="text-accent" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-white">Contenu interactif & audio</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
