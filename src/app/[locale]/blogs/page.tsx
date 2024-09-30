'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Key, use, useEffect, useState } from 'react';
import BlogCard from '@/components/common/card/BlogCard';
import { Button } from '@/components/ui/button';
import ArrowNarrowLeft from '@/assets/icons/arrow-narrow-left.svg';
import ArrowNarrowRight from '@/assets/icons/arrow-narrow-right.svg';
import { fetchDataFromWordPress } from '@/utils/fetchDataFromWordPress';

export default function Page() {
  const t = useTranslations('BlogListPage');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 9;
  

  // // Get the current page's blog posts
  // const currentPosts = dummyData.slice(
  //   (currentPage - 1) * postsPerPage,
  //   currentPage * postsPerPage
  // );

  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const handlePrevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };


  const [posts, setPosts] = useState<ArticleEntry[]>([]);
  useEffect(() => {
    async function fetchPosts() {
      const response = await fetchDataFromWordPress('https://admin.syncible.io/wp-json/wp/v2/posts');
      const mappedPosts = await Promise.all(
        response.map(async (post: any) => {
          // Fetch featured media (banner image) if available
          let bannerImg = '';
          if (post.featured_media) {
            const mediaResponse = await fetchDataFromWordPress(`https://admin.syncible.io/wp-json/wp/v2/media/${post.featured_media}`);
            bannerImg = mediaResponse.source_url || ''; // Ensure a default empty string if no image
          }

          // Fetch author details
          const authorResponse = await fetchDataFromWordPress(`https://admin.syncible.io/wp-json/wp/v2/users/${post.author}`);
          const author = {
            name: authorResponse.name,
            avatar: authorResponse.avatar_urls['96'], // Use the 96px avatar size
            position: 'Member', // Assuming a default position; you could add a custom field for this
          };

          // Map to your ArticleEntry structure
          return {
            title: post.title.rendered,
            link: post.link,
            bannerImg: bannerImg || '/SyncibleSmallerBbanner.png', // Use a default image if no banner
            author: author,
          };
        })
      );

      setPosts(mappedPosts);
    }
    fetchPosts();
  }, []);
  return (
    <div className="flex justify-center pt-24 md:pt-[8.25rem] lg:pt-40 xl:pt-44">
      <div className="flex h-full w-full max-w-[90rem] flex-col items-center px-4 md:px-8 xl:px-32">
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
          <div className="grid w-full grid-cols-1 gap-8 pt-4 sm:grid-cols-2 sm:pt-16 lg:grid-cols-3">
            {/* {currentPosts.map((post: any, index: number | null | undefined) => (
              <BlogCard key={index} entry={post} />
            ))} */}
          {posts.map((post: any, index: number | null | undefined) => (
            <BlogCard key={index} entry={post} />
          ))}

          </div>
          {/* Pagination controls */}
          {/* <div className="flex items-center justify-center gap-8 pt-8">
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
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="h-auto rounded-xl border-none bg-white p-3 shadow-combinedShadow2 hover:bg-white/50 disabled:cursor-not-allowed disabled:bg-white/50"
            >
              <ArrowNarrowRight className="h-6 w-6" />
            </Button>
          </div> */}
        </div>      
      </div>
    </div>
  );
}
