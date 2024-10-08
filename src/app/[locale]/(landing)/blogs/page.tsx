'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import BlogCard from '@/components/common/card/BlogCard';
import { Button } from '@/components/ui/button';
import ArrowNarrowLeft from '@/assets/icons/arrow-narrow-left.svg';
import ArrowNarrowRight from '@/assets/icons/arrow-narrow-right.svg';
import {
  fetchCategories,
  fetchPosts,
  fetchAuthorById,
  fetchMediaById,
} from '@/utils/fetchDataFromWordPress';
import { BlogCardSkeleton } from '@/components/common/skeleton/Skeleton';
import clsx from 'clsx';

export default function Page() {
  const t = useTranslations('BlogListPage');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [notFoundError, setNotFoundError] = useState(false);
  const postsPerPage = 9;
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [posts, setPosts] = useState<ArticleEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();

  useEffect(() => {
    async function loadCategories() {
      try {
        const { data } = await fetchCategories();
        const filteredCategories = data.filter((category: any) => category.id !== 1);
        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }

    loadCategories();
  }, []);

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      try {
        const tagId = locale === 'en' ? 6 : 7;
        const { data, totalPages } = await fetchPosts(
          currentPage,
          postsPerPage,
          selectedCategory,
          tagId
        );

        const mappedPosts = await Promise.all(
          data.map(async (post: any) => {
            // Fetch featured media (banner image) if available
            let bannerImg = '/SyncibleSmallerBanner.png';
            if (post.featured_media) {
              const mediaResponse = await fetchMediaById(post.featured_media);
              bannerImg = mediaResponse.source_url || bannerImg; // Ensure a default empty string if no image
            }

            // Fetch author details
            const authorResponse = await fetchAuthorById(post.author);
            const author = {
              name: authorResponse.name,
              avatar_url: authorResponse.avatar_urls['96'], // Use the 96px avatar size
              description: authorResponse.description, // Assuming a default position; you could add a custom field for this
            };

            // Map to your ArticleEntry structure
            return {
              title: post.title.rendered,
              link: `/blogs/${post.slug}`,
              bannerImg: bannerImg || '/SyncibleSmallerBanner.png', // Use a default image if no banner
              author: author,
            };
          })
        );
        setTotalPages(parseInt(totalPages.toString(), 10));
        setPosts(mappedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, [currentPage, selectedCategory, locale]);

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

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1); // Reset to first page when a category is selected
  };

  return (
    <div className="relative z-20 flex grow justify-center mt-24 md:mt-[8.25rem] lg:mt-40 xl:mt-44">
      <div className="relative flex h-full w-full max-w-[90rem] flex-col gap-8 sm:items-center sm:gap-0">
        <div className="flex flex-col gap-6 sm:items-center sm:gap-8 px-4 md:px-8 xl:px-32">
          <div className="text-[2.5rem] font-bold sm:text-5xl">{t('title')}</div>
          <div className="max-w-4xl font-medium text-[#6C6D71] sm:text-center sm:text-lg">
            {t('text')}
          </div>
        </div>
        {/* making a filter here by clicking on the categories */}
        {/* <div className="relative h-full"> */}
          <div className="sticky top-[4.5rem] border-b border-[#CCCCCC] text-[#A2A3A9] sm:static sm:w-full sm:pt-16 z-20">
            <div className="flex space-x-4 overflow-x-auto font-semibold px-4 md:px-8 xl:px-32">
              <div
                className={clsx('w-fit flex-shrink-0 cursor-pointer py-4 sm:pt-0', {
                  'border-b border-[#2C2C2C] text-[#2C2C2C]': selectedCategory === null,
                })}
                onClick={() => handleCategoryClick(null)}
              >
                {t('category.all.label')}
              </div>
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={clsx('w-fit flex-shrink-0 cursor-pointer py-4 sm:pt-0', {
                    'border-b border-[#2C2C2C] text-[#2C2C2C]': selectedCategory === category.id,
                  })}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </div>
              ))}
            </div>
          </div>
        {/* </div> */}
        <div className="w-full px-4 md:px-8 xl:px-32">
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 sm:pt-16 lg:grid-cols-3">
            {loading
              ? Array.from({ length: postsPerPage }, (_, index) => <BlogCardSkeleton key={index} />)
              : posts.map((post: any, index: number | null | undefined) => (
                  <BlogCard key={index} entry={post} />
                ))}
          </div>
          {/* Pagination controls */}
          <div className="flex items-center justify-center gap-8 pt-8">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="h-auto rounded-xl border-none bg-white p-3 shadow-combinedShadow2 hover:bg-white/50 disabled:cursor-not-allowed disabled:bg-white/50"
            >
              <ArrowNarrowLeft className="h-6 w-6" />
            </Button>
            <span className="font-medium text-[#A2A3A9]">
              {t('pagination.label', { page: currentPage, totalPages: totalPages })}
            </span>
            <Button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="h-auto rounded-xl border-none bg-white p-3 shadow-combinedShadow2 hover:bg-white/50 disabled:cursor-not-allowed disabled:bg-white/50"
            >
              <ArrowNarrowRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
