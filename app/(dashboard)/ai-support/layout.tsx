import Navbar from '@/components/shared/Navbar';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
}
