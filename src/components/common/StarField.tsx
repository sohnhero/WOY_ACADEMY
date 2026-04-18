import React, { useMemo } from 'react';
import { cn } from '../../utils/cn';

export const CosmicBackground = () => {
  const stars = useMemo(() => Array.from({ length: 180 }).map((_, i) => {
    const size = Math.random() * 2.5 + 0.3;
    const isSymbol = Math.random() > 0.96;
    return {
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size,
      isSymbol,
      duration: Math.random() * 12 + 6,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.6 + 0.1,
    };
  }), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="cosmic-nebula" />
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
      </div>

      {stars.map(star => (
        <div
          key={star.id}
          className={cn(
            "absolute transition-opacity duration-1000",
            star.isSymbol ? "text-accent/40" : "bg-white rounded-full"
          )}
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: !star.isSymbol && star.size > 1.5 ? `0 0 ${star.size * 3}px var(--woy-accent-glow)` : 'none',
            animation: `twinkle ${star.duration}s infinite ease-in-out ${star.delay}s`,
            transform: `scale(${star.size / 2})`
          }}
        >
          {star.isSymbol && (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};
