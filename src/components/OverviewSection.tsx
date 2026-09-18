import React from 'react';
import { ActiveTab } from '../types';
import { GUIDE_METADATA } from '../data/guideData';
import { 
  ArrowRight, 
  Cpu, 
  HardDrive, 
  FileCode, 
  Sparkles, 
  Layers, 
  TrendingUp, 
  Terminal, 
  ShieldAlert, 
  HelpCircle,
  Laptop,
  Flame,
  CheckCircle2
} from 'lucide-react';

interface OverviewSectionProps {
  onNavigate: (tab: ActiveTab) => void;
  openReportModal: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ onNavigate, openReportModal }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Research Companion</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Demystifying Large Language Models
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed">
            An extended primer based on the masterclass by <span className="text-indigo-400 font-semibold">Andrej Karpathy</span>. 
            Stripping away complex jargon to show how LLMs compress the internet into mathematical weights, 
            learn through a 3-stage pipeline, evolve into operating systems, and introduce novel cybersecurity vulnerabilities.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
              <div className="text-xl sm:text-2xl font-bold text-white font-mono">10 TB → 140 GB</div>
              <div className="text-xs text-slate-400 mt-0.5">~100x Lossy Compression</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
              <div className="text-xl sm:text-2xl font-bold text-indigo-400 font-mono">70 Billion</div>
              <div className="text-xs text-slate-400 mt-0.5">Tuned Knobs (LLaMA-2)</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
              <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-mono">500 Lines</div>
              <div className="text-xs text-slate-400 mt-0.5">C Inference Engine (run.c)</div>
            </div>
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5">
              <div className="text-xl sm:text-2xl font-bold text-amber-400 font-mono">3 Stages</div>
              <div className="text-xs text-slate-400 mt-0.5">Pre-train → SFT → RLHF</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('anatomy')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/25"
            >
              <span>Explore Module 1: Anatomy & Tokens</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={openReportModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition-colors"
            >
              <span>View Original 14-Page Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Chapter 1 Concept: Shift from Rules to Patterns & The 2-File Reality */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Rules vs Patterns */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Section 1 Insight</span>
              <span>•</span>
              <span>Foundational Paradigm Shift</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              From Deterministic Rules to Probabilistic Patterns
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              For decades, computer programming was deterministic. A programmer wrote rigid instructions (if/else), and if a user gave unexpected input, the program crashed. AI flips this completely.
            </p>

            <div className="space-y-3">
              <div className="bg-slate-950/80 border border-red-500/20 rounded-xl p-3.5">
                <div className="flex items-center justify-between text-xs font-semibold text-red-400 mb-1">
                  <span>Traditional Computing (Deterministic)</span>
                  <span className="font-mono text-[10px] bg-red-950/60 px-2 py-0.5 rounded border border-red-800/40">RULES</span>
                </div>
                <p className="text-xs text-slate-300">
                  Human programmer writes every explicit rule. Inflexible: crashes on edge-cases outside pre-programmed scripts.
                </p>
              </div>

              <div className="bg-slate-950/80 border border-emerald-500/20 rounded-xl p-3.5">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 mb-1">
                  <span>Machine Learning & LLMs (Probabilistic)</span>
                  <span className="font-mono text-[10px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">PATTERNS</span>
                </div>
                <p className="text-xs text-slate-300">
                  Give the computer massive text data and a simple objective (predict the next word). The neural network discovers patterns, logic, and grammar on its own.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400 flex items-center gap-2">
            <span className="font-medium text-slate-300">Analogy:</span>
            <span>An LLM is simply a supercharged smartphone autocomplete that has read the public internet.</span>
          </div>
        </div>

        {/* Right: The 2-File Reality */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Section 1 Key Concept</span>
              <span>•</span>
              <span>The Physical Footprint</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              An LLM is Literally Just Two Files
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Despite the illusion of a digital brain, Andrej Karpathy emphasizes that an open-source model like Meta's LLaMA-2 70B is physically compact enough to fit on a standard MacBook:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-950/90 border border-indigo-500/30 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-2 right-2 text-indigo-500/20">
                  <HardDrive className="w-10 h-10" />
                </div>
                <div className="text-xs font-bold text-indigo-400 mb-1">File 1: Parameters</div>
                <div className="text-xl font-bold font-mono text-white">~140 GB</div>
                <p className="text-xs text-slate-400 mt-2">
                  Billions of numbers (weights). These represent the "memory" and learned concepts stored after months of GPU training.
                </p>
              </div>

              <div className="bg-slate-950/90 border border-emerald-500/30 rounded-xl p-4 relative overflow-hidden">
                <div className="absolute top-2 right-2 text-emerald-500/20">
                  <FileCode className="w-10 h-10" />
                </div>
                <div className="text-xs font-bold text-emerald-400 mb-1">File 2: Run Code</div>
                <div className="text-xl font-bold font-mono text-white">~500 Lines</div>
                <p className="text-xs text-slate-400 mt-2">
                  Often written in basic C (<code className="text-emerald-400 font-mono">run.c</code>). Tells the CPU how to load weights, calculate attention, and output tokens.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 bg-indigo-950/30 -mx-6 -mb-6 p-4 rounded-b-2xl border-t border-indigo-900/40 flex items-center gap-3">
            <Laptop className="w-5 h-5 text-indigo-400 shrink-0" />
            <span className="text-xs text-indigo-200">
              You do not need a supercomputer to <em>run</em> an LLM locally. The extreme expense and complexity lies purely in <em>creating</em> it.
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Module Roadmap */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white">Interactive Laboratories</h3>
            <p className="text-xs text-slate-400">Deep-dive into every section of the research paper with live simulators</p>
          </div>
          <span className="text-xs text-slate-500">Click any card to launch</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            onClick={() => onNavigate('anatomy')}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Pages 4–5</span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
              1. Anatomy: Tokens & Attention
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Live text tokenizer, 70B parameter tuning knobs, and Figure 1 Self-Attention spotlight simulator.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('compression')}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <HardDrive className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Page 6</span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
              2. Lossy Compression & Hallucinations
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              The Zip File analogy (10TB → 140GB, 100x ratio) and why LLMs "dream" fake biographies instead of looking up databases.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('training')}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Pages 7–8</span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
              3. The 3-Stage Training Pipeline
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Figure 2 pipeline: Pre-training (Base Model) → SFT (Assistant) → RLHF (Reward Model ranking sandbox).
            </p>
          </div>

          <div 
            onClick={() => onNavigate('scaling')}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Page 9</span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
              4. Scaling Laws Calculator
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Explore N (Parameters), D (Data), and C (Compute). Calculate expected loss and why tech giants are racing for GPUs.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('llm-os')}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Pages 10–11</span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
              5. The LLM Operating System
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Figure 3 architecture: CPU Kernel, RAM context, Tools (Calculators & Python), plus System 1 vs 2 thinking.
            </p>
          </div>

          <div 
            onClick={() => onNavigate('cybersecurity')}
            className="group cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-4 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/10"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">Pages 12–13</span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
              6. Cybersecurity Threat Lab
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Simulate Grandma Napalm Jailbreaks, invisible white text Prompt Injection, and "James Bond" sleeper agent poisoning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
