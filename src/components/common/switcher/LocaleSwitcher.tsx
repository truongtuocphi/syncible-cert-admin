import { ChevronsUpDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { routing, useRouter, usePathname, Link } from '@/i18n/routing';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import GlobeIconSVG from '../../../../public/globe-svgrepo-com.svg';

export function LocaleSelect() {
  const t = useTranslations('Localization');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = async (value: 'en' | 'vi') => {
    router.replace(pathname, { locale: value });
  };

  return (
    <>
      <Select defaultValue={locale} onValueChange={handleLanguageChange}>
        <SelectTrigger className="justify-none rounded-[2rem] border-none bg-slate-100 text-[#A2A3A9] hover:text-[#2C2C2C] focus:ring-0 active:text-[#2C2C2C]">
          <div className="flex items-center pr-4">
            <GlobeIconSVG className="h-[18px] w-[18px]" />
          </div>
          <SelectValue placeholder={t('label', { locale: locale })} />
        </SelectTrigger>
        <SelectContent className="">
          <SelectGroup>
            {routing.locales.map((loc) => (
              <SelectItem
                key={loc}
                value={loc}
                className="text-[#A2A3A9] hover:text-[#2C2C2C] active:text-[#2C2C2C]"
              >
                {t('label', { locale: loc })}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
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
            <Button variant="link" size="sm" className="w-9 p-0 w-full justify-end">
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
