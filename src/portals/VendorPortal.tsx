import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  BadgeCheck, 
  Wallet, 
  Clock, 
  TrendingUp, 
  ChevronRight, 
  LayoutDashboard, 
  Calendar, 
  Utensils, 
  BarChart3,
  Bell,
  MoreVertical,
  Timer,
  PlusCircle,
  Edit3,
  CheckCircle,
  Eye,
  Settings,
  Search,
  Zap,
  ArrowLeft,
  ChevronLeft
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';
import { cn, formatCurrency } from '../lib/utils';
import { MOCK_VENUES, MOCK_USERS } from '../mockData';

const revenueData = [
  { name: 'Baisakh', revenue: 400 },
  { name: 'Asar', revenue: 300 },
  { name: 'Bhadra', revenue: 600 },
  { name: 'Kartik', revenue: 800 },
  { name: 'Mangsir', revenue: 1450 },
  { name: 'Magh', revenue: 900 },
  { name: 'Chaitra', revenue: 1100 },
];

export const VendorPortal = ({ onRoleChange }: any) => {
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'analytics' | 'bookings' | 'users'>('home');

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] text-[var(--color-secondary)] pb-24 font-sans selection:bg-primary/30">
      {/* Portals Switcher */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-light)]/90 backdrop-blur-md px-4 py-3 border-b border-[var(--border)] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onRoleChange('host')}
            className="p-2 hover:bg-[var(--border)] rounded-xl transition-colors text-primary"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg text-white">
              <LayoutDashboard size={18} strokeWidth={3} />
            </div>
            <span className="font-lexend font-black text-sm uppercase tracking-widest italic text-[var(--color-secondary)]">Utsav Manager</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="bg-[var(--border)] p-2 rounded-xl text-primary hover:bg-gray-200"><Bell size={18} /></button>
           <div className="w-8 h-8 rounded-full border border-primary/50 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="User" />
           </div>
        </div>
      </div>

      <main className="pt-16 p-4">
        {activeTab === 'home' && <VendorHome />}
        {activeTab === 'analytics' && <VendorAnalytics />}
        {activeTab === 'menu' && <VendorMenuEditor />}
        {activeTab === 'bookings' && <VendorBookings />}
        {activeTab === 'users' && <VendorUsers />}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-[100] bg-[var(--surface)]/95 backdrop-blur-xl border-t border-[var(--border)] h-20 px-8 flex items-center justify-around shadow-2xl safe-area-bottom text-[var(--color-secondary)]">
         <NavTab icon={<LayoutDashboard size={20} />} label="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
         <NavTab icon={<Calendar size={20} />} label="Bookings" active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')} />
         <NavTab icon={<Edit3 size={20} />} label="Menu" active={activeTab === 'menu'} onClick={() => setActiveTab('menu')} />
         <NavTab icon={<Users size={20} />} label="Users" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
      </nav>
    </div>
  );
};

const NavTab = ({ icon, label, active, onClick }: any) => (
  <button onClick={onClick} className={cn(
    "flex flex-col items-center gap-1 transition-all",
    active ? "text-accent scale-110" : "text-gray-500 opacity-60"
  )}>
    {icon}
    <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
  </button>
);

const VendorHome = () => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pb-32">
    <div className="bg-gradient-to-br from-[#2a261a] to-[#181611] border border-primary/20 rounded-[2rem] p-6 relative overflow-hidden shadow-xl">
       <div className="z-10 relative space-y-1">
          <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Total Earnings</p>
          <p className="text-4xl font-lexend font-black">रू 45,680</p>
          <div className="flex items-center gap-2 text-success pt-2">
            <TrendingUp size={14} />
            <span className="text-[10px] font-bold">+12.5% from last month</span>
          </div>
       </div>
       <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl rounded-full -mr-16 -mt-16"></div>
    </div>

    <div className="grid grid-cols-2 gap-3">
       <div className="bg-[var(--surface)] border border-[var(--border)] p-5 rounded-[1.5rem]">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">This Month</p>
          <p className="text-xl font-black mt-1">रू 12.5k</p>
          <p className="text-[9px] text-success font-black mt-1 uppercase underline">+15.2%</p>
       </div>
       <div className="bg-[var(--surface)] border border-[var(--border)] p-5 rounded-[1.5rem]">
          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Last Month</p>
          <p className="text-xl font-black mt-1">रू 10.2k</p>
          <p className="text-[9px] text-danger font-black mt-1 uppercase underline">-5.1%</p>
       </div>
    </div>

    <section className="space-y-4">
       <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-black font-lexend uppercase tracking-tighter italic">ODC Marketplace</h3>
          <button className="text-primary text-[8px] font-black uppercase tracking-widest border border-primary/30 px-3 py-1 rounded-full">PEAK SEASON MODE</button>
       </div>
       <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2rem] p-6 space-y-6 relative overflow-hidden shadow-2xl">
          <div className="flex justify-between items-center">
             <div>
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Active Hiring Needs</p>
                <p className="text-2xl font-black font-lexend mt-1">15 Staff Required</p>
             </div>
             <div className="bg-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center brutal-shadow"><PlusCircle size={24} /></div>
          </div>
          <div className="space-y-3">
             <HiringRow role="Senior Captain" count="2" pay="1200" status="URGENT" />
             <HiringRow role="Waiter (Male/Female)" count="10" pay="800" status="FILLING" />
             <HiringRow role="Kitchen Support" count="3" pay="600" status="AUTO" />
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl rounded-full -mr-12 -mt-12"></div>
       </div>
    </section>

    <div className="bg-accent/10 border border-accent/20 rounded-[1.5rem] p-4 flex items-center gap-4">
       <div className="bg-accent text-[var(--color-secondary)] p-3 rounded-xl"><Zap size={20} /></div>
       <div>
          <p className="font-black text-xs uppercase tracking-widest">Smart Suggestion</p>
          <p className="text-[10px] text-gray-600 font-medium mt-1">Increase Sait Multiplier for Mangsir 12. High demand detected.</p>
       </div>
    </div>
  </motion.div>
);

const HiringRow = ({ role, count, pay, status }: any) => (
  <div className="bg-[var(--surface)] border border-[var(--border)] p-4 rounded-2xl flex items-center justify-between group hover:bg-[var(--color-bg-light)] transition-all cursor-pointer">
     <div>
        <h5 className="font-bold text-sm leading-none">{role}</h5>
        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1.5">{count} Slots • NPR {pay}/day</p>
     </div>
     <div className={cn(
       "text-[8px] font-black px-3 py-1 rounded-full border uppercase tracking-widest",
       status === 'URGENT' ? "border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : "border-primary text-primary"
     )}>
        {status}
     </div>
  </div>
);

const EventListItem = ({ title, type, date, status }: any) => (
  <div className="bg-[var(--surface)] border border-[var(--border)] p-6 rounded-[2rem] flex items-center justify-between group hover:bg-[var(--color-bg-light)] transition-all cursor-pointer">
     <div className="flex gap-4 items-center">
        <div className="w-12 h-12 bg-[#FFD700]/10 text-primary rounded-2xl flex items-center justify-center border border-primary/20"><Calendar size={20} /></div>
        <div>
           <p className="font-bold text-base leading-none">{title}</p>
           <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-2">{type} • {date}</p>
        </div>
     </div>
     <div className="flex flex-col items-end">
        <span className="text-[9px] font-black uppercase text-primary tracking-widest">{status}</span>
        <ChevronRight size={16} className="text-[var(--color-secondary)]/20 mt-1 group-hover:translate-x-1 transition-transform" />
     </div>
  </div>
);

const OperationCard = ({ title, value, sub, status }: any) => (
  <div className="bg-[var(--surface)] border border-[var(--border)] p-4 rounded-2xl flex items-center justify-between">
     <div className="space-y-1">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{title}</p>
        <p className="text-xl font-black font-lexend">{value}</p>
        <p className="text-[10px] font-medium text-[var(--color-secondary)]/20">{sub}</p>
     </div>
     <div className={cn(
       "h-12 w-1.5 rounded-full",
       status === 'High' ? "bg-danger shadow-[0_0_10px_red]" : "bg-success"
     )}></div>
  </div>
);

const VendorAnalytics = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-32">
     <section className="space-y-4">
        <h3 className="text-lg font-black font-lexend uppercase">Revenue Trends</h3>
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2rem] p-6 shadow-2xl">
           <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="revenue" stroke="#FFD700" strokeWidth={5} fill="url(#colorRev)" />
                    <XAxis dataKey="name" hide />
                 </AreaChart>
              </ResponsiveContainer>
           </div>
           <div className="flex justify-between mt-4">
              {['Baisakh', 'Bhadra', 'Mangsir', 'Chaitra'].map(m => (
                <span key={m} className={cn(
                  "text-[9px] font-black uppercase tracking-widest",
                  m === 'Mangsir' ? "text-primary" : "text-[var(--color-secondary)]/20"
                )}>{m}</span>
              ))}
           </div>
        </div>
     </section>

     <section className="space-y-4">
        <h3 className="text-lg font-black font-lexend uppercase">Performance</h3>
        <div className="bg-gradient-to-r from-primary to-[#b8860b] rounded-[2.5rem] p-8 text-black flex items-center justify-between brutal-shadow">
           <div className="space-y-2">
              <div className="flex items-center gap-1 font-black text-[10px] uppercase tracking-[0.2em] opacity-60">
                 <BadgeCheck size={14} /> Utsav Verified
              </div>
              <div className="flex items-baseline gap-2">
                 <span className="text-6xl font-black font-lexend tracking-tighter">4.8</span>
                 <span className="text-xl font-bold opacity-40">/ 5.0</span>
              </div>
              <div className="flex gap-1">
                 {[1,2,3,4,5].map(s => <Zap key={s} size={14} fill={s <= 4 ? "black" : "none"} className={s === 5 ? "opacity-30" : ""} />)}
              </div>
              <p className="text-[10px] font-black uppercase tracking-tighter opacity-60 mt-4">Top 5% Venues in Utsavnagar</p>
           </div>
           <div className="w-24 h-24 bg-[var(--border)] rounded-full border-[6px] border-black/5 flex items-center justify-center relative">
              <Zap size={40} fill="currentColor" />
              <div className="absolute -bottom-3 bg-[var(--border)] text-[var(--color-secondary)] text-[8px] font-black px-3 py-1 rounded-full border border-gray-300 tracking-[0.2em]">TOP RATED</div>
           </div>
        </div>
     </section>
  </motion.div>
);

const VendorMenuEditor = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-32">
     <div className="flex justify-between items-center">
        <h3 className="text-xl font-black font-lexend uppercase tracking-tighter">Menu Control</h3>
        <button className="bg-[var(--surface)] text-black px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest brutal-shadow hover:bg-primary transition-colors">SAVE CHANGES</button>
     </div>

     <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-secondary)]/20 group-focus-within:text-primary transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search Sait packages..." 
          className="w-full bg-[var(--surface)] border border-[var(--border)] h-14 pl-12 pr-4 rounded-[1.5rem] outline-none focus:border-primary/50 text-sm font-bold transition-all"
        />
     </div>

     <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {['All Packages', 'Vivah', 'Bratabandha', 'Corporate'].map((cat, i) => (
          <button key={cat} className={cn(
             "px-6 h-11 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap border transition-all",
             i === 0 ? "bg-primary text-white border-primary brutal-shadow" : "bg-[var(--surface)] border-[var(--border)] text-gray-500 hover:text-white"
          )}>{cat}</button>
        ))}
     </div>

     <div className="space-y-4">
        <MenuCard 
          title="Gold Wedding" 
          sub="Subha Sait Special" 
          price="1,850" 
          multiplier="1.2x" 
          tag="HIGH DEMAND"
          tagColor="text-red-500 bg-red-500/10 border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
        />
        <MenuCard 
          title="Silver Pasni" 
          sub="Standard Sait" 
          price="1,200" 
          multiplier="1.0x" 
          tag="STANDARD"
          tagColor="text-[#bab29c] bg-[#bab29c]/10 border-[#bab29c]/20"
        />
     </div>
  </motion.div>
);

const MenuCard = ({ title, sub, price, multiplier, tag, tagColor }: any) => (
  <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2.5rem] p-6 space-y-6 relative overflow-hidden group">
     <div className="flex justify-between items-start z-10 relative">
        <div className="space-y-1">
           <span className={cn("text-[8px] font-black uppercase px-2 py-0.5 rounded border tracking-widest", tagColor)}>{tag}</span>
           <h4 className="text-2xl font-black leading-tight font-lexend pt-1">{title}</h4>
           <p className="text-[10px] font-black text-[var(--color-secondary)]/20 uppercase tracking-[0.3em] font-mono">{sub}</p>
        </div>
        <button className="w-10 h-10 bg-[var(--surface)] rounded-full flex items-center justify-center text-[var(--color-secondary)]/20 hover:text-[var(--color-secondary)] transition-colors"><MoreVertical size={18} /></button>
     </div>

     <div className="grid grid-cols-2 gap-4">
        <div className="bg-[var(--border)] p-4 rounded-[1.8rem] border border-[var(--border)] group-hover:border-[var(--border)] transition-colors">
           <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Base Price</p>
           <p className="font-lexend font-black text-lg">NPR {price}<span className="text-[9px] opacity-20 font-bold ml-1">/ plate</span></p>
        </div>
        <div className="bg-primary/5 p-4 rounded-[1.8rem] border border-primary/20 relative overflow-hidden">
           <p className="text-[8px] font-black text-primary uppercase mb-1 tracking-widest">Sait Mult.</p>
           <div className="flex items-center gap-1">
              <p className="font-lexend font-black text-lg text-primary">{multiplier}</p>
              <TrendingUp size={14} className="text-primary animate-bounce" />
           </div>
           <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-primary/10 blur-xl"></div>
        </div>
     </div>

     <div className="flex gap-4">
        <button className="flex-1 h-14 bg-[var(--surface)] border border-[var(--border)] rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] active:scale-95 transition-transform">
           <Edit3 size={16} className="text-primary" /> Edit Menu
        </button>
        <button className="flex-1 h-14 bg-[var(--surface)] border border-[var(--border)] rounded-2xl flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] active:scale-95 transition-transform">
           <Settings size={16} className="text-[#bab29c]" /> Config
        </button>
     </div>
  </div>
);

const VendorBookings = () => (
   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-32">
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-xl font-black uppercase font-lexend italic underline decoration-primary decoration-4 underline-offset-8">Sait Schedule</h3>
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest italic tracking-tighter">Bikram Sambat 2080</span>
      </div>
      
      {/* Mini Patro */}
      <div className="bg-[var(--surface)] border-2 border-[var(--border)] rounded-[2.5rem] p-6 mb-8 shadow-2xl">
         <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-black font-lexend tracking-widest">MARGASHIRSHA</h4>
            <div className="flex gap-2">
               <button className="p-2 border-2 border-[var(--border)] rounded-xl hover:bg-primary hover:text-white transition-all"><ChevronLeft size={16} /></button>
               <button className="p-2 border-2 border-[var(--border)] rounded-xl hover:bg-primary hover:text-white transition-all"><ChevronRight size={16} /></button>
            </div>
         </div>
         <div className="grid grid-cols-7 text-center text-[9px] font-black text-[var(--color-secondary)]/20 uppercase mb-4 tracking-widest">
            {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => <span key={d}>{d}</span>)}
         </div>
         <div className="grid grid-cols-7 gap-1">
            {Array.from({length: 28}).map((_, i) => (
              <div key={i} className={cn(
                "aspect-square rounded-xl flex flex-col items-center justify-center relative transition-all group cursor-pointer",
                i + 1 === 15 ? "bg-primary text-white scale-110 brutal-shadow z-10" : "bg-[var(--surface)] hover:bg-[var(--color-bg-light)]"
              )}>
                <span className="text-[10px] font-black">{i + 1}</span>
                {i % 7 === 2 && <div className={cn("absolute bottom-2 w-1 h-1 rounded-full", i + 1 === 15 ? "bg-[var(--border)]" : "bg-primary")}></div>}
              </div>
            ))}
         </div>
      </div>

      <div className="space-y-3">
         <EventListItem title="Manoj & Shrijana" type="Wedding" date="Mangsir 15" status="Full Capacity" />
         <EventListItem title="Corporate Dinner" type="Gala" date="Mangsir 18" status="Prep Mode" />
      </div>
   </motion.div>
);

const VendorUsers = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-32">
     <div className="flex justify-between items-end mb-4">
       <h3 className="text-xl font-black uppercase font-lexend tracking-tighter">Registered Users</h3>
       <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-[var(--surface)] px-3 py-1 rounded-full border border-[var(--border)]">{MOCK_USERS.length} Total</span>
     </div>

     {MOCK_USERS.length === 0 ? (
       <div className="bg-[var(--surface)] border border-[var(--border)] rounded-[2rem] p-12 text-center flex flex-col items-center">
         <Users size={48} className="text-[var(--color-secondary)]/20 mb-4" />
         <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">No Registered Users Yet</p>
       </div>
     ) : (
       <div className="space-y-3">
         {MOCK_USERS.map((user, i) => (
           <div key={i} className="bg-[var(--surface)] border border-[var(--border)] p-5 rounded-[1.5rem] flex items-center justify-between group hover:bg-[var(--color-bg-light)] transition-all">
             <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center font-black font-lexend uppercase shadow-lg shadow-primary/10">
                   {user.firstName[0]}{user.lastName && user.lastName[0]}
                </div>
                <div>
                   <p className="font-bold text-sm leading-none flex items-center gap-2">
                     {user.firstName} {user.lastName} 
                     <span className="text-[9px] font-black tracking-widest uppercase bg-[var(--color-bg-light)] px-2 py-0.5 rounded text-gray-600">
                       {user.username}
                     </span>
                   </p>
                   <p className="text-[10px] font-black text-gray-500 uppercase tracking-wide mt-1">{user.email} • {user.phone}</p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-[8px] font-black uppercase text-gray-400 tracking-widest">Joined</p>
                <p className="text-[10px] font-bold text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</p>
             </div>
           </div>
         ))}
       </div>
     )}
  </motion.div>
);

