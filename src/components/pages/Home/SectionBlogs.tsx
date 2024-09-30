'use client';
import Autoplay from 'embla-carousel-autoplay';
import { useTranslations } from 'next-intl';

import ArrowNarrowRight from '@/assets/icons/arrow-narrow-right.svg';
import BlogCard from '@/components/common/card/BlogCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';

const ListNews = [
  {
    title: 'What is a Syncible Certificate and Syncible Qualified Batch?',
    link: '/blogs',
    bannerImg: '/SyncibleSmallerBanner.png',
    author: {
      name: 'Ryan Barn',
      avatar: '/SmugFace.png',
      position: 'Member',
    },
  },
];

export default function SectionBlogs() {
  const t = useTranslations('HomePage.blogs_section');
  return (
    <div className="w-full max-w-[90rem]" id="blogs">
      <div className="flex flex-col items-center gap-8 px-4 py-[4.5rem] md:px-8 xl:px-32 xl:py-32 ">
        <div className="flex w-full items-center justify-between">
          <div className="text-[2rem] font-bold">{t('header')}</div>
          <Link href={t('see_more.href')} className="font-semibold text-[#A2A3A9]">
            <div className="flex items-center">
              {t('see_more.label')}
              <ArrowNarrowRight className="inline-block h-6 w-6 stroke-[#A2A3A9] pl-1 [&_path]:stroke-current" />
            </div>
          </Link>
        </div>

        <Carousel
          opts={{ align: 'center', startIndex: 1, loop: false }}
          // plugins={[
          //   Autoplay({
          //     delay: 5000,
          //   }),
          // ]}
          className="w-full"
        >
          <div className="flex flex-col justify-center">
            <CarouselContent className="pb-10 pt-7 md:-ml-6">
              {ListNews.map((entry, index) => (
                <CarouselItem key={index} className="basis-full md:basis-1/2 md:pl-6 lg:basis-1/3">
                  <BlogCard entry={entry} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-4">
              <CarouselPrevious className="static right-auto top-auto h-12 w-12 translate-y-0 rounded-xl border-none shadow-combinedShadow2" />
              <CarouselNext className="static left-auto top-auto h-12 w-12 translate-y-0 rounded-xl border-none shadow-combinedShadow2" />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}
