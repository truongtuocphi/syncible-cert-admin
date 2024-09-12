'use client';

import Link from 'next/link';

import ArrowRightIcon from '@/assets/icons/arrow-badge-right.svg';
import { Button } from '@/components/ui/button';
import { montserrat } from '@/components/ui/fonts';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import SyncibleLogo from '/public/syncible-logo.svg';

const Menu = [
  { title: 'About us', link: '#about' },
  { title: 'Blog', link: '#news' },
  { title: 'Explorer', link: '/explorer' },
];

const Navbar = () => {
  return (
    <div className={`${montserrat.className} "relative w-full`}>
      <div className="flex flex-col items-center">
        <div className="w-full md:px-8 xl:px-[6.5rem]">
          <div className="flex w-full items-center justify-between rounded-3xl p-4 backdrop-blur-sm lg:bg-white/50">
            <Link href="/" className="">
              <div className="h-8 w-28 md:h-10 md:w-40">
                <SyncibleLogo className="h-full w-full" />
              </div>
            </Link>
            <div className="block lg:hidden">
              <Sheet>
                <SheetTrigger asChild className="text-black">
                  <Button className="border-none bg-transparent px-0 text-2xl hover:bg-transparent hover:text-white active:bg-none">
                    &#9776;
                  </Button>
                </SheetTrigger>

                <SheetContent side="top" className="h-full p-4 text-black">
                  <SheetTitle className="pb-4">
                    <Link href="/" className="">
                      <div className="h-8 w-28 md:h-10 md:w-40">
                        <SyncibleLogo className="h-full w-full" />
                      </div>
                    </Link>
                  </SheetTitle>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col px-4 py-4 font-semibold text-[#A2A3A9] hover:text-[#2C2C2C] active:text-[#2C2C2C]">
                      {Menu.map(({ title, link }) => (
                        <div key={title} className="py-4 ">
                          <SheetClose asChild>
                            <Link href={link} className="text-base">
                              {title}
                            </Link>
                          </SheetClose>
                        </div>
                      ))}
                    </div>
                    <Link href={'/login'} target={'_blank'}>
                      <Button className="group flex w-full items-center rounded-[1.25rem] bg-primary-50 px-10 py-6 shadow-combinedShadow1 transition-all hover:bg-primary-40">
                        <span className="relative inline-block text-base font-semibold">
                          Access
                        </span>
                        <ArrowRightIcon className="h-6 w-6 pl-1 duration-300 ease-in-out group-hover:-rotate-180" />
                      </Button>
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <div className="hidden items-center gap-2 md:gap-4 lg:block">
              <nav className="mx-5  text-base ">
                <ul className="flex items-center gap-5 md:gap-7 lg:gap-9">
                  {Menu.map(({ title, link }) => (
                    <li key={title}>
                      <Link
                        href={link}
                        className="text-base font-semibold text-[#A2A3A9] hover:text-[#2C2C2C] active:text-[#2C2C2C]"
                      >
                        {title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <Link href={'/login'} target={'_blank'} className="hidden h-fit lg:block">
              <Button className="group flex items-center rounded-[1.25rem] bg-primary-50 px-10 py-6 shadow-combinedShadow1 transition-all hover:bg-primary-40">
                <span className="relative inline-block text-base font-semibold">Access</span>
                <ArrowRightIcon className="h-6 w-6 pl-1 duration-300 ease-in-out group-hover:-rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
