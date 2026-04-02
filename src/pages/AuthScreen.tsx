import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sun, 
  Moon, 
  User, 
  Mail, 
  Lock, 
  ArrowRight 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Logo } from '../components/common/Logo';

interface AuthScreenProps {
  onLogin: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const { theme, setTheme } = useAppContext();
  const [view, setView] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 relative z-50 min-h-[100dvh] safe-top w-full overflow-y-auto overflow-x-hidden bg-transparent">
      <button
        onClick={() => setTheme(theme === 'violet' ? 'terracotta' : 'violet')}
        className="absolute right-4 sm:right-6 p-2 rounded-full bg-white/5 border border-white/10 hover:scale-105 transition-transform z-10 cursor-pointer backdrop-blur-md hover:bg-white/10"
        style={{ top: 'max(1.5rem, env(safe-area-inset-top, 1.5rem))' }}
      >
        {theme === 'violet' ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative mt-16 sm:mt-8 mb-8"
      >
        {/* Decorative Cinematic Backglow - Unified to Accent */}
        <div className="hidden sm:block absolute -inset-2 bg-gradient-to-tr from-accent/30 via-accent/15 to-transparent rounded-[1.5rem] sm:rounded-[2rem] blur-[30px] sm:blur-[40px] opacity-80 pointer-events-none" />

        <div className="p-2 sm:p-10 sm:rounded-[2rem] bg-black/40 sm:backdrop-blur-3xl border-transparent sm:border-white/[0.08] sm:border flex flex-col items-center relative sm:overflow-hidden sm:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Interior Ambient Lights */}
          <div className="hidden sm:block absolute -top-32 -right-32 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="hidden sm:block absolute -bottom-32 -left-32 w-64 h-64 bg-white/5 blur-[80px] rounded-full pointer-events-none" />

          {/* Logo Wrapper */}
          <div className="relative mb-6 sm:mb-8">
            <div className="absolute inset-0 bg-highlight blur-[35px] opacity-25 rounded-full" />
            <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-2xl">
              <Logo className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>
          </div>

          <h1 className="text-xl sm:text-3xl font-serif font-bold tracking-[0.1em] mb-2 sm:mb-3 uppercase text-center bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent relative z-10">
            {view === 'login' ? 'Connexion' : 'L\'Élite Wôy'}
          </h1>
          <p className="text-[10px] sm:text-[11px] text-white/40 mb-8 sm:mb-10 text-center font-medium px-1 sm:px-2 leading-relaxed relative z-10">
            {view === 'login'
              ? 'Accédez à votre espace confidentiel et poursuivez votre maîtrise.'
              : 'Créez votre profil chiffré pour débuter votre parcours vers la liberté financière.'}
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3 sm:gap-4 relative z-10">
            <AnimatePresence mode="popLayout">
              {view === 'register' && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95 }}
                  className="relative overflow-hidden group"
                >
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-highlight transition-colors" />
                  <input
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3.5 sm:py-4 pl-12 pr-4 text-base font-medium focus:outline-none focus:border-highlight/50 focus:bg-highlight/[0.02] transition-all text-white placeholder:text-white/20"
                    placeholder="Nom d'opérateur"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-highlight transition-colors" />
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3.5 sm:py-4 pl-12 pr-4 text-base font-medium focus:outline-none focus:border-highlight/50 focus:bg-highlight/[0.02] transition-all text-white placeholder:text-white/20"
                placeholder="Adresse e-mail"
              />
            </div>

            <div className="relative group">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-highlight transition-colors" />
              <input
                required
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3.5 sm:py-4 pl-12 pr-4 text-base font-medium focus:outline-none focus:border-highlight/50 focus:bg-highlight/[0.02] transition-all text-white placeholder:text-white/20 tracking-widest"
                placeholder="••••••••"
              />
            </div>

            {view === 'login' && (
              <div className="flex justify-end mt-1 mb-2">
                <span className="text-[10px] uppercase tracking-widest text-white/30 font-bold cursor-pointer hover:text-highlight transition-colors">Clé d'accès perdue ?</span>
              </div>
            )}

            <button
              type="submit"
              className="mt-4 w-full relative overflow-hidden bg-accent text-white font-bold py-4 rounded-xl text-sm uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(var(--woy-accent-rgb),0.3)] hover:shadow-accent/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group cursor-pointer"
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                {view === 'login' ? 'Initialiser' : 'Créer l\'Identité'}
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </button>
          </form>

          <div className="w-full flex items-center gap-4 my-8 opacity-40 relative z-10">
            <div className="h-px bg-gradient-to-r from-transparent to-white flex-1" />
            <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-white">Sécurité Maximale</span>
            <div className="h-px bg-gradient-to-l from-transparent to-white flex-1" />
          </div>

          <div className="text-[11px] text-white/30 font-medium pb-2 flex flex-col sm:flex-row items-center justify-center gap-1.5 relative z-10 transition-colors">
            <span>{view === 'login' ? 'Protocole Wôy inactif ?' : 'Identité déjà forgée ?'}</span>
            <button
              type="button"
              onClick={() => {
                setView(view === 'login' ? 'register' : 'login');
                setEmail('');
                setPassword('');
                setName('');
              }}
              className="text-white/70 font-bold hover:text-highlight transition-colors uppercase tracking-[0.1em] cursor-pointer"
            >
              {view === 'login' ? 'Rejoindre la faction' : 'Accéder au terminal'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
