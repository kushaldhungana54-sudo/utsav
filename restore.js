import fs from 'fs';

const restoredJSX = `  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] flex flex-col lg:flex-row font-sans relative overflow-hidden">
      
      {/* Left Branding Pane - Hidden on Mobile */}
      <div className="hidden lg:flex lg:w-5/12 bg-[var(--color-secondary)] relative overflow-hidden flex-col justify-between p-12 border-r border-[#1a1a1a]">
        {/* Glow Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="absolute top-[40%] left-[20%] w-[30%] h-[30%] bg-[var(--surface)]/5 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)] pointer-events-none" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-tr from-primary to-accent rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-primary/20 border border-white/10">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <span className="font-lexend font-black text-3xl tracking-tight text-white drop-shadow-sm uppercase">Utsav<span className="font-serif italic font-medium text-xl tracking-widest text-accent lowercase ml-1">Events</span></span>
        </div>

        <div className="relative z-10 space-y-6 max-w-lg mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl lg:text-[4.5rem] font-black font-lexend tracking-tighter text-white leading-[0.9]"
          >
            Elevate your <br />
            <span className="font-serif italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#FFF] relative inline-block mt-2">
              Traditions.
              <Sparkles className="absolute -top-6 -right-8 text-accent w-8 h-8 opacity-60" />
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300 font-medium text-lg max-w-md leading-relaxed"
          >
            The all-in-one digital companion for cultural ceremonies, grand weddings, and community events in Nepal.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-4 pt-6"
          >
             <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full border-2 border-[var(--color-secondary)] bg-gray-800 bg-[url('https://i.pravatar.cc/100?img=1')] bg-cover" />
                <div className="w-12 h-12 rounded-full border-2 border-[var(--color-secondary)] bg-gray-800 bg-[url('https://i.pravatar.cc/100?img=2')] bg-cover" />
                <div className="w-12 h-12 rounded-full border-2 border-[var(--color-secondary)] bg-gray-800 bg-[url('https://i.pravatar.cc/100?img=3')] bg-cover" />
             </div>
             <div className="space-y-0.5">
               <div className="flex items-center gap-1">
                 <ShieldCheck size={14} className="text-success" />
                 <p className="text-white font-bold text-sm">Trusted by 500+ Families</p>
               </div>
               <p className="text-gray-400 text-xs font-medium">In Morang & Sunsari district</p>
             </div>
          </motion.div>
        </div>
      </div>

      {/* Right Interaction Pane */}
      <div className="flex-1 bg-[var(--color-bg-light)] flex flex-col items-center justify-center p-6 lg:p-12 relative overflow-hidden">
        
        {/* Enhanced Background Design for Mobile & Light Desktop - Professional & Elegant */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Subtle mesh gradients for a cultural, yet professional feel */}
          <div className="absolute -top-[15%] -right-[10%] w-[80vw] h-[80vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-br from-primary/5 via-accent/5 to-[var(--color-secondary)]/10 blur-[100px]" />
          <div className="absolute top-[60%] -left-[10%] w-[70vw] h-[70vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-primary/5 to-accent/5 blur-[100px]" />
          <div className="absolute top-[30%] left-[20%] w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] rounded-full bg-gradient-to-tr from-[var(--color-secondary)]/5 to-primary/5 blur-[120px]" />
          
          {/* Decorative Grid Pattern - Fine and subtle */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]" />

          {/* Minimal abstract geometric accents - very thin elegant lines */}
          <div className="absolute top-[10%] left-[10%] w-40 h-40 border border-[#000]/[0.04] rounded-full lg:hidden block" />
          <div className="absolute bottom-[15%] right-[5%] w-64 h-64 border border-[#000]/[0.03] rounded-full lg:hidden block" />
          
          {/* Subtle noise texture for premium feel */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        <div className="w-full flex items-center gap-3 justify-center lg:hidden mb-12 relative z-10">
          <div className="w-12 h-12 bg-gradient-to-tr from-primary to-[var(--color-secondary)] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20 border border-white/10">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="font-lexend font-black text-3xl tracking-tight text-[var(--color-secondary)] uppercase">Utsav<span className="font-serif italic font-medium text-xl tracking-widest text-primary lowercase ml-1">Events</span></span>
        </div>

        <div className="w-full max-w-[400px] relative z-10 space-y-10">
          
          <div className="lg:hidden text-center space-y-2 relative">
            <div className="absolute top-0 right-10 w-12 h-12 bg-accent/20 rounded-full blur-[20px]" />
            <h1 className="text-5xl font-black font-lexend tracking-tighter leading-[1.1] text-[var(--color-secondary)] drop-shadow-sm pb-1">
              Honor <br />
              <div className="relative inline-block mt-1">
                <span className="relative z-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent italic font-serif pr-2 text-6xl">
                  Traditions.
                </span>
                <Sparkles className="absolute -top-3 -right-6 text-accent w-6 h-6 opacity-80" />
              </div>
            </h1>
            <p className="text-gray-500 text-sm font-medium pt-3 px-8 leading-relaxed">The premier digital companion for cultural ceremonies in Nepal.</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[var(--surface)] p-2.5 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-[var(--border)]"
          >
            {/* Elegant Tab Switcher - only show if on login or guest */}
            {(activeTab === 'login' || activeTab === 'guest') && (
              <div className="flex bg-[var(--color-bg-light)] p-1.5 rounded-[2rem] mb-6 relative border border-[var(--border)]">
                {['login', 'guest'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => {
                        setIdentifier('');
                        setIdentifierError('');
                        setPasscode('');
                        setSuccessMessage('');
                        setActiveTab(tab as typeof activeTab);
                    }}
                    className={cn(
                      "flex-1 py-3.5 text-[11px] font-black uppercase tracking-widest rounded-[1.5rem] transition-colors relative z-10",
                      activeTab === tab ? "text-[var(--color-secondary)]" : "text-gray-400 hover:text-gray-600"
                    )}
                  >
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="active-tab" 
                        className="absolute inset-0 bg-[var(--surface)] rounded-[1.5rem] shadow-sm border border-[var(--border)]" 
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <span className="relative z-10">{tab === 'login' ? 'Sign In' : 'Guest Access'}</span>
                  </button>
                ))}
              </div>
            )}

            {/* If in signup or forgot, show a back button Instead of tabs */}
            {(activeTab === 'signup' || activeTab === 'forgot') && (
              <div className="flex items-center justify-between mb-6 px-4 pt-2">
                <button 
                  onClick={() => {
                      setSuccessMessage('');
                      setActiveTab('login');
                  }}
                  className="text-gray-400 hover:text-[var(--color-secondary)] flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors p-2 -ml-2 rounded-xl hover:bg-[var(--color-bg-light)]"
                  type="button"
                >
                   &larr; Back
                </button>
                <div className="text-[11px] font-black uppercase tracking-widest text-[var(--color-secondary)]">
                    {activeTab === 'signup' ? 'Create Account' : 'Reset PIN'}
                </div>
              </div>
            )}

            <div className="px-6 pb-6 pt-2">
              <AnimatePresence mode="wait">
                {activeTab === 'login' ? (
                  <motion.form 
                    key="login"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleLogin}
                    className="space-y-5"
                    noValidate
                  >
                    {successMessage && (
                        <div className="bg-success/10 border border-success/20 text-success text-xs font-bold p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-1">
                            <span className="text-[10px] uppercase tracking-widest opacity-80">Welcome to Utsav</span>
                            <span>{successMessage}</span>
                        </div>
                    )}
                    <div className="space-y-2 relative">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] ml-2">Phone, Email or Username</label>
                      <input 
                        type="text" 
                        value={identifier}
                        onChange={(e) => {
                            setIdentifier(e.target.value);
                            setIdentifierError('');
                        }}
                        placeholder="e.g. 98XXXXXXXX" 
                        className={cn(
                            "w-full bg-[var(--surface)] border-2 px-6 py-4 rounded-3xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm",
                            identifierError ? "border-danger focus:border-danger focus:ring-danger/10" : "border-[var(--border)]"
                        )}
                      />
                      {identifierError && (
                          <div className="text-danger text-[10px] font-bold px-2 mt-1">{identifierError}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] ml-2">Passcode / PIN</label>
                      <div className="relative">
                        <Lock size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="password" 
                          value={passcode}
                          onChange={(e) => {
                            setPasscode(e.target.value);
                            setPasscodeError('');
                          }}
                          placeholder="••••••" 
                          className={cn(
                            "w-full bg-[var(--surface)] border-2 pl-14 pr-6 py-4 rounded-3xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-mono tracking-widest shadow-sm",
                            passcodeError ? "border-danger focus:border-danger focus:ring-danger/10" : "border-[var(--border)]"
                          )}
                        />
                      </div>
                      {passcodeError && (
                          <div className="text-danger text-[10px] font-bold px-2 mt-1">{passcodeError}</div>
                      )}
                    </div>
                    
                    <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all mt-6 group shadow-lg shadow-primary/20 brutal-shadow">
                      Enter Portal
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <div className="pt-4 flex items-center justify-between text-[10px] font-bold text-gray-400 px-2 pb-2">
                        <span onClick={() => setActiveTab('forgot')} className="hover:text-[var(--color-secondary)] cursor-pointer transition-colors">Forgot PIN?</span>
                        <span onClick={() => setActiveTab('signup')} className="hover:text-primary cursor-pointer uppercase tracking-widest transition-colors">Create Account</span>
                    </div>
                  </motion.form>
                ) : activeTab === 'guest' ? (
                  <motion.div 
                    key="guest"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-6"
                  >
                    <div className="text-center space-y-3 py-2">
                        <div className="w-16 h-16 bg-primary/10 border border-primary/20 text-primary rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/10 rotate-3 transition-transform">
                            <MapPin size={28} />
                        </div>
                        <h3 className="text-2xl font-bold font-serif italic tracking-tight text-[var(--color-secondary)]">Attending an Event?</h3>
                        <p className="text-xs text-gray-500 px-2 font-medium leading-relaxed">Enter the exact venue name or the host's family name to view event details as a guest.</p>
                    </div>

                    <div className="space-y-5">
                        <div className="relative">
                            <Search size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="text"
                                value={guestId}
                                onChange={(e) => {
                                  setGuestId(e.target.value);
                                  setGuestError('');
                                }}
                                placeholder="e.g. Utsav Palace" 
                                className={cn(
                                    "w-full bg-[var(--surface)] border-2 px-6 py-4 pl-14 rounded-3xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm",
                                    guestError ? "border-danger focus:border-danger focus:ring-danger/10" : "border-[var(--border)]"
                                )}
                            />
                            {guestError && (
                                <div className="text-danger text-[10px] font-bold px-2 mt-1 -bottom-4 absolute">{guestError}</div>
                            )}
                        </div>
                        <button 
                            type="button"
                            onClick={() => {
                                if (guestId.trim().length < 3) {
                                    setGuestError('Enter a valid venue or host name.');
                                    return;
                                }
                                onLogin('host');
                            }}
                            className="w-full mt-4 bg-[var(--color-secondary)] hover:bg-black border border-[var(--color-secondary)] text-white px-6 py-4 rounded-[1.5rem] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-xl shadow-[var(--color-secondary)]/20 active:scale-95 brutal-shadow"
                        >
                            Find Event
                        </button>
                    </div>
                  </motion.div>
                ) : activeTab === 'signup' ? (
                  <motion.form 
                    key="signup"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={handleSignup}
                    className="space-y-4"
                    noValidate
                  >
                     {signupError && (
                         <div className="bg-danger/10 border border-danger/20 text-danger text-xs font-bold p-3 rounded-2xl text-center">
                             {signupError}
                         </div>
                     )}
                     <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] ml-2">First Name</label>
                         <input 
                           type="text" 
                           value={firstName}
                           onChange={e => setFirstName(e.target.value)}
                           placeholder="John" 
                           className="w-full bg-[var(--surface)] border-2 border-[var(--border)] px-5 py-3.5 rounded-3xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                           required
                         />
                       </div>
                       <div className="space-y-2">
                         <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] ml-2">Last Name</label>
                         <input 
                           type="text" 
                           value={lastName}
                           onChange={e => setLastName(e.target.value)}
                           placeholder="Doe" 
                           className="w-full bg-[var(--surface)] border-2 border-[var(--border)] px-5 py-3.5 rounded-3xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                           required
                         />
                       </div>
                     </div>
                     <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] ml-2">Email</label>
                       <input 
                         type="email" 
                         value={signupEmail}
                         onChange={e => {
                             setSignupEmail(e.target.value);
                             setSignupError('');
                         }}
                         placeholder="john@gmail.com" 
                         className="w-full bg-[var(--surface)] border-2 border-[var(--border)] px-6 py-3.5 rounded-3xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                         required
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] ml-2">Phone (10 digits)</label>
                      <input 
                        type="tel" 
                        value={signupPhone}
                         onChange={e => setSignupPhone(e.target.value)}
                        placeholder="98XXXXXXXX" 
                        maxLength={10}
                        pattern="\\d{10}"
                        className="w-full bg-[var(--surface)] border-2 border-[var(--border)] px-6 py-3.5 rounded-3xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] ml-2">Username</label>
                      <input 
                        type="text" 
                        value={signupUsername}
                         onChange={e => setSignupUsername(e.target.value)}
                        placeholder="@johndoe" 
                        className="w-full bg-[var(--surface)] border-2 border-[var(--border)] px-6 py-3.5 rounded-3xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] ml-2">Set 6-Digit PIN</label>
                      <input 
                        type="password" 
                        value={signupPin}
                         onChange={e => setSignupPin(e.target.value)}
                        maxLength={6}
                        pattern="\\d{6}"
                        placeholder="••••••" 
                        className="w-full bg-[var(--surface)] border-2 border-[var(--border)] px-6 py-3.5 rounded-3xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-mono tracking-widest shadow-sm"
                        required
                      />
                    </div>
                    <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transition-all mt-6 shadow-xl shadow-primary/30 active:scale-95 brutal-shadow">
                      Create Account
                    </button>
                  </motion.form>
                ) : (
                  <motion.form 
                    key="forgot"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    onSubmit={(e) => { 
                      e.preventDefault(); 
                      const idError = validateIdentifier(identifier);
                      if (idError) {
                        setIdentifierError(idError);
                        return;
                      }
                      setActiveTab('login'); 
                      setIdentifierError('PIN reset instructions sent if account exists.'); 
                    }}
                    className="space-y-5"
                    noValidate
                  >
                     <div className="text-center pb-2">
                        <p className="text-sm font-bold text-gray-400">Enter your registered phone number or email to reset your PIN.</p>
                     </div>
                     <div className="space-y-2 relative">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] ml-2">Phone or Email</label>
                      <input 
                        type="text" 
                        value={identifier}
                        onChange={(e) => {
                          setIdentifier(e.target.value);
                          setIdentifierError('');
                        }}
                        placeholder="e.g. 98XXXXXXXX" 
                        className={cn(
                            "w-full bg-[var(--surface)] border-2 px-6 py-4 rounded-3xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm",
                            identifierError ? "border-danger focus:border-danger focus:ring-danger/10" : "border-[var(--border)]"
                        )}
                      />
                      {identifierError && (
                          <div className="text-danger text-[10px] font-bold px-2 mt-1">{identifierError}</div>
                      )}
                    </div>
                    
                    <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-[1.5rem] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-2 transition-all mt-6 shadow-lg shadow-primary/20 active:scale-95 brutal-shadow">
                      Send Reset Instructions
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
          <div className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] relative z-10 w-full flex justify-center">
            Nepal &copy; 2026
          </div>
        </div>
      </div>
    </div>
  );
`;

const filePath = './src/portals/LandingPage.tsx';
let fileContent = fs.readFileSync(filePath, 'utf8');

// Find the index of "  return (" and replace everything from there to the end.
const returnIndex = fileContent.indexOf('  return (');
if (returnIndex !== -1) {
  fileContent = fileContent.substring(0, returnIndex) + restoredJSX + '\n};\n';
  fs.writeFileSync(filePath, fileContent, 'utf8');
  console.log('Successfully reverted LandingPage.tsx');
} else {
  console.log('return ( not found in file!');
}
