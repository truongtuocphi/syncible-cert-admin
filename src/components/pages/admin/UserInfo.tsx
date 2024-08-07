'use client';

import React, { useState, useEffect, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import Link from 'next/link';

interface UserInfoProps {
  user: any;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Xử lý đăng xuất
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Đăng xuất người dùng
      router.push('/'); // Điều hướng về trang chính
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error signing out: ', error);
    }
  };

  // Đóng dropdown khi người dùng nhấp ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative flex cursor-pointer items-center space-x-2"
      onClick={() => setIsOpen(!isOpen)}
    >
      {user.photoURL && (
        <img
          src={user.photoURL}
          alt={user.displayName || 'User Photo'}
          className="h-10 w-10 transform cursor-pointer rounded-full transition-transform hover:scale-105" // Mở dropdown khi nhấp vào ảnh
        />
      )}
      <div>
        <div className="font-semibold text-gray-800">{user.displayName || 'Anonymous'}</div>
        <div className="text-sm text-gray-600">{user.email}</div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute left-0 mt-24 w-48 rounded-lg border border-gray-300 bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          ref={dropdownRef}
        >
          <Link
            href={'#'}
            onClick={handleSignOut}
            className="block w-full px-4 py-2 text-left text-black hover:bg-gray-200 focus:outline-none"
          >
            Sign Out
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
