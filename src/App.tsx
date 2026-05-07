import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Store, 
  ShieldCheck, 
  Briefcase,
  ChevronRight,
  User,
  Settings,
  LayoutDashboard,
  Moon,
  Sun
} from 'lucide-react';
import { PublicPortal } from './portals/PublicPortal';
import { VendorPortal } from './portals/VendorPortal';
import { GatekeeperPortal } from './portals/GatekeeperPortal';
import { GigPortal } from './portals/GigPortal';
import { LandingPage } from './portals/LandingPage';
import { Role } from './types';
import { cn } from './lib/utils';

function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="fixed top-6 right-6 z-[130] flex items-center gap-3">
      <motion.button
        onClick={() => setIsDark(!isDark)}
        className="relative w-14 h-8 bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-full p-1 flex items-center transition-colors shadow-lg"
        aria-label="Toggle theme"
      >
        <motion.div
          animate={{ x: isDark ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="w-6 h-6 bg-white dark:bg-primary rounded-full flex items-center justify-center shadow-md overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Moon size={12} className="text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Sun size={12} className="text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.button>
      <span className="hidden md:block text-[10px] font-black uppercase tracking-widest text-[#021B38] dark:text-white/40 opacity-50 select-none">
        {isDark ? 'Dark Mode' : 'Light Mode'}
      </span>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<Role>('host');

  const handleLogin = (selectedRole: Role) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
  };

  const renderPortal = () => {
    const portalProps = { 
      onRoleChange: (r: Role) => {
        if (r === ('logout' as any)) {
          setIsAuthenticated(false);
        } else {
          setRole(r);
        }
      }, 
      currentRole: role 
    };
    
    switch(role) {
      case 'host': return <PublicPortal {...portalProps} />;
      case 'vendor': return <VendorPortal {...portalProps} />;
      case 'gatekeeper': return <GatekeeperPortal {...portalProps} />;
      case 'staff': return <GigPortal {...portalProps} />;
      default: return <PublicPortal {...portalProps} />;
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <ThemeToggle />
        <LandingPage onLogin={handleLogin} />
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg-light)]">
      <ThemeToggle />
      <div className="flex-1 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderPortal()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Role Switcher Navigation (Visual Simulation of App Platform) */}
      <nav className="fixed bottom-0 left-0 right-0 z-[120] bg-[var(--surface)]/80 backdrop-blur-3xl border-t border-[var(--border)] h-24 px-8 flex items-center justify-around shadow-[0_-10px_40px_rgba(0,0,0,0.05)] safe-area-bottom">
        <NavButton 
          active={role === 'host'} 
          onClick={() => setRole('host')} 
          icon={<Home size={24} strokeWidth={2.5} />} 
          label="Sait" 
        />
        <NavButton 
          active={role === 'vendor'} 
          onClick={() => setRole('vendor')} 
          icon={<Store size={24} strokeWidth={2.5} />} 
          label="Admin" 
        />
        <NavButton 
          active={role === 'gatekeeper'} 
          onClick={() => setRole('gatekeeper')} 
          icon={<ShieldCheck size={24} strokeWidth={2.5} />} 
          label="Gate" 
        />
        <NavButton 
          active={role === 'staff'} 
          onClick={() => setRole('staff')} 
          icon={<Briefcase size={24} strokeWidth={2.5} />} 
          label="Gigs" 
        />
      </nav>
      
      {/* Decorative Home Indicator for mobile look */}
      <div className="fixed bottom-2 left-1/2 -translate-x-1/2 w-36 h-1.5 bg-gray-300 rounded-full z-[121] opacity-50"></div>
    </div>
  );
}

const NavButton = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex flex-col items-center gap-1 transition-all",
      active ? "text-accent scale-110" : "text-slate-400 grayscale"
    )}
  >
    <div className={cn(
      "p-1.5 rounded-xl",
      active && "bg-accent/10"
    )}>
      {icon}
    </div>
    <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
  </button>
);
