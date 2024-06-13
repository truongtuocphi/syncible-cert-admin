'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

import Footer from '@/components/layout/Footer';
import MintPage from '@/components/pages/mint';

const Page = () => {
  const router = useRouter();

  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected]);

  return (
    <div>
      <div className="flex justify-center pt-16">
        <div className="min-h-[calc(100vh-10rem)] w-full max-w-screen-lg px-4 py-12 md:px-8 xl:px-12">
          <MintPage />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
