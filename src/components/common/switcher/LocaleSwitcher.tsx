import { useLocale, useTranslations } from 'next-intl';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { routing, useRouter, usePathname } from '@/i18n/routing';

export default function LocaleSwitcher() {
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
        <SelectTrigger className="w-full bg-transparent border-none">
          <SelectValue placeholder={t('label')} />
        </SelectTrigger>
        <SelectContent>
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
