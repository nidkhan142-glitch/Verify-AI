
import React from 'react';

interface LimitReachedModalProps {
  onContinue: () => void;
  onClose: () => void;
}

export const LimitReachedModal: React.FC<LimitReachedModalProps> = ({ onContinue, onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[#020617]/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-[#080d1f] border border-slate-800 rounded-2xl p-10 text-center space-y-8 relative shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-6xl mb-4">🔒</div>
        
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-white tracking-tight">Analysis Limit Reached</h2>
          <p className="text-slate-400 leading-relaxed">
            Login or sign up with your account and continue with your analysing for free and access your remaining free credits.
          </p>
        </div>

        <button 
          onClick={onContinue}
          className="w-full py-4 bg-[#48ffcc] hover:bg-[#3de0b3] text-[#020617] font-black rounded-xl transition-all shadow-xl shadow-emerald-500/20 text-lg"
        >
          Continue Analysing
        </button>

        {/* Decorative elements to match auth style */}
        <div className="absolute top-10 right-0 bottom-10 w-1 bg-[#48ffcc] rounded-l-full"></div>
      </div>
    </div>
  );
};
