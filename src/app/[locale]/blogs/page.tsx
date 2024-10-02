'use client';

import { useTranslations, useLocale } from 'next-intl';
import { use, useEffect, useState } from 'react';
import BlogCard from '@/components/common/card/BlogCard';
import { Button } from '@/components/ui/button';
import ArrowNarrowLeft from '@/assets/icons/arrow-narrow-left.svg';
import ArrowNarrowRight from '@/assets/icons/arrow-narrow-right.svg';
import {
  fetchCategories,
  fetchPaginatedDataFromWP,
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
              avatar: authorResponse.avatar_urls['96'], // Use the 96px avatar size
              position: authorResponse.description, // Assuming a default position; you could add a custom field for this
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
    <div className="flex justify-center pt-24 md:pt-[8.25rem] lg:pt-40 xl:pt-44">
      <div className="flex h-full w-full max-w-[90rem] flex-col items-center px-4 md:px-8 xl:px-32">
        <div className="flex flex-col items-center gap-8">
          <div className="text-5xl font-bold">{t('title')}</div>
          <div className="max-w-4xl text-center text-lg font-semibold text-[#6C6D71]">
            {t('text')}
          </div>
        </div>
        {/* making a filter here by clicking on the categories */}
        <div className="w-full border-b border-[#CCCCCC] pt-16 text-[#A2A3A9]">
          <div className="flex space-x-4 font-semibold">
            <div
              className={clsx("w-fit border-b pb-4 cursor-pointer", {
              'border-[#2C2C2C] text-[#2C2C2C]': selectedCategory === null,
              })}
              onClick={() => handleCategoryClick(null)}
            >
              {t('category.all.label')}
            </div>
            {categories.map((category) => (
              <div
                key={category.id}
                className={clsx("w-fit border-b pb-4 cursor-pointer", {
                  'border-[#2C2C2C] text-[#2C2C2C]': selectedCategory === category.id,
                })}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
        <div className="w-full">
          <div className="grid w-full grid-cols-1 gap-8 pt-4 sm:grid-cols-2 sm:pt-16 lg:grid-cols-3">
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
              {/* Page {currentPage} of {totalPages} */}
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
