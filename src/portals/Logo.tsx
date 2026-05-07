import React from "react";

export const Logo = ({
  scale = 1,
  className = "",
}: {
  scale?: number;
  className?: string;
}) => {
  return (
    <div
      className={`flex flex-col items-center select-none ${className}`}
      style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
    >
      <div className="relative w-[280px] h-32 mb-2 flex flex-col items-center justify-end">
        {/* Sun Arch */}
        <div className="absolute top-0 w-32 h-32 rounded-full border-[4px] border-accent border-b-transparent border-l-transparent -rotate-45" />

        {/* Mountains */}
        <svg
          viewBox="0 0 160 50"
          className="absolute bottom-6 w-56 h-20 fill-[#021B38]"
        >
          {/* Left Mountain */}
          <path d="M10 50 L40 20 L55 35 L70 15 L95 40 Z" />
          <path
            d="M40 20 L55 35 L50 45 L35 30 Z"
            fill="rgba(255,255,255,0.8)"
          />
          {/* Right Mountain */}
          <path d="M75 40 L95 10 L115 30 L130 15 L150 50 Z" />
          <path
            d="M95 10 L115 30 L110 45 L85 25 Z"
            fill="rgba(255,255,255,0.8)"
          />
        </svg>

        {/* Foreground Stupa */}
        <svg
          viewBox="0 0 40 80"
          className="absolute bottom-6 w-12 h-24 z-10 overflow-visible"
        >
          <path
            d="M0 60 Q20 40 40 60 L40 80 L0 80 Z"
            fill="url(#stupa-grad-main)"
          />
          {/* Spire */}
          <path
            d="M17 15 L23 15 L21 45 L19 45 Z"
            fill="url(#stupa-grad-main)"
          />
          <circle cx="20" cy="15" r="3" fill="#F27A1A" />
          {/* Stupa steps */}
          <rect
            x="14"
            y="45"
            width="12"
            height="4"
            fill="url(#stupa-grad-main)"
          />
          <rect
            x="12"
            y="49"
            width="16"
            height="4"
            fill="url(#stupa-grad-main)"
          />
          <rect
            x="10"
            y="53"
            width="20"
            height="4"
            fill="url(#stupa-grad-main)"
          />
          {/* Add stupa eyes */}
          <path
            d="M10 65 Q15 62 20 65"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />
          <path
            d="M20 65 Q25 62 30 65"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
          />
          <circle cx="15" cy="65" r="1.5" fill="white" />
          <circle cx="25" cy="65" r="1.5" fill="white" />
          <path d="M20 68 Q18 73 20 75 Q22 73 20 68" fill="white" />
          <defs>
            <linearGradient
              id="stupa-grad-main"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#F27A1A" />
              <stop offset="100%" stopColor="#C0131B" />
            </linearGradient>
          </defs>
        </svg>

        {/* Om Text */}
        <span className="absolute -bottom-2 text-accent font-bold text-2xl drop-shadow-sm z-10 w-full text-center">
          ॐ
        </span>
      </div>

      {/* Typography with Swoosh */}
      <div className="relative flex flex-col items-center">
        <div className="flex items-end leading-none relative z-10">
          <span className="font-lexend font-black text-[6rem] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#ff3b3b] drop-shadow-sm">
            उत्स
          </span>
          <span className="font-serif italic font-medium text-[6rem] tracking-tight text-[#021B38] ml-2 drop-shadow-sm relative">
            A
            <svg
              viewBox="0 0 20 40"
              className="absolute left-[38%] top-[25%] w-5 h-10 fill-[var(--surface)] mix-blend-overlay"
            >
              <path d="M10 40 Q0 25 10 0 Q20 25 10 40 Z" />
            </svg>
            V
          </span>
        </div>
        {/* Swoosh Underneath */}
        <svg
          viewBox="0 0 300 40"
          preserveAspectRatio="none"
          className="absolute -bottom-6 w-[120%] h-12 -left-[10%] z-0 overflow-visible"
        >
          <path
            d="M20 30 Q100 5 180 25 T280 5 Q240 25 180 30 T20 30"
            fill="url(#swoosh-grad-main)"
          />
          <defs>
            <linearGradient
              id="swoosh-grad-main"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#C0131B" />
              <stop offset="100%" stopColor="#F27A1A" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex items-center gap-4 mt-12 w-full justify-center px-4">
        <div className="h-[2px] w-12 bg-[#F27A1A]" />
        <span className="text-[12px] uppercase tracking-[0.25em] font-black text-[#021B38]">
          Where Tradition Meets Technology
        </span>
        <div className="h-[2px] w-12 bg-[#F27A1A]" />
      </div>
      <div className="flex items-center gap-4 mt-5 w-full justify-center px-4">
        <div className="w-4 h-4 text-[#F27A1A]">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15 9h7l-6 5 2 7-6-5-6 5 2-7-6-5h7z" />
          </svg>
        </div>
        <span className="text-primary font-serif italic text-xl tracking-widest font-semibold drop-shadow-sm">
          सम्पर्क, सेवा, संस्कृति
        </span>
        <div className="w-4 h-4 text-[#F27A1A]">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15 9h7l-6 5 2 7-6-5-6 5 2-7-6-5h7z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
