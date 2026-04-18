import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAppContext } from '../../context/AppContext';
import { CosmicBackground } from '../common/StarField';

interface TimeSkipOverlayProps {
  active: boolean;
  year: number;
  context: string;
  onComplete: () => void;
}

export const TimeSkipOverlay: React.FC<TimeSkipOverlayProps> = ({ active, year, context, onComplete }) => {
  const { theme } = useAppContext();
  const [displayYear, setDisplayYear] = useState(0);

  useEffect(() => {
    if (active) {
      setDisplayYear(0);
      let current = 0;
      const interval = setInterval(() => {
        if (current < year) {
          current++;
          setDisplayYear(current);
        } else {
          clearInterval(interval);
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [active, year]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex flex-col items-center justify-center p-6 overflow-hidden"
        >
          <CosmicBackground />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="relative flex flex-col items-center text-center gap-5 max-w-lg lg:ml-[330px]"
          >
            <span className={cn("text-[9px] font-mono font-black uppercase tracking-[0.4em]", theme === 'terracotta' ? "text-[#C4A055]/60" : "text-[#7B2FBE]/60")}>Saut Temporel</span>

            <div className="relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className={cn("absolute -top-3 left-0 h-[1px]", theme === 'terracotta' ? "bg-[#C4A055]/30" : "bg-[#7B2FBE]/30")}
              />
              <h2 className={cn("text-7xl md:text-8xl font-serif font-black leading-none select-none drop-shadow-2xl", theme === 'terracotta' ? "text-[#C4A055]" : "text-[#7B2FBE]")}>
                {displayYear}
              </h2>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className={cn("absolute -bottom-3 right-0 h-[1px]", theme === 'terracotta' ? "bg-[#C4A055]/30" : "bg-[#7B2FBE]/30")}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-lg md:text-xl font-serif font-bold text-white uppercase tracking-widest italic">Ans Plus Tard</span>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-xs md:text-sm text-white/40 leading-relaxed font-medium"
              >
                {context}
              </motion.p>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              onClick={onComplete}
              className={cn("mt-6 px-8 py-4 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-all group flex items-center gap-3 cursor-pointer", theme === 'terracotta' ? "hover:border-[#C4A055]/30" : "hover:border-[#7B2FBE]/30")}
            >
              <span className="text-[10px] font-black text-white/50 group-hover:text-white uppercase tracking-[0.2em] transition-colors">Découvrir le résultat</span>
              <ArrowRight size={14} className={cn("transition-transform group-hover:translate-x-1", theme === 'terracotta' ? "text-[#C4A055]" : "text-[#7B2FBE]")} />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
