'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, Bug, Code, Loader2, Copy, Check, Sparkles } from 'lucide-react';
import { LANGUAGES, DEPTH_LEVELS, COMPLEXITY_COLORS } from '@/lib/constants';
import { getLanguageIcon } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import toast from 'react-hot-toast';
import ExplanationPanel from './components/ExplanationPanel';

export default function AISupportPage() {
  const { user } = useUser();
  const [code, setCode] = useState(`function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    let temp = a + b;
    a = b;
    b = temp;
  }
  return b;
}`);
  const [language, setLanguage] = useState('javascript');
  const [depth, setDepth] = useState('intermediate');
  const [explanation, setExplanation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleExplain = async () => {
    if (!code.trim()) {
      toast.error('Please enter some code first');
      return;
    }

    setLoading(true);
    setExplanation(null);

    try {
      const response = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          depth,
          title: `${language.charAt(0).toUpperCase() + language.slice(1)} Code Explanation`,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.error('Failed to parse JSON response:', e);
        throw new Error(`Server Error: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate explanation');
      }

      setExplanation(data.data);
      toast.success('Explanation generated successfully!');
    } catch (error: any) {
      console.error('Error:', error);
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">AI Code Support</h1>
          <p className="text-gray-400">
            Get instant AI explanations for your code. Paste any code snippet and let DevOracle explain it to you in easiest way possible.
          </p>
          {user && (
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              Signed in as {user.emailAddresses[0]?.emailAddress}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Code Input */}
          <div className="space-y-6">
            <Card className="border-gray-800 bg-gray-900/50 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-400" />
                    Your Code
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopy}
                    className="text-gray-400 hover:text-white"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    {copied ? 'Copied!' : 'Copy'}
                  </Button>
                </div>
                <CardDescription>
                  Paste or write your code below. We support {LANGUAGES.length} programming languages.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">
                        Language
                      </label>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {LANGUAGES.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value} className="text-white hover:bg-gray-700">
                              <span className="mr-2">{lang.icon}</span>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">
                        Explanation Level
                      </label>
                      <Select value={depth} onValueChange={setDepth}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select depth" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          {DEPTH_LEVELS.map((level) => (
                            <SelectItem key={level.value} value={level.value} className="text-white hover:bg-gray-700">
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Textarea
                      value={code}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCode(e.target.value)}
                      placeholder="Paste your code here..."
                      className="min-h-75 font-mono text-sm bg-gray-800 border-gray-700 text-white resize-none"
                    />
                  </div>

                  <Button
                    onClick={handleExplain}
                    disabled={loading || !code.trim()}
                    className="w-full bg-linear-to-r from-purple-600 to-cyan-500 hover:opacity-90"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating Explanation...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Explain This Code
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="border-gray-800 bg-gray-900/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white">10+</div>
                  <div className="text-sm text-gray-400">Languages</div>
                </CardContent>
              </Card>
              <Card className="border-gray-800 bg-gray-900/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white">3</div>
                  <div className="text-sm text-gray-400">Depth Levels</div>
                </CardContent>
              </Card>
              <Card className="border-gray-800 bg-gray-900/30">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-white">∞</div>
                  <div className="text-sm text-gray-400">Explanations</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Explanation Output */}
          <div className="space-y-6 min-h-[500px]">
             <ExplanationPanel 
                data={explanation}
                isLoading={loading}
                language={language} 
             />
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Powered by Google Gemini AI • Your explanations are saved to your history •{' '}
            {user ? 'Logged in' : 'Sign in to save your history'}
          </p>
        </div>
      </div>
    </div>
  );
}
