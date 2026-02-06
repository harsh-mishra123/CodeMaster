'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExplanationResult, QuizQuestion } from '@/types/code';
import { 
  BookOpen, 
  Bug, 
  Lightbulb, 
  Play, 
  CheckCircle2, 
  XCircle, 
  HelpCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ExplanationPanelProps {
  data: ExplanationResult | null;
  isLoading: boolean;
  language: string;
}

export default function ExplanationPanel({ data, isLoading, language }: ExplanationPanelProps) {
  if (isLoading) {
    return (
      <div className="h-full flex flex-col items-center justify-center space-y-4 p-8 animate-pulse text-muted-foreground">
        <div className="w-12 h-12 rounded-full bg-primary/20 animate-bounce" />
        <p>Analyzing logic and generating explanation...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
        <Lightbulb className="w-12 h-12 mb-4 opacity-50" />
        <p className="max-w-xs">Run an explanation to receive detailed insights, debugging tips, and interactive quizzes.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Explanation Section */}
      <Card className="bg-slate-950 border-slate-800">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2 text-blue-400">
              <BookOpen className="w-5 h-5" />
              Understanding the Code
            </CardTitle>
            <Badge variant="outline" className={cn(
              "capitalize",
              data.complexity === 'low' ? "border-green-500 text-green-500" :
              data.complexity === 'medium' ? "border-yellow-500 text-yellow-500" :
              "border-red-500 text-red-500"
            )}>
              {data.complexity} Complexity
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-sm">
            {data.explanation}
          </p>
        </CardContent>
      </Card>

      {/* Dry Run Section */}
      {data.dryRun && (
        <Card className="bg-slate-950 border-slate-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2 text-purple-400">
              <Play className="w-5 h-5" />
              Dry Run Execution
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-slate-900/50 rounded-lg m-4 p-4 font-mono text-xs md:text-sm text-slate-300 border border-slate-800/50 overflow-x-auto">
             <div className="whitespace-pre-wrap">{data.dryRun}</div>
          </CardContent>
        </Card>
      )}

      {/* Debugging Tips */}
      <Card className="bg-slate-950 border-slate-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2 text-amber-400">
            <Bug className="w-5 h-5" />
            Debugging Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {data.debugTips.map((tip, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-amber-500 mt-2" />
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Key Concepts */}
      <div className="flex flex-wrap gap-2">
        {data.concepts.map((concept, i) => (
          <Badge key={i} variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700">
            {concept}
          </Badge>
        ))}
      </div>

      {/* Interactive Quiz */}
      <Card className="bg-slate-950 border-slate-800 overflow-hidden">
        <CardHeader className="pb-2 bg-slate-900/30">
          <CardTitle className="text-lg flex items-center gap-2 text-pink-400">
            <HelpCircle className="w-5 h-5" />
            Interactive Quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
           {data.interactiveQuiz && data.interactiveQuiz.length > 0 ? (
             <div className="space-y-8">
               {data.interactiveQuiz.map((quiz, index) => (
                 <QuizItem key={index} quiz={quiz} index={index + 1} />
               ))}
             </div>
           ) : (
             <div className="text-center text-slate-500 italic">No quiz questions available for this code.</div>
           )}
        </CardContent>
      </Card>

    </div>
  );
}

function QuizItem({ quiz, index }: { quiz: QuizQuestion, index: number }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const isCorrect = selected === quiz.correctAnswer;

  return (
    <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
      <h4 className="flex items-start gap-3 text-slate-200 font-medium mb-4">
        <span className="flex items-center justify-center w-6 h-6 rounded bg-slate-800 text-xs font-bold text-slate-400 flex-shrink-0">
          {index}
        </span>
        {quiz.question}
      </h4>

      <div className="space-y-2 pl-9">
        {quiz.options.map((option, i) => (
            <button
              key={i}
              onClick={() => {
                  if (showResult) return;
                  setSelected(option);
                  setShowResult(true);
              }}
              disabled={showResult}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg text-sm transition-all border",
                showResult && option === quiz.correctAnswer 
                    ? "bg-green-500/10 border-green-500/50 text-green-400"
                    : showResult && selected === option && option !== quiz.correctAnswer
                    ? "bg-red-500/10 border-red-500/50 text-red-400"
                    : "bg-slate-900/50 border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-400",
                 selected === option && !showResult && "border-primary bg-primary/5 text-primary"
              )}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showResult && option === quiz.correctAnswer && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                {showResult && selected === option && option !== quiz.correctAnswer && <XCircle className="w-4 h-4 text-red-500" />}
              </div>
            </button>
        ))}
      </div>
      
      <AnimatePresence>
        {showResult && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className={cn(
                    "mt-4 ml-9 p-3 rounded-lg text-sm border",
                    isCorrect ? "bg-green-950/20 border-green-900/50 text-green-300" : "bg-red-950/20 border-red-900/50 text-red-300"
                )}
            >
                <div className="font-semibold mb-1">
                    {isCorrect ? "Correct!" : "Incorrect"}
                </div>
                {quiz.explanation}
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
