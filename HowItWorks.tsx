import React from 'react';

// Define the interface for StepCard props to include step data and index
interface StepCardProps {
  step: any;
  idx: number;
}

// Fix: Type StepCard as React.FC to properly handle standard React props like 'key' in JSX maps
const StepCard: React.FC<StepCardProps> = ({ step, idx }) => {
  return (
    <div className="group p-8 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-emerald-500/30 transition-all duration-500 flex flex-col items-center text-center space-y-6 hover:-translate-y-2 hover:rotate-1">
      <div 
        className="w-20 h-20 rounded-2xl bg-slate-800 flex items-center justify-center text-4xl shadow-[0_0_15px_rgba(6,182,212,0.1)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all animate-floating"
        style={{ animationDelay: `${idx * 0.5}s`, animationDuration: `${3 + idx * 0.5}s` }}
      >
        <span className="group-hover:scale-125 transition-transform duration-300">{step.icon}</span>
      </div>
      <div className="space-y-3">
        <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mono">Step {idx + 1}</span>
        <h3 className="text-white font-black text-xl space-grotesk">{step.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
      </div>
    </div>
  );
};

export const HowItWorks: React.FC = () => {
  const steps = [
    { title: "Choose Your Context", desc: "Select HR, Marketing, or Academic to tailor the scan logic.", icon: "🎯" },
    { title: "Upload or Paste Text", desc: "Securely input document data or raw process logs.", icon: "📄" },
    { title: "AI Analyzes Patterns", desc: "Triangulating authorship signals through statistical archaeology.", icon: "🔍" },
    { title: "Review Insights", desc: "Download full forensic report with granular alignment data.", icon: "📊" }
  ];

  return (
    <section id="how-it-works-section" className="px-6 lg:px-16 max-w-7xl mx-auto space-y-20 py-20">
      <div className="text-center space-y-6">
        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase space-grotesk">How It Works</h2>
        <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">Forensic auditing of authorship through a multi-layered signal triangulation framework.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, idx) => (
          <StepCard key={idx} step={step} idx={idx} />
        ))}
      </div>
    </section>
  );
};
