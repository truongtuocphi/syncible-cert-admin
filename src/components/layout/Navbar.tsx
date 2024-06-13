'use client';

import { useEffect } from 'react';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';

import ButtonPrimary from '../common/button/ButtonPrimary';
import Image from '../core/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const Navbar = () => {
  const router = useRouter();

  const { open } = useWeb3Modal();

  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected) {
      router.push('/mint');
    }
  }, [isConnected]);

  return (
    <div className="h-16">
      <div className="flex h-full w-full items-center justify-between px-4 md:px-8 xl:px-12">
        <Link href="/" className="h-fit">
          <div className="h-10 w-32">
            <Image src="/abaii.png" alt="Basalwallet" />
          </div>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          {isConnected ? (
            <Select defaultValue="polygon">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select chain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="polygon">
                  <div className="flex gap-2">
                    <div className="aspect-square h-5 w-5 rounded-full">
                      <Image
                        src="https://cryptologos.cc/logos/polygon-matic-logo.png?v=032"
                        alt="polygon"
                      />
                    </div>
                    Polygon
                  </div>
                </SelectItem>
                <SelectItem value="ethereum" disabled>
                  <div className="flex gap-2">
                    <div className="aspect-square h-5 w-5 rounded-full">
                      <Image
                        src="https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032"
                        alt="ethereum"
                      />
                    </div>
                    Ethereum
                  </div>
                </SelectItem>
                <SelectItem value="bitcoin" disabled>
                  <div className="flex gap-2">
                    <div className="aspect-square h-5 w-5 rounded-full">
                      <Image
                        src="https://cryptologos.cc/logos/bitcoin-btc-logo.png"
                        alt="bitcoin"
                      />
                    </div>
                    Bitcoin
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          ) : null}

          <ButtonPrimary onClick={() => open()}>
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
