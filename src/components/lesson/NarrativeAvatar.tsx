import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../utils/cn';
import { CharacterKey, AVATARS } from '../../data/narrativeN01';

interface NarrativeAvatarProps {
  character: CharacterKey;
  isActive: boolean;
  side?: 'left' | 'right' | 'center';
}

export const NarrativeAvatar: React.FC<NarrativeAvatarProps> = ({ 
  character, 
  isActive, 
  side = 'center' 
}) => {
  const url = AVATARS[character];
  if (!url) return null;

  return (
    <div className={cn(
      "relative transition-all duration-700",
      isActive ? "scale-100 opacity-100" : "scale-90 opacity-40 grayscale-[40%]"
    )}>
      {/* Subtle Glow Ring */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 rounded-full bg-accent/20 blur-2xl"
          />
        )}
      </AnimatePresence>

      {/* Main Avatar Image with Floating Animation */}
      <motion.div
        animate={isActive ? {
          y: [0, -4, 0],
          scale: [1, 1.02, 1]
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={cn(
          "relative w-32 h-32 md:w-48 md:h-48 rounded-full border-2 overflow-hidden shadow-2xl z-10 transition-colors duration-500",
          isActive ? "border-highlight shadow-highlight/20" : "border-white/10"
        )}
      >
        <img 
          src={url} 
          alt={character} 
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isActive ? "scale-110" : "scale-100"
          )}
        />
        
        {/* Subtle Overlay to match theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </motion.div>

      {/* Character Label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isActive ? 1 : 0.4, y: 0 }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 z-20 whitespace-nowrap"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">
          {character.replace('_', ' ')}
        </span>
      </motion.div>
    </div>
  );
};
