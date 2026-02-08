
import React from 'react';

// Define the Tab enum locally as it is used for sidebar navigation and is not exported from App.tsx
export enum Tab {
  ANALYZER = 'ANALYZER',
  VISION = 'VISION',
  DIFFERENCE = 'DIFFERENCE',
  LAYERS = 'LAYERS',
  CHALLENGES = 'CHALLENGES',
  SUCCESS = 'SUCCESS',
  ENGINEERING = 'ENGINEERING'
}

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: Tab.ANALYZER, label: 'V0 Analysis Tool', icon: '🔍' },
    { id: Tab.VISION, label: '01. Vision & Philosophy', icon: '👁️' },
    { id: Tab.DIFFERENCE, label: '02. Differentiation', icon: '⚖️' },
    { id: Tab.LAYERS, label: '03. System Layers', icon: '🧊' },
    { id: Tab.CHALLENGES, label: '04. Hard Roadblocks', icon: '🧪' },
    { id: Tab.SUCCESS, label: '05. Success Definition', icon: '🏁' },
    { id: Tab.ENGINEERING, label: '06. Component Engineering', icon: '⚙️' },
  ];

  return (
    <aside className="w-80 border-r border-slate-800 bg-slate-900/50 backdrop-blur-md flex flex-col p-6 space-y-8 hidden md:flex">
      <div>
        <h1 className="text-2xl font-bold tracking-tighter text-white flex items-center gap-2">
          <span className="bg-blue-600 w-6 h-6 rounded-sm inline-block"></span>
          VERIFY AI
        </h1>
        <p className="text-xs text-slate-500 uppercase tracking-widest mt-2 mono">
          Forensic Blueprint v1.0
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 border ${
              activeTab === item.id
                ? 'bg-slate-800 border-slate-700 text-blue-400 shadow-lg'
                : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
        <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 mono">Active Mode</div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          <span className="text-xs font-semibold text-slate-300">Live V0 Prototype</span>
        </div>
      </div>
    </aside>
  );
};
