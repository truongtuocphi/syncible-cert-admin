'use client';

import { FaSearch } from 'react-icons/fa';
import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import UserInfo from '@/components/pages/admin/UserInfo';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, onAuthStateChanged } from '@/lib/firebase';

const Header = () => {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const [search, setSearch] = useState('');

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
    <div className="mb-4 flex items-center justify-between">
      <div className="relative max-w-md flex-1">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-2 mt-1 text-gray-500" />
      </div>

      <div className="flex gap-5">
        <div className="flex items-center space-x-4">
          {user ? (
            <UserInfo user={user} />
          ) : (
            <a href="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </a>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <ButtonPrimary onClick={() => open()}>
            {isConnected && address ? (
              `${address.slice(0, 4)}...${address.slice(-6)}`
            ) : (
              <div>Connect</div>
            )}
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default Header;
