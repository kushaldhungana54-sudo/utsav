import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MapPin, 
  Star, 
  Verified, 
  Video, 
  Globe, 
  QrCode, 
  Wallet, 
  CornerUpRight, 
  ShieldAlert, 
  Bot, 
  X, 
  Send, 
  Camera, 
  Music, 
  Headphones, 
  Clock, 
  CheckCircle2,
  Trophy,
  ArrowRight,
  Phone,
  Menu,
  ChevronLeft,
  Share2,
  Users,
  Timer,
  Zap,
  Wind,
  Navigation,
  RefreshCw
} from 'lucide-react';
import { cn } from '../lib/utils';
import { MOCK_VENUES, MOCK_NEWS, MOCK_SPORTS, EMERGENCY_CONTACTS, CEREMONY_CHECKLIST } from '../mockData';
import { getAiResponse } from '../services/gemini';
import { GigPortal } from './GigPortal';
import { VendorPortal } from './VendorPortal';
import { SaitMatrixPage } from './SaitMatrixPage';

type ContextRole = 'Public' | 'Gig' | 'Vendor';

export const PublicPortal = ({ onRoleChange, currentRole }: any) => {
  const [activePage, setActivePage] = useState<'home' | 'sait'>('home');
  const [selectedVenue, setSelectedVenue] = useState<any>(null);
  const [lang, setLang] = useState<'EN' | 'NE' | 'MAI'>('EN');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [activeChecklist, setActiveChecklist] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const translations = {
    EN: {
      kit: 'Event Planning Kit',
      kitSub: 'Digital tools for traditional Nepalese ceremonies',
      pros: 'Utsav Professionals',
      joinPros: 'Join Pro Network',
      findPerfect: 'Find your perfect',
      partyPalace: 'Party Palace',
      searchPlaceholder: 'Search by Sait or Venue...',
      explore: 'Explore',
      saitMatrix: 'Auspicious Sait Matrix',
      bikramSambat: 'BIKRAM SAMBAT 2082',
      liveFeed: 'Utsav Live Feed',
      liveUpdates: 'Live Updates',
      details: 'Details',
      emergencyDir: 'Emergency Directory',
      ritualChecklists: 'Ritual Checklists',
      ritualSub: 'AI-guided requirements for your sacred ceremonies',
      kitTitle: 'Marriage Kit',
      aiPanditLabel: 'Utsav AI',
      aiPandit: 'Pandit & Friend',
      aiPlaceholder: 'Ask about rituals, saits, or prices...',
      featuredVenues: 'Featured Venues',
      secure: 'CCTV SECURED',
      verified: 'Utsav Verified',
      capacity: 'Capacity',
      parking: 'Parking',
      status: 'Status',
      open: 'OPEN',
      plate: '/ PLATE',
      tryTool: 'Try tool',
      available: 'AVAILABLE',
      syncSait: 'Sync Patro',
      synced: 'Synced'
    },
    NE: {
      kit: 'कार्यक्रम योजना किट',
      kitSub: 'परम्परागत समारोहका लागि डिजिटल उपकरणहरू',
      pros: 'उत्सव पेशेवरहरू',
      joinPros: 'प्रो नेटवर्कमा सामेल हुनुहोस्',
      findPerfect: 'उत्तम ठाउँ खोज्नुहोस्',
      partyPalace: 'पार्टी प्यालेस',
      searchPlaceholder: 'सैट वा ठाउँ द्वारा खोज्नुहोस्...',
      explore: 'अन्वेषण गर्नुहोस्',
      saitMatrix: 'शुभ सैट तालिका',
      bikramSambat: 'बिक्रम सम्वत २०८२',
      liveFeed: 'विराट प्रत्यक्ष फिड',
      liveUpdates: 'प्रत्यक्ष अपडेटहरू',
      details: 'विवरणहरू',
      emergencyDir: 'आपतकालीन निर्देशिका',
      ritualChecklists: 'अनुष्ठान सूची',
      ritualSub: 'तपाईंको पवित्र समारोहका लागि AI-निर्देशित आवश्यकताहरू',
      kitTitle: 'विवाह किट',
      aiPanditLabel: 'विराट एआई (AI)',
      aiPandit: 'पण्डित र साथी',
      aiPlaceholder: 'अनुष्ठान, सैट, वा मूल्य बारे सोध्नुहोस्...',
      featuredVenues: 'प्रदर्शित ठाउँहरू',
      secure: 'सीसीटीभी सुरक्षित',
      verified: 'विराट प्रमाणित',
      capacity: 'क्षमता',
      parking: 'पार्किङ',
      status: 'स्थिति',
      open: 'खुला छ',
      plate: '/ प्लेट',
      tryTool: 'उपकरण चलाउनुहोस्',
      available: 'उपलब्ध छ',
      syncSait: 'पात्रोसँग सिंक',
      synced: 'सिंक भयो'
    },
    MAI: {
      kit: 'कार्यक्रम योजना किट',
      kitSub: 'पारम्परिक समारोह के लेल डिजिटल उपकरण',
      pros: 'विराट पेशेवरसभ',
      joinPros: 'प्रो नेटवर्कमे जुड़ू',
      findPerfect: 'बेस जग्गा खोजु',
      partyPalace: 'पार्टी प्यालेस',
      searchPlaceholder: 'सैट या जगह सं खोजु...',
      explore: 'अन्वेषण करू',
      saitMatrix: 'शुभ सैट तालिका',
      bikramSambat: 'बिक्रम सम्वत २०८२',
      liveFeed: 'विराट लाइव फीड',
      liveUpdates: 'लाइव अपडेट',
      details: 'विवरण',
      emergencyDir: 'आपतकालीन निर्देशिका',
      ritualChecklists: 'अनुष्ठान सूची',
      ritualSub: 'अहाँक पवित्र समारोहक लेल AI-निर्देशित आवश्यकतासभ',
      kitTitle: 'विवाह किट',
      aiPanditLabel: 'विराट एआई (AI)',
      aiPandit: 'पण्डित आ मित्र',
      aiPlaceholder: 'अनुष्ठान, सैट, वा मूल्यक बारेमे पुछु...',
      featuredVenues: 'विशेष ठाउँसभ',
      secure: 'सीसीटीभी सुरक्षित',
      verified: 'विराट प्रमाणित',
      capacity: 'क्षमता',
      parking: 'पार्किङ',
      status: 'स्थिति',
      open: 'खुलल अछि',
      plate: '/ प्लेट',
      tryTool: 'उपकरण चलाउ',
      available: 'उपलब्ध अछि',
      syncSait: 'पात्रो सँ सिङ्क',
      synced: 'सिंक भेल'
    }
  };

  const t = translations[lang];

  // AI Chat State
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', text: string}>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sait Sync State
  const [isSyncingSait, setIsSyncingSait] = useState(false);
  const [saitSynced, setSaitSynced] = useState(false);
  const [saitsArray, setSaitsArray] = useState([
    { date: '15', month: 'MANGSIR', day: 'Wed', type: 'Subha Sait', icon: '💍', label: 'Wedding', color: 'bg-accent', delay: 0 },
    { date: '18', month: 'MANGSIR', day: 'Sat', type: 'Madhyam', icon: '🎉', label: 'Engagement', color: 'bg-orange-500', delay: 0.1 },
    { date: '21', month: 'MANGSIR', day: 'Tue', type: 'Subha Sait', icon: '👦', label: 'Bratabandha', color: 'bg-accent', delay: 0.2 },
    { date: '25', month: 'MANGSIR', day: 'Sat', type: 'Subha Sait', icon: '🥣', label: 'Pasni', color: 'bg-accent', delay: 0.3 },
  ]);

  const handleSyncPatro = () => {
    setIsSyncingSait(true);
    setSaitSynced(false);
    
    // Simulate API fetch delay
    setTimeout(() => {
      setSaitsArray([
        { date: '12', month: 'BAISHAKH', day: 'Mon', type: 'Subha Sait', icon: '💍', label: 'Wedding', color: 'bg-accent', delay: 0 },
        { date: '19', month: 'BAISHAKH', day: 'Wed', type: 'Subha Sait', icon: '👦', label: 'Bratabandha', color: 'bg-accent', delay: 0.1 },
        { date: '04', month: 'JESTHA', day: 'Thu', type: 'Madhyam', icon: '🎉', label: 'Engagement', color: 'bg-orange-500', delay: 0.2 },
        { date: '11', month: 'JESTHA', day: 'Sun', type: 'Subha Sait', icon: '🏠', label: 'Griha Prabesh', color: 'bg-accent', delay: 0.3 },
      ]);
      setSaitSynced(true);
      setIsSyncingSait(false);
    }, 1500);
  };

  useEffect(() => {
    // Reset or set initial message when language changes
    const initialGreetings = {
      EN: 'Namaste! I am your AI Pandit. How can I help you plan your event today?',
      NE: 'नमस्ते! म तपाईको एआई पण्डित हुँ। म तपाईलाई आज कसरी मद्दत गर्न सक्छु?',
      MAI: 'नमस्कार! हम अहाँक एआई पण्डित छी। आई हम अहाँक की मदत क सकैत छी?'
    };
    if (messages.length === 0 || messages.length === 1) {
      setMessages([{ role: 'assistant', text: initialGreetings[lang] }]);
    }
  }, [lang]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const userMsg = chatInput.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    const aiMsg = await getAiResponse(userMsg, lang);
    setMessages(prev => [...prev, { role: 'assistant', text: aiMsg }]);
    setIsTyping(false);
  };

  if (activePage === 'sait') {
    return <SaitMatrixPage onBack={() => setActivePage('home')} t={t} lang={lang} />;
  }

  if (selectedVenue) {
    return <VenueDetails venue={selectedVenue} onBack={() => setSelectedVenue(null)} t={t} />;
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] pb-48 font-sans text-[#1A1A1A]">
      {/* Dynamic Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[var(--surface)]/90 backdrop-blur-xl border-b border-[var(--border)] px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="bg-accent p-2 rounded-2xl text-[var(--color-secondary)] shadow-lg shadow-accent/20">
            <Globe size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight font-lexend italic leading-none">utsav</h1>
            <p className="text-[9px] font-black text-accent uppercase tracking-widest mt-1">Sait-Sync Ecosystem</p>
          </div>
        </div>
        
        <div className="flex bg-[var(--border)] p-1 rounded-2xl h-10 items-center justify-center">
          {(['EN', 'NE', 'MAI'] as const).map(l => (
            <button 
              key={l}
              onClick={() => setLang(l)}
              className={cn(
                "px-3 h-full text-[10px] font-black rounded-xl transition-all",
                lang === l ? "bg-[var(--surface)] text-accent shadow-sm" : "text-gray-400 hover:text-gray-600"
              )}
            >
              {l === 'EN' ? 'EN' : l === 'NE' ? 'नेपाली' : 'मैथिली'}
            </button>
          ))}
        </div>

        <div className="flex bg-[var(--border)] p-1 rounded-2xl h-10 items-center justify-center ml-4">
          {[
            { label: 'Public', role: 'host' },
            { label: 'Gig', role: 'staff' },
            { label: 'Admin', role: 'vendor' }
          ].map(r => (
            <button 
              key={r.role}
              onClick={() => onRoleChange(r.role)}
              className={cn(
                "px-3 h-full text-[10px] font-black rounded-xl transition-all",
                currentRole === r.role ? "bg-[#1A1A1A] text-white shadow-sm" : "text-gray-400 hover:text-gray-600"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </header>

      <main className="px-6 py-8 space-y-12">
        {/* Immersive Search Experience */}
        <section className="relative h-[480px] rounded-[3rem] overflow-hidden group shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            alt="Hero Celebration"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-10 left-8 right-8 space-y-6">
            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-2">
              <span className="bg-accent/90 text-[var(--color-secondary)] text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] mb-4 inline-block">Utsavnagar Elite</span>
              <h2 className="text-white text-5xl font-black leading-[0.95] font-lexend tracking-tighter">
                {t.findPerfect} <br /> 
                <span className="text-accent underline decoration-white/20 underline-offset-8">{t.partyPalace}</span>
              </h2>
            </motion.div>
            
            <div className="flex bg-[var(--surface)] rounded-3xl h-16 shadow-2xl p-1.5 overflow-hidden border border-white/20">
              <div className="flex items-center px-4 text-gray-300">
                <Search size={22} />
              </div>
              <input 
                type="text" 
                placeholder={t.searchPlaceholder} 
                className="flex-1 outline-none text-base font-bold placeholder:text-gray-300"
              />
              <button className="h-full bg-[#1A1A1A] text-white px-8 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl active:scale-95 transition-transform">
                {t.explore}
              </button>
            </div>
          </div>
        </section>

        {/* Sait / Auspicious Matrix */}
        <section className="space-y-6">
           <div className="flex items-center justify-between">
              <div 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setActivePage('sait')}
              >
                 <div className="w-1.5 h-6 bg-accent rounded-full group-hover:h-8 transition-all"></div>
                 <h3 className="text-2xl font-black font-lexend tracking-tight uppercase group-hover:text-accent transition-colors">{t.saitMatrix}</h3>
                 <ArrowRight size={20} className="text-accent opacity-0 group-hover:opacity-100 transition-all -ml-2 group-hover:ml-0" />
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleSyncPatro}
                  disabled={isSyncingSait}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all border",
                    saitSynced 
                      ? "text-success bg-success/10 border-success/20" 
                      : "text-accent bg-accent/10 border-accent/20 hover:bg-accent hover:text-[var(--color-secondary)]"
                  )}
                >
                  <RefreshCw size={12} className={cn(isSyncingSait && "animate-spin")} />
                  {saitSynced ? t.synced : t.syncSait}
                </button>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#B8860B] bg-[#FFD700]/10 px-3 py-1.5 rounded-full border border-[#FFD700]/20 hidden sm:block">{t.bikramSambat}</div>
              </div>
           </div>
           
           <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
              <AnimatePresence mode="popLayout">
                {saitsArray.map((sait, i) => (
                  <motion.div 
                    key={sait.month + sait.date + sait.label} 
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -20 }}
                    transition={{ duration: 0.3, delay: sait.delay }}
                    onClick={() => setActivePage('sait')}
                    className={cn(
                      "flex flex-col gap-4 min-w-[220px] p-6 rounded-[2.5rem] border transition-all cursor-pointer group relative overflow-hidden",
                      i === 0 ? "bg-[#1A1A1A] text-white border-black shadow-2xl" : "bg-[var(--surface)] border-[var(--border)] hover:border-accent/40"
                    )}
                  >
                     <div className="flex justify-between items-start z-10">
                        <div>
                           <p className="text-[10px] font-black opacity-60 uppercase">{sait.day}</p>
                           <p className="text-4xl font-lexend font-black tracking-tighter">{sait.date}</p>
                           <p className="text-[9px] font-bold opacity-40 uppercase tracking-[0.2em]">{sait.month}</p>
                        </div>
                        <div className="w-12 h-12 bg-[var(--surface)]/10 backdrop-blur rounded-2xl flex items-center justify-center text-2xl shadow-xl">{sait.icon}</div>
                     </div>
                     <div className="space-y-1 z-10">
                        <p className="text-xs font-black uppercase tracking-widest leading-none">{sait.label}</p>
                        <div className="flex items-center gap-1.5">
                           <div className={cn("w-1.5 h-1.5 rounded-full", sait.color)}></div>
                           <p className={cn("text-[9px] font-bold uppercase py-0.5", i === 0 ? "text-accent" : "text-gray-400")}>{sait.type}</p>
                        </div>
                     </div>
                     {i === 0 && <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 blur-3xl rounded-full -mr-12 -mt-12"></div>}
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>
        </section>

        {/* Old Live Feed removed, using new Community Hub below */}

        {/* Ceremony Specific Tools */}
        <section className="bg-[var(--color-bg-light)] rounded-[4rem] p-10 space-y-10">
           <div className="text-center space-y-2">
              <h3 className="text-3xl font-black font-lexend tracking-tighter uppercase italic">{t.kit}</h3>
              <p className="text-gray-400 font-medium">{t.kitSub}</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <KitCard 
                icon={<QrCode size={24} />} 
                title="Digital Invitations" 
                sub="Smart QR Guest Management" 
                desc="Generate unique QR cards to prevent gate-crashing and track arrival."
                onClick={() => setActiveTool('invitation')}
                t={t}
              />
              <KitCard 
                icon={<Wallet size={24} />} 
                title="Digital Salami" 
                sub="Easy Gift Transfers" 
                desc="Collect cash gifts securely via integrated Fonepay/eSewa QR codes."
                onClick={() => setActiveTool('salami')}
                t={t}
              />
              <KitCard 
                icon={<MapPin size={24} />} 
                title="Galli Navigation" 
                sub="Landmark Precision" 
                desc="Help guests find narrow venue lanes with landmark-based visual maps."
                onClick={() => setActiveTool('gps')}
                t={t}
              />
           </div>
        </section>

        {/* TOOL MODAL OVERLAY */}
        <AnimatePresence>
          {activeTool && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
            >
              <motion.div 
                layoutId={`tool-${activeTool}`}
                className="bg-[var(--surface)] w-full max-w-xl rounded-[3rem] overflow-hidden shadow-2xl relative"
              >
                <button 
                  onClick={() => setActiveTool(null)}
                  className="absolute top-6 right-6 w-12 h-12 bg-[var(--border)] rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors z-10"
                >
                  <X size={24} />
                </button>
                
                <div className="p-10 space-y-8">
                  {activeTool === 'invitation' && (
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 bg-accent/10 text-accent rounded-3xl flex items-center justify-center mx-auto"><QrCode size={40} /></div>
                      <div className="space-y-2">
                        <h4 className="text-2xl font-black font-lexend">QR Invitation Generator</h4>
                        <p className="text-gray-400">Enter guest names to generate secure entry passes.</p>
                      </div>
                      <div className="p-8 bg-[var(--color-bg-light)] rounded-[2rem] border-2 border-dashed border-[var(--border)] flex flex-col items-center gap-4">
                        <div className="w-48 h-48 bg-[var(--surface)] p-4 rounded-3xl shadow-xl"><div className="w-full h-full bg-[#1A1A1A] rounded-xl flex items-center justify-center text-white text-[10px] font-black uppercase tracking-widest text-center px-4">SECURE Utsav QR</div></div>
                        <button className="bg-accent text-[var(--color-secondary)] w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-accent/20">Generate Guest Pass</button>
                      </div>
                    </div>
                  )}
                  {activeTool === 'salami' && (
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-3xl flex items-center justify-center mx-auto"><Wallet size={40} /></div>
                      <div className="space-y-2">
                        <h4 className="text-2xl font-black font-lexend">Digital Salami Board</h4>
                        <p className="text-gray-400">Total Gifted: NPR 1,24,500</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="bg-green-50 p-6 rounded-3xl text-left">
                            <p className="text-[10px] font-black text-green-600 uppercase">Recent Gift</p>
                            <p className="text-lg font-black mt-1">NPR 5,100</p>
                            <p className="text-[10px] font-bold text-gray-400">From Kashi Jha</p>
                         </div>
                         <div className="bg-blue-50 p-6 rounded-3xl text-left">
                            <p className="text-[10px] font-black text-blue-600 uppercase">Transactions</p>
                            <p className="text-lg font-black mt-1">24 Received</p>
                            <p className="text-[10px] font-bold text-gray-400">Last 1 hour</p>
                         </div>
                      </div>
                    </div>
                  )}
                  {activeTool === 'gps' && (
                    <div className="text-center space-y-6">
                      <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto"><MapPin size={40} /></div>
                      <div className="space-y-2">
                        <h4 className="text-2xl font-black font-lexend">Utsavnagar Galli Map</h4>
                        <p className="text-gray-400">Showing landmark navigation for local lanes.</p>
                      </div>
                      <div className="h-64 bg-gray-200 rounded-[2rem] overflow-hidden relative border-4 border-white shadow-xl">
                         <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/87.2718,26.4525,14/600x400?access_token=none')] bg-cover"></div>
                         <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-accent px-4 py-2 rounded-full text-[var(--color-secondary)] text-[10px] font-black flex items-center gap-2 shadow-2xl">
                               <div className="w-2 h-2 rounded-full bg-[var(--surface)] animate-pulse"></div>
                               DESTINATION: BIRAT PALACE
                            </div>
                         </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* UTSAV PROFESSIONALS */}
        <section className="space-y-8">
           <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-6 bg-accent rounded-full"></div>
                 <h3 className="text-2xl font-black font-lexend tracking-tight uppercase">{t.pros}</h3>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-accent border-b-2 border-accent">{t.joinPros}</button>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ProCard icon={<Camera size={20} />} label="Photography" count="24 Verified" />
              <ProCard icon={<Headphones size={20} />} label="Professional DJ" count="12 Verified" />
              <ProCard icon={<Music size={20} />} label="Live Panche" count="8 Groups" />
              <ProCard icon={<Video size={20} />} label="Cinematography" count="15 Verified" />
           </div>
        </section>

        {/* Featured Venues Grid */}
        <section className="space-y-8">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-3xl font-black font-lexend tracking-tighter uppercase italic underline decoration-accent decoration-4 underline-offset-8">{t.featuredVenues}</h3>
            <div className="flex gap-2">
               <button className="p-3 bg-[var(--color-bg-light)] border border-[var(--border)] rounded-2xl"><Menu size={18} /></button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-12">
            {MOCK_VENUES.map(venue => (
              <VenueRowCard 
                key={venue.id}
                venue={venue} 
                onClick={() => setSelectedVenue(venue)}
                t={t}
              />
            ))}
          </div>
        </section>
        {/* CONCERTS, NEWS & SPORTS - COMMUNITY HUB */}
        <section className="space-y-8 bg-[var(--color-bg-light)] -mx-6 px-6 py-12 border-y border-[var(--border)]">
           <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-6 bg-accent rounded-full"></div>
                 <h3 className="text-3xl font-black font-lexend tracking-tighter uppercase italic">{t.liveFeed}</h3>
              </div>
              <button className="bg-[var(--surface)] px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-[var(--color-secondary)] shadow-sm border border-[var(--border)]">{t.explore}</button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* News / Concerts Feed */}
              <div className="space-y-4">
                 <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                    <Music size={16} /> Concerts & Events
                 </h4>
                 {MOCK_NEWS.map(news => (
                    <div key={news.id} className="bg-[var(--surface)] p-6 rounded-[2rem] shadow-sm border border-[var(--border)] hover:shadow-lg transition-shadow">
                       <span className="text-[9px] font-black uppercase tracking-widest bg-accent/20 text-[var(--color-secondary)] px-3 py-1 rounded-full mb-4 inline-block">{news.type}</span>
                       <h5 className="text-xl font-bold font-lexend leading-tight mb-2">{news.title}</h5>
                       <p className="text-sm text-gray-500 font-medium mb-4">{news.content}</p>
                       <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400">
                          <span className="flex items-center gap-1"><MapPin size={14} /> {news.location}</span>
                          <span className="flex items-center gap-1"><Clock size={14} /> {new Date(news.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          <span className="flex items-center gap-1"><Users size={14} /> {news.guest} Guest</span>
                       </div>
                    </div>
                 ))}
              </div>

              {/* Sports Feed */}
              <div className="space-y-4">
                 <h4 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                    <Trophy size={16} /> Regional Sports
                 </h4>
                 {MOCK_SPORTS.map(sport => (
                    <div key={sport.id} className="bg-[var(--surface)] p-6 rounded-[2rem] shadow-sm border border-[var(--border)] flex flex-col justify-between">
                       <div className="flex justify-between items-start mb-6">
                          <div>
                             <span className="text-[9px] font-black uppercase tracking-widest bg-primary/10 text-primary px-3 py-1 rounded-full mb-2 inline-block shadow-sm">Live Score</span>
                             <h5 className="text-lg font-bold font-lexend leading-tight">{sport.tournament}</h5>
                             <p className="text-xs text-gray-400 font-medium flex items-center gap-1 mt-1"><MapPin size={12} /> {sport.location}</p>
                          </div>
                      </div>
                      <div className="bg-[var(--color-bg-light)] p-4 rounded-xl border border-[var(--border)]">
                         <div className="flex justify-between items-center text-sm font-black uppercase tracking-widest">
                            <span className="text-[var(--color-secondary)]">{sport.teams.split('vs')[0].trim()}</span>
                            <span className="text-[10px] text-gray-400 px-2 flex-shrink-0">VS</span>
                            <span className="text-[var(--color-secondary)] text-right">{sport.teams.split('vs')[1].trim()}</span>
                         </div>
                         <div className="flex justify-between items-center text-3xl font-black font-lexend mt-2">
                            <span>{sport.score.split('-')[0].trim()}</span>
                            <span className="text-primary">-</span>
                            <span>{sport.score.split('-')[1].trim()}</span>
                         </div>
                         <p className="text-[10px] text-center font-bold text-gray-400 mt-2 uppercase tracking-widest">{sport.status}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* EMERGENCY & SAFETY DASHBOARD */}
        <section className="space-y-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
                 <h3 className="text-2xl font-black font-lexend tracking-tight uppercase">{t.emergencyDir}</h3>
              </div>
              <ShieldAlert className="text-red-600 animate-pulse" size={24} />
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {EMERGENCY_CONTACTS.map((contact, i) => (
                <a key={i} href={`tel:${contact.phone}`} className="bg-[var(--surface)] border border-red-50 p-5 rounded-3xl flex flex-col gap-3 hover:bg-red-50 transition-colors group">
                   <div className="w-10 h-10 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12">
                      <Phone size={20} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-red-400 uppercase tracking-widest leading-none">{contact.category}</p>
                      <p className="text-xs font-bold text-[#1A1A1A] mt-1 line-clamp-1">{contact.name}</p>
                      <p className="text-base font-black font-mono mt-1 text-red-600">{contact.phone}</p>
                   </div>
                </a>
              ))}
           </div>
        </section>

        {/* CULTURAL CHECKLISTS */}
        <section className="space-y-8">
           <div className="text-center space-y-2">
              <h3 className="text-3xl font-black font-lexend tracking-tighter uppercase italic">{t.ritualChecklists}</h3>
              <p className="text-gray-400 font-medium">{t.ritualSub}</p>
           </div>
           
           <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6">
              {Object.keys(CEREMONY_CHECKLIST).map((type) => (
                <button 
                  key={type}
                  onClick={() => setActiveChecklist(type === activeChecklist ? null : type)}
                  className={cn(
                    "px-8 h-16 rounded-3xl text-sm font-black uppercase tracking-widest border transition-all whitespace-nowrap",
                    activeChecklist === type ? "bg-[#1A1A1A] text-white border-black shadow-xl" : "bg-[var(--surface)] border-[var(--border)] text-gray-400 hover:border-accent"
                  )}
                >
                   {type === 'Vivah' ? t.kitTitle : type + ' Kit'}
                </button>
              ))}
           </div>

           <AnimatePresence>
             {activeChecklist && (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 exit={{ opacity: 0, y: 20 }}
                 className="bg-[var(--color-bg-light)] border border-[var(--border)] rounded-[3rem] p-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
               >
                  {CEREMONY_CHECKLIST[activeChecklist as keyof typeof CEREMONY_CHECKLIST].map((item, i) => (
                    <div key={i} className="bg-[var(--surface)] p-4 rounded-2xl flex items-center gap-4 shadow-sm border border-gray-50 group hover:border-accent/40 transition-all">
                       <div className="w-8 h-8 bg-accent/10 text-accent rounded-xl flex items-center justify-center"><CheckCircle2 size={16} /></div>
                       <span className="font-bold text-sm">{item}</span>
                    </div>
                  ))}
               </motion.div>
             )}
           </AnimatePresence>
        </section>

      </main>

      {/* AI FLOATING ASSISTANT */}
      <div className="fixed bottom-28 right-6 z-[200]">
         <AnimatePresence>
           {isAiOpen && (
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="absolute bottom-20 right-0 w-[90vw] max-w-md h-[500px] bg-[var(--surface)] rounded-[3rem] shadow-2xl border border-[var(--border)] overflow-hidden flex flex-col"
             >
                <div className="bg-accent p-6 flex items-center justify-between text-[var(--color-secondary)]">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--surface)]/20 rounded-2xl flex items-center justify-center"><Bot size={24} /></div>
                      <div>
                         <p className="text-xs font-black uppercase tracking-widest opacity-80">{t.aiPanditLabel}</p>
                         <h4 className="text-lg font-black font-lexend">{t.aiPandit}</h4>
                      </div>
                   </div>
                   <button onClick={() => setIsAiOpen(false)} className="bg-[var(--surface)]/10 p-2 rounded-xl"><X size={20} /></button>
                </div>
                
                <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-[var(--color-bg-light)]">
                   {messages.map((msg, i) => (
                     <div key={i} className={cn(
                       "p-4 rounded-2xl shadow-sm border max-w-[85%] text-sm font-medium",
                       msg.role === 'assistant' 
                        ? "bg-[var(--surface)] border-[var(--border)] rounded-tl-none self-start" 
                        : "bg-accent text-[var(--color-secondary)] border-accent rounded-tr-none self-end ml-auto"
                     )}>
                        {msg.text}
                     </div>
                   ))}
                   {isTyping && (
                     <div className="bg-[var(--surface)] p-4 rounded-2xl rounded-tl-none shadow-sm border border-[var(--border)] self-start">
                        <div className="flex gap-1">
                           <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce"></div>
                           <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.2s]"></div>
                           <div className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                     </div>
                   )}
                   <div ref={chatEndRef} />
                </div>

                <div className="p-6 bg-[var(--surface)] border-t border-[var(--border)]">
                   <form 
                    onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                    className="flex gap-2"
                   >
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder={t.aiPlaceholder} 
                        className="flex-1 bg-[var(--color-bg-light)] rounded-2xl px-4 text-sm font-bold outline-none border border-transparent focus:border-accent"
                      />
                      <button 
                        type="submit"
                        disabled={isTyping}
                        className="w-12 h-12 bg-accent text-[var(--color-secondary)] rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20 disabled:opacity-50"
                      >
                        <Send size={20} />
                      </button>
                   </form>
                </div>
             </motion.div>
           )}
         </AnimatePresence>
         
         <motion.button 
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           onClick={() => setIsAiOpen(!isAiOpen)}
           className="w-16 h-16 bg-[#1A1A1A] text-accent rounded-2xl flex items-center justify-center shadow-2xl brutal-shadow border-2 border-accent relative"
         >
            {isAiOpen ? <X size={28} /> : <Bot size={28} />}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-bounce"></span>
         </motion.button>
      </div>
    </div>
  );
};

const ProCard = ({ icon, label, count }: any) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-[var(--surface)] p-6 rounded-[2rem] border border-[var(--border)] shadow-sm flex flex-col items-center text-center gap-3 cursor-pointer hover:border-accent hover:shadow-xl transition-all group"
  >
     <div className="w-12 h-12 bg-accent/10 text-accent rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110">
        {icon}
     </div>
     <div>
        <p className="text-sm font-black font-lexend">{label}</p>
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-1">{count}</p>
     </div>
  </motion.div>
);

const VenueRowCard = ({ venue, onClick, t }: any) => (
  <motion.div 
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="group bg-[var(--surface)] rounded-[3rem] overflow-hidden border border-[var(--border)] shadow-sm hover:shadow-2xl transition-all cursor-pointer flex flex-col"
  >
    <div className="relative h-[400px] overflow-hidden">
      <img 
        src={venue.image} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        alt={venue.name} 
      />
      <div className="absolute top-6 left-6 flex gap-3">
        <div className="bg-[var(--surface)]/90 backdrop-blur px-4 py-2 rounded-2xl flex items-center gap-2 shadow-lg">
           <Verified size={16} className="text-accent" />
           <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]">{t.verified}</span>
        </div>
      </div>
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
         <div className="bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl text-white text-xs font-black flex items-center gap-2">
            <Video size={16} /> {t.secure}
         </div>
         <div className="bg-accent p-4 rounded-3xl text-[var(--color-secondary)] shadow-xl shadow-accent/30 font-lexend font-black">
            NPR {venue.pricePerPlate} <span className="text-[9px] font-bold opacity-60">{t.plate}</span>
         </div>
      </div>
    </div>
    
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h4 className="text-3xl font-black font-lexend tracking-tight leading-tight">{venue.name}</h4>
          <div className="flex items-center gap-2 text-gray-400">
            <MapPin size={18} className="text-accent" />
            <span className="text-sm font-bold">{venue.location}</span>
          </div>
        </div>
        <div className="bg-amber-50 px-4 py-2 rounded-2xl flex items-center gap-2 border border-amber-100">
          <Star size={20} className="text-amber-500 fill-amber-500" />
          <span className="text-xl font-black font-lexend">{venue.rating}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-50">
         <div className="space-y-1">
            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{t.capacity}</p>
            <div className="flex items-center gap-2 font-bold text-sm">
               <Users size={16} className="text-accent" />
               {venue.capacity}+ PAX
            </div>
         </div>
         <div className="space-y-1">
            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{t.parking}</p>
            <div className="flex items-center gap-2 font-bold text-sm">
               <Navigation size={16} className="text-accent" />
               {t.available}
            </div>
         </div>
         <div className="space-y-1">
            <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{t.status}</p>
            <div className="flex items-center gap-1 font-bold text-sm text-success uppercase">
               <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
               {t.open}
            </div>
         </div>
      </div>
    </div>
  </motion.div>
);

const KitCard = ({ icon, title, sub, desc, onClick, t }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    onClick={onClick}
    className="bg-[var(--surface)] p-8 rounded-[2.5rem] space-y-6 shadow-sm border border-[var(--border)] flex flex-col items-center text-center group transition-all hover:shadow-2xl hover:border-accent/20 cursor-pointer"
  >
     <div className="w-16 h-16 bg-accent rounded-[1.5rem] flex items-center justify-center text-[var(--color-secondary)] shadow-xl shadow-accent/20 transition-transform group-hover:scale-110">
        {icon}
     </div>
     <div className="space-y-2">
        <p className="text-[10px] font-black text-accent uppercase tracking-widest leading-none">{sub}</p>
        <h4 className="text-xl font-black font-lexend">{title}</h4>
        <p className="text-xs text-gray-400 font-medium leading-relaxed">{desc}</p>
     </div>
     <button className="pt-4 text-[10px] font-black uppercase tracking-widest text-[#1A1A1A] group-hover:text-accent flex items-center gap-2">
        {t.tryTool} <ArrowRight size={14} />
     </button>
  </motion.div>
);

const VenueDetails = ({ venue, onBack, t }: any) => {
  const [activeTab, setActiveTab] = useState<'details' | 'sait' | 'menu'>('details');

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="min-h-screen bg-[#FDFCFB] pb-32 font-sans text-[#1A1A1A]"
    >
      <div className="relative h-[450px]">
        <img src={venue.image} className="w-full h-full object-cover" alt={venue.name} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
        <div className="absolute top-10 left-6 right-6 flex justify-between items-center z-10">
           <button onClick={onBack} className="w-12 h-12 bg-[var(--surface)]/20 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white"><ChevronLeft size={24} /></button>
           <button className="w-12 h-12 bg-[var(--surface)]/20 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white"><Share2 size={24} /></button>
        </div>
        
        <div className="absolute bottom-10 left-8 right-8">
           <h2 className="text-white text-5xl font-black font-lexend tracking-tighter leading-[0.9]">{venue.name}</h2>
           <div className="flex items-center gap-2 mt-4 text-white/80">
              <MapPin size={18} className="text-accent" />
              <span className="text-sm font-bold uppercase tracking-widest">{venue.location}</span>
           </div>
        </div>
      </div>

      <div className="sticky top-0 bg-[var(--surface)]/80 backdrop-blur-xl border-b border-[var(--border)] px-6 h-20 flex items-center gap-8 z-30">
         {(['details', 'sait', 'menu'] as const).map(tab => (
           <button 
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={cn(
               "text-xs font-black uppercase tracking-widest h-full border-b-4 transition-all",
               activeTab === tab ? "border-accent text-[#1A1A1A]" : "border-transparent text-gray-400"
             )}
           >
             {tab}
           </button>
         ))}
      </div>

      <main className="p-8 space-y-12">
        <section className="bg-accent/10 border border-accent/20 rounded-[2.5rem] p-8 flex items-center gap-6 shadow-xl shadow-accent/5">
           <div className="w-20 h-20 bg-accent rounded-[2rem] flex items-center justify-center text-[var(--color-secondary)] shadow-2xl">
              <Zap size={40} className="animate-pulse" />
           </div>
           <div>
              <p className="text-xs font-black text-accent uppercase tracking-widest leading-none">Smart Recommendation</p>
              <h4 className="text-xl font-black font-lexend mt-2 leading-tight">Perfect for your <br /> Mangsir Ceremony</h4>
           </div>
        </section>

        {/* GALLI LANDMARK NAVIGATION */}
        <section className="space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black font-lexend uppercase tracking-tight">Galli Navigation</h3>
              <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">Landmark Precision</span>
           </div>
           <div className="bg-[var(--color-bg-light)] border border-[var(--border)] rounded-[2.5rem] p-8 space-y-8">
              <div className="relative border-l-2 border-dashed border-[var(--border)] pl-10 space-y-10">
                 <div className="relative">
                    <div className="absolute -left-[51px] top-0 w-5 h-5 bg-[var(--surface)] border-4 border-[var(--border)] rounded-full"></div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">LANDMARK 01</p>
                    <p className="text-lg font-bold">Passing Bhat-Bhateni Supermarket</p>
                 </div>
                 <div className="relative">
                    <div className="absolute -left-[51px] top-0 w-5 h-5 bg-[var(--surface)] border-4 border-accent rounded-full shadow-[0_0_10px_#0d7ff2]"></div>
                    <p className="text-[10px] font-black text-accent uppercase tracking-widest">LANDMARK 02</p>
                    <p className="text-lg font-bold">200m North from Utsav Hospital Gate</p>
                 </div>
                 <div className="relative">
                    <div className="absolute -left-[51px] top-0 w-5 h-5 bg-[var(--surface)] border-4 border-[var(--border)] rounded-full"></div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">FINAL DESTINATION</p>
                    <p className="text-lg font-black font-lexend">{venue.name}</p>
                 </div>
              </div>
              <button className="w-full h-16 bg-[var(--surface)] border-2 border-accent/20 rounded-3xl flex items-center justify-center gap-3 text-accent font-black text-xs uppercase tracking-widest brutal-shadow">
                 <CornerUpRight size={20} /> Open in Galli Maps
              </button>
           </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
           <AmenityBox icon={<AirVent size={20} />} label="Ventilation" value="Central AC" />
           <AmenityBox icon={<Zap size={20} />} label="Backup" value="250kVA Gen" />
           <AmenityBox icon={<Users size={20} />} label="Space" value="15,000 sq.ft" />
           <AmenityBox icon={<Video size={20} />} label="Security" value="Dual Layer" />
        </section>
      </main>

      {/* Primary Action Button */}
      <div className="fixed bottom-32 left-8 right-8 z-[60]">
         <motion.button 
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
           className="w-full h-20 bg-[#1A1A1A] text-white rounded-[1.8rem] brutal-shadow flex items-center justify-center gap-4 group"
         >
            <div className="flex flex-col items-start leading-none gap-1">
               <span className="text-[10px] font-black text-accent uppercase tracking-[0.2em] opacity-80">Estimated Quote</span>
               <span className="text-2xl font-lexend font-black">START BOOKING</span>
            </div>
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center transition-transform group-hover:translate-x-1"><CornerUpRight size={24} /></div>
         </motion.button>
      </div>
    </motion.div>
  );
};

const AmenityBox = ({ icon, label, value }: any) => (
  <div className="bg-[var(--color-bg-light)] border border-[var(--border)] p-6 rounded-[2rem] space-y-1">
    <div className="text-accent mb-2">{icon}</div>
    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
    <p className="text-base font-bold text-[#1A1A1A]">{value}</p>
  </div>
);

// Fallback icon for AirVent if not available in lucide
const AirVent = ({ size, className }: any) => <Wind size={size} className={className} />;
