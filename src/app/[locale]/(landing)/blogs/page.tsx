'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
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
  const postsPerPage = 9;
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [posts, setPosts] = useState<ArticleEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const locale = useLocale();
  const [lastScrollY, setLastScrollY] = useState(0); // For scroll detection
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>('up'); // State to handle category filter visibility
  const [isCategoryFilterAtTop, setIsCategoryFilterAtTop] = useState(false); // Handle when the category filter reaches the top
  const categoryFilterRef = useRef<HTMLDivElement>(null); // Reference to category filter

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

  // Scroll detection for category filter
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      const categoryFilterTop = categoryFilterRef.current?.getBoundingClientRect().top || 0;
      // Only trigger scroll behavior once the category filter reaches the top of the viewport
      console.log(categoryFilterTop);

      if (window.innerWidth < 768) {
        if (categoryFilterTop <= 0 && !isCategoryFilterAtTop) {
          setIsCategoryFilterAtTop(true); // Trigger sticky behavior
        } 
        if (categoryFilterTop >= 73  && isCategoryFilterAtTop) {
          
          setIsCategoryFilterAtTop(false);
        }

        if (isCategoryFilterAtTop) {
          if (currentScrollY > lastScrollY) {
            setScrollDirection('down'); // Scrolling down, hide the filter
          } else {
            setScrollDirection('up'); // Scrolling up, show the filter
          }
        }
        setLastScrollY(currentScrollY);
      }
      else {
        setIsCategoryFilterAtTop(false);
        setScrollDirection(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isCategoryFilterAtTop]);

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
    <div className="relative z-20 mt-24 flex grow justify-center md:mt-[8.25rem] lg:mt-40 xl:mt-44">
      <div className="relative flex h-full w-full max-w-[90rem] flex-col gap-8 sm:items-center">
        <div className="flex flex-col gap-6 px-4 sm:items-center sm:gap-8 md:px-8 xl:px-32">
          <div className="text-[2.5rem] font-bold sm:text-5xl">{t('title')}</div>
          <div className="max-w-4xl font-medium text-[#6C6D71] sm:text-center sm:text-lg">
            {t('text')}
          </div>
        </div>
        {/* Filter category */}
        <div
          id="category-filter"
          ref={categoryFilterRef}
          className={clsx(
            'sticky top-0 z-20 text-[#A2A3A9] transition-transform duration-300 ease-in-out md:static w-full md:px-8 xl:px-32',
            {
              'bg-white/50 backdrop-blur-[50px]': isCategoryFilterAtTop, // blurred background when sticky
              'translate-y-[4.5rem]': isCategoryFilterAtTop && scrollDirection === 'up', // transition down when scrolling up
              'translate-y-0': isCategoryFilterAtTop && scrollDirection === 'down', // Stay at the top when scrolling down
            }
          )}
        >
          <div className="flex space-x-4 overflow-x-auto font-semibold border-b border-[#CCCCCC] px-4 md:px-0">
            <div
              className={clsx('w-fit flex-shrink-0 cursor-pointer py-4', {
                'border-b-2 border-[#2C2C2C] text-[#2C2C2C]': selectedCategory === null,
              })}
              onClick={() => handleCategoryClick(null)}
            >
              {t('category.all.label')}
            </div>
            {categories.map((category) => (
              <div
                key={category.id}
                className={clsx('w-fit flex-shrink-0 cursor-pointer py-4', {
                  'border-b-2 border-[#2C2C2C] text-[#2C2C2C]': selectedCategory === category.id,
                })}
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
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
