import React from 'react';
import { cn } from '../../utils/cn';
import { useAppContext } from '../../context/AppContext';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
  const { theme } = useAppContext();
  
  const logoUrl = theme === 'violet' 
    ? "https://res.cloudinary.com/drxouwbms/image/upload/v1775410860/Untitled_design_1_siy1op.png"
    : "https://res.cloudinary.com/drxouwbms/image/upload/v1775410838/Untitled_design_th39l5.png";

  return (
    <div className={cn("relative flex items-center justify-center w-10 h-10 shrink-0 cursor-pointer overflow-hidden", className)}>
      <img 
        src={logoUrl} 
        alt="Wôy Academy Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
};
