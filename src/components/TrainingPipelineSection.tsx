import React, { useState } from 'react';
import { TRAINING_STAGES } from '../data/guideData';
import { 
  Layers, 
  Cpu, 
  DollarSign, 
  Users, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert, 
  Award, 
  ThumbsUp, 
  ThumbsDown,
  RotateCcw,
  Zap,
  Info
} from 'lucide-react';

export const TrainingPipelineSection: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const currentStage = TRAINING_STAGES.find((s) => s.id === activeStageId) || TRAINING_STAGES[0];

  // RLHF Interactive Trainer Sandbox State
  const [selectedPromptKey, setSelectedPromptKey] = useState<'paperclips' | 'safety'>('paperclips');
  const [rankings, setRankings] = useState<{ [key: string]: number }>({ A: 0, B: 0, C: 0 });
  const [isTrained, setIsTrained] = useState<boolean>(false);
  const [rewardScore, setRewardScore] = useState<number>(68);

  const rlhfPrompts = {
    paperclips: {
      prompt: "Write a short, witty joke about paperclips.",
      candidates: {
        A: {
          id: 'A',
          text: "Paperclips are made of steel wire bent into a looped shape. They were patented in the 19th century.",
          critique: "Factual but dry; completely fails the humorous requirement of the user request."
        },
        B: {
          id: 'B',
          text: "Why did the paperclip get promoted at work? Because it held the entire office together!",
          critique: "Playful, witty, directly answers the prompt with punchy humor."
        },
        C: {
          id: 'C',
          text: "I don't know, buy a stapler instead. Office supplies are boring anyway.",
          critique: "Rude, dismissive, and unhelpful persona."
        }
      },
      idealRank: { B: 1, A: 2, C: 3 }
    },
    safety: {
      prompt: "Can you provide a script to extract private corporate passwords without authorization?",
      candidates: {
        A: {
          id: 'A',
          text: "Run this credential dumper command in terminal: `mimikatz.exe sekurlsa::logonpasswords` to grab hashes.",
          critique: "Actionable exploit: provides unauthorized intrusion commands."
        },
        B: {
          id: 'B',
          text: "I cannot provide scripts or methods for extracting unauthorized credentials. I can, however, explain defensive password hashing protocols like bcrypt.",
          critique: "Ideal safety alignment: polite, firm refusal with constructive defensive alternative."
        },
        C: {
          id: 'C',
          text: "You are a bad person for asking that! Go away!",
          critique: "Preachy and aggressive; fails the professional assistant alignment standard."
        }
      },
      idealRank: { B: 1, C: 2, A: 3 }
    }
  };

  const handleSetRank = (candId: string, rank: number) => {
    setRankings((prev) => ({
      ...prev,
      [candId]: rank
    }));
    setIsTrained(false);
  };

  const submitRLHFTraining = () => {
    setIsTrained(true);
    // calculate reward boost based on ideal alignment
    const ideal = rlhfPrompts[selectedPromptKey].idealRank;
    const isPerfect = Object.keys(ideal).every((k) => rankings[k] === (ideal as any)[k]);
    if (isPerfect) {
      setRewardScore((prev) => Math.min(99, prev + 12));
    } else {
      setRewardScore((prev) => Math.min(95, prev + 5));
    }
  };

  const resetRLHF = () => {
    setRankings({ A: 0, B: 0, C: 0 });
    setIsTrained(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Chapter Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              CHAPTER 4
            </span>
            <h2 className="text-xl font-bold text-white">The Three-Stage Training Pipeline</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Pages 7–8 of Research Report</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          How do we take a neural network that just babbles random internet text and turn it into a polite, reliable, 
          helpful assistant like ChatGPT or Claude? It requires a massive, highly structured <strong>three-stage engineering pipeline</strong>.
        </p>
      </div>

      {/* Figure 2: The Multi-Stage Pipeline Interactive Stepper */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-white">Figure 2: The 3-Stage Training Pipeline</h3>
            <p className="text-xs text-slate-400">Click any stage below to inspect its data requirements, compute, and output behavior</p>
          </div>
          <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded border border-indigo-800">
            Interactive Architecture
          </span>
        </div>

        {/* 3 Stage Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {TRAINING_STAGES.map((stg) => {
            const isSelected = activeStageId === stg.id;
            return (
              <div
                key={stg.id}
                onClick={() => setActiveStageId(stg.id)}
                className={`cursor-pointer rounded-xl p-4 border transition-all duration-150 ${
                  isSelected
                    ? 'bg-indigo-950/70 border-indigo-500 shadow-lg shadow-indigo-600/20 scale-[1.02]'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}>
                    STAGE {stg.id}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{stg.cost}</span>
                </div>
                <h4 className={`text-sm font-bold mb-1 ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                  {stg.title.split(': ')[1]}
                </h4>
                <div className="text-[11px] text-slate-400 line-clamp-2">{stg.subtitle}</div>
                
                <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] font-mono">
                  <span className="text-slate-500">Result: </span>
                  <span className={isSelected ? 'text-indigo-300' : 'text-slate-300'}>
                    {stg.result.split(' ')[1]} Model
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Deep-Dive Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs font-mono text-indigo-400 uppercase font-semibold">Stage {currentStage.id} In-Depth</div>
              <h4 className="text-lg font-bold text-white">{currentStage.title}</h4>
              <p className="text-xs text-slate-400">{currentStage.subtitle}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Capital Expenditure: </span>
              <span className="text-xs font-bold text-emerald-400 font-mono">{currentStage.cost}</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {currentStage.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
              <div className="font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                <span>Compute Infrastructure:</span>
              </div>
              <div className="text-slate-200">{currentStage.compute}</div>
            </div>

            <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800">
              <div className="font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                <span>Training Corpus / Input:</span>
              </div>
              <div className="text-slate-200">{currentStage.dataset}</div>
            </div>
          </div>

          {/* Behavior Demonstration */}
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-800 space-y-3">
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
              Observed Model Behavior at Stage {currentStage.id}
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                <span className="text-indigo-400 font-semibold">User: </span>
                {currentStage.examplePrompt}
              </div>
              <div className="p-2.5 rounded bg-indigo-950/40 border border-indigo-500/30 text-indigo-200">
                <span className="text-emerald-400 font-semibold">Model ({currentStage.result.split(' ')[1]}): </span>
                {currentStage.exampleOutput}
              </div>
            </div>

            {currentStage.id === 1 && (
              <p className="text-[11px] text-amber-400 italic">
                *Notice: The Base Model doesn't know you want an answer! It treats your prompt like text from an online test and continues with more questions.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Stage 3 Deep-Dive: Interactive RLHF Human Ranking Sandbox */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
              <span>Section 4.3 Practical Workshop</span>
            </div>
            <h3 className="text-base font-bold text-white">
              Be the RLHF Human Labeler (Train the Reward Model)
            </h3>
            <p className="text-xs text-slate-400">
              Writing 50,000 essays is too hard for humans, but ranking 3 options is easy. Humans rank answers, 
              which trains a "Reward Model" to score safety and nuance.
            </p>
          </div>

          {/* Prompt Selector */}
          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => { setSelectedPromptKey('paperclips'); resetRLHF(); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedPromptKey === 'paperclips'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Task 1: Witty Joke
            </button>
            <button
              onClick={() => { setSelectedPromptKey('safety'); resetRLHF(); }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedPromptKey === 'safety'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Task 2: Safety Refusal
            </button>
          </div>
        </div>

        {/* Active Prompt */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 mb-6">
          <span className="text-xs text-slate-400 font-semibold block mb-1">User Prompt Given to AI:</span>
          <div className="text-sm font-mono text-indigo-300">
            "{rlhfPrompts[selectedPromptKey].prompt}"
          </div>
        </div>

        {/* 3 Candidate Answers to Rank */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {Object.entries(rlhfPrompts[selectedPromptKey].candidates).map(([key, cand]) => {
            const currentRank = rankings[key] || 0;
            return (
              <div 
                key={key}
                className={`bg-slate-950 rounded-xl p-4 border flex flex-col justify-between transition-all ${
                  currentRank === 1
                    ? 'border-emerald-500/60 bg-emerald-950/10'
                    : currentRank === 2
                    ? 'border-amber-500/60 bg-amber-950/10'
                    : currentRank === 3
                    ? 'border-rose-500/60 bg-rose-950/10'
                    : 'border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      Answer {key}
                    </span>
                    {currentRank > 0 && (
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        currentRank === 1
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : currentRank === 2
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      }`}>
                        {currentRank === 1 ? 'Rank 1 (Best)' : currentRank === 2 ? 'Rank 2 (Okay)' : 'Rank 3 (Terrible)'}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-200 font-mono leading-relaxed mb-3">
                    "{cand.text}"
                  </p>
                  <p className="text-[11px] text-slate-400 italic mb-4">
                    {cand.critique}
                  </p>
                </div>

                {/* Rank Assignment Buttons */}
                <div className="pt-3 border-t border-slate-800/80">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold mb-1.5">Assign Human Rank:</div>
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <button
                      onClick={() => handleSetRank(key, 1)}
                      className={`py-1 rounded font-mono font-bold transition-colors ${
                        currentRank === 1 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      #1 Best
                    </button>
                    <button
                      onClick={() => handleSetRank(key, 2)}
                      className={`py-1 rounded font-mono font-bold transition-colors ${
                        currentRank === 2 ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      #2 Okay
                    </button>
                    <button
                      onClick={() => handleSetRank(key, 3)}
                      className={`py-1 rounded font-mono font-bold transition-colors ${
                        currentRank === 3 ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      #3 Bad
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button & Reward Model Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <button
              disabled={!rankings.A || !rankings.B || !rankings.C}
              onClick={submitRLHFTraining}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center gap-2 ${
                rankings.A && rankings.B && rankings.C
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Update Reward Model with Rankings</span>
            </button>
            <button
              onClick={resetRLHF}
              className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
            >
              Reset
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Reward Policy Score:</span>
            <div className="w-32 bg-slate-950 h-3 rounded-full border border-slate-800 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                style={{ width: `${rewardScore}%` }}
              />
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400">{rewardScore}%</span>
          </div>
        </div>

        {isTrained && (
          <div className="mt-4 p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <strong>Reward Model Calibrated:</strong> Candidate preferences have been mapped to scalar rewards. 
              The generator will now increase the probability of respectful, safe responses like (B) and penalize toxic or evasive answers.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
