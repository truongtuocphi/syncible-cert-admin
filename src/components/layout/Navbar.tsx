'use client';

import { Link,useRouter } from '@/i18n/routing';

import { useTranslations, useLocale } from 'next-intl';

import { useEffect } from 'react';

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import ArrowRightIcon from '@/assets/icons/arrow-badge-right.svg';
import { Button } from '@/components/ui/button';
import { montserrat } from '@/components/ui/fonts';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import SyncibleLogo from '/public/syncible-logo.svg';
import LocaleSwitcher from '../common/switcher/LocaleSwitcher';

gsap.registerPlugin(ScrollToPlugin);

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
  const t = useTranslations('HomePage.navigation.top_nav');
  const router = useRouter();
  const locale = useLocale();
  // const keys = ['about', 'blogs', 'explorer'] as const;

  const links = [
    { label: t('links.about.label'), href: t('links.about.href') },
    { label: t('links.blogs.label'), href: t('links.blogs.href') },
    { label: t('links.explorer.label'), href: t('links.explorer.href') },
  ];

  useEffect(() => {
    const handleNavClick = async (e: any, target: string) => {
      const currentPath = window.location.pathname;
      if (target.startsWith('#')) {
        if (currentPath === `/${locale}`) {
          e.preventDefault();
          scrollToTarget(target);
        } else {
          router.push(`/${locale}`);
          setTimeout(() => {
            scrollToTarget(target);
          }, 500);
        }
      } else {
        // If the target is not a hash, navigate directly
        router.push(target);
      }
      // const element = document.querySelector(target);
      // if (element) {
      //   element.scrollIntoView({
      //     behavior: 'smooth',
      //     block: 'start',
      //   });
      // }
    };

    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const target = link.getAttribute('href');
        if (target && target.startsWith('#')) {
          handleNavClick(e, target);
        }
      });
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', (e) => {
          const target = link.getAttribute('href');
          if (target && target.startsWith('#')) {
            handleNavClick(e, target);
          }
        });
      });
    };
  }, []);

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
                      {links.map(({ label, href }) => (
                        <div key={label} className="py-4 ">
                          <SheetClose asChild>
                            <Link href={href} className="nav-link *:text-base">
                              {label}
                            </Link>
                          </SheetClose>
                        </div>
                      ))}
                    </div>
                    <Link href={t('buttons.access.href')} target={'_blank'}>
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
            <div className="hidden items-center gap-2 md:gap-4 lg:block">
              <nav className="mx-5 text-base font-semibold text-[#A2A3A9]">
                <ul className="flex items-center gap-5 md:gap-7 lg:gap-9">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="nav-link hover:text-[#2C2C2C] active:text-[#2C2C2C]"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="hidden lg:block">
              <div className="flex items-center gap-3">
                <LocaleSwitcher />
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
  );
};

export default Navbar;
