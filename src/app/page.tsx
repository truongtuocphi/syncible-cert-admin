import React from 'react';

import Image from 'next/image';

import Footer from '@/components/layout/Footer';
import SectionAbout from '@/components/pages/Home/SectionAbout';
import SectionOurVision from '@/components/pages/Home/SectionOurVision';
import SectionWhatWeBelieve from '@/components/pages/Home/SectionWhatWeBelieve';
import { Button } from '@/components/ui/button';

import BannerCertificate from '../../public/certificate.jpg';
import ether from '../../public/ether.png';
import polygon from '../../public/polygon.png';

const Page = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center pt-16">
      <div className="mt-0 grid w-full grid-cols-1 items-center justify-center gap-5 px-6 md:px-14 lg:mt-48 lg:grid-cols-2 lg:px-24 2xl:px-60">
        <div className="w-fit">
          <div className="col-span-1 text-2xl font-bold lg:text-3xl 2xl:text-4xl">
            Using blockchain technology and NFTs, Syncible
            <br className="hidden md:block xl:block" />
            revolutionizes the way academic achievements are recognized.
          </div>
          <div className="my-6 text-lg font-bold lg:text-base">Powered by</div>
          <div className="flex flex-wrap items-center gap-6">
            <Image
              src={polygon}
              alt="polygon"
              width={130}
              height={40}
              loading="lazy"
              style={{ width: '100px', height: 'auto' }}
            />
            <Image
              src={ether}
              alt="ether"
              width={130}
              loading="lazy"
              style={{ width: '100px', height: 'auto' }}
            />
          </div>
          <Button className="mt-9 rounded-full bg-blue-500 px-16 py-6 text-base">Contact us</Button>
        </div>
        <div className="h-auto w-auto overflow-hidden rounded-lg">
          <Image
            src={BannerCertificate}
            alt="/ảnh NFT Certificate"
            className="col-span-1 h-full w-full rounded-lg"
            priority={false}
          />
        </div>
      </div>

      <>
        <SectionAbout />
        <SectionWhatWeBelieve />
        <SectionOurVision />
      </>

      <div className="relative text-white">
        <Footer />
      </div>
    </div>
  );
};

export default Page;
