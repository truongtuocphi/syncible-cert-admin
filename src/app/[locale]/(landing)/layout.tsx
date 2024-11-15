import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
import Background from '../../../../public/DoraBG.png';
import BackgroundSmall from '../../../../public/DoraBGSmall.png';
import LightBlueGradientEllipse from '../../../../public/Ellipse_1.svg';
import Footer from '@/components/layout/Footer';
import { montserrat } from '@/components/ui/fonts';

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${montserrat.className} relative flex min-h-screen flex-col md:gap-10`}>
      <Navbar />
      {children}
      <div className="relative mt-10 w-full">
        <Footer />
      </div>
      <div className="absolute inset-0 -z-20 flex w-full flex-col items-center overflow-hidden bg-brand-10">
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
        <div className="relative hidden sm:block">
          <Image
            src={Background}
            fill
            alt="The background image with star-like shapes and a single curvy line that extends to the bottom of the image"
            className="z-10 h-auto w-full object-cover object-top"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="relative block sm:hidden">
          <Image
            src={BackgroundSmall}
            fill
            alt="The background image with star-like shapes and a single curvy line that extends to the bottom of the image"
            className="z-0 h-auto w-full object-cover object-top"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </div>
  );
}
