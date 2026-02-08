
import React from 'react';

export const SuccessMetrics: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
          Defining Success
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl">
          Success for Verify AI is not just about accuracy; it's about shifting the burden of proof and establishing market trust.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4">The "Gold Standard" KPI</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Verify AI succeeds when its reports are admissible in legal proceedings or formal academic tribunals as <span className="text-white font-semibold underline decoration-blue-500">definitive forensic evidence</span>, rather than mere suggestive probability.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-300">Target False Positive Rate: &lt; 0.001% (High Stakes Confidence)</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-1 bg-emerald-500 rounded-full"></div>
                <span className="text-sm font-medium text-slate-300">Explainability Score: 100% Traceability of signals</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-4">Adoption Milestones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 mono">Year 1</h4>
                <p className="text-sm text-slate-300">Establish standard with top-tier R1 universities and legal forensics firms.</p>
              </div>
              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2 mono">Year 3</h4>
                <p className="text-sm text-slate-300">Integration into the 'Digital Credentials' stack of global publishers and journals.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-600 p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 leading-tight">The "Seal of Human Origin"</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Our ultimate vision is that Verify AI becomes a proactive verification badge for human creators, not just a reactive trap for AI cheaters.
            </p>
          </div>
          <div className="mt-12 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
            <p className="text-white font-bold text-sm mb-1 uppercase tracking-widest mono">Success Metric</p>
            <p className="text-4xl font-black text-white">PROVENANCE</p>
            <p className="text-blue-100 text-[10px] mt-2 leading-tight">THE END OF "AI GUESSING" IN PROFESSIONAL CONTENT EVALUATION.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
