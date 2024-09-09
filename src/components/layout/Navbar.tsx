'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { inter } from '@/components/ui/fonts';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import SyncibleLogo from '/public/syncible-logo.svg';
import ArrowRightIcon from '@/assets/icons/arrow-badge-right.svg';

const Menu = [
  { title: 'Giới thiệu', link: '#about' },
  { title: 'Tin tức', link: '#news' },
  { title: 'Tìm kiếm', link: '/explorer' },
];

const Navbar = () => {
  return (
    <div className="relative w-full">
      <div className="flex flex-col items-center">
        <div className="w-full max-w-[90rem] px-6 md:px-8 xl:px-[6.5rem]">
          <div className="flex w-full items-center justify-between rounded-3xl bg-white/50 px-6 py-4 backdrop-blur-sm">
            <div className="block lg:hidden">
              <Sheet>
                <SheetTrigger asChild className="text-black">
                  <Button className="border-none bg-transparent px-0 text-2xl hover:bg-transparent hover:text-white active:bg-none">
                    &#9776;
                  </Button>
                </SheetTrigger>

                <SheetContent side="left" className="text-black">
                  <SheetTitle></SheetTitle>
                  <nav className="mr-5 md:mr-10 lg:mr-20">
                    <ul className="flex flex-col items-center gap-5 md:gap-11 lg:gap-16 ">
                      {Menu.map(({ title, link }) => (
                        <li key={title}>
                          <Link href={link} className="text-base">
                            {title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            <Link href="/" className="hidden h-fit lg:block">
              <div className="h-10 w-40">
                <SyncibleLogo className="h-full w-full" />
              </div>
            </Link>
            <div className="flex items-center gap-2 md:gap-4">
              <nav className="mx-5 hidden text-base lg:block">
                <ul className="flex items-center gap-5 md:gap-7 lg:gap-9">
                  {Menu.map(({ title, link }) => (
                    <li key={title}>
                      <Link href={link} className="text-base">
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <Link href={'/login'} target={'_blank'}>
              <Button
                className={`${inter.className} rounded-[1.25rem] bg-primary-50 px-10 py-6 shadow-combinedShadow1 hover:bg-primary-40`}
              >
                <span className="text-base font-semibold">Truy cập</span>

                <ArrowRightIcon className="ml-1 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
