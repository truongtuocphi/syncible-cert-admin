'use client';

import React from 'react';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import SectionAbout from '@/components/pages/Home/SectionAbout';
import SectionOurVision from '@/components/pages/Home/SectionOurVision';
import SectionWhatWeBelieve from '@/components/pages/Home/SectionWhatWeBelieve';
import SectionFAQ from '@/components/pages/Home/SectionFAQ';
import SectionBlogs from '@/components/pages/Home/SectionBlogs';

import { Button } from '@/components/ui/button';
import { montserrat } from '@/components/ui/fonts';
import { Link } from '@/i18n/routing';
import ContactButton from '@/components/pages/Home/Contact/button';

import BannerCertificate from '../../../../public/cert_example.png';
import EthereumLogoSVG from '../../../../public/ethereum-logo.svg';
import PolygonLogoSVG from '../../../../public/polygon-logo.svg';


const Page = () => {
  const t = useTranslations('HomePage.title_section');
  return (
    <>
      <div
        className={`${montserrat.className} relative z-20 flex flex-col items-center gap-10 overflow-hidden`}
      >
        <div className="w-full max-w-[90rem]">
        {/* <div className="w-full"> */}
          <div className="flex flex-col justify-center px-4 pb-4 sm:min-h-dvh md:px-8 md:pb-10 xl:px-32">
            <div className="flex h-full w-full flex-col justify-center mt-24 md:mt-[8.25rem] lg:flex-row">
              <div className="flex items-center justify-center lg:basis-1/2 lg:pr-6">
                <div className="flex min-h-[20rem] animate-swipe-up-fadein flex-col items-center justify-center gap-6 antialiased sm:gap-8 lg:h-[30rem] lg:items-start">
                  <div
                    className={`text-md col-span-1 w-full text-wrap text-left text-[2.5rem] font-bold leading-none sm:text-center lg:text-left lg:text-5xl lg:leading-[4rem]`}
                  >
                    {t('label_1')}
                  </div>
                  <div className="w-full text-left text-[#6C6D71] sm:w-[70%] sm:text-center sm:text-lg md:text-base lg:w-full lg:text-left">
                    {t('label_2')}
                  </div>
                  <div className="w-full self-center sm:w-auto lg:self-start">
                    
                    <ContactButton label={t('contact_button.label')}/>
                  </div>
                </div>
              </div>
              <div className="relative h-fit w-full animate-swipe-up-fadein self-center lg:basis-1/2">
                <div className="absolute left-1/2 top-1/2 hidden h-full w-full -translate-x-1/2 -translate-y-1/2 scale-50 sm:scale-90 md:block md:scale-75 lg:scale-110">
                  <Image
                    src={BannerCertificate}
                    alt="Certificate"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                    className="block h-full w-full object-contain"
                  />
                </div>
                <div className="block md:invisible">
                  <Image
                    src={BannerCertificate}
                    alt="Certificate placeholder"
                    className="min-h-[30rem] w-full object-contain md:min-h-full"
                    priority
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 md:py-10">
              <div className="text-md font-bold">{t('label_3')}</div>
              <div className="flex gap-14">
                <div className="h-9 w-[7rem]">
                  <EthereumLogoSVG className="h-full w-full" />
                </div>
                <div className="h-9 w-[7rem]">
                  <PolygonLogoSVG className="h-full w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 flex max-w-[90rem] flex-col items-center gap-8 sm:gap-40">
        {/* <div className="relative z-20 flex flex-col items-center gap-8 sm:gap-40"> */}
          <SectionAbout />
          <SectionWhatWeBelieve />
          <SectionOurVision />
          <SectionFAQ />
        </div>
        <SectionBlogs />
      </div>
    </>
  );
};

export default Page;
