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
import Background from '../../public/DoraBG.png';


const Page = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed top-0 z-30 mt-5 w-full">
        <Navbar />
      </div>
      <div className="relative z-20 flex flex-col items-center gap-10 pt-24">
        <div className="max-w-[90rem] px-6 py-6 md:px-8 md:py-0 lg:pt-20 xl:px-[6.5rem]">
          <div className="relative flex w-full flex-col items-stretch px-6 md:flex-row ">
            <div className="basis-1/2">
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
            <div className="relative w-full basis-1/2 self-center">
              {/* <div className="h-[20rem] w-full"></div>
            <div className="absolute left-0 top-0 h-full w-full md:left-1/2 md:-translate-x-[50%] lg:w-[120%] xl:w-[138%]">
              <Image
                src={BannerCertificate}
                alt="Certificate"
                className="aspect-[3/2] w-full object-contain"
              />
            </div> */}
              <Image
                src={BannerCertificate}
                alt="Certificate"
                className="aspect-[3/2] w-full object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </div>
        </div>

        <div className="relative flex max-w-[90rem] flex-col items-center gap-40">
          <SectionAbout />
          <SectionWhatWeBelieve />
          <SectionOurVision />
        </div>
        <SectionNews />
        <div className="font-inter relative w-full text-black">
          <Footer />
        </div>
      </div>
      <div className="absolute top-0 flex w-full justify-center">
        {/* <Background className="h-[5056px] w-full object-cover" /> */}
        <></>
        {/* <Image
          src={Background}
          alt="The background image with star-like shapes a a single curvy line that extend to the botton of the image
          "
          className="h-[5080px] w-full object-contain"
          fill
          sizes="100vw"
          priority
        ></Image> */}
      </div>
    </div>
  );
};

export default Page;

