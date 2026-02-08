
import React from 'react';

export const TeamsSection: React.FC = () => {
  const cases = [
    {
      role: "Graduate TA, Computer Science Dept",
      title: "Screening 200+ Essays",
      quote: "I use Verify AI as a first-pass screener for programming assignments. It's not perfect, but it flags the obvious cases where students might have over-relied on AI. Saves me hours each week.",
      icon: "🎓"
    },
    {
      role: "Freelance Editor",
      title: "Quality Check for Content",
      quote: "Clients sometimes submit AI-generated drafts without telling me. Verify AI helps me spot them quickly so I can ask for revisions early. Especially useful for brand voice consistency.",
      icon: "✍️"
    },
    {
      role: "HR Coordinator",
      title: "Filtering Applications",
      quote: "We started seeing identical cover letter patterns. Verify AI identifying potential templates help us ask better follow-up questions to assess genuine interest.",
      icon: "👔"
    }
  ];

  return (
    <section className="px-6 lg:px-16 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-white tracking-tight">How Teams Are Using Verify AI</h2>
        <p className="text-slate-500">Real applications from our beta testing phase</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cases.map((c, idx) => (
          <div key={idx} className="p-8 rounded-2xl bg-slate-900/20 border border-slate-800 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{c.icon}</span>
              <div>
                <h4 className="text-white font-bold">{c.title}</h4>
                <p className="text-[10px] text-slate-500 mono uppercase tracking-wider">{c.role}</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm italic leading-relaxed">
              "{c.quote}"
            </p>
            <div className="pt-4 border-t border-slate-800">
               <span className="text-[10px] text-emerald-500 font-bold uppercase mono tracking-widest">Improved Efficiency</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
