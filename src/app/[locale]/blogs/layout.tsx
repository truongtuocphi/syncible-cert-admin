'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { montserrat } from '@/components/ui/fonts';

import LightBlueGradientEllipse from '../../../../public/Ellipse_1.svg';
import { Link, usePathname } from '@/i18n/routing';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
        <Navbar />
      <div
        className={`${montserrat.className} z-20 flex h-full flex-grow flex-col items-center gap-10`}
      >
        {children}
      </div>
      <div className="relative mt-10 w-full">
        <Footer />
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 flex h-full w-full flex-col items-center overflow-hidden">
        <div className="relative mx-auto h-full w-full max-w-[90rem]">
          <div className="absolute -left-1/2 -top-1/2  w-[125rem] sm:-top-[5%] sm:left-[-40%] sm:w-[150%] sm:-translate-x-[0%] sm:-translate-y-[30%]">
            <LightBlueGradientEllipse className="h-full w-full" />
          </div>
          <div className="absolute -bottom-1/2 -right-1/2 -z-10 w-[125rem] sm:-translate-y-[20%] sm:translate-x-[20%]">
            <LightBlueGradientEllipse className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
