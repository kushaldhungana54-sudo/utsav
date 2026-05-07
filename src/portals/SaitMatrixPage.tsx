import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Calendar, Filter, Info, Search, Star, Moon, Sun } from 'lucide-react';
import { cn } from '../lib/utils';

export const SaitMatrixPage = ({ onBack, t, lang }: any) => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const filters = ['All', 'Wedding', 'Bratabandha', 'Pasni', 'Griha Prabesh'];
  
  const saits = [
    { date: '15', month: 'MANGSIR', day: 'Wed', type: 'Subha Sait', icon: '💍', label: 'Wedding', color: 'bg-accent', details: 'Perfect planetary alignment for a lifelong bond. Favorable after 10:00 AM.' },
    { date: '18', month: 'MANGSIR', day: 'Sat', type: 'Madhyam', icon: '🎉', label: 'Engagement', color: 'bg-orange-500', details: 'Good for exchanging rings before noon. Avoid Rahu Kaal between 1:30 PM - 3:00 PM.' },
    { date: '21', month: 'MANGSIR', day: 'Tue', type: 'Subha Sait', icon: '👦', label: 'Bratabandha', color: 'bg-accent', details: 'Auspicious day for sacred thread ceremony. Morning muhurat is highly recommended.' },
    { date: '25', month: 'MANGSIR', day: 'Sat', type: 'Subha Sait', icon: '🥣', label: 'Pasni', color: 'bg-accent', details: 'Best time for the first rice feeding. Highly auspicious throughout the day.' },
    { date: '12', month: 'BAISHAKH', day: 'Mon', type: 'Subha Sait', icon: '💍', label: 'Wedding', color: 'bg-accent', details: 'Classic spring wedding date. Excellent alignment of Jupiter.' },
    { date: '19', month: 'BAISHAKH', day: 'Wed', type: 'Subha Sait', icon: '👦', label: 'Bratabandha', color: 'bg-accent', details: 'Very favorable for educational and spiritual beginnings.' },
    { date: '04', month: 'JESTHA', day: 'Thu', type: 'Madhyam', icon: '🎉', label: 'Engagement', color: 'bg-orange-500', details: 'Favorable after 2 PM. Good for bringing families together.' },
    { date: '11', month: 'JESTHA', day: 'Sun', type: 'Subha Sait', icon: '🏠', label: 'Griha Prabesh', color: 'bg-accent', details: 'Excellent for moving into a new home. Morning hours are best.' },
  ];

  const filteredSaits = activeFilter === 'All' ? saits : saits.filter(s => s.label === activeFilter);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1A1A] pb-32 font-sans selection:bg-accent/30 overflow-x-hidden">
      <header className="sticky top-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-xl border-b border-[var(--border)] px-6 py-6 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-center justify-center text-gray-500 hover:text-[#1A1A1A] hover:shadow-sm transition-all"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex flex-col items-center">
            <h1 className="text-xl font-black font-lexend uppercase tracking-widest">{t.saitMatrix || 'Sait Matrix'}</h1>
            <p className="text-[10px] font-bold text-accent uppercase tracking-widest">{t.bikramSambat || 'Bikram Sambat 2082'}</p>
        </div>
        <button className="w-10 h-10 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-center justify-center text-gray-500 hover:text-[#1A1A1A] transition-all">
          <Calendar size={18} />
        </button>
      </header>

      <main className="px-6 py-8 space-y-8">
        <section className="space-y-4">
            <div className="bg-[#1A1A1A] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/30 blur-[3rem] rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-500/20 blur-[4rem] rounded-full -ml-10 -mb-10"></div>
                <div className="relative z-10 space-y-4">
                    <h2 className="text-3xl font-black font-lexend tracking-tighter">Plan your events<br/>with the stars.</h2>
                    <p className="text-sm font-medium text-gray-400 max-w-[80%]">Discover auspicious dates verified by local astrologers and synced with the Nepalese Patro.</p>
                    <div className="pt-4 flex gap-3">
                        <button className="bg-accent px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-accent/20">Ask Pandit</button>
                        <button className="bg-[var(--surface)]/10 border border-white/20 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-white backdrop-blur">View Monthly</button>
                    </div>
                </div>
            </div>
        </section>

        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-black font-lexend uppercase tracking-widest text-gray-500">Filter by Event</h3>
                <Filter size={16} className="text-gray-400" />
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6">
                {filters.map(f => (
                    <button 
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={cn(
                            "px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                            activeFilter === f ? "bg-accent border-accent text-white shadow-lg shadow-accent/20" : "bg-[var(--surface)] border-[var(--border)] text-gray-500 hover:border-[var(--border)]"
                        )}
                    >
                        {f}
                    </button>
                ))}
            </div>
        </section>

        <section className="space-y-4">
            <AnimatePresence mode="popLayout">
                {filteredSaits.map((sait, i) => (
                    <motion.div 
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        key={sait.month + sait.date + sait.label}
                        className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-[2rem] flex gap-6 hover:shadow-xl hover:border-accent/30 transition-all cursor-pointer group"
                    >
                        <div className="flex flex-col items-center justify-center min-w-[70px] space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{sait.month}</p>
                            <p className="text-4xl font-lexend font-black">{sait.date}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-accent">{sait.day}</p>
                        </div>
                        <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{sait.icon}</span>
                                        <h4 className="text-lg font-black font-lexend uppercase">{sait.label}</h4>
                                    </div>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <div className={cn("w-2 h-2 rounded-full", sait.color)}></div>
                                        <p className={cn("text-[10px] font-black uppercase tracking-widest", sait.color === 'bg-accent' ? 'text-accent' : 'text-orange-500')}>{sait.type}</p>
                                    </div>
                                </div>
                                <button className="w-8 h-8 rounded-full bg-[var(--color-bg-light)] flex items-center justify-center text-gray-400 group-hover:bg-accent group-hover:text-white transition-colors">
                                    <Info size={14} />
                                </button>
                            </div>
                            <p className="text-xs font-medium text-gray-500 leading-relaxed">{sait.details}</p>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            
            {filteredSaits.length === 0 && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="text-center py-12 space-y-4 bg-[var(--color-bg-light)] rounded-[2rem] border border-[var(--border)]"
                >
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto text-gray-400">
                        <Search size={24} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-black uppercase tracking-widest">No dates found</p>
                        <p className="text-xs font-medium text-gray-500">Try selecting a different event type</p>
                    </div>
                </motion.div>
            )}
        </section>
      </main>
    </div>
  );
};
