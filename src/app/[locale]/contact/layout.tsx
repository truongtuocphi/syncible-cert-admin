import Navbar from '@/components/layout/Navbar';

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh">
      <div className="fixed top-0 z-30 w-screen md:mt-6">
        <Navbar />
      </div>
      {children}
    </div>
  );
}
