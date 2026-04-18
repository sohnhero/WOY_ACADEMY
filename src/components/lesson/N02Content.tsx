import React from 'react';
import { CinematicStoryteller } from './CinematicStoryteller';
import { NARRATIVE_N02, QUIZ_N02 } from '../../data/narrativeN02';

interface N02ContentProps {
  onComplete: (xp: number, cauris: number) => void;
  currentCoins: number;
  onUpdateCoins: (newCoins: number) => void;
  onBack: () => void;
}

export const N02Content: React.FC<N02ContentProps> = ({
  onComplete,
  currentCoins,
  onUpdateCoins,
  onBack
}) => {
  return (
    <CinematicStoryteller
      narrative={NARRATIVE_N02}
      quizData={QUIZ_N02}
      cauris={currentCoins}
      onCaurisChange={onUpdateCoins}
      modulePrefix="MODULE N0.2"
      moduleTitle={<>C'est quoi un<br />marché financier ?</>}
      onBack={onBack}
      onComplete={(xp, cauris) => {
        onUpdateCoins(cauris);
        onComplete(xp, cauris);
      }}
    />
  );
};
