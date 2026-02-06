export type DepthLevel = 'beginner' | 'intermediate' | 'advanced';

export type Language = 'javascript' | 'python' | 'java' | 'c++' | 'ruby' | 'go' | 'swift' | 'kotlin' | 'typescript' | 'php' | 'c#';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ExplanationResult {
  explanation: string;
  dryRun: string;
  debugTips: string[];
  quizQuestions: string[];
  interactiveQuiz: QuizQuestion[];
  concepts: string[];
  complexity: 'low' | 'medium' | 'high';
  estimatedTokens: number;
}
