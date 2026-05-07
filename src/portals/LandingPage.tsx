import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Lock,
  MapPin,
  Search,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Role } from "../types";
import { MOCK_USERS } from "../mockData";

const Branding = ({ className, isMobile }: { className?: string; isMobile?: boolean }) => {
  return (
    <div className={cn("relative flex flex-col items-center lg:items-start select-none", className)}>
      <motion.div 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-1 group"
      >
        <span 
          className={cn(
            "font-black bg-gradient-to-r from-[#B91C1C] to-[#F27A1A] bg-clip-text text-transparent leading-none",
            isMobile ? "text-5xl" : "text-7xl"
          )}
          style={{ fontFamily: '"Noto Sans Devanagari", sans-serif' }}
        >
          उत्स
        </span>
        <span 
          className={cn(
            "font-black text-[#021B38] tracking-tighter font-lexend mt-auto pb-1",
            isMobile ? "text-6xl" : "text-8xl"
          )}
        >
          AV
        </span>
      </motion.div>
      <div className={cn("flex items-center gap-3 mt-1 opacity-70", isMobile ? "justify-center" : "")}>
        <div className="h-[1px] w-6 bg-accent/40"></div>
        <span className="text-[10px] font-black text-[#021B38] tracking-[0.2em] uppercase">
          Where Tradition Meets Technology
        </span>
        <div className="h-[1px] w-6 bg-accent/40"></div>
      </div>
    </div>
  );
};

export const LandingPage = ({ onLogin }: { onLogin: (role: Role) => void }) => {
  const [activeTab, setActiveTab] = useState<
    "login" | "guest" | "signup" | "forgot"
  >("login");
  const [forgotStep, setForgotStep] = useState<"email" | "otp" | "reset">("email");
  const [otpValue, setOtpValue] = useState("");
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [identifierError, setIdentifierError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPin, setSignupPin] = useState("");
  const [signupError, setSignupError] = useState("");

  const [guestId, setGuestId] = useState("");
  const [guestError, setGuestError] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      setSignupError("First name and last name are required.");
      return;
    }
    if (!signupUsername.trim()) {
      setSignupError("Username is required.");
      return;
    }

    if (!signupPhone || !/^\d{10}$/.test(signupPhone)) {
      setSignupError(
        "Incorrect phone: Phone number must be exactly 10 digits.",
      );
      return;
    }

    if (!signupEmail || !signupEmail.toLowerCase().endsWith("@gmail.com")) {
      setSignupError("Incorrect email: Must be a @gmail.com address.");
      return;
    }

    if (!signupPin || !/^\d{6}$/.test(signupPin)) {
      setSignupError("Incorrect PIN: 6 digit PIN is compulsory.");
      return;
    }

    // Pass validation
    setSignupError("");
    MOCK_USERS.push({
      firstName,
      lastName,
      email: signupEmail,
      phone: signupPhone,
      username: signupUsername,
      pin: signupPin,
      createdAt: new Date().toISOString(),
    });

    // Instead of auto login, transition to sign in
    setIdentifier(signupUsername || signupEmail || signupPhone);
    setSuccessMessage("Account created successfully! Please sign in.");
    setActiveTab("login");
  };

  const validateIdentifier = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      return "Please enter Phone, Email, or Username";
    }
    // If it's all digits, enforce 10 digits
    if (/^\d+$/.test(trimmed)) {
      if (trimmed.length !== 10) {
        return "Incorrect phone: must be exactly 10 digits";
      }
    } else if (trimmed.includes("@")) {
      // Basic email validation
      if (!trimmed.endsWith("@gmail.com")) {
        return "Incorrect mail: Must end with @gmail.com";
      }
    } else if (trimmed.length < 3) {
      return "Username must be at least 3 characters";
    }
    return "";
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const idError = validateIdentifier(identifier);
    if (idError) {
      setIdentifierError(idError);
      return;
    }
    setIdentifierError("");

    if (!passcode) {
      setPasscodeError("Please enter your passcode or PIN");
      return;
    }

    const lowerPass = passcode.toLowerCase();
    if (lowerPass === "admin") onLogin("vendor");
    else if (lowerPass === "staff") onLogin("staff");
    else if (lowerPass === "gate") onLogin("gatekeeper");
    else if (lowerPass === "123456") onLogin("host");
    else setPasscodeError("Incorrect PIN. Please try again.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-sans relative overflow-hidden bg-[#021B38] text-[var(--charcoal)] p-3 md:p-8">
      {/* Main App Container - Floating Glass */}
      <div className="w-full max-w-7xl bg-[#FDFBF7]/98 backdrop-blur-3xl rounded-3xl md:rounded-[2.5rem] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.3)] border border-white/30 flex flex-col lg:flex-row overflow-hidden relative z-10 min-h-screen lg:min-h-[85vh]">
        {/* Left Branding Pane */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 lg:p-14 z-10">
          {/* Subtle Cultural Pattern Overlay inside pane */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+CjxwYXRoIGQ9Ik00MCAwTDUwIDEwTDQwIDIwTDMwIDEwWk0wIDQwTDEwIDUwTDAgNjBMLTEwIDUwWk04MCA0MEw5MCA1MEw4MCA2MEw3MCA1MFoiIGZpbGw9IiMwMjFCMzgiLz4KPC9zdmc+')] bg-repeat" />

          <Branding className="lg:ml-2" />

          <div className="relative z-10 space-y-3 max-w-lg mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl lg:text-7xl font-lexend font-black tracking-tight text-[#021B38] leading-[0.9]"
            >
              <div className="flex items-center gap-4 group">
                <span className="tracking-tighter uppercase font-lexend">Honor</span>
                <svg
                  viewBox="0 0 100 120"
                  className="w-10 h-12 drop-shadow-xl select-none transform group-hover:rotate-6 transition-transform opacity-95"
                >
                  <path
                    d="M0 120 L0 0 L100 60 L25 60 L100 120 Z"
                    fill="#C0131B"
                    stroke="#003594"
                    strokeWidth="5"
                  />
                  <circle cx="28" cy="35" r="10" fill="white" />
                  <path
                    d="M18 85 Q28 102 38 85 Q28 92 18 85"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <span className="font-serif italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent py-1">
                  Traditions
                </span>
                <div className="w-16 h-[1px] bg-accent/30"></div>
              </div>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-600 font-medium text-lg max-w-md leading-relaxed opacity-80"
            >
              The premier digital companion for cultural ceremonies, grand
              weddings, and community events in Nepal.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-4 pt-6"
            >
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-gray-100 bg-[url('https://i.pravatar.cc/100?img=1')] bg-cover" />
                <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-gray-100 bg-[url('https://i.pravatar.cc/100?img=5')] bg-cover" />
                <div className="w-10 h-10 rounded-full border-2 border-white shadow-sm bg-gray-100 bg-[url('https://i.pravatar.cc/100?img=3')] bg-cover" />
                <div className="w-10 h-10 rounded-full border-[1.5px] border-white shadow-sm bg-[#021B38] flex items-center justify-center text-[10px] font-bold text-white">
                  +1K
                </div>
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-primary" />
                  <p className="text-[#021B38] font-bold text-sm bg-white/50 px-1 rounded">
                    Trusted by 1000+ Families
                  </p>
                </div>
                <p className="text-gray-500 text-xs font-medium ml-1">
                  In Morang & Sunsari district
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Vertical Divider / Stylized Edge */}
        <div className="hidden lg:block w-[1px] relative z-10 bg-gradient-to-b from-transparent via-[#021B38]/10 to-transparent" />

        {/* Right Interaction Pane */}
        <div className="flex-1 bg-white flex flex-col items-center justify-center p-4 md:p-10 relative z-10 overflow-hidden">
          {/* Subtle Cultural Pattern Overlay for Mobile professionalism */}
          <div className="absolute inset-0 opacity-[0.012] pointer-events-none z-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+CjxwYXRoIGQ9Ik00MCAwTDUwIDEwTDQwIDIwTDMwIDEwWk0wIDQwTDEwIDUwTDAgNjBMLTEwIDUwWk04MCA0MEw5MCA1MEw4MCA2MEw3MCA1MFoiIGZpbGw9IiMwMjFCMzgiLz4KPC9zdmc+')] bg-repeat" />
 
          {/* Extremely Subtle mesh gradients for a clean feel */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden sm:rounded-r-3xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-accent/5 to-transparent rounded-full blur-[60px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-[80px]" />
          </div>
 
          <div className="w-full max-w-[360px] md:max-w-[400px] relative z-10 space-y-4 lg:space-y-8">
            <div className="lg:hidden text-center space-y-1 relative mb-6 pt-0">
               <Branding isMobile className="mb-0" />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-[var(--surface)] p-2 rounded-2xl md:rounded-3xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-[var(--border)]"
            >
              {/* Elegant Tab Switcher - only show if on login or guest */}
              {(activeTab === "login" || activeTab === "guest") && (
                <div className="flex bg-[var(--color-bg-light)] p-1 rounded-2xl mb-4 relative border border-[var(--border)]">
                  {["login", "guest"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setIdentifier("");
                        setIdentifierError("");
                        setPasscode("");
                        setSuccessMessage("");
                        setActiveTab(tab as typeof activeTab);
                      }}
                      className={cn(
                        "flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-colors relative z-10",
                        activeTab === tab
                          ? "text-[var(--color-secondary)]"
                          : "text-gray-400 hover:text-gray-600",
                      )}
                    >
                      {activeTab === tab && (
                        <motion.div
                          layoutId="active-tab"
                          className="absolute inset-0 bg-[var(--surface)] rounded-xl shadow-sm border border-[var(--border)]"
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 25,
                          }}
                        />
                      )}
                      <span className="relative z-10">
                        {tab === "login" ? "Sign In" : "Guest Access"}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* If in signup or forgot, show a back button Instead of tabs */}
              {(activeTab === "signup" || activeTab === "forgot") && (
                <div className="flex items-center justify-between mb-6 px-4 pt-2">
                  <button
                    onClick={() => {
                      setSuccessMessage("");
                      setActiveTab("login");
                      setForgotStep("email");
                      setOtpValue("");
                    }}
                    className="text-gray-400 hover:text-[var(--color-secondary)] flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors p-2 -ml-2 rounded-xl hover:bg-[var(--color-bg-light)]"
                    type="button"
                  >
                    &larr; Back
                  </button>
                  <div className="text-[11px] font-black uppercase tracking-widest text-[var(--color-secondary)]">
                    {activeTab === "signup" ? "Create Account" : "Reset PIN"}
                  </div>
                </div>
              )}

              <div className="px-4 lg:px-6 pb-6 pt-2">
                <AnimatePresence mode="wait">
                  {activeTab === "login" ? (
                    <motion.form
                      key="login"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleLogin}
                      className="space-y-4"
                      noValidate
                    >
                      {successMessage && (
                        <div className="bg-success/5 border border-success/10 text-success text-xs font-bold p-3 rounded-2xl flex flex-col items-center justify-center text-center space-y-1 mb-2">
                          <span className="text-[10px] uppercase tracking-widest opacity-80">
                            Welcome
                          </span>
                          <span>{successMessage}</span>
                        </div>
                      )}
                      <div className="space-y-1.5 relative">
                        <label className="text-[9px] font-black uppercase tracking-widest text-[#021B38]/60 ml-2">
                          Phone Number or Email
                        </label>
                        <input
                          type="text"
                          value={identifier}
                          onChange={(e) => {
                            setIdentifier(e.target.value);
                            setIdentifierError("");
                          }}
                          placeholder=""
                          className={cn(
                            "w-full bg-[var(--surface)] border px-4 py-3 lg:px-6 lg:py-3.5 rounded-xl lg:rounded-2xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-sm",
                            identifierError
                              ? "border-danger focus:border-danger focus:ring-danger/5"
                              : "border-[var(--border)]",
                          )}
                        />
                        {identifierError && (
                          <div className="text-danger text-[9px] font-bold px-2 mt-0.5">
                            {identifierError}
                          </div>
                        )}
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black uppercase tracking-widest text-[#021B38]/60 ml-2">
                          Secure Passcode
                        </label>
                        <div className="relative">
                          <Lock
                            size={16}
                            className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300"
                          />
                          <input
                            type="password"
                            value={passcode}
                            onChange={(e) => {
                              setPasscode(e.target.value);
                              setPasscodeError("");
                            }}
                            placeholder=""
                            className={cn(
                              "w-full bg-[var(--surface)] border pl-11 lg:pl-14 pr-4 py-2.5 lg:py-3.5 rounded-xl lg:rounded-2xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all font-mono tracking-widest shadow-sm",
                              passcodeError
                                ? "border-danger focus:border-danger focus:ring-danger/5"
                                : "border-[var(--border)]",
                            )}
                          />
                        </div>
                        {passcodeError && (
                          <div className="text-danger text-[9px] font-bold px-2 mt-0.5">
                            {passcodeError}
                          </div>
                        )}
                      </div>
 
                      <button
                        type="submit"
                        className="w-full bg-primary hover:bg-[#B01119] text-white px-6 py-3 lg:py-3.5 rounded-xl lg:rounded-2xl font-black uppercase tracking-widest text-[10px] lg:text-xs flex items-center justify-center gap-2 transition-all mt-3 group shadow-lg shadow-primary/20 active:scale-[0.98]"
                      >
                        Sign In
                        <ArrowRight
                          size={15}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>

                      <div className="pt-4 flex items-center justify-between text-[10px] font-bold text-gray-400 px-2 pb-2">
                        <span
                          onClick={() => {
                            setActiveTab("forgot");
                            setForgotStep("email");
                          }}
                          className="hover:text-[var(--color-secondary)] cursor-pointer transition-colors"
                        >
                          Forgot PIN?
                        </span>
                        <span
                          onClick={() => setActiveTab("signup")}
                          className="hover:text-primary cursor-pointer uppercase tracking-widest transition-colors"
                        >
                          Create Account
                        </span>
                      </div>
                    </motion.form>
                  ) : activeTab === "guest" ? (
                    <motion.div
                      key="guest"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                      <div className="text-center space-y-3 py-2">
                        <div className="w-14 h-14 bg-primary/10 border border-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary/10 rotate-3 transition-transform">
                          <MapPin size={24} />
                        </div>
                        <h3 className="text-2xl font-bold font-serif italic tracking-tight text-[var(--color-secondary)]">
                          Attending an Event?
                        </h3>
                        <p className="text-xs text-gray-500 px-2 font-medium leading-relaxed">
                          Enter the exact venue name or the host's family name
                          to view event details as a guest.
                        </p>
                      </div>

                      <div className="space-y-5">
                        <div className="relative">
                          <Search
                            size={18}
                            className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
                          />
                          <input
                            type="text"
                            value={guestId}
                            onChange={(e) => {
                              setGuestId(e.target.value);
                              setGuestError("");
                            }}
                            placeholder=""
                            className={cn(
                              "w-full bg-[var(--surface)] border px-5 py-3 lg:px-6 lg:py-3.5 pl-12 lg:pl-14 rounded-xl lg:rounded-2xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm",
                              guestError
                                ? "border-danger focus:border-danger focus:ring-danger/10"
                                : "border-[var(--border)]",
                            )}
                          />
                          {guestError && (
                            <div className="text-danger text-[10px] font-bold px-2 mt-1 -bottom-4 absolute">
                              {guestError}
                            </div>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (guestId.trim().length < 3) {
                              setGuestError(
                                "Enter a valid venue or host name.",
                              );
                              return;
                            }
                            onLogin("host");
                          }}
                          className="w-full mt-4 bg-[var(--color-secondary)] hover:bg-black border border-[var(--color-secondary)] text-white px-6 py-3 lg:py-3.5 rounded-xl lg:rounded-2xl font-bold uppercase tracking-widest text-[10px] lg:text-xs flex items-center justify-center gap-2 transition-all shadow-xl shadow-[var(--color-secondary)]/10 active:scale-95"
                        >
                          Find Event
                        </button>
                      </div>
                    </motion.div>
                  ) : activeTab === "signup" ? (
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
                          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] ml-2">
                            First Name
                          </label>
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder=""
                            className="w-full bg-[var(--surface)] border border-[var(--border)] px-5 py-3 lg:py-3.5 rounded-xl lg:rounded-2xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] ml-2">
                            Last Name
                          </label>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder=""
                            className="w-full bg-[var(--surface)] border border-[var(--border)] px-5 py-3 lg:py-3.5 rounded-xl lg:rounded-2xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] ml-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={signupEmail}
                          onChange={(e) => {
                            setSignupEmail(e.target.value);
                            setSignupError("");
                          }}
                          placeholder=""
                          className="w-full bg-[var(--surface)] border border-[var(--border)] px-5 py-3 lg:px-6 lg:py-3.5 rounded-xl lg:rounded-2xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] ml-2">
                          Phone (10 digits)
                        </label>
                        <input
                          type="tel"
                          value={signupPhone}
                          onChange={(e) => setSignupPhone(e.target.value)}
                          placeholder=""
                          maxLength={10}
                          pattern="\d{10}"
                          className="w-full bg-[var(--surface)] border border-[var(--border)] px-5 py-3 lg:px-6 lg:py-3.5 rounded-xl lg:rounded-2xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] ml-2">
                          Username
                        </label>
                        <input
                          type="text"
                          value={signupUsername}
                          onChange={(e) => setSignupUsername(e.target.value)}
                          placeholder=""
                          className="w-full bg-[var(--surface)] border border-[var(--border)] px-5 py-3 lg:px-6 lg:py-3.5 rounded-xl lg:rounded-2xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-[var(--color-secondary)] ml-2">
                          Set 6-Digit PIN
                        </label>
                        <input
                          type="password"
                          value={signupPin}
                          onChange={(e) => setSignupPin(e.target.value)}
                          maxLength={6}
                          pattern="\d{6}"
                          placeholder=""
                          className="w-full bg-[var(--surface)] border border-[var(--border)] px-5 py-3 lg:px-6 lg:py-3.5 rounded-xl lg:rounded-2xl outline-none font-bold text-[var(--color-secondary)] placeholder:text-gray-300 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-mono tracking-widest shadow-sm"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white px-6 py-3 lg:py-3.5 rounded-xl lg:rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all mt-4 shadow-xl shadow-primary/30 active:scale-95"
                      >
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
                        if (forgotStep === "email") {
                          const idError = validateIdentifier(identifier);
                          if (!identifier.includes("@") || idError) {
                            setIdentifierError("Please enter a valid email address");
                            return;
                          }
                          setForgotStep("otp");
                          setIdentifierError("");
                        } else if (forgotStep === "otp") {
                          if (otpValue === "1234") {
                            setForgotStep("reset");
                            setIdentifierError("");
                          } else {
                            setIdentifierError("Invalid OTP. Hint: 1234");
                          }
                        } else {
                          setActiveTab("login");
                          setSuccessMessage("PIN reset successful! Please sign in.");
                          setForgotStep("email");
                        }
                      }}
                      className="space-y-5"
                      noValidate
                    >
                      <div className="text-center pb-2">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                          {forgotStep === "email" 
                            ? "Account Recovery" 
                            : forgotStep === "otp" 
                            ? "Verify Identity" 
                            : "Secure PIN Reset"}
                        </p>
                      </div>

                      {forgotStep === "email" ? (
                        <div className="space-y-4">
                          <div className="space-y-2 relative">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#021B38]/60 ml-2">
                              Registered Email
                            </label>
                            <input
                              type="email"
                              value={identifier}
                              onChange={(e) => {
                                setIdentifier(e.target.value);
                                setIdentifierError("");
                              }}
                              placeholder=""
                              className={cn(
                                "w-full bg-[var(--surface)] border px-5 py-3 lg:px-6 lg:py-3.5 rounded-xl lg:rounded-2xl outline-none font-bold text-[var(--color-secondary)] focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-sm",
                                identifierError ? "border-danger" : "border-[var(--border)]",
                              )}
                            />
                            {identifierError && (
                              <div className="text-danger text-[9px] font-bold px-2 mt-1">
                                {identifierError}
                              </div>
                            )}
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-primary hover:bg-[#B01119] text-white px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-primary/20"
                          >
                            Send OTP Code
                          </button>
                        </div>
                      ) : forgotStep === "otp" ? (
                        <div className="space-y-4">
                          <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4 text-center">
                            <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1">OTP Sent</p>
                            <p className="text-[11px] text-gray-500 font-medium">Verification code sent to <span className="text-[#021B38] font-bold">{identifier}</span></p>
                          </div>
                          <div className="space-y-2 relative">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#021B38]/60 ml-2 text-center block">
                              Enter 4-Digit Code
                            </label>
                            <input
                              type="text"
                              maxLength={4}
                              value={otpValue}
                              onChange={(e) => {
                                setOtpValue(e.target.value);
                                setIdentifierError("");
                              }}
                              className="w-full bg-[var(--surface)] border px-5 py-4 rounded-xl lg:rounded-2xl outline-none font-bold text-center text-2xl tracking-[1em] text-[var(--color-secondary)] focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
                            />
                            {identifierError && (
                              <div className="text-danger text-[9px] font-bold text-center mt-2">
                                {identifierError}
                              </div>
                            )}
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-primary hover:bg-[#B01119] text-white px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg"
                          >
                            Verify & Continue
                          </button>
                          <button 
                            type="button"
                            onClick={() => setForgotStep("email")}
                            className="w-full text-gray-400 hover:text-[#021B38] text-[10px] font-bold uppercase tracking-widest transition-colors"
                          >
                            Resend Code
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="space-y-2 relative">
                            <label className="text-[10px] font-black uppercase tracking-widest text-[#021B38]/60 ml-2">
                              New 6-Digit PIN
                            </label>
                            <input
                              type="password"
                              maxLength={6}
                              className="w-full bg-[var(--surface)] border px-5 py-3 lg:px-6 lg:py-3.5 rounded-xl lg:rounded-2xl outline-none font-bold text-[var(--color-secondary)] border-[var(--border)] focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
                            />
                          </div>
                          <button
                            type="submit"
                            className="w-full bg-success text-white px-6 py-3.5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg shadow-success/20"
                          >
                            Update PIN
                          </button>
                        </div>
                      )}
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
    </div>
  );
};
