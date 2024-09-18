import {useLocale, useTranslations} from 'next-intl';
import {routing} from '@/i18n/routing';
import {useRouter} from 'next/router';

const LocaleSwitcher: React.FC = () => {
  const router = useRouter();
  const { locale, locales } = router;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <select value={locale} onChange={handleChange}>
      {locales?.map((loc) => (
        <option key={loc} value={loc}>
          {loc}
        </option>
      ))}
    </select>
  );
};

export default LocaleSwitcher;
