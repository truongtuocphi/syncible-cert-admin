'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import SyncibleLogo from '/public/syncible-logo.svg';

const Menu = [
  { title: 'Giới thiệu', link: '#about' },
  { title: 'Tin tức', link: '#news' },
  { title: 'Tìm kiếm', link: '/explorer' },
];

const Navbar = () => {
  return (
    <div className="flex flex-col items-center px-6 md:px-8 xl:px-24">
      <div className="flex h-full w-full max-w-[90rem] items-center justify-between rounded-3xl bg-white/50 px-6 py-4">
        <div className="block lg:hidden">
          <Sheet>
            <SheetTrigger asChild className="text-black">
              <Button className="border-none bg-transparent px-0 text-2xl hover:bg-transparent hover:text-white active:bg-none">
                &#9776;
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="text-black">
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
          <Button className="h-[3rem] w-[8.25rem] rounded-[1.25rem] bg-primary-50 text-base shadow-combinedShadow1">
            Truy cập
          </Button>
        </Link>
      </div>
      
    </div>
  );
};

export default Navbar;
