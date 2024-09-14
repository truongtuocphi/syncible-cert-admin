'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import SectionAbout from '@/components/pages/Home/SectionAbout';
import SectionNews from '@/components/pages/Home/SectionNews';
import SectionOurVision from '@/components/pages/Home/SectionOurVision';
import SectionWhatWeBelieve from '@/components/pages/Home/SectionWhatWeBelieve';
import { Button } from '@/components/ui/button';
import { montserrat } from '@/components/ui/fonts';

import BannerCertificate from '../../public/cert_example.png';

import Background from '../../public/DoraBG.png';
import LightBlueGradientEllipse from '../../public/Ellipse_1.svg';
import EthereumLogoSVG from '../../public/ethereum-logo.svg';
import PolygonLogoSVG from '../../public/polygon-logo.svg';

const Page = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed top-0 z-30 w-full md:mt-6">
        <Navbar />
      </div>
      <div className="relative z-20 flex flex-col items-center gap-10 overflow-hidden">
        <div
          className={`${montserrat.className} mt-40 w-full max-w-[90rem] px-4 md:px-8 md:py-8 lg:mt-52 xl:px-[6.5rem] xl:py-16`}
        >
          <div className="grid items-center justify-between gap-2 lg:grid-cols-2">
            <div className="flex items-center justify-center lg:basis-1/2">
              <div className="flex h-[20rem] animate-swipe-up-fadein flex-col items-center justify-center gap-8 antialiased lg:h-[30rem] lg:items-start">
                <div className="text-md w-full text-wrap text-left text-[2.5rem] font-bold leading-none sm:text-center lg:text-left lg:text-5xl lg:leading-[4rem]">
                  Empower your institution and enrich student success
                </div>
                <div className="w-full text-left text-[#6C6D71] sm:w-[70%] sm:text-center sm:text-lg md:text-base lg:w-full lg:text-left">
                  Using blockchain technology and NFTs, Syncible enhances your institution’s
                  reputation and revolutionizes the way academic achievements are recognized.
                </div>
                <div className="w-full self-center sm:w-fit lg:self-start">
                  <Link href="/contact">
                    <Button className="w-full rounded-[1.25rem] bg-primary-50 px-10 py-7 text-base shadow-combinedShadow1 hover:bg-primary-40">
                      Contact us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-6 flex w-full items-center justify-center md:mt-0">
              <Image
                src={BannerCertificate}
                alt="banner"
                className="h-auto max-w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-8 pb-10 md:mt-40">
            <div className="text-md font-bold md:text-2xl lg:text-4xl">Powered By</div>
            <div className="flex gap-20">
              <div className="h-11 w-44">
                <EthereumLogoSVG className="h-full w-full" />
              </div>
              <div className="h-11 w-44">
                <PolygonLogoSVG className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 flex max-w-[90rem] flex-col items-center gap-8 sm:gap-40">
          <SectionAbout />
          <SectionWhatWeBelieve />
          <SectionOurVision />
        </div>
        <SectionNews />
        <div className="font-inter relative w-full text-black">
          <Footer />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 flex w-full flex-col items-center overflow-hidden">
        <div className="relative mx-auto h-full w-full max-w-[90rem]">
          <div className="absolute -left-[170%] -top-[15%] -z-10 h-[125rem] w-[125rem] sm:-top-[15%] sm:left-[-40%]">
            <LightBlueGradientEllipse className="h-full w-full" />
          </div>
          <div className="absolute -right-[130%] top-1/2 -z-10 h-[115rem] w-[115rem] -translate-y-[70%] sm:-right-1/2 sm:-translate-y-[40%]">
            <LightBlueGradientEllipse className="h-full w-full" />
          </div>
          <div className="absolute -bottom-[10%] -left-[150%] -z-10 h-[125rem] w-[125rem] sm:-bottom-1/2 sm:-left-1/2 sm:-translate-y-[95%]">
            <LightBlueGradientEllipse className="h-full w-full" />
          </div>
          <Image
            src={Background}
            alt="The background image with star-like shapes a a single curvy line that extend to the botton of the image"
            className="z-20 h-full w-full object-cover object-top"
            fill
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
