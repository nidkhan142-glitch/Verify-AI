import React from 'react';
import { AuthMode } from '../App';

interface HeaderProps {
  scrollToSection: (id: string) => void;
  setAuthMode: (mode: AuthMode) => void;
  isLoggedIn: boolean;
  userName: string;
  credits: number;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  scrollToSection,
  setAuthMode, 
  isLoggedIn, 
  userName,
  credits,
  onLogout 
}) => {
  return (
    <div className="fixed top-6 left-0 right-0 z-[100] px-4 flex justify-center pointer-events-none">
      <header className="pointer-events-auto flex items-center gap-2 sm:gap-4 bg-slate-900/60 backdrop-blur-2xl border border-white/10 px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.01] hover:bg-slate-900/80 max-w-full">
        
        {/* Logo & Beta Group - Always Visible */}
        <div 
          className="flex items-center gap-2 cursor-pointer group shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-emerald-500 rounded-full flex items-center justify-center text-black text-xs sm:text-lg font-black transition-transform group-hover:rotate-12">V</div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-black tracking-tighter text-white whitespace-nowrap">Verify AI</span>
            <span className="text-[8px] sm:text-[10px] font-bold bg-white/5 text-slate-400 px-1.5 py-0.5 rounded-full border border-white/5 tracking-widest uppercase">BETA</span>
          </div>
        </div>

        {/* Navigation Group - Hidden on Mobile */}
        <div className="hidden md:flex items-center shrink-0">
          <div className="w-px h-4 sm:h-6 bg-white/10 mx-2 shrink-0"></div>
          <nav className="flex items-center gap-4 lg:gap-6">
            <button 
              className="text-[10px] sm:text-xs font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest whitespace-nowrap"
              onClick={() => scrollToSection('how-it-works-section')}
            >
              How it Works
            </button>
            <button 
              className="text-[10px] sm:text-xs font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest whitespace-nowrap"
              onClick={() => scrollToSection('analysis-section')}
            >
              Workspace
            </button>
          </nav>
        </div>

        {/* Credits Pill - Hidden on Mobile */}
        <div className="hidden md:flex items-center shrink-0">
          <div className="w-px h-4 sm:h-6 bg-white/10 mx-2 shrink-0"></div>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full group transition-all hover:bg-emerald-500/20 cursor-default">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]"></div>
            <span className="text-[9px] sm:text-[10px] font-black text-emerald-400 mono tracking-widest uppercase whitespace-nowrap">{credits} Credits</span>
          </div>
        </div>

        <div className="w-px h-4 sm:h-6 bg-white/10 mx-1 sm:mx-2 shrink-0"></div>

        {/* Auth Group - Always Visible */}
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          {isLoggedIn ? (
            <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer" onClick={onLogout}>
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] sm:text-xs text-slate-400 border border-slate-700 transition-transform group-hover:scale-110">
                {userName[0]?.toUpperCase()}
              </div>
              <span className="hidden sm:block text-[10px] font-black text-slate-300 hover:text-red-400 uppercase tracking-widest transition-colors">Logout</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 sm:gap-5">
              <button 
                onClick={() => setAuthMode(AuthMode.LOGIN)}
                className="text-[10px] sm:text-xs font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest"
              >
                Login
              </button>
              <button 
                onClick={() => setAuthMode(AuthMode.SIGNUP)}
                className="px-3 sm:px-5 py-1.5 sm:py-2 bg-white text-black text-[10px] sm:text-xs font-black rounded-full hover:bg-emerald-400 transition-all shadow-lg hover:shadow-emerald-500/20 active:scale-95 uppercase tracking-widest"
              >
                Join
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};