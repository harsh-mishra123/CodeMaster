'use client';

import { SignUp } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 flex flex-col items-center justify-center p-4">
      {/* Back Button */}
      <div className="absolute top-6 left-6">
        <Button
          variant="ghost"
          className="text-gray-400 hover:text-white"
          asChild
        >
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Logo */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-r from-purple-600 to-cyan-500 mb-4">
          <span className="text-2xl font-bold">🚀</span>
        </div>
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-cyan-300">
          Join DevOracle
        </h1>
        <p className="text-gray-400">Start your AI coding journey today</p>
      </div>

      {/* Auth Container */}
      <div className="w-full max-w-md">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400">Get started with AI-powered code mentorship</p>
          </div>

          <SignUp
            appearance={{
              elements: {
                formButtonPrimary:
                  'bg-linear-to-r from-purple-600 to-cyan-500 hover:opacity-90 transition-opacity',
                footerActionLink: 'text-cyan-400 hover:text-cyan-300',
                socialButtonsBlockButton:
                  'border-gray-700 hover:bg-gray-800/50',
                card: 'bg-transparent shadow-none',
                headerTitle: 'hidden',
                headerSubtitle: 'hidden',
                socialButtonsBlockButtonText: 'text-gray-300',
                dividerLine: 'bg-gray-800',
                dividerText: 'text-gray-500',
                formFieldLabel: 'text-gray-300',
                formFieldInput:
                  'bg-gray-800/50 border-gray-700 text-white focus:border-purple-500',
              },
            }}
            forceRedirectUrl="/ai-support"
            signInUrl="/login"
          />
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-gray-400">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-3 gap-4 mt-8 max-w-2xl">
        {[
          { icon: '🤖', title: 'AI Explanations', desc: 'Understand any code' },
          { icon: '🐛', title: 'Smart Debugging', desc: 'Find & fix bugs' },
          { icon: '📚', title: 'Learn Faster', desc: 'Personalized quizzes' },
        ].map((feature) => (
          <div
            key={feature.title}
            className="bg-gray-900/30 border border-gray-800 rounded-xl p-4 text-center"
          >
            <div className="text-2xl mb-2">{feature.icon}</div>
            <h3 className="font-medium text-white">{feature.title}</h3>
            <p className="text-sm text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}