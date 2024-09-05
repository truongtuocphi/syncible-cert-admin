import React from 'react';

import Image from 'next/image';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import SectionAbout from '@/components/pages/Home/SectionAbout';
import SectionOurVision from '@/components/pages/Home/SectionOurVision';
import SectionWhatWeBelieve from '@/components/pages/Home/SectionWhatWeBelieve';
import { Button } from '@/components/ui/button';
import { playfair } from '@/components/ui/fonts';

import BannerCertificate from '../../public/cert_example.png';

const Page = () => {
  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 z-20 mt-5 w-full">
        <Navbar />
      </div>
      <div className="relative z-10 mt-24 flex flex-col items-center gap-10">
        <div className="px-6 py-6 md:px-8 md:py-0 lg:mt-20 xl:px-24 ">
          <div className="relative flex w-full max-w-[90rem] flex-col items-stretch px-6 md:flex-row ">
            <div className="basis-1/2">
              <div className="flex h-[20rem] flex-col items-center justify-center gap-8 antialiased md:h-[30rem] md:items-start lg:h-[35rem]">
                <div
                  className={`${playfair.className} text-md col-span-1 w-full text-wrap text-center font-bold sm:text-xl  md:text-left lg:text-3xl xl:text-5xl xl:leading-[4rem]`}
                >
                  Nền tảng tiên phong trong việc chuyển đổi cách công
                  <br className="hidden md:block lg:hidden xl:block" />
                  <span className="inline md:hidden lg:inline xl:hidden">&nbsp;</span>nhận thành tựu học thuật qua chứng chỉ số hóa.
                </div>
                <div className="self-center md:self-start">
                  <Button className="custom-gradient shadow-[0_2px_16px_0px_rgba(0, 0, 0, 0.12)] h-[3rem] w-fit rounded-[.75rem] px-10 text-base">
                    Liên hệ với chúng tôi
                  </Button>
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
              />
            </div>
          </div>
        </div>

        <div className="relative flex max-w-[90rem] flex-col items-center gap-40">
          <SectionAbout />
          <SectionWhatWeBelieve />
          <SectionOurVision />
        </div>
        <div className="relative text-white">
          <Footer />
        </div>
        <div className="absolute"></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 z-0"></div>
      {/* <div className="w-full h-[1000px] bg-slate-500"></div>
      <div className="w-full h-[1000px] bg-slate-300"></div>  */}
    </div>
  );
};

export default Page;
{
  /* <div className="flex flex-col gap-8">
            <div
              className={`${playfair.className} col-span-1 text-2xl font-bold lg:text-3xl xl:text-5xl`}
            >
              Nền tảng tiên phong trong việc chuyển đổi cách công
              <br className="hidden md:block xl:block" />
              nhận thành tựu học thuật qua chứng chỉ số hóa.
            </div>
            <Button className="custom-gradient shadow-[0_2px_16px_0px_rgba(0, 0, 0, 0.12)] h-[3rem] w-fit rounded-[.75rem] px-7 text-base">
              Liên hệ với chúng tôi
            </Button>
          </div> */
}
