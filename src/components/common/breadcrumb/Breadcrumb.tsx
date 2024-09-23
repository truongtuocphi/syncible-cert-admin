'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdNavigateNext } from 'react-icons/md';

import capitalizeFirstLetter from '@/utils/capitalizeFirstLetter';
import getCustomLabel from '@/utils/labelCustomization';

interface propData {
  displayName?: string;
  nameCertificate?: string;
}

const Breadcrumb = ({ displayName, nameCertificate }: propData) => {
  const pathname = usePathname();

  const paths = pathname.split('/').filter((path) => path);

  const isAdminMintNFTPath = pathname === '/admin/mintnft';

  const breadcrumbItems = paths
    .filter((path, index) => {
      if (isAdminMintNFTPath && index === 0 && path.toLowerCase() === 'admin') {
        return false;
      }
      return true;
    })
    .map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join('/')}`;
      let label = '';

      // Thêm nhãn cho path.length === 42
      if (path.length === 42) {
        label = displayName || '';
      }

      // Thêm nhãn cho path.length === 46
      if (path.length === 46) {
        label = nameCertificate || 'abc';
      } else {
        label = getCustomLabel(path);
      }

      // Kết hợp và cắt nhãn nếu cần
      const truncatedLabel = label.length > 41 ? `${displayName}` : label;

      return { label: truncatedLabel, href };
    });

  return (
    <nav aria-label="breadcrumb">
      <ol className="flex text-gray-400">
        {breadcrumbItems.map((item, index) => (
          <li key={item.href} className="flex items-center text-xs">
            {index < breadcrumbItems.length - 1 ? (
              <div className="flex items-center gap-2">
                {item.label && (
                  <>
                    <Link href={item.href} className="line-clamp-1 text-xs hover:text-gray-800">
                      {capitalizeFirstLetter(item.label)}
                    </Link>
                    <MdNavigateNext className="mr-2 text-xl" />
                  </>
                )}
              </div>
            ) : (
              <Link href={item.href} className="text-xs text-gray-400 hover:text-gray-800">
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
