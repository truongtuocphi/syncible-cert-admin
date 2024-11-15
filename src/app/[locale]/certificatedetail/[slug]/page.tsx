'use client';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import IdExperienceComponent from '@/components/pages/IdExperienceComponent';
import LightBlueGradientEllipse from '../../../../../public/Ellipse_1.svg';
import { useEffect } from 'react';

export default function CertificateDetail({ params }: { params: { slug: string } }) {
  const slugPost = params.slug;

  useEffect(() => {
    const handleKeyDown = (e: {
      key: string;
      preventDefault: () => void;
      ctrlKey: boolean;
      metaKey: boolean;
      shiftKey: boolean;
    }) => {
      if (e.key === 'F12') {
        e.preventDefault();
      }

      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I') {
        e.preventDefault();
      }
    };

    const handleContextMenu = (e: { preventDefault: () => void }) => {
      e.preventDefault();
    };

    const detectDevTools = () => {
      const threshold = 160;
      if (
        window.outerHeight - window.innerHeight > threshold ||
        window.outerWidth - window.innerWidth > threshold
      ) {
        alert('DevTools detected! Please close DevTools to continue browsing.');
        window.location.href = 'about:blank';
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    const interval = setInterval(detectDevTools, 1000);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex-col items-center bg-custom-blue-gradient pt-[6.5rem]">
        <div className="mt-[1.375rem] px-4 sm:mt-16 md:px-8 lg:px-24 2xl:px-60">
          <IdExperienceComponent slugPost={slugPost} changeLayout={true} />
        </div>
        <div className="relative text-black">
          <Footer />
        </div>

        <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 flex h-full w-full flex-col items-center overflow-hidden">
          <div className="relative mx-auto h-full w-full max-w-[90rem]">
            <div className="absolute -left-1/2 -top-1/2 -z-10 w-[125rem] sm:-top-[5%] sm:left-[-40%] sm:w-[150%] sm:-translate-x-[20%] sm:-translate-y-[50%]">
              <LightBlueGradientEllipse className="h-full w-full" />
            </div>
            <div className="absolute -bottom-1/2 -right-1/2 -z-10 w-[125rem] sm:-translate-y-[20%] sm:translate-x-[20%]">
              <LightBlueGradientEllipse className="h-full w-full" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
