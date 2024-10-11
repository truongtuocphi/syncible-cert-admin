import { useTranslations } from 'next-intl';
import React from 'react';
export default function PrivacyPage() {
    const t = useTranslations('InDevelopment');
  return (
    <div className="flex flex-grow items-center justify-center">
      {t('content')}
    </div>
  );
}
