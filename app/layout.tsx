import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Toaster } from 'react-hot-toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevOracle - AI Code Mentor',
  description: 'AI-powered code explanation, debugging, and learning platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#8B5CF6',
          colorBackground: '#0f172a',
        },
        elements: {
          formButtonPrimary: 'bg-linear-to-r from-purple-600 to-cyan-500 hover:opacity-90',
          footerActionLink: 'text-cyan-400 hover:text-cyan-300',
        },
      }}
    >
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-gray-900 text-white`}>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1f2937',
                color: '#fff',
                border: '1px solid #374151',
              },
            }}
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}