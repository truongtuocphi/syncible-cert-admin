import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations('InDevelopment');
  return (
    <div className="flex flex-grow items-center justify-center">
      {t('content')}
    </div>
  );
}
