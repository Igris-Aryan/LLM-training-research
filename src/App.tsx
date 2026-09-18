/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { OverviewSection } from './components/OverviewSection';
import { AnatomySection } from './components/AnatomySection';
import { CompressionSection } from './components/CompressionSection';
import { TrainingPipelineSection } from './components/TrainingPipelineSection';
import { ScalingLawsSection } from './components/ScalingLawsSection';
import { LLMOperatingSystemSection } from './components/LLMOperatingSystemSection';
import { CybersecurityThreatLab } from './components/CybersecurityThreatLab';
import { GlossaryAndQuiz } from './components/GlossaryAndQuiz';
import { ReportViewerModal } from './components/ReportViewerModal';
import { BookOpen, Cpu, Sparkles, Terminal, FileText, Github } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [completedQuizCount, setCompletedQuizCount] = useState<number>(0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openReportModal={() => setIsReportModalOpen(true)}
        completedQuizCount={completedQuizCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'overview' && (
          <OverviewSection
            onNavigate={(tab) => setActiveTab(tab)}
            openReportModal={() => setIsReportModalOpen(true)}
          />
        )}

        {activeTab === 'anatomy' && <AnatomySection />}

        {activeTab === 'compression' && <CompressionSection />}

        {activeTab === 'training' && <TrainingPipelineSection />}

        {activeTab === 'scaling' && <ScalingLawsSection />}

        {activeTab === 'llm-os' && <LLMOperatingSystemSection />}

        {activeTab === 'cybersecurity' && <CybersecurityThreatLab />}

        {activeTab === 'glossary-quiz' && (
          <GlossaryAndQuiz
            onQuizAnswered={(count) => setCompletedQuizCount(count)}
            openReportModal={() => setIsReportModalOpen(true)}
          />
        )}
      </main>

      {/* Report Modal */}
      <ReportViewerModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-8 px-4 sm:px-6 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <span className="text-slate-400 font-semibold">LLM Demystified: Interactive Research Dashboard</span>
          </div>

          <div className="text-center sm:text-right text-slate-400">
            Based on <span className="text-slate-300">"Demystifying Large Language Models"</span> & Andrej Karpathy's Masterclass
          </div>
        </div>
      </footer>
    </div>
  );
}
