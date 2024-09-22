'use client';
import clsx from 'clsx';
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

import Navbar from '@/components/layout/Navbar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { montserrat } from '@/components/ui/fonts';
import { ChevronDown } from 'lucide-react';

import SyncibleBanner from '/public/SyncibleBanner.svg';

import { Link, usePathname } from '@/i18n/routing';

import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Blogs() {
  const t = useTranslations('BlogPage');
  const keys = ['link_1', 'link_2', 'link_3', 'link_4', 'link_5'] as const;
  const pathname = usePathname();
  const locale = useLocale();
  const [toggleBlogNav, setToggleBlogNav] = useState(false);
  const [Content, setContent] = useState<any>(null);

  function CustomH2({ children }: { children: React.ReactNode }) {
    return <div className="text-2xl font-bold pb-4">{children}</div>;
  }

  function CustomP({ children }: { children: React.ReactNode }) {
    return <div className="text-lg text-[#6C6D71] pb-4">{children}</div>;
  };
  const overrideComponents = {
    h2: CustomH2,
    p: CustomP,
  };

  useEffect(() => {
    const loadContent = async () => {
      try {
        const ContentModule = (await import(`./${locale}.mdx`)).default;
        setContent(() => ContentModule);
      } catch (error) {
        notFound();
      }
    };

    loadContent();
  }, [locale]);

  const handleToggleBlogNav = () => {
    setToggleBlogNav(!toggleBlogNav);
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 z-30 w-screen md:mt-6">
        <Navbar />
      </div>
      <div
        className={`${montserrat.className}  z-20 flex flex-col items-center gap-10 overflow-hidden`}
      >
        <div className="mt-24 flex h-full w-full justify-center md:mt-[8.25rem] lg:mt-40 xl:mt-44">
          <div className="flex flex-col px-4 pb-4 md:px-8 md:pb-10 xl:px-32">
            <div className="flex flex-col items-center gap-10">
              <div className="text-center text-2xl font-bold md:text-3xl lg:text-5xl">
                What is a Syncible Certificate and Syncible Qualified Batch?
              </div>
              <div className="w-full">
                <SyncibleBanner className="aspect-[24/9] h-full w-full" />
              </div>
            </div>
            <div className="relative flex flex-col gap-8 md:flex-row ">
              <div className="w-full overflow-hidden rounded-xl bg-white/50 text-[#A2A3A9] md:hidden">
                <Button
                  className={clsx(
                    'flex w-full justify-between rounded-lg bg-white/50 px-4 py-2 text-left text-[#2C2C2C] hover:bg-white/50 hover:text-[#2C2C2C]',
                    { 'rounded-b-none border-b': toggleBlogNav }
                  )}
                  onClick={handleToggleBlogNav}
                >
                  On this BlogPage
                  <div
                    className={clsx('transition-transform', {
                      'rotate-180 duration-300': toggleBlogNav,
                    })}
                  >
                    <ChevronDown />
                  </div>
                </Button>
                <div className={clsx('flex flex-col gap-2 px-4 py-2', { hidden: !toggleBlogNav })}>
                  {keys.map((key) => (
                    <Link
                      key={key}
                      href={t(`navigation.${key}.href`)}
                      className={clsx(
                        'hover:text-[#2C2C2C]',
                        pathname === t(`navigation.${key}.href`) && 'text-[#2C2C2C]'
                      )}
                    >
                      {t(`navigation.${key}.label`)}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="sticky top-24 hidden basis-1/4 md:block">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div>
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="/SmugFace.png" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="text-lg font-bold">Ryan</div>
                        <div className="text-base font-medium text-[#A2A3A9]">Member</div>
                      </div>
                    </div>
                    <div className="w-[70%] border-t-[1px]"></div>
                    <div className="flex flex-col gap-2">
                      <div className="text-base font-medium text-[#A2A3A9]">Date created:</div>
                      <div className="text-lg font-medium">September 4, 2024</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-base font-medium text-[#A2A3A9]">Read Time:</div>
                      <div className="text-lg font-medium">8 minutes</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-lg font-bold text-[#A2A3A9]">
                    {keys.map((key) => (
                      <Link
                        key={key}
                        href={t(`navigation.${key}.href`)}
                        className={clsx(
                          'hover:text-[#2C2C2C]',
                          pathname === t(`navigation.${key}.href`) && 'text-[#2C2C2C]'
                        )}
                      >
                        {t(`navigation.${key}.label`)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="basis-3/4">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-6 md:hidden">
                    <div className="flex items-center gap-4">
                      <div>
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="/SmugFace.png" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="text-lg font-bold">Ryan</div>
                        <div className="text-base font-medium text-[#A2A3A9]">Member</div>
                      </div>
                    </div>
                    <div className="w-full border-t-[1px]"></div>
                    <div className="flex gap-4 ">
                      <div className="flex w-full flex-col gap-2">
                        <div className="text-base font-medium text-[#A2A3A9]">Date created:</div>
                        <div className="text-lg font-medium">September 4, 2024</div>
                      </div>
                      <div className="flex w-full flex-col gap-2">
                        <div className="text-base font-medium text-[#A2A3A9]">Read Time:</div>
                        <div className="text-lg font-medium">8 minutes</div>
                      </div>
                    </div>
                  </div>
                  <div>{Content && <Content components={overrideComponents} />}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
