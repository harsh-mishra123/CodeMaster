import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';

export default async function Navbar() {
  const { userId } = await auth();

  return (
    <nav className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                DevOracle
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {userId ? (
              <div className="flex items-center gap-4">
                <Link 
                  href="/ai-support"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-md hover:opacity-90 transition-opacity"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
