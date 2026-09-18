import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Cpu, 
  Database, 
  Zap, 
  DollarSign, 
  Award, 
  Info, 
  Server, 
  Activity,
  Sparkles
} from 'lucide-react';

export const ScalingLawsSection: React.FC = () => {
  // 3 Scaling Variables
  const [paramBillions, setParamBillions] = useState<number>(70); // N (in billions)
  const [dataTrillions, setDataTrillions] = useState<number>(15); // D (in trillions of tokens)
  const [gpuCount, setGpuCount] = useState<number>(16000); // C (H100 GPUs)

  // Calculations based on Chinchilla / Kaplan scaling formulas (simplified for educational dashboard)
  const stats = useMemo(() => {
    const N = paramBillions * 1e9;
    const D = dataTrillions * 1e12;
    
    // Total compute FLOPs ~ 6 * N * D
    const flops = 6 * N * D;
    const zettaFlops = (flops / 1e21).toFixed(1);

    // Scaling power law approximation for test loss
    // Loss L(N, D) = (Nc / N)^alpha_N + (Dc / D)^alpha_D
    const normalizedN = paramBillions / 70;
    const normalizedD = dataTrillions / 15;
    const effectiveCapability = Math.min(99, Math.round(45 + 25 * Math.log10(normalizedN + 0.5) + 20 * Math.log10(normalizedD + 0.5)));

    // Capabilities estimation
    const mmluScore = Math.min(96, Math.max(30, Math.round(effectiveCapability * 0.92)));
    const barExamPercentile = Math.min(99, Math.max(10, Math.round(effectiveCapability * 1.05)));
    const codingHumanEval = Math.min(92, Math.max(15, Math.round(effectiveCapability * 0.88)));

    // Hardware cluster estimates (Assuming H100 ~ 2 PFLOPS FP16)
    const effectiveH100Days = Math.round((flops / (gpuCount * 2e15 * 86400 * 0.4))); // 40% MFU
    const estimatedTrainingDays = Math.max(2, Math.min(365, effectiveH100Days));
    const estimatedCostMillions = ((gpuCount * 3.5 * 24 * estimatedTrainingDays) / 1e6 + (paramBillions * 0.15)).toFixed(1);

    return {
      zettaFlops,
      effectiveCapability,
      mmluScore,
      barExamPercentile,
      codingHumanEval,
      estimatedTrainingDays,
      estimatedCostMillions
    };
  }, [paramBillions, dataTrillions, gpuCount]);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Chapter Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              CHAPTER 5
            </span>
            <h2 className="text-xl font-bold text-white">Scaling Laws: Why AI is Moving So Fast</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Page 9 of Research Report</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          One of the most fascinating aspects of modern AI development is how <strong>predictable</strong> it is. 
          In traditional software, doubling capability requires a human genius to write a new algorithm. 
          In LLMs, researchers uncovered smooth, <strong>mathematically guaranteed relationships</strong> between three core variables: 
          Parameters (N), Data (D), and Compute (C).
        </p>
      </div>

      {/* The 3 Core Variables Interactive Sliders */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-white">The Scaling Law Triumvirate (N, D, C)</h3>
            <p className="text-xs text-slate-400">Tune the 3 knobs below to witness how guaranteed scaling improves downstream benchmarks</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
            Guaranteed Smooth Gains
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Slider 1: N (Parameters) */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-white uppercase">1. N (Parameters)</span>
              </div>
              <span className="text-sm font-mono font-bold text-indigo-400">{paramBillions} Billion</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">Total knobs and dials in the neural network</p>
            <input
              type="range"
              min={7}
              max={405}
              step={1}
              value={paramBillions}
              onChange={(e) => setParamBillions(Number(e.target.value))}
              className="w-full accent-indigo-500 h-2 bg-slate-800 rounded-lg cursor-pointer mb-2"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>7B (Edge)</span>
              <span>70B (LLaMA-2)</span>
              <span>405B (Frontier)</span>
            </div>
          </div>

          {/* Slider 2: D (Data) */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-white uppercase">2. D (Training Data)</span>
              </div>
              <span className="text-sm font-mono font-bold text-cyan-400">{dataTrillions} Trillion Tokens</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">Total volume of public internet text ingested</p>
            <input
              type="range"
              min={2}
              max={30}
              step={1}
              value={dataTrillions}
              onChange={(e) => setDataTrillions(Number(e.target.value))}
              className="w-full accent-cyan-500 h-2 bg-slate-800 rounded-lg cursor-pointer mb-2"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>2T Tokens</span>
              <span>15T Tokens</span>
              <span>30T Tokens</span>
            </div>
          </div>

          {/* Slider 3: C (Compute) */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white uppercase">3. C (Cluster Compute)</span>
              </div>
              <span className="text-sm font-mono font-bold text-emerald-400">{gpuCount.toLocaleString()} H100s</span>
            </div>
            <p className="text-[11px] text-slate-400 mb-3">GPU server farm size running parallel math</p>
            <input
              type="range"
              min={1000}
              max={50000}
              step={1000}
              value={gpuCount}
              onChange={(e) => setGpuCount(Number(e.target.value))}
              className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer mb-2"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>1,000 GPUs</span>
              <span>16,000 GPUs</span>
              <span>50,000 GPUs</span>
            </div>
          </div>
        </div>

        {/* Live Mathematical Prediction Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Predicted Benchmark Scores */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Predicted Cognitive Benchmark Capabilities
              </span>
              <span className="text-xs font-mono text-indigo-400 font-bold">
                {stats.zettaFlops} ZettaFLOPs Training Compute
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-slate-300">MMLU (Academic General Knowledge):</span>
                  <span className="text-indigo-400 font-bold">{stats.mmluScore}%</span>
                </div>
                <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${stats.mmluScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-slate-300">Uniform Bar Exam Percentile (Law):</span>
                  <span className="text-emerald-400 font-bold">Top {100 - stats.barExamPercentile}% (Score: {stats.barExamPercentile}%)</span>
                </div>
                <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${stats.barExamPercentile}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1 font-mono">
                  <span className="text-slate-300">HumanEval (Python Code Synthesis):</span>
                  <span className="text-cyan-400 font-bold">{stats.codingHumanEval}% Pass@1</span>
                </div>
                <div className="h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div 
                    className="h-full bg-cyan-500 rounded-full transition-all duration-300"
                    style={{ width: `${stats.codingHumanEval}%` }}
                  />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
              Notice: You did not rewrite the algorithm! You merely increased N, D, and C, and the model's ability to reason, code, and pass legal exams scaled automatically.
            </p>
          </div>

          {/* Capital & Energy Realities (The GPU Arms Race) */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">
                The Physical "Arms Race" Logistics
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4 font-mono">
                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="text-[11px] text-slate-400">Cluster Runtime:</div>
                  <div className="text-lg font-bold text-white mt-0.5">~{stats.estimatedTrainingDays} Days</div>
                  <div className="text-[10px] text-slate-500">24/7 continuous crunch</div>
                </div>

                <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="text-[11px] text-slate-400">Estimated Run Cost:</div>
                  <div className="text-lg font-bold text-emerald-400 mt-0.5">${stats.estimatedCostMillions}M USD</div>
                  <div className="text-[10px] text-slate-500">Compute + Electricity + Ops</div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                This is why leading tech giants are investing tens of billions into nuclear/renewable power plants and massive GPU clusters. 
                They don't need to invent a brand new species of math; they just need to scale the equation.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Formula: <code className="text-slate-300 font-mono">C ≈ 6 × N × D</code> Floating Point Operations (FLOPs).</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
