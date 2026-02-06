'use client';

import { SignIn } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

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
          <span className="text-2xl font-bold">🧙‍♂️</span>
        </div>
        <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-linear-to-r from-purple-400 to-cyan-300">
          DevOracle
        </h1>
        <p className="text-gray-400">AI-Powered Code Mentor</p>
      </div>

      {/* Auth Container */}
      <div className="w-full max-w-md space-y-6">
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to continue your coding journey</p>
          </div>

          <SignIn
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
                identityPreviewText: 'text-gray-300',
                identityPreviewEditButton: 'text-cyan-400',
              },
            }}
            forceRedirectUrl="/ai-support"
            signUpUrl="/register"
          />
        </div>

        {/* Demo Credentials */}
        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-400 mb-2">Demo Credentials:</p>
          <p className="text-sm text-gray-300">Use any email - Clerk will send magic link</p>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/register"
              className="text-cyan-400 hover:text-cyan-300 font-medium"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center">
        <p className="text-sm text-gray-500">
          By signing in, you agree to our Terms & Privacy
        </p>
      </div>
    </div>
  );
}