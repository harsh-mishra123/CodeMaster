import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - DevOracle',
  description: 'Sign in or create your DevOracle account',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}