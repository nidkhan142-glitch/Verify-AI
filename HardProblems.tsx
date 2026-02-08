
import React from 'react';

export const HardProblems: React.FC = () => {
  const problems = [
    {
      title: "The Mixed-Authorship Paradox",
      desc: "Attributing content where a human has heavily edited AI output. At what threshold of human intervention does the content become 'human-origin'? Defining this boundary is a philosophical and technical minefield.",
      impact: "High-stakes academic/legal appeals"
    },
    {
      title: "Clean-Slate Limitation",
      desc: "How do we verify content submitted as a static file without version history or behavioral telemetry? If only Layer 02 and 03 are available, can the verdict still meet the forensic standard of 'beyond reasonable doubt'?",
      impact: "Publishing and journalism submissions"
    },
    {
      title: "Neurodiversity & Non-Native Bias",
      desc: "Avoiding the 'robotic' classification for highly structured writing common in neurodivergent authors or non-native English speakers. Preventing 'cultural/cognitive false positives' is a critical equity requirement.",
      impact: "Institutional adoption and ethics"
    },
    {
      title: "Model Evolution Velocity",
      desc: "As LLMs are trained on the output of AI detectors (recursive learning), they will naturally begin to mimic the 'forensic noise' we look for. Maintaining an lead in this arms race requires constant signal discovery.",
      impact: "System longevity"
    }
  ];

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
          The Unsolved Frontier
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl">
          Verify AI acknowledges the adversarial reality. These are the hard problems that current detectors ignore, but we must confront.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {problems.map((p, idx) => (
          <div key={idx} className="p-8 rounded-2xl bg-red-500/5 border border-red-500/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl font-black italic text-white mono">!</span>
            </div>
            <h3 className="text-xl font-bold text-red-100 mb-3">{p.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              {p.desc}
            </p>
            <div className="pt-4 border-t border-red-500/10">
              <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest mono">Critical Impact: {p.impact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
