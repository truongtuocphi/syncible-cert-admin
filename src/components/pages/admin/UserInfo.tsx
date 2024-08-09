'use client';

import React, { useState, useEffect, useRef } from 'react';

import { signOut } from 'firebase/auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FaUser } from 'react-icons/fa';
import { FaChevronDown } from 'react-icons/fa';

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
        <Button className="h-fit w-fit rounded-xl border-none p-0 text-left outline-none focus-visible:ring-0">
          <div className="relative flex cursor-pointer items-center space-x-2 rounded-lg border-[0.5px] border-gray-200 bg-gray-50 p-2 hover:bg-gray-100">
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

            <FaChevronDown className="text-gray-500" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Billing</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Support</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={handleSignOut}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserInfo;
