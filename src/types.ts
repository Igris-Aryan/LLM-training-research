export type ActiveTab = 
  | 'overview'
  | 'anatomy'
  | 'compression'
  | 'training'
  | 'scaling'
  | 'llm-os'
  | 'cybersecurity'
  | 'glossary-quiz';

export interface TokenItem {
  text: string;
  id: number;
  colorClass: string;
}

export interface AttentionWord {
  word: string;
  weight: number;
  role?: string;
}

export interface TrainingStage {
  id: number;
  title: string;
  subtitle: string;
  cost: string;
  compute: string;
  dataset: string;
  result: string;
  description: string;
  examplePrompt: string;
  exampleOutput: string;
}

export interface RLHFCandidate {
  id: string;
  text: string;
  quality: 'best' | 'okay' | 'terrible';
  feedback: string;
}

export interface ToolCallExecution {
  toolName: 'calculator' | 'python' | 'browser' | 'image-gen';
  input: string;
  output: string;
  reasoning: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  pageRef: number;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'architecture' | 'training' | 'systems' | 'security';
  analogy: string;
}

export interface ReportPage {
  pageNumber: number;
  title: string;
  section: string;
  summary: string;
  keyTakeaways: string[];
}
