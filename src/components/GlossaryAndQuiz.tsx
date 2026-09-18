import React, { useState } from 'react';
import { GLOSSARY_TERMS, QUIZ_QUESTIONS } from '../data/guideData';
import { GlossaryTerm, QuizQuestion } from '../types';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  HelpCircle, 
  BookOpen, 
  Filter,
  Lightbulb,
  ExternalLink
} from 'lucide-react';

interface GlossaryAndQuizProps {
  onQuizAnswered: (correctCount: number) => void;
  openReportModal: () => void;
}

export const GlossaryAndQuiz: React.FC<GlossaryAndQuizProps> = ({ onQuizAnswered, openReportModal }) => {
  const [activeSubTab, setActiveSubTab] = useState<'quiz' | 'glossary'>('quiz');

  // Glossary state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTerms = GLOSSARY_TERMS.filter((term) => {
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Quiz state
  const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: number }>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (showResults) return;
    const nextAnswers = { ...userAnswers, [questionId]: optionIdx };
    setUserAnswers(nextAnswers);

    // Calculate score
    const correctCount = Object.entries(nextAnswers).reduce((acc, [qId, ans]) => {
      const q = QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
      return q && q.correctIndex === ans ? acc + 1 : acc;
    }, 0);
    onQuizAnswered(correctCount);
  };

  const calculateScore = () => {
    return Object.entries(userAnswers).reduce((acc, [qId, ans]) => {
      const q = QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
      return q && q.correctIndex === ans ? acc + 1 : acc;
    }, 0);
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowResults(false);
    onQuizAnswered(0);
  };

  const answeredCount = Object.keys(userAnswers).length;
  const score = calculateScore();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Chapter Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              CHAPTER 8 & GLOSSARY
            </span>
            <h2 className="text-xl font-bold text-white">Interactive Knowledge Check & Key Terms</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Pages 13–14 of Research Report</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          Test your mastery of Andrej Karpathy's masterclass findings with an 8-question certification quiz, 
          or search the comprehensive glossary of foundational AI terms.
        </p>

        {/* Sub-nav */}
        <div className="flex space-x-2 mt-5 border-t border-slate-800 pt-4">
          <button
            onClick={() => setActiveSubTab('quiz')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSubTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Mastery Quiz ({answeredCount}/{QUIZ_QUESTIONS.length})
          </button>
          <button
            onClick={() => setActiveSubTab('glossary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeSubTab === 'glossary'
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            Glossary of 12 Core Terms (Page 14)
          </button>
        </div>
      </div>

      {/* QUIZ VIEW */}
      {activeSubTab === 'quiz' && (
        <div className="space-y-6">
          {/* Progress / Score Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Certification Status
              </div>
              <div className="text-lg font-bold text-white mt-0.5 flex items-center gap-2">
                <span>{showResults ? `Score: ${score} / ${QUIZ_QUESTIONS.length}` : `${answeredCount} of ${QUIZ_QUESTIONS.length} Answered`}</span>
                {showResults && score >= 6 && (
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    PASSED WITH MASTERY
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {!showResults && answeredCount === QUIZ_QUESTIONS.length && (
                <button
                  onClick={() => setShowResults(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20"
                >
                  Grade My Quiz
                </button>
              )}
              {showResults && (
                <button
                  onClick={handleResetQuiz}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
              )}
            </div>
          </div>

          {/* Quiz Questions List */}
          <div className="space-y-4">
            {QUIZ_QUESTIONS.map((q, qIndex) => {
              const selectedIdx = userAnswers[q.id];
              const isAnswered = selectedIdx !== undefined;
              const isCorrect = isAnswered && selectedIdx === q.correctIndex;

              return (
                <div 
                  key={q.id}
                  className={`bg-slate-900 border rounded-2xl p-5 sm:p-6 transition-all ${
                    showResults
                      ? isCorrect
                        ? 'border-emerald-500/40 bg-emerald-950/10'
                        : 'border-rose-500/40 bg-rose-950/10'
                      : isAnswered
                      ? 'border-indigo-500/50 bg-slate-900'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-xs font-mono shrink-0">
                        {qIndex + 1}
                      </span>
                      <span>{q.question}</span>
                    </h3>
                    <span className="text-[11px] font-mono text-indigo-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                      Page {q.pageRef}
                    </span>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-2.5 pt-2">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedIdx === optIdx;
                      const isTargetCorrect = q.correctIndex === optIdx;

                      let btnStyle = "bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950";
                      if (showResults) {
                        if (isTargetCorrect) {
                          btnStyle = "bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold";
                        } else if (isOptionSelected) {
                          btnStyle = "bg-rose-950/80 border-rose-500 text-rose-200";
                        } else {
                          btnStyle = "bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60";
                        }
                      } else if (isOptionSelected) {
                        btnStyle = "bg-indigo-950 border-indigo-500 text-white font-medium shadow-xs";
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={showResults}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {showResults && isTargetCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          )}
                          {showResults && isOptionSelected && !isTargetCorrect && (
                            <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation card when results are shown or user clicked an option */}
                  {showResults && (
                    <div className={`mt-4 p-3.5 rounded-xl border text-xs font-mono leading-relaxed ${
                      isCorrect ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-300' : 'bg-rose-950/30 border-rose-500/30 text-rose-300'
                    }`}>
                      <div className="font-sans font-bold text-white mb-1">
                        {isCorrect ? '✓ Correct Answer' : '✗ Incorrect'} (Reference: Research Report Page {q.pageRef}):
                      </div>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GLOSSARY VIEW */}
      {activeSubTab === 'glossary' && (
        <div className="space-y-6">
          {/* Filter / Search Bar */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search glossary terms, analogies, or concepts..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {['all', 'architecture', 'training', 'systems', 'security'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Term Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTerms.map((term) => (
              <div 
                key={term.term}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-white tracking-tight">{term.term}</h3>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-950 text-indigo-400 border border-slate-800">
                      {term.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {term.definition}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-slate-400 leading-relaxed">
                    <strong className="text-slate-300">Everyday Analogy: </strong>
                    {term.analogy}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
