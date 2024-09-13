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

import BannerCertificate from '../../public/cert_example_ENG.png';

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
      <div className="relative z-20 mt-5 flex flex-col items-center gap-10 overflow-hidden md:mt-20">
        <div
          className={`${montserrat.className} mt-32 grid max-w-[90rem] grid-rows-2 items-center px-4 lg:grid-cols-2 lg:gap-6 xl:px-[6.5rem] 2xl:items-start`}
        >
          <div className="col-span-1 flex flex-col items-start gap-6 px-4">
            <h1 className="text-5xl font-bold text-[#2C2C2C]">
              Empower your institution and enrich student success
            </h1>
            <p className="mt-6 text-lg text-gray-500">
              Using blockchain technology and NFTs, Syncible enhance your institution’s reputation
              and revolutionizes the way academic achievements are recognized.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button className="w-full rounded-[1.25rem] bg-primary-50 px-10 py-7 text-base shadow-combinedShadow1 hover:bg-primary-40">
                  Contact us
                </Button>
              </Link>
            </div>
          </div>

          <div className="col-span-1 h-full w-full px-4">
            <Image
              src={BannerCertificate}
              alt="BannerCertificate"
              className="h-full w-full object-scale-down"
            />
          </div>

          <div className="flex flex-col gap-8 px-4 pb-10">
            <div className="text-md font-bold md:text-2xl lg:text-4xl">Powered By</div>
            <div className="flex gap-10 lg:gap-20">
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
          <div className="absolute -right-1/2 top-1/2 -z-10 h-[115rem] w-[115rem] -translate-y-[30%]">
            <LightBlueGradientEllipse className="h-full w-full" />
          </div>
          <div className="absolute -bottom-1/2 -left-1/2 -z-10 h-[100rem] w-[100rem] -translate-y-[140%]">
            <LightBlueGradientEllipse className="h-full w-full" />
          </div>
          <Image
            src={Background}
            alt="The background image with star-like shapes a a single curvy line that extend to the botton of the image"
            className="z-20 h-full object-contain object-top sm:w-full sm:object-cover"
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
