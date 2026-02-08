
import React from 'react';

export const Differentiation: React.FC = () => {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-4xl font-bold tracking-tight text-white mb-6">
          Categorical Differentiation
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl">
          Existing tools are "guessers." Verify AI is an "auditor." We address the fundamental flaws of the first generation of detectors.
        </p>
      </section>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="py-4 px-6 text-slate-500 font-medium uppercase text-xs tracking-widest mono">Feature</th>
              <th className="py-4 px-6 text-red-400 font-medium uppercase text-xs tracking-widest mono bg-red-400/5">Generic Detectors (GPTZero, etc)</th>
              <th className="py-4 px-6 text-blue-400 font-medium uppercase text-xs tracking-widest mono bg-blue-400/5">Verify AI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-300">Core Metric</td>
              <td className="py-4 px-6 text-slate-500">Perplexity & Burstiness (Tone)</td>
              <td className="py-4 px-6 text-white font-medium">Forensic Artifacts & Behavioral Origin</td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-300">Vulnerability</td>
              <td className="py-4 px-6 text-slate-500">Easily bypassed by "style prompts"</td>
              <td className="py-4 px-6 text-white font-medium">Resistant to stylistic manipulation</td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-300">Evidence Output</td>
              <td className="py-4 px-6 text-slate-500">A single "AI %" probability score</td>
              <td className="py-4 px-6 text-white font-medium">Multi-signal audit trail with explainability</td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-300">Human Process</td>
              <td className="py-4 px-6 text-slate-500">Ignored completely</td>
              <td className="py-4 px-6 text-white font-medium">Integrated (Version history, key-flow)</td>
            </tr>
            <tr>
              <td className="py-4 px-6 font-semibold text-slate-300">High Stakes Use</td>
              <td className="py-4 px-6 text-slate-500">Dangerous (High False Positives)</td>
              <td className="py-4 px-6 text-white font-medium">Optimized for Academic/Legal Forensics</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Heuristic vs. Forensic", desc: "Detectors look at *what* was said. We look at *how* it came to exist." },
          { title: "Static vs. Dynamic", desc: "Detectors analyze a snapshot. We analyze the trajectory of authorship." },
          { title: "Probabilistic vs. Deterministic", desc: "Detectors gamble on vibes. We provide structural proof of machine DNA." }
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-xl border border-slate-800 bg-slate-900/40">
            <h4 className="text-white font-bold mb-2">{item.title}</h4>
            <p className="text-sm text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
