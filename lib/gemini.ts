import {GoogleGenerativeAI} from '@google/generative-ai';

if(!process.env.GEMINI_API_KEY) {
    console.warn('Warning: GEMINI_API_KEY is not set. Gemini API calls will fail.');
}

const genAI = process.env.GEMINI_API_KEY 
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;


  export type DepthLevel = 'beginner' | 'intermediate' | 'advanced';

  export type Language= 'javascript' | 'python' | 'java' | 'c++' | 'ruby' | 'go' | 'swift' | 'kotlin' | 'typescript' | 'php' | 'c#';

  export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }

  export interface ExplanationResult {
  explanation: string;
  dryRun: string; // New field for execution trace
  debugTips: string[];
  quizQuestions: string[];
  interactiveQuiz: QuizQuestion[]; // New field for interactive testing
  concepts: string[];
  complexity: 'low' | 'medium' | 'high';
  estimatedTokens: number;
}

export async function explainCode(
  code: string,
  language: Language,
  depth: DepthLevel = 'intermediate'
): Promise<ExplanationResult> {
  // Fallback if Gemini is not configured
  if (!genAI) {
    console.warn('Using fallback explanation (Gemini not configured)');
    return getFallbackExplanation(code, language, depth);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
      You are DevOracle, an expert AI coding mentor.
      
      TASK: Explain this ${language} code for a ${depth} level developer.
      
      CODE:
      ${code}
      
      REQUIREMENTS:
      1. Provide a clear, concise explanation (2-3 paragraphs)
      2. Perform a "Dry Run": Simulate the code execution step-by-step with sample input values. Show variable changes and control flow.
      3. Include 2-3 practical debugging tips or improvements
      4. Create 3 quiz questions to test understanding. Each question must have options and a correct answer.
      5. List 3-5 key programming concepts used
      6. Rate code complexity: low/medium/high
      
      RESPONSE FORMAT (JSON ONLY):
      {
        "explanation": "Detailed explanation here...",
        "dryRun": "Step-by-step execution simulation...",
        "debugTips": ["Tip 1", "Tip 2", "Tip 3"],
        "interactiveQuiz": [
          {
            "question": "Question text?",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctAnswer": "Option B",
            "explanation": "Why B is correct..."
          }
        ],
        "concepts": ["Concept 1", "Concept 2", "Concept 3"],
        "complexity": "low|medium|high"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean and parse response
    const cleanedText = text
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .trim();
    
    try {
      const parsed = JSON.parse(cleanedText);
      
      // Validate required fields
      if (!parsed.explanation || !Array.isArray(parsed.debugTips)) {
        throw new Error('Invalid response structure');
      }
      
      return {
        explanation: parsed.explanation,
        dryRun: parsed.dryRun || "No dry run available.",
        debugTips: parsed.debugTips.slice(0, 3),
        quizQuestions: parsed.interactiveQuiz?.map((q: any) => q.question) || [], // Map for backward compatibility
        interactiveQuiz: parsed.interactiveQuiz || [],
        concepts: parsed.concepts?.slice(0, 5) || [],
        complexity: parsed.complexity || 'medium',
        estimatedTokens: response.usageMetadata?.totalTokenCount || 0,
      };
      
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      return getFallbackExplanation(code, language, depth);
    }
    
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return getFallbackExplanation(code, language, depth);
  }
}

export async function debugCode(
  code: string,
  error: string,
  language: Language
): Promise<{ analysis: string; fixedCode: string }> {
  if (!genAI) {
    return {
      analysis: 'Gemini API not configured. Please add GEMINI_API_KEY to your environment variables.',
      fixedCode: code,
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `
      You are DevOracle, an expert AI coding mentor.
      
      TASK: Debug this ${language} code.
      
      CODE:
      ${code}
      
      ERROR MESSAGE (if any):
      ${error || 'No specific error message provided. Look for logical or syntax errors.'}
      
      REQUIREMENTS:
      1. Analyze the code and identify the bug(s).
      2. Provide a fixed version of the code.
      3. Explain what was wrong and how it was fixed.
      
      RESPONSE FORMAT (JSON ONLY):
      {
        "analysis": "Explanation of the bug and the fix...",
        "fixedCode": "The corrected code..."
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanedText = text
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .trim();
    
    try {
      const parsed = JSON.parse(cleanedText);
      return {
        analysis: parsed.analysis || 'Analysis not available.',
        fixedCode: parsed.fixedCode || code,
      };
    } catch (parseError) {
        console.error('Failed to parse debug response:', parseError);
        return {
            analysis: 'Failed to parse AI response. Please try again.',
            fixedCode: code
        }
    }
  } catch (error: any) {
    console.error('Debug API Error:', error);
    return {
        analysis: 'An error occurred while debugging the code.',
        fixedCode: code
    }
  }
}

export async function generateCode(
  description: string,
  language: Language
): Promise<{ code: string; explanation: string; language: string }> {
  if (!genAI) {
    return {
      code: `// Code generation requires Gemini API key\n// Please add GEMINI_API_KEY to .env.local\n\nfunction placeholder() {\n  console.log("Add Gemini API key to generate code");\n}`,
      explanation: 'Gemini API not configured',
      language,
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `
      Generate ${language} code based on this description:
      
      DESCRIPTION: ${description}
      
      REQUIREMENTS:
      1. Write clean, production-ready code
      2. Add comments for important parts
      3. Include error handling if applicable
      4. Follow best practices for ${language}
      5. Provide a brief explanation of the solution
      
      RESPONSE FORMAT (JSON ONLY):
      {
        "code": "Generated code here",
        "explanation": "Brief explanation here",
        "language": "${language}"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const cleanedText = text
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .trim();
    
    try {
      const parsed = JSON.parse(cleanedText);
      return {
        code: parsed.code || '',
        explanation: parsed.explanation || '',
        language: parsed.language || language,
      };
    } catch (parseError) {
      console.error('Failed to parse generated code:', parseError);
      throw new Error('Failed to generate code');
    }
    
  } catch (error: any) {
    console.error('Code generation error:', error);
    throw new Error(`Code generation failed: ${error.message}`);
  }
}

// Fallback function when Gemini is not available
function getFallbackExplanation(
  code: string,
  language: Language,
  depth: DepthLevel
): ExplanationResult {
  const lines = code.split('\n').length;
  const size = lines > 50 ? 'large' : lines > 20 ? 'medium' : 'small';
  
  const explanations = {
    beginner: `This is a ${size} ${language} code snippet. It contains programming logic that performs specific tasks. As a beginner, focus on understanding each line step by step. Start by identifying variables and functions, then trace how data flows through the code.`,
    intermediate: `This ${language} code implements functionality with ${size} complexity. The logic flow includes common patterns and structures. Review the control flow and data transformations. Look for optimization opportunities and error handling patterns.`,
    advanced: `Analyzing this ${language} code reveals ${size}-scale implementation details. Consider architectural decisions, performance implications, and potential optimizations. Evaluate the code against best practices and identify any anti-patterns.`,
  };
  
  return {
    explanation: explanations[depth],
    dryRun: "Dry run simulation is unavailable in offline mode. Please check your API key to enable full AI features.",
    debugTips: [
      'Check for syntax errors and missing semicolons',
      'Verify variable types and scope boundaries',
      'Test edge cases and boundary conditions',
      'Review error handling and exception management',
    ],
    quizQuestions: [
      `What is the main purpose or output of this ${language} code?`,
      'Can you identify any potential security or performance issues?',
      'How would you refactor this code for better readability?',
    ],
    interactiveQuiz: [],
    concepts: ['functions', 'variables', 'control flow', 'data structures', 'error handling'],
    complexity: size === 'large' ? 'high' : size === 'medium' ? 'medium' : 'low',
    estimatedTokens: 0,
  };
}
