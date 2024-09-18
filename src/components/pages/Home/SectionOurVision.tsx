import React, { useRef, useEffect } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { montserrat } from '@/components/ui/fonts';

export default function SectionOurVision() {
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations('HomePage.vision_section');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

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
            start: 'top 50%', // Start animation when top of section is 50% of the viewport
            toggleActions: 'play none none reverse', // Trigger animation on scroll
            markers: false,
          },
        }
      )
    }
  }, []);
  return (
    <div className="md:px-8 md:py-8 xl:px-16 xl:py-16" id="about">
      <div
        ref={ref}
        className="flex flex-col items-center gap-20 rounded-b-[2.5rem] border-b-2 border-white bg-gradient-to-t from-white/50 px-4 py-[4rem] sm:rounded-b-[6.25rem] sm:px-16 sm:py-28 lg:flex-row"
      >
        <div className="w-full basis-1/2">
          <div className="flex flex-col gap-4 antialiased">
            <h1 className={`${montserrat.className} text-[2rem] font-[700]`}>{t('header')}</h1>
            <div className={`${montserrat.className} font-inter w-full text-wrap lg:w-[85%]`}>
              {t('content')}
            </div>
          </div>
        </div>
        <div className="w-full max-w-[30rem] basis-1/2">
          <Image
            src="/img03.png"
            alt="Image of a globe"
            sizes="100vw"
            fill
            className="h-full object-cover "
            priority
          />
        </div>
      </div>
    </div>
  );
}
