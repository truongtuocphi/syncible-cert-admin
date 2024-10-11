import React, { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import SyncibleLogoOnly from '../../../../public/SyncileLogoOnly.svg';
import WeBelieveSVG from '../../../../public/WeBelieve.svg';

export default function SectionWhatWeBelieve() {
  const ref = useRef<HTMLDivElement>(null);
  const logoRef1 = useRef<HTMLDivElement>(null);
  const logoRef2 = useRef<HTMLDivElement>(null);
  const logoRef3 = useRef<HTMLDivElement>(null);
  const t = useTranslations('HomePage.believe_section');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%', // Start animation when top of section is 50% of the viewport
            toggleActions: 'play none none reverse', // Trigger animation on scroll
            markers: false,
          },
        }
      );

      // Floating animation for logo 1 (vertical float)
      const tl = gsap.timeline({
        repeat: -1, // Infinite loop
      });

      // Diamond pattern movement
      tl.to(logoRef1.current, {
        x: 20, // Move right
        y: -20, // Move up
        duration: 1, // Adjust duration for smoothness
      })
        .to(logoRef1.current, {
          x: 40, // Move further right
          y: 0, // Move down
          duration: 1,
        })
        .to(logoRef1.current, {
          x: 20, // Move back to left
          y: 20, // Move further down
          duration: 1,
        })
        .to(logoRef1.current, {
          x: 0, // Move left
          y: 0, // Move back up to complete the diamond
          duration: 1,
        });

      // Floating animation for logo 2 (circular float)
      gsap.to(logoRef2.current, {
        x: 20, // Move horizontally by 20px
        y: 30, // Move vertically by 30px
        duration: 3, // Time for one complete float
        repeat: -1, // Infinite loop
        yoyo: true, // Move back to original position
        ease: 'power1.inOut',
      });

      // Floating animation for logo 3 (vertical float)
      gsap.to(logoRef3.current, {
        y: 25, // Move up and down by 25px
        duration: 2.5, // Time for one complete float
        repeat: -1, // Infinite loop
        yoyo: true, // Move back to original position
        ease: 'power1.inOut',
      });
    }
  }, []);
  return (
    <div ref={ref} className="xl:px-16 w-full">
      <div  className="px-4 py-[3.125rem] md:px-8 md:py-0 xl:px-[2.5rem]">
        <div className="relative">
          <div className="absolute left-0 right-0 top-0 z-0 h-full w-full md:px-6 md:py-6">
            <div className="relative h-full w-full">
              <div
                ref={logoRef1}
                className="absolute -left-[26%] -top-[9%] z-0 h-[12.5rem] sm:-left-[5.9rem] sm:-top-[6rem] lg:h-[12.5rem]"
              >
                <SyncibleLogoOnly className="h-full w-full" alt="Floating Syncible Logo top left" />
              </div>
              <div
                ref={logoRef2}
                className="absolute -bottom-[7%] -right-[11%] z-0 h-[8.625rem] sm:-right-[5.3rem] sm:top-1/2 lg:h-[8.625rem] "
              >
                <SyncibleLogoOnly
                  className="h-full w-full blur-[2px]"
                  alt="Floating Syncible Logo below center right"
                />
              </div>
              <div className="absolute left-0 right-0 top-0 z-10 h-full w-full overflow-hidden rounded-[2rem] border border-[#F0F0F0]">
                <div className="h-full w-full  overflow-hidden bg-white/50 backdrop-blur-[25px]"></div>
              </div>
              <div
                ref={logoRef3}
                className="invisible absolute bottom-0 left-1/2 z-10 h-[6.375rem] -translate-x-1/2 translate-y-1/2 sm:visible"
              >
                <SyncibleLogoOnly
                  className="h-full w-full"
                  alt="Floating Syncible Logo center bottom"
                />
              </div>
            </div>
          </div>
          <div className="relative z-30 flex flex-col-reverse items-center gap-8 px-4 py-8 md:p-20 lg:flex-row lg:gap-20">
            <div className="h-full w-full basis-1/2 lg:basis-[45%]">
              <WeBelieveSVG
                className="h-full w-full"
                alt="2D image of a graduation cap, a medal and a certificate"
              />
            </div>
            <div className="w-full basis-1/2 lg:basis-[55%]">
              <div className="flex flex-col gap-4 antialiased">
                <h1 className="text-[2rem] font-bold">{t('header')}</h1>
                <div className="w-full text-wrap text-lg font-medium text-[#6C6D71]">
                  {t.rich('content', {
                    breakline: () => (
                      <>
                        <br />
                        <br />
                      </>
                    ),
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
