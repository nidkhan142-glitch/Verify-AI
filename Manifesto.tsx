
import React from 'react';

export const Manifesto: React.FC = () => {
  return (
    <section className="px-6 lg:px-16 max-w-5xl mx-auto">
      <div className="p-1 rounded-3xl bg-slate-800/40 border border-slate-800">
        <div className="bg-[#020617] p-8 md:p-16 rounded-[calc(1.5rem-2px)] flex flex-col md:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-[0.2em] mono">The Ethics Manifesto</span>
            <h2 className="text-4xl font-bold text-white">Transparency Over Authority</h2>
          </div>
          <div className="flex-[1.5] space-y-8">
            <p className="text-slate-400 leading-relaxed text-lg">
              Verify AI is built on the principle that AI analysis should assist humans, not replace them. We never present conclusions as facts. Every report is a starting point for a conversation, not a final judgment.
            </p>
            <ul className="space-y-6">
               <li className="flex items-start gap-4">
                  <span className="text-emerald-400 mt-1">→</span>
                  <div>
                    <h4 className="text-white font-bold">Probabilistic Reporting:</h4>
                    <p className="text-slate-500 text-sm">Patterns, not proof. We highlight structural artifacts.</p>
                  </div>
               </li>
               <li className="flex items-start gap-4">
                  <span className="text-emerald-400 mt-1">→</span>
                  <div>
                    <h4 className="text-white font-bold">Context-Aware:</h4>
                    <p className="text-slate-500 text-sm">Tailored for HR, Education, and Creative sectors.</p>
                  </div>
               </li>
               <li className="flex items-start gap-4">
                  <span className="text-emerald-400 mt-1">→</span>
                  <div>
                    <h4 className="text-white font-bold">Non-Accusatory:</h4>
                    <p className="text-slate-500 text-sm">Professional, objective language that avoids bias.</p>
                  </div>
               </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
