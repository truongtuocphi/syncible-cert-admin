'use client';

import React, { useState } from 'react';

import { signOut } from 'firebase/auth';
import Image from 'next/image';
// import { useRouter } from 'next/navigation';
import { BiUser } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { BiGlobe } from 'react-icons/bi';
import { FaChevronDown } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { BiHelpCircle } from 'react-icons/bi';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { auth } from '@/lib/firebase';
import { routing, useRouter, usePathname, Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { BiCheck } from 'react-icons/bi';

interface UserInfoProps {
  user: any;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const href = window.location.href.split('/');
  const t = useTranslations('Localization');
  const locale = useLocale();
  const routerLang = useRouter();
  const pathname = usePathname();

  // const handleLanguageChange = async (value: 'en' | 'vi') => {
  //   routerLang.replace(pathname, { locale: value });
  // };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = '/';
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error signing out: ', error);
    }
  };

  console.log('href', href.includes('vi'));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-fit w-fit rounded-full border-none bg-transparent p-0 text-left focus-visible:ring-0">
          <div className="flex cursor-pointer items-center space-x-4 rounded-3xl bg-white py-2 pl-2 pr-4 focus:ring-primary-50 focus-visible:ring-2">
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
      <DropdownMenuContent className="mt-5 w-64 rounded-2xl border-none">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onMouseEnter={() => setIsLanguageOpen(false)}
            className="cursor-pointer py-3 text-base font-bold hover:rounded-2xl hover:bg-[#F5F5F5]"
          >
            <BiUser className="mr-4 text-2xl" />
            Hồ sơ
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer py-3 text-base font-bold hover:rounded-2xl hover:bg-[#F5F5F5]"
            onMouseEnter={() => setIsLanguageOpen(true)}
          >
            <BiGlobe className="mr-4 text-2xl" />
            <div className="flex w-full items-center justify-between">
              <p>Ngôn Ngữ</p>
              <p>VI</p>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            onMouseEnter={() => setIsLanguageOpen(false)}
            className="cursor-pointer py-3 text-base font-bold hover:rounded-2xl hover:bg-[#F5F5F5]"
          >
            <BiHelpCircle className="mr-4 text-2xl" />
            Hỗ trợ
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer py-3 text-base font-bold hover:rounded-2xl hover:bg-[#F5F5F5]"
          onClick={handleSignOut}
          onMouseEnter={() => setIsLanguageOpen(false)}
        >
          <BiLogOut className="mr-4 text-2xl" />
          Đăng xuất
        </DropdownMenuItem>
        {isLanguageOpen && (
          <div
            className="absolute right-full top-14 z-20 mt-2 w-72 rounded-2xl bg-white shadow-lg"
            onMouseEnter={() => setIsLanguageOpen(true)}
            onMouseLeave={() => setIsLanguageOpen(false)}
          >
            <div className="p-2">
              {routing.locales.map((loc) => (
                <Link href={`${pathname}`} locale={loc} key={loc}>
                  <DropdownMenuItem className="cursor-pointer py-3 text-base font-bold hover:rounded-xl hover:bg-[#F5F5F5]">
                    <div className="flex w-full items-center justify-between">
                      <div>{loc === 'vi' ? 'Vietnamese' : 'English'}</div>
                      <div>{href.includes(loc) ? <BiCheck className="text-2xl" /> : null}</div>
                    </div>
                  </DropdownMenuItem>
                </Link>
              ))}
            </div>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserInfo;
