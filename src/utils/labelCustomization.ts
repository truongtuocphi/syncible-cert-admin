import { useTranslations } from 'next-intl';

const useCustomLabel = (path: string) => {
  const t = useTranslations('breadcrumb');

  switch (path) {
    case 'mintnft':
      return t('mintnft');
    case 'collection':
      return t('collection');
    case 'createcollection':
      return t('createcollection');
    case 'admin':
      return t('admin');
    case 'collectiondetail':
      return '';
    case 'contractdetail':
      return t('contractdetail');
    case 'filestorage':
      return t('filestorage');
    case 'customized':
      return t('customized');
    case 'vi':
      return '';
    case 'en':
      return '';
    default:
      return path;
  }
};

export default useCustomLabel;
