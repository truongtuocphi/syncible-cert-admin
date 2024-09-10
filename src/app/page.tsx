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
import { playfair } from '@/components/ui/fonts';

import BannerCertificate from '../../public/cert_example.png';
import BannerCert from '../../public/cert-full.webp'
import Background from '../../public/DoraBG.png';
import LightBlueGrdientEllipse from '../../public/Ellipse_1.svg';

const Page = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed top-0 z-30 mt-6 w-full">
        <Navbar />
      </div>
      <div className="relative z-20 flex flex-col items-center gap-10 pt-24">
        <div className="max-w-[90rem] px-6 py-6 md:px-8 md:py-0 xl:px-[6.5rem] xl:py-10">
          <div className="relative flex h-full w-full flex-col items-stretch px-6 md:flex-row ">
            <div className="h-full basis-1/2">
              <div className="flex h-[20rem] flex-col items-center justify-center gap-8 antialiased md:h-[30rem] md:items-start lg:h-[35rem]">
                <div
                  className={`${playfair.className} text-md col-span-1 w-full text-wrap text-center font-bold sm:text-xl  md:text-left lg:text-3xl xl:text-5xl xl:leading-[4rem]`}
                >
                  Nền tảng tiên phong trong việc chuyển đổi cách công
                  <br className="hidden md:block lg:hidden xl:block" />
                  <span className="inline md:hidden lg:inline xl:hidden">&nbsp;</span>nhận thành tựu
                  học thuật qua chứng chỉ số hóa.
                </div>
                <div className="self-center md:self-start">
                  <Link href="/contact">
                    <Button className="shadow- rounded-[1.25rem] bg-primary-50 px-10 py-7 text-base shadow-combinedShadow1 hover:bg-primary-40">
                      Liên hệ với chúng tôi
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative h-full basis-1/2 self-center">
              {/* <div className="relative">
                <div className="absolute left-0 top-0 h-[110%] ">
                  <Image
                    src={BannerCertificate}
                    alt="Certificate"
                    className=" h-full w-full object-contain"
                  />
                </div>
              </div>             */}
              <div className="absolute left-auto top-auto h-full w-full lg:left-[-19%] lg:top-[-19%] xl:left-[-27%] xl:top-[-30%] lg:h-[130%] lg:w-[130%] xl:h-[160%] xl:w-[160%]">
                <Image
                  src={BannerCert}
                  alt="Certificate"
                  className="block h-full w-full object-contain"
                />
              </div>
              <div className="block">
                <Image
                  src={BannerCertificate}
                  alt="Certificate"
                  className="invisible w-full min-h-[30rem] md:min-h-full object-cover"
                  
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 flex max-w-[90rem] flex-col items-center gap-40">
          <SectionAbout />
          <SectionWhatWeBelieve />
          <SectionOurVision />
        </div>
        <SectionNews />
        <div className="font-inter relative w-full text-black">
          <Footer />
        </div>
      </div>
      <div className="absolute top-0 flex w-full flex-col items-center">
        <div className="relative h-full w-full max-w-[90rem]">
          <div className="absolute -left-[37%] -top-[15%] -z-10">
            {/* <div className="blur-250px aspect-square h-[2000px] bg-custom-radial-gradient"/> */}
            <LightBlueGrdientEllipse className="aspect-square h-[2250px] w-full" />
          </div>
          <div className="absolute -right-[50%] top-1/2 -z-10 -translate-y-1/2">
            {/* <div className="blur-250px aspect-square h-[1850px] bg-custom-radial-gradient"></div> */}
            <LightBlueGrdientEllipse className="aspect-square h-[2250px] w-full" />
          </div>
          <Image
            src={Background}
            alt="The background image with star-like shapes a a single curvy line that extend to the botton of the image"
            className="z-20 h-[5000px] w-full"
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
