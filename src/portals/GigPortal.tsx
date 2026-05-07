import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Wallet, 
  Star, 
  Bell, 
  Navigation, 
  Lock, 
  CheckCircle2, 
  AlertCircle,
  Construction,
  Zap,
  ArrowRight,
  ShieldCheck,
  Calendar,
  ChevronLeft,
  CreditCard,
  Settings,
  MoreVertical,
  Activity,
  History,
  Timer,
  Navigation2
} from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { MOCK_GIGS } from '../mockData';

export const GigPortal = ({ onRoleChange }: any) => {
  const [view, setView] = useState<'market' | 'shift' | 'earnings'>('market');
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [distance, setDistance] = useState(450); // meters

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] text-[var(--color-secondary)] pb-32 font-sans selection:bg-primary/30 overflow-x-hidden">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 bg-[var(--color-bg-light)]/80 backdrop-blur-xl border-b border-[var(--border)] px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onRoleChange('host')}
            className="w-10 h-10 bg-[var(--surface)] border border-[var(--border)] rounded-xl flex items-center justify-center text-gray-600 hover:text-[var(--color-secondary)] transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl border-2 border-accent/30 p-1 bg-gradient-to-br from-accent/20 to-transparent">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <h2 className="text-lg font-black font-lexend italic leading-none">Prabesh K.</h2>
              <div className="flex items-center gap-2 mt-1.5">
                 <span className="text-[8px] font-black text-accent uppercase tracking-widest bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20 flex items-center gap-1">
                    <ShieldCheck size={10} /> Verified Elite Pro
                 </span>
                 <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">EXP 2.4Y</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-12 h-12 bg-[var(--surface)] border border-[var(--border)] rounded-2xl flex items-center justify-center text-gray-500"><History size={20} /></button>
          <button className="relative w-12 h-12 bg-[var(--surface)] border border-[var(--border)] rounded-2xl flex items-center justify-center text-gray-500">
            <Bell size={20} />
            <span className="absolute top-3 right-3 w-2 h-2 bg-accent rounded-full animate-ping"></span>
          </button>
        </div>
      </header>

      <main className="p-6 space-y-8">
        <AnimatePresence mode="wait">
          {view === 'market' && <MarketView onGigClick={() => setView('shift')} />}
          {view === 'shift' && <ShiftView onBack={() => setView('market')} />}
          {view === 'earnings' && <EarningsView />}
        </AnimatePresence>
      </main>

      {/* Floating Bottom Nav */}
      <div className="fixed bottom-24 left-6 right-6 z-50">
        <div className="bg-[var(--surface)]/90 backdrop-blur-2xl border border-[var(--border)] rounded-3xl h-20 px-8 flex items-center justify-between shadow-2xl shadow-gray-200/40">
           <NavTab icon={<Zap size={22} />} label="Market" active={view === 'market'} onClick={() => setView('market')} />
           <NavTab icon={<Activity size={22} />} label="Active" active={view === 'shift'} onClick={() => setView('shift')} />
           <NavTab icon={<Wallet size={22} />} label="Wallet" active={view === 'earnings'} onClick={() => setView('earnings')} />
           <NavTab icon={<Settings size={22} />} label="Menu" active={false} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

const NavTab = ({ icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={cn(
    "flex flex-col items-center gap-1.5 transition-all outline-none",
    active ? "text-accent scale-110" : "text-[var(--color-secondary)]/20 hover:text-gray-500"
  )}>
    {icon}
    <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const MarketView = ({ onGigClick }: any) => (
  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-10">
    <section>
       <div className="flex items-center justify-between px-1">
          <div className="space-y-1">
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Next Payout</p>
             <p className="text-4xl font-lexend font-black flex items-baseline gap-2">रू 1,240 <span className="text-xs font-bold text-success uppercase">Today</span></p>
          </div>
          <div className="bg-accent/10 border border-accent/20 p-4 rounded-[1.8rem] text-center">
             <Star size={18} fill="#0d7ff2" className="mx-auto text-accent" />
             <p className="text-xl font-black font-lexend mt-1">4.9</p>
          </div>
       </div>
    </section>

    <div className="flex gap-2 overflow-x-auto no-scrollbar">
       {['Active Gigs', 'Hospitality', 'Security', 'Logistics'].map((cat, i) => (
         <button key={cat} className={cn(
            "px-6 h-11 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap border transition-all",
            i === 0 ? "bg-accent text-[var(--color-secondary)] border-accent brutal-shadow" : "bg-[var(--surface)] border-[var(--border)] text-gray-500"
         )}>{cat}</button>
       ))}
    </div>

    <section className="space-y-6">
       <div className="flex items-center justify-between px-1">
          <h3 className="text-xl font-black font-lexend uppercase italic tracking-tighter">New Shifts Nearby</h3>
          <Timer size={18} className="text-accent animate-pulse" />
       </div>
       <div className="space-y-4">
          {MOCK_GIGS.map(gig => (
            <GigCard 
               key={gig.id} 
               gig={gig} 
               onClick={onGigClick}
            />
          ))}
       </div>
    </section>
  </motion.div>
);

const GigCard = ({ gig, onClick }: any) => (
  <motion.div 
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] overflow-hidden group shadow-xl"
  >
    <div className="h-44 relative bg-slate-800">
       <img src={gig.id === 'g1' ? "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=1974&auto=format&fit=crop" : "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070&auto=format&fit=crop"} className="w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105" alt="Venue" />
       <div className="absolute top-4 right-4 bg-accent text-[var(--color-secondary)] text-[9px] font-black px-3 py-1.5 rounded-full shadow-2xl tracking-[0.2em]">{gig.distance}</div>
       <div className="absolute bottom-4 left-6">
          <h4 className="text-2xl font-black font-lexend tracking-tight leading-none">{gig.venueName}</h4>
          <p className="text-[10px] font-black text-accent uppercase tracking-widest mt-2">{gig.role}</p>
       </div>
    </div>
    <div className="p-8 space-y-8">
       <div className="flex justify-between items-center bg-[var(--surface)] p-5 rounded-[2rem] border border-[var(--border)]">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent"><Clock size={20} /></div>
             <p className="text-xs font-black text-gray-600 lowercase">{gig.time}</p>
          </div>
          <div className="text-right">
             <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">Base Pay</p>
             <p className="text-2xl font-black text-accent">रू {gig.pay}</p>
          </div>
       </div>

       <div className="flex gap-4">
          <button className="flex-1 h-14 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-[10px] font-black uppercase tracking-widest text-gray-500">Details</button>
          <button className="flex-[2] h-14 bg-[var(--surface)] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest brutal-shadow group active:scale-95 transition-transform flex items-center justify-center gap-2">
             CLAIM SHIFT <ArrowRight size={16} />
          </button>
       </div>
    </div>
  </motion.div>
);

const ShiftView = ({ onBack }: any) => (
  <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 z-[60] bg-[#FDFCFB] text-[#1A1A1A] flex flex-col">
    {/* Navigation Sim */}
    <div className="h-2/5 bg-gray-200 relative overflow-hidden">
       <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2066&auto=format&fit=crop" className="w-full h-full object-cover grayscale opacity-40 blur-[1px]" alt="Map" />
       <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
             <div className="w-6 h-6 bg-accent rounded-full shadow-[0_0_20px_#0d7ff2] border-4 border-white animate-pulse"></div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-accent/20 rounded-full bg-accent/5"></div>
          </div>
       </div>
       <button onClick={onBack} className="absolute top-8 left-6 w-12 h-12 bg-[var(--surface)] rounded-2xl shadow-2xl flex items-center justify-center brutal-shadow"><ChevronLeft size={24} /></button>
       
       <div className="absolute top-10 right-6 bg-accent text-[var(--color-secondary)] px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-accent/20">
          <Navigation2 size={14} className="rotate-[-45deg]" /> 180m AWAY
       </div>
    </div>

    <div className="flex-1 bg-[var(--surface)] rounded-t-[3rem] -mt-12 relative z-10 p-8 pt-10 space-y-8 flex flex-col shadow-[0_-20px_40px_rgba(0,0,0,0.1)]">
       <div className="w-16 h-1.5 bg-[var(--border)] rounded-full mx-auto mb-4"></div>
       
       <div className="text-center space-y-2">
          <h2 className="text-3xl font-black font-lexend tracking-tighter uppercase italic leading-none">Clock-in Status</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Utsav Events Hall • Main Road</p>
       </div>

       <div className="flex-1 space-y-6 overflow-y-auto">
          <div className="bg-[var(--color-bg-light)] border border-[var(--border)] p-8 rounded-[2.5rem] space-y-6">
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center"><Calendar size={24} /></div>
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Shift Timing</p>
                   <p className="text-xl font-bold font-lexend mt-1">Today, 4:00 PM <span className="opacity-20 mx-2">—</span> 11:00 PM</p>
                </div>
             </div>
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-accent/10 text-accent rounded-2xl flex items-center justify-center"><Briefcase size={24} /></div>
                <div>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Designated Role</p>
                   <p className="text-xl font-bold font-lexend mt-1 italic tracking-tight">Senior Event Captain</p>
                </div>
             </div>
          </div>

          <div className="flex flex-col gap-3">
             <button disabled className="w-full h-20 bg-[var(--border)] rounded-3xl flex items-center justify-center gap-3 text-gray-400 font-black text-2xl border-b-[6px] border-[var(--border)]">
                <Lock size={24} /> CLOCK-IN
             </button>
             <div className="flex items-center justify-center gap-2 text-red-500 font-black text-[9px] uppercase tracking-widest opacity-60">
                <AlertCircle size={14} /> You must be inside the venue perimeter
             </div>
          </div>
       </div>

       <div className="pt-4 grid grid-cols-2 gap-4">
          <button className="h-16 bg-red-50 text-red-500 border border-red-100 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 shadow-sm italic transition-all active:scale-95">
             <Construction size={18} /> EMERGENCY
          </button>
          <button className="h-16 bg-[#1A1A1A] text-[var(--color-secondary)] rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 brutal-shadow">
             <Navigation2 size={18} /> GET DIRECTIONS
          </button>
       </div>
    </div>
  </motion.div>
);

const EarningsView = () => (
   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-48">
      <div className="space-y-1">
         <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] font-mono">Available Balance</p>
         <h2 className="text-5xl font-lexend font-black flex items-baseline gap-2 italic">रू 14,800</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
         <div className="bg-accent rounded-[2rem] p-6 text-[var(--color-secondary)] brutal-shadow border-4 border-black group cursor-pointer hover:bg-[var(--surface)] hover:text-accent transition-all">
            <CreditCard size={28} className="mb-4" />
            <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-80">Withdraw to</p>
            <p className="text-lg font-black font-lexend">eSewa Wallet</p>
         </div>
         <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2rem] p-6 flex flex-col justify-between">
            <p className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Total shifts</p>
            <p className="text-3xl font-black font-lexend">24</p>
            <p className="text-[8px] font-black text-success uppercase mt-2">Verified Profile</p>
         </div>
      </div>

      <section className="space-y-6 pt-6">
         <div className="flex justify-between items-center px-1">
            <h3 className="text-xl font-black font-lexend uppercase tracking-tighter">Recent Payouts</h3>
            <button className="text-accent text-[9px] font-black uppercase tracking-widest underline underline-offset-4">View All</button>
         </div>
         <div className="space-y-3">
            {[
              { venue: 'Royal Orchid', date: 'Oct 12', amount: '2,500', status: 'Completed' },
              { venue: 'Grand Palace', date: 'Oct 09', amount: '1,800', status: 'Completed' },
              { venue: 'Heritage Plaza', date: 'Oct 04', amount: '3,200', status: 'Completed' },
            ].map((p, i) => (
               <div key={i} className="bg-[var(--surface)] border border-[var(--border)] p-5 rounded-[1.8rem] flex justify-between items-center group hover:border-accent/20 transition-all">
                  <div className="flex gap-4 items-center">
                     <div className="w-12 h-12 bg-[var(--surface)] rounded-2xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform"><Briefcase size={20} /></div>
                     <div>
                        <p className="font-bold text-base leading-none">{p.venue}</p>
                        <p className="text-[10px] font-bold text-[var(--color-secondary)]/20 uppercase tracking-widest mt-1.5">{p.date}</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="font-black text-xl text-accent leading-none">रू {p.amount}</p>
                     <p className="text-[8px] font-black text-success uppercase mt-1.5">{p.status}</p>
                  </div>
               </div>
            ))}
         </div>
      </section>
   </motion.div>
);
