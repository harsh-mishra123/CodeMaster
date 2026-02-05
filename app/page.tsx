import Navbar from '@/components/shared/Navbar';
import Link from 'next/link';
import { ArrowRight, Code2, Sparkles, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white selection:bg-purple-500/30">
        <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 border border-gray-800 mb-8">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">AI-Powered Code Assistant</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Master Coding with <br />
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Intelligent Mentorship
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Get instant code explanations, debugging help, and personalized learning paths. 
              Elevate your programming skills with your personal AI code mentor.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/register" 
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold text-white hover:opacity-90 transition-all flex items-center justify-center gap-2 group"
              >
                Start Learning Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/demo" 
                className="w-full sm:w-auto px-8 py-4 bg-gray-900 border border-gray-800 rounded-xl font-semibold text-gray-300 hover:bg-gray-800 transition-all"
              >
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Code2 className="w-8 h-8 text-purple-400" />}
              title="Code Explaination"
              description="Paste any code snippet and get detailed, line-by-line explanations suitable for your skill level."
            />
            <FeatureCard 
              icon={<Zap className="w-8 h-8 text-cyan-400" />}
              title="Instant Debugging"
              description="Identify bugs instantly with smart fix suggestions and prevention tips."
            />
            <FeatureCard 
              icon={<Sparkles className="w-8 h-8 text-pink-400" />}
              title="Learning Path"
              description="Personalized roadmap to master new languages and frameworks based on your goals."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="mb-6 p-4 rounded-xl bg-gray-950 w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
