import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  QrCode, 
  ChevronLeft, 
  Flashlight, 
  ShieldAlert, 
  CheckCircle2, 
  X, 
  History, 
  Keyboard,
  User,
  AlertTriangle,
  Lock,
  Camera,
  ShieldCheck,
  MoreVertical,
  Activity,
  CreditCard,
  Wifi,
  WifiOff,
  Settings
} from 'lucide-react';
import { cn } from '../lib/utils';

export const GatekeeperPortal = ({ onRoleChange }: any) => {
  const [scanState, setScanState] = useState<'idle' | 'success' | 'invalid' | 'duplicate'>('idle');
  const [isScanning, setIsScanning] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  // Sync animation
  useEffect(() => {
    let interval: any;
    if (scanState === 'idle') {
      setIsScanning(true);
    } else {
      setIsScanning(false);
    }
    return () => clearInterval(interval);
  }, [scanState]);

  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] text-[var(--color-secondary)] font-sans selection:bg-primary/30 overflow-hidden flex flex-col">
      {/* Top Console */}
      <header className="p-6 flex items-center justify-between z-30 bg-[var(--surface)]/90 backdrop-blur-md shadow-sm border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onRoleChange('host')}
            className="w-10 h-10 bg-[var(--color-bg-light)] border border-[var(--border)] rounded-xl flex items-center justify-center text-gray-500 hover:text-[var(--color-secondary)] transition-colors hover:bg-[var(--border)]"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-sm font-black tracking-widest font-lexend uppercase text-gray-400">STATION 04A</h1>
            <div className="flex items-center gap-2">
               <span className="text-lg font-black tracking-tight leading-none text-[var(--color-secondary)]">UTSAV PRO 2.0</span>
               <div className="w-2 h-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_#2E7D32]"></div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-[var(--color-bg-light)] p-3 rounded-2xl text-[var(--color-secondary)] border border-[var(--border)] hover:bg-[var(--border)]"><Flashlight size={20} /></button>
          <button className="bg-[var(--color-bg-light)] p-3 rounded-2xl text-gray-500 border border-[var(--border)] hover:bg-[var(--border)]"><Settings size={20} /></button>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 relative flex flex-col items-center justify-center">
        {/* Background Layer: High contrast, clean bg */}
        <div className="absolute inset-0 bg-[var(--surface)]">
          {/* Static noise effect */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        </div>

        {/* Real-time Telemetry */}
        <div className="absolute top-10 left-6 z-20 space-y-4">
           <div className="bg-[var(--surface)]/80 backdrop-blur-xl border border-[var(--border)] p-4 rounded-2xl space-y-1 shadow-sm">
              <p className="text-[8px] font-black tracking-[0.3em] text-gray-500 uppercase">Attendance</p>
              <div className="flex items-baseline gap-2">
                 <span className="text-3xl font-lexend font-black">245</span>
                 <span className="text-xs font-bold text-gray-400">/ 500</span>
              </div>
           </div>
           <div className="bg-[var(--surface)]/80 backdrop-blur-xl border border-[var(--border)] p-3 rounded-2xl flex items-center gap-2 shadow-sm">
              {isOnline ? <Wifi size={14} className="text-success" /> : <WifiOff size={14} className="text-danger" />}
              <span className="text-[8px] font-black uppercase tracking-widest text-gray-600">{isOnline ? 'Online' : 'Syncing...'}</span>
           </div>
        </div>

        {/* Scanner HUD - High Contrast for Speed */}
        <div className="relative z-10 w-80 h-80 flex items-center justify-center bg-[var(--surface)] rounded-[3rem] shadow-2xl border-4 border-[var(--border)]">
           {/* Corner Brackets */}
           <div className="absolute inset-0 border-2 border-transparent rounded-[3rem]">
              <div className="absolute top-2 left-2 w-12 h-12 border-t-[6px] border-l-[6px] border-primary rounded-tl-[2rem]"></div>
              <div className="absolute top-2 right-2 w-12 h-12 border-t-[6px] border-r-[6px] border-primary rounded-tr-[2rem]"></div>
              <div className="absolute bottom-2 left-2 w-12 h-12 border-b-[6px] border-l-[6px] border-primary rounded-bl-[2rem]"></div>
              <div className="absolute bottom-2 right-2 w-12 h-12 border-b-[6px] border-r-[6px] border-primary rounded-br-[2rem]"></div>
           </div>

           {/* Scan Line */}
           <AnimatePresence>
             {isScanning && (
               <motion.div 
                 initial={{ top: 10 }}
                 animate={{ top: '90%' }}
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                 className="absolute left-8 right-8 h-1.5 bg-primary shadow-[0_0_20px_var(--color-primary)] z-20 rounded-full"
               />
             )}
           </AnimatePresence>

           <div className="relative flex flex-col items-center gap-4 text-black">
              <QrCode size={180} strokeWidth={1} />
              <p className="text-[10px] font-black uppercase tracking-[0.5em] animate-pulse text-gray-500">Align QR</p>
           </div>
        </div>

        {/* Status Messages overlay */}
        <AnimatePresence>
          {scanState === 'success' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="absolute inset-0 z-40 bg-success flex flex-col items-center justify-center p-8 text-black"
            >
              <motion.div 
                initial={{ rotate: -45, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                className="w-40 h-40 bg-[var(--surface)] rounded-full flex items-center justify-center shadow-2xl mb-12 text-success"
              >
                 <CheckCircle2 size={100} strokeWidth={3} />
              </motion.div>
              <h2 className="text-5xl font-lexend font-black uppercase tracking-tighter italic shadow-sm">Granted</h2>
              <p className="text-xl font-bold mt-2 opacity-90 uppercase">VIP ACCESS • TABLE 15</p>
              
              <div className="w-full bg-black/20 rounded-[3rem] p-8 mt-12 space-y-6 backdrop-blur">
                 <div className="flex gap-6 items-center">
                    <div className="w-20 h-20 rounded-full bg-[var(--surface)]/20 overflow-hidden border-2 border-white">
                       <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover" alt="Guest" />
                    </div>
                    <div>
                       <p className="text-3xl font-black font-lexend leading-none">Aarav Sharma</p>
                       <p className="text-sm font-bold uppercase opacity-80 mt-1">Verification Hash: SHA-256:8f2a...9c</p>
                    </div>
                 </div>
              </div>

              <button 
                onClick={() => setScanState('idle')}
                className="mt-auto w-full h-20 bg-[var(--surface)] text-success rounded-3xl font-lexend font-black text-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-transform"
              >
                READY FOR NEXT
              </button>
            </motion.div>
          )}

          {scanState === 'duplicate' && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="absolute inset-0 z-50 bg-warning flex flex-col items-center justify-center p-8 text-black"
            >
              <ShieldAlert size={160} strokeWidth={2} className="mb-8" />
              <h2 className="text-4xl font-lexend font-black uppercase leading-none text-center">Alert: Duplication</h2>
              <div className="w-full bg-[var(--surface)]/40 backdrop-blur rounded-[2.5rem] p-8 mt-12 space-y-6">
                 <p className="text-xs font-black uppercase tracking-widest bg-black text-white px-3 py-1 rounded inline-block">Violation log</p>
                 <div className="space-y-4">
                    <div className="flex justify-between border-b border-black/10 pb-2">
                       <span className="font-bold opacity-60">ORIGINAL SCAN</span>
                       <span className="font-black">6:15 PM (GATE 01)</span>
                    </div>
                    <div className="flex justify-between">
                       <span className="font-bold opacity-60">GUEST IDENT</span>
                       <span className="font-black">K. PRASAD (GOLD-22)</span>
                    </div>
                 </div>
              </div>

              <div className="mt-auto grid grid-cols-2 gap-4 w-full">
                 <button 
                    onClick={() => setScanState('idle')}
                    className="h-20 bg-black/10 border-2 border-black/20 rounded-3xl font-black text-xl uppercase hover:bg-black/20 transition-colors"
                 >
                    DISMISS
                 </button>
                 <button className="h-20 bg-black text-white shadow-2xl rounded-3xl font-black text-xl uppercase hover:bg-black/90 pt-1">
                    NOTIFY ADMIN
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control Center bottom toggle */}
        <div className="absolute bottom-6 w-full px-8 z-30 pb-24">
           <div className="bg-[var(--surface)]/80 backdrop-blur-2xl border border-[var(--border)] rounded-[2.5rem] p-6 flex items-center justify-between shadow-lg">
              <div className="flex gap-4">
                <button onClick={() => setScanState('success')} className="w-14 h-14 bg-success/10 text-success hover:bg-success/20 rounded-2xl flex items-center justify-center border border-success/30 transition-colors"><ShieldCheck size={24} /></button>
                <button onClick={() => setScanState('duplicate')} className="w-14 h-14 bg-warning/10 text-warning hover:bg-warning/20 rounded-2xl flex items-center justify-center border border-warning/30 transition-colors"><ShieldAlert size={24} /></button>
              </div>
              <div className="text-right">
                 <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em]">Auth System</p>
                 <p className="text-sm font-black text-gray-800">Vocal ID: OFF</p>
              </div>
           </div>
        </div>
      </main>

      {/* Manual Controls bar */}
      <div className="fixed bottom-0 left-0 right-0 h-24 bg-[var(--surface)] border-t border-[var(--border)] flex items-center justify-around px-8 z-[100] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pb-safe">
         <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-[var(--color-secondary)] transition-colors cursor-pointer">
            <History size={20} />
            <span className="text-[8px] font-black uppercase tracking-widest">Logs</span>
         </div>
         <div className="w-20 h-20 bg-[var(--color-secondary)] rounded-full -mt-20 flex items-center justify-center brutal-shadow border border-[var(--border)] group active:scale-95 transition-transform cursor-pointer">
            <Keyboard size={32} className="text-white group-hover:scale-110 transition-transform" />
         </div>
         <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-[var(--color-secondary)] transition-colors cursor-pointer">
            <Activity size={20} />
            <span className="text-[8px] font-black uppercase tracking-widest">Load</span>
         </div>
      </div>
    </div>
  );
};
