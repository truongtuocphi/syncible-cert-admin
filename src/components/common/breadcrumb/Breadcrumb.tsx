'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdNavigateNext } from 'react-icons/md';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import { useCustomLabel } from '@/utils/labelCustomization';
import { useTranslations } from 'next-intl';

interface propData {
  displayName?: string;
  nameCertificate?: string;
}

const Breadcrumb = ({ displayName, nameCertificate }: propData) => {
  const pathname = usePathname();

  const paths = pathname ? pathname.split('/').filter((path) => path) : [];

  const isAdminMintNFTPath = pathname === '/admin/mintnft';

  const t = useTranslations('breadcrumb');
  // Generate labels for each path

  const getCustomLabel = (path: string) => {
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
      case 'en':
        return '';
      default:
        return path;
    }
  };

  const breadcrumbItems = paths
    .filter((path, index) => {
      if (isAdminMintNFTPath && index === 0 && path.toLowerCase() === 'admin') {
        return false;
      }
      return true;
    })
    .map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`;

      // Call getCustomLabel inside map
      let label = '';

      if (path.length === 42) {
        label = displayName || 'Loading...';
      } else if (path.length === 46 && nameCertificate) {
        label = nameCertificate || 'Loading...';
      } else {
        label = getCustomLabel(path);
      }

      const truncatedLabel = label.length > 41 ? `${displayName}` : label;

      return { label: truncatedLabel, href };
    });

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex text-gray-400">
      {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center text-sm 2xl:text-base">
            {index < breadcrumbItems.length - 1 ? (
              <div className="flex items-center gap-2">
                {item.label && (
                  <>
                    <Link
                      href={item.href}
                      className="line-clamp-1 text-sm hover:text-gray-800 2xl:text-base"
                    >
                      {capitalizeFirstLetter(item.label)}
                    </Link>
                    <MdNavigateNext className="mr-2 text-xl" />
                  </>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                className="text-sm font-bold text-gray-600 hover:text-gray-800 2xl:text-base"
              >
                {capitalizeFirstLetter(item.label)}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
