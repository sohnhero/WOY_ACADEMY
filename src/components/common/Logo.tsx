import React from 'react';
import { cn } from '../../utils/cn';
import { useAppContext } from '../../context/AppContext';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div
      className={cn("relative flex items-center justify-center w-10 h-10 shrink-0 cursor-pointer drop-shadow-[0_4_8_var(--woy-accent-glow)]", className)}
    >
      <div
        className={cn("absolute inset-0 shadow-lg shadow-black/20 bg-accent")}
        style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
      />
      <span className="relative z-10 font-serif text-xl font-bold text-white mb-0.5">W</span>
    </div>
  );
};
