import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const LionIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2a5 5 0 0 1 5 5v2a3 3 0 0 1-3 3H10a3 3 0 0 1-3-3V7a5 5 0 0 1 5-5z" />
    <path d="M7 11v1a5 5 0 0 0 5 5h0a5 5 0 0 0 5-5v-1" />
    <path d="M12 17v4" />
    <path d="M8 21h8" />
    <path d="M19 8a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2" />
    <path d="M5 8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2" />
  </svg>
);

export const EagleIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 2L4 9l2 10 6-3 6 3 2-10-8-7z" />
    <path d="M8 12h8" />
    <path d="M12 9v12" />
    <path d="M4 9l8 4 8-4" />
  </svg>
);

export const PantherIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="9" />
    <path d="M16 8l-2 2h-4l-2-2" />
    <path d="M9 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
    <path d="M15 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
    <path d="M12 15v2" />
    <path d="M10 18h4" />
  </svg>
);

export const SnakeIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z" />
    <path d="M19 5c-1.5 0-3 1-3 3v8c0 2-1.5 3-3 3H7c-1.5 0-3-1-3-3V11" />
    <path d="M11 6V3" />
    <path d="M19 19c-1.5 0-3-1-3-3" />
  </svg>
);
