'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useTranslations, useLocale } from 'next-intl';
import ArrowRightIcon from '@/assets/icons/arrow-badge-right.svg';
import { Button } from '@/components/ui/button';
import { montserrat } from '@/components/ui/fonts';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Link, usePathname, useRouter } from '@/i18n/routing';

import SyncibleLogo from '/public/syncible-logo.svg';
import { LocaleCollapsible, LocaleSelect } from '../common/switcher/LocaleSwitcher';

const scrollToTarget = (target: string) => {
  gsap.to(window, {
    duration: 1.5,
    scrollTo: {
      y: target,
      autoKill: true, // Automatically stops if the user interacts
    },
    ease: 'power3.inOut',
  });
};

const Navbar = () => {
  gsap.registerPlugin(ScrollToPlugin);
  const t = useTranslations('HomePage.navigation.top_nav');
  const router = useRouter();
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);

  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth < 768) {
        const currentScrollY = window.scrollY;
        // Show the navbar when scrolling up, hide it when scrolling down
        if (currentScrollY > lastScrollY) {
          setIsNavbarVisible(false); // Scrolling down
        } else {
          setIsNavbarVisible(true); // Scrolling up
        }
        setLastScrollY(currentScrollY);
      } else {
        setIsNavbarVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const links = [
    { label: t('links.about.label'), href: t('links.about.href') },
    { label: t('links.blogs.label'), href: t('links.blogs.href') },
    { label: t('links.explorer.label'), href: t('links.explorer.href') },
  ];
  const currentPath = usePathname();
  const handleNavClick = async (e: any, target: string) => {
    e.preventDefault();
    if (target.startsWith('#')) {
      if (currentPath === '/') {
        scrollToTarget(target);
        setIsOpen(false);
      } else {
        router.push(`/`);
        setIsOpen(false);
        setTimeout(() => {
          scrollToTarget(target);
        }, 500);
      }
    } else {
      router.push(target);
      setIsOpen(false);
    }
  };

  return (
    <div
      className={clsx(
        'fixed top-0 z-30 w-screen transition-transform duration-300 ease-in-out md:mt-6',
        {
          'translate-y-0': isNavbarVisible,
          '-translate-y-full': !isNavbarVisible,
        }
      )}
    >
      <div className={`${montserrat.className} relative w-full`}>
        <div className="flex flex-col items-center">
          <div className="w-full md:px-8 xl:px-[6.5rem]">
            <div className="grid w-full grid-cols-12 items-center justify-items-center bg-white/50 p-4  backdrop-blur-[50px] md:rounded-3xl">
              <div className="col-span-6 justify-self-start md:col-span-4">
                <Link href="/" className="">
                  <div className="h-8 w-28 md:h-10 md:w-40">
                    <SyncibleLogo className="h-full w-full" />
                  </div>
                </Link>
              </div>
              <div className="col-span-6 col-end-13 block justify-self-end lg:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild className="text-black">
                    <Button className="border-none bg-transparent px-0 text-2xl hover:bg-transparent hover:text-white active:bg-none">
                      &#9776;
                    </Button>
                  </SheetTrigger>

                  <SheetContent
                    side="top"
                    className="h-full p-4 text-black"
                    aria-describedby="Navigation modal for Syncible landing page"
                  >
                    <SheetTitle className="pb-4">
                      <Link href="/" className="">
                        <div className="h-8 w-28 md:h-10 md:w-40">
                          <SyncibleLogo className="h-full w-full" />
                        </div>
                      </Link>
                    </SheetTitle>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col px-2 font-semibold text-[#A2A3A9]">
                        {links.map(({ label, href }) => (
                          <div key={label}>
                            {/* <SheetClose asChild> */}
                            <Link
                              href={href}
                              className={clsx(
                                'nav-link w-full text-base hover:text-[#2C2C2C]',
                                currentPath === href && 'text-[#2C2C2C]'
                              )}
                              onClick={(e) => handleNavClick(e, href)}
                            >
                              <div className="py-4"> {label}</div>
                            </Link>
                            {/* </SheetClose> */}
                          </div>
                        ))}
                        <div className="py-2">
                          <LocaleCollapsible />
                        </div>
                      </div>
                      <Link href={t('buttons.access.href')} target={'_blank'} className="z-0">
                        <Button className="group flex w-full items-center rounded-[1.25rem] bg-primary-50 px-10 py-6 shadow-combinedShadow1 transition-all hover:bg-primary-40">
                          <span className="relative inline-block text-base font-semibold">
                            {t('buttons.access.label')}
                          </span>
                          <ArrowRightIcon className="h-6 w-6 pl-1 duration-300 ease-in-out group-hover:-rotate-180" />
                        </Button>
                      </Link>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <div className="col-auto hidden items-center gap-2 md:col-span-4 md:gap-4 lg:block">
                <nav className="mx-5 text-base font-semibold text-[#A2A3A9]">
                  <ul className="flex items-center gap-5 whitespace-nowrap md:gap-7 lg:gap-9">
                    {links.map(({ label, href }) => (
                      <li key={label}>
                        <Link
                          href={href}
                          className={clsx(
                            'nav-link hover:text-[#2C2C2C] hover:underline',
                            currentPath === href && 'text-[#2C2C2C]'
                          )}
                          onClick={(e) => handleNavClick(e, href)}
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="col-auto hidden justify-self-end md:col-span-4 lg:block">
                <div className="flex items-center gap-3">
                  <LocaleSelect routerURL="/admin" />
                  <Link href={t('buttons.access.href')} target={'_blank'} className="h-fit">
                    <Button className="group flex w-[10rem] items-center rounded-[1.25rem] bg-primary-50 px-10 py-6 shadow-combinedShadow1 transition-all duration-500 hover:bg-primary-40">
                      <span className="relative inline-block text-base font-semibold transition-all duration-500 group-hover:pr-[25px]">
                        {t('buttons.access.label')}
                        <ArrowRightIcon className="absolute right-[-20px] top-0 h-6 w-6 pl-1 opacity-0 transition-all duration-500 group-hover:right-0 group-hover:opacity-100" />
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
