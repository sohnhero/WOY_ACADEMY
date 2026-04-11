import React from 'react';
import { CinematicStoryteller } from './CinematicStoryteller';

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
  return (
    <CinematicStoryteller 
      cauris={currentCoins}
      onCaurisChange={onUpdateCoins}
      onComplete={(xp, cauris) => {
        onUpdateCoins(cauris);
        onComplete(xp, cauris);
      }}
    />
  );
};
