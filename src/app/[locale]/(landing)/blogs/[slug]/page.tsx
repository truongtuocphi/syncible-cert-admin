'use client';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { fetchPostBySlug } from '@/utils/fetchDataFromWordPress';
import { addIdsToHeadings, generateTOC } from '@/utils/processBlogContent';
import { Link } from '@/i18n/routing';
import BlogBreadcrumb from '@/components/pages/Home/Blogs/breadcrumb';
import AuthorProfile from '@/components/common/miscellaneus/AuthorProfile';
import TableOfContent from '@/components/common/miscellaneus/TableOfContent';
import { useFormatter } from 'next-intl';
import Loading from '@/components/common/loading/Loading';

export default function BlogPage({ params }: { params: { slug: string } }) {
  const t = useTranslations('BlogPage');
  const { slug } = params;
  const [notFoundError, setNotFoundError] = useState(false);
  const [author, setAuthor] = useState<Author | null>(null);
  const [blogContent, setBlogContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [bannerImg, setBannerImg] = useState<string | null>(null);
  const [toc, setToc] = useState<any[]>([]);
  const format = useFormatter();

  useEffect(() => {
    async function fetchBlogContent(slug: string) {
      setLoading(true);
      setNotFoundError(false);
      try {
        const response = await fetchPostBySlug(`${slug}`);

        if (response.length === 0 || response === null || response === undefined) {
          setNotFoundError(true);
        } else {
          const authorResponse = response['_embedded']['author'][0];

          setAuthor({
            name: authorResponse.name,
            avatar_url: authorResponse.avatar_urls['96'],
            description: authorResponse.description,
          });

          setBannerImg('/SyncibleBiggerBanner.png');
          const { html, doc } = addIdsToHeadings(
            response.content.rendered.replace(/\n{3,}/g, '\n\n')
          );

          const toc = generateTOC(doc);
          setToc(toc);

          setBlogContent({ ...response, content: { rendered: html } });

          const categoryResponse = response['_embedded']['wp:term'][0];
          setCategories(categoryResponse);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setNotFoundError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogContent(slug);
  }, [slug]);

  if (loading) {
    return <div className="m-auto"><Loading/></div>;
  }

  if (notFoundError) {
    return (
      <div className="flex h-full w-full items-center justify-center pt-24 md:pt-[8.25rem] lg:pt-40 xl:pt-44">
        <div className="text-center">
          <h1 className="text-4xl font-bold">{t('category.not_found.blog.header')}</h1>
          <p className="mt-4 text-xl">{t('category.not_found.blog.content')}</p>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Blogs', href: '/blogs' },
    { label: blogContent?.title?.rendered || 'Untitled', href: '' },
  ];

  const readTime = Math.ceil(blogContent.content.rendered.split(' ').length / 200);

  const dateCreated = format.dateTime(new Date(blogContent.date), {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="flex h-full w-full justify-center pt-24 md:pt-[8.25rem] lg:pt-40 xl:pt-44">
      <div className="flex flex-col gap-10 px-4 pb-4 md:px-8 md:pb-10 xl:px-32">
        <BlogBreadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center gap-10">
          <div className="sm:text-center text-2xl font-bold md:text-3xl lg:text-5xl">
            {blogContent.title.rendered}
          </div>
          <div className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-[2rem]">
            {bannerImg && (
              <Image
                src={bannerImg}
                alt={blogContent.title.rendered}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
                className="object-contain"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="hidden basis-1/4 md:block">
            <div className="flex h-full flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  {author && <AuthorProfile author={author} />}
                </div>
                <div className="w-[70%] border-t-[1px]"></div>
                <div className="flex flex-col gap-2">
                  <div className="text-base font-medium text-[#A2A3A9]">
                    {t('blog_info.date_created.label')}
                  </div>
                  <div className="text-lg font-medium text-[#2C2C2C]">{dateCreated}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-base font-medium text-[#A2A3A9]">
                    {t('blog_info.read_time.label')}
                  </div>
                  <div className="text-lg font-medium">
                    {t('blog_info.read_time.value', { read_time: readTime })}
                  </div>
                </div>
              </div>
              {/* Render table content */}
              <div
                id="table-content"
                className="sticky top-[9rem] flex flex-col gap-2 text-lg text-[#A2A3A9]"
              >
                <div className="text-2xl font-bold text-[#2C2C2C]">
                  {t('table_of_contents.label')}
                </div>
                <TableOfContent headings={toc}></TableOfContent>
              </div>
            </div>
          </div>
          <div className="basis-3/4">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6 md:hidden">
                <div className="flex items-center gap-4">
                  {author && <AuthorProfile author={author} />}
                </div>
                <div className="w-full border-t-[1px]"></div>
                <div className="flex flex-col gap-6">
                  <div className="flex w-full flex-col gap-2">
                    <div className="text-base font-medium text-[#A2A3A9]">
                      {t('blog_info.date_created.label')}
                    </div>
                    <div className="text-lg font-medium">{dateCreated}</div>
                  </div>
                  <div className="flex w-full flex-col gap-2">
                    <div className="text-base font-medium text-[#A2A3A9]">
                      {t('blog_info.read_time.label')}
                    </div>
                    <div className="text-lg font-medium">
                      {t('blog_info.read_time.value', { read_time: readTime })}
                    </div>
                  </div>
                </div>
              </div>
              {/* Render blog content */}
              <div
                id="content-section"
                className="prose max-w-[90rem] lg:prose-lg xl:prose-xl"
                dangerouslySetInnerHTML={{ __html: blogContent.content.rendered }}
              ></div>
              <div>
                {categories.length > 0 && (
                  <div className="mt-8 flex items-center gap-4">
                    <div className="text-xl font-bold">{t('category.label')}</div>
                    <div className="flex flex-wrap h-full items-center gap-4">
                      {categories.map((category) => (
                        <div key={category.id}>
                          <Link
                            // href={`/categories/${category.slug}`}
                            href="#"
                            className="rounded-xl bg-[#F2F2F2] px-4 py-2 text-lg text-[#6C6D71] hover:underline"
                          >
                            {category.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
