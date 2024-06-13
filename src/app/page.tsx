'use client';

import React, { useEffect } from 'react';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import Image from '@/components/core/image';
import Footer from '@/components/layout/Footer';

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
    <div className="relative flex min-h-screen flex-col items-center pt-16">
      <div className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden">
        <Image src="/abaii-bg.webp" alt="hero" fit="cover" />
      </div>
      <div className="relative flex min-h-[calc(100vh-8rem)] w-full items-center justify-center px-4 py-12 md:px-8 xl:px-12">
        <div className="mb-20 flex flex-col items-center gap-8">
          <div className="text-center text-4xl font-semibold text-white sm:text-6xl">
            ABAII NFT-Certificate Platform
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
      </div>

      <div className="relative text-white">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
