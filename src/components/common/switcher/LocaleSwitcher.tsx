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
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

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
        <SelectTrigger className="w-full border-none bg-transparent">
          <SelectValue placeholder={t('label')} />
        </SelectTrigger>
        <SelectContent className="z-50">
          <SelectGroup>
            {routing.locales.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {t(`options.${loc}`)}
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
      {/* <Select defaultValue={locale} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-full border-none bg-transparent">
          <SelectValue placeholder={t('label')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup className="z-50">
            {routing.locales.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {t(`options.${loc}`)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select> */}
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between">
          <div>{t('label')}</div>
          <CollapsibleTrigger asChild>
            <Button variant="link" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2">
          {routing.locales.map((loc) => (
            <div key={loc} className="px-4 py-3 text-sm">
              <Link href={`${pathname}`} locale={loc}>
                {t(`options.${loc}`)}
              </Link>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
