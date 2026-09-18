import React, { useState } from 'react';
import { REPORT_PAGES, GUIDE_METADATA } from '../data/guideData';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

interface ReportViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportViewerModal: React.FC<ReportViewerModalProps> = ({ isOpen, onClose }) => {
  const [activePageIdx, setActivePageIdx] = useState<number>(0);

  if (!isOpen) return null;

  const page = REPORT_PAGES[activePageIdx];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Research Report Reference Viewer
              </h3>
              <div className="text-[11px] text-slate-400">
                {GUIDE_METADATA.basis} • {GUIDE_METADATA.date}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Page Navigation Banner */}
          <div className="flex items-center justify-between bg-slate-950 rounded-xl p-3 border border-slate-800 text-xs font-mono">
            <button
              disabled={activePageIdx === 0}
              onClick={() => setActivePageIdx((p) => Math.max(0, p - 1))}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-slate-300 font-bold">
              Page {page.pageNumber} of {REPORT_PAGES.length}
            </span>

            <button
              disabled={activePageIdx === REPORT_PAGES.length - 1}
              onClick={() => setActivePageIdx((p) => Math.min(REPORT_PAGES.length - 1, p + 1))}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Page Content View */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {page.section}
              </span>
              <span className="text-xs text-slate-500 font-mono">Report Document Excerpt</span>
            </div>

            <h4 className="text-xl font-extrabold text-white tracking-tight">
              {page.title}
            </h4>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {page.summary}
            </div>

            {/* Key Takeaways from this page */}
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">
                Core Findings on Page {page.pageNumber}:
              </div>
              <div className="space-y-2">
                {page.keyTakeaways.map((takeaway, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer with quick jump */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-slate-400">Jump to Page:</span>
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            {REPORT_PAGES.map((p, idx) => (
              <button
                key={p.pageNumber}
                onClick={() => setActivePageIdx(idx)}
                className={`w-7 h-7 rounded text-xs font-mono font-bold transition-colors ${
                  activePageIdx === idx
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {p.pageNumber}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
