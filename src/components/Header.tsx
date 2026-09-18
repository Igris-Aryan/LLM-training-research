import React from 'react';
import { ActiveTab } from '../types';
import { 
  BookOpen, 
  Cpu, 
  Sparkles, 
  ShieldAlert, 
  Layers, 
  TrendingUp, 
  Terminal, 
  Archive, 
  FileText,
  CheckCircle2
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  openReportModal: () => void;
  completedQuizCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  openReportModal,
  completedQuizCount
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Executive Summary', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'anatomy', label: '1. Anatomy & Tokens', icon: <Cpu className="w-4 h-4" /> },
    { id: 'compression', label: '2. Lossy Compression', icon: <Archive className="w-4 h-4" /> },
    { id: 'training', label: '3. Training Pipeline', icon: <Layers className="w-4 h-4" /> },
    { id: 'scaling', label: '4. Scaling Laws', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'llm-os', label: '5. The LLM OS', icon: <Terminal className="w-4 h-4" /> },
    { id: 'cybersecurity', label: '6. Cybersecurity Threats', icon: <ShieldAlert className="w-4 h-4" /> },
    { 
      id: 'glossary-quiz', 
      label: '7. Glossary & Quiz', 
      icon: <Sparkles className="w-4 h-4" />,
      badge: completedQuizCount > 0 ? `${completedQuizCount}/8` : undefined
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      {/* Top Banner with Paper Citation */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 px-4 py-1.5 border-b border-indigo-900/40 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            RESEARCH PRIMER
          </span>
          <span className="text-slate-300 font-medium">Demystifying Large Language Models</span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline text-slate-400">Based on Andrej Karpathy's Masterclass (Sep 13, 2026)</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openReportModal}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-indigo-300 bg-indigo-950/80 hover:bg-indigo-900/90 rounded border border-indigo-700/50 transition-colors shadow-xs"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Read 14-Page Guide</span>
          </button>
        </div>
      </div>

      {/* Main Title & Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  LLM Demystified
                </h1>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Interactive Lab
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden md:block">
                A Comprehensive Visual Guide to Modern AI Architecture & Systems
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All 8 Chapters Interactive</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none text-xs sm:text-sm">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-indigo-900/60 text-indigo-300 border border-indigo-700/40'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
