import React, { useState } from 'react';
import { 
  Terminal, 
  Cpu, 
  HardDrive, 
  Calculator, 
  Code2, 
  Globe, 
  Image as ImageIcon, 
  ArrowRight, 
  Zap, 
  Brain, 
  GitBranch, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Play
} from 'lucide-react';

export const LLMOperatingSystemSection: React.FC = () => {
  const [subView, setSubView] = useState<'architecture' | 'system1-vs-system2'>('architecture');
  const [selectedToolId, setSelectedToolId] = useState<'calculator' | 'python' | 'browser' | 'image' | 'ram' | 'disk'>('calculator');

  // Interactive Tool Invocation Sandbox
  const [activeTask, setActiveTask] = useState<'math' | 'primes' | 'weather'>('math');
  const [isExecutingTool, setIsExecutingTool] = useState<boolean>(false);
  const [toolExecutionStep, setToolExecutionStep] = useState<number>(0);

  const taskPresets = {
    math: {
      prompt: "What is 13,492 multiplied by 4,921?",
      rawGuess: "66,385,124 (Wrong! Guessed from linguistic token associations)",
      toolUsed: "Digital Calculator",
      toolCode: "13492 * 4921",
      toolOutput: "66,394,132",
      finalResponse: "13,492 multiplied by 4,921 equals exactly 66,394,132."
    },
    primes: {
      prompt: "Find all prime numbers between 1,000 and 1,030.",
      rawGuess: "1003, 1009, 1013, 1019, 1021, 1027 (Hallucinated: 1003 is divisible by 17, 1027 is 13*79!)",
      toolUsed: "Python Code Interpreter",
      toolCode: `def is_prime(n):\n    return n > 1 and all(n % i != 0 for i in range(2, int(n**0.5) + 1))\nprint([x for x in range(1000, 1031) if is_prime(x)])`,
      toolOutput: "[1009, 1013, 1019, 1021]",
      finalResponse: "The verified prime numbers between 1,000 and 1,030 are: 1009, 1013, 1019, and 1021."
    },
    weather: {
      prompt: "What is the current temperature and forecast in Tokyo today?",
      rawGuess: "It is typically around 18°C in Tokyo with mild winds (Generic statistical seasonal average, not live data)",
      toolUsed: "Live Web Browser",
      toolCode: "GET api.weather.service/tokyo/current",
      toolOutput: '{"temp": "21°C", "condition": "Partly Cloudy", "humidity": "64%"}',
      finalResponse: "As of today, the current temperature in Tokyo is 21°C and partly cloudy with 64% humidity."
    }
  };

  const handleRunTask = () => {
    setIsExecutingTool(true);
    setToolExecutionStep(1);
    setTimeout(() => setToolExecutionStep(2), 600);
    setTimeout(() => setToolExecutionStep(3), 1200);
    setTimeout(() => {
      setToolExecutionStep(4);
      setIsExecutingTool(false);
    }, 1800);
  };

  // System 1 vs 2 State
  const [selectedThoughtBranch, setSelectedThoughtBranch] = useState<number>(1);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Chapter Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              CHAPTER 6
            </span>
            <h2 className="text-xl font-bold text-white">The Future: The LLM Operating System</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Pages 10–11 of Research Report</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          If you view an LLM merely as a "chatbot," you are drastically underestimating its potential. 
          Leading researchers like <strong>Andrej Karpathy</strong> envision the LLM not as an app, but as the 
          <strong> central CPU / Kernel</strong> of a new kind of Operating System that delegates work to RAM, hard drives, calculators, and browsers.
        </p>

        {/* Sub-nav */}
        <div className="flex space-x-2 mt-5 border-t border-slate-800 pt-4">
          <button
            onClick={() => setSubView('architecture')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              subView === 'architecture'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            6.1 LLM OS Architecture & Tool Delegation (Figure 3)
          </button>
          <button
            onClick={() => setSubView('system1-vs-system2')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              subView === 'system1-vs-system2'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            6.2 System 1 vs. System 2 Thinking (Tree of Thoughts)
          </button>
        </div>
      </div>

      {subView === 'architecture' ? (
        <div className="space-y-6">
          {/* Figure 3 Interactive Schematic */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white">Figure 3: The LLM Operating System Diagram</h3>
                <p className="text-xs text-slate-400">Click any component below to view its classical computing equivalent</p>
              </div>
              <span className="text-xs font-mono text-indigo-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                Karpathy's Architecture
              </span>
            </div>

            {/* Visual Node Graph */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 relative flex flex-col items-center">
              {/* User Prompt (Top) */}
              <div className="bg-slate-900 border border-slate-700 px-5 py-2.5 rounded-xl text-xs font-semibold text-white shadow-md flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>User Prompt (Voice, Text, Image)</span>
              </div>

              <div className="w-0.5 h-6 bg-slate-700 mb-2" />

              {/* Central LLM Kernel */}
              <div 
                onClick={() => setSelectedToolId('calculator')}
                className="cursor-pointer bg-gradient-to-r from-indigo-900/80 via-indigo-950 to-indigo-900/80 border-2 border-indigo-500 rounded-2xl p-4 text-center max-w-sm w-full shadow-lg shadow-indigo-500/20 mb-6 hover:scale-105 transition-transform"
              >
                <div className="flex items-center justify-center gap-2 text-indigo-400 text-xs font-mono font-bold uppercase mb-1">
                  <Cpu className="w-4 h-4" />
                  <span>Central Processor</span>
                </div>
                <div className="text-base font-extrabold text-white">LLM Kernel ("The Brain")</div>
                <div className="text-[11px] text-indigo-200 mt-1">
                  Coordinates memory, parses natural language, and schedules tool peripheral calls
                </div>
              </div>

              {/* Memory Tier (Left: RAM, Right: Disk) */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mb-6">
                {/* RAM */}
                <div 
                  onClick={() => setSelectedToolId('ram')}
                  className="cursor-pointer bg-slate-900/90 hover:bg-slate-900 border border-slate-700 hover:border-indigo-400 rounded-xl p-3.5 text-center transition-all"
                >
                  <div className="text-xs font-bold text-indigo-300 flex items-center justify-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-indigo-400" />
                    <span>RAM: Context Window</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Fast active memory (e.g. 100k tokens). Loses state when interaction restarts.
                  </div>
                </div>

                {/* Disk */}
                <div 
                  onClick={() => setSelectedToolId('disk')}
                  className="cursor-pointer bg-slate-900/90 hover:bg-slate-900 border border-slate-700 hover:border-indigo-400 rounded-xl p-3.5 text-center transition-all"
                >
                  <div className="text-xs font-bold text-indigo-300 flex items-center justify-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Hard Drive: Web & Files</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Permanent storage via RAG, local document index, and internet database queries.
                  </div>
                </div>
              </div>

              <div className="w-0.5 h-4 bg-slate-700 mb-2" />

              {/* Tool Peripherals (Bottom Row) */}
              <div className="w-full">
                <div className="text-[11px] font-mono text-center text-slate-500 uppercase tracking-wider mb-2">
                  Specialized Peripheral Tool Execution
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div 
                    onClick={() => { setSelectedToolId('calculator'); setActiveTask('math'); }}
                    className="cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-3 text-center transition-all"
                  >
                    <Calculator className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                    <div className="text-xs font-bold text-white">Calculator</div>
                    <div className="text-[10px] text-slate-400">Deterministic Math</div>
                  </div>

                  <div 
                    onClick={() => { setSelectedToolId('python'); setActiveTask('primes'); }}
                    className="cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-3 text-center transition-all"
                  >
                    <Code2 className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
                    <div className="text-xs font-bold text-white">Python Interpreter</div>
                    <div className="text-[10px] text-slate-400">Code Execution</div>
                  </div>

                  <div 
                    onClick={() => { setSelectedToolId('browser'); setActiveTask('weather'); }}
                    className="cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-xl p-3 text-center transition-all"
                  >
                    <Globe className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                    <div className="text-xs font-bold text-white">Web Browser</div>
                    <div className="text-[10px] text-slate-400">Live Search</div>
                  </div>

                  <div 
                    onClick={() => setSelectedToolId('image')}
                    className="cursor-pointer bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-rose-500/50 rounded-xl p-3 text-center transition-all"
                  >
                    <ImageIcon className="w-5 h-5 text-rose-400 mx-auto mb-1" />
                    <div className="text-xs font-bold text-white">Image / Video Gen</div>
                    <div className="text-[10px] text-slate-400">Multimodal Output</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Tool Delegation Simulator */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <h4 className="text-sm font-bold text-white">Live Tool Delegation Sandbox</h4>
                <p className="text-xs text-slate-400">Watch the LLM recognize its cognitive boundary and offload calculation to software</p>
              </div>

              {/* Task Selector */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  onClick={() => { setActiveTask('math'); setToolExecutionStep(0); }}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    activeTask === 'math'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  1. Math (13,492 * 4,921)
                </button>
                <button
                  onClick={() => { setActiveTask('primes'); setToolExecutionStep(0); }}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    activeTask === 'primes'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  2. Python Primes
                </button>
                <button
                  onClick={() => { setActiveTask('weather'); setToolExecutionStep(0); }}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    activeTask === 'weather'
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  3. Tokyo Weather
                </button>
              </div>
            </div>

            {/* Run Bar */}
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-400 font-semibold block">Input Query:</span>
                <span className="text-sm font-mono text-indigo-300 font-bold">
                  "{taskPresets[activeTask].prompt}"
                </span>
              </div>
              <button
                onClick={handleRunTask}
                disabled={isExecutingTool}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isExecutingTool
                    ? 'bg-slate-800 text-slate-500 cursor-wait'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isExecutingTool ? 'Delegating...' : 'Trigger LLM OS Delegation'}</span>
              </button>
            </div>

            {/* Step by step execution trace */}
            <div className="space-y-3 font-mono text-xs">
              {/* Step 1: Raw LLM limitation */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 font-semibold">[1] Without Tools (Raw Statistical Guess): </span>
                <span className="text-rose-400">{taskPresets[activeTask].rawGuess}</span>
              </div>

              {/* Step 2: Tool Call Dispatched */}
              {toolExecutionStep >= 2 && (
                <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 animate-in fade-in">
                  <span className="text-indigo-400 font-semibold">[2] LLM Kernel Generated Tool Call: </span>
                  <div className="mt-1 p-2 bg-slate-950 rounded border border-indigo-900/50 text-indigo-300 whitespace-pre-wrap">
                    Tool: {taskPresets[activeTask].toolUsed} {"\n"}Payload: {taskPresets[activeTask].toolCode}
                  </div>
                </div>
              )}

              {/* Step 3: Tool Execution */}
              {toolExecutionStep >= 3 && (
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 animate-in fade-in">
                  <span className="text-emerald-400 font-semibold">[3] Peripheral Execution Result: </span>
                  <span className="text-emerald-300 font-bold">{taskPresets[activeTask].toolOutput}</span>
                </div>
              )}

              {/* Step 4: Final Synthesized Answer */}
              {toolExecutionStep >= 4 && (
                <div className="p-3 rounded-lg bg-emerald-900/40 border border-emerald-400/50 text-white animate-in fade-in">
                  <span className="text-emerald-400 font-bold">[4] Final Verified User Output: </span>
                  <span className="text-emerald-200">{taskPresets[activeTask].finalResponse}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* SUBVIEW 6.2: SYSTEM 1 VS SYSTEM 2 THINKING */
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="max-w-3xl mb-6">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                <span>Section 6.2 Daniel Kahneman Cognitive Framework</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                System 1 vs. System 2 Thinking in AI
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Psychologist Daniel Kahneman popularized two modes of thought: 
                <strong> System 1</strong> is fast, instinctual, and automatic (like reading a sign or catching a ball). 
                <strong> System 2</strong> is slow, deliberate, and logical (like doing taxes or planning a chess maneuver). 
                Current LLMs are strictly System 1. The frontier of research is giving them System 2 capabilities: <strong>trading time for accuracy</strong> via a Tree of Thoughts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* System 1 Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-400 uppercase font-mono">System 1 (Current LLMs)</span>
                  <span className="text-[10px] bg-amber-950 text-amber-300 px-2 py-0.5 rounded border border-amber-800">
                    INSTINCTUAL
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">Fast, Fixed-Speed Token Stream</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Words are chunked out like a train on a track. The model cannot pause to ponder or realize it made a blunder three tokens ago.
                </p>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                  Speed: ~60 tokens/sec <br />
                  Planning Horizon: 1 token ahead <br />
                  Error Recovery: Cannot backtrack
                </div>
              </div>

              {/* System 2 Card */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-400 uppercase font-mono">System 2 (Frontier AI)</span>
                  <span className="text-[10px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-800">
                    DELIBERATE
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2">Tree of Thoughts & Verification</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  Spends silent compute exploring multiple potential solution branches, cross-examining math, pruning bad branches, and returning only verified answers.
                </p>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                  Speed: Trades 10-60 seconds for precision <br />
                  Planning Horizon: Multi-step reasoning <br />
                  Error Recovery: Explores alternative branches
                </div>
              </div>
            </div>

            {/* Interactive Tree of Thoughts Visualizer */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Interactive Tree of Thoughts Explorer</h4>
                  <p className="text-xs text-slate-400">Logic Puzzle: "A farmer has 17 sheep, and all but 9 run away. How many sheep are left?"</p>
                </div>
                <span className="text-xs font-mono text-indigo-400 bg-slate-900 px-2.5 py-1 rounded">
                  Branch Evaluation
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                {/* Branch 1 (System 1 mistake) */}
                <div 
                  onClick={() => setSelectedThoughtBranch(1)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all ${
                    selectedThoughtBranch === 1
                      ? 'bg-rose-950/30 border-rose-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-slate-300">Branch 1 (Instinct)</span>
                    <XCircle className="w-4 h-4 text-rose-400" />
                  </div>
                  <p className="text-slate-400 text-[11px] mb-2">
                    "Subtract 9 from 17: 17 - 9 = 8 sheep left."
                  </p>
                  <span className="text-[10px] text-rose-400 font-semibold bg-rose-950/80 px-2 py-0.5 rounded">
                    PRUNED (Misread 'all but 9')
                  </span>
                </div>

                {/* Branch 2 (Exploration) */}
                <div 
                  onClick={() => setSelectedThoughtBranch(2)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all ${
                    selectedThoughtBranch === 2
                      ? 'bg-amber-950/30 border-amber-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-slate-300">Branch 2 (Check)</span>
                    <HelpCircle className="w-4 h-4 text-amber-400" />
                  </div>
                  <p className="text-slate-400 text-[11px] mb-2">
                    "Could it mean 9 sheep ran away or 9 remain?"
                  </p>
                  <span className="text-[10px] text-amber-400 font-semibold bg-amber-950/80 px-2 py-0.5 rounded">
                    INTERMEDIATE EVALUATION
                  </span>
                </div>

                {/* Branch 3 (Verified Correct) */}
                <div 
                  onClick={() => setSelectedThoughtBranch(3)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all ${
                    selectedThoughtBranch === 3
                      ? 'bg-emerald-950/30 border-emerald-500'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-emerald-300">Branch 3 (Verified)</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-slate-300 text-[11px] mb-2">
                    "The phrase 'all but 9' explicitly means exactly 9 sheep remained."
                  </p>
                  <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded">
                    CONFIRMED (Answer: 9)
                  </span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>
                  System 2 reasoning spends test-time compute verifying semantics before uttering a single token to the user.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
