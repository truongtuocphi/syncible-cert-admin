import React, { useRef, useEffect } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function SectionOurVision() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('HomePage.vision_section');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: leftRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          markers: false,
        },
      });
      tl.fromTo(
        rightRef.current,
        { opacity: 0, x: 100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: 'power3.out',
        }
      );
      tl.fromTo(
        leftRef.current,
        { opacity: 0, x: -100 },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: 'power3.out',
        },
        '-=1'
      );
    }
  }, []);

  return (
    <div className="md:px-8 md:py-8 xl:px-16 xl:py-16" id="about">
      <div className="flex flex-col items-center gap-20 rounded-b-[2.5rem] border-b-2 border-white bg-gradient-to-t from-white/50 px-4 py-[4rem] sm:rounded-b-[6.25rem] sm:px-16 sm:py-28 lg:flex-row">
        <div className="w-full basis-1/2" ref={leftRef}>
          <div className="flex flex-col gap-4 antialiased">
            <h1 className="text-[2rem] font-[700]">{t('header')}</h1>
            <div className="w-full text-wrap text-lg font-medium text-[#6C6D71] lg:w-[85%]">
              {t('content')}
            </div>
          </div>
        </div>
        <div className="relative h-full w-full basis-1/2" ref={rightRef}>
          <Image
            src="/img03.png"
            alt="Image of a globe"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="h-full object-cover "
            priority
          />
          {/* <OurVision className="h-full w-full" alt="Image of a globe" />  */}
        </div>
      </div>
    </div>
  );
}
