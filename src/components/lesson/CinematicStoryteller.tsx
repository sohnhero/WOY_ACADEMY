import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Zap, Coins, Trophy, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Scene, StoryBeat, NARRATIVE_N01, CharacterKey } from '../../data/narrativeN01';
import { NarrativeAvatar } from './NarrativeAvatar';
import { useTypewriter } from '../../hooks/useTypewriter';
import { audioService } from '../../utils/AudioService';

import { WaveAlert, ChoiceSystem, DevaluationSlider, NarrativeQuiz, BranchingReveal } from './NarrativeInteractions';

interface CinematicStorytellerProps {
  onComplete: (xp: number, cauris: number) => void;
  onCaurisChange: (newCauris: number) => void;
  cauris: number;
}

export const CinematicStoryteller: React.FC<CinematicStorytellerProps> = ({
  onComplete,
  cauris,
  onCaurisChange
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

  const currentScene = NARRATIVE_N01[sceneIndex];
  
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
    } else if (sceneIndex < NARRATIVE_N01.length - 1) {
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
      const prevScene = NARRATIVE_N01[sceneIndex - 1];
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

  const isLastBeat = sceneIndex === NARRATIVE_N01.length - 1 && beatIndex === activeBeats.length - 1;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm overflow-hidden flex flex-col"
      onClick={handleStageClick}
    >
      {/* ... (HUD remains same) ... */}
      <div className="absolute top-0 inset-x-0 h-20 px-6 flex items-center justify-between z-[110]">
        <div className="flex gap-1.5">
          {NARRATIVE_N01.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1 rounded-full transition-all duration-500",
                i < sceneIndex ? "w-8 bg-highlight" : i === sceneIndex ? "w-12 bg-accent shadow-[0_0_10px_rgba(var(--woy-accent-rgb),0.5)]" : "w-4 bg-white/10"
              )}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 rounded-full px-3 py-1">
            <Zap size={10} className="text-accent" />
            <span className="font-mono text-[10px] font-bold text-white">{xp} XP</span>
          </div>
          <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 rounded-full px-3 py-1">
            <Coins size={10} className="text-highlight" />
            <span className="font-mono text-[10px] font-bold text-white">{cauris}</span>
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
          {currentBeat.subText && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[200px] text-center w-full max-w-sm px-6"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80 leading-relaxed font-mono">
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
            className="absolute inset-x-0 top-0 bottom-40 z-[115] flex items-center justify-center p-6 bg-black/20"
            onClick={(e) => e.stopPropagation()}
          >
            {currentBeat.interactiveType === 'WAVE_ALERT' && (
              <WaveAlert amount="100 000" context="FCFA · Virement reçu" />
            )}

            {currentBeat.interactiveType === 'BRANCHING_REVEAL' && (
              <BranchingReveal userChoice={userChoice} />
            )}

            {currentBeat.interactiveType === 'CHOICE_SYSTEM' && (
              <ChoiceSystem
                selectedId={userChoice}
                onPick={(id) => { setUserChoice(id); setTimeout(handleNext, 800); }}
              />
            )}

            {currentBeat.interactiveType === 'DEVALUATION_SLIDER' && (
              <DevaluationSlider onComplete={() => setTimeout(handleNext, 2000)} />
            )}

            {currentBeat.interactiveType === 'QUIZ' && (
              <NarrativeQuiz
                currentXP={xp}
                onXPAdd={(v) => setXp(prev => prev + v)}
                onCaurisSpend={() => onCaurisChange(Math.max(0, cauris - 1))}
                caurisEnabled={cauris > 0}
              />
            )}

            {currentBeat.type === 'recap' && (
              <div className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl max-w-sm w-full space-y-6">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-highlight" size={24} />
                  <h2 className="text-xl font-serif font-bold text-white uppercase tracking-wider">BILAN · N0.1</h2>
                </div>

                <div className="space-y-4">
                  {[
                    { t: "5 qualités, 1 échec.", d: "Les cauris ont échoué car l'offre était contrôlée. Bitcoin : 21M." },
                    { t: "L'inflation est une taxe.", d: "4%/an × 14 ans = −42%. L'argent dort, mais il meurt." },
                    { t: "40/40/20 = protection.", d: "Chaque part protège contre un risque différent. Ne jamais tout mettre au même endroit." }
                  ].map((rule, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.3 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-highlight font-mono font-bold text-xs mt-0.5">{idx + 1}.</span>
                      <div>
                        <p className="text-sm text-white font-bold leading-tight">{rule.t}</p>
                        <p className="text-[10px] text-white/40 leading-relaxed mt-0.5">{rule.d}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-white/30 uppercase tracking-widest">Rewards</span>
                    <span className="text-lg font-mono font-bold text-highlight">+{xp} XP</span>
                  </div>
                  {isLastBeat ? (
                    <button 
                      onClick={() => onComplete(xp, cauris)}
                      className="bg-highlight hover:bg-highlight-light text-black px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-lg shadow-highlight/20"
                    >
                      Terminer
                    </button>
                  ) : (
                    <button onClick={handleNext} className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                      <ChevronRight size={20} />
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
                <div className="text-highlight text-[10px] font-black tracking-[0.6em] uppercase">MODULE N0.1</div>
                <h1 className="text-4xl md:text-5xl font-serif font-black text-white uppercase leading-tight max-w-xl">
                  L'argent : <br />Une question de confiance
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
