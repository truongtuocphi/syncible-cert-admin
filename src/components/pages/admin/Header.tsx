'use client';

import { useEffect, useState } from 'react';

import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useRouter } from 'next/navigation';
import { BiWallet } from 'react-icons/bi';
import { useAccount, useDisconnect } from 'wagmi';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import UserInfo from '@/components/pages/admin/UserInfo';
import { Skeleton } from '@/components/ui/skeleton';
import { auth, onAuthStateChanged } from '@/lib/firebase';
import { useTranslations } from 'next-intl';

const Header = () => {
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const t = useTranslations('Dapp');

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

  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === 'hidden' && isConnected) {
  //       disconnect();
  //     }
  //   };

  //   window.addEventListener('visibilitychange', handleVisibilityChange);

  //   return () => {
  //     window.removeEventListener('visibilitychange', handleVisibilityChange);
  //   };
  // }, [isConnected, disconnect]);

  return (
    <div className="fixed left-0 right-0 top-0 z-40 ml-64 flex items-center justify-end bg-bgPageAdmin p-6 py-3 text-black 2xl:ml-96">
      <div className="flex gap-5">
        <div className="flex items-center gap-2 md:gap-4">
          <ButtonPrimary onClick={() => open()} className="bg-primary-50 text-white">
            {isConnected && address ? (
              <div className="flex items-center gap-2">
                <BiWallet className="text-2xl" />
                {address.slice(0, 4)}...{address.slice(-5)}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <BiWallet className="text-2xl" />
                <span>{t('header.wallet')}</span>
              </div>
            )}
          </ButtonPrimary>
        </div>

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
      </div>
    </div>
  );
};

export default Header;
