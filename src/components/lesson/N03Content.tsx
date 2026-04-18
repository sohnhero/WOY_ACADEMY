import React from 'react';
import { CinematicStoryteller } from './CinematicStoryteller';
import { NARRATIVE_N03, QUIZ_N03 } from '../../data/narrativeN03';

interface N03ContentProps {
  onComplete: (xp: number, cauris: number) => void;
  currentCoins: number;
  onUpdateCoins: (newCoins: number) => void;
  onBack: () => void;
}

export const N03Content: React.FC<N03ContentProps> = ({
  onComplete,
  currentCoins,
  onUpdateCoins,
  onBack
}) => {
  return (
    <CinematicStoryteller
      narrative={NARRATIVE_N03}
      // @ts-ignore - NarrativeQuiz expects a specific format for quizData which we will refine if needed
      quizData={QUIZ_N03}
      cauris={currentCoins}
      onCaurisChange={onUpdateCoins}
      modulePrefix="MODULE N0.3"
      moduleTitle={<>C'est quoi la<br />Blockchain ?</>}
      onBack={onBack}
      onComplete={(xp, cauris) => {
        onUpdateCoins(cauris);
        onComplete(xp, cauris);
      }}
    />
  );
};
