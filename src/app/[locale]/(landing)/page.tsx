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

import BannerCertificate from '../../../../public/cert_example.png';
import EthereumLogoSVG from '../../../../public/ethereum-logo.svg';
import PolygonLogoSVG from '../../../../public/polygon-logo.svg';


const Page = () => {
  const t = useTranslations('HomePage.title_section');
  return (
    <>
      {/* <div className="relative min-h-screen overflow-hidden">       
        <Navbar /> */}
      <div
        className={`${montserrat.className} relative z-20 flex flex-col items-center gap-10 overflow-hidden`}
      >
        <div className="w-full max-w-[90rem]">
          <div className="flex flex-col justify-center px-4 pb-4 sm:min-h-dvh md:px-8 md:pb-10 xl:px-32">
            <div className="mt-24 flex h-full w-full flex-col justify-center md:mt-[8.25rem] lg:mt-40 lg:flex-row xl:mt-44">
              <div className="flex items-center justify-center lg:basis-1/2">
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
                    <Link href={t('contact_button.href')}>
                      {/* <Button className="w-full rounded-[1.25rem] bg-primary-50 px-10 py-7 text-base shadow-combinedShadow1 hover:bg-primary-40">
                        Contact us
                      </Button> */}
                      <Button
                        className={`
                          relative z-0 flex w-full items-center gap-2 overflow-hidden rounded-[1.25rem] bg-primary-50
                          px-10 py-7 text-base font-semibold
                          uppercase transition-all duration-500
        
                          before:absolute before:inset-0
                          before:-z-10 before:translate-x-[150%]
                          before:translate-y-[150%] before:scale-[2.5]
                          before:rounded-[100%] before:bg-primary-40
                          before:transition-transform before:duration-1000
                          before:content-[""]

                          hover:scale-105
                          hover:before:translate-x-[0%]
                          hover:before:translate-y-[0%]
                          active:scale-95`}
                      >
                        <span>{t('contact_button.label')}</span>
                      </Button>
                    </Link>
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
          <SectionAbout />
          <SectionWhatWeBelieve />
          <SectionOurVision />
          <SectionFAQ />
        </div>
        <SectionBlogs />
        {/* <div className="relative w-full">
            <Footer />
          </div> */}
      </div>
      {/* <div className="-z-20 absolute inset-0 flex w-full flex-col items-center overflow-hidden bg-brand-10">
          <div className="relative mx-auto min-h-full w-full max-w-[90rem]">
            <div className="absolute -left-[170%] -top-[15%] w-[125rem] sm:-top-[5%] sm:left-[-40%] sm:w-[150%]">
              <LightBlueGradientEllipse className="h-full w-full" />
            </div>
            <div className=" absolute -right-[130%] top-1/2  w-[125rem] -translate-y-[50%] sm:-right-1/2 sm:w-[150%] sm:-translate-y-[70%]">
              <LightBlueGradientEllipse className="h-full w-full" />
            </div>
            <div className="absolute -bottom-[10%] -left-[150%]  w-[125rem] sm:-bottom-1/2 sm:-left-1/2 sm:w-[150%] sm:-translate-y-[150%]">
              <LightBlueGradientEllipse className="h-full w-full" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 overflow-hidden">
          <div className="hidden sm:block">
            <Image
              src={Background}
              fill
              alt="The background image with star-like shapes and a single curvy line that extends to the bottom of the image"
              className="z-10 h-auto w-full object-cover object-top"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="block sm:hidden">
            <Image
              src={BackgroundSmall}
              fill
              alt="The background image with star-like shapes and a single curvy line that extends to the bottom of the image"
              className="z-0 h-auto w-full object-cover object-top"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div> */}
    </>
  );
};

export default Page;
