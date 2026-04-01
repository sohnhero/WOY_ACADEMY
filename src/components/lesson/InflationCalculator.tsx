import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAppContext } from '../../context/AppContext';

export const InflationCalculator: React.FC = () => {
  const { theme } = useAppContext();
  const [amount, setAmount] = useState<string>('');
  const [years, setYears] = useState<string>('3');
  const inflationRate = 0.059; // 5.9%

  const calculate = () => {
    const numAmount = parseFloat(amount) || 0;
    const numYears = parseFloat(years) || 1;
    const realValue = numAmount * Math.pow(1 - inflationRate, numYears);
    const loss = numAmount - realValue;
    return { realValue, loss };
  };

  const { realValue, loss } = calculate();

  return (
    <div className={cn("bg-white/[0.02] border border-white/10 rounded-2xl p-5 md:p-7 flex flex-col gap-6 shadow-xl relative overflow-hidden group")}>
      <div className={cn("absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full -mr-16 -mt-16 transition-colors duration-700 bg-highlight/5 group-hover:bg-highlight/10")} />

      <div className="flex flex-col gap-1.5 relative z-10 text-left">
        <div className="flex items-center gap-2.5 mb-1">
          <Calculator size={14} className="text-highlight" />
          <span className={cn("text-[9px] font-black uppercase tracking-[0.3em] text-highlight")}>Outil WÔY</span>
        </div>
        <h3 className="text-base md:text-lg font-serif font-bold text-white uppercase tracking-wider">Calculateur d'inflation</h3>
        <p className="text-[10px] md:text-xs text-white/40 max-w-sm leading-relaxed">Vérifie l'impact réel de l'inflation sur une épargne immobile au Sénégal (données BCEAO).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Montant épargné (FCFA)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ex: 500 000"
            className={cn("w-full bg-white/[0.03] border border-white/10 rounded-xl p-3.5 text-sm font-mono font-bold text-white placeholder:text-white/10 outline-none transition-all focus:border-highlight/40")}
          />
        </div>
        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em]">Nombre d'années</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="Ex: 3"
            className={cn("w-full bg-white/[0.03] border border-white/10 rounded-xl p-3.5 text-sm font-mono font-bold text-white placeholder:text-white/10 outline-none transition-all focus:border-highlight/40")}
          />
        </div>
      </div>

      {amount && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 pt-4 border-t border-white/5 text-left"
        >
          <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 flex flex-col gap-2">
            <span className="text-[9px] font-black text-red-500/40 uppercase tracking-[0.15em]">Valeur réelle après {years} ans</span>
            <span className="text-3xl font-serif font-black text-red-400 leading-none">{Math.round(realValue).toLocaleString()} FCFA</span>
          </div>
          <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 flex flex-col gap-2">
            <span className="text-[9px] font-black text-red-500/40 uppercase tracking-[0.15em]">Perte de pouvoir d'achat</span>
            <span className="text-3xl font-serif font-black text-red-500 leading-none">−{Math.round(loss).toLocaleString()} FCFA</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};
