
import React from 'react';

export const Vision: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-5xl font-bold tracking-tight text-white mb-6">
          The Forensic Vision
        </h2>
        <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
          Verify AI is not a detector of "AI style." It is a system for <span className="text-blue-400">authorship verification</span> through forensic evidence. We move beyond linguistic heuristics to identify structural artifacts of machine generation and verifiable signals of human cognitive process.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider mono text-blue-500">Threat Model</h3>
          <ul className="space-y-4 text-slate-400 text-sm leading-relaxed">
            <li><strong className="text-slate-200">Entropy Smuggling:</strong> Deliberate manual insertion of errors or stylistic quirks to bypass perplexity-based filters.</li>
            <li><strong className="text-slate-200">Prompt Engineering:</strong> Using multi-stage persona prompts to mimic human professional or academic tone.</li>
            <li><strong className="text-slate-200">Adversarial ML:</strong> Using "Anti-Detection" models that specifically optimize for high perplexity scores.</li>
            <li><strong className="text-slate-200">Process Erasure:</strong> The complete absence of creative versioning history, commonly seen in "copy-paste" workflows.</li>
          </ul>
        </div>

        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider mono text-emerald-500">Design Philosophy</h3>
          <ul className="space-y-4 text-slate-400 text-sm leading-relaxed">
            <li><strong className="text-slate-200">Evidence over Appearance:</strong> Tone is irrelevant. A human can sound like a robot; a robot can sound like a human. Verify AI tracks the <em>mechanics</em> of creation.</li>
            <li><strong className="text-slate-200">Forensic Triangulation:</strong> No single signal is definitive. Truth emerges from the overlap of behavioral, statistical, and structural data.</li>
            <li><strong className="text-slate-200">Negative Proof:</strong> The absence of specific human-cognitive artifacts is weighted as evidence of synthetic origin.</li>
            <li><strong className="text-slate-200">Auditable Verdicts:</strong> Scores are replaced by evidence trails that can be scrutinized by legal or academic review boards.</li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-600/10 border border-blue-500/30 p-8 rounded-2xl">
        <h3 className="text-white font-bold text-xl mb-4">Core Thesis</h3>
        <p className="text-slate-300 italic text-lg leading-relaxed">
          "If a human wrote this, they left a trail of cognitive noise, temporal inconsistencies, and versioned intent. If a machine wrote this, it followed a path of statistical optimization. Verify AI finds the path, not just the destination."
        </p>
      </div>
    </div>
  );
};
