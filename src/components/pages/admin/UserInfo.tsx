'use client';

import React from 'react';

import { signOut } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CgProfile } from 'react-icons/cg';
import { FaRegMoneyBillAlt, FaUser } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineContactSupport } from 'react-icons/md';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { auth } from '@/lib/firebase';

interface UserInfoProps {
  user: any;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error signing out: ', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-fit w-fit rounded-full border-none bg-transparent p-0 text-left outline-none focus-visible:ring-0">
          <div className="flex cursor-pointer items-center space-x-4 rounded-3xl bg-white py-2 pl-2 pr-4">
            <div className="flex items-center gap-2">
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  alt={user.displayName || 'User Photo'}
                  className="h-10 w-10 transform cursor-pointer rounded-full transition-transform hover:scale-105"
                  width={40}
                  height={40}
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                  <FaUser className="h-6 w-6 text-gray-500" />
                </div>
              )}
              <div>
                <div className="font-bold text-gray-600">{user.displayName || 'Anonymous'}</div>
                <div className="text-sm font-semibold text-gray-500">{user.email}</div>
              </div>
            </div>
            <FaChevronDown className="text-gray-500" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>Tài khoản của tôi</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">
            <CgProfile className="mr-2" />
            Hồ sơ
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <FaRegMoneyBillAlt className="mr-2" />
            Thanh toán
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            <IoSettingsOutline className="mr-2" />
            Cài đặt
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <MdOutlineContactSupport className="mr-2" />
          Hỗ trợ
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          <FiLogOut className="mr-2" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserInfo;
