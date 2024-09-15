import React, { useRef, useEffect } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

import { montserrat } from '@/components/ui/fonts';

export default function SectionAbout() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

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
      // Left animation (moving from left)
      tl.fromTo(
        leftRef.current,
        { opacity: 0, x: -100 }, // Move from the left
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: 'power3.out',
        }
      );
      // Right animation (moving from right), delayed by 0.5s
      tl.fromTo(
        rightRef.current,
        { opacity: 0, x: 100 }, // Move from the right
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
    <div className="pt-20 md:px-8 md:py-8 xl:px-16 xl:py-16" id="about">
      <div className="flex flex-col items-center gap-8 rounded-t-[2.5rem] border-t-2 border-white bg-gradient-to-b from-white/50 px-4 py-[4rem] sm:rounded-t-[6.25rem] sm:px-16 sm:py-[6.6rem] lg:flex-row">
        <div ref={leftRef} className="w-full basis-1/2">
          <div className="flex flex-col gap-4 antialiased">
            <h1 className={`${montserrat.className} text-[2rem] font-[700]`}>About us</h1>
            <div
              className={`${montserrat.className}w-full font-inter text-wrap text-[#6C6D71] lg:w-[85%]`}
            >
              Syncible a pioneering platform that provides secure and transparent NFT certificates
              for across various sectors, including education, business, and non-profit
              organizations. Syncible ensures the authenticity and integrity of digital
              certificates, helping to minimize the risk of counterfeiting and enhancing the
              credibility of certificate-issuing organizations.
            </div>
          </div>
        </div>
        <div ref={rightRef} className="h-full w-full basis-1/2">
          <Image
            src="/img01.png"
            alt="Image with 2 hands shaking"
            fill
            sizes="100vw"
            className="h-[110%]  object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
