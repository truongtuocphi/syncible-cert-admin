'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

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
      <MintPage />
    </div>
  );
};

export default Page;
