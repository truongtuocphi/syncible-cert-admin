
import { useTranslations, useLocale } from 'next-intl';
import { useEffect, useState } from 'react';

export default function Page() {
  const t = useTranslations('BlogListPage');

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
          <div className="pt-16 w-full">
            <div>{t('category.all.label')}</div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
