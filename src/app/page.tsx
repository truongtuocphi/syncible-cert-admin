'use client';

import React, { useEffect } from 'react';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';

const Page = () => {
  const router = useRouter();

  const { open } = useWeb3Modal();

  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      router.push('/mint');
    }
  }, [isConnected]);

  return (
    <div className="flex flex-col items-center gap-8">
      {/* <div className="bg-gradient-to-t from-brand-700 to-brand-400 bg-clip-text text-center text-7xl font-semibold text-transparent"> */}
      <div className="text-center text-6xl font-semibold">
        Connect your wallet to create certificates.
      </div>
      <div>
        <ButtonPrimary onClick={() => open()} className="font-semibold">
          {isConnected && address ? (
            `${address.slice(0, 4)}...${address.slice(-6)}`
          ) : (
            <div>Connect Wallet</div>
          )}
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default Page;
