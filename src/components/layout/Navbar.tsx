'use client';

import Link from 'next/link';

import ButtonPrimary from '@/components/common/button/ButtonPrimary';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Menu = [
  { title: 'About Us', link: '#about' },
  { title: 'Tutorial', link: '/tutorial' },
  { title: 'Explorer', link: '/explorer' },
  { title: 'Pricing', link: '/pricing' },
  { title: 'Blog', link: '/blog' },
];

const Navbar = () => {
  return (
    <div className="h-28">
      <div className="flex h-full w-full items-center justify-between px-6 md:px-8 xl:px-24">
        <div className="block lg:hidden">
          <Sheet>
            <SheetTrigger asChild className="text-white">
              <Button
                variant="outline"
                className="border-none bg-transparent px-0 text-2xl hover:bg-transparent hover:text-white active:bg-none"
              >
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
          <div className="h-10 w-32 text-4xl">Syncible</div>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <nav className="mx-5 hidden lg:block ">
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
          <Link href={'/login'} target={'_blank'}>
            <ButtonPrimary>Experience</ButtonPrimary>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
