import Image from 'next/image';

import { montserrat } from '@/components/ui/fonts';

import SyncibleLogoOnly from '../../../../public/SyncileLogoOnly.svg';

export default function SectionWhatWeBelieve() {
  return (
    <div className="relative px-6 py-6 md:px-8 md:py-0 xl:px-[6.5rem]">
      <div className="relative">
        <div className="absolute left-0 right-0 top-0 z-0 h-full w-full px-6 py-6">
          <div className="relative h-full w-full">
            <div className="absolute -left-[5.9rem] -top-[6rem] z-0 h-[6.5rem] lg:h-[12.5rem]">
              <SyncibleLogoOnly className="h-full w-full" />
            </div>
            <div className="absolute -right-[5.3rem] top-1/2 z-0 h-[4.5rem] lg:h-[8.625rem] ">
              <SyncibleLogoOnly className="h-full w-full blur-[2px]" />
            </div>
            <div className="absolute left-0 right-0 top-0 z-10 h-full w-full overflow-hidden rounded-[2rem] border border-[#F0F0F0]">
              <div className="h-full w-full  overflow-hidden bg-white/50 backdrop-blur-[25px]"></div>
            </div>
            <div className="absolute bottom-0 left-1/2 z-10 h-[6.375rem] -translate-x-1/2 translate-y-1/2">
              <SyncibleLogoOnly className="h-full w-full" />
            </div>
          </div>
        </div>
        <div className="relative z-30 flex flex-col items-center gap-10 p-20 lg:flex-row">
          <div className="h-full w-full basis-1/2">
            <Image
              src="/img02.png"
              alt="placeholder photo 4"
              sizes="100vw"
              fill
              className="h-full object-cover"
              priority
            />
          </div>
          <div className="w-full basis-1/2">
            <div className="flex flex-col gap-4 antialiased">
              <h1 className={`${montserrat.className} text-[2rem] font-[700]`}>What we believe</h1>
              <div className={`${montserrat.className} font-inter w-full text-wrap`}>
                By tokenizing diplomas, certificates, and educational accomplishments, we help
                students build an
                <span className="font-bold">
                  &nbsp;authentic, verifiable digital portfolio
                </span>{' '}
                provides a comprehensive view of their skills and knowledge.
                <br />
                <br /> Syncible reduces the time to issue certificates, printing costs, and
                educational fees, while eliminating the need to retrieve physical documents or send
                them by mail.
                <br />
                <br />
                We ensure that each certificate is stored on the blockchain with encrypted
                information, protecting the integrity and security of the records and minimizing
                fraud risks.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
