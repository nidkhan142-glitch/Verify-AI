
import React from 'react';

export const Architecture: React.FC = () => {
  const layers = [
    {
      level: "Layer 01",
      title: "Behavioral Provenance",
      subtitle: "The Human Process",
      desc: "Telemetry of the creation event. Keystroke timing, temporal pauses during synthesis, and revision density. Humans leave 'scars' in their writing process (erasures, restarts) that machines don't simulate by default.",
      color: "border-blue-500"
    },
    {
      level: "Layer 02",
      title: "Statistical Archeology",
      subtitle: "Token Probability Mapping",
      desc: "Analyzing the 'Optimal Path' density. Machines gravitate toward tokens with specific probability weights from their training set. We map the text against the known statistical 'Model DNA' of major LLMs.",
      color: "border-emerald-500"
    },
    {
      level: "Layer 03",
      title: "Syntactic Entropy Analysis",
      subtitle: "Cognitive Noise Fingerprinting",
      desc: "Identifying 'Synthetic Fluency.' Machines are too consistent in their syntactic structures. Human writing contains specific types of irregular noise and semantic 'misdirections' that are computationally expensive to fake.",
      color: "border-purple-500"
    },
    {
      level: "Layer 04",
      title: "Adversarial Integrity",
      subtitle: "Anti-Bypass Validation",
      desc: "Detecting 'Detector-Evasion' signatures. Patterns left by back-translation, LLM-based paraphrasing, and manual entropy injections (forced typos). Verify AI detects the act of detection-avoidance.",
      color: "border-orange-500"
    }
  ];

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
          System Layers
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl">
          A multi-signal triangulation framework that moves from surface analysis to deep origin verification.
        </p>
      </section>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-slate-800">
        {layers.map((layer, idx) => (
          <div key={idx} className="relative flex items-start group">
            <div className={`absolute left-0 mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 border-2 ${layer.color} shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all group-hover:scale-110`}>
              <span className="text-[10px] font-bold text-white mono">{idx + 1}</span>
            </div>
            <div className="ml-16 bg-slate-900 border border-slate-800 p-8 rounded-2xl flex-1 hover:border-slate-700 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mono block mb-1">{layer.level}</span>
                  <h3 className="text-2xl font-bold text-white">{layer.title}</h3>
                  <p className="text-slate-400 font-medium italic text-sm">{layer.subtitle}</p>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed">
                {layer.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
