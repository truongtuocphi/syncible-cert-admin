'use client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import Navbar from '@/components/layout/Navbar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { montserrat } from '@/components/ui/fonts';


import SyncibleBanner from '/public/SyncibleBanner.svg';

import { Link, usePathname } from '@/i18n/routing';
import Blog from '@/markdown/blog.mdx';

export default function Blogs() {
  const t = useTranslations('BlogPage');
  const keys = ['link_1', 'link_2', 'link_3', 'link_4', 'link_5'] as const;
  const pathname = usePathname();
//   console.log(pathname);
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
            <div className="grid grid-cols-12">
              <div className="sticky top-24 col-span-3">
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
              <div className="col-span-9">
                <div className=""></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
