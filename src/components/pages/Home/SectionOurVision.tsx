import Image from 'next/image';

import { montserrat } from '@/components/ui/fonts';

export default function SectionOurVision() {
  return (
    <div className="md:px-8 md:py-8 xl:px-16 xl:py-16" id="about">
      <div className="flex flex-col items-center gap-20 rounded-b-[2.5rem] border-b-2 border-white bg-gradient-to-t from-white/50 px-4 py-[4rem] sm:rounded-b-[6.25rem] sm:px-16 sm:py-28 lg:flex-row">
        <div className="w-full basis-1/2">
          <div className="flex flex-col gap-4 antialiased">
            <h1 className={`${montserrat.className} text-[2rem] font-[700]`}>Vision</h1>
            <div className={`${montserrat.className} font-inter w-full text-wrap lg:w-[85%]`}>
              Syncible aims to create a comprehensive shift in the recognition of academic
              achievements, transcending geographical boundaries and administrative procedures,
              allowing students to transparently and reliably demonstrate their skills to employers
              and educational institutions.
            </div>
          </div>
        </div>
        <div className="w-full max-w-[30rem] basis-1/2">
          <Image
            src="/img03.png"
            alt="placeholder photo 5"
            sizes="100vw"
            fill
            className="h-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
