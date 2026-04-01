import React, { useState } from 'react';
import { 
  Globe, 
  BookOpen, 
  ShieldCheck, 
  BarChart3, 
  MessageSquare, 
  Trophy, 
  Users, 
  ArrowRight, 
  Flame, 
  User, 
  ChevronUp, 
  ChevronDown, 
  Star, 
  Medal, 
  Clock 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';

export const CommunauteScreen = () => {
  const [activeCommTab, setActiveCommTab] = useState<'chat' | 'ligue' | 'membres'>('chat');
  const [activeChannel, setActiveChannel] = useState('Général');

  const channels = [
    { id: '1', name: 'Général', icon: Globe, unread: true },
    { id: '2', name: 'N0 Débutants', icon: BookOpen, unread: false },
    { id: '3', name: 'N1 Sécurité', icon: ShieldCheck, unread: false },
    { id: '4', name: 'N2+', icon: BarChart3, unread: false },
  ];

  const messages = [
    { id: 1, user: 'Kofi', level: 'N4 Analyste', color: 'bg-green-500/20 text-green-500', initial: 'K', text: 'Qui a vu le setup BTC de ce mois ? Le support à 42k tient bien 💪', time: '14:23' },
    { id: 2, user: 'Fatou', level: 'N1 Sécurité', color: 'bg-highlight/20 text-highlight', initial: 'F', text: "Kofi tu peux expliquer c'est quoi un support ? Je suis encore en N1 😅", time: '14:25' },
    { id: 3, user: 'Kofi', level: 'N4 Analyste', color: 'bg-green-500/20 text-green-500', initial: 'K', text: 'Fatou regarde le glossaire WÔY → "Support". En gros c\'est le sol du prix.', time: '14:26' },
    { id: 4, user: 'Mariama', level: 'N1 Sécurité', color: 'bg-blue-500/20 text-blue-500', initial: 'M', text: 'Je viens de finir N1.3 ! J\'ai sécurisé mon wallet ! Seed phrase ok ✅', time: '14:28' },
  ];

  const leagueMembers = [
    { rank: 1, name: 'Kofi', xp: 520, streak: 9, up: true },
    { rank: 2, name: 'Mariama', xp: 490, streak: 12, up: true },
    { rank: 3, name: 'Yvonne', xp: 420, streak: 6, up: true },
    { rank: 5, name: 'Diallo', xp: 370, streak: 8, up: false },
    { rank: 7, name: 'Amadou (toi)', xp: 350, streak: 7, me: true },
    { rank: 17, name: 'Thierno', xp: 120, streak: 2, down: true },
  ];

  const membersList = [
    { name: 'Sadri', status: 'online', role: 'Fondateur', level: 'N6 Élite', loc: 'Dakar', streak: 45, initial: 'S', color: 'bg-accent/20 text-accent' },
    { name: 'Mohamed', status: 'online', role: 'Fondateur', level: 'N6 Élite', loc: 'Dakar', streak: 45, initial: 'M', color: 'bg-accent/20 text-accent' },
    { name: 'Kofi', status: 'online', role: 'Champion LAAMB', level: 'N4 Analyste', loc: 'Lomé', streak: 9, initial: 'K', color: 'bg-green-500/20 text-green-500' },
    { name: 'Mariama', status: 'online', level: 'N1 Sécurité', loc: 'Abidjan', streak: 12, initial: 'M', color: 'bg-blue-500/20 text-blue-500' },
    { name: 'Yvonne', status: 'online', level: 'N2 Fondamentaux', loc: 'Yaoundé', streak: 6, initial: 'Y', color: 'bg-purple-500/20 text-purple-500' },
    { name: 'Diallo', status: 'online', level: 'N0 Débutant', loc: 'Dakar', isNew: true, initial: 'D', color: 'bg-yellow-500/20 text-yellow-500' },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      {/* Header Section */}
      <section className="px-6 pb-6 max-w-6xl mx-auto w-full safe-top">
        <h2 className="text-xl font-bold font-serif uppercase tracking-[0.2em] mb-6 text-highlight">Communauté WÔY</h2>

        <div className="flex p-1.5 bg-black/40 border border-white/5 rounded-2xl backdrop-blur-md mb-2">
          {[
            { id: 'chat', label: 'Chat', icon: MessageSquare },
            { id: 'ligue', label: 'Ligue', icon: Trophy },
            { id: 'membres', label: 'Membres', icon: Users },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveCommTab(t.id as any)}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all relative cursor-pointer",
                activeCommTab === t.id ? "bg-white/5 text-white" : "text-white/40"
              )}
            >
              <t.icon size={14} className={activeCommTab === t.id ? "text-highlight" : ""} />
              <span>{t.label}</span>
              {activeCommTab === t.id && (
                <motion.div layoutId="comm-tab-indicator" className="absolute -bottom-1 w-1 h-1 rounded-full bg-highlight" />
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Tab Content */}
      <div className="flex-1 px-6 pb-40 max-w-6xl mx-auto w-full">
        {activeCommTab === 'chat' && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6">
            {/* Channels */}
            <div className="flex flex-wrap gap-2 px-1">
              {channels.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChannel(ch.name)}
                  className={cn(
                    "px-3 py-2 rounded-xl border flex items-center gap-2 text-[10px] font-bold transition-all cursor-pointer",
                    activeChannel === ch.name
                      ? "bg-highlight/10 border-highlight/30 text-highlight shadow-[0_5px_15px_rgba(196,160,85,0.1)]"
                      : "bg-white/5 border-white/10 text-white/40"
                  )}
                >
                  <ch.icon size={12} className={activeChannel === ch.name ? "text-highlight" : "text-white/40"} />
                  <span>{ch.name}</span>
                  {ch.unread && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                </button>
              ))}
            </div>

            {/* Welcome Banner */}
            <div className="bg-highlight/5 border border-highlight/20 p-5 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-highlight/10 blur-3xl opacity-20" />
              <p className="text-[11px] text-highlight leading-relaxed relative z-10 font-medium italic">
                🎉 Bienvenue dans le chat WÔY ! Respecte les règles : pas de signaux, pas de pub, entraide uniquement.
              </p>
            </div>

            {/* Message Feed */}
            <div className="flex flex-col gap-8 mt-2 pb-24">
              {messages.map((msg) => (
                <div key={msg.id} className="flex gap-4">
                  <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 text-sm font-bold border border-white/5", msg.color)}>
                    {msg.initial}
                  </div>
                  <div className="flex flex-col gap-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white/90">{msg.user}</span>
                      <span className={cn(
                        "text-[8px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider",
                        msg.level.includes('Analyste') ? "bg-green-500/10 text-green-500" : "bg-white/5 text-white/30"
                      )}>
                        {msg.level}
                      </span>
                      <span className="text-[9px] text-white/10 ml-auto whitespace-nowrap">{msg.time}</span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed font-normal">
                      {msg.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky Message Input */}
            <div className="fixed bottom-28 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-md z-50">
              <div className="relative group">
                <div className="absolute inset-0 bg-highlight/10 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <div className="relative bg-black/60 backdrop-blur-3xl border border-white/10 rounded-[1.25rem] p-3 flex items-center gap-3 shadow-2xl">
                  <input
                    type="text"
                    placeholder="Écris un message..."
                    className="flex-1 bg-transparent border-none outline-none text-base font-medium px-2 text-white placeholder:text-white/20 h-10"
                  />
                  <button className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform cursor-pointer">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeCommTab === 'ligue' && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6">
            {/* Ligue Hero Card */}
            <div className="bg-gradient-to-br from-highlight/20 via-highlight/5 to-transparent border border-highlight/30 p-8 rounded-[3rem] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-highlight/10 blur-[60px] rounded-full -mr-20 -mt-20" />

              <div className="flex items-center gap-6 relative z-10">
                <div className="w-20 h-20 bg-black/40 backdrop-blur-xl rounded-[2rem] flex items-center justify-center border border-highlight/30 shadow-2xl">
                  <Medal size={40} className="text-highlight" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xl font-bold font-serif uppercase tracking-tight text-highlight">LIGUE OR</h3>
                  <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.1em]">Semaine 12 · 20 membres</div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-accent mt-1 bg-accent/10 border border-accent/20 px-3 py-1 rounded-full w-fit">
                    <Clock size={12} />
                    <span>3 JOURS RESTANTS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Rules */}
            <div className="flex justify-center -mt-2">
              <div className="px-5 py-2.5 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md flex items-center gap-4 text-[9px] font-bold uppercase tracking-widest text-white/40">
                <div className="flex items-center gap-2 text-blue-400">
                  <ChevronUp size={12} />
                  <span>Top 4 → Diamant</span>
                </div>
                <div className="w-px h-3 bg-white/10" />
                <div className="flex items-center gap-2 text-accent">
                  <ChevronDown size={12} />
                  <span>Bas 4 → Argent</span>
                </div>
              </div>
            </div>

            {/* Leaderboard */}
            <div className="flex flex-col gap-3 pb-24">
              {leagueMembers.map((m) => (
                <div key={m.rank} className={cn(
                  "relative p-5 rounded-[2rem] border flex items-center justify-between transition-all group",
                  m.me ? "bg-accent/10 border-accent/40" : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.06]"
                )}>
                  <div className="flex items-center gap-5">
                    <span className={cn(
                      "text-lg font-black font-serif w-8 text-center",
                      m.rank <= 3 ? "text-highlight" : "text-white/10"
                    )}>
                      {m.rank}
                    </span>
                    <div className="w-12 h-12 rounded-[1.25rem] bg-black/20 flex items-center justify-center text-sm font-bold border border-white/10">
                      {m.name.charAt(0)}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-white/90 flex items-center gap-1.5">
                        {m.name} {m.up && <User size={10} className="text-blue-400 opacity-80" />}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] font-bold">
                        <span className="text-accent flex items-center gap-1">
                          <Flame size={12} /> {m.streak}j
                        </span>
                        {m.me && <span className="text-white/20 font-medium whitespace-nowrap">· -20 vs Mariama</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm font-black text-white/90 whitespace-nowrap">
                    {m.xp} <span className="text-[10px] text-white/20 font-bold ml-0.5">XP</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeCommTab === 'membres' && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6">
            {/* Stats Bar */}
            <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-3xl flex justify-between items-center text-center">
              <div className="flex flex-col gap-1">
                <span className="text-lg font-black font-serif text-white">47</span>
                <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">EN LIGNE</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col gap-1">
                <span className="text-lg font-black font-serif text-white">2 340</span>
                <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">TOTAL</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="flex flex-col gap-1">
                <span className="text-lg font-black font-serif text-white">96%</span>
                <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">ACTIFS</span>
              </div>
            </div>

            {/* Members List */}
            <div className="flex flex-col gap-3 pb-24">
              {membersList.map((m, i) => (
                <div key={i} className="p-4 rounded-[2rem] bg-white/[0.03] border border-white/[0.08] flex items-center justify-between group hover:bg-white/[0.06] transition-all">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-12 h-12 rounded-[1.25rem] flex items-center justify-center text-sm font-bold border border-white/5 shadow-inner", m.color)}>
                      {m.initial}
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-white">{m.name}</span>
                        {m.role && (
                          <span className={cn(
                            "text-[8px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider flex items-center gap-1",
                            m.role === 'Fondateur' ? "bg-highlight/20 text-highlight border border-highlight/30" : "bg-accent/10 text-accent border border-accent/20"
                          )}>
                            {m.role === 'Fondateur' ? <Star size={10} fill="currentColor" /> : <Trophy size={10} />}
                            {m.role}
                          </span>
                        )}
                        {m.role === 'Champion LAAMB' && <User size={10} className="text-blue-400 ml-1" />}
                      </div>
                      <div className="text-[10px] text-white/30 font-medium flex items-center gap-2">
                        <span>{m.level}</span>
                        <span className="opacity-30">·</span>
                        <span>{m.loc}</span>
                        {m.streak && (
                          <span className="flex items-center gap-1 text-accent font-bold ml-1">
                            <Flame size={10} fill="currentColor" className="opacity-80" /> {m.streak}j
                          </span>
                        )}
                        {m.isNew && <span className="bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded-md text-[7px] font-black ml-1">NEW</span>}
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    m.status === 'online' ? "bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.4)]" : "bg-white/5"
                  )} />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
