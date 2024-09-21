import React, { useRef, useEffect } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import OurVision from '../../../../public/OurVision.svg';

export default function SectionOurVision() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('HomePage.vision_section');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: leftRef.current, // Use one trigger for both animations
          start: 'top 50%', // Animation starts when top of the section is 80% of the viewport
          toggleActions: 'play none none reverse',
        },
      });
      // Right animation (moving from right)
      tl.fromTo(
        rightRef.current,
        { opacity: 0, x: 100 }, // Move from the right
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: 'power3.out',
        }
      );
      // Left animation (moving from left), delayed by 0.5s
      tl.fromTo(
        leftRef.current,
        { opacity: 0, x: -100 }, // Move from the left
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: 'power3.out',
        },
        '-=1' // This ensures a delay of 0.5s after the left animation starts (1.5s duration minus 1 second)
      );
    }
  }, []);
  return (
    <div className="md:px-8 md:py-8 xl:px-16 xl:py-16" id="about">
      <div className="flex flex-col items-center gap-20 rounded-b-[2.5rem] border-b-2 border-white bg-gradient-to-t from-white/50 px-4 py-[4rem] sm:rounded-b-[6.25rem] sm:px-16 sm:py-28 lg:flex-row">
        <div className="w-full basis-1/2" ref={leftRef}>
          <div className="flex flex-col gap-4 antialiased">
            <h1 className="text-[2rem] font-[700]">{t('header')}</h1>
            <div className="font-inter w-full text-wrap lg:w-[85%] text-[#6C6D71]">{t('content')}</div>
          </div>
        </div>
        <div className="h-full w-full basis-1/2" ref={rightRef}>
          <Image
            src="/img03.png"
            alt="Image of a globe"
            sizes="100vw"
            fill
            className="h-full object-cover "
            priority
          />
          {/* <OurVision className="h-full w-full" alt="Image of a globe" /> // hình svg này có vấn đề nên a chưa fix dc, chắc để sau*/}
        </div>
      </div>
    </div>
  );
}
