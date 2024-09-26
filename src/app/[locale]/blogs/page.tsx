'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import BlogCard from '@/components/common/card/BlogCard';
import { Button } from '@/components/ui/button';
import ArrowNarrowLeft from '@/assets/icons/arrow-narrow-left.svg';
import ArrowNarrowRight from '@/assets/icons/arrow-narrow-right.svg';

export default function Page() {
  const t = useTranslations('BlogListPage');
  const dummyData: ArticleEntry[] = Array.from({ length: 15 }, (_, index) => ({
    title: `Blog Post ${index + 1}`,
    link: `/blog/post-${index + 1}`,
    bannerImg: '/SyncibleSmallerBanner.png', // Replace with actual banner image URLs if available
    author: {
      name: `Author ${index + 1}`,
      avatar: '/SmugFace.png', // Replace with actual avatar URLs if available
      position: 'Member',
    },
  }));
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const totalPages = Math.ceil(dummyData.length / postsPerPage);

  // Get the current page's blog posts
  const currentPosts = dummyData.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex h-full w-full justify-center pt-24 md:pt-[8.25rem] lg:pt-40 xl:pt-44">
      <div className="w-full max-w-[90rem] px-4 md:px-8 xl:px-32">
        <div className="flex h-full w-full flex-col items-center">
          <div className="flex flex-col items-center gap-8">
            <div className="text-5xl font-bold">{t('title')}</div>
            <div className="max-w-4xl text-center text-lg font-semibold text-[#6C6D71]">
              {t('text')}
            </div>
          </div>
          <div className="w-full border-b border-[#CCCCCC] pt-16">
            <div className="w-fit border-b border-[#2C2C2C] pb-4 font-semibold">
              {t('category.all.label')}
            </div>
          </div>
          <div className="w-full">
            <div className="grid w-full grid-cols-1 gap-8 pt-16 sm:grid-cols-2 lg:grid-cols-3">
              {currentPosts.map((post, index) => (
                <BlogCard key={index} entry={post} />
              ))}
            </div>
            {/* Pagination controls */}
            <div className="flex items-center justify-center gap-4 pt-8">
              <Button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="h-auto rounded-xl border-none bg-white p-3 shadow-combinedShadow2 hover:bg-white/50 disabled:cursor-not-allowed disabled:bg-white/50"
              >
                <ArrowNarrowLeft className="h-6 w-6" />
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="h-auto rounded-xl border-none bg-white p-3 shadow-combinedShadow2 hover:bg-white/50 disabled:cursor-not-allowed disabled:bg-white/50"
              >
                 <ArrowNarrowRight className="w-6 h-6"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
