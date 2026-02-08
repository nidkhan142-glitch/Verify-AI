
import React from 'react';

export const StatsSection: React.FC = () => {
  return (
    <section className="px-6 lg:px-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center gap-6">
        <div className="text-3xl">👥</div>
        <div>
          <h4 className="text-2xl font-bold text-white">Used by Early Testers</h4>
        </div>
      </div>
      <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center gap-6">
        <div className="text-3xl text-yellow-500">⚡</div>
        <div>
          <h4 className="text-2xl font-bold text-white">500+ Analyses Completed</h4>
        </div>
      </div>
      <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 flex items-center gap-6">
        <div className="text-3xl text-red-500">🛡️</div>
        <div>
          <h4 className="text-2xl font-bold text-white">Designed for Ethical Use</h4>
        </div>
      </div>
    </section>
  );
};
