'use client';

// import { useState } from 'react';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import Link from 'next/link';
// import { Hex } from 'viem';
import { useAccount } from 'wagmi';

import { BasalwalletFullIcon, BasalwalletIcon } from '@/assets/icons';

import ButtonPrimary from '../common/button/ButtonPrimary';
import Image from '../core/image';

const Navbar = () => {
  // const [openModal, setOpenModal] = useState<boolean>(false);

  const { open } = useWeb3Modal();

  const { address, isConnected } = useAccount();

  // const balance = useBalance({
  //   address: address,
  //   token: process.env.NEXT_PUBLIC_TOKEN_ADDRESS as Hex,
  // });

  return (
    <div className="h-16 border-b shadow dark:border-gray-800">
      <div className="flex h-full w-full items-center justify-between px-4 md:px-8 xl:px-12">
        {/* <Link href="/" className="sm:hidden">
          <BasalwalletIcon className="h-10" />
        </Link> */}
        {/* <Link href="/" className="hidden sm:block">
          <BasalwalletFullIcon className="h-10" />
        </Link> */}
        <Link href="/" className="h-fit">
          <div className="h-10">
            <Image src="/abaii.png" alt="Basalwallet" />
          </div>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          {/* <button
            className="flex aspect-square h-10 items-center justify-center rounded-xl border border-slate-800 p-1 text-2xl hover:scale-105"
            onClick={() => setOpenModal(true)}
          >
            ?
          </button>

          <GuideCard open={openModal} onClose={() => setOpenModal(false)} /> */}

          <ButtonPrimary onClick={() => open()} className="font-bold">
            {isConnected && address ? (
              `${address.slice(0, 4)}...${address.slice(-6)}`
            ) : (
              <div>
                <div>Connect Wallet</div>
              </div>
            )}
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
