import React, { useState, useMemo } from 'react';
import { TokenItem, AttentionWord } from '../types';
import { 
  Cpu, 
  Sliders, 
  Sparkles, 
  BookOpen, 
  Info, 
  ArrowRight, 
  RotateCcw,
  Zap,
  CheckCircle2,
  Layers
} from 'lucide-react';

export const AnatomySection: React.FC = () => {
  // Sub-tabs within Anatomy
  const [subTab, setSubTab] = useState<'tokens' | 'parameters' | 'attention'>('tokens');

  // Tokenizer State
  const [inputText, setInputText] = useState<string>("The word unbelievable can be split into three distinct tokens.");
  const [contextWindowSize, setContextWindowSize] = useState<number>(100000);

  // Simple heuristic BPE-style tokenizer simulation for educational visualization
  const tokens: TokenItem[] = useMemo(() => {
    if (!inputText.trim()) return [];

    const words = inputText.match(/[\w']+|[^\s\w]/g) || [];
    const colorClasses = [
      'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      'bg-amber-500/20 text-amber-300 border-amber-500/30',
      'bg-purple-500/20 text-purple-300 border-purple-500/30',
      'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      'bg-rose-500/20 text-rose-300 border-rose-500/30',
    ];

    const result: TokenItem[] = [];
    let idCounter = 1042;

    words.forEach((w) => {
      // simulate subword splitting for common long words
      const lower = w.toLowerCase();
      if (lower === 'unbelievable') {
        result.push({ text: 'un', id: idCounter++, colorClass: colorClasses[result.length % colorClasses.length] });
        result.push({ text: 'believ', id: idCounter++, colorClass: colorClasses[result.length % colorClasses.length] });
        result.push({ text: 'able', id: idCounter++, colorClass: colorClasses[result.length % colorClasses.length] });
      } else if (lower === 'transformer' || lower === 'transformers') {
        result.push({ text: 'trans', id: idCounter++, colorClass: colorClasses[result.length % colorClasses.length] });
        result.push({ text: 'former', id: idCounter++, colorClass: colorClasses[result.length % colorClasses.length] });
        if (lower.endsWith('s')) {
          result.push({ text: 's', id: idCounter++, colorClass: colorClasses[result.length % colorClasses.length] });
        }
      } else if (w.length > 7) {
        // split long words into prefix + suffix
        const half = Math.floor(w.length / 2);
        result.push({ text: w.slice(0, half), id: idCounter++, colorClass: colorClasses[result.length % colorClasses.length] });
        result.push({ text: w.slice(half), id: idCounter++, colorClass: colorClasses[result.length % colorClasses.length] });
      } else {
        result.push({ text: w, id: idCounter++, colorClass: colorClasses[result.length % colorClasses.length] });
      }
    });

    return result;
  }, [inputText]);

  const wordCount = useMemo(() => {
    return (inputText.trim().match(/\S+/g) || []).length;
  }, [inputText]);

  const tokenToWordRatio = useMemo(() => {
    if (wordCount === 0) return 0;
    return (tokens.length / wordCount).toFixed(2);
  }, [tokens.length, wordCount]);

  // Parameters Knob Simulation
  const [tuningPercent, setTuningPercent] = useState<number>(100);
  const [selectedModelSize, setSelectedModelSize] = useState<'7B' | '70B' | '405B'>('70B');

  const modelResponses: Record<string, { untrained: string; partial: string; trained: string }> = {
    "What is photosynthesis?": {
      untrained: "k$9x @!zq phot green 88;; mm qzx--",
      partial: "Photosynthesis is plants making sun green water food carbon...",
      trained: "Photosynthesis is the biochemical process by which plants, algae, and some bacteria convert sunlight, water, and carbon dioxide into glucose and oxygen."
    }
  };

  // Self-Attention Demonstration
  const [activeSentence, setActiveSentence] = useState<'river' | 'loan'>('river');
  const [selectedWordIndex, setSelectedWordIndex] = useState<number>(1); // default "bank"

  const sentenceData = {
    river: {
      tokens: ["The", "bank", "of", "the", "river", "was", "muddy"],
      weightsForBank: [0.05, 1.0, 0.08, 0.04, 0.48, 0.06, 0.29],
      interpretation: "Landform / Shoreline (Strong attention spotlight from 'river' [48%] and 'muddy' [29%])"
    },
    loan: {
      tokens: ["The", "bank", "approved", "my", "loan"],
      weightsForBank: [0.04, 1.0, 0.44, 0.06, 0.46],
      interpretation: "Financial Institution (Strong attention spotlight from 'approved' [44%] and 'loan' [46%])"
    }
  };

  // Next-word prediction (Figure 1 in guide)
  const nextWordCandidates = [
    { token: "book", prob: 98.2, color: "bg-emerald-500" },
    { token: "notebook", prob: 1.1, color: "bg-indigo-500" },
    { token: "textbook", prob: 0.4, color: "bg-cyan-500" },
    { token: "folder", prob: 0.2, color: "bg-slate-500" },
    { token: "door", prob: 0.1, color: "bg-rose-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Chapter Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              CHAPTER 2
            </span>
            <h2 className="text-xl font-bold text-white">The Anatomy of an AI: Tokens, Parameters & Transformers</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Pages 4–5 of Research Report</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          Computers do not natively understand words; they only understand numbers. To process human speech and thought, 
          an AI breaks language into <strong>Tokens</strong>, routes them through billions of mathematical <strong>Parameters</strong> (knobs), 
          and coordinates context using Google's revolutionary 2017 <strong>Transformer Self-Attention</strong> architecture.
        </p>

        {/* Sub-nav switcher */}
        <div className="flex space-x-2 mt-5 border-t border-slate-800 pt-4">
          <button
            onClick={() => setSubTab('tokens')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              subTab === 'tokens'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            2.1 Tokens & Context Window
          </button>
          <button
            onClick={() => setSubTab('parameters')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              subTab === 'parameters'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            2.2 The 70B Knobs & 2-File Architecture
          </button>
          <button
            onClick={() => setSubTab('attention')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              subTab === 'attention'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            2.3 Transformer Self-Attention (Figure 1)
          </button>
        </div>
      </div>

      {/* SUBTAB 1: TOKENS & CONTEXT WINDOW */}
      {subTab === 'tokens' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Interactive Tokenizer Input */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Live Tokenizer Simulator</h3>
                  <p className="text-xs text-slate-400">See how text is chopped into subword chunks before vector conversion</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <span>1 Token ≈ 0.75 Words</span>
                </div>
              </div>

              {/* Sample Presets */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400">Presets:</span>
                <button
                  onClick={() => setInputText("apple")}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono"
                >
                  "apple"
                </button>
                <button
                  onClick={() => setInputText("unbelievable")}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono"
                >
                  "unbelievable" (un + believ + able)
                </button>
                <button
                  onClick={() => setInputText("The bank of the river was muddy.")}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono"
                >
                  "River bank"
                </button>
                <button
                  onClick={() => setInputText("Transformers revolutionized artificial intelligence in 2017.")}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono"
                >
                  "Transformers"
                </button>
              </div>

              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={3}
                placeholder="Type any sentence here to inspect tokenization..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono"
              />

              {/* Visual Token Output */}
              <div>
                <div className="text-xs font-semibold text-slate-400 mb-2 flex items-center justify-between">
                  <span>Visual Token Chunks ({tokens.length} tokens):</span>
                  <span className="text-slate-500 font-normal">Each colored box is an individual token</span>
                </div>
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 min-h-[90px] flex flex-wrap gap-1.5 items-center">
                  {tokens.length === 0 ? (
                    <span className="text-xs text-slate-500">Type something above to see tokens...</span>
                  ) : (
                    tokens.map((token, idx) => (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-mono font-medium ${token.colorClass} shadow-xs transition-transform hover:scale-105`}
                        title={`Token #${token.id}`}
                      >
                        <span>{token.text}</span>
                        <span className="text-[10px] opacity-60 font-mono">#{token.id}</span>
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Stats Footer */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-center">
                  <div className="text-lg font-bold text-white font-mono">{tokens.length}</div>
                  <div className="text-[11px] text-slate-400">Total Tokens</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-center">
                  <div className="text-lg font-bold text-indigo-400 font-mono">{wordCount}</div>
                  <div className="text-[11px] text-slate-400">English Words</div>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-center">
                  <div className="text-lg font-bold text-emerald-400 font-mono">{tokenToWordRatio}x</div>
                  <div className="text-[11px] text-slate-400">Tokens / Word Ratio</div>
                </div>
              </div>
            </div>

            {/* Context Window Capacity Visualizer */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Context Window Capacity</h3>
                  <span className="text-xs font-mono text-indigo-400">Short-Term Memory</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  As Page 4 of the guide explains, when an AI has a context window of <strong>100,000 tokens</strong>, 
                  it can hold about <strong>75,000 words</strong> in its short-term memory at any given second—enough to read an entire novel.
                </p>

                {/* Model context options */}
                <div className="space-y-2">
                  {[
                    { tokens: 4000, words: 3000, label: "GPT-3 (Original)", desc: "A 10-page research paper or essay" },
                    { tokens: 32000, words: 24000, label: "GPT-4 (Early)", desc: "A novella or detailed technical manual" },
                    { tokens: 100000, words: 75000, label: "LLaMA-2 / Claude 2 (Guide Reference)", desc: "An entire novel (The Great Gatsby / Harry Potter Book 1)" },
                    { tokens: 1000000, words: 750000, label: "Modern 1M Frontier", desc: "War and Peace + Lord of the Rings trilogy combined" },
                  ].map((preset) => (
                    <div
                      key={preset.tokens}
                      onClick={() => setContextWindowSize(preset.tokens)}
                      className={`cursor-pointer p-3 rounded-xl border text-xs transition-all ${
                        contextWindowSize === preset.tokens
                          ? 'bg-indigo-950/60 border-indigo-500 text-white'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold mb-0.5">
                        <span className={contextWindowSize === preset.tokens ? 'text-indigo-300' : 'text-slate-300'}>
                          {preset.label}
                        </span>
                        <span className="font-mono text-[11px]">
                          {preset.tokens.toLocaleString()} tokens
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">{preset.desc} (~{preset.words.toLocaleString()} words)</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Tokens outside the active window are forgotten unless stored in persistent tools.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: PARAMETERS & THE 2-FILE REALITY */}
      {subTab === 'parameters' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="max-w-3xl mb-6">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                <span>The Sound-Mixing Board Analogy</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Parameters: The "Knobs and Dials" of Machine Knowledge
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The <strong>"70B"</strong> in Meta's LLaMA-2 70B stands for <strong>70 Billion Parameters</strong>. 
                Imagine a sound-mixing board with 70 billion individual sliders. When created, all knobs are random noise. 
                Over months of training, a mathematical gradient algorithm adjusts each dial until the model generates coherent facts and language.
              </p>
            </div>

            {/* Interactive Mixing Board Slider */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Tuning Level</span>
                  <div className="text-xl font-mono font-bold text-white">{tuningPercent}% Tuned</div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-400">Preset Points:</span>
                  <button 
                    onClick={() => setTuningPercent(0)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
                  >
                    0% (Untrained Gibberish)
                  </button>
                  <button 
                    onClick={() => setTuningPercent(50)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px]"
                  >
                    50% (Early Babble)
                  </button>
                  <button 
                    onClick={() => setTuningPercent(100)}
                    className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[11px]"
                  >
                    100% (Fully Tuned)
                  </button>
                </div>
              </div>

              <input
                type="range"
                min={0}
                max={100}
                value={tuningPercent}
                onChange={(e) => setTuningPercent(Number(e.target.value))}
                className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer mb-4"
              />

              {/* Dynamic Soundboard Sliders Graphics */}
              <div className="grid grid-cols-8 sm:grid-cols-12 gap-2 mb-6 p-4 bg-slate-900/60 rounded-lg border border-slate-800/60">
                {Array.from({ length: 12 }).map((_, i) => {
                  // Calculate dynamic height based on tuningPercent and dial noise
                  const noise = Math.sin((i + 1) * 3) * (100 - tuningPercent) * 0.4;
                  const dialedValue = Math.min(100, Math.max(10, (tuningPercent * 0.8) + noise));
                  return (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className="h-20 w-3 bg-slate-800 rounded-full flex flex-col justify-end p-0.5 overflow-hidden">
                        <div 
                          className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-full transition-all duration-150"
                          style={{ height: `${dialedValue}%` }}
                        />
                      </div>
                      <span className="text-[9px] font-mono text-slate-400">K#{i * 5 + 1}B</span>
                    </div>
                  );
                })}
              </div>

              {/* Output comparison for the current dial level */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400 mb-1 font-semibold flex items-center justify-between">
                  <span>Prompt: "What is photosynthesis?"</span>
                  <span className="font-mono text-indigo-400">
                    {tuningPercent === 0 ? "Untrained State" : tuningPercent < 75 ? "Mid-Training State" : "Aligned Inference State"}
                  </span>
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs sm:text-sm leading-relaxed">
                  {tuningPercent === 0 ? (
                    <span className="text-rose-400">k$9x @!zq phot green 88;; mm qzx-- (random parameter weights yield complete nonsense)</span>
                  ) : tuningPercent < 75 ? (
                    <span className="text-amber-300">Photosynthesis is plants making sun green water food carbon... (rudimentary concept clustering without grammar)</span>
                  ) : (
                    <span className="text-emerald-400">Photosynthesis is the biochemical process by which plants, algae, and some bacteria convert sunlight, water, and carbon dioxide into glucose and oxygen.</span>
                  )}
                </div>
              </div>
            </div>

            {/* The 2-File Reality Inspection Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950/80 border border-indigo-500/20 rounded-xl p-4">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wide mb-1">File 1: The Weights Archive</div>
                <div className="text-base font-bold text-white font-mono">weights.bin (~140 GB)</div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Contains 70 billion 16-bit floating point numbers (FP16: 2 bytes per parameter = 140 GB). 
                  Represents the learned "memory" distilled from 10 Terabytes of internet documents.
                </p>
              </div>

              <div className="bg-slate-950/80 border border-emerald-500/20 rounded-xl p-4">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide mb-1">File 2: The Inference Engine</div>
                <div className="text-base font-bold text-white font-mono">run.c (~500 Lines of C)</div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  A shockingly compact piece of pure C code (Karpathy's <code className="text-emerald-300">llama2.c</code>). 
                  Allocates memory buffers, loops through matrix multiplications, and calculates softmax next-word probabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: TRANSFORMER SELF-ATTENTION (FIGURE 1) */}
      {subTab === 'attention' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="max-w-3xl mb-6">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                <span>Figure 1 Interactive Breakdown</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                The Self-Attention Mechanism: Mathematical Spotlights
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Before the 2017 Google Transformer breakthrough, AI read text sequentially from left to right and forgot earlier context. 
                Self-Attention solves this by allowing every token to look at all other tokens <strong>simultaneously</strong> and calculate which words are logically bound.
              </p>
            </div>

            {/* Sentence Switcher */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xs font-semibold text-slate-400">Karpathy's "Bank" Disambiguation Test:</span>
              <button
                onClick={() => { setActiveSentence('river'); setSelectedWordIndex(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeSentence === 'river'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Sentence A: "The bank of the river was muddy."
              </button>
              <button
                onClick={() => { setActiveSentence('loan'); setSelectedWordIndex(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeSentence === 'loan'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Sentence B: "The bank approved my loan."
              </button>
            </div>

            {/* Interactive Spotlight Display */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 mb-6">
              <div className="text-xs text-slate-400 mb-3 font-semibold">
                Click any word below to see where its Self-Attention spotlight shines:
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-6">
                {sentenceData[activeSentence].tokens.map((token, idx) => {
                  const weight = sentenceData[activeSentence].weightsForBank[idx] || 0.1;
                  const isSelected = selectedWordIndex === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedWordIndex(idx)}
                      className={`relative px-4 py-2.5 rounded-xl border text-sm font-mono font-medium transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/30 scale-105'
                          : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-slate-500'
                      }`}
                      style={{
                        boxShadow: !isSelected && selectedWordIndex === 1
                          ? `0 0 ${weight * 25}px rgba(99, 102, 241, ${weight})`
                          : undefined
                      }}
                    >
                      <span>{token}</span>
                      {selectedWordIndex === 1 && (
                        <span className="block text-[10px] text-slate-400 font-mono mt-0.5">
                          {(weight * 100).toFixed(0)}% attn
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Interpretation Result */}
              <div className="bg-indigo-950/40 border border-indigo-500/30 rounded-xl p-4 flex items-start gap-3">
                <Zap className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-indigo-300 uppercase tracking-wide">
                    Contextual Meaning Inferred via Attention
                  </div>
                  <div className="text-sm font-semibold text-white mt-0.5">
                    {sentenceData[activeSentence].interpretation}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Without reading the whole sentence at once, a computer cannot know if "bank" is dirt or money. 
                    Self-attention dynamically calculates semantic affinity across layers.
                  </p>
                </div>
              </div>
            </div>

            {/* Next Word Prediction Figure 1 Re-creation */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Figure 1: Next-Word Prediction Architecture</h4>
                  <p className="text-xs text-slate-400">Ingests tokens simultaneously, applies self-attention, and generates next token</p>
                </div>
                <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2.5 py-1 rounded">Softmax Distribution</span>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 mb-4 flex flex-wrap items-center justify-center gap-2 text-sm font-mono">
                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">The</span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">student</span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">opened</span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">their</span>
                <span className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700">text</span>
                <ArrowRight className="w-4 h-4 text-indigo-400" />
                <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold animate-pulse">
                  book (98%)
                </span>
              </div>

              {/* Bar distribution */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-400">Probabilistic Token Candidates:</div>
                {nextWordCandidates.map((cand) => (
                  <div key={cand.token} className="flex items-center gap-3 text-xs font-mono">
                    <span className="w-20 text-slate-300 text-right">{cand.token}</span>
                    <div className="flex-1 bg-slate-900 h-4 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <div
                        className={`${cand.color} h-full rounded-full transition-all duration-300`}
                        style={{ width: `${cand.prob}%` }}
                      />
                    </div>
                    <span className="w-12 text-slate-400">{cand.prob}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
