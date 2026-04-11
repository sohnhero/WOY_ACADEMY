import { useState, useEffect, useCallback, useRef } from 'react';
import { audioService } from '../utils/AudioService';

export const useTypewriter = (text: string, speed: number = 25, active: boolean = true) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDisplayedText('');
    setIsComplete(false);
    indexRef.current = 0;
  }, []);

  const skip = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    audioService.stopTypewriterLoop();
    setDisplayedText(text);
    setIsComplete(true);
    indexRef.current = text.length;
  }, [text]);

  useEffect(() => {
    if (!active) {
      audioService.stopTypewriterLoop();
      return;
    }
    
    reset();
    
    const type = () => {
      if (indexRef.current < text.length) {
        if (indexRef.current === 0) {
          audioService.startTypewriterLoop();
        }

        const nextChar = text[indexRef.current];
        setDisplayedText(prev => prev + nextChar);
        
        indexRef.current++;
        timerRef.current = setTimeout(type, speed);
      } else {
        setIsComplete(true);
        audioService.stopTypewriterLoop();
      }
    };

    timerRef.current = setTimeout(type, 100);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      audioService.stopTypewriterLoop();
    };
  }, [text, speed, active, reset]);

  return { displayedText, isComplete, skip };
};
