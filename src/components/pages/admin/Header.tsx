'use client';

import { useEffect, useState } from 'react';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useRouter } from 'next/navigation';
import { FaWallet } from 'react-icons/fa';
import { useAccount } from 'wagmi';

import Breadcrumb from '@/components/common/breadcrumb/Breadcrumb';
import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import UserInfo from '@/components/pages/admin/UserInfo';
import { Skeleton } from '@/components/ui/skeleton';
import { auth, onAuthStateChanged } from '@/lib/firebase';

const Header = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="fixed left-0 right-0 top-0 z-40 ml-64 flex items-center justify-between border-b-[0.5px] border-gray-200 bg-white p-6 py-3 text-black">
      <div className="relative max-w-md flex-1 font-bold text-gray-700">
        <Breadcrumb />
      </div>

      <div className="flex gap-5">
        <div className="flex items-center space-x-4">
          {user ? (
            <UserInfo user={user} />
          ) : (
            <div className="flex items-center space-x-4 ">
              <Skeleton className="h-12 w-12 rounded-full bg-gray-400 " />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-gray-400" />
                <Skeleton className="h-4 w-[200px] bg-gray-400" />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ButtonPrimary onClick={() => open()} className="bg-primary-50 text-white">
            {isConnected && address ? (
              `${address.slice(0, 4)}...${address.slice(-6)}`
            ) : (
              <div className="flex items-center gap-2">
                <FaWallet />
                <span>Kết nối ví</span>
              </div>
            )}
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default Header;
