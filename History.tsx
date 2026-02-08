
import React, { useState, useEffect } from 'react';

export const History: React.FC = () => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('verify_history') || '[]');
    setHistory(saved);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('verify_history');
    setHistory([]);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <h2 className="text-5xl font-bold text-white tracking-tight">Analysis History</h2>
        <p className="text-slate-400">Access your recent scans and insights.</p>
        <button 
          onClick={clearHistory}
          className="text-[10px] font-bold text-slate-500 hover:text-slate-300 uppercase tracking-widest mono"
        >
          Clear All Records
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.length > 0 ? history.map((item, idx) => (
          <div key={idx} className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-6 hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded uppercase tracking-widest mono">General</span>
              <span className="text-[10px] text-slate-600 mono">{new Date(item.date).toLocaleDateString()}</span>
            </div>
            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-white">{item.score}% Alignment</h4>
              <p className="text-slate-500 text-xs line-clamp-2">{item.preview}...</p>
            </div>
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <span className={`text-[10px] font-bold mono uppercase tracking-widest ${item.confidence === 'High' ? 'text-emerald-500' : 'text-yellow-500'}`}>
                {item.confidence} Confidence
              </span>
              <button className="text-xs font-bold text-white underline underline-offset-4 decoration-emerald-500/50">Details</button>
            </div>
          </div>
        )) : (
          <div className="col-span-full py-24 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-3xl opacity-30">
             <span className="text-4xl mb-4">🗄️</span>
             <p className="text-slate-400 font-bold uppercase tracking-widest mono text-sm">No History Found</p>
          </div>
        )}
      </div>
    </div>
  );
};
