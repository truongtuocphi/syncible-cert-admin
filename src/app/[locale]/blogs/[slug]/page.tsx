'use client';
import clsx from 'clsx';
import { notFound } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

import Footer from '@/components/layout/Footer';
import Navbar from '@/components/layout/Navbar';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { montserrat } from '@/components/ui/fonts';

import LightBlueGradientEllipse from '../../../../public/Ellipse_1.svg';
// import { ChevronDown } from 'lucide-react';

import SyncibleBanner from '/public/SyncibleBanner.svg';

import { Link, usePathname } from '@/i18n/routing';

// import { Button } from '@/components/ui/button';

const LinkTitle = ({ id: key, nextId }: { id: string; nextId: string }) => {
  const t = useTranslations('BlogPage');

  const pathname = usePathname();

  const [active, setActive] = useState(false);

  const onScroll = () => {
    const y =
      document.getElementById(t(`navigation.${key}.href`).replace('#', ''))?.getBoundingClientRect()
        .y || 0;
    let nextY = 1000;
    if (!!nextId) {
      nextY =
        document
          .getElementById(t(`navigation.${nextId}.href`).replace('#', ''))
          ?.getBoundingClientRect().y || 1000;
    }
    if (y < 100 && nextY > 100) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  useEffect(() => {
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Link
      key={key}
      href={t(`navigation.${key}.href`)}
      className={clsx(
        'hover:underlin hover:text-[#2C2C2C]',
        // pathname === t(`navigation.${key}.href`) && 'text-[#2C2C2C]',
        active && 'font-bold text-black'
      )}
    >
      {t(`navigation.${key}.label`)}
    </Link>
  );
};

export default function BlogPage({ params }: { params: { slug: string } }) {
  const t = useTranslations('BlogPage');
  const keys = ['link_1', 'link_2', 'link_3', 'link_4', 'link_5'] as const;
  const pathname = usePathname();
  const locale = useLocale();
  const [toggleBlogNav, setToggleBlogNav] = useState(false);
  const [Content, setContent] = useState<any>(null);

  function CustomH2({ children }: { children: React.ReactNode }) {
    return <h2 className="text-2xl font-bold">{children}</h2>;
  }

  function CustomP({ children }: { children: React.ReactNode }) {
    return <p className="text-lg text-[#6C6D71]">{children}</p>;
  }

  function CustomUl({ children }: { children: React.ReactNode }) {
    return <ul className="list-disc ps-8">{children}</ul>;
  }

  function CustomLi({ children }: { children: React.ReactNode }) {
    return <li className="ps-1 text-base text-[#6C6D71]">{children}</li>;
  }

  function CustomTable({ children }: { children: React.ReactNode }) {
    return (
      <table
        className="table-auto rounded-[1.25rem] border"
        style={{ borderRadius: '5px', borderCollapse: 'collapse' }}
      >
        {children}
      </table>
    );
  }

  function CustomThead({ children }: { children: React.ReactNode }) {
    return <thead className="border-b">{children}</thead>;
  }

  function CustomTr({ children }: { children: React.ReactNode }) {
    return <tr className="border-b">{children}</tr>;
  }

  function CustomTh({ children }: { children: React.ReactNode }) {
    return <th className="">{children}</th>;
  }

  function CustomTd({ children }: { children: React.ReactNode }) {
    return <td className="border-r">{children}</td>;
  }

  const overrideComponents = {
    h2: CustomH2,
    p: CustomP,
    ul: CustomUl,
    li: CustomLi,
    table: CustomTable,
    thead: CustomThead,
    tr: CustomTr,
    th: CustomTh,
    td: CustomTd,
  };

  const loadContent = async () => {
    try {
      // const ContentModule = (await import(`./${locale}.mdx`)).default;
      const ContentModule = (await import(`@/markdown/${locale}/blog_001.mdx`)).default;
      setContent(() => ContentModule);
    } catch (error) {
      notFound();
    }
  };

  const getHeaders = () => {
    const headers = document.querySelectorAll('h2[id]');
    return Array.from(headers).map((header) => ({
      id: header.id,
      value: header.textContent,
    }));
  };

  const smoothScroll = () => {
    const contentSection = document.getElementById('table-content');
    if (contentSection) {
      const anchorLinks = contentSection.querySelectorAll('a[href^="#"]');
      // console.log(anchorLinks);
      anchorLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const href = link.getAttribute('href');
          if (href) {
            const target = document.querySelector(href);
            target?.scrollIntoView({ behavior: 'smooth' });
          }
        });
      });
    }
  };

  useEffect(() => {
    loadContent();
    smoothScroll();

    // const observer = new IntersectionObserver(
    //   (entries) => {
    //     console.log(entries);
    //     entries.forEach((entry) => {
    //       if (entry.isIntersecting) {
    //         const activeSection = entry.target.getAttribute('id');
    //         document.querySelectorAll('a[href^="#"]').forEach(link => {
    //           link.classList.toggle('font-bold', link.getAttribute('href') === `#${activeSection}`);
    //           link.classList.toggle('text-[#A2A3A9]', link.getAttribute('href') !== `#${activeSection}`);
    //         });
    //       }
    //     });
    //   },
    //   { rootMargin: '-40% 0px -60% 0px', threshold: 0.5 }
    // );
    // document.querySelectorAll('h2[id]').forEach((section) => {
    //   observer.observe(section);
    // });

    // return () => {
    //   observer.disconnect();
    // };
  }, [locale]);

  return (
    <div className="relative min-h-screen">
      <div className="fixed top-0 z-30 w-screen md:mt-6">
        <Navbar />
      </div>
      <div className={`${montserrat.className} z-20 flex flex-col items-center gap-10`}>
        <div className="flex h-full w-full justify-center pt-24 md:pt-[8.25rem] lg:pt-40 xl:pt-44">
          <div className="flex flex-col px-4 pb-4 md:px-8 md:pb-10 xl:px-32">
            <div className="flex flex-col items-center gap-10">
              <div className="text-center text-2xl font-bold md:text-3xl lg:text-5xl">
                {t('header')}
              </div>
              <div className="w-full">
                <SyncibleBanner className="aspect-[24/9] h-full w-full" />
              </div>
            </div>
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="hidden basis-1/4 md:block">
                <div className="flex h-full flex-col gap-8">
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-4">
                      <div>
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="/SmugFace.png" alt="" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{t('author_profile.name')}</div>
                        <div className="text-base font-medium text-[#A2A3A9]">
                          {t('author_profile.role')}
                        </div>
                      </div>
                    </div>
                    <div className="w-[70%] border-t-[1px]"></div>
                    <div className="flex flex-col gap-2">
                      <div className="text-base font-medium text-[#A2A3A9]">
                        {t('blog_info.date_created.label')}
                      </div>
                      <div className="text-lg font-medium">{t('blog_info.date_created.value')}</div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-base font-medium text-[#A2A3A9]">
                        {t('blog_info.read_time.label')}
                      </div>
                      <div className="text-lg font-medium">{t('blog_info.read_time.value')}</div>
                    </div>
                  </div>
                  <div
                    id="table-content"
                    className="sticky top-[9rem] flex flex-col gap-2 text-lg font-bold text-[#A2A3A9]"
                  >
                    {/* {keys.map((key) => (
                      <Link
                        key={key}
                        href={t(`navigation.${key}.href`)}
                        className={clsx(
                          'hover:text-[#2C2C2C] hover:underline',
                          pathname === t(`navigation.${key}.href`) && 'text-[#2C2C2C]'
                        )}
                      >
                        {t(`navigation.${key}.label`)}
                      </Link>
                    ))} */}

                    {keys.map((key, index) => (
                      <LinkTitle key={key} id={key} nextId={keys?.[index + 1] || ''} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="basis-3/4">
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-6 md:hidden">
                    <div className="flex items-center gap-4">
                      <div>
                        <Avatar className="h-16 w-16">
                          <AvatarImage src="/SmugFace.png" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                      </div>
                      <div>
                        <div className="text-lg font-bold">{t('author_profile.name')}</div>
                        <div className="text-base font-medium text-[#A2A3A9]">
                          {t('author_profile.role')}
                        </div>
                      </div>
                    </div>
                    <div className="w-full border-t-[1px]"></div>
                    <div className="flex flex-col gap-6">
                      <div className="flex w-full flex-col gap-2">
                        <div className="text-base font-medium text-[#A2A3A9]">
                          {t('blog_info.date_created.label')}
                        </div>
                        <div className="text-lg font-medium">
                          {t('blog_info.date_created.value')}
                        </div>
                      </div>
                      <div className="flex w-full flex-col gap-2">
                        <div className="text-base font-medium text-[#A2A3A9]">
                          {t('blog_info.read_time.label')}
                        </div>
                        <div className="text-lg font-medium">{t('blog_info.read_time.value')}</div>
                      </div>
                    </div>
                  </div>
                  <div id="content-section">
                    {Content && <Content />}
                    {/* {Content && <Content  components={overrideComponents}/>} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <div className="-z-10 absolute bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col items-center overflow-hidden">
        <div className="relative mx-auto h-full w-full max-w-[90rem]">
          <div className="absolute left-1/2 -top-[5%] -z-10 w-[125rem] sm:-translate-x-[60%] ">
            <LightBlueGradientEllipse className="h-full w-full" />
          </div>
          <div className="absolute top-1/2 right-1/2 -z-10 w-[125rem] sm: translate-x-[60%]">
            <LightBlueGradientEllipse className="h-full w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}