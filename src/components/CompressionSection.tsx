import React, { useState } from 'react';
import { 
  Archive, 
  FileText, 
  Database, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Sliders, 
  Cpu, 
  Search,
  ExternalLink,
  HelpCircle,
  Info
} from 'lucide-react';

export const CompressionSection: React.FC = () => {
  const [compressionView, setCompressionView] = useState<'zip-vs-lossy' | 'dreaming-lab'>('zip-vs-lossy');
  const [compressionRatio, setCompressionRatio] = useState<number>(100);

  // Dreaming / Hallucination Simulator
  const [testScenario, setTestScenario] = useState<'real' | 'fake'>('fake');
  const [enableGrounding, setEnableGrounding] = useState<boolean>(false);

  const scenarios = {
    real: {
      query: "Give me a brief biography of Isaac Newton.",
      isReal: true,
      rawOutput: "Sir Isaac Newton (born January 4, 1643, Woolsthorpe, England – died March 31, 1727, London) was an English polymath active as a mathematician, physicist, astronomer, and author who developed the laws of motion and universal gravitation, and formulated infinitesimal calculus.",
      groundedOutput: "Sir Isaac Newton (born Jan 4, 1643 NS, Woolsthorpe Manor; died Mar 31, 1727). Key works: 'Philosophiae Naturalis Principia Mathematica' (1687). Verified across Encyclopedia Britannica & Royal Society archives.",
      hallucinationRisk: "Low (Very frequent in pre-training corpus)"
    },
    fake: {
      query: "Give me a biography of Lord Percival Q. Abernathy, the famous 1742 naval cartographer.",
      isReal: false,
      rawOutput: "Lord Percival Q. Abernathy (1704 – 1782) was an esteemed British naval cartographer celebrated for mapping the treacherous coral reefs of the Caribbean under King George II. Educated at Trinity College, Cambridge, he authored the renowned 1742 maritime atlas 'Hydrographia Britannica' and served with distinction at the Royal Naval Academy.",
      groundedOutput: "Search Query: 'Lord Percival Q. Abernathy 1742 cartographer'\nResult: No verified historical records, Royal Navy logs, or academic archives mention this individual. Note: This figure appears to be fictional.",
      hallucinationRisk: "EXTREME: The model synthesized plausible dates (1704-1782), institutions (Trinity College), and a fake Latin title ('Hydrographia Britannica') solely to satisfy the stylistic probability of a biography."
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Chapter Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              CHAPTER 3
            </span>
            <h2 className="text-xl font-bold text-white">Lossy Compression: Why AI "Hallucinates"</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Page 6 of Research Report</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          One of the most confusing things for beginners is understanding how an AI can know so much, yet occasionally invent complete falsehoods with total confidence. 
          To understand this, we must look at how the AI stores data: not as a lossless database, but as a <strong>~100x lossy zip file</strong> of the internet.
        </p>

        {/* Sub-nav */}
        <div className="flex space-x-2 mt-5 border-t border-slate-800 pt-4">
          <button
            onClick={() => setCompressionView('zip-vs-lossy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              compressionView === 'zip-vs-lossy'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            3.1 The Zip File Analogy (10 TB → 140 GB)
          </button>
          <button
            onClick={() => setCompressionView('dreaming-lab')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              compressionView === 'dreaming-lab'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            3.2 "Dreaming Documents" & Hallucination Sandbox
          </button>
        </div>
      </div>

      {compressionView === 'zip-vs-lossy' ? (
        <div className="space-y-6">
          {/* Comparison Cards: Lossless ZIP vs Lossy LLM */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lossless ZIP */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                      <Archive className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Lossless Compression (ZIP / GZIP)</h3>
                      <span className="text-[11px] text-slate-400">Traditional Software Archival</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800">
                    EXACT COPY
                  </span>
                </div>

                <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                  <p>
                    When you compress a folder of documents into a <code className="text-blue-400 font-mono">.zip</code> file on your computer, 
                    it uses mathematical algorithms like DEFLATE or Huffman coding.
                  </p>
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-slate-400">Original Size:</span>
                      <span className="text-white">10.0 GB</span>
                    </div>
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-slate-400">Compressed ZIP:</span>
                      <span className="text-white">~3.5 GB (2.8x ratio)</span>
                    </div>
                    <div className="flex items-center justify-between font-mono text-xs text-emerald-400 pt-1 border-t border-slate-800">
                      <span>Restored Accuracy:</span>
                      <span>100% Bit-for-Bit Identical</span>
                    </div>
                  </div>
                  <p className="text-slate-400">
                    When unzipped, every single byte, punctuation mark, and pixel matches the original perfectly. There is zero guessing or hallucination.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Deterministic: If data is missing, the archive corrupts rather than guessing.</span>
              </div>
            </div>

            {/* Lossy LLM Neural Compression */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Lossy Neural Compression (LLM)</h3>
                      <span className="text-[11px] text-slate-400">Parameter Weight Distillation</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-800">
                    ~100x RATIO
                  </span>
                </div>

                <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                  <p>
                    Training an LLM is a radical form of lossy compression. Companies like Meta or OpenAI take roughly 
                    <strong> 10 Terabytes</strong> of public internet text and force it through 70 billion parameters.
                  </p>
                  <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-slate-400">Internet Raw Corpus:</span>
                      <span className="text-white">10,000 GB (10 TB)</span>
                    </div>
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="text-slate-400">Parameter Weights:</span>
                      <span className="text-indigo-400 font-bold">140 GB (70B params @ FP16)</span>
                    </div>
                    <div className="flex items-center justify-between font-mono text-xs text-amber-400 pt-1 border-t border-slate-800">
                      <span>Restored Accuracy:</span>
                      <span>Concepts & Patterns (NOT exact bytes)</span>
                    </div>
                  </div>
                  <p className="text-slate-400">
                    The model does NOT store exact Wikipedia text in a database. It stores statistical patterns, grammar, and associative concepts.
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>When asked for exact details, it calculates statistical probabilities, which can invent falsehoods.</span>
              </div>
            </div>
          </div>

          {/* Interactive Compression Visualizer */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <h4 className="text-sm font-bold text-white">What Survives 100x Lossy Neural Compression?</h4>
                <p className="text-xs text-slate-400">How 10 Terabytes of Internet text transforms into 140GB of mathematical concepts</p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="text-slate-400">Compression Factor:</span>
                <span className="text-indigo-400 font-bold">100 : 1</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Retained in 140GB Parameter Weights</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Grammar, syntax, and linguistic structure across 100+ languages</li>
                  <li>Broad factual consensus (e.g. Earth orbits Sun, capital of France is Paris)</li>
                  <li>Coding patterns, algorithms, and logic puzzle templates</li>
                  <li>Stylistic archetypes (how a biography reads vs an academic abstract)</li>
                  <li>Common sense relationships between objects and verbs</li>
                </ul>
              </div>

              <div className="bg-rose-950/20 border border-rose-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Dropped / Lost in Compression (Triggers Hallucination)</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li>Exact verbatim strings and obscure copyright texts</li>
                  <li>Niche dates, phone numbers, and obscure historical citations</li>
                  <li>Factual consistency for rare or fictional names</li>
                  <li>Guaranteed mathematical calculation precision without tools</li>
                  <li>Real-time events occurring after the pre-training cutoff</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SUBTAB 3.2: DREAMING DOCUMENTS & HALLUCINATION SANDBOX */
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="max-w-3xl mb-6">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-1">
                <span>Section 3.2 Key Concept</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                "Dreaming Documents" vs Querying a Database
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                As Andrej Karpathy describes it, an LLM does not perform a SQL lookup. It is effectively 
                <strong> "dreaming" internet documents</strong> on the fly based on statistical probabilities. 
                When prompted for a biography, it knows what a biography <em>looks like</em> (birthdates, schools, accolades), 
                so it fabricates them seamlessly if not tethered to external ground truth.
              </p>
            </div>

            {/* Test Case Picker & Grounding Toggle */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-950 border border-slate-800 rounded-xl mb-6">
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400 font-semibold">Test Scenario:</span>
                <button
                  onClick={() => setTestScenario('fake')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    testScenario === 'fake'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Fake Figure ("Lord Percival Q. Abernathy")
                </button>
                <button
                  onClick={() => setTestScenario('real')}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    testScenario === 'real'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Real Figure ("Isaac Newton")
                </button>
              </div>

              {/* Grounding Tool Toggle */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-300">Tool Grounding (Web Search / Database):</span>
                <button
                  onClick={() => setEnableGrounding(!enableGrounding)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    enableGrounding
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>{enableGrounding ? 'ENABLED (LLM OS Tool)' : 'DISABLED (Raw Dreaming)'}</span>
                </button>
              </div>
            </div>

            {/* Prompt & Output Box */}
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                <div className="text-xs text-slate-400 font-semibold mb-1">User Prompt to Model:</div>
                <div className="font-mono text-sm text-indigo-300">"{scenarios[testScenario].query}"</div>
              </div>

              <div className={`rounded-xl p-5 border ${
                !enableGrounding && testScenario === 'fake'
                  ? 'bg-rose-950/20 border-rose-500/40'
                  : 'bg-slate-950 border-slate-800'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wide">
                      {enableGrounding ? "Grounded AI Output (Using External Tool)" : "Raw Next-Word 'Dreaming' Generation"}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    !enableGrounding && testScenario === 'fake'
                      ? 'bg-rose-900/60 text-rose-300 border border-rose-700'
                      : 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                  }`}>
                    {!enableGrounding && testScenario === 'fake' ? 'HALLUCINATION DETECTED' : 'FACTUAL'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 font-mono leading-relaxed whitespace-pre-line">
                  {enableGrounding ? scenarios[testScenario].groundedOutput : scenarios[testScenario].rawOutput}
                </p>

                {/* Hallucination analysis */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-start gap-2">
                  <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-200">Mechanics:</strong> {scenarios[testScenario].hallucinationRisk}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
