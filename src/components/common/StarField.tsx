import React, { useMemo } from 'react';

export const StarField = () => {
  const stars = useMemo(() => Array.from({ length: 120 }).map((_, i) => {
    const size = Math.random() * 2 + 0.3;
    const colors = [
      'bg-white',
      'bg-blue-100/80',
      'bg-yellow-100/60',
      'bg-indigo-100/40',
      'bg-white/90'
    ];
    return {
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.7 + 0.1,
      blur: size > 1.5 ? 'blur-[0.5px]' : ''
    };
  }), []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {stars.map(star => (
        <div
          key={star.id}
          className={`absolute rounded-full transition-opacity duration-1000 ${star.color} ${star.blur}`}
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: star.size > 1.2 ? `0 0 ${star.size * 2}px ${star.size / 2}px rgba(255, 255, 255, 0.15)` : 'none',
            animation: `twinkle ${star.duration}s infinite ease-in-out ${star.delay}s`
          }}
        />
      ))}
    </div>
  );
};
