import { useState } from 'react';

import { ChevronsUpDown, Check } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { routing, useRouter, usePathname, Link } from '@/i18n/routing';

import GlobeIconSVG from '../../../../public/globe-svgrepo-com.svg';

export function LocaleSelect() {
  const t = useTranslations('Localization');
  const locale = useLocale() as 'en' | 'vi';
  const router = useRouter();
  const pathname = usePathname();
  

  const handleLanguageChange = async (value: 'en' | 'vi') => {
    router.replace(pathname, { locale: value });
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary" className="bg-transparent hover:bg-transparent">
            <div className="flex items-center pr-2">
              <GlobeIconSVG className="h-6 w-6" />
            </div>
            {locale.toUpperCase()}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-auto rounded-[20px] border-none shadow-combinedShadow2"
        >
          <div className="flex w-44 flex-col">
            {routing.locales.map((loc) => (
              <Button
                variant="link"
                key={loc}
                onClick={() => handleLanguageChange(loc as 'en' | 'vi')}
                className="h-auto rounded-2xl px-4 py-3 font-semibold text-[#2C2C2C] hover:bg-[#EEEEEE] hover:text-[#2C2C2C] hover:no-underline active:text-[#2C2C2C]"
              >
                <div className="flex w-full justify-between">
                  {t('label', { locale: loc })}
                  {locale === loc && <Check className="h-6 w-6" />}
                </div>
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}

export function LocaleCollapsible() {
  const t = useTranslations('Localization');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between text-[#A2A3A9]">
          <div>{t('header')}</div>
          <CollapsibleTrigger asChild>
            <Button variant="link" size="sm" className="w-9 w-full justify-end p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          {routing.locales.map((loc) => (
            <div key={loc} className="px-4 py-3 text-sm hover:text-[#2C2C2C] active:text-[#2C2C2C]">
              <Link href={`${pathname}`} locale={loc}>
                {t('label', { locale: loc })}
              </Link>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
